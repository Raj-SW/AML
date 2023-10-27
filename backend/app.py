import json
from flask import Flask, jsonify, make_response, request, render_template, session, flash
import pyodbc
# from models.predict_user_behaviour import *
# from API.Test.test import sayHelloWorld
from models.predicitveAINew import *
import os
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# Azure SQL Server parameters
# server = 'pwc.database.windows.net'
# port = 1433
# database = 'pwc'
# username = 'chavi'
# password = 'Ch@v!2804'

server = 'pwc.database.windows.net'
database = 'pwc'
username = 'chavi'
password = 'Ch@v!2804'
port = 1433


def connect_to_sql_server():
    conn_str = f'DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server},{port};DATABASE={database};UID={username};PWD={password}'
    conn = pyodbc.connect(conn_str)
    return conn

# jsonObj = [
#     {
#         "Account_No": "409000611074",
#         "DATE": 1498694400000,
#         "TRANSACTION_DETAILS": "TRF FROM  Indiaforensic SERVICES",
#         "CHQ_NO": 'null',
#         "VALUE_DATE": 1498694400000,
#         "WITHDRAWAL_AMT": 'null',
#         "DEPOSIT_AMT": 1000000.0,
#         "BALANCE_AMT": 1000000.0,
#         "isFraud": 'null'
#     },
#     {
#         "Account_No": "409000611074",
#         "DATE": 1499212800000,
#         "TRANSACTION_DETAILS": "TRF FROM  Indiaforensic SERVICES",
#         "CHQ_NO": 'null',
#         "VALUE_DATE": 1499212800000,
#         "WITHDRAWAL_AMT": 'null',
#         "DEPOSIT_AMT": 1000000.0,
#         "BALANCE_AMT": 2000000.0,
#         "isFraud": 'null'
#     },
#     {
#         "Account_No": "409000611074",
#         "DATE": 1500336000000,
#         "TRANSACTION_DETAILS": "FDRL/INTERNAL FUND TRANSFE",
#         "CHQ_NO": 'null',
#         "VALUE_DATE": 1500336000000,
#         "WITHDRAWAL_AMT": 'null',
#         "DEPOSIT_AMT": 500000.0,
#         "BALANCE_AMT": 2500000.0,
#         "isFraud": 'null'
#     },
#     {
#         "Account_No": "409000611074",
#         "DATE": 1501545600000,
#         "TRANSACTION_DETAILS": "TRF FRM  Indiaforensic SERVICES",
#         "CHQ_NO": 'null',
#         "VALUE_DATE": 1501545600000,
#         "WITHDRAWAL_AMT": 'null',
#         "DEPOSIT_AMT": 3000000.0,
#         "BALANCE_AMT": 5500000.0,
#         "isFraud": 'null'
#     }]

# predict_user_behavior(jsonObj, 2)

# Default route
@app.route('/')
def hello_world():
    return 'Backend Server live!', 200

# first API endpoint
# @app.route('/userbehaviour', methods=['GET'])
# def get_user_Behaviour():
#     data = json.loads(request.data, strict=False)



# integrations endpoint
@app.route('/userBehaviour', methods=['GET'])
def getUser():
    print('test')
    return jsonify({'user': 'test'}), 200

# integrations endpoint
@app.route('/integrations', methods=['GET'])
# @token_required
def get_integrations_service():
    try:
        connection = connect_to_sql_server()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Integrations")
        results = cursor.fetchall()
        # print(results)

        # Convert query results to a list of dictionaries
        integration_list = []
        for row in results:
            int = {
                "integration": row[1],
                "status": row[2],
                "uptime": row[4],
                "requests": row[5],
                "efficiency": row[3],
                "flags": row[6]
            }
            integration_list.append(int)

        return jsonify(integration_list)

    except Exception as e:
        return jsonify({'Error': str(e)}), 500


