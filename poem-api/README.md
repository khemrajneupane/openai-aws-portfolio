# Poem API Backend

I created this backend because my fine-tuned poem model is slow and heavy to run, and I do not want the main Vercel app to handle that long-running inference directly.

This service exists to keep the frontend lightweight and reliable while the actual model call happens in a separate backend process.

## Why this is here

- The main app is deployed on Vercel.
- Vercel is great for the frontend, but it is not the best place for slow model inference.
- My fine-tuned poem model can take a long time to respond, especially on CPU.
- I wanted the frontend to stay simple and not depend on a slow blocking request.
- I also wanted to keep the project inexpensive and manageable.

## What this backend does

- Receives a prompt from the frontend
- Calls the Gradio-hosted poem model
- Returns the generated poem as JSON
- Keeps the model logic away from the portfolio frontend

## Deployment idea

- Deploy this folder as a separate service on Render
- Keep the main project on Vercel
- Point the frontend to this backend via the `POEM_BACKEND_URL` environment variable

This keeps the portfolio app easy to deploy while still letting me demonstrate the fine-tuned poem model in a practical way.
