const setThirdPartyDomains = async (tabs) => {
  let tab = tabs.pop();
  var thirdPartyDomainsList = document.getElementById('third-party-list');

  const response = await browser.tabs.sendMessage(tab.id, {
    method: "thirdPartyDomains"
  });
  
  var thirdPartyDomains = response.data.links;
  var numberOfLinks = response.data.numberOfLinks;

  var sizeLinks = document.getElementById("size-third-party");
  var sizeLinksText = document.createTextNode("Number of external links: "+ numberOfLinks);
  sizeLinks.appendChild(sizeLinksText);

  thirdPartyDomains.map(domain => {
    var li = document.createElement('li');
    li.innerText = domain;
    thirdPartyDomainsList.appendChild(li);
  });
}

function getActiveTab() {
  return browser.tabs.query({
    currentWindow: true, active: true
  });
}

getActiveTab().then(setThirdPartyDomains);