import { UserDatamapper } from '../datamappers/index.datamapper.js';

export default {
  async index(req, res){
    const departments = await UserDatamapper.findAllDepartments();
    res.status(200).json(departments);
  },
};
