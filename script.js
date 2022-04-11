//Important countdown settings
var savedHour = localStorage.getItem("savedHour")
var savedMinute = localStorage.getItem("savedMinute")
if(savedHour == null){
  savedHour = "00"
  localStorage.setItem("savedHour", "00") 
  console.log(localStorage.getItem("savedHour"))
}
if(savedMinute == null){
  savedMinute = "00"
  localStorage.setItem("savedMinute", "00")  
}

//Languages
function setLanguage(lang) {
  localStorage.setItem("lg", lang);
  var chosenLg = lang;
}
var chosenLg = localStorage.getItem("lg")
var saveText
var CDTTH
var language
const lgs = ["en", "pl"]

if (!lgs.includes(chosenLg)) {
  setLanguage("en")
  chosenLg = "en"
}
$.getJSON("lg/" + chosenLg + ".json", function (data) {
  var language = data;

  CDTTH = language["CDTTH"]
  saveText = language["save"]
  document.getElementById("save").innerHTML = CDTTH + savedHour + ":" + savedMinute

  for (var x in language) {
    if(x == "CDTTH") return;
    document.getElementsByName(x)[0].innerHTML = language[x]
  }
});

//Settings
const button = document.getElementById("save");
const timerStr = '<h2 id="timer" class="timerReplace">..............</h2>';
const settingsStr =
  '<input type="time" id="settingsInput" class="timerReplace" ';
var isOpen = false;

function saveSettings() {
  localStorage.setItem("savedHour", document.getElementById("settingsInput").value.slice(0, 2))
  localStorage.setItem("savedMinute", document.getElementById("settingsInput").value.slice(3, 5))
  window.location.reload(true);
}

function switchSelection(){
  const first = document.querySelector('#selected')
  const second = document.querySelector('#unselected')
  first.id = 'unselected'
  second.id = 'selected'
}

function switchSettings() {
  if(isOpen == true) return;
  $("h2.timerReplace").replaceWith(settingsStr + 'value=' + savedHour + ":" + savedMinute + '>')
  button.disabled = false
  button.innerHTML = saveText
  button.style.background = "#72a75b";
  isOpen = true
  switchSelection()
}
function switchHome() {
  if(isOpen == false) return;
  $("input.timerReplace").replaceWith(timerStr)
  button.disabled = true
  button.innerHTML = CDTTH + savedHour + ":" + savedMinute
  button.style.background = "black"
  isOpen = false
  switchSelection()
}
//Countdown
function checkIfTwo(number) {
  if (number < 10) return "0" + number
  return number
}

var x = setInterval(function () {
  if (isOpen == true) return null
  var now = new Date()
  var dateToCountdown = new Date()

  if (new Date().getHours() - savedHour > 0)
    dateToCountdown.setDate(new Date().getDate() + 1);
  if (
    new Date().getHours() - savedHour == 0 &&
    new Date().getMinutes() - savedMinute >= 0
  )
    dateToCountdown.setDate(new Date().getDate() + 1);

  dateToCountdown.setHours(savedHour);
  dateToCountdown.setMinutes(savedMinute);
  dateToCountdown.setSeconds(0);

  var distanceToCountdownDate = dateToCountdown - now;

  var hours = checkIfTwo(
    Math.floor(
      (distanceToCountdownDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
  );
  var minutes = checkIfTwo(
    Math.floor((distanceToCountdownDate % (1000 * 60 * 60)) / (1000 * 60))
  );
  var seconds = checkIfTwo(
    Math.floor((distanceToCountdownDate % (1000 * 60)) / 1000)
  );
  if (isOpen == true) return null;
  document.getElementById("timer").innerHTML = hours + ":" + minutes + ":" + seconds
}, 1000);
