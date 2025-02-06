from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from service import data_svc
from pydantic import BaseModel

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins="http://localhost:5173",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def hello_world():
    return "Hello world"


@app.get("/names")
def get_names():
    # names = data_svc.get_names() testing zod validation in react
    # names.append(False)
    return {"data": data_svc.get_names()}


class Name(BaseModel):
    name: str


@app.post("/name")
def add_names(name: Name):
    return {"data": data_svc.add_name(name.name)}


@app.delete("/name/{name}")
def delete_name(name):
    return {"data": data_svc.delete_name(name)}
