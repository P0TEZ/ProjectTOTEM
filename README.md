<!-- @format -->
<p align="center" width="100%">
	<img src="./img/totem.png">
	<h1 align="center">PROJECT TOTEM</h1>
	<div width="100%" align="center" style='display:flex;align-items:center'>
		<img src="./img/interreg.png" width="24%">
		<img src="./img/junia.png" width="24%">
		<img src="./img/hovertone.png" width="24%">
		<img src="./img/aeronef.png" width="24%">
	</div>
</p>

### Links

-   [Introduction](#introduction)
-   [Description](#description)
-   [Services](#services)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Information](#information)
-   [Authors](#authors)

## Introduction

This project is a school project. The goal is to create an application that can be used by a group of people to control a TOTEM (a device that can be used to convert sound into vibration). The application will be used to control the TOTEM's parameters (volume, balance, preset, etc...). The application will also be used by an admin to create groups and to add people to the group. Each group will have its own parameters.

## Description

-   In this project, there are multiple raspberry pi. Each raspberry pi is running a different service. The raspberry that is running the network and the most services is called the Centrale C. The other raspberry pi are called TOTEM. The TOTEM are connected to the Centrale C using wifi. In this project, there are 1 centrale C and multiple TOTEM.
-   Each user can connect to his TOTEM using the web application on his mobile device. The Admin can connect to the admin page using the web application on his laptop. The admin can create groups and add people to the group. Each group will have its own parameters. The admin can also change the parameters of the group.

## Services

The project is composed of multiple services:

| Name                                                          | Language/Technologie           | Serveur port | File location          | Running location  |
| ------------------------------------------------------------- | ------------------------------ | ------------ | ---------------------- | ----------------- |
| [TOTEM Web App](totem-web-app/README.md)                      | TypeScript, React              | 3000         | totem-web-app          | Centrale C        |
| [TOTEM Node Server](nodeServer/README.md)                     | JavaScript, Node.js, Socket.io | 4000         | nodeServer             | Centrale C        |
| [TOTEM Auth API](api/auth/README.md)                          | Python, FastAPI                | 5000         | api/auth               | Centrale C        |
| [TOTEM API](api/totem/README.md)                              | Python, FastAPI                | 5050         | api/totem              | Centrale C        |
| [OSC service](api/totem/README.md)                            | Python, python-osc             | 9000         | api/totem              | Centrale C        |
| [DataBase](BDD/README.md)                                     | PostgreSQL                     | 5432         | BDD                    | Centrale C        |
| [TOTEM Centrale Connection](ConnexionTotemCentrale/README.md) | Python                         | 6000         | ConnexionTotemCentrale | TOTEM, Centrale C |

## Installation

### Raspberry pi configuration

For the installation, you need to first configure your rapsberry "Centrale C", then your raspberries "TOTEM".
In Centrale C, the OS installed is the Raspberry Pi OS (64-bit), and in TOTEM, the OS installed is the Raspberry Pi OS (32-bit).

#### Centrale C configuration

Centrale C needs to host the following services: [TOTEM Web App](totem-web-app/README.md), [TOTEM Node Server](nodeServer/README.md), [TOTEM Auth API](api/auth/README.md), [TOTEM API](api/totem/README.md), [OSC service](api/totem/README.md), [DataBase](BDD/README.md).
To do so, you need to install the following services on the Centrale C:

-   Python 3.7
-   Node.js 16.17.1
-   Npm 8.1.2
-   PostgreSQL 13.4

#### Centrale C as a routeur

Centrale C will be the router in our system. Therefore, you will need to configure several files within your raspberry.
First, we will use hostpad and dnsmasq to configure our routeur, download the following packages `sudo apt-get install hostapd dnsmasq`.
Then, stop the services hostapd (`sudo systemctl stop hostapd`) and dnsmasq (`sudo systemctl stop dnsmasq`).
Then, we will configure the file `/etc/dhcpcd.conf` to give a static IP address to the Centrale C. Add the following lines to the file:

    interface wlan0
        static ip_address=192.168.4.1/24
        nohook wpa_supplicant`

You can then restart the dhcpcd service (`sudo systemctl dhcpcd restart`).
Before the configuration of the file `/etc/dnsmasq.conf`, save the original file (`sudo mv /etc/dnsmasq.conf /etc/dnsmasq.conf.orig`).
Then, add the following lines to the file `/etc/dnsmasq.conf`:

    interface=wlan0
    dhcp-range=192.168.1.2,192.168.1.25,255.255.255.0,24h

Then start the dnsmasq service.

    sudo systemctl start dnsmasq

Then, we will configure the file `/etc/hostapd/hostapd.conf`. Add the following lines to the file:

    interface=wlan0
    country_code=FR
    ssid=TotemNetwork
    channel=6
    auth_algs=1
    wpa=2
    wpa_passphrase=totemmdp
    wpa_key_mgmt=WPA-PSK
    wpa_pairwise=TKIP CCMP
    rsn_pairwise=CCMP

Then, we will configure the file `/etc/default/hostapd`. Uncomment the following line to the file:

    DAEMON_CONF="/etc/hostapd/hostapd.conf"

Then, start the hostapd service.

    sudo systemctl unmask hostapd
    sudo systemctl enable hostapd
    sudo systemctl start hostapd

To stop the routeur configuration and to go back to the normal configuration, you can use the following commands:

    sudo systemctl stop hostapd
    sudo systemctl stop dnsmasq
    sudo mv /etc/dnsmasq.conf.orig /etc/dnsmasq.conf
    sudo systemctl start dnsmasq
    sudo systemctl start hostapd

And comment the following lines in the file `/etc/dhcpcd.conf`:

    interface wlan0
        static ip_address=192.168.4.1/24
        nohook wpa_supplicant`

Finally, you can restart the dhcpcd service (`sudo systemctl dhcpcd restart`).

#### Centrale C Bash Script

You first have to create the file `/etc/init.d/boot_centraleC.sh`
This is what is going to execute on the raspberry pi's startup, the following commands are necessary :

    #!/bin/bash

    cd /path/to/install/api/auth
    python app.py &
    cd ../totem
    python app.py &
    cd ../../ConnexionTotemCentrale
    python server.py &
    cd ../nodeServer
    node index.js
    cd ../totem-web-app
    npm start &

Then you have to write the script that is going to execute on the raspberry's shutdown in `/etc/init.d/stop_centraleC.sh` :

    #!/bin/bash

    cd /path/to/install/api/auth
    pkill -f app.py
    cd ../totem
    pkill -f app.py
    cd ../../ConnexionTotemCentrale
    pkill -f server.py
    killall nodeù=ù
    cd ../BDD
    sudo su postgres -c "psql -U postgres -d totem -c 'TRUNCATE TABLE totem, set_to, groupe;'"

To finish Centrale C's startup config you have to create the service file in `/lib/systemd/system/centraleC.service` :

    [Unit]
    Atfer=multi-user.target

    [Service]
    Description=Démarrage de tous les services totem
    User=`yourUsername`
    Group=`yourUsername`
    Type=oneshot
    ExecStart=/etc/init.d/boot_centraleC.sh
    ExecStop=/etc/init.d/stop_centraleC.sh
    RemainAfterExit=yes

    [Install]
    WantedBy=multi-user.target

You then have to execute the following commands :

    sudo systemctl enable centraleC.service

You can then start, stop and check the status of your service at anytime using :

    sudo systemctl start centraleC.service
    sudo systemctl stop centraleC.service
    systemctl status centraleC.service

#### Totem configuration

This configuration takes into consideration the previous installation of this project. To learn about it, go to https://github.com/parthurp/TOTEM/blob/main/INSTALL_pi.md.

Once this pre-configuration is done, there are some additional steps to do to configure the TOTEM.
First, install on the Raspberry Python 3.7 and pip3.
Then, install the TOTEM Centrale Connection service.
Then, you need to configure the file `TOTEMCentraleConnexion/.env`. You need to write the following lines:

    IP_CENTRALE = "192.168.1.1"

You then have to set the scripts that execute on the totem's startup.
They are located in `/etc/init.d/start_totem.sh` :

    #!/bin/bash

    cd /path/to/install/ConnexionTotemCentrale
    python client.py &

You also have to write the shutdown script in `/etc/init.d/stop_totem.sh`

    #!/bin/bash

    cd /path/to/install/ConnexionTotemCentrale
    pkill -f client.py

Similarly to the Centrale C you also have to write the service in `/lib/systemd/system/totem.service`

    [Unit]
    Atfer=multi-user.target

    [Service]
    Description=Démarrage de tous les services totem
    Type=oneshot
    ExecStart=/etc/init.d/start_totem.sh
    ExecStop=/etc/init.d/stop_totem.sh
    RemainAfterExit=yes

    [Install]
    WantedBy=multi-user.target

You then have to execute the following commands :

    sudo systemctl enable totem.service

You can then start, stop and check the status of your service at anytime using :

    sudo systemctl start totem.service
    sudo systemctl stop totem.service
    systemctl status totem.service

### Services installation

> The installation instruction are given in each services folder. You can find the link to the folder in the table above. The link will redirect you to the README.md file of the service. The README.md file will contain the installation instruction.

**Note:** To know where to install the services, you can look at the table above. The "Running location" column will tell you where to install the service (on Centrale C or on TOTEM).

## Usage

### Centrale C usage

The centrale C is a Raspberry Pi. When powered on with a battery or with a power supply, it will automatically start all the necessary services (APIs, Web Server, Wi-Fi Hotspot).

### TOTEM usage

TOTEM lives in a box. When powered on with the battery, all its inside components will power on and start the necessary services (Connection to Centrale C's network, Audio Processing softwares).

### Web App usage

To connect to the web app, you need to be connected to the Centrale C network. Then you can connect to the web app using the following link: `http://<Centrale C IP>:3000/`. You can find the IP address of the Centrale C in the "Centrale C configuration" section.

#### Admin page

You can access the admin page using the following link: `http://<Centrale C IP>:3000/admin`.
The default admin credentials are: "T0TEM@dmin". You can change the admin credentials in the database in the admin table (You have to hash it using cha-256 before).

In the admin page, you can create groups and add people to the group. Each group will have its own parameters. You can also change the parameters of the group.

#### User page

You can access the user page using the following link: `http://<Centrale C IP>:3000/`. Then click `continue` and enter the TOTEM code. The group code is the code that set in TOTEM configuration. You can find the TOTEM code in the "TOTEM configuration" section.

In the user page, you can change the parameters of the TOTEM.

## Information

**Default admin credentials:** "T0TEM@dmin"

**Network name:** "TotemNetwork"

**Network password:** "totemmdp"

## Authors

-   [P0TEZ Alexandre](https://github.com/P0TEZ)
