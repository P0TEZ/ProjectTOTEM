# UDP Server

## Introduction

This server allows exchanges between the Centrale C and the totems. 

## Description


## Installation

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

## Usage

### Run the server

To run the server, you need to have a postgres database running. You can then run the api with the following command:

```bash
    python ./server.py
```

## Change the ping

To change the interval time between ping from the server (to check which totems are still connected), change the value (in seconds) in server.py : TIME_PING

To change the interval between ping from the totems (messages sent to the server to show its connexion), change the value (in seconds) in client.py : TIME_PING

TIME_PING from server.py must be bigger than TIME_PING from client.py

## Change the IP Address

To ensure a connexion between the server and the totems, the IP address between server.py and client.py must be the same, the IP coming from the server side.