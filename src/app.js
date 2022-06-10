const getAllExternalLinks = () => {
  var allExternalLinks = Array.prototype.map.call(
    document.querySelectorAll(
      "link, img, video, audio,script, iframe, source, embed"
    ),
    (HTMLtag) => { 
      return HTMLtag.href || HTMLtag.src; 
    }
  )

  const data = {
    links: allExternalLinks,
    numberOfLinks: allExternalLinks.length
  }

  return data;
} 

const getFingerprint = () => {
  const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
    .then(FingerprintJS => FingerprintJS.load()
  )
  fpPromise
    .then(fp => fp.get())
    .then(result => {
      const visitorId = result.visitorId;
      let visitorIdElement = document.getElementById('teste');
      visitorIdElement.innerHTML = visitorId;
      if(visitorId){
        return visitorId;
      } else {
        return null;
      }
    }
  )
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.method) {
    case "sessionStorageData":
      sendResponse({ 
        data: Object.entries(sessionStorage) 
      });
      break;
    case "localStorageData":
      sendResponse({ 
        data: Object.entries(localStorage) 
      });
      break;
    case "thirdPartyDomains":
      sendResponse({ 
        data: getAllExternalLinks() 
      });
      break;
    case "fingerprintData":
      sendResponse({ 
        data: getFingerprint() 
      });
      break;
    default:
      sendResponse({ 
        data: null 
      });
  }
});