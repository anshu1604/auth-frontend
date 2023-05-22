export class Cookies {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    write() {
        document.cookie = `${this.key}=${this.value}; path=/`;
    }

    read() {
        let browserCookies = document.cookie.split("=")[1];
        return browserCookies;
    }
}


