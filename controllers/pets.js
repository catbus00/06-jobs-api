const Pet = require('../models/Pet');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors/');

const getAllPets = async (req, res) => {
  res.send('Get all pets');
};

const getPet = async (req, res) => {
  res.send('Get pet');
};

const addPet = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const pet = await Pet.create(req.body);
  res.status(StatusCodes.CREATED).json({ pet });
};

const updatePet = async (req, res) => {
  res.send('update pet');
};

const deletePet = async (req, res) => {
  res.send('delete pet');
};

module.exports = {
  getAllPets,
  getPet,
  addPet,
  updatePet,
  deletePet,
};
