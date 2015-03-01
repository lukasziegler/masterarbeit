import csv
import re

### Check where the last 
lastExecution = 5

# with open("log/lastLine.txt") as tsv:
#     for line in csv.reader(tsv, dialect="excel-tab"):



### READ LINE BY LINE
with open("log/Survey.txt") as tsv:
    for line in csv.reader(tsv, dialect="excel-tab"): #You can also use delimiter="\t" rather than giving a dialect.
    	
    	### File Overview
    	## 1. ID
    	## 2. BonusCode
    	## 3. Date
    	## 4. Email
    	## 5. Choice
    	## 6. FinalStage

    	### Debug output: print lines
    	print line

    	## Check if Email is Valid
    	if re.match(r"[^@]+@[^@]+\.[^@]+", line[3]):
    		print "Send email to:",line[3]

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