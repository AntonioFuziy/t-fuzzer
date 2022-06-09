const showAllLocalStorage = async (tabs) => {
  let tab = tabs.pop();
  var listHTML = document.getElementById('local-storage-list');
  var sizeHTML = document.getElementById('size-local-storage');
  let localStorageLength = 0;

  const response = await browser.tabs.sendMessage(tab.id, { method: "localStorageData" })

  var websiteSecurity = document.getElementById('website-security-status');
  var localStorageSecurity = document.getElementById('local-storage-status');

  if (response.data.length > 0) {
    for (let localStorageItem of response.data) {
      if (localStorageItem) {
        localStorageLength++;
        let li = document.createElement("li");
        let content = document.createTextNode(localStorageItem);
        li.appendChild(content);
        listHTML.appendChild(li);
      }
    }
    let sizeContent = document.createTextNode("Number of items on Local Storage: " + localStorageLength);
    sizeHTML.appendChild(sizeContent);
    
    if(localStorageLength > 10){
      websiteSecurity.innerHTML = "Website is Insecure";
      websiteSecurity.style.color = "red";
      localStorageSecurity.style.color = "red";
      localStorageSecurity.setAttribute("value", "10");
    } else {
      localStorageSecurity.setAttribute("value", "100");
    }

  } else {
    let noLocalStorageTag = document.createElement("h4");
    let noLocalStorageData = document.createTextNode("No local storage data in this tab.");

    noLocalStorageTag.appendChild(noLocalStorageData);
    listHTML.appendChild(noLocalStorageTag);
    localStorageSecurity.setAttribute("value", "100");
  }
}
  
function getActiveTab() {
  return browser.tabs.query({
    currentWindow: true, active: true
  });
}

getActiveTab().then(showAllLocalStorage);