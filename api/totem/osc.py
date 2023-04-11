from pythonosc import udp_client #v1.8.1

PORT = 9000

class Osc:
    # add a static variable to store the instance
    __instance = []

    def __init__(self, totemID, totemIP, port = PORT):
        try:
            self.totemID = totemID
            self.totemIP = totemIP
            self.port = port

        except Exception as e:
            print(e)
            return None
        
    def get_instance(self, totemID, totemIP):

        for instance in self.__instance:
            if instance['totemID'] == totemID and instance['totemIP'] == totemIP:
                return instance
        return None

        
    def connect(self, totemID, totemIP, port = PORT):
        # print("OSC client creation")
        try:
            client = udp_client.SimpleUDPClient(totemIP, port)
            # print("OSC client created")
            self.__instance.append({'totemID': totemID, 'totemIP': totemIP, 'client': client})
            # print("OSC client creation successful")
        except Exception as e:
            print(e)
            return e

    def send(self, paramName, value):
        # TODO: verify that the parameter name is valid and the value is in the range
        try:
            instance = self.get_instance(self.totemID, self.totemIP)

            if instance is None:
                self.connect(self.totemID, self.totemIP, self.port)
                instance  = self.get_instance(self.totemID, self.totemIP)

                # print("OSC client created")           
            
            else:
                pass
                # print("OSC client already exists")

            # print("OSC client: ", instance)
            client = instance['client']  
            # print(instance)        
            if client.send_message("/" + paramName, value):
                print("OSC message sent correctly")
                return True
            else:
                print("OSC message not sent not sent correctly")
                return False

        except Exception as e:
            print(e)
            return e