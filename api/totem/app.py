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

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=5050)