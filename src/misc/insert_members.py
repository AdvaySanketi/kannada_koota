import csv
from pymongo import MongoClient

# MongoDB connection setup
client = MongoClient("mongodb+srv://advay2807:q4BG7aIfbUwHd5uR@kannada-koota.zogoa.mongodb.net/?retryWrites=true&w=majority&appName=Kannada-Koota")  # Replace with your MongoDB connection string
db = client['main']  # Replace with your database name
collection = db['members']  

# CSV file path
csv_file_path = 'members.csv'  

def read_csv_and_insert_to_mongo(csv_file_path):
    with open(csv_file_path, mode='r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        
        for row in csv_reader:
            record = {
                "name": row["Name"],
                "kannada_name": row["Kannada Name"],
                "domain": row["Domain"],
                "isHead": row["isHead"].lower() == 'true'  
            }
            collection.insert_one(record)
            print(f"Inserted: {record}")

if __name__ == "__main__":
    read_csv_and_insert_to_mongo(csv_file_path)
