# Sociafy

Sociafy is a social media platform crafted to replicate the features commonly found in popular social networking apps.

## Installation

Navigate to the `app` directory and run the following command in your terminal:

unicorn main:app --reload

The `--reload` flag is optional; it restarts the server on every saved change.

## Dependencies

Make sure you have the following dependencies installed:

- sqllite3
- bcrypt
- fastapi
- sqlAlchemy
- pyjwt
- uvicorn[standard]
- python-dotenv

## Usage

To run the application, follow these steps:

1. Install the dependencies mentioned above.
2. Set up your environment variables using `.env` file.
3. Navigate to the `app` directory.
4. Run the command:

unicorn main:app --reload

This command will start the server, and you can access the Sociafy platform from your browser.