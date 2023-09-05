// flag to take acre of voice resposnses checkbox 
var flag = false;
// marker to check whether user closed df or not
var user_closed_df = false;
// marker for current intent received from bot in response recieved
var current_intent = "none";
// array for intents which will enable multiple chip select
const multi_chip_intents = ["askCuisine","askDeliveryOrder - yes","askEquimentType", "askFoodDistributor", "askSalePromotions - no"];

// ------------UI CUSTOMIZATION CODE STARTS -----------------------------------

// menu method created a drop-down menu for dfg messenger
function createMenuAndRefreshIcon(){
  // access title bar
  const dfMessenger =  document.querySelector('df-messenger').shadowRoot.querySelector('df-messenger-chat').shadowRoot
  const titleBar = dfMessenger.querySelector('df-messenger-titlebar').shadowRoot.querySelector('.title-wrapper');
  // Create a container div to hold both the dropdown and refresh icon
  var containerDiv = document.createElement('div');
  containerDiv.style.display = 'flex';
  containerDiv.style.alignItems = 'center';
  // Create the close icon
  var close_icon = document.createElement('img');
  close_icon.id = 'close_btn';
  close_icon.src = 'close_icon.svg';
  close_icon.style.height = "25px";
  close_icon.style.width = "25px";
  close_icon.style.marginRight = '7px';
  close_icon.style.filter = "invert(1)";
  close_icon.title = 'Exit chat';
  close_icon.addEventListener('click', function (event) {
    console.log('chat-closed');
    user_closed_df = true;
    closeAndStartNewChat();
  });
  // Append the close icon to the container
  containerDiv.appendChild(close_icon);

  // Existing code to create the dropdown menu
  var newDiv = document.createElement('div');
  //snippet to create div 
  var newDiv = document.createElement('div');
  newDiv.id = 'dropdown';
  newDiv.className= 'dropdown';
  newDiv.style.padding = '2px';
  newDiv.style.top = '8px';

  // snippet to create mic image
  var newImage = document.createElement("img");
  newImage.id = "tripple-dot-icon";
  newImage.style.right = "10px";
  newImage.src = "svg_vertical_icon.svg";
  newImage.style.height = "22px";
  newImage.style.marginTop = '4px';
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

  // Append the dropdown to the container
  containerDiv.appendChild(newDiv);

  // Append the container to the title bar
  titleBar.appendChild(containerDiv);
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
  const newDfMessenger = document.createElement('df-messenger');
    // if user_closed_df is true than we don't need to fire the welcome intent as bot is gonna minimize
  if (!user_closed_df){
    // this section  will not get adds when user closes df through close btn
    newDfMessenger.setAttribute('intent', 'WELCOME');
  }
  // Recreate the df-messenger element and append it back to the DOM to start a new chat
  newDfMessenger.setAttribute('chat-title', 'Selena');
  newDfMessenger.setAttribute('agent-id', 'b2a18834-c229-4b1c-94e0-53c76dc519d0');
  newDfMessenger.setAttribute('language-code', 'en');
  newDfMessenger.setAttribute('expand','false');
  newDfMessenger.setAttribute('chat-icon', 'meal-logo.png');
  parentElement.appendChild(newDfMessenger);
  // add meal customization
  customizeUI();
  // trigger FAB bttn only when user_close_df is true as we are not triggering WELCOME intent so it should minimize
  if(user_closed_df){
    var fabIcon = newDfMessenger.shadowRoot.getElementById('widgetIcon');
    fabIcon.click();
    console.log(user_closed_df);
  }
  initializeObserver();
}

// function to give avatar and minimze button to df-messeneger
function setAvatar(){
  var r1 = document.querySelector("df-messenger");
  var r2 = r1.shadowRoot.querySelector("df-messenger-chat");
  var r3 = r2.shadowRoot.querySelector("df-messenger-titlebar");
  var dfTitlebar = r3.shadowRoot.querySelector("#dfTitlebar");
  // Create a new image element
  var img = document.createElement("img");
  img.src = './avatar.png';
  img.style.height = '40px';
  img.style.width = '40px';
  img.style.marginRight = '5px';
  img.style.marginLeft = '2px';
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
    justify-content: space-between;
    align-items: center;
    padding-left:0px;
  }
  
  #minimizeIcon {
    fill: white;
    fill: var(--df-messenger-button-titlebar-font-color);
    width: 24px;
    height: 24px;
    position: fixed;
    right: 54px;
    transform: rotate(180deg); /* Updated the rotation to 180 degrees */
  }
  /* Adjustments for smaller screens */
  @media screen and (max-width: 768px) {
    #dfTitlebar img {
      min-width: 24px;
      min-height: 24px;
    }
  
    #minimizeIcon {
      width: 24px;
      height: 24px;
    }
  
    #refresh_btn {
      height: 20px;
      width: 20px;
    }
  }
  @media screen and (min-width: 501px) {
        #minimizeIcon {
          visibility: visible !important;
        }
  }
  `;
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
          left: 2px ; 
          width: 50% ; 
          bottom:0;
          height: 100% !important;
          transform: translateX(-5%) translateY(35%) scale(0.5, 0.5);
          transition: transform 0.1s ease, opacity 0.1s ease-in, height 0s ease 0.2s;
          
    }
    @media only screen and (min-device-width: 741px) and (max-device-width: 1024px){
      div.chat-wrapper {
        width: 75% !important;
     } 
   }
    @media only screen and (max-width: 1024px) {
      div.chat-wrapper {
        height: calc(100% - 54px) !important;
        transform: translateX(-5%) translateY(35%) scale(0.5, 0.5);
        transition: transform 0.1s ease, opacity 0.1s ease-in, height 0s ease 0.2s;
     } 
   }
    @media only screen and (max-width: 741px) {
      div.chat-wrapper {
        width: 100%;
       
    } 
  }
  
  
  `;
  // Append the style element to the shadow root
  $r2.shadowRoot.appendChild(style);
}


