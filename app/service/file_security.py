import uuid


def validate_file_type(file_type: str) -> bool:
    allowed_types = ["image/jpeg", "image/png", "video/mp4"]  # Example whitelist
    if file_type in allowed_types:
        return True
    return False


def change_file_name(file_name: str) -> str:
    file_extension_index: int = file_name.rfind(".")
    file_extension = file_name[file_extension_index:]
    new_file_name = str(uuid.uuid4())
    return new_file_name + file_extension


# MAX_FILE_SIZE = 10 * 1024 * 1024


# def validate_file_size(file):
#     if file.content_length > MAX_FILE_SIZE:
#         raise ValueError("File size exceeds the limit")


# def sanitize_filename(filename):
#     # Remove special characters and spaces
#     sanitized_name = re.sub(r"[^\w\-_.]", "", filename)
#     # Ensure filename is not empty
#     if not sanitized_name:
#         sanitized_name = "unnamed_file"
#     return sanitized_name


# def rename_file(file, filename):
#     filename = sanitize_filename(filename)
#     file.filename = filename  # Update filename attribute of the uploaded file object
