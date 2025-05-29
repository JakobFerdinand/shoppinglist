# Shopping List Prototype

## Local Development

```bash
cd webapp
npm install
npm start
```

Create a `.env` file based on `.env.example` with your Supabase credentials.

## Deployment on Azure Static Web Apps

1. Push this repo to GitHub.
2. In the Azure portal, create a Static Web App and connect it to your repo.
3. Under **Configuration** add application settings `SUPABASE_URL` and `SUPABASE_ANON_KEY` with the same values used locally. Also add `AZURE_STATIC_WEB_APPS_API_TOKEN` secret in GitHub.
4. The GitHub Actions workflow `.github/workflows/azure-static-web-apps.yml` will build and deploy the `webapp` folder.
