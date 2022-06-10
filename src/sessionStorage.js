const showAllSessionStorage = async (tabs) => {
  let tab = tabs.pop();
  var listHTML = document.getElementById('session-storage-list');
  var sizeHTML = document.getElementById('size-session-storage');
  let sessionStorageLength = 0;

  const response = await browser.tabs.sendMessage(tab.id, { 
    method: "sessionStorageData" 
  });

  var websiteSecurity = document.getElementById('session-storage-security-status');
  var sessionStorageSecurity = document.getElementById('session-storage-status');

  if (response.data.length > 0) {
    for (let sessionStorageItem of response.data) {
      if (sessionStorageItem) {
        sessionStorageLength++;
        let li = document.createElement("li");
        let content = document.createTextNode(sessionStorageItem);
        li.appendChild(content);
        listHTML.appendChild(li);
      }
    }
    let sizeContent = document.createTextNode("Number of items on Session Storage: " + sessionStorageLength);
    sizeHTML.appendChild(sizeContent);

    if(sessionStorageLength > 20){
      websiteSecurity.style.color = "#F4364C";
      sessionStorageSecurity.setAttribute("value", "20");
    } else if (sessionStorageLength > 10 && sessionStorageLength < 20){
      websiteSecurity.style.color = "#FDB44E";
      sessionStorageSecurity.setAttribute("value", sessionStorageLength.toString());
    } else {
      sessionStorageSecurity.setAttribute("value", sessionStorageLength.toString());
    }
  } else {
    let noSessionStorageTag = document.createElement("h4");
    let noSessionStorageData = document.createTextNode("No session storage data in this tab.");

    noSessionStorageTag.appendChild(noSessionStorageData);
    listHTML.appendChild(noSessionStorageTag);
  }
}
  
function getActiveTab() {
  return browser.tabs.query({
    currentWindow: true, active: true
  });
}

getActiveTab().then(showAllSessionStorage);