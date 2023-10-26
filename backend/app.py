import json
from flask import Flask, jsonify, make_response, request, render_template, session, flash
import pyodbc
from models.predict_user_behaviour import *
# from API.Test.test import sayHelloWorld
from models.predict_user_behaviour import predict_user_behavior

app = Flask(__name__)

# Azure SQL Server parameters
server = 'pwc.database.windows.net'
port = 1433
database = 'pwc'
username = 'chavi'
password = 'Ch@v!2804'


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


# integrations endpoint
@app.route('/userBehaviour', methods=['GET'])
def getUser():
    print('test')
    return jsonify({'user': 'test'}), 200

# integrations endpoint
@app.route('/integrations', methods=['GET'])
# @token_required
def get_integrations():
    try:
        connection = connect_to_sql_server()
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Integrations")
        results = cursor.fetchall()
        print(results)

        # Convert query results to a list of dictionaries
        integration_list = []
        for row in results:
            int = {
                "integration": row[1],
                "status": row[2],
                # "uptime": row.uptime,
                # "requests": row.requests,
                "efficiency": row[3],
                # "flags": row.flags
            }
            integration_list.append(int)

        return jsonify(integration_list)

    except Exception as e:
        return jsonify({'Error': str(e)}), 500


# integrations by client_id endpoint
@app.route('/integrations/<int:client_id>', methods=['GET'])
def get_integration(client_id):
    try:
        connection = connect_to_sql_server()
        cursor = connection.cursor()

        # Select a specific integration by ID
        cursor.execute(
            "SELECT * FROM ClientsIntegration JOIN Integrations ON ClientsIntegration.IntegrationId = Integrations.Id WHERE ClientsIntegration.ClientId =?", client_id)
        results = cursor.fetchall()

        # print(result)
        integration_list = []
        tot_eff = 0
        upAPI = 0
        if results:
            for row in results:
                tot_eff += int(row[8])
                if row[7] == "Online":
                    upAPI += 1

                integration = {
                    "api_key": row[0],
                    "endpoint": row[2],
                    "url": row[2] + row[0],
                    "params": json.loads(row[4]),
                    "name": row[6],
                    "status": row[7],
                    "efficiency": row[8]
                }
                integration_list.append(integration)

            return jsonify({
                "total_efficiency": tot_eff/len(results),
                "apis": {
                    "total": len(results),
                    "active": upAPI,
                    "down": len(results) - upAPI,
                },
                "integration": integration_list
            })
        else:
            return jsonify({'Error': 'Integration not found'}), 404

    except Exception as e:
        return jsonify({'Error': str(e)}), 500


# users by client_id endpoint
@app.route('/clients/users/<int:client_id>', methods=['GET'])
def get_users(client_id):
    try:
        connection = connect_to_sql_server()
        cursor = connection.cursor()

        # Select a specific integration by ID
        cursor.execute(
            "SELECT * FROM Users WHERE ClientId =?", client_id)
        results = cursor.fetchall()

        # print(result)
        list = []
        if results:
            for row in results:
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
                list.append(data)

            return jsonify(list)
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

 
# users by clientIntegrations endpoint
@app.route('/<string:api_key>', methods=['GET'])
def get_users_integrations(api_key):
    try:
        connection = connect_to_sql_server()
        cursor = connection.cursor()

        # Select a specific integration by ID
        cursor.execute(
            "SELECT * FROM ClientsIntegration JOIN Integrations ON ClientsIntegration.IntegrationId = Integrations.Id WHERE ClientsIntegration.ApiKey =?", api_key)
        result = cursor.fetchone()

        print(result)
        if result:
            clientId = result[1]
            users = get_users(clientId)
            return jsonify({
                "users": users,
                "Integration": {
                    "name": result.get("name", 0),
                    "status": result.get("status", 0),
                    "efficiency": result.get("efficiency", 0),
                },
            })
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
                cursor.execute("INSERT INTO Transactions (AccountNo, Date, TransactionDetails, ChqNo, ValueDate, WithdrawalAmt, DepositAmt, BalanceAmt, isFraud) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                            (record["Account_No"], record["DATE"], record["TRANSACTION_DETAILS"], record["CHQ_NO"], record["VALUE_DATE"], record["WITHDRAWAL_AMT"], record["DEPOSIT_AMT"], record["BALANCE_AMT"], record["isFraud"]))
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


@app.route('/integration/publish', methods=['POST'])
def set_integrations():
    try:
        return jsonify({'Message': 'Published'}), 200

    except Exception as e:
        return jsonify({'Error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
