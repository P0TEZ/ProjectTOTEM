
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
        


BDD_CREDENTIALS = loadEnvVar("../../database_credentials.env")

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

    def isAdminPassword(self, password):
        """
        It checks if the password is in the database.
        
        :param password: The password to check
        :return: The function isAdminPassword() is returning a boolean value.
        """
        password = sha256(password.encode()).hexdigest()

        try:
            self.cursor.execute("SELECT * FROM Admin WHERE admin_password = %s", (password,))
            self.cursor.fetchall()

            if self.cursor.rowcount >= 1:
                return True
            else:
                return False
        except Exception as e:
            return None
        
    def isTotemID(self, totemID):
        """
        It checks if the totemID is in the database.
        
        :param totemID: The totemID to check
        :return: The function isTotemID() is returning a boolean value.
        """
        try:
            self.cursor.execute("SELECT * FROM Totem WHERE totem_id = %s", (totemID,))
            self.cursor.fetchall()

            if self.cursor.rowcount >= 1:
                return True
            else:
                return False
        except Exception as e:
            print(e)
            return None
        
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
    
