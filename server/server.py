import socket
import threading
import time
import psycopg2

UDP_IP_ADDRESS = "localhost"
UDP_PORT_NO = 6000
TIME_PING = 50

###################################### Connexion BDD
try:
    conn = psycopg2.connect(
        host="localhost",
        database="postgres",
        user="postgres",
        password="011001",
        port="8000"
    )
except (Exception, psycopg2.DatabaseError) as error:
    print(error)

###################################### Ping
table = []

def findIdInBDD():
    requestIdInBDD = """SELECT totem_id, totem_ip FROM totem"""
    try:
        listIdBDD = []
        listIpBDD = []
        cur = conn.cursor()
        cur.execute(requestIdInBDD)
        row = cur.fetchone()
        while row is not None:
            listIdBDD.append(row[0])
            listIpBDD.append(row[1])
            row = cur.fetchone()
        cur.close()
    except(Exception, psycopg2.DatabaseError) as error:
        print(error)
    return listIdBDD, listIpBDD



def endChrono(table):
    tableId = []
    infoBDD = findIdInBDD()
    listIdBDD = infoBDD[0]
    listIpBDD = infoBDD[1]
    for i in range(len(table)):
        tableId.append(int(table[i][0]))
    listToRemove = list(set(listIdBDD) - set(tableId))

    for i in range(len(listToRemove)):
        for j in range(len(listIdBDD)):
            if(listIdBDD[j] == listToRemove[i]):
                deleteInput(int(listIdBDD[j]), str(listIpBDD[j]))


    
def timing(table):
    time.sleep(TIME_PING)
    endChrono(table)

def ping():
    global table
    while(True):
        addr = socket.recvfrom(1024)   
        if(addr not in table):
            table.append(addr)
            if(int(addr[0]) not in findIdInBDD()[0]):
                insertInput(int(addr[0]), str(addr[1]))  

def checkPing():
    global table
    tPingTime = threading.Thread(target=timing, args=(table,))
    tPingTime.start()
    tPing = threading.Thread(target=ping)
    tPing.start()
    while(True):
        if(tPingTime.is_alive() == False):
            tPingTime = threading.Thread(target=timing, args=(table,))
            tPingTime.start()
            table = []

###################################### Requêtes BDD
def insertInput(totemId, totemIp):
    request = """SELECT create_new_totem(%s, %s);"""
    try:
        # create a new cursor
        cur = conn.cursor()
        cur.execute(request, (totemId, totemIp))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)



def deleteInput(totemId, totemIp):
    request = """SELECT delete_totem(%s, %s)"""
    try:
        # create a new cursor
        cur = conn.cursor()
        cur.execute(request, (totemId, totemIp))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
        #delUselessGroupes(groupe_id)
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)


###################################### Connexion UDP
socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
socket.bind((UDP_IP_ADDRESS, UDP_PORT_NO))

print("UDP server up and listening")
checkPing()