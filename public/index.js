let activeDiv = null;
export const setDiv = (newDiv) => {
  if (newDiv != activeDiv) {
    if (activeDiv) {
      activeDiv.style.display = 'none';
    }
    newDiv.style.display = 'block';
    activeDiv = newDiv;
  }
};
let activeDivPet = null;
export const setDivPet = (newDiv) => {
  if (newDiv != activeDivPet) {
    if (activeDivPet) {
      activeDivPet.style.display = 'none';
    }
    newDiv.style.display = 'block';
    activeDivPet = newDiv;
  }
};

export let inputEnabled = true;
export const enableInput = (state) => {
  inputEnabled = state;
};

export let token = null;
export const setToken = (value) => {
  token = value;
  if (value) {
    localStorage.setItem('token', value);
  } else {
    localStorage.removeItem('token');
  }
};

export let message = null;

import { showJobs, handleJobs } from './jobs.js';
import { showLoginRegister, handleLoginRegister } from './loginRegister.js';
import { handleLogin } from './login.js';
import { handleAddEdit } from './addEdit.js';
import { handleRegister } from './register.js';
import { showPets, handlePets } from './pets.js';
import { handleAddEditPets } from './addEditPets.js';

document.addEventListener('DOMContentLoaded', () => {
  token = localStorage.getItem('token');
  message = document.getElementById('message');
  handleLoginRegister();
  handleLogin();
  handleJobs();
  handlePets();
  handleRegister();
  handleAddEdit();
  handleAddEditPets();
  if (token) {
    showJobs();
    showPets();
  } else {
    showLoginRegister();
  }
});
