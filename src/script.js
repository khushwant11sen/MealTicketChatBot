document.addEventListener('df-response-received', function(event) {
    // Access the response object from the event
    const response = event.detail;
    if (response){
        const botReply = response.response.queryResult.fulfillmentMessages[0].text.text[0];
        if (botReply){
            console.log('Bot Reply: ', botReply);
            speakResponse(botReply);
        }
    }
});

// Function to start speaking on page load
function startSpeakingOnLoad() {
    const dfMessenger = document.querySelector("df-messenger");
    customElements.whenDefined('df-messenger').then(() => {
      const shadow = dfMessenger.shadowRoot;
      if (shadow) {
        micBtn = document.querySelector('#mic_btn');
        closeBtn = shadow.getElementById('widgetIcon');
        closeBtn.addEventListener('click', function (event) {
          if (micBtn.style.visibility === "hidden") {
            micBtn.style.visibility = "visible";
          } else {
            micBtn.style.visibility = "hidden";
          }
        });
      } else {
        console.log("not done");
      }
      speakResponse('');
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    // Start speaking when the page has finished loading
    startSpeakingOnLoad();
  });
  

async function handleAudio() {
    mcbtn = document.querySelector('#mic_btn');
    $("#mic_btn").removeClass("black");
    $("#mic_btn").addClass("red");
    // Perform audio input - convert user's spoken query to text using Web Speech API (SpeechRecognition)
    try {
        const recognition = new window.webkitSpeechRecognition(); // For Chrome and Edge, use SpeechRecognition instead of webkitSpeechRecognition
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.onresult = (event) => {
            const userSpokenText = event.results[0][0].transcript;
            console.log('User Spoken Text:', userSpokenText);
            // Pass the user's spoken text to Dialogflow Messenger for processing
            $("#mic_btn").removeClass("red");
            $("#mic_btn").addClass("black");
            sendMessage(userSpokenText,mcbtn);    
        };
        recognition.start();
    } catch (error) {
        console.error('Error with speech recognition:', error);
    }
}

// Function to send a message to Dialogflow Messenger
function sendMessage(content) {
    const inputField = document.querySelector('df-messenger').shadowRoot.querySelector('df-messenger-chat').shadowRoot.querySelector('df-messenger-user-input').shadowRoot.querySelector('input');
    inputField.value = content;
    // Simulate 'Enter' keypress to submit the user message
    // create a button event here and create and a send button that only appears for this time
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, view: window, bubbles: true, cancelable: true });
    inputField.dispatchEvent(enterEvent);
}


function speakResponse(text){
    const msg = new SpeechSynthesisUtterance();
    // Set the text to be spoken
    msg.text = text;
    // Uncomment the following line to set the voice of the speech (optional)
    // msg.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'en-US');
  
    // Uncomment the following lines to change the speech rate and pitch (optional)
    // msg.rate = 1.0; // Speech rate (0.1 to 10)
    msg.pitch = 1.3; // Speech pitch (0 to 2)
  
    // Speak the text
    window.speechSynthesis.speak(msg);
}



  // Function to initialize the Google Cloud TTS client library
//   function initTTS() {
//     gapi.client.init({
//         apiKey: 'AIzaSyA1cMmSylMmyAa2yKBbmkXCUibaqACY93c',
//         discoveryDocs: ['https://texttospeech.googleapis.com/$discovery/rest?version=v1'],
//     });
// }
