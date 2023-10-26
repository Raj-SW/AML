-- Create the Integrations table
CREATE TABLE Integrations (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Integration NVARCHAR(255),
    Status NVARCHAR(50),
    Efficiency INT
);

-- Insert the JSON data into the table
INSERT INTO Integrations (Integration, Status, Efficiency)
VALUES
    ('KYC/CDD integration', 'Online', 75),
    ('AML Risk Scoring API', 'Online', 99),
    ('Identity Verification API', 'Online', 80),
    ('Document Verification API', 'Online', 95),
    ('Credit Score API', 'Online', 70);


-- Create the Clients table with a hashed password column
CREATE TABLE Clients (
    Id INT PRIMARY KEY,
    Username NVARCHAR(50),
    Pass VARBINARY(64),  -- Use VARBINARY to store hashed passwords
    Name NVARCHAR(255)
);

-- -- Hash and insert the password
-- DECLARE @Password NVARCHAR(50) = 'plain_text'; 
-- DECLARE @PasswordHash VARBINARY(64);
-- SET @PasswordHash = ;

INSERT INTO Clients (Id, Username, Pass, Name)
VALUES (1, 'cim-admin', HASHBYTES('SHA2_256', '1234'), 'CIM FINANCE'),
    (2, 'rogers-admin', HASHBYTES('SHA2_256', '1234'), 'Rogers Capital'),
    (3, 'sbm-admin', HASHBYTES('SHA2_256', '1234'), 'State Bank of Mauritius');


-- Create the Users table
CREATE TABLE Users (
    AccountNumber NVARCHAR(20) PRIMARY KEY,
    UserId NVARCHAR(10),
    Name NVARCHAR(255),
    DateOfBirth DATE,
    address NVARCHAR(255),
    nic NVARCHAR(10),
    passport NVARCHAR(20),
    DrivingLicense NVARCHAR(20),
    RiskScore INT,
    RiskValue DECIMAL(18, 2),
    FaceImagePath NVARCHAR(255),
    CreditScore INT,
    ClientId INT,
    FOREIGN KEY (ClientId) REFERENCES Clients(Id)
);

-- Insert the JSON data into the table
INSERT INTO Users (AccountNumber, UserId, Name, DateOfBirth, address, nic, passport, DrivingLicense, RiskScore, RiskValue, FaceImagePath, ClientId)
VALUES (
    '409000611074',
    '1001',
    'Raj Seetohul',
    '1990-05-15',
    '123 Main Street, Cityville, Country',
    '1234567890',
    'ABC123XYZ',
    'DL987654',
    0,
    100000.00,
    'https://media.licdn.com/dms/image/C5103AQFl656k2-DwOg/profile-displayphoto-shrink_800_800/0/1517034956958?e=2147483647&v=beta&t=6H_aZri3qcbtlgwTyTKBceuyTEPYW43xGViq5UL4J-w',
    1
);

-- Create the ClientsIntegration table
CREATE TABLE ClientsIntegration (
    ApiKey UNIQUEIDENTIFIER PRIMARY KEY,
    ClientId INT,
    Endpoint NVARCHAR(255),
    IntegrationId INT,
    IntegrationParam NVARCHAR(MAX), --JSON data will be stored as a string
    Params NVARCHAR(MAX)  -- params include the output and input
);

-- Insert the JSON data into the ClientsIntegration table
INSERT INTO ClientsIntegration (ApiKey, ClientId, Endpoint, IntegrationId, Params)
VALUES (
    '1031fe96-9825-4600-a9e4-dccf11fe00ba',
    1,
    'http://192.168.100.70:5000/',
    1,
    '{}'
    '{}'  -- Store the JSON data
);

CREATE TABLE Transactions (
    TransactionID INT IDENTITY(1,1) PRIMARY KEY,
    AccountNo NVARCHAR(20),
    Date BIGINT,
    TransactionDetails NVARCHAR(255),
    ChqNo NVARCHAR(255),
    ValueDate BIGINT,
    WithdrawalAmt REAL,
    DepositAmt REAL,
    BalanceAmt REAL,
    isFraud REAL,
    FOREIGN KEY (AccountNo) REFERENCES Users(AccountNumber)
);