# integrations by client_id endpoint
@app.route('/integrations/<string:api_key>', methods=['GET'])
def get_integration(api_key):
    try:
        connection = connect_to_sql_server()
        cursor = connection.cursor()

        # Select a specific integration by ID
        cursor.execute("SELECT config FROM UserIntegration WHERE Id =?", api_key)
        result = cursor.fetchone()
            # print(result)
        connection.commit()
        config = result[0]  # Assuming config is the first column in the result
            
        configJson = json.loads(config, strict=False)

        nodes = configJson['nodes']
        integrationId = nodes[0]["params"]["id"]
        cursor.execute("SELECT * FROM Integrations WHERE Id =?", integrationId)
       
        result = cursor.fetchall()
        integration_list = []
        for row in result:
            int = {
                "Id": row[1],
                "Integration": row[2],
                "Status": row[3],
                "Efficiency": row[4],
                "uptime": row[5],
                "requests": row[6],
                "flags": row[6]
            }
            integration_list.append(int)

        return jsonify(integration_list), 200

    except Exception as e:
        return jsonify({'Error': str(e)}), 500


# users by client_id endpoint
@app.route('/clients/users/<int:client_id>', methods=['GET'])
def get_users(client_id):
    try:
        connection = connect_to_sql_server()
        cursor = connection.cursor()
        integration = ""

        # Select a specific integration by ID
        cursor.execute(
            "SELECT * FROM Users JOIN Clients ON Users.ClientId = Clients.Id WHERE Users.ClientId =?", client_id)
        results = cursor.fetchall()

        print(results)
        list = []
        if results:
            for row in results:
                integration = row[15]
                data = {
                    "id": row[1],
                    "account_number": row[0],
                    "name": row[2],
                    "dob": row[3],
                    "address": row[4],
                    "docs": {
                        "nic": row[5],
                        "passport": row[6],
                        "driving_license": row[7],
                    },
                    "risk": {
                        "score": row[8],
                        "value": row[9],
                    },
                }
                list.append(data)

            
            return jsonify({
                "users": list,
                "integration": integration,
                "prediction": get_behaviour(5)

            })
        else:
            return jsonify({'Error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'Error': str(e)}), 500


# users by user_id endpoint
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        connection = connect_to_sql_server()
        cursor = connection.cursor()

        # Select a specific integration by ID
        cursor.execute(
            "SELECT * FROM Users WHERE UserId =?", user_id)
        row = cursor.fetchone()

        # print(result)
        if row:
            data = {
                "id": row[1],
                "account_number": row[0],
                "name": row[2],
                "dob": row[3],
                "address": row[4],
                "docs": {
                    "nic": row[5],
                    "passport": row[6],
                    "driving_license": row[7],
                },
                "risk": {
                    "score": row[8],
                    "value": row[9],
                },
                "face_image_url": row[10]
            }

            return jsonify(data)
        else:
            return jsonify({'Error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'Error': str(e)}), 500



# populate transactions from json file
@app.route('/transaction-populate', methods=['GET'])
def populateTransactions():
    try:
        connection = connect_to_sql_server()
        cursor = connection.cursor()

        with open('transaction.json', 'r') as json_file:
            data = json.load(json_file)

        for record in data:
            print(record)
            
            try:
                cursor.execute("INSERT INTO Transactions (AccountNo, Date, TransactionDetails, ChqNo, ValueDate, WithdrawalAmt, DepositAmt, BalanceAmt, isFraud, user_behaviour) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            (record["Account_No"], record["DATE"], record["TRANSACTION_DETAILS"], record["CHQ_NO"], record["VALUE_DATE"], record["WITHDRAWAL_AMT"], record["DEPOSIT_AMT"], record["BALANCE_AMT"], record["isFraud"], record["user_behaviour"]))
                connection.commit()  # Commit the transaction
            except Exception as e:
                connection.rollback()  # Rollback the transaction in case of an error
                print(f"Error: {str(e)}")
                return jsonify({'Error': str(e)}), 500
            
        return jsonify({'Message': 'Transactions Created'}), 200

    except Exception as e:
        return jsonify({'Error': str(e)}), 500


# populate users from json file
@app.route('/user-populate', methods=['GET'])
def populateUsers():
    try:
        connection = connect_to_sql_server()
        cursor = connection.cursor()

        with open('user.json', 'r') as json_file:
            data = json.load(json_file)
            clientId = 1

        for record in data:
            print(record)
            print(record["account_number"])
            print(int(record["risk-value"]))

            cursor.execute("INSERT INTO Users (AccountNumber, UserId, Name, DateOfBirth, address, nic, passport, DrivingLicense, RiskScore, RiskValue, FaceImagePath, ClientId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (
                record["account_number"], record["user_id"], record["name"], record["dob"], record["address"], record["docs"]["nic"], record["docs"]["passport"], record["docs"]["driving_license"], int(record["risk-score"]), int(record["risk-value"]), record["face_image_path"], clientId))
            print(cursor.rowcount)
        return jsonify({'Message': 'Users Created'}), 200

    except Exception as e:
        return jsonify({'Error': str(e)}), 500

# @app.route('/behaviour/<int:days>', methods=['GET'])
def get_behaviour(days):
    # predict_user_behavior(data, predicted_days=5)
    try:
        connection = connect_to_sql_server()
        cursor = connection.cursor()

        # Select a specific integration by ID
        cursor.execute(
            "SELECT * FROM Transactions")
        result = cursor.fetchall()

        if result:
            data_list = []
            for row in result:
                data_list.append({
                    'Account_No': row[1],
                    'DATE': row[2],
                    'TRANSACTION_DETAILS': row[3],
                    'CHQ_NO': row[4],
                    'VALUE_DATE': row[5],
                    'WITHDRAWAL_AMT': row[6],
                    'DEPOSIT_AMT': row[7],
                    'BALANCE_AMT': row[8],
                    'isFraud': row[9],
                    'user_behaviour': row[10],
                })

            output_file_path = "transaction_database.json"

            # Export the JSON array to a JSON file
            with open(output_file_path, "w") as json_file:
                json.dump(data_list, json_file, indent=4)

            prediction = predict_user_behavior("transaction_database.json", predicted_days=5)
            

            return prediction
        else:
            return jsonify({'Error': 'User not found'})

    except Exception as e:
        return jsonify({'Error': str(e)})
    


@app.route('/integration/publish', methods=['POST'])
def set_integrations():
    data = json.loads(request.data, strict=False)
    Id = data['apiKey']
    name= data['IntegrationName']
    print(name)
    userId = data['clientId']
    status = 'Active'
    apiKey = data['apiKey']
    endpoint = data['endpoint']
    config = json.dumps(data, indent=4)
    uptime = 100
    requests = 0
    Efficiency =  100
    Flags = 0

    try:
        connection = connect_to_sql_server()
        cursor = connection.cursor()
        try:
            cursor.execute("INSERT INTO UserIntegration (Id,name, userId, status, apikey, endpoint, config, uptime, requests, Efficiency, Flags) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", (
                    Id,name,userId,status,apiKey,endpoint,config,uptime,requests,Efficiency,Flags
             ))
            connection.commit()  
        except Exception as e:
            connection.rollback() 
            print(f"Error: {str(e)}")
            return jsonify({'Error': str(e)}), 500
    
        return jsonify({'Message': 'Published'}), 200

    except Exception as e:
        return jsonify({'Error': str(e)}), 500

@app.route('/apiservice', methods=['POST'])
def apiservice():
    data = json.loads(request.data, strict=False)
    apikey = request.args.get('apikey')
    # print(apikey)
    # print(data)

    try:
        connection = connect_to_sql_server()
        cursor = connection.cursor()
        try:
            cursor.execute(
                "SELECT config FROM UserIntegration WHERE Id =?", apikey)
            result = cursor.fetchone()
            # print(result)
            connection.commit()
            config = result[0]  # Assuming config is the first column in the result
            
            configJson = json.loads(config, strict=False)

            input = configJson['input']
            output = configJson['output']
            nodes = configJson['nodes']
            print(input)
            print(output)
            print(nodes)

            if(input['type'] == 'JSON'):
                print('Is JSON')
                integration = nodes[0]
                name = integration['name']
                if(name == 'UserBehaviorAnalysis'):
                    print('Is UserBehaviorAnalysis')
                    duration = integration['params']['duration']
                    result = get_behaviour(duration)
                    return result, 200
                

        except Exception as e:
            connection.rollback() 
            print(f"Error: {str(e)}")
            return jsonify({'Error': str(e), 'Result': 'The API ran into an Error!'}), 500
    
        return jsonify({'Message': 'Success', 'config': configJson}), 200

    except Exception as e:
        return jsonify({'Error': str(e)}), 500



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
