import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

user = "USER"
pwd = "PASSWORD"
me = 'public.display@medien.ifi.lmu.de'

def send(recipient):

    # Create message container - the correct MIME type is multipart/alternative.
    msg = MIMEMultipart('alternative')
    msg['Subject'] = "LMU Survey from Oettingenstrasse"
    msg['From'] = me
    msg['To'] = recipient

    # Create the body of the message (a plain-text and an HTML version).
    text = "Hello, \n Please support our research by completing the following 5 questions. It will take no more than 3 minutes. \n http://pdsurvey.herokuapp.com/"
    html = """\
    <html>
      <head></head>
      <body>
        <p>Hello,<br><br>
           Please support our research by completing the following 5 questions. It will take no more than 3 minutes.<br><br>
           <a href="http://pdsurvey.herokuapp.com/">http://pdsurvey.herokuapp.com/</a><br><br>
           We are evaluating how users respond to questions on public displays and would like to find out more about your opinion. All data will be collected anonymously and will only be used for research purposes.<br><br>
           If you have any questions or further feedback, feel free to get in touch with: public.display@medien.ifi.lmu.de.<br><br>

            LFE Medieninformatik<br>
            Ludwig-Maximilians-Universit&auml;t M&uuml;nchen<br>
            Amalienstr. 17<br>
            80333 M&uuml;nchen<br>
        </p>
      </body>
    </html>
    """

    # Record the MIME types of both parts - text/plain and text/html.
    part1 = MIMEText(text, 'plain')
    part2 = MIMEText(html, 'html')

    # Attach parts into message container.
    msg.attach(part1)
    msg.attach(part2)

    try:
        #server = smtplib.SMTP(SERVER)
        server = smtplib.SMTP("smtp.ifi.lmu.de", 25) #or port 465 doesn't seem to work!
        server.set_debuglevel(0)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.esmtp_features['auth'] = 'LOGIN PLAIN'
        server.login(user, pwd)
        server.sendmail(me, recipient, msg.as_string())
        #server.quit()
        server.close()
        print 'successfully sent mail to: ' + recipient

    except:
        print "failed to send mail"
        # timestamp = datetime.datetime.fromtimestamp(time.time())
        log = open('log/failedToSendEmail.txt', "a")
        log.write("error: " + recipient + "\n")
        log.close()

