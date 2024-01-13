const express = require('express');
const router = express.Router();

const {
  getAllPets,
  getPet,
  addPet,
  updatePet,
  deletePet,
} = require('../controllers/pets');

router
  .route('/')
  .post(addPet)
  .get(getAllPets);

router
  .route('/:id')
  .get(getPet)
  .delete(deletePet)
  .patch(updatePet);

module.exports = router;
