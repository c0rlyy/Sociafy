# Sociafy

Sociafy is a social media platform crafted to replicate the features commonly found in popular social networking apps.

## Runing The App

Navigate to the `app` directory and run the following command in your terminal:

```bash
uvicorn main:app --reload
```

The `--reload` flag is optional; it restarts the server on every saved change.

you can acces the API docs by adding /docs to the localhost path

## Dependencies

Make sure you have the following dependencies installed:

Database:

- sqllite3

Python packages:

- bcrypt
- fastapi
- sqlAlchemy
- python-jose[cryptography]
- uvicorn[standard]
- python-dotenv
- python-multipart
- aiofiles

## Set Up

Follow these steps to set up the project:

1. **Add Directory `db`:**

   - Create a directory named `db` in the root directory of the project.

2. **Add Directory `fileStorage`:**

   - Create a directory named `fileStorage` in the root directory of the project.
   - next create 2 directories inside of `fileSotrage` named `video` and `images`

3. **Create `.env` File:**

   - In the `app` directory, create a file named `.env`.
   - Define the following environment variables in the `.env` file:

   ```plaintext
   ALGORYTHM="yourAlgorythm"
   SECRET_KEY="yourSecretKey"
   ```
