export default class CoreDatamapper {

  static tableName = null;

  static init(config) {
    this.client = config.client;
  }

  static async findAll() {
    const result  = await this.client.query(`SELECT * FROM "${this.tableName}";`);
    return result.rows;
  }

  static async findByPk(id){
    const result = await this.client.query(
      `SELECT select_${this.tableName}_by_pk($1) AS result`,
      [id],
    );
    // Return result
    return result.rows[0].result;
  }

  static async create(data, id){
    // Select the right sql insert function based on the input type
    if(this.tableName === 'user'){
      // Create user
      await this.client.query(
        `SELECT insert_${this.tableName}($1::json);`,
        [data],
      );
    } else if(this.tableName === 'announcement'){
      // Create announcement
      const result = await this.client.query(
        `SELECT insert_announcement($1::int, $2::json);`,
        [id, data],
      );
      // Return the new announcement's id
      return result.rows[0].insert_announcement;
    } else if(this.tableName === 'announcement_animal_type'){
      // Create annoucement_animal_type
      await this.client.query(
        `SELECT insert_announcement_animal_type($1::int, $2::text)`,
        [id, data],
      );
    } else {
      // If table name doesn't match with insert function
      throw new Error('Invalid table name');
    }
  }

  static async update(id, data) {
    const result = await this.client.query(
      `SELECT update_${this.tableName}($1::int, $2::json) AS result`,
      [id, data],
    );
    // Return updated data
    return result.rows[0].result;
  }

  static async delete(id) {
    await this.client.query(
      `SELECT delete_${this.tableName}($1::int);`,
      [id],
    );
  }
};
