import { AnimalDatamapper } from '../datamappers/index.datamapper.js';

export default {
  async index(req, res){
    const animals = await AnimalDatamapper.findAll();
    res.status(200).json(animals);
  },
};
