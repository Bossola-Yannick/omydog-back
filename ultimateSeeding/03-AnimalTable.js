import CoreDatamapper from "../app/datamappers/core.datamapper.js";
import { getClient } from "../app/config/pg.client.js";

export default class SeedingDatamapper extends CoreDatamapper {
  static tableName = 'animal_type';

  static async add() {
    try {
      const result = await this.client.query(`
          INSERT INTO 
          "animal_type" ("label") 
          VALUES
            ('Chien'),
            ('Chat'),
            ('Oiseau'),
            ('Poisson'),
            ('Rongeur'),
            ('Reptile')
          RETURNING *`);

      console.log('Seeding completed:', result.rows);
    } catch (error) {
      console.error('Error during seeding:', error);
    } finally {
      process.exit();
    }
  }
}

const client = getClient();
await client.connect();

SeedingDatamapper.init({client});
SeedingDatamapper.add();
