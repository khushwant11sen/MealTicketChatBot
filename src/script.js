// flag to take acre of voice resposnses checkbox 
var flag = false;
// ------------UI CUSTOMIZATION CODE STARTS -----------------------------------

// menu method created a drop-down menu for dfg messenger
function create_menu_list(){
  // access title bar
  const dfMessenger =  document.querySelector('df-messenger').shadowRoot.querySelector('df-messenger-chat').shadowRoot
  const titleBar = dfMessenger.querySelector('df-messenger-titlebar').shadowRoot.querySelector('.title-wrapper');
  //snippet to create div 
  var newDiv = document.createElement('div');
  newDiv.id = 'dropdown';
  newDiv.className= 'dropdown';
  newDiv.style.position = 'fixed';
  newDiv.style.right = '62px';
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

  // append checkbox and voice label to drop-down
  dropDownContent.appendChild(speechInputTag);
  dropDownContent.appendChild(speechSpanTag);
  
  // drop-down styling
  var styleElement = document.createElement("style");
  styleElement.innerHTML = `
    
    .dropdown-content {
      display: none;
      position: absolute;
      flex-direction: row;
      align-items: center;
      padding: 10px;
      min-width: 160px;
      box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
      right: 12px;
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


// as name suggests addds microphone to df
function insertMicrophone(){
  var r1 = document.querySelector("df-messenger").shadowRoot.querySelector("df-messenger-chat").shadowRoot.querySelector("df-messenger-user-input");
  var sent_btn = r1.shadowRoot.getElementById('sendIcon');
  var inputContainer = r1.shadowRoot.querySelector(".input-box-wrapper");
  // Create a new microphone icon element
  var microphoneIcon = document.createElement("img");
  microphoneIcon.id = 'mic_btn';
  microphoneIcon.style.height = '20px';
  microphoneIcon.style.width = '20px';
  microphoneIcon.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mic" width="20" height="20"><path d="M12 1a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>';
  microphoneIcon.onclick = function() {
    var blackMic = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mic" width="20" height="20"><path d="M12 1a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>';
    var redMic = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mic" width="20" height="20"><path d="M12 1a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V4a3 3 0 0 1 3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>';
    if (this.src == blackMic) {
        this.src = redMic;
        handleAudio(); 
        setTimeout(() => {
            this.src = blackMic;
        }, 7000); // Change back to black after 7 seconds
      } else {
        this.src = blackMic;
    }
  };
  // Insert the microphone icon before the send icon in the input container
  inputContainer.insertBefore(microphoneIcon, sent_btn);
  // Adjust the style of the input container to align items center
  inputContainer.style.display = 'flex';
  inputContainer.style.alignItems = 'center';
}

// function for left styling sttribue to df-messsenger after giving left position
function positionStyling(){
  $r1 = document.querySelector("df-messenger");
  // Create a new style element
  var style = document.createElement('style');
  style.textContent = `
      div.df-messenger-wrapper { 
        left: 66px !important; 
        right: auto !important; 
      }
      #widgetIcon{
        z-index : -1;
      }
  `;
  // Append the style element to the shadow root
  $r1.shadowRoot.appendChild(style);
}


// this function is called by refresh chat to create new df-messenger
function closeAndStartNewChat() {
  const dfMessenger = document.querySelector('df-messenger');
  const parentElement = dfMessenger.parentElement;
  parentElement.removeChild(dfMessenger); // Remove the df-messenger element
  console.log('messenger-removed');
  // Recreate the df-messenger element and append it back to the DOM to start a new chat
  const newDfMessenger = document.createElement('df-messenger');
  newDfMessenger.setAttribute('intent', 'WELCOME');
  newDfMessenger.setAttribute('chat-title', 'MealTicket');
  newDfMessenger.setAttribute('agent-id', 'b2a18834-c229-4b1c-94e0-53c76dc519d0');
  newDfMessenger.setAttribute('language-code', 'en');
  newDfMessenger.setAttribute('expand','false');
  newDfMessenger.setAttribute('chat-icon', 'meal-logo.png');
  parentElement.appendChild(newDfMessenger);
  // add meal customization
  customizeUI();
}


// fucntion to refresh df-messenger chat
function setRefreshIcon(){
  const titleBar = document.querySelector("df-messenger").shadowRoot.querySelector('df-messenger-chat').shadowRoot.querySelector('df-messenger-titlebar').shadowRoot.querySelector('.title-wrapper');
  var refresh_icon = document.createElement('img');
  refresh_icon.id = 'refresh_btn';
  refresh_icon.src = 'refresh_icon.png';
  refresh_icon.style.height = "25px";
  refresh_icon.style.width = "25px";
  refresh_icon.style.marginRight = '7px';
  refresh_icon.style.filter = "invert(1)";
  refresh_icon.title = 'Refresh chat';
  refresh_icon.addEventListener('click',function(event){
    console.log('chat-closed');
    closeAndStartNewChat();
  });
  titleBar.appendChild(refresh_icon);
}


// function to give avatar and minimze button to df-messeneger
function setAvatar(){
  var r1 = document.querySelector("df-messenger");
  var r2 = r1.shadowRoot.querySelector("df-messenger-chat");
  var r3 = r2.shadowRoot.querySelector("df-messenger-titlebar");
  var dfTitlebar = r3.shadowRoot.querySelector("#dfTitlebar");
  // Create a new image element
  var img = document.createElement("img");
  img.src = './meal-logo.png';
  img.style.height = '39px';
  img.style.width = '42px';
  img.style.marginRight = '0px';
  // Insert the image at the beginning of the dfTitlebar div
  dfTitlebar.insertBefore(img, dfTitlebar.firstChild);
  // Adjust the style of the dfTitlebar div
  dfTitlebar.style.display = 'flex';
  dfTitlebar.style.alignItems = 'center';
  // Create a new style element
  var style = document.createElement('style');
  style.textContent = `
    .title-wrapper {
      display: flex;
      align-items: center;
      justify-content : unset;
    }
    #minimizeIcon {
      fill: white;
      fill: var(--df-messenger-button-titlebar-font-color);
      margin-left: 445px;
      margin-right: 6px;
      transform: rotate(180deg); /* Updated the rotation to 180 degrees */
    }
    @media screen and (min-width: 501px) {
        #minimizeIcon {
            visibility: visible !important;
        }
    }
  `;
  const minimizeIcon = document.querySelector('df-messenger').shadowRoot.querySelector("df-messenger-chat").shadowRoot.querySelector("df-messenger-titlebar").shadowRoot.getElementById("minimizeIcon");
  minimizeIcon.data_label = 'minimize';
  // Insert the style at the beginning of the shadow root
  r3.shadowRoot.appendChild(style);
}


// function to make dialogflow appear to left of screen
function setSizePosition(){
  positionStyling();
  $r1 = document.querySelector("df-messenger");
  $r2 = $r1.shadowRoot.querySelector("df-messenger-chat");
  $r3 = $r2.shadowRoot.querySelector("df-messenger-user-input"); //for other mods
  // Create a new style element
  var style = document.createElement('style');
  style.textContent = `
      div.chat-wrapper { 
          left: 2px !important; 
          width: 652px !important; 
          bottom:15px !important;
          height: 550px !important;
          transform: translateX(-5%) translateY(35%) scale(0.5, 0.5);
          transition: transform 0.1s ease, opacity 0.1s ease-in, height 0s ease 0.2s;
          
      }
  `;
  // Append the style element to the shadow root
  $r2.shadowRoot.appendChild(style);
}


// fuhcntion to make input box reponsive
function responsive_input_box(){
  var r1 = document.querySelector("df-messenger").shadowRoot.querySelector("df-messenger-chat").shadowRoot.querySelector("df-messenger-user-input");
  // Create a new style element
  var style = document.createElement('style');
  style.textContent = `
  @media only screen and (max-width: 481px) {
      .input-container {
          width: 60%;
          height:50px 
      }
  }`;
  // Append the style element to the shadow root of r1
  r1.shadowRoot.appendChild(style);
}


// function to make message box responsive
function responsive_message_box(){
  var r1 = document.querySelector("df-messenger");
  var r2 = r1.shadowRoot.querySelector("df-messenger-chat");
  var r3 = r2.shadowRoot.querySelector("df-message-list");
  var style = document.createElement('style');
  style.textContent = `
  @media only screen and (max-width: 481px) {
      .message-list-wrapper {
          width: 60%;
      }
  }`;
  // Append the style element to the shadow root of r1
  r3.shadowRoot.appendChild(style);
}

// function to make bot header responsive
function responsive_Bot_header(){
  var r1 = document.querySelector("df-messenger");
  var r2 = r1.shadowRoot.querySelector("df-messenger-chat");
  var r3 = r2.shadowRoot.querySelector("df-messenger-titlebar");
  var style = document.createElement('style');
  style.textContent = `
  @media only screen and (max-width: 481px) {
      .title-wrapper {
          width: 60%;
          right: 0px;
          padding-left: 0px;
      }
  }`;
  // Append the style element to the shadow root of r1
  r3.shadowRoot.appendChild(style);
}


// main cutomization function that calls other cusum methods
function customizeUI(){
  setSizePosition();
  create_menu_list();
  setAvatar();
  setRefreshIcon();
  insertMicrophone();
  responsive_Bot_header();
  responsive_message_box();
  responsive_input_box();
}


// ------------UI CUSTOMIZATION CODE ENDS  -----------------------------------

// this function gets triggered whenever it receives a response from df
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
        console.log("greetings received");
        setTimeout(message_clicked,0660);
      }
  }
});

// this function is called when first time our site is loaded(called by response received)
function message_clicked() {
message_area = document.querySelector('df-messenger').shadowRoot.querySelector('df-messenger-chat').shadowRoot.querySelector('df-message-list').shadowRoot.getElementById('messageList');
message_area.click();
console.log("opened df chat");
}


// Function to load dialogflow messenger bot
function loadDialogFlow() {
    const dfMessenger = document.querySelector("df-messenger");
    customElements.whenDefined('df-messenger').then(() => {
      const shadow = dfMessenger.shadowRoot;
      if (shadow) {
        customizeUI();
      } else {
        console.log("Error loading dialogflow");
      }
    });
  }

  // Main calling event of dialogflow when page is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Start speaking when the page has finished loading
    loadDialogFlow();
  });


// function to detect user browser
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

// function to listen for user voice
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

// fucntion to speak responses for dialogflow
function speakResponse(text){
  try{
    if ('speechSynthesis' in window){
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
    }else{
      console.log(window);
      console.log("Text-To-Speech not supported by your browser");
    } 
  }catch (error) {
    console.error('Error occured while speaking', error);
  }
}
