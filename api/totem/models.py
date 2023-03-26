
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
            self.cursor.execute("SELECT st.setting_name, st.set_to_value FROM set_to st JOIN TOTEM t ON st.goupe_id = t.goupe_id WHERE t.TOTEM_ID = 1 AND t.TOTEM_IP = '1';")
            params = self.cursor.fetchall()
            params = [dict(zip(['param_name', 'param_value'], param)) for param in params]
            return params
        except Exception as e:
            print(e)
            return None
        
