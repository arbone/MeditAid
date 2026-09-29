const params = new URLSearchParams(window.location.search);

if (params.get("sentry-test") === "1") {
  window.setTimeout(() => {
    throw new Error("MeditAid DevOps - Sentry test event");
  }, 800);
}
