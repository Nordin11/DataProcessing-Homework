# first get all lines from file
with open('KNMIDATA2016.csv', 'r') as f:
    lines = f.readlines()

# remove spaces
lines = [line.replace(' ', '') for line in lines]

# finally, write lines in the file
with open('KNMIDATA2016.csv', 'w') as f:
    f.writelines(lines)