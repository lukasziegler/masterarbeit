# Maintenance Documentation

Not really sure if this one is needed, since for this project the developer will also be maintaining the platform.


"If your work has lasting benefit, someone will want to extend the functionality of your code. A well thought-out maintenance manual can assist in explaining your code. The maintenance manual grows from your specification, preliminary design, and detailed design documents. The manual shows how your program is decomposed into modules, specifies the interfaces between modules, and lists the major data structures and control structures. It should also specify the effective scope of changes to your code."



## Deployment

The _PDSurvey_ repository is hosted in GitHub and was deployed to Heroku, using the provided [git client](https://devcenter.heroku.com/articles/git).

    heroku login
    git add .     # git status (to check what has been added)
    git commit -m "Demo"
    git push heroku master
    heroku open



## Manual Changes

Here is an overview of some places where manual changes are needed:

* Changing the _Multiple Choice_ question types: you need to add the response options directly in the _surveys_ collection of MongoDB / MongoLab.
``
    "options": [
        "Smartphone",
        "Mobile phone (without touch screen)",
        "Tablet/iPad",
        "Laptop",
        "PC/Mac"
    ],
``
