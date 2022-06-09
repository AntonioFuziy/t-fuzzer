const getAdBlocker = () => {
  let fakeAd = document.createElement("div");
  fakeAd.className = 
  "textads banner-ads banner_ads ad-unit ad-zone ad-space adsbox"
      
  fakeAd.style.height = "1px"
    
  document.body.appendChild(fakeAd)
    
  let x_width = fakeAd.offsetHeight;
  let msg = document.getElementById("adblocker-alert")
      
  if(x_width){
    msg.innerHTML = "AdBlocker is disabled"
  }else{
    msg.innerHTML = "AdBlocker is enabled"
  }
}

function getActiveTab() {
  return browser.tabs.query({
    currentWindow: true, active: true
  });
}
  
getActiveTab().then(getAdBlocker);