var flag = false;

document.addEventListener('df-response-received', function(event) {
    // Access the response object from the event
    const response = event.detail;
    if (response){
        const botReply = response.response.queryResult.fulfillmentMessages[0].text.text[0];
        if (botReply && flag){
            console.log('Bot Reply: ', botReply);
            speakResponse(botReply);
        }
        if (botReply.toLowerCase().includes("your name")){
              console.log("greetings received")
              setTimeout(message_clicked,0660)
        }
    }
});

function displayMenu() {
  const dropdownContent = document.getElementById('dropdown-content');
  dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
  console.log(dropdownContent.style.display)
}


function message_clicked() {
  message_area = document.querySelector('df-messenger').shadowRoot.querySelector('df-messenger-chat').shadowRoot.querySelector('df-message-list').shadowRoot.getElementById('messageList')
  message_area.click()
  mic_btn = document.querySelector('#mic_btn')
  mic_btn.style.visibility = "visible"
  console.log("opened df chat")
  var verticalDots = document.getElementById('menuBtn');
  verticalDots.style.visibility = 'visible'
}

// Function to start speaking on page load
function startSpeakingOnLoad() {
    const dfMessenger = document.querySelector("df-messenger");
    customElements.whenDefined('df-messenger').then(() => {
      const shadow = dfMessenger.shadowRoot;
      if (shadow) {
        micBtn = document.querySelector('#mic_btn');
        closeBtn = shadow.getElementById('widgetIcon');
        dots = document.getElementById('menuBtn');
        closeBtn.addEventListener('click', function (event) {
          if (micBtn.style.visibility === "hidden") {
            micBtn.style.visibility = "visible";
            dots.style.visibility = "visible";
          } else {
            micBtn.style.visibility = "hidden";
            dots.style.visibility = "hidden";
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
        recognition.onerror = (event) =>{
          console.log("An error occured while recoghinzing")
            $("#mic_btn").removeClass("red");
            $("#mic_btn").addClass("black");
        }
        recognition.onnomatch  = (event) =>{
          console.log("No match found while recoghinzing")
            $("#mic_btn").removeClass("red");
            $("#mic_btn").addClass("black");
        }
        recognition.start();
    } catch (error) {
        $("#mic_btn").removeClass("red");
        $("#mic_btn").addClass("black");
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


function set_responsive(){
  // access title bar
  const dfMessenger =  document.querySelector('df-messenger').shadowRoot.querySelector('df-messenger-chat').shadowRoot
  const titleBar = dfMessenger.querySelector('df-messenger-titlebar').shadowRoot.querySelector('.title-wrapper');

  //snippet to create div 
  var newDiv = document.createElement('div');
  newDiv.id = 'dropdown';
  newDiv.className= 'dropdown';
  newDiv.style.position = 'relative';
  newDiv.style.display = 'inline-block';
  newDiv.style.height = 'fit-content';
  newDiv.style.width = 'fit-content';
  newDiv.style.right = '10px';
  newDiv.style.padding = '2px';
  newDiv.style.top = '3px';

  // snippet to create mic image
  var newImage = document.createElement("img");
  newImage.id = "tripple-dot-icon";
  newImage.style.right = "10px";
  newImage.src = "./vertical_dots.png";
  newImage.style.height = "30px";
  newImage.style.filter = "invert(1)";
  newImage.style.zIndex = "99999";
  newImage.style.top = "10px";

    // snippet to create drop-down menu
  var dropDownContent = document.createElement("div");
  dropDownContent.className = "dropdown-content";
  dropDownContent.id = "dropdown-content"


   // snippet to create checkbox
  var inputTag = document.createElement('input');
  inputTag.id = 'checkbox';
  inputTag.type = "checkbox";
  inputTag.addEventListener('change',function(){
    if(this.checked) {
      flag=true;
      console.log("checked");
    }else{
      flag=false;
      console.log("unchecked");
    }
  });

  // snippet for drop-down menu item
  var spanTag = document.createElement('span');
  spanTag.innerText = "Text to speech";
  spanTag.style.color = "black";
  spanTag.style.fontSize = "12px";
  spanTag.style.marginLeft = "5px";

  // append span and input to drop-down
  dropDownContent.appendChild(inputTag);
  dropDownContent.appendChild(spanTag);
  // drop-down styling
  var styleElement = document.createElement("style");
  styleElement.innerHTML = `
  svg{
    display:none;
  }
  .dropdown-content{
    display: none;
    position: absolute;
    padding: 10px;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    align-items: center;
    right: 0;
    margin-top: 2px;
  }
  .dropdown:hover .dropdown-content{
    display: flex;
  }`

  // append everythin to div
  newDiv.appendChild(newImage);
  newDiv.appendChild(dropDownContent);
  newDiv.appendChild(styleElement);
  // add div to title bar
  titleBar.appendChild(newDiv);
}



function speakResponse(text){
  try{
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
  }catch (error) {
    console.error('Error occured while speaking', error);
  }
}
