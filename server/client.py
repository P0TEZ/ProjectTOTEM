import socket
import time

txt = open("number.txt", 'r')
number = txt.readline()

#UDP_IP = '192.168.43.239'
UDP_IP = 'localhost'
UDP_PORT = 6000
TIME_PING = 20

client = socket.socket(socket.AF_INET, # Internet
                     socket.SOCK_DGRAM) # UDP
client.connect((UDP_IP, UDP_PORT))

while(True):
    client.sendto(str.encode(number), (UDP_IP, UDP_PORT))
    time.sleep(TIME_PING)