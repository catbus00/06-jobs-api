import {
  enableInput,
  inputEnabled,
  message,
  setDivPet,
  token,
} from './index.js';
import { showPets } from './pets.js';

let addEditDivPets = null;
let name = null;
let gender = null;
let color = null;
let age = null;
let addingPet = null;

export const handleAddEditPets = () => {
  addEditDivPets = document.getElementById('edit-pet');
  name = document.getElementById('pet-name');
  gender = document.getElementById('gender');
  color = document.getElementById('color');
  age = document.getElementById('age');
  addingPet = document.getElementById('adding-pet');
  const editCancel = document.getElementById('edit-cancel-pet');

  addEditDivPets.addEventListener('click', async (e) => {
    if (inputEnabled && e.target.nodeName === 'BUTTON') {
      if (e.target === addingPet) {
        enableInput(false);

        let method = 'POST';
        let url = '/api/v1/pets';

        if (addingPet.textContent === 'update') {
          method = 'PATCH';
          url = `/api/v1/pets/${addEditDivPets.dataset.id}`;
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name: name.value,
              gender: gender.value,
              color: color.value,
              age: age.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              // a 200 is expected for a successful update
              message.textContent = 'Your pet information was updated.';
            } else {
              // a 201 is expected for a successful create
              message.textContent = 'Your pet information was created.';
            }
            name.value = '';
            gender.value = '';
            color.value = '';
            age.value = '';
            showPets();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = 'A communication error occurred.';
        }

        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = '';
        showPets();
      }
    }
  });
};

export const deletePets = async (petId) => {
  try {
    enableInput(false);
    const response = await fetch(`/api/v1/pets/${petId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    await response.text();

    if (response.status === 200) {
      message.textContent = 'Your pet was deleted.';
    } else {
      // might happen if the list has been updated since last display
      message.textContent = 'Your pet entry was not found';
      console.error('Error:', err);
    }
  } catch (err) {
    message.textContent = 'A communications error has occurred.';
    console.error('Error:', err);
  } finally {
    enableInput(true);
    showPets();
  }
};

export const showAddEditPets = async (petId) => {
  if (!petId) {
    name.value = '';
    gender.value = '';
    color.value = '';
    age.value = '';
    addingPet.textContent = 'add';
    message.textContent = '';

    setDivPet(addEditDivPets);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/pets/${petId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        name.value = data.pet.name;
        gender.value = data.pet.gender;
        color.value = data.pet.color;
        age.value = data.pet.age;
        addingPet.textContent = 'update';
        message.textContent = '';
        addEditDivPets.dataset.id = petId;

        setDivPet(addEditDivPets);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = 'The entry for your pet was not found';
        showPets();
      }
    } catch (err) {
      console.log(err);
      message.textContent = 'A communications error has occurred.';
      showPets();
    }

    enableInput(true);
  }
};
