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

    // Load content from remote template
    $.get( uri + 'survey.html', function(data){
        div.html(data);
    })

    // Testing Bootstrap Namespace
    // .done(function() {
    //     div.append( '<a class="btn btn-default" href="#" role="button">Bootstrap Test</a>' );
    // })

    // Load JSON data via REST call
    $.getJSON( api + 'standardSurvey' )
    .done(function( data ) {
        
        if (debug) {
            console.log( "REST Response", data );
        }

        div.append( '<p>NumSurveys: '+data.length+'</p>' );
        
    });

});
