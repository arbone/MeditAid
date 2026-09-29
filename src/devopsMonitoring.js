const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
const appEnvironment = import.meta.env.VITE_APP_ENV || "production";
const params = new URLSearchParams(window.location.search);
const isSentryTest = params.get("sentry-test") === "1";

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

const diagnostic = [
  "MeditAid Sentry diagnostic",
  `DSN configurato: ${Boolean(sentryDsn)}`,
  `Environment: ${appEnvironment}`,
];

async function captureTestEvent() {
  if (!window.Sentry) {
    diagnostic.push("SDK caricato: false");
    diagnostic.push("ERRORE: Loader Sentry non disponibile.");
    showSentryDiagnostic(diagnostic);
    return;
  }

  window.Sentry.onLoad(async () => {
    diagnostic.push("SDK caricato: true");

    const error = new Error("MeditAid DevOps - Sentry test event");
    const eventId = window.Sentry.captureException(error);
    diagnostic.push(`Event ID: ${eventId || "non disponibile"}`);

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
  if (!sentryDsn) {
    diagnostic.push("SDK caricato: false");
    diagnostic.push("ERRORE: VITE_SENTRY_DSN non presente nella build.");
    showSentryDiagnostic(diagnostic);
    return;
  }

  let publicKey;
  try {
    publicKey = new URL(sentryDsn).username;
  } catch {
    diagnostic.push("SDK caricato: false");
    diagnostic.push("ERRORE: VITE_SENTRY_DSN non valida.");
    showSentryDiagnostic(diagnostic);
    return;
  }

  if (!publicKey) {
    diagnostic.push("SDK caricato: false");
    diagnostic.push("ERRORE: public key Sentry non trovata nella DSN.");
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
    if (isSentryTest) captureTestEvent();
  });

  loader.addEventListener("error", () => {
    diagnostic.push("SDK caricato: false");
    diagnostic.push(`ERRORE caricamento loader: ${loader.src}`);
    diagnostic.push("Possibile blocco da ad-blocker/privacy extension.");
    showSentryDiagnostic(diagnostic);
  });

  document.head.appendChild(loader);
}

loadSentry();
