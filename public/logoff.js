import { message, setToken } from './index.js';
import { showLoginRegister } from './loginRegister.js';

let logoffDiv = null;

export const handleLogoff = () => {
  logoffDiv = document.getElementById('logoff-div');
  const logoff = document.getElementById('logoff');

  logoff.addEventListener('click', (e) => {
    setToken(null);
    message.textContent = 'You have been logged off.';
    showLoginRegister();
  });
};

export const showLogoff = () => {
  logoffDiv.style.display = 'block';
};

export const hideLogoff = () => {
  logoffDiv.style.display = 'none';
};
