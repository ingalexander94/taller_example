export class CustomStorage {
  static get language() {
    return localStorage.getItem("language") || "es";
  }

  static set language(language: string) {
    localStorage.setItem("language", language);
  }

  static get token() {
    return localStorage.getItem("x-auth-token") || "";
  }

  static set token(token: string) {
    localStorage.setItem("x-auth-token", token);
  }

  static get remember() {
    return localStorage.getItem("x-remember") || "0";
  }

  static set remember(remember: string) {
    localStorage.setItem("x-remember", remember);
  }

  static get data() {
    return localStorage.getItem("x-data") || "";
  }

  static set data(data: string) {
    localStorage.setItem("x-data", data);
  }

  static removeToken() {
    localStorage.removeItem("x-auth-token");
  }

  static removeData() {
    localStorage.removeItem("x-data");
  }

  static removeRemember() {
    localStorage.removeItem("x-remember");
  }

  static getData() {
    const data = this.data ? JSON.parse(this.data) : ["", ""];
    return data;
  }
}
