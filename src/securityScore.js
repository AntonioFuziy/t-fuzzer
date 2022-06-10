const calculateScore = () => {
  var websiteSecurity = document.getElementById('website-security-status');
  var scoreTag = document.getElementById("website-score");
  var cookiesData = document.getElementById('cookies-status').getAttribute('value');
  var localStorageData = document.getElementById('local-storage-status').getAttribute('value');
  var sessionStorageData = document.getElementById('session-storage-status').getAttribute('value');
  var fingerprintData = document.getElementById('fingerprint-status').getAttribute('value');

  var cookiesScore = parseInt(cookiesData);
  var localStorageScore = parseInt(localStorageData);
  var sessionStorageScore = parseInt(sessionStorageData);
  var fingerprintScore = parseInt(fingerprintData);

  var scoreProgressBar = document.getElementById('score-progress-bar');

  var score = cookiesScore + localStorageScore + sessionStorageScore + fingerprintScore;
  scoreTag.innerHTML = "Website score: " + score;
  
  if(score > 250){
    websiteSecurity.innerHTML = "Website is Insecure";
    websiteSecurity.style.color = "#F4364C";
    scoreProgressBar.setAttribute("value", score);
  }
  else if(score <= 250 && score > 150){
    websiteSecurity.innerHTML = "Website is Suspect";
    websiteSecurity.style.color = "#FDB44E";
    scoreProgressBar.setAttribute("value", score);
  }
  else{
    websiteSecurity.innerHTML = "Website is Secure";
    websiteSecurity.style.color = "#90ee90";
    scoreProgressBar.setAttribute("value", score);
  }
}

function getActiveTab() {
  return browser.tabs.query({
    currentWindow: true, active: true
  });
}

setTimeout(() => {
  getActiveTab().then(calculateScore);
}, 100);