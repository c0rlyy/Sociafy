import magic


def validate_file_type(file):
    allowed_types = ["image/jpeg", "image/png", "application/pdf"]  # Example whitelist
    detected_type = magic.from_buffer(file.read(1024), mime=True)
    if detected_type not in allowed_types:
        raise ValueError("Invalid file type")


MAX_FILE_SIZE = 10 * 1024 * 1024


def validate_file_size(file):
    if file.content_length > MAX_FILE_SIZE:
        raise ValueError("File size exceeds the limit")


import os
import rez


def sanitize_filename(filename):
    # Remove special characters and spaces
    sanitized_name = re.sub(r"[^\w\-_.]", "", filename)
    # Ensure filename is not empty
    if not sanitized_name:
        sanitized_name = "unnamed_file"
    return sanitized_name


def rename_file(file, filename):
    filename = sanitize_filename(filename)
    file.filename = filename  # Update filename attribute of the uploaded file object
