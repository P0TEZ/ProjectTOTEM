from utils import checkForEnvVar
checkForEnvVar()
from models import Token, Bdd

from fastapi import FastAPI, HTTPException
import uvicorn



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
)

@app.get("/")
def read_root():
    return {
        "Name": "TOTEM_API",
        "Status": "Online"
    }

@app.get("/totem/{totem_id}")
def read_totem(totem_id: int):
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

@app.get("/totem/{totem_id}/ip")
def read_totem_ip(totem_id: int):
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

@app.get("/params")
def read_params():
    """
    It returns all details about the parameters
    """

    bdd = Bdd()
    return bdd.getParamsDetails()




if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=5050)