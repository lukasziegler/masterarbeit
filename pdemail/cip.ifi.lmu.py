# def send_email():
import smtplib

user = "USERNAME"
pwd = "PASSWORD"
FROM = 'public.display@medien.ifi.lmu.de'
TO = ['lukas.ziegler@campus.lmu.de'] #must be a list
SUBJECT = "Mail from PDSurvey"
TEXT = "Test Mail from the Public Display Survey Plattform"

# Prepare actual message
message = """\From: %s\nTo: %s\nSubject: %s\n\n%s
""" % (FROM, ", ".join(TO), SUBJECT, TEXT)
try:
    #server = smtplib.SMTP(SERVER)
    server = smtplib.SMTP("smtp.ifi.lmu.de", 25) #or port 465 doesn't seem to work!
    server.set_debuglevel(0)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.esmtp_features['auth'] = 'LOGIN PLAIN'
    server.login(user, pwd)
    server.sendmail(FROM, TO, message)
    #server.quit()
    server.close()
    print 'successfully sent mail'
except:
    print "failed to send mail"
