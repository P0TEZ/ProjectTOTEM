import socket
import time

txt = open("number.txt", 'r')
number = txt.readline()

UDP_IP = 'localhost'
UDP_PORT = 6000

client = socket.socket(socket.AF_INET, # Internet
                     socket.SOCK_DGRAM) # UDP
client.connect((UDP_IP, UDP_PORT))

while(True):
    client.sendto(str.encode(number), (UDP_IP, UDP_PORT))
    time.sleep(20)