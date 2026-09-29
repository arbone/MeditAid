const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
const appEnvironment = import.meta.env.VITE_APP_ENV || "production";
const params = new URLSearchParams(window.location.search);
const isSentryTest = params.get("sentry-test") === "1";

let sentrySdkAvailable = false;

function showSentryDiagnostic(lines) {
  if (!isSentryTest) return;

  const existing = document.getElementById("sentry-devops-diagnostic");
  if (existing) existing.remove();

  const box = document.createElement("pre");
  box.id = "sentry-devops-diagnostic";
  box.textContent = lines.join("\n");
  Object.assign(box.style, {
    position: "fixed",
    left: "16px",
    right: "16px",
    bottom: "16px",
    zIndex: "99999",
    padding: "14px",
    borderRadius: "10px",
    background: "#111",
    color: "#fff",
    fontSize: "14px",
    whiteSpace: "pre-wrap",
    boxShadow: "0 8px 30px rgba(0,0,0,.35)",
  });
  document.body.appendChild(box);
}

function eventId() {
  if (crypto.randomUUID) return crypto.randomUUID().replaceAll("-", "");
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function parseDsn(dsn) {
  const parsed = new URL(dsn);
  const pathParts = parsed.pathname.split("/").filter(Boolean);
  const projectId = pathParts.at(-1);

  if (!parsed.username || !projectId) {
    throw new Error("DSN Sentry non valida");
  }

  return {
    publicKey: parsed.username,
    projectId,
    origin: parsed.origin,
  };
}

async function sendEnvelope(error, source = "fallback") {
  const { publicKey, projectId, origin } = parseDsn(sentryDsn);
  const id = eventId();
  const endpoint =
    `${origin}/api/${projectId}/envelope/?sentry_key=${encodeURIComponent(publicKey)}&sentry_version=7&sentry_client=meditaid-fallback%2F1.0`;

  const envelopeHeader = {
    event_id: id,
    sent_at: new Date().toISOString(),
  };

  const itemHeader = { type: "event" };

  const event = {
    event_id: id,
    timestamp: Date.now() / 1000,
    platform: "javascript",
    level: "error",
    environment: appEnvironment,
    exception: {
      values: [
        {
          type: error?.name || "Error",
          value: error?.message || String(error),
          mechanism: {
            type: source,
            handled: false,
          },
        },
      ],
    },
    request: {
      url: window.location.href,
    },
    tags: {
      integration: "meditaid-sentry-fallback",
    },
  };

  const body =
    JSON.stringify(envelopeHeader) +
    "\n" +
    JSON.stringify(itemHeader) +
    "\n" +
    JSON.stringify(event);

  const response = await fetch(endpoint, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "text/plain;charset=UTF-8",
    },
    keepalive: true,
  });

  if (!response.ok) {
    throw new Error(`Sentry ingest HTTP ${response.status}`);
  }

  return { eventId: id, status: response.status };
}

function installFallbackErrorTracking() {
  window.addEventListener("error", (event) => {
    if (sentrySdkAvailable || !sentryDsn || isSentryTest) return;
    const error = event.error || new Error(event.message || "Unhandled browser error");
    sendEnvelope(error, "window.onerror").catch(() => {});
  });

  window.addEventListener("unhandledrejection", (event) => {
    if (sentrySdkAvailable || !sentryDsn || isSentryTest) return;
    const reason = event.reason;
    const error = reason instanceof Error ? reason : new Error(String(reason));
    sendEnvelope(error, "unhandledrejection").catch(() => {});
  });
}

const diagnostic = [
  "MeditAid Sentry diagnostic",
  `DSN configurato: ${Boolean(sentryDsn)}`,
  `Environment: ${appEnvironment}`,
];

async function runDirectTest(reason) {
  diagnostic.push(reason);

  try {
    const result = await sendEnvelope(
      new Error("MeditAid DevOps - Sentry test event"),
      "devops-test"
    );
    diagnostic.push(`Direct ingest: HTTP ${result.status}`);
    diagnostic.push(`Event ID: ${result.eventId}`);
  } catch (error) {
    diagnostic.push(`Direct ingest FALLITO: ${error?.message || String(error)}`);
  }

  showSentryDiagnostic(diagnostic);
}

async function captureTestEventWithSdk() {
  window.Sentry.onLoad(async () => {
    sentrySdkAvailable = true;
    diagnostic.push("SDK caricato: true");

    const error = new Error("MeditAid DevOps - Sentry test event");
    const id = window.Sentry.captureException(error);
    diagnostic.push(`Event ID: ${id || "non disponibile"}`);

    try {
      const flushed = await window.Sentry.flush(5000);
      diagnostic.push(`Flush: ${String(flushed)}`);
    } catch (error) {
      diagnostic.push(`Flush error: ${error?.message || String(error)}`);
    }

    showSentryDiagnostic(diagnostic);
  });
}

function loadSentry() {
  installFallbackErrorTracking();

  if (!sentryDsn) {
    diagnostic.push("SDK caricato: false");
    diagnostic.push("ERRORE: VITE_SENTRY_DSN non presente nella build.");
    showSentryDiagnostic(diagnostic);
    return;
  }

  let publicKey;
  try {
    publicKey = parseDsn(sentryDsn).publicKey;
  } catch {
    diagnostic.push("SDK caricato: false");
    diagnostic.push("ERRORE: VITE_SENTRY_DSN non valida.");
    showSentryDiagnostic(diagnostic);
    return;
  }

  window.sentryOnLoad = function () {
    window.Sentry.init({
      environment: appEnvironment,
    });
  };

  const loader = document.createElement("script");
  loader.src = `https://js.sentry-cdn.com/${publicKey}.min.js`;
  loader.crossOrigin = "anonymous";
  loader.dataset.lazy = "no";

  loader.addEventListener("load", () => {
    diagnostic.push(`Loader: ${loader.src}`);
    if (isSentryTest) captureTestEventWithSdk();
  });

  loader.addEventListener("error", () => {
    sentrySdkAvailable = false;
    diagnostic.push("SDK caricato: false");

    if (isSentryTest) {
      runDirectTest("Loader CDN bloccato: uso fallback diretto Sentry.");
    }
  });

  document.head.appendChild(loader);
}

loadSentry();
