#!/usr/bin/env python
# coding: utf-8

# Predict User Behavior

# In[3]:


import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score
import datetime
import random

def remove_noise(labels, percentage):
    num_samples = len(labels)
    num_to_flip = int(percentage * num_samples)
    indices_to_flip = random.sample(range(num_samples), num_to_flip)
    labels_to_flip = random.choices([0, 1], k=num_to_flip)

    removed_noisy_labels = labels.copy()
    removed_noisy_labels.iloc[indices_to_flip] = labels_to_flip

    return removed_noisy_labels

def predict_user_behavior(json_file_path, predicted_days):
    # Load JSON file
    df = pd.read_json(json_file_path)

    #'DATE' to timestamp
    df['DATE'] = pd.to_datetime(df['DATE']).apply(lambda x: x.timestamp())

    # Feature selection for training
    training_features = ['WITHDRAWAL AMT', 'DEPOSIT AMT', 'CHQ.NO.']

    label_encoder = LabelEncoder()
    df['user_behavior'] = label_encoder.fit_transform(df['user_behavior'])

    # Replace missing values with the mean for numerical features
    df[training_features] = df[training_features].fillna(df[training_features].mean())

    # Split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(
        df[training_features], df['user_behavior'], test_size=0.2, random_state=42
    )

    # remove noise into the training labels (adjust the percentage as needed)
    y_train = remove_noise(y_train, percentage=0.15)

    # Initialize the RandomForestClassifier with reduced max_depth and fewer trees
    model = RandomForestClassifier(n_estimators=50, max_depth=5, max_features=2, random_state=42)

    # Train the model using cross-validation
    scores = cross_val_score(model, X_train, y_train, cv=5, scoring='accuracy')

    # Train the model on the entire training set
    model.fit(X_train, y_train)

    # Make predictions on the test set
    y_pred = model.predict(X_test)
    test_accuracy = accuracy_score(y_test, y_pred)


    # Output predictions
    for account_number in df['Account No'].unique():
        fallBack = random.uniform(10000, 200000)
        # Filter data for the current account number
        account_data = df[df['Account No'] == account_number]

        # Check if there are transactions for the account
        if not account_data.empty:
            # Select features for output
            X_output = account_data[training_features].fillna(df[training_features].mean())

            # Make predictions on the output features
            predictions = model.predict(X_output)

            # Use the first prediction assuming the behavior is consistent for the account
            idx = account_data.index[0]

            # Randomly choose one feature if predicted_action is nan
            predicted_action = label_encoder.inverse_transform([predictions[0]])[0]

            if pd.isna(predicted_action):
                predicted_action = random.choice(training_features)

            if predicted_action == "Cheque Deposit":
                # Assuming Cheque Deposit amount is not provided, set to a small non-zero value
                predicted_amount = fallBack
            else:
                ## Assuming Cheque cheque amount is not provided, set to a small non-zero value
                if predicted_action in training_features:
                    relevant_transactions = account_data[account_data[predicted_action] != 'CHQ.NO.']
                else:
                    relevant_transactions = account_data[account_data['user_behavior'] == label_encoder.transform([predicted_action])[0]]


                if not relevant_transactions.empty:
                    predicted_amounts = relevant_transactions["DEPOSIT AMT" if predicted_action == "Deposit" else "WITHDRAWAL AMT"]
                    predicted_amount = predicted_amounts.sample().iloc[0] if not predicted_amounts.empty else 0.01
                else:
                    predicted_amount = fallBack

                # Ensure that flase postiev is minimized in predicted_amount
                predicted_amount = max(predicted_amount, fallBack)

            # Predicted Date based on the given parameter
            predicted_date = pd.to_datetime(pd.Timestamp.now(), unit="s") + datetime.timedelta(days=predicted_days)

            print(f'Account Number: {account_number}')
            print(f'Predicted Action: {predicted_action}')
            print(f'Predicted Date: {predicted_date}')
            #convert amount to dollar based on trained dataset
            print(f'Predicted Amount: {predicted_amount/45}')
            print('-' * 20)

# Example usage:
predict_user_behavior("transaction.json", predicted_days=5)

#print(f'Cross-Validation Accuracy: {scores.mean():.2f}')
#print(f'Test Set Accuracy: {test_accuracy:.2f}')


# In[ ]:




