const getFingerprint = async (tabs) => {
  let tab = tabs.pop();

  var fingerprintExists = document.getElementById('fingerprint-exists');
  var fingerprintId = document.getElementById('fingerprint-id');

  const response = await browser.tabs.sendMessage(tab.id, {
    method: "fingerprintData"
  });

  var websiteSecurity = document.getElementById('website-security-status');
  var fingerprintSecurity = document.getElementById('fingerprint-status');

  var fingerprintData = response.data;

  if (fingerprintData) {
    fingerprintExists.innerHTML = "You are being fingerprinted";
    fingerprintId.innerHTML = "The fingerprinter is "+ fingerprintData;
  } else{
    fingerprintExists.innerHTML = "No one is fingerprint you";
    fingerprintId.innerHTML = "";
  }

  if(fingerprintData){
    websiteSecurity.innerHTML = "Website is Insecure";
    websiteSecurity.style.color = "red";
    fingerprintSecurity.style.color = "red";
    fingerprintSecurity.setAttribute("value", "0");
  } else {
    fingerprintSecurity.setAttribute("value", "99");
  }
}

function getActiveTab() {
  return browser.tabs.query({
    currentWindow: true, active: true
  });
}

getActiveTab().then(getFingerprint);