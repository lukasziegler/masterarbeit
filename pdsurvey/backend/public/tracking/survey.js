
// inject the stylesheet
var cssId = 'pdsurvey';
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'http://localhost:3000/tracking/style.css';
    link.media = 'all';
    head.appendChild(link);
}


// inject content
$(document).ready(function(){

	var div = $( 'body' ).append( '<div id="pdsurvey"></div>' );

	div.append( "<p>Injected Code</p>" );

});
