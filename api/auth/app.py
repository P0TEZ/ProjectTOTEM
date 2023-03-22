from utils import checkForEnvVar
checkForEnvVar()
from models import Token, Bdd

from fastapi import FastAPI, HTTPException
import uvicorn



app = FastAPI(
    title="AuthTotemAPi",
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
        "Name": "TOTEM_AUTH_API",
        "Status": "Online"
    }


@app.get("/admin/{password}")
async def admin(password: str):
    print("eeeeeeeeeeaaaa")

    if not isinstance(password, str):
        raise HTTPException(status_code=400, detail="The password must be a string")
    if Bdd().isAdminPassword(password):
        return {Token(isAdmin=True).encode_auth_token()}
    else:
        raise HTTPException(status_code=401, detail="Invalid password")


@app.get("/totem/{totemID}")
async def totem(totemID: int):

    if not isinstance(totemID, int):
        raise HTTPException(status_code=400, detail="The password must be a integer")
    
    if Bdd().isTotemID(totemID):
        TOTEM_IP = Bdd().getTotemIP(totemID)
        return {Token(totemID=totemID, totemIP=TOTEM_IP).encode_auth_token()}
    else:
        raise HTTPException(status_code=401, detail="Invalid totem code")


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=5000)