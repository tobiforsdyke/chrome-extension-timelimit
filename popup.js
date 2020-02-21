let startSession = document.getElementById('startSession');
let removeSession = document.getElementById('removeSession');
let getSessionInfo = document.getElementById('getSessionInfo');

let sessionPeriodInput = document.getElementById('sessionPeriodInput');

// chrome.browserAction.setBadgeText({text: 'Off'});

startSession.addEventListener('click', function(element){
  let sessionValue = parseInt(sessionPeriodInput.value);
  if(sessionValue <= 0){
    alert('The number of minutes must be greater than 0.');
  } else if(sessionValue > 120){
    alert('The number must be less than 2 hours (120 minutes).');
  } else {
    chrome.alarms.create("session1",{delayInMinutes:sessionValue});
    alert('Your session starts now!');
    chrome.browserAction.setBadgeText({text: 'On'});
  }
});

getSessionInfo.addEventListener('click', function(element){
  chrome.alarms.get("session1", function(alarm){
    var alarmTime = new Date(alarm.scheduledTime);
    var timeNow = new Date(Date.now());
    alert("You have " +diffInMinutes(alarmTime,timeNow)+ " minutes remaining...");
  });
});

function diffInMinutes(date1,date2){
  var timeDiff = Math.abs(date1.getTime() - date2.getTime());
  var diffInMinutes = Math.floor(timeDiff / (1000 * 60));
  return diffInMinutes;
}

removeSession.addEventListener('click', function(element){
  chrome.alarms.clear("session1", function(){
    alert('You can now browse the internet freely without a time limit.');
    chrome.browserAction.setBadgeText({text: 'Off'});
  });
});
