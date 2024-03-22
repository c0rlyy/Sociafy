import aiofiles
from fastapi import Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
import uuid


def validate_file_type(file_type: str) -> None:
    """
    this fucntion checks if file type is allowed.
    and if not it raises an Exception
    """
    allowed_types: list[str] = ["image/jpeg", "image/png", "video/mp4"]
    if file_type not in allowed_types:
        raise HTTPException(status_code=400, detail="wront file fromat")


def change_file_name_and_get_extension(file_name: str) -> tuple[str, str]:
    file_extension_index: int = file_name.rfind(".")
    file_extension: str = file_name[file_extension_index:]

    new_file_name = str(uuid.uuid4())
    return new_file_name + file_extension, file_extension[1:]


def get_file_path(file_extension: str, file_name: str) -> str:

    if file_extension == "png" or file_extension == "jpg":
        return f"../fileStorage/images/{file_name}"
    elif file_extension == "mp4":
        return f"../fileStorage/video/{file_name}"
    raise HTTPException(status_code=400, detail="error while trying to save the file, make sure the file extenison is correct")


async def saving_file(uploaded_file: UploadFile, file_path: str) -> str:
    """
    this fucntion saves file,
    raises and excpetion if its too big.
    """
    MAX_FILE_SIZE = 186646528

    contents: bytes = await uploaded_file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File is to big, max size is 178 mb")

    try:
        async with aiofiles.open(file_path, "wb") as f:
            await f.write(contents)
    except Exception:
        raise HTTPException(status_code=500, detail="error while saving the file format")

    return file_path


async def save_files_and_validate(files_list: list[UploadFile]):
    files_data_list: list = []
    for file in files_list:
        # can raise an exception
        validate_file_type(file.content_type)  # type:ignore
        new_file_name, extension = change_file_name_and_get_extension(file.filename)  # type: ignore
        file.filename = new_file_name
        file_path: str = get_file_path(extension, file.filename)  # type: ignore
        # can raise an exception
        await saving_file(file, file_path)
        file_info: dict[str, str] = {"file_name": new_file_name, "path": file_path, "file_type": extension}
        print(file_info)
        files_data_list.append(file_info)

    return files_data_list
