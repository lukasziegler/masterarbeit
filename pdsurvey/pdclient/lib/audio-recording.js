
/*1/we test if the API is supported by the browser*/

  if (!('webkitSpeechRecognition' in window))
  {
    alert("Speech recognition not supported")
    // upgrade();
  }


/*2/Using of the API*/
  /*2.1/SpeechSynthesis*/
  /*  var msg = new SpeechSynthesisUtterance("hello"); /*instance of SpeechSynthesisUtterance*/
  /*  var text="hello my name is Sulyvan, and this is a test, and so i can say whatever i want";
  /*  msg.text=text; /*definition of the text we want to be said out loud*/
  /*  msg.lang='en-US'; /*definition of the language which gonna be used*/
  /*  window.speechSynthesis.speak(msg); /*once configurate we can say it out loud*/
  

  /*2.2/SpeechRecognition*/

  var recognition = new webkitSpeechRecognition(); /*instance of SpeechRecognition*/
  recognition.continuous = true; /*defines if it records continuously or not*/
  recognition.interimResults = true;
  recognition.lang='de'; /*choose of the language used for the recognition*/
  
  recognition.onresult = function (e) {
      var textarea = document.querySelector('#results');
      for (var i = e.resultIndex; i < e.results.length; ++i) {
          if (e.results[i].isFinal) {
              textarea.value += e.results[i][0].transcript+";";
              console.log(e.results[i][0].transcript)
          }
      }

      changeDOM(textarea.value);
  }
   
  // start listening
  function startRecording(event){  
      recognition.start();
  }

  function changeDOM(val) {
    var scope = angular.element($("#ctrl")).scope();
    scope.$apply(function(){
        scope.audioResponse = val;
    })
  }

  function stopRecording(event) {
    // webkitSpeechRecognition.stop();
      recognition.stop();
  }

