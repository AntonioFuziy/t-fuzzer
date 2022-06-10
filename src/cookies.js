const showCookiesForTab = (tabs) => {
  let tab = tabs.pop();
  let countCookies = 0;
  var gettingAllCookies = browser.cookies.getAll({
    url: tab.url
  });

  gettingAllCookies.then((cookies) => {
    var activeTabUrl = document.getElementById('header-title-cookies');
    var text = document.createTextNode("Cookies at: "+tab.title);
    var cookieList = document.getElementById('cookie-list');
    var numberOfCookies = document.getElementById('number-cookies');
    activeTabUrl.appendChild(text);

    if (cookies.length > 0) {
      for (let cookie of cookies) {
        let li = document.createElement("li");
        let content = document.createTextNode(cookie.name + ": "+ cookie.value);
        li.appendChild(content);
        cookieList.appendChild(li);
        countCookies++;
      }
      let cookiesText = document.createElement("p");
      let cookiesContent = document.createTextNode("Number of cookies: "+countCookies);
      cookiesText.appendChild(cookiesContent);
      numberOfCookies.appendChild(cookiesText);
    } else {
      let p = document.createElement("p");
      let content = document.createTextNode("No cookies in this tab.");
      let parent = cookieList.parentNode;

      p.appendChild(content);
      parent.appendChild(p);
    }

    var websiteSecurity = document.getElementById('cookies-security-status');
    var cookiesSecurity = document.getElementById('cookies-status');
    
    if(countCookies >= 200){
      websiteSecurity.style.color = "#F4364C";
      cookiesSecurity.setAttribute("value", "100");
    } else if(countCookies > 100 && countCookies < 200){
      websiteSecurity.style.color = "#FDB44E";
      cookiesSecurity.setAttribute("value", countCookies.toString());
    } else {
      cookiesSecurity.setAttribute("value", countCookies.toString());
    }
  });
}

function getActiveTab() {
  return browser.tabs.query({
    currentWindow: true, active: true
  });
}

getActiveTab().then(showCookiesForTab);