from utils import checkForEnvVar
checkForEnvVar()
from models import Token, Bdd

from fastapi import FastAPI,HTTPException, Request

import uvicorn

tags_metadata = [
    {
        "name": "default",
        "description": "Default routes",
    },
    {
        "name": "user",
        "description": "User routes",
    },
    {
        "name": "admin",
        "description": "Admin routes",
    },
]

app = FastAPI(
    title="TotemAPi",
    description="",
    version="1.0.0",
    terms_of_service="",
    contact={
        "name": "P0TEZ",
        "email": "alexandre.potez@student.junia.com",
    },
    license_info={
        "name": "MIT",
    },
    openapi_tags=tags_metadata,
)

@app.get("/", tags=["default"])
def read_root():
    return {
        "Name": "TOTEM_API",
        "Status": "Online"
    }

@app.get("/totem/{totem_id}", tags=["default"])
async def read_totem(totem_id: int):
    """
    It takes a totem ID as an argument, and returns a boolean value that indicates if the totem exists or not
    """
    bdd = Bdd()
    if bdd.getTotemIP(totem_id) is None:
        # 404 not found
        raise HTTPException(status_code=404, detail="Totem not found")
    return {
        "totem_id": totem_id,
        "exists": True
    }

@app.get("/totem/{totem_id}/ip", tags=["default"])
async def read_totem_ip(totem_id: int):
    """
    It takes a totem ID as an argument, and returns the IP address of the totem
    """
    bdd = Bdd()
    ip = bdd.getTotemIP(totem_id)
    if ip is None:
        # 404 not found
        raise HTTPException(status_code=404, detail="Totem not found")
    return {
        "totem_id": totem_id,
        "ip": ip
    }

@app.get("/params", tags=["default"])
async def read_params():
    """
    It returns all details about the parameters
    """

    bdd = Bdd()
    return bdd.getParamsDetails()

# user routes

async def check_user_token(token: str):
    """
    It checks if the user token is valid
    """
    token = Token.decode_auth_token(token)
    # return token
    if token is None:
        # 401 unauthorized
        raise HTTPException(status_code=401, detail="Token invalid")
    
    
    if token == "Expired":
        # 401 unauthorized
        raise HTTPException(status_code=401, detail="Token expired")
    
    if token == "Invalid":
        # 401 unauthorized
        raise HTTPException(status_code=401, detail="Token invalid")

    if token["totemID"] is None or token["totemIP"] is None:
        # 401 unauthorized
        raise HTTPException(status_code=401, detail="Token invalid, ID or IP found")

    bdd = Bdd()
    doesTotemExist = bdd.checkTotemID(token["totemID"])
    if not doesTotemExist:
        # 403 forbidden
        raise HTTPException(status_code=403, detail="The token is not linked to a valid totem")
    
    return token

@app.get("/user/", tags=["user"])
async def read_user_params(token: str):
    """
    It returns all details about the user parameters
    """
    token = await check_user_token(token)

    bdd = Bdd()
    return bdd.getUserParamsDetails(token["totemID"], token["totemIP"])


@app.get("/user/param/{param_name}", tags=["user"])
async def read_user_param(token: str, param_name: str):
    """
    It returns the details of a specific parameter
    """

    token = await check_user_token(token)

    bdd = Bdd()
    result = bdd.getUserSpecificParam(token["totemID"], token["totemIP"], param_name)

    # if result is empty, return 404
    if result == []:
        raise HTTPException(status_code=404, detail="Not found")
    
    return result



@app.post("/user/param/{param_name}/{param_value}", tags=["user"])
async def update_user_param(token: str, param_name: str, param_value: int):
    """
    It updates the value of a specific parameter
    """

    token = await check_user_token(token)

    bdd = Bdd()
    result = await bdd.setUserParam(token["totemID"], token["totemIP"], param_name, param_value)

    # TODO: send the osc message to the totem
    # TODO: verif if param_value is in the range of the param_name 

    if result == 'failed':
        raise HTTPException(status_code=404, detail="No found")

    return {'success': result}


# admin default routes

@app.get("/admin/", tags=["admin"])
def read_admin_params(token: str):
    """
    It returns all details about the totems
    """ 

    #TODO: check if the token is valid, then return the totems details from the database

@app.put("/admin/param/{param_name}/{param_value}", tags=["admin"])
def update_admin_param(token: str, param_name: str, param_value: int):
    """
    It updates the value of a specific parameter for all totems
    """

    #TODO: check if the token is valid, then set the parameter value in the database
    #TODO: send the osc message to the totems

# admin group routes

@app.get("/admin/group/", tags=["admin"])
def read_admin_groups(token: str):
    """
    It returns aa list of all groups
    """

    #TODO: check if the token is valid, then return the groups from the database

@app.get("/admin/group/{group_id}", tags=["admin"])
def read_admin_group_params(token: str, group_id: int):
    """
    It returns all details about the totems of a specific group and the parameters linked to this group
    """

    #TODO: check if the token is valid, then return the group details from the database

@app.post("/admin/group/{group_id}", tags=["admin"])
def create_admin_group(token: str, group_id: int):
    """
    It creates a new empty group (return the id of the new group)
    """

    #TODO: check if the token is valid, then create the group in the database

@app.put("/admin/group/{group_id}/{totem_id}", tags=["admin"])
def add_admin_group_totem(token: str, group_id: int, totem_id: int):
    """
    It adds a totem to a group
    """

    # TODO: check if the token is valid, then add the totem to the group in the database

@app.put("/admin/group/param/{group_id}/{param_name}/{param_value}", tags=["admin"])
def update_admin_group_param(token: str, group_id: int, param_name: str, param_value: int):
    """
    It updates the value of a specific parameter for all totems of a specific group
    """

    # TODO: check if the token is valid, then set the parameter value in the database

@app.delete("/admin/group/{group_id}", tags=["admin"])
def delete_admin_group(token: str, group_id: int):
    """
    It deletes a group
    """

    # TODO: check if the token is valid, then delete the group in the database

@app.delete("/admin/group/{group_id}/{totem_id}", tags=["admin"])
def delete_admin_group_totem(token: str, group_id: int, totem_id: int):
    """
    It removes a totem from a group
    """

    # TODO: check if the token is valid, then remove the totem from the group in the database



if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=5050)