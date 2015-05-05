# Welcome to PDSurvey

_PDSurvey_ is a survey platform for public displays, developed by Lukas Ziegler at the [Chair for Media Informatics Group](http://www.medien.ifi.lmu.de/) at the University of Munich. The foundation for this platform was laid in the Master thesis supervised by Florian Alt: "[Design and Development of a Public Display Survey Platform](http://lukasziegler.com/upload/thesis.pdf)"
The goal of the platform is to facilitate the execution of surveys on public displays and is a toolset for further PD evaluation.


## Documentation layout

* REST API
* Maintenance Docu (for Admins)


## Project layout

    docs/         # Documentation of the PDSurvey platform
    pdemail/      # Python Script for sending Emails from the PD in Oett67

    pdsurvey/     # PDSURVEY PLATFORM

    pdsurvey/bower_components/ + /config/ + /node_modules/  # config files

    pdsurvey/pdadmin/       # Administration interface
    pdsurvey/pdclient/      # Responsive client web-interface
    pdsurvey/pdserver/      # Node.js server providing REST API

    pdsurvey/newrelic.js    # Embeding analytics software, pinging platform, preventing sleep mode of Heroku dyno
    pdsurvey/package.json   # for npm
    pdsurvey/server.js      # Node script
