from flask import json
import pyodbc

watchlist = [{
    "name": "John Doe"
}, {
    "name": "Ksoviac"
}]

def decision_tree(db_connection):
    # > 500k is flagged

    withdrawal_sum = 0.0
    deposit_sum = 0.0
    data = []

    with open('h5_data.json', 'r') as json_file:
            data = json.load(json_file)
    
    transaction = data[-1]

    connection = db_connection
    cursor = connection.cursor()

    # print(transaction)
    cursor.execute("SELECT * FROM Users WHERE AccountNumber = ?", (transaction["Account_No"]))
    user = cursor.fetchone()

    for transaction in data:
        if transaction["WITHDRAWAL_AMT"] is not None:
            withdrawal_sum += transaction["WITHDRAWAL_AMT"]
        if transaction["DEPOSIT_AMT"] is not None:
            deposit_sum += transaction["DEPOSIT_AMT"]
    
    if withdrawal_sum > 50000000000000 or deposit_sum > 500000000000000:
        # update the LR count value for a user in db
        
        cursor.execute("UPDATE Users Set lr_count = lr_count + 1 WHERE AccountNumber = ?", (transaction["Account_No"]))
        connection.commit()

        # if Loe Risk transactions > 20 OR KYC_Score < 0.4, flag
        if int(user[13]) > 20:
            return 'high_risk'
        else:
            if int(user[12]) < 0.4:
                return 'high_risk'
            else:
                return 'low_risk'
    else:
        return 'low_risk'

        
server = 'pwc.database.windows.net'
database = 'pwc'
username = 'chavi'
password = 'Ch@v!2804'
port = 1433


def connect_to_sql_server():
    conn_str = f'DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={server},{port};DATABASE={database};UID={username};PWD={password}'
    conn = pyodbc.connect(conn_str)
    return conn

connection = connect_to_sql_server()
print(decision_tree(connection))