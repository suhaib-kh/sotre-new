/**
 * Fake Fetching of single item
 * @param {string} email
 * @param {string} password
 */
const loginUser = (email, password) => {
  return fetch('https://6385ec80beaa6458266d44f1.mockapi.io/nemo/users')
    .then(async response => {
      const users = await response.json();
      // Usually this code is on the BE side
      return users.find(user => user.email === email && user.password === password) || null;
    })
    .catch(error => {
      console.error(error);
      return null;
    });
};

export {
  loginUser
};