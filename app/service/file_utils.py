import os


async def upload_file_to_dir(file):
    # Define the directory where you want to save the file
    directory = "../fileStorage/images"

    # Define the file path by joining the directory path with the uploaded file name
    file_path = os.path.join(directory, file.filename)  # type: ignore

    # Open the file in binary write mode and write the contents of the uploaded file to it
    with open(file_path, "wb") as new_file:
        # Iterate over the file chunks and write them to the new file
        while chunk := await file.read(1024):
            new_file.write(chunk)

    # Print a message indicating that the file has been saved successfully
    print("File saved successfully at:", file_path)

    # Return a response indicating the uploaded file's filename
    return file_path
