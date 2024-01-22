import { setDiv } from './index.js';
import { showJobs } from './jobs.js';
import { showLogoff } from './logoff.js';
import { showPets } from './pets.js';

let listingDiv = null;

export const handleListing = () => {
  listingDiv = document.getElementById('listing');
};

export const showListing = async () => {
  showPets();
  showJobs();
  showLogoff();
  setDiv(listingDiv);
};
