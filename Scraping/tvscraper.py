#!/usr/bin/env python
# Name: Nordin Bouchrit
# Student number: 11050608
'''
This script scrapes IMDB and outputs a CSV file with highest rated tv series.
'''
import csv
import sys

from pattern.web import URL, DOM, plaintext

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

'''
Extract a list of highest rated TV series from DOM (of IMDB page).
   
'''

def extract_tvseries(dom):
    
    # open a list for the actors
    actors = []
    
    # define two dimensional matrix
    x, y = 5, 10
    Matrix = [[0 for row in range(x)] for column in range(y)]
    
    row = 0 
    column = 0
    
    # for every column
    for column in range(y):
        # fill in the title, runtime, genre & rating
        for movies in dom.by_tag("div.lister-item-content")[:y]:
            for titles in movies.by_tag("h3.lister-item-header"):
                for title in titles.by_tag("a"):
                    
                    title = title.content.encode("utf-8")
                    Matrix[row][0] = title
                    
                
            for info in movies.by_tag("p.text-muted"):
                for runtime in info.by_tag("span.runtime"):
                    
                    runtime = int(runtime.content[:-4])
                    Matrix[row][1] = runtime
                    
                
                for genre in info.by_tag("span.genre"):
                    
                    genre = genre.content.encode("utf-8")[1:-12]
                    Matrix[row][2] = genre

            for rating in movies.by_tag("div.ratings-bar"):
                for rate in rating.by_tag("strong"):

                    rating = float(rate.content)
                    Matrix[row][3] = rating
        
            for stars in movies.by_tag("p"):
                # open temporary list to store in actors
                temp = []
                for actor in stars.by_tag("a"):
                    
                    # append actorslist to temporary list
                    actorslist = actor.content.encode("utf-8")
                    temp.append(actorslist)
                    
                    # remove everything besides first 4 actors
                    if len(temp) > 4:
                        for i in range(len(temp)-4):
                            del temp[0]
                    
                    # change temporary (actors)list to string 
                    actors = ', '.join(temp)        
                    Matrix[row][4] = actors
            
            # exceed the row
            row += 1
        
        return Matrix  


def save_csv(f, tvseries):
    '''
    Output a CSV file containing highest rated TV-series.
    '''
    writer = csv.writer(f)
    writer.writerow(['Title', 'Runtime', 'Genre', 'Rating', 'Actors'])
    
    # WRITE THE TV-SERIES TO DISK
    movies = 10 
    for i in range(movies):
        writer.writerow(tvseries[i][:])

if __name__ == '__main__':
    # Download the HTML file
    url = URL(TARGET_URL)
    html = url.download()

    # Save a copy to disk in the current directory, this serves as an backup
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation
    dom = DOM(html)

    # Extract the tv series (using the function you implemented)
    tvseries = extract_tvseries(dom)

    # Write the CSV file to disk (including a header)
    with open(OUTPUT_CSV, 'wb') as output_file:
        save_csv(output_file, tvseries)