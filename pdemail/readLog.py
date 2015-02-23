import csv

with open("log/test.txt") as tsv:
    for column in zip(*[line for line in csv.reader(tsv, dialect="excel-tab")]):
    	#print column
    	print column

    	#print len(line)