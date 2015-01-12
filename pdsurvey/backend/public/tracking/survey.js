/** 
 * PDClient
 * 
 * Author: @lukasziegler
 * GitHub: http://github.com/lukasziegler
 */


/*** General Setup ***/
var uri = 'http://localhost:3000/tracking/';
var api = 'http://localhost:3000/api/';
var debug = true;

/*** Inject STYLESHEETS ***/

var cssId = 'pdsurvey';
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];

    var cssStyle  = document.createElement('link');
    // cssStyle.id   = cssId;
    cssStyle.rel  = 'stylesheet';
    cssStyle.type = 'text/css';
    cssStyle.href = uri+'pdsurvey.css';
    cssStyle.media = 'all';
    head.appendChild(cssStyle);

    var cssBootstrap  = document.createElement('link');
    cssBootstrap.rel  = 'stylesheet';
    cssBootstrap.type = 'text/css';
    cssBootstrap.href = uri + 'bootstrap.pd.min.css';
    cssBootstrap.media = 'all';
    head.appendChild(cssBootstrap);
}


/*** Inject CONTENT ***/

$(document).ready(function(){

    var div = $( '<div/>' ).addClass( 'pdsurvey' );
	$( 'body' ).append( div );

    /** A) Load content from remote template **/
    // $.get( uri + 'survey.html', function(data){
    //     div.html(data);
    // })
    // .done(function() {
    //     div.append( '<a class="btn btn-default" href="#" role="button">Bootstrap Test</a>' );
    // })

    /** B) Testing Bootstrap Namespace **/
    var container = $( '<div/>' ).addClass( 'container' );
    container.append('<h1>PDSurvey</h1>');
    div.append(container);

    // Load JSON data via REST call
    $.getJSON( api + 'standardSurvey' )
    .done(function( data ) {
        
        if (debug) {
            console.log( "REST Response", data );
        }

        // List of available Questionnaires
        container.append('Available Questionnaires:<br>');

        var surveys = $('<ul/>')
        $.each(data, function(i, item) {
            surveys.append('<li>'+item.name+'</li>');
        });
        container.append(surveys);
        
        // Ask a random Question
        var question = $('<div/>').append('<strong>Random Question:</strong> ')

        var randSurvey = Math.floor(Math.random() * data.length);
        var randSection = Math.floor(Math.random() * data[randSurvey].sections.length);
        var randQuestion = Math.floor(Math.random() * data[randSurvey].sections[randSection].questions.length);

        console.log("RandQuestion:", randSurvey, randSection, randQuestion);

        question.append( data[randSurvey].sections[randSection].questions[randQuestion].question + '<br>' );
        var response = $('<a class="btn btn-primary">Respond</a>')

        question.append(response);
        container.append(question);
    });

});
