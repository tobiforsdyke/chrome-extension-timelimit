// chrome.runtime.onInstalled.addListener(function() {
//   alert('Welcome');
// });

chrome.alarms.onAlarm.addListener(function(alarm) {
  alert("Time's up!");
  chrome.windows.getCurrent({}, function(window) {
    chrome.windows.remove(window.id, function(){});
  });
});
