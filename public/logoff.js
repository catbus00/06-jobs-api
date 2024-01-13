import { message, setToken } from './index.js';
import { showLoginRegister } from './loginRegister.js';

let jobsTable = null;
let jobsTableHeader = null;
let petsTable = null;
let petsTableHeader = null;

export const handleLogoff = () => {
  logoffRegisterDiv = document.getElementById('logoff-register');
  const logoff = document.getElementById('logoff');

  logoffRegisterDiv.addEventListener('click', (e) => {
    if (e.target === logoff) {
      setToken(null);
      message.textContent = 'You have been logged off.';
      petsTable.replaceChildren([petsTableHeader]);
      jobsTable.replaceChildren([jobsTableHeader]);
    }
    showLoginRegister();
  });
};
