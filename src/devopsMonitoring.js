const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
const appEnvironment = import.meta.env.VITE_APP_ENV || "production";
const params = new URLSearchParams(window.location.search);
const isSentryTest = params.get("sentry-test") === "1";

function showSentryDiagnostic(lines) {
  if (!isSentryTest) return;

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
  `SDK caricato: ${Boolean(window.Sentry)}`,
  `Environment: ${appEnvironment}`,
];

if (window.Sentry && sentryDsn) {
  window.Sentry.init({
    dsn: sentryDsn,
    environment: appEnvironment,
    debug: isSentryTest,
  });

  if (isSentryTest) {
    const error = new Error("MeditAid DevOps - Sentry test event");
    const eventId = window.Sentry.captureException(error);
    diagnostic.push(`Event ID: ${eventId || "non disponibile"}`);

    Promise.resolve(window.Sentry.flush?.(5000))
      .then((flushed) => {
        diagnostic.push(`Flush: ${String(flushed)}`);
        showSentryDiagnostic(diagnostic);
      })
      .catch((error) => {
        diagnostic.push(`Flush error: ${error?.message || String(error)}`);
        showSentryDiagnostic(diagnostic);
      });
  }
} else if (isSentryTest) {
  diagnostic.push(
    !sentryDsn
      ? "ERRORE: VITE_SENTRY_DSN non presente nella build."
      : "ERRORE: SDK Sentry non caricato dal CDN."
  );
  window.addEventListener("DOMContentLoaded", () => showSentryDiagnostic(diagnostic));
}
