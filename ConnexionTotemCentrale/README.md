# UDP Server

## Introduction

This server allows exchanges between the Centrale C and the totems. Active totems can be detected and are inserted/deleted in a dynamic way into the database.

## Description

>This server uses the UDP protocol to create the connexions. The informations received by the server are put in a postgres database.

## Installation

`server.py` and `utils.py` must be installed in the Centrale C.
`client.py` and `number.txt` must be installed in each totem.

### Requirements

- python `3.10.7`
- pip `21.3`
- psycopg2 `2.9.5`

### Needed environment variables

The database credentials are stored in the file `../database_credentials.env`. This file is not tracked by git. It should be created with the following content:

```bash
    DB_HOST=YOUR_DB_HOST
    DB_PORT=YOUR_DB_PORT
    DB_NAME=YOUR_DB_NAME
    DB_USER=YOUR_DB_USER
    DB_PASSWORD=YOUR_DB_PASSWORD
```

The server IP is stored in the file `../centrale_Info.env`. This file is not tracked by git. It should be created with the following content:

```bash
    IP=YOUR_SERVER_IP
```

Each `number.txt` has a distinct 4 digit number that correspond to the ID of the totem.

## Usage

### Run the server

To run the server, you need to have a postgres database running. You can then run the api with the following command:

```bash
    python ./server.py
```

## Change the ping

To change the interval time between ping from the server (to check which totems are still connected), change the value (in seconds) in `server.py` : `TIME_PING`

To change the interval between ping from the totems (messages sent to the server to show its connexion), change the value (in seconds) in `client.py` : `TIME_PING`

`TIME_PING` from `server.py` must be bigger than `TIME_PING` from `client.py`

## Change the IP Address

To ensure a connexion between the server and the totems, the IP address between `server.py` and `client.py` must be the same, the IP coming from the server side.
