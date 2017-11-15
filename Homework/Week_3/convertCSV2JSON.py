import csv 
import json

# Constant filenames 
CSV_PATH = 'KNMIDATA2016.csv'
JSON_PATH = 'KNMIDATA2016.json'

# first get all lines from file
with open(CSV_PATH, 'r') as f:
    lines = f.readlines()

# Read the csv file
csv_file = csv.DictReader(open(CSV_PATH, 'r'))

# Create a list and adds the rows to the list
json_list = []
for row in csv_file:
    json_list.append(row)

# Write the json output to the file
file(JSON_PATH, 'w').write(json.dumps(json_list, indent = 2, separators = (',', ':')))