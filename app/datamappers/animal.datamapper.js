import CoreDatamapper from "./core.datamapper.js";

export default class UserDatamapper extends CoreDatamapper {
  static tableName = 'animal_type';

  static async findAll() {
    // Request
    const result  = await this.client.query(`
      SELECT "label" 
      FROM "${this.tableName}";
      `);

    // Return results
    return result.rows;
  }
};
