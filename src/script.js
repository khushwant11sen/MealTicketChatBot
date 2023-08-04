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

function message_clicked() {
  message_area = document.querySelector('df-messenger').shadowRoot.querySelector('df-messenger-chat').shadowRoot.querySelector('df-message-list').shadowRoot.getElementById('messageList')
  message_area.click()
  mic_btn = document.querySelector('#mic_btn')
  mic_btn.style.visibility = "visible"
  console.log("opened df chat")
}


  function generateSessionId() {
    const chars = '0123456789';
    let sessionId = '';
    const sessionIdLength = 10; // You can adjust the length of the session ID as needed
    for (let i = 0; i < sessionIdLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      sessionId += chars.charAt(randomIndex);
    }
    return sessionId;
  }

function refreshMessageList() {
    // Get the df-messenger element
   const dfMessenger =  document.querySelector('df-messenger');
   const sendIcon = dfMessenger.shadowRoot.querySelector('df-messenger-chat').shadowRoot.querySelector('df-messenger-user-input').shadowRoot.getElementById('sendIcon');
   // Access the df-message-list element inside the df-messenger-chat shadowRoot
   const dfMessageList = dfMessenger.shadowRoot.querySelector('df-messenger-chat').shadowRoot.querySelector('df-message-list').shadowRoot.getElementById('messageList');  
   dfMessageList.textContent = ``;
   dfMessenger.setAttribute('session-id','dfMessenger-'+ generateSessionId());
   dfMessenger.renderCustomText("Do you want to 'quit' or 'restart'? ");
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
      create_menu_list();
    });
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    // Start speaking when the page has finished loading
    startSpeakingOnLoad();
  });


// function to detecct user browser
function detectSpeechRecognition() {
    try {
        if ('SpeechRecognition' in window) {
          console.log("user got safari/firefox");
          return new window.SpeechRecognition(); // For browsers supporting the standard SpeechRecognition API
        } else if ('webkitSpeechRecognition' in window) {
          console.log("user got chrome/edge");
          return new window.webkitSpeechRecognition(); // For Chrome and Edge, use webkitSpeechRecognition
        } else {
          console.log("STT not ssupported by browser");
          throw new Error('Speech recognition not supported in this browser.');
        }
    } catch (error) {
        console.error('Error with speech recognition:', error);
        $("#mic_btn").removeClass("red");
        $("#mic_btn").addClass("black");
    }
}

async function handleAudio() {
    mcbtn = document.querySelector('#mic_btn');
    $("#mic_btn").removeClass("black");
    $("#mic_btn").addClass("red");
    // Perform audio input - convert user's spoken query to text using Web Speech API (SpeechRecognition)
    try {
        const recognition = detectSpeechRecognition();
        if (recognition) {
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.onresult = (event) => {
              const userSpokenText = event.results[0][0].transcript;
              console.log('User Spoken Text:', userSpokenText);
              // Pass the user's spoken text to Dialogflow Messenger for processing
              $("#mic_btn").removeClass("red");
              $("#mic_btn").addClass("black");
              sendMessage(userSpokenText);
          };
          recognition.onerror = (event) => {
              console.log("An error occurred while recognizing");
              $("#mic_btn").removeClass("red");
              $("#mic_btn").addClass("black");
          };
          recognition.onnomatch = (event) => {
              console.log("No match found while recognizing");
              $("#mic_btn").removeClass("red");
              $("#mic_btn").addClass("black");
          };
          recognition.start();
      }
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
  const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, view: window, bubbles: true, cancelable: true });
  // Simulate 'input' event to trigger input event listeners (e.g., Dialogflow Messenger)
  const inputEvent = new Event('input', { bubbles: true, cancelable: true });
  inputField.dispatchEvent(inputEvent);
  inputField.dispatchEvent(enterEvent);
}


function create_menu_list(){
  // access title bar
  const dfMessenger =  document.querySelector('df-messenger').shadowRoot.querySelector('df-messenger-chat').shadowRoot
  const titleBar = dfMessenger.querySelector('df-messenger-titlebar').shadowRoot.querySelector('.title-wrapper');

  //snippet to create div 
  var newDiv = document.createElement('div');
  newDiv.id = 'dropdown';
  newDiv.className= 'dropdown';
  newDiv.style.position = 'fixed';
 // newDiv.style.display = 'inline-block';
  //newDiv.style.height = 'fit-content';
  //newDiv.style.width = 'fit-content';
  newDiv.style.right = '45px';
  newDiv.style.padding = '2px';
  newDiv.style.top = '8px';

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


     //snippet to create a container for checkbox and voice resposne label 
    var checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox-container';
    checkboxContainer.style.display = 'flex';

     // snippet to create checkbox
    var speechInputTag = document.createElement('input');
    speechInputTag.id = 'checkbox';
    speechInputTag.type = "checkbox";
    speechInputTag.addEventListener('change',function(){
      if(this.checked) {
        flag=true;
        console.log("checked");
      }else{
        flag=false;
        console.log("unchecked");
      }
    });
    
    // snippet for drop-down menu item
    var speechSpanTag = document.createElement('span');
    speechSpanTag.innerText = "Voice Responses";
    speechSpanTag.style.color = "black";
    speechSpanTag.style.fontSize = "12px";
    speechSpanTag.style.marginLeft = "5px";
    speechSpanTag.addEventListener('click',function(event){
      speechInputTag.click()
      if(speechInputTag.checked) {
        flag=true;
        // console.log("checked");
      }else{
        flag=false;
        // console.log("unchecked");
      }
    })
    speechSpanTag.click();

    // snippet to create a restart chat span tag
    var restartSpanTag = document.createElement('span');
    restartSpanTag.id = 'restart_btn'
    restartSpanTag.className = 'restart_chat'
    restartSpanTag.innerText = "End Chat";
    restartSpanTag.style.color = "black";
    restartSpanTag.style.fontSize = "12px";
    restartSpanTag.style.marginLeft = "5px";
    restartSpanTag.addEventListener('click',refreshMessageList);

  
    // append span and input to checkbox conatiner
    checkboxContainer.appendChild(speechInputTag);
    checkboxContainer.appendChild(speechSpanTag);

    // append checkbox cont. and restart span to drpo-down
    dropDownContent.appendChild(checkboxContainer);
    dropDownContent.appendChild(restartSpanTag);
    
  // drop-down styling
  var styleElement = document.createElement("style");
  styleElement.innerHTML = `
    
    .dropdown-content {
      display: none;
      position: absolute;
      flex-direction: column;
      align-items: flex-start;
      padding: 10px;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      right: 0;
      margin-top: 2px;
      background-color: white;
    }
    
    /* Styling for the dropdown items */
    .dropdown-content span {
      /* Align items vertically in the center */
      padding: 5px;
      cursor: pointer; /* Set the cursor to pointer for better user experience */
      width: 100%; /* Take the full width of the dropdown */
      box-sizing: border-box; /* Include padding and border in width calculation */
      
    }
    
    .dropdown-content span:hover {
      background-color: #f1f1f1; /* Change background color on hover */
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
