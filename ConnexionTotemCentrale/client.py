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

    while(True):
        try:
            client.connect((UDP_IP, UDP_PORT))
            client.sendto(str.encode(number), (UDP_IP, UDP_PORT))
            print("Ping" + " " + time.strftime("%H:%M:%S"))

        except KeyboardInterrupt:
            print("Fermeture du client")
            client.close()
            exit(0)

        except Exception as e:
            print("Erreur : ", e)
        
        time.sleep(TIME_PING)