// fuhcntion to make input box reponsive
function responsive_input_box(){
  var r1 = document.querySelector("df-messenger").shadowRoot.querySelector("df-messenger-chat").shadowRoot.querySelector("df-messenger-user-input");
  // Create a new style element
  if(window.innerWidth <= 741){
    r1.style.width = '100%';
  }
}


// function to make message box responsive
function responsive_message_box(){
  var r1 = document.querySelector("df-messenger");
  var r2 = r1.shadowRoot.querySelector("df-messenger-chat");
  var r3 = r2.shadowRoot.querySelector("df-message-list");
  if(window.innerWidth <= 741){
    r3.style.width = '100%';
  }
}

// function to make bot header responsive
function responsive_Bot_header(){
  var r1 = document.querySelector("df-messenger");
  var r2 = r1.shadowRoot.querySelector("df-messenger-chat");
  var r3 = r2.shadowRoot.querySelector("df-messenger-titlebar");
  if(window.innerWidth <= 741){
     r3.style.width = '100%';
   
  }
}

// main cutomization function that calls other cusum methods
function customizeUI(){
  setSizePosition();
  createMenuAndRefreshIcon();
  setAvatar();
  // setRefreshIcon();
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
      current_intent = response.response.queryResult.intent.displayName;
      if (botReply && flag){
          speakResponse(botReply);
          console.log('Bot Reply: ', botReply);
         
      }
      if (botReply.toLowerCase().includes("selena")){
        console.log("greetings received");
        setTimeout(message_clicked,0300);
      }
  }
});


