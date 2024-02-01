import { jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = jwtDecode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired, and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      return true;
    }
    // If the token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  login(idToken, username, callback) {
    localStorage.setItem('token', idToken);
    localStorage.setItem('username', username); 
    if (callback && typeof callback === 'function') {
      callback();
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }
}

export default new AuthService();
