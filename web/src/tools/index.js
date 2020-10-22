import jwtDecode from 'jwt-decode';

export const getAuthToken = () => localStorage.getItem('token');
export const setAuthToken = token => localStorage.setItem('token', token);
export const removeAuthToken = () => localStorage.removeItem('token');

export const isValidToken = () => {
  return new Promise((resolve, reject) => {
    // Check if token is present
    const currentTime = Date.now().valueOf() / 1000;
    const token = getAuthToken();

    if (!token) {
      console.log('>>>>>>>>>>>>> isValidToken :: false');
      reject();
      return;
    }

    const decodedToken = jwtDecode(token);

    // If token expired - remove it
    if (decodedToken.exp < currentTime) {
      removeAuthToken();
      reject();
      return;
    }

    resolve(token);
  });
};
