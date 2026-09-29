const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
const appEnvironment = import.meta.env.VITE_APP_ENV || "production";

if (window.Sentry && sentryDsn) {
  window.Sentry.init({
    dsn: sentryDsn,
    environment: appEnvironment,
  });
}

const params = new URLSearchParams(window.location.search);

if (params.get("sentry-test") === "1") {
  window.setTimeout(() => {
    const error = new Error("MeditAid DevOps - Sentry test event");

    if (window.Sentry && sentryDsn) {
      window.Sentry.captureException(error);
      console.error(error);
      return;
    }

    throw error;
  }, 800);
}
