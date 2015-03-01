import smtplib
# import time
# import datetime

user = "public.display.medien"
pwd = "Schau.F3nst3r"
FROM = 'public.display@medien.ifi.lmu.de'
# TO = ['lukas.ziegler@campus.lmu.de'] #must be a list
SUBJECT = "LMU Survey from Public Display"
TEXT = "Test Mail from the Public Display Survey Plattform"

def send(recipient):
    # Prepare actual message
    TO = [recipient]
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
        print 'successfully sent mail to: ' + recipient

    except:
        print "failed to send mail"
        # timestamp = datetime.datetime.fromtimestamp(time.time())
        log = open('log/failedToSendEmail.txt', "a")
        log.write("error: " + recipient + "\n")
        log.close()

