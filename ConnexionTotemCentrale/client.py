import socket
import time

from utils import checkForEnvVar, loadEnvVar
checkForEnvVar()

txt = open("number.txt", 'r')
number = txt.readline()

UDP_IP = loadEnvVar("../centrale_Info.env")['IP']
UDP_PORT = 6000
TIME_PING = 20

client = socket.socket(socket.AF_INET, # Internet
                     socket.SOCK_DGRAM) # UDP

if __name__ == "__main__":

    try:
        client.connect((UDP_IP, UDP_PORT))
        while(True):
            client.sendto(str.encode(number), (UDP_IP, UDP_PORT))
            print("Ping" + " " + time.strftime("%H:%M:%S"))
            time.sleep(TIME_PING)

    except KeyboardInterrupt:
        print("Fermeture du client")
        client.close()

    except Exception as e:
        print("Erreur : ", e)