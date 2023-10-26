import json
from flask import Flask, jsonify, make_response, request, render_template, session, flash
from dotenv import load_dotenv, find_dotenv
import os
import jwt
from datetime import datetime, timedelta
from functools import wraps
import time

load_dotenv(find_dotenv())

app = Flask(__name__)

password = os.environ.get("MONGODB_PWD")

# def token_required(func):
#     # decorator factory which invoks update_wrapper() method and passes decorated function as an argument
#     @wraps(func)
#     def decorated(*args, **kwargs):
#         token = request.args.get('token')
#         print(token)
#         if not token:
#             return jsonify({'Alert!': 'Token is missing!'}), 401
#         try:
#             data = jwt.decode(
#                 token, secret_key, algorithms=["HS256"])
#             # return data
#         except jwt.ExpiredSignatureError:
#             return jsonify({'Token': 'Expired'}), 403
#         except:
#             return jsonify({'Message': 'Invalid token'}), 403
#         return func(*args, **kwargs)
#     return decorated


# Default route
@app.route('/')
def hello_world():
    return 'Backend Server live!', 200

# HANDSHAKE
@app.route('/verify')
# @token_required
def authenticate():
    return 'Token is verified!', 200

    
@app.route('/dummy', methods=['GET'])
# @token_required
def getDevices():
    return 'Hey Dummy', 200

if __name__ == '__main__':
    app.run()

