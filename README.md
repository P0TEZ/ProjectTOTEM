# ProjectTOTEM

## Introduction

This project is a school project. The goal is to create an application that can be used by a group of people to control a TOTEM (a device that can be used to convert sound into vibration). The application will be used to control the TOTEM's parameters (volume, balance, preset, etc...). The application will also be used by an admin to create groups and to add people to the group. Each group will have its own parameters.

## Description

- In this project, there are multiple raspberry pi. Each raspberry pi is running a different service. The raspberry that is running the network and the most services is called the Centrale C. The other raspberry pi are called TOTEM. The TOTEM are connected to the Centrale C using wifi. In this project, there are 1 centrale C and multiple TOTEM.
- Each user can connect to his TOTEM using the web application on his mobile device. The Admin can connect to the admin page using the web application on his laptop. The admin can create groups and add people to the group. Each group will have its own parameters. The admin can also change the parameters of the group.

## Services

The project is composed of multiple services:

| Name | Language/Technologie | Serveur port | File location | Running location |
| --- | --- | --- | --- | --- |
| [TOTEM Web App](totem-web-app/README.md) | TypeScript, React | 3000 | totem-web-app | Centrale C |
| [TOTEM Node Server](nodeServer/README.md) | JavaScript, Node.js, Socket.io | 4000 | nodeServer | Centrale C |
| [TOTEM Auth API](api/auth/README.md) | Python, FastAPI | 5000 | api/auth | Centrale C |
| [TOTEM API](api/totem/README.md) | Python, FastAPI | 5050 | api/totem | Centrale C |
| [OSC service](api/totem/README.md) | Python, python-osc | 9000 | api/totem | Centrale C |
| [DataBase](BDD/README.md) | PostgreSQL | 5432 | BDD | Centrale C |
| [TOTEM Centrale Connection](ConnexionTotemCentrale/README.md) | Python | 6000 | ConnexionTotemCentrale | TOTEM |

## Installation

### Raspberry pi configuration

<!-- TODO -->

#### Centrale C configuration

<!-- TODO -->

#### Totem configuration

<!-- TODO -->

### Services installation

> The installation instruction are given in each services folder. You can find the link to the folder in the table above. The link will redirect you to the README.md file of the service. The README.md file will contain the installation instruction.

**Note:** To know where to install the services, you can look at the table above. The "Running location" column will tell you where to install the service (on Centrale C or on TOTEM).

## Usage

### Centrale C usage

<!-- TODO -->

### TOTEM usage

<!-- TODO -->

### Web App usage

To connect to the web app, you need to be connected to the Centrale C network. Then you can connect to the web app using the following link: `http://<Centrale C IP>:3000/`. You can find the IP address of the Centrale C in the "Centrale C configuration" section.

#### Admin page

You can access the admin page using the following link: `http://<Centrale C IP>:3000/admin`.
The default admin credentials are: "T0TEM@dmin". You can change the admin credentials in the database in the admin table (You have to hash it using cha-256 before).

In the admin page, you can create groups and add people to the group. Each group will have its own parameters. You can also change the parameters of the group.

#### User page

You can access the user page using the following link: `http://<Centrale C IP>:3000/`. Then click `continue` and enter the TOTEM code. The group code is the code that set in TOTEM configuration. You can find the TOTEM code in the "TOTEM configuration" section.

In the user page, you can change the parameters of the TOTEM.

## Authors

- [P0TEZ Alexandre](https://github.com/P0TEZ)