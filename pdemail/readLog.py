import csv


## READ LINE BY LINE

with open("log/test.txt") as tsv:
    for line in csv.reader(tsv, dialect="excel-tab"): #You can also use delimiter="\t" rather than giving a dialect.
    	
    	## Debug output: print lines
    	# print line

    	## Check if SendEmail Option was chosen
    	if line[2] == '2':
    		print "Send email to:",line[4]

    		## TODO: sendEmail(email)

    		## TODO: delete entry or mark as done







## READ COLUMN BY COLUMN

# with open("log/test.txt") as tsv:
#     for column in zip(*[line for line in csv.reader(tsv, dialect="excel-tab")]):
#     	#print columns
#     	print column

#     	# select correct column
#     	if (column[0] == 'OptionChosen'):

#     		# check all entries
#     		for i, option in enumerate(column[1:]):

#     			# if Option == 2 (via Email)
#     			if option == '2':
#     				#send email
#     				print "SEND EMAIL TO"