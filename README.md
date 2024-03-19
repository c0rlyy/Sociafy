# Sociafy

Sociafy is a social media platform crafted to replicate the features commonly found in popular social networking apps.

## Installation

Navigate to the `app` directory and run the following command in your terminal:


```bash
unicorn main:app --reload
```

The `--reload` flag is optional; it restarts the server on every saved change.

## Dependencies

Make sure you have the following dependencies installed:

Database:
   - sqllite3 

Python packages:
- bcrypt 
- fastapi
- sqlAlchemy
- pyjwt
- uvicorn[standard]
- python-dotenv
- python-multipart

## Set Up

Follow these steps to set up the project:

1. **Add Directory `db`:**
   - Create a directory named `db` in the root directory of the project.

2. **Create `.env` File:**
   - In the `app` directory, create a file named `.env`.
   - Define the following environment variables in the `.env` file:

   ```plaintext
   ALGORITHM="yourAlgorithm"  
   SECRET_KEY="yourSecretKey"
    ```
