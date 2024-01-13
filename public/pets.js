import { inputEnabled, message, token, enableInput } from './index.js';
import { showAddEditPets } from './addEditPets.js';

let petsDiv = null;
let petsTable = null;
let petsTableHeader = null;

export const handlePets = () => {
  petsDiv = document.getElementById('pets');
  const addPet = document.getElementById('add-pet');
  petsTable = document.getElementById('pets-table');
  petsTableHeader = document.getElementById('pets-table-header');

  petsDiv.addEventListener('click', (e) => {
    if (inputEnabled && e.target.nodeName === 'BUTTON') {
      showAddEditPets(null);
    } else if (e.target.classList.contains('editButton')) {
      message.textContent = '';
      showAddEdit(e.target.dataset.id);
    } else if (e.target.classList.contains('deleteButton')) {
      message.textContent = '';
      deleteJobs(e.target.dataset.id);
    }
  });
};

export const showPets = async () => {
  try {
    enableInput(false);

    const response = await fetch('/api/v1/pets', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    let children = [petsTableHeader];

    if (response.status === 200) {
      if (data.count === 0) {
        petsTable.replaceChildren(...children); // clear this for safety
      } else {
        for (let i = 0; i < data.pets.length; i++) {
          let rowEntry = document.createElement('tr');

          let editButton = `<td><button type="button" class="editButton" data-id=${data.pets[i]._id}>edit</button></td>`;
          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.pets[i]._id}>delete</button></td>`;
          let rowHTML = `
                <td>${data.pets[i].name}</td>
                <td>${data.pets[i].gender}</td>
                <td>${data.pets[i].color}</td>
                <td>${data.pets[i].age}</td>
                <div>${editButton}${deleteButton}</div>`;

          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        petsTable.replaceChildren(...children);
      }
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = 'A communication error occurred.';
  }
  enableInput(true);
};
