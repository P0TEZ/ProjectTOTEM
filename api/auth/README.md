# TOTEM AUTH API

## Introduction

This api takes care of the authentication of user and admin. It is used by the totem app to authenticate users and admins.

## Description

>The api is written in python using the **fastapi** framework. It uses a postgres database to store the users and admins.

This api takes:

- Admin password as input and hash it using sha256 algorithm. If the password is correct, it generates a JWT token and send it to the client. The token is valid for **12 hours**.
- TotemId as input. If the totemId is correct, it generates a JWT token and send it to the client. The token is valid for **12 hours**. The token also provide the TotemIp.

Api endpoints:

- **/admin/:password** : authenticate an admin
- **/totem/:totemId** : authenticate a totem

## Installation

### Requirements

- python `3.10.7`
- pip `22.3`

- fastapi `0.95.0`
- uvicorn  `0.21.0`
- (py)jwt `2.6.0`
- datetime `5.1`
- psycopg2 `2.9.5`
- logging `0.5.1.2`
- hashlib `3.10`

### Needed environment variables

#### database_credentials

The database credentials are stored in the file `../database_credentials.env`. This file is not tracked by git. It should be created with the following content:

```bash
    DB_HOST=YOUR_DB_HOST
    DB_PORT=YOUR_DB_PORT
    DB_NAME=YOUR_DB_NAME
    DB_USER=YOUR_DB_USER
    DB_PASSWORD=YOUR_DB_PASSWORD
```

#### jwt_secret

The jwt secret is stored in the file `../jwt_secret.env`. This file is not tracked by git. It should be created with the following content:

```bash
    JWT_KEY=YOUR_JWT_SECRET
```

## Usage

### Run the api

To run the api, you need to have a postgres database running. You can then run the api with the following command:

```bash
    python ./app.py
```

## Documentation

The automatically generated documentation documentation of the api can be found [here](http://localhost:5000/docs#).
