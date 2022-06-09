browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === "sessionStorageData"){
    sendResponse({
      data: Object.entries(sessionStorage)
    })
  } else if (request.method === "localStorageData"){
    sendResponse({
      data: Object.entries(localStorage)
    })
  } else if (request.method === "external"){
    sendResponse({
      data: urls
    });
  }
});