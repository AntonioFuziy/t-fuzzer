const checkCookies = () => {
  let allCookies = document.cookie.split(';');
  let cookies = "";
  for (let i = 0; i < allCookies.length; i++) {
    cookies += allCookies[i] + "\n";
  }
  return cookies;
}
let allCookies = checkCookies()
console.log("Cookies: ", allCookies)
document.getElementById("cookies").innerHTML = allCookies;