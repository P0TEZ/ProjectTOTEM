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
client.connect((UDP_IP, UDP_PORT))

if __name__ == "__main__":
    while(True):
        client.sendto(str.encode(number), (UDP_IP, UDP_PORT))
        print("Ping")
        time.sleep(TIME_PING)