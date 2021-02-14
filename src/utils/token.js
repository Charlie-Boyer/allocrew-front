const token = localStorage.getItem('token') || false;
const userToken = token ? JSON.parse(atob(token.split('.')[1])) : false;
export {token, userToken} 