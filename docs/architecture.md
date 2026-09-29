# MeditAid DevOps Architecture

```text
Developer
   |
   | docker compose up --build
   v
Development
   |
   | git push / pull request
   v
GitHub Actions CI
   |-- npm ci
   |-- ESLint
   |-- Vite build
   |-- frontend Docker build
   |-- backend Docker build
   |
   +--> Pull Request --> Vercel Preview (staging)
   |
   +--> main ---------> Vercel Production
                            |
                            +--> UptimeRobot
                            +--> Sentry
```

## Promotion rule

Production is reached only after the CI job succeeds. Any lint, application build, or container build failure prevents the deployment job from starting.
