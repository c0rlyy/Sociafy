import os
import subprocess
import sys

class Color:
    PURPLE = '\033[95m'
    CYAN = '\033[96m'
    DARKCYAN = '\033[36m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    END = '\033[0m' 

def create_if_not_exists_folder(dirName):
    current_directory = os.path.dirname(__file__)
    folder_path = os.path.join(current_directory, dirName)

    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
        print(f"{Color.CYAN}Folder '{dirName}' {Color.END}created in {Color.GREEN}'{current_directory}'.{Color.END}")
    else:
        print(f"{Color.CYAN}Folder '{dirName}' {Color.END}already exists in {Color.BLUE}'{current_directory}'.{Color.END}")


def starting_server():
    print(Color.BOLD + Color.BLUE + "----------- Web app Sociafy --------------" + Color.END)
    print(f"Make sure that {Color.BOLD} {Color.PURPLE}pip {Color.END}is installed on your system ")
    print(f"and that you have {Color.BOLD} {Color.PURPLE}python 3.10.12 {Color.END} or greater installed")

    start_server = input(f"{Color.GREEN}press 1 to star sever up{Color.END}, make sure that you habve the {Color.RED}dependencies installed {Color.END}")

    if start_server != "1":
        print("bye bye, pls come again")
        return

    print(f"{Color.YELLOW}{Color.UNDERLINE}pressctrl + c to stop the app {Color.END}")
    print("------------------------------------------")

    os.chdir("./app")
    uvicorn_command = [sys.executable, "-m", "uvicorn", "main:app", "--reload"]
    subprocess.run(uvicorn_command)


create_if_not_exists_folder("db")
create_if_not_exists_folder("fileStorage")
create_if_not_exists_folder("fileStorage/images")
create_if_not_exists_folder("fileStorage/video")

starting_server()
