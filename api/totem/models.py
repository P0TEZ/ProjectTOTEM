import jwt
import datetime
import psycopg2
from hashlib import sha256

from utils import loadEnvVar


SECRET_KEY = loadEnvVar("../jwt_secret.env")['JWT_KEY']

# It's a class that creates a token, and then encodes it with a secret key, and then decodes it with
# the same secret key
class Token:
    def __init__(self, secret_key = SECRET_KEY, isAdmin = False, totemID = None, totemIP = None):
        self.secret_key = SECRET_KEY
        self.isAdmin = isAdmin
        self.totemID = totemID
        self.totemIP = totemIP

    def encode_auth_token(self):
        """
        It takes a user object, and returns a JWT token that contains the user's totemID and isAdmin
        status
        :return: The token
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, hours=12, minutes=0),
                'iat': datetime.datetime.utcnow(),
                'isAdmin': self.isAdmin,
                'totemID': self.totemID,
                'totemIP': self.totemIP
            }

            return jwt.encode(
                payload,
                SECRET_KEY,
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(token):
        """
        It takes a token as an argument, and returns the payload if the token is valid, or an error message
        if the token is invalid
        
        :param token: The token to decode
        :return: The payload is being returned.
        """
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            return payload
        
        except jwt.ExpiredSignatureError:
            return 'Expired'
        
        except jwt.InvalidTokenError:
            return 'Invalid'
        
        except Exception as e:
            return e
        


BDD_CREDENTIALS = loadEnvVar("../database_credentials.env")

class Bdd:
    def __init__(self):
        # print("connecting to database")
        try:
            self.conn = psycopg2.connect(
                host=BDD_CREDENTIALS['DB_HOST'],
                database=BDD_CREDENTIALS['DB_NAME'],
                user=BDD_CREDENTIALS['DB_USER'],
                password=BDD_CREDENTIALS['DB_PASSWORD'],
                port=BDD_CREDENTIALS['DB_PORT']
            )       
            self.cursor = self.conn.cursor()
        except Exception as e:
            print(e)
            return None

    def __del__(self):
        # print("disconnecting from database")
        self.conn.close()
        
    def getTotemIP(self, totemID):
        """
        It gets the IP address of the totem with the ID specified by the parameter.
        
        :param totemID: The ID of the totem
        :return: The function getTotemIP() is returning a string value.
        """
        try:
            self.cursor.execute("SELECT totem_ip FROM Totem WHERE totem_id = %s", (totemID,))
            return self.cursor.fetchone()[0]
        except Exception as e:
            print(e)
            return None
    
    # add a function that totem id and return if it exists
    def checkTotemID(self, totemID):
        """
        It checks if the totem with the ID specified by the parameter exists.
        
        :param totemID: The ID of the totem
        :return: The function checkTotemID() is returning a boolean value.
        """
        try:
            self.cursor.execute("SELECT totem_id FROM Totem WHERE totem_id = %s", (totemID,))
            return self.cursor.fetchone()[0] is not None
        except Exception as e:
            print(e)
            return None
        
    def getParamsDetails(self):
        """
        It gets the details of the parameters.
        
        :return: The function getParamsDetails() is returning a list of tuples.
        """
        try:
            self.cursor.execute("SELECT * FROM Settings")
            params = self.cursor.fetchall()
            params = [dict(zip(['param_name', 'param_min_value', 'param_max_value', 'param_default_value'], param)) for param in params]
            return params
        except Exception as e:
            print(e)
            return None

    def getUserParamsDetails(self, totemID, totemIP):
        """
        It gets the details of the parameters of the user.
        
        :param totemID: The ID of the totem
        :param totemIP: The IP address of the totem
        :return: The function getUserParamsDetails() is returning a list of tuples.
        """
        try:
            self.cursor.execute("SELECT st.setting_name, st.set_to_value FROM set_to st JOIN TOTEM t ON st.groupe_id = t.groupe_id WHERE t.TOTEM_ID = %s AND t.TOTEM_IP = %s;", (totemID, totemIP))
            params = self.cursor.fetchall()
            params = [dict(zip(['param_name', 'param_value'], param)) for param in params]
            return params
        except Exception as e:
            print(e)
            return None
        
    def getUserSpecificParam(self, totemID, totemIP, param_name):
        """
        It gets the details of the parameters of the user.
        
        :param totemID: The ID of the totem
        :param totemIP: The IP address of the totem
        :return: The function getUserSpecificParameters() is returning a list of tuples.
        """
        try:
            self.cursor.execute("SELECT st.setting_name, st.set_to_value FROM set_to st JOIN TOTEM t ON st.groupe_id = t.groupe_id WHERE t.TOTEM_ID = %s AND t.TOTEM_IP = %s AND st.setting_name = %s LIMIT 1;", (totemID, totemIP, param_name))
            params = self.cursor.fetchall()
            params = [dict(zip(['param_name', 'param_value'], param)) for param in params]

            return params
        except Exception as e:
            print(e)
            return None
        
    async def setUserParam(self, totemID, totemIP, param_name, param_value):
        """
        It sets the value of a parameter of the user.

        :param totemID: The ID of the totem
        :param totemIP: The IP address of the totem
        :param param_name: The name of the parameter
        :param param_value: The ne value of the parameter
        :return: The function setUserParam() is returning is the query was successful or not.
        """

        try:
            self.cursor.execute("UPDATE set_to SET set_to_value = %s FROM TOTEM WHERE set_to.groupe_id = TOTEM.groupe_id AND TOTEM.TOTEM_ID = %s AND TOTEM.TOTEM_IP = %s AND set_to.setting_name = %s;", (param_value, totemID, totemIP, param_name))
            self.conn.commit()

            # TODO/update: Convert the query into function to catch the error

            return 'success'
        except Exception as e:
            print(e)
            return 'failed'
        
    async def getAllInfos(self):
        """
        It gets all the information of the users.
        
        :return: The function getAllInfo() is returning a list of tuples.
        """
        try:
            self.cursor.execute("SELECT t.TOTEM_IP, t.TOTEM_ID, g.groupe_id, string_agg(st.setting_name || '=' || st.set_to_value, ', ') as set_to_params FROM TOTEM t JOIN Groupe g ON t.groupe_id = g.groupe_id LEFT JOIN set_to st ON st.groupe_id = t.groupe_id GROUP BY t.TOTEM_IP, t.TOTEM_ID, g.groupe_id;")
            totems = self.cursor.fetchall()

            totems = [dict(zip(['totem_ip', 'totem_id', 'groupe_id', 'set_to_params'], totem)) for totem in totems]

            # parse the set_to_params string to a dict
            for totem in totems:
                totem['set_to_params'] = dict(item.split("=") for item in totem['set_to_params'].split(", "))

            
            return totems
        except Exception as e:
            print(e)
            return None
        
    async def getAllGroups(self):
        """
        It gets all the information of the groups.
        
        :return: The function getAllGroups() is returning a list of tuples.
        """
        try:
            self.cursor.execute("SELECT g.groupe_id, s.setting_name, st.set_to_value FROM Groupe g JOIN set_to st ON st.groupe_id = g.groupe_id JOIN SETTINGS s ON s.setting_name = st.setting_name ORDER BY g.groupe_id, s.setting_name;")
            groups = self.cursor.fetchall()

            groups = [dict(zip(['groupe_id', 'setting_name', 'set_to_value'], group)) for group in groups]

            for group in groups:
                group[group['groupe_id']] = {'groupe_id': group['groupe_id'], group['setting_name']: group['set_to_value']}
                del group['setting_name']
                del group['set_to_value']
                del group['groupe_id']

            # TODO: organize the dict to be like this:
            # {
            #     'groupe_id': {
            #         'groupe_id': groupe_id,
            #         'setting_name': setting_value,
            #         'setting_name': setting_value,
            #         'setting_name': setting_value,
            #         ...
            #     },

            return groups
        except Exception as e:
            print(e)
            return None
        
    async def getGroupDetails(self, groupe_id):
        """
        It gets the details of a group.
        
        :param groupe_id: The ID of the group
        :return: The function getGroupDetails() is returning a list of tuples.
        """
        try:
            self.cursor.execute("SELECT g.groupe_id, s.setting_name, st.set_to_value FROM Groupe g JOIN set_to st ON st.groupe_id = g.groupe_id JOIN SETTINGS s ON s.setting_name = st.setting_name WHERE g.groupe_id = %s ORDER BY g.groupe_id, s.setting_name;", (groupe_id,))
            params = self.cursor.fetchall()

            params = [dict(zip(['groupe_id', 'setting_name', 'set_to_value'], group)) for group in params]

            # group all params in the same dict
            result = {}

            for param in params:
                result[param['setting_name']] = param['set_to_value']



            if not result:
                return "The group doesn't exist"


            return result
        except Exception as e:
            print(e)
            return None

    async def addTotemToGroup(self, newGroupId, totemId, totemIp):
        """
        It adds a totem to a group.
        
        :param newGroupId: The ID of the group
        :param totemId: The ID of the totem
        :param totemIp: The IP address of the totem
        :return: The function addTotemToGroup() is returning is the query was successful or not.
        
        """

        try:
            self.cursor.execute("SELECT move_totem_to_group(%s,%s,%s);", (totemIp, totemId, newGroupId))
            self.conn.commit()

            return 'success'
        except Exception as e:
            print(e)
            return 'failed'

    async def deleteGroup(self, groupId):
        """
        It deletes a group.
        
        :param groupId: The ID of the group
        :return: The function deleteGroup() is returning is the query was successful or not.
        """

        try:
            self.cursor.execute("SELECT remove_group_with_id(%s);", (groupId,))
            self.conn.commit()

            return 'success'
        except Exception as e:
            print(e)
            return 'failed'