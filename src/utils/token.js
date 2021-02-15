let token = () => localStorage.getItem('token') || false;
let userToken = () => JSON.parse(atob(localStorage.getItem('token').split('.')[1])) || false;
export {token, userToken} 