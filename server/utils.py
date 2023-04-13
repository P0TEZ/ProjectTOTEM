import logging


def checkForEnvVar():
    """
    It checks if the files .env exist and if they contain the
    necessary variables
    """
    error = []
    if loadEnvVar("../database_credentials.env") is None:
        error.append("The file ../database_credentials.env does not exist")
    else:
        if not all(key in loadEnvVar("../database_credentials.env") for key in ("DB_HOST","DB_PORT","DB_NAME","DB_USER","DB_PASSWORD")):
            error.append("The file ../database_credentials.env does not contain all the necessary variables")
            error.append("The variables DB_HOST,DB_PORT,DB_NAME,DB_USER,DB_PASSWORD must be present")

    if loadEnvVar("../centrale_Info.env") is None:
        error.append("The file ../centrale_Info.env does not exist")
    else:
        if not all(key in loadEnvVar("../centrale_Info.env") for key in ("IP",)):
            error.append("The file ../centrale_Info.env does not contain all the necessary variables")
            error.append("The variable CENTRALE_INFO must be present")

    if len(error) > 0:
        for err in error:
            logging.error(err)
        exit()


def loadEnvVar(fileLocation):
    """
    It opens the file at the location specified by the parameter, reads each line, splits the line into
    a key and value, and returns a dictionary of the key/value pairs
    
    :param fileLocation: The location of the file that contains the environment variables
    :return: A dictionary of the environment variables and there value.
    """
    try:
        with open(fileLocation, 'r') as f:
            env = dict(line.strip().split('=') for line in f if line.strip())
        return env
    except FileNotFoundError:
        print("The file at the location specified does not exist")
    return None