// this function is called whenever dialogflow is created and attached to our website
document.addEventListener('df-messenger-loaded',function(event){
  document.querySelector('df-messenger').shadowRoot.getElementById('widgetIcon').addEventListener('click',function(event){
    if(user_closed_df){
      // once user has closed df we will create it again on the click of widgetIcon
      user_closed_df = false;
      // toggle the marker to convey that user has opened the df again after closing so we will create it again, 
      // and this time marker will be false so welcome intent will get triggered on creation and,
      // minimze button will not be clicked
      closeAndStartNewChat();
    }
  });
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
    speakResponseOld('');
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
        const grammarList = new webkitSpeechGrammarList();
        grammarList.addFromString("yes", 1);
        grammarList.addFromString("no", 1);
        if (recognition) {
          recognition.continuous = false;
          recognition.interimResults = false;
          recognition.onresult = (event) => {
              const userSpokenText = event.results[0][0].transcript;
              console.log('User Spoken Text:', userSpokenText);
              // Pass the user's spoken text to Dialogflow Messenger for processing
              if (userSpokenText.toLowerCase().includes('yes') || userSpokenText.toLowerCase().includes("no")){
              var uniqueWords = []
              console.log('yes/no ',userSpokenText);
              const words = userSpokenText.split(''); 
              for(const word of words){
                if(!uniqueWords.includes(word)){
                  uniqueWords.push(word);
                }
              }
              userSpokenText = uniqueWords.join('');
              console.log(userSpokenText);
            }
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
function speakResponseOld(text){
  try{
    if ('speechSynthesis' in window){
      const msg = new SpeechSynthesisUtterance();
      // Set the text to be spoken
      msg.text = text;
      // Uncomment the following line to set the voice of the speech (optional)
      msg.voice = speechSynthesis.getVoices().find(voice => voice.name === 'Microsoft Zira - English (United States)');
      // Uncomment the following lines to change the speech rate and pitch (optional)
      msg.rate = 0.95; // Speech rate (0.1 to 10)
      msg.pitch = 1.3; // Speech pitch (0 to 2)
      // Speak the text
      console.log(msg.voice);
      window.speechSynthesis.speak(msg);
    }else{
      console.log(window);
      console.log("Text-To-Speech not supported by your browser");
    } 
  }catch (error) {
    console.error('Error occured while speaking', error);
  }
}
//
// Function to handle the click event
// Function to send a message to Dialogflow Messenger

function forceAttachEventListener(anchor) {    
   if(anchor.text.toLowerCase().match('other')){
    console.log("multiple chip select enabled excluding others for ",current_intent);
    }else{
      // Clone the anchor element  
      const clonedAnchor = anchor.cloneNode(true);  
      // Attach our custom event listener to the cloned anchor    
      clonedAnchor.addEventListener('click', function(event) {  
        event.preventDefault(); // Prevent the default behavior        
        event.stopPropagation(); // Stop the event from propagating to other listeners        
        // Populate the message input bar with the chip's value        
        const inputField = document.querySelector('df-messenger').shadowRoot.querySelector('df-messenger-chat').shadowRoot.querySelector('df-messenger-user-input').shadowRoot.querySelector('input');  
        if (inputField.value == ''){
          inputField.value += event.target.textContent;   
        }else{
            if (inputField.value.includes(event.target.textContent)){
              var indexOf = inputField.value.indexOf(event.target.textContent);
              if(indexOf == 0){
                if(inputField.value.includes(event.target.textContent+',')){
                  inputField.value = inputField.value.replace(event.target.textContent+', ','');
                }else{
                  inputField.value = inputField.value.replace(event.target.textContent,'');
                }
              }else{
                inputField.value = inputField.value.replace(', '+event.target.textContent,'');
              }
              console.log(event.target.textContent+" removed!");
          }else{
            inputField.value += ', '+ event.target.textContent;   
          }
        }      
        // Simulate 'Enter' keypress to submit the user message
        const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', keyCode: 13, view: window, bubbles: true, cancelable: true });
        // Simulate 'input' event to trigger input event listeners (e.g., Dialogflow Messenger)
        const inputEvent = new Event('input', { bubbles: true, cancelable: true });
        inputField.dispatchEvent(inputEvent);
        inputField.dispatchEvent(enterEvent);
      });         
      anchor.parentNode.replaceChild(clonedAnchor, anchor);
  }   
}


// Function to add onclick to the anchor tags inside df-chips
function modifyDfChips(dfChip) {    
  const dfChipsWrapper = dfChip.shadowRoot.querySelector(".df-chips-wrapper"); 
  if (dfChipsWrapper) {        
    const anchorTags = dfChipsWrapper.querySelectorAll('a');        
    anchorTags.forEach(anchor => {            
      forceAttachEventListener(anchor);      
    });    
  }
}

setInterval(function() {    
 if (multi_chip_intents.includes(current_intent)){
    var r1 = document.querySelector("df-messenger");   
    var r2 = r1.shadowRoot.querySelector("df-messenger-chat");    
    var r3 = r2.shadowRoot.querySelector("df-message-list");
    var dfChips = r3.shadowRoot.querySelectorAll("df-chips");
    dfChips.forEach(modifyDfChips);
  }
}, 500); // Check every half second


// setInterval(function() {    
   
//   var r1 = document.querySelector("df-messenger");    
//   var r2 = r1.shadowRoot.querySelector("df-messenger-chat"); 
//   var r3 = r2.shadowRoot.querySelector("df-message-list"); 
//   var ele = r3.shadowRoot.querySelector("#messageList");
//   messages = ele.querySelectorAll(".message");    
//   messages.forEach(msg => {        
//     msg.style.fontSize = '16px';   
//   });
   
//  }, 500); // Check every half second

function initializeObserver() {    
  // Access the shadow roots    
  var r1 = document.querySelector("df-messenger");    
  var r2 = r1.shadowRoot.querySelector("df-messenger-chat");    
  var r3 = r2.shadowRoot.querySelector("df-message-list");    
  var ele = r3.shadowRoot.querySelector("#messageList");    
  // If any of the elements are not found, exit the function    
  if (!r1 || !r2 || !r3 || !ele) {        
    console.error("One or more elements not found. Exiting function.");        
    return;    
  }    
  // Define the observer    
  var observer = new MutationObserver(function(mutations) {        
    mutations.forEach(function(mutation) {            
      if (mutation.addedNodes.length) {                
        var messages = ele.querySelectorAll(".message");                
        messages.forEach(msg => {                    
          msg.style.fontSize = '17px';                
        });            
      }        
    });    
  });    
  // Start observing    
  observer.observe(ele, { childList: true, subtree: true });
}
  // Ensure the DOM is fully loaded before initializing the observer
document.addEventListener("DOMContentLoaded", function() {    
  setTimeout(initializeObserver, 2000);
});

function speakResponse(text){
  fetch('https://demo-2-braf.onrender.com/synthesize', {    
    method: 'POST',    
    headers: {       
      'Content-Type': 'application/json'    
    },    
    body: JSON.stringify({ text: text })})
    .then(response => response.json())
    .then(data => {   
       const audioData = Uint8Array.from(atob(data.audio), c => c.charCodeAt(0)); 
       const audioContext = new (window.AudioContext || window.webkitAudioContext)();   
       audioContext.decodeAudioData(audioData.buffer, function(buffer) {        
        const source = audioContext.createBufferSource();        
        source.buffer = buffer;        
        source.connect(audioContext.destination);        
        source.start(0);    
      });
    })
    .catch(error => {   
      speakResponseOld(text);
      console.error('Error occurred while fetching audio', error);
    });
}
