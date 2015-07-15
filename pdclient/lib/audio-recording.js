
/*1/we test if the API is supported by the browser*/
  /*
  if (!('webkitSpeechRecognition' in window))
  {
    upgrade();
  }
  else {alert("youpi");}
  */

/*2/Using of the API*/
  /*2.1/SpeechSynthesis*/
  /*  var msg = new SpeechSynthesisUtterance("hello"); /*instance of SpeechSynthesisUtterance*/
  /*  var text="hello my name is Sulyvan, and this is a test, and so i can say whatever i want";
  /*  msg.text=text; /*definition of the text we want to be said out loud*/
  /*  msg.lang='en-US'; /*definition of the language which gonna be used*/
  /*  window.speechSynthesis.speak(msg); /*once configurate we can say it out loud*/
  
  /*2.2/SpeechRecognition*/

  var recognition = new webkitSpeechRecognition(); /*instance of SpeechRecognition*/
  recognition.continuous = false; /*defines if it records continuously or not*/
  recognition.interimResults = true;
  recognition.lang='de'; /*choose of the language used for the recognition*/
  
  /*definition of the fonction, of the attribut onresult from recognition*/
    recognition.onresult = function (e) {
        var textarea = document.querySelector('#results');
        for (var i = e.resultIndex; i < e.results.length; ++i) {
            if (e.results[i].isFinal) {
                $('#results').val(e.results[i][0].transcript);
            }
        }
    }
 
    // start listening
    //recognition.start();
  
  function startButton(event){
  
  // start listening
    recognition.start();
  
  }
/**/