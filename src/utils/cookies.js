export const setCookies = (cookieName, cookieProp) => {
    let newCookie = `${cookieName}=${cookieProp}; path="/"; domain=".udtateer.club"` ;
    document.cookie = newCookie;
}


