import CoreDatamapper from "./core.datamapper.js";

export default class AnnouncementDatamapper extends CoreDatamapper {
  static tableName = 'announcement';


  static async highlight() {
    // Get random 8 announcements
    const result  = await this.client.query(`
      SELECT *
      FROM announcement_highlight;
    `);
    // Return result
    return result.rows;
  }

  static async searchAnnouncement(data) {
    const result = await this.client.query(
      'SELECT select_announcement_by_filters($1) AS result;',
      [data],
    );
    // Return result
    return result.rows[0].result;
  }

  static async findByAuthor(authorId) {
    const result = await this.client.query(
      `SELECT select_announcement_by_author($1) AS result;`,
      [authorId],
    );
    // Return results
    return result.rows[0].result;
  }
}
