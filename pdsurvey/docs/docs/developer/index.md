# Development Environment

__Sublime__

* Install [package manager](https://sublime.wbond.net/installation)
* Install [Emmet](http://emmet.io/)
* Install [AngularJS Sublime-Plugin](https://sublime.wbond.net/packages/AngularJS)


__Package Managers__

* using NPM and Bower (were chosen, instead of Browserify)
* Reasons, why I did / didn't check in the code for npm / bower components: http://addyosmani.com/blog/checking-in-front-end-dependencies/
* > to be independent of other services and thus to garantee a longer life for the tool
* benefits of package managers: "prevent bad dependencies from breaking their app" + "the longevity of package managers and their tooling"


__Database / MongoDB__

* [The MEAN Stack: Mistakes You’re Probably Making With MongooseJS, And How To Fix Them](http://blog.mongodb.org/post/52299826008/the-mean-stack-mistakes-youre-probably-making)
* [node.js and mongo (using mongoose) tutorial](http://blog.modulus.io/getting-started-with-mongoose)

* [File Structure of Mongoose & NodeJS Project](http://stackoverflow.com/questions/9230932/file-structure-of-mongoose-nodejs-project?answertab=votes#tab-top)
* [Saving nested objects in mongoose](http://stackoverflow.com/questions/21243502/saving-nested-objects-in-mongoose)





# REST API

The REST API is defined in `pdsurvey/pdserver/api/` with Node.js and Express.js. Each model has its own file, where the REST API is defined in, e.g. `pdsurvey/pdserver/api/campaigns.js`.


__Campaign__

* __GET__ `/api/campaigns`: returns all campaigns found on the platform.
* __POST__ `/api/campaigns`: creates a new campaign
* __GET__ `/api/campaigns/:id`: returns the specified campaign. The fields _surveys_ and _displays_ are populated.
* __PUT__ `/api/campaigns/:id`: updates the specified campaign
* __DELETE__ `/api/campaigns/:id`: deletes the specified campaign

* __GET__ `/api/campaigns/:id/questions`: returns all of the questions, specified for the campaign.
* __GET__ `/api/campaigns/:id/responses`: returns all results found for the specified campaign.
* __GET__ `/api/campaigns/:id/responses/count`: lists the number of responses found for the specified campaign. The result is a plain integer / string.
* __GET__ `/api/campaigns/:id/responses/csv`: provides a CSV file, with all the responses for the specified campaign (:id).


__Category__

__Context__

__DisplayModel__

__Display__

__Question__

__QuestionType__

__Response__

__Survey__

__User__

__Optional__

* /api/nextQuestion/




# Links

__Help to get started__

* [Which IDE to choose](http://www.sitepoint.com/javascript-internet-things/) + [Review of 10 JavaScript editors](http://www.javaworld.com/article/2094847/enterprise-java/review-10-javascript-editors-and-ides-put-to-the-test.html)
* [Node.js Tools](https://www.totaljs.com/tools/)
* [How do I get started with Node.js?](http://stackoverflow.com/questions/2353818/how-do-i-get-started-with-node-js)
* [RESTful API Design](http://code.tutsplus.com/tutorials/restful-api-design-with-nodejs-restify--cms-22637)

__Links for usability-field__

* [Usability 101: Introduction to Usability (by Jakob Nielsen)](http://www.nngroup.com/articles/usability-101-introduction-to-usability/)
* [The Difference (and Relationship) Between Usability and User Experience](http://usabilitygeek.com/the-difference-between-usability-and-user-experience/)


__Other useful links__

* [Web Development Fundamentals](https://developers.google.com/web/fundamentals/)

__Cool Tools__

* [Firebase](https://www.firebase.com/) - Build Realtime Apps, an API to store and sync data








# Future Work

* evaluation of the results
* deal with reliability and validity in my tool, discuss and display both values
* make sure all questions contribute to each scale/category with equal weight
* add the /nextQuestion functionality in `/server/api/nextQuestion.js`



__Authentication__

  1. Login mechanisms: good explanation of the differences for Single-Page Applications (SPA) = https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs
  1. + for more information, see Weeks 14 + 16 + 17

  During the prototyping phase we also

  For authentication there are the following common approaches, suited for RESTful web services.

  1. Token-based authentication: JSON Web Token (JWT)
  1. Cookie-based authentication


__Nice to haves__

  * Das [SB Admin 2](http://startbootstrap.com/template-overviews/sb-admin-2/) Template durch dessen Angular-Variante [angular-bp-sbadmin2](https://github.com/ardeearam/angular-bp-sbadmin2), dadurch sind dann alle MorrisChart Themes automatisch wieder funktionsfähig! Aktuell kommt es zu Konflikten zwischen jQuery, AngularJS und MorrisJS


  * Konfigurations-Infos im Backend verwalten
  * neue DIV Layer mit z-index 1
  * Versuchen so viel wie möglich bereits im Backend speichern und basierend auf der ID bereits ausliefern: Position, Farbe, Anzahl der Fragen, usw. der Umfrage
  * einmal beim Erstellen des Embed Codes angeben und dann automatisch so ausliefern, aber die Möglichkeit bieten das über zusätzliche Parameter zu überschreiben
  * manuelle Überschreibungsmöglichkeit über Parameter beim client-seitigen Aufruf: <script src=”.../survey.js?size=X&color=X”> → das ist deutlich besser für das Debugging!
