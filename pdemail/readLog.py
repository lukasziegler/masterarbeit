import csv
import re

### Helper functions
def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False



lastLine = -1

### Check where the Scheduler last left off
lineLog = open('log/lastLine.txt', 'r')
lastLine = lineLog.read()
print "lastLine:",lastLine


### READ SURVEY LOG (line by line)
i = 0
surveyLog = open('log/Survey.txt')
for line in csv.reader(surveyLog, dialect="excel-tab"): #You can also use delimiter="\t" rather than giving a dialect.
	# print line

	### LogFile Overview ###
	## 1. ID		# 2. BonusCode
	## 3. Date		# 4. Email
	## 5. Choice	# 6. FinalStage

	# if i >= lastLine:
	if i >= int(lastLine):
		print "new line",i
		
	## Check if Email is Valid
	# if re.match(r"[^@]+@[^@]+\.[^@]+", line[3]):
	# 	print "Send email to:",line[3]

		## TODO: sendEmail(email)

		## TODO: delete entry or mark as done
		# print i

	i += 1

surveyLog.close()


### UPDATE LAST LINE-LOG
lastLine = i
print "new lastLine:",lastLine

lineLog = open('log/lastLine.txt', "wb")
lineLog.write(str(lastLine))
lineLog.close()
