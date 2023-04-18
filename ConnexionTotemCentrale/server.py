import socket
import threading
import time
import sys
import psycopg2

from utils import checkForEnvVar, loadEnvVar
checkForEnvVar()

UDP_IP_ADDRESS = loadEnvVar("../centrale_Info.env")['IP']
UDP_PORT_NO = 6000
TIME_PING = 50

###################################### Connexion BDD
BDD_CREDENTIALS = loadEnvVar("../database_credentials.env")

try:
    conn = psycopg2.connect(
        host=BDD_CREDENTIALS['DB_HOST'],
        database=BDD_CREDENTIALS['DB_NAME'],
        user=BDD_CREDENTIALS['DB_USER'],
        password=BDD_CREDENTIALS['DB_PASSWORD'],
        port=BDD_CREDENTIALS['DB_PORT']
    )

    cur = conn.cursor()
except (Exception, psycopg2.DatabaseError) as error:
    print(error)

###################################### Ping
table = []
over = False
def findInBDD(totemID, totemIP):
    requestIdInBDD = """SELECT totem_id, totem_ip FROM totem WHERE totem_id = %s AND totem_ip = %s;"""
    try:
        cur.execute(requestIdInBDD, (totemID, totemIP,))
        row = cur.fetchone()

        if row is not None:
            # return the totem id and ip of the totem
            print(row)
            return row
        else:
            return None

    except(Exception, psycopg2.DatabaseError) as error:
        print(error)
        return None
    except KeyboardInterrupt:
        sys.exit()
    
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
    try:
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
                    print("deleting" + str(listIdBDD[j]) + " " + str(listIpBDD[j])+ " " + time.strftime("%H:%M:%S"))
    except KeyboardInterrupt:
        sys.exit()              

    
def timing(table):
    try:
        time.sleep(TIME_PING)
        endChrono(table)
    except KeyboardInterrupt:
        sys.exit()    

def ping():
    global table
    global over
    while(not over):
        try:
            if(socket):
                addr = socket.recvfrom(1024)   
                if(addr not in table):
                    table.append(addr)

                    totem_id = int(addr[0])
                    totem_ip = str(addr[1]).split("'")[1]

                    if findInBDD(totem_id, totem_ip) is None:
                        insertInput(totem_id, totem_ip)  
                        print("pong")
                        print("inserting" + str(totem_id) + " " + str(totem_ip) + " " + time.strftime("%H:%M:%S"))
        except KeyboardInterrupt:
            sys.exit()

def checkPing():
    global table
    global over
    tPingTime = threading.Thread(target=timing, args=(table,))
    tPingTime.daemon = True
    tPingTime.start()
    tPing = threading.Thread(target=ping)
    tPing.daemon = True
    tPing.start()
    while(not over):
        try:
            if(tPingTime.is_alive() == False):
                tPingTime = threading.Thread(target=timing, args=(table,))
                tPingTime.start()
                table = []
        except KeyboardInterrupt:
            over = True
            print("The UDP server has been stopped")
            sys.exit()
        
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
if __name__ == "__main__":
    try:
        checkPing()
    except KeyboardInterrupt:
        print("KeyboardInterrupt")
        socket.close()
        conn.close()
