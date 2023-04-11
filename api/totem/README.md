# TOTEM API

## Introduction

This api takes is used by the totem app to edit or get the totem's parameters. It also takes care of the groupe's creation and gestion.

## Description

>The api is written in python using the **fastapi** framework. It uses a postgres database to store the groups and their parameters.

To use the api, you need to be authenticated. You can authenticate with the [auth api](../auth/README.md). This api will return the JWT token that you need to use to access the totem api.

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
- OSC `1.8.1`

### Needed environment variables

#### database_credentials

The database credentials are stored in the file `../../database_credentials.env`. This file is not tracked by git. It should be created with the following content:

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

The automatically generated documentation documentation of the api can be found [here](http://localhost:5050/docs#).
