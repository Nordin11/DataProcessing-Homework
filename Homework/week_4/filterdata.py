# Nordin Bouchrit
# 11050608
# Data file source: https://www.kaggle.com/unsdsn/world-happiness/data

import pandas as pd 
import numpy as numpy
import csv

# read full csv file
CSV = pd.read_csv('World_Happiness2017.csv')

# take columns that you want to use
columns = ['Country', 'Happiness.Score', 'Economy..GDP.per.Capita.']

# specify columns
CSV = CSV[columns]

# rename columns 
CSV.rename(columns={'Happiness.Score': 'Score', 'Economy..GDP.per.Capita.': 'GDP'}, inplace=True)

# set the index
CSV = CSV.set_index('Country')

# write to new csv file for further use in javascript
CSV.to_csv('World_Happiness_GDP_2017.csv', sep=',')







