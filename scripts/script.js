// Program: Code Louisville
// Quarter: Fall 2020
// Class: Front End Development
// Author: Joshua Ferrell
// Filename: script.js

 
// global variables referencing fieldset elements
var milesFieldset = document.getElementsByTagName("fieldset")[0];
var locationFieldset = document.getElementsByTagName("fieldset")[1];
var hikeTypeFieldset = document.getElementsByTagName("fieldset")[2];

// global variables referencing aside and its h3 and p elements
var messageType = document.getElementById("messageType");
var messageLocation = document.getElementById("messageLocation");
var messageBody = document.getElementById("messageBody");

// global referencing the value of miles text input element
var milesBox = document.forms[0].miles;
   

// clears all text from aside
function clearMessages() {

   messageBody.innerHTML = "";
   messageType.innerHTML = "";
   messageLocation.innerHTML = "";
}


// verify miles text box entry is a positive number
function verifyMiles() {

   messageBody.innerHTML = "";
   
   try {
       
	   if (milesBox.value <= 0) {
         
         throw "Please enter a number of miles greater than 0.";
         
	   } else if (milesBox.value > 0) {

         return milesBox.value;
      }
   }
    
   catch(message) {
      
      clearMessages();
      messageBody.innerHTML = message;
      milesBox.value = ""; // remove erroneous entry from input box
      return 0;
   }
}


// verify that location option is selected
function verifyLocation() {

  let isSoIn = document.getElementById("southernIndiana").checked; 
  let isLouisville = document.getElementById("louisville").checked;
  let isRRG = document.getElementById("redRiverGorge").checked;

  if (isSoIn || isLouisville || isRRG) {

     return true;

  } else {

     return false;
  }
}


// verify that a hikeType option is selected
function verifyHikeType() {

   let isPaved = document.getElementById("paved").checked;
   let isPartialPaved = document.getElementById("partialPaved").checked;
   let isUnpaved = document.getElementById("unpaved").checked;

   if (isPaved || isPartialPaved || isUnpaved) {
      
      return true;

   } else {

      return false; 
   }
}


// checks if all form fields have valid values 
function testFormCompleteness() {

   let mileage = verifyMiles();
   let isLocation = verifyLocation();
   let isHikeType = verifyHikeType();

   if (mileage > 0) {

      console.log(mileage);

      if (isLocation && isHikeType) {
       
         createRecommendation();
      }
   }
}


// writes message type to aside 
function writeMessageType() {

   messageType.innerHTML = "Type - ";

   let isPaved = document.getElementById("paved").checked;
   let isPartialPaved = document.getElementById("partialPaved").checked;
   let isUnpaved = document.getElementById("unpaved").checked;

   if (isPaved) { // add suffix to model name based on fuel choice
       
      messageType.innerHTML += "Paved";
   } 
    
   else if (isPartialPaved) {
       
      messageType.innerHTML += "Partially Paved";
   } 
    
   else if (isUnpaved) {
       
      messageType.innerHTML += "Unpaved";  
   }
}


// writes message location to aside
function writeMessageLocation() {

  messageLocation.innerHTML = "Location - ";

  let isSoIn = document.getElementById("southernIndiana").checked; 
  let isLouisville = document.getElementById("louisville").checked;
  let isRRG = document.getElementById("redRiverGorge").checked;

   if (isSoIn) { 
       
      messageLocation.innerHTML += "Southern Indiana";
   } 
    
   else if (isLouisville) {
       
      messageLocation.innerHTML += "Louisville";
   } 
    
   else if (isRRG) {
       
      messageLocation.innerHTML += "Red River Gorge";  
   }
}


// writes hike description to aside
function writeMessageBody() {

   // currenty placeholder text
   messageBody.innerHTML = "Placeholder text.  This will eventually the name of a hike and its mileage.";
}


// master function to write complete hike recommendation to aside
function createRecommendation() {

   writeMessageType();
   writeMessageLocation();
   writeMessageBody();
}


// create event listeners for all input elements
function createEventListeners() {
    
   milesBox.value = ""; // clear miles text box on page load
   milesBox.addEventListener("input", testFormCompleteness); 
   
   var locationBox;
    
   for (var i = 0; i < 3; i++) {
       
      locationBox = locationFieldset.getElementsByTagName("input")[i];
      locationBox.checked = false; 
          
      locationBox.addEventListener("click", testFormCompleteness); 
      
   }
   
   var hikeTypeBox;
    
   for (var i = 0; i < 3; i++) {
       
      hikeTypeBox = hikeTypeFieldset.getElementsByTagName("input")[i];
      hikeTypeBox.checked = false;   
          
      hikeTypeBox.addEventListener("click", testFormCompleteness); 
   }
}


// create event listener when page finishes loading
window.addEventListener("load", createEventListeners);