import socket
import threading
import time
import psycopg2

txt = open("bdd.txt", "w")

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

UDP_IP_ADDRESS = "localhost"
UDP_PORT_NO = 6000

###################################### Ping
table = []
tableId = []

def endChrono(table, tableId):
    requestIdInBDD = """SELECT totem_id FROM totem"""
    try:
        listIdBDD = []
        cur = conn.cursor()
        cur.execute(requestIdInBDD)
        row = cur.fetchone()
        while row is not None:
            listIdBDD.append(row[0])
            row = cur.fetchone()
        cur.close()
        print(listIdBDD)
        listToRemove = list(set(listIdBDD) - set(tableId))
        listToAdd = list(set(tableId) - set(listIdBDD))
        for i in range(len(listToRemove)):
            print("A suppr : " + str(listToRemove[i])) 
            deleteInput(listToRemove[i])
        for i in range(len(listToAdd)):
            for j in range(len(table)):
                if(int(table[j][0]) == listToAdd[i]):
                    insertInput(table[j][1], listToAdd[i])  
    except(Exception, psycopg2.DatabaseError) as error:
        print(error)
    
def timing(table, tableId, time_ping):
    time.sleep(time_ping)
    endChrono(table, tableId)

def ping():
    global table
    while(True):
        addr = socket.recvfrom(1024)     
        table.append(addr)
        print(table)

def checkPing():
    global table
    global tableId
    time_ping = 20
    tPingTime = threading.Thread(target=timing, args=(table, tableId, time_ping))
    tPingTime.start()
    tPing = threading.Thread(target=ping)
    tPing.start()
    while(True):
        if(tPingTime.is_alive() == False):
            for i in range(len(table)):
                id = table[i][0]
                tableId.append(int(id))
            print(tableId)
            tPingTime = threading.Thread(target=timing, args=(table, tableId, time_ping))
            tPingTime.start()
            table = []
            tableId = []
            print("New Cycle")
         


###################################### Requêtes BDD
def addGroupe():
    groupeIdMax = 0
    request = """SELECT MAX(groupe_id) FROM groupe;"""
    try:
        cur = conn.cursor()
        cur.execute(request)
        groupeIdMax = cur.fetchone()[0] + 1
        conn.commit()
        cur.close()
    except(Exception, psycopg2.DatabaseError) as error:
        print(error)
    return groupeIdMax
    
def delUselessGroupes(groupe_id):
    request = """SELECT COUNT(groupe_id) FROM totem WHERE groupe_id =(%s);"""
    try:
        cur = conn.cursor()
        cur.execute(request, (groupe_id,))
        nbGroupe = cur.fetchone()[0]
        if(nbGroupe == 0):
            request2 = """DELETE FROM groupe WHERE groupe_id = (%s);"""
            cur.execute(request2, (groupe_id,))
            print("suppr!!!!")
            conn.commit()
        else:
            print(nbGroupe)
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)


def insertInput(address, totemId):
    request1 = """INSERT INTO public.groupe values (%s);"""
    request2 = """INSERT INTO public.totem values (%s, %s, %s);"""
    try:
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        newGroupe = addGroupe()
        cur.execute(request1, (newGroupe,))
        cur.execute(request2, (address, totemId, newGroupe))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)



def deleteInput(totemId):
    request = """SELECT groupe_id FROM totem WHERE TOTEM_ID = (%s)"""
    request2 = """DELETE FROM TOTEM WHERE TOTEM_ID = (%s);"""
    try:
        # create a new cursor
        cur = conn.cursor()
        # execute the INSERT statement
        cur.execute(request, (totemId,))
        groupe_id = cur.fetchone()[0]
        print("groupe_id = " + str(groupe_id))
        cur.execute(request2, (totemId,))
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
        delUselessGroupes(groupe_id)
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
socket.bind((UDP_IP_ADDRESS, UDP_PORT_NO))

print("UDP server up and listening")
checkPing()