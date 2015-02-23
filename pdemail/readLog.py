import csv

with open("log/test.txt") as tsv:
    for column in zip(*[line for line in csv.reader(tsv, dialect="excel-tab")]):
    	#print columns
    	print column

    	# select correct column
    	if (column[0] == 'OptionChosen'):

    		# check all entries
    		for i, option in enumerate(column[1:]):

    			# if Option == 2 (via Email)
    			if option == '2':
    				#send email
    				print "SEND EMAIL TO"