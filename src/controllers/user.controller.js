import { connectionDB } from "../database/db.js";

export async function whatUser(req, res) {
    const { user } = res.locals;

    try {
      const visitResult = await connectionDB.query(
        `SELECT SUM(s."views") 
          FROM shortens s 
          WHERE s."userId" = $1`,
        [user.id]
      );
      const [visitCount] = visitResult.rows;
  
      const urlsResult = await connectionDB.query(
        `SELECT * FROM shortens s WHERE s."userId" = $1`,
        [user.id]
      );
      const userUrls = urlsResult.rows;
  
    return res.status(200).send({
        id: user.id,
        name: user.name,
        visitCount: visitCount.sum || 0,
        shortenedUrls: userUrls,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
}


export async function whatRanking(req, res) {

    try {
        const { rows } = await connectionDB.query(`
        SELECT 
          u.id, 
          u.name, 
          COUNT(s.id) as "linksCount", 
          COALESCE(SUM(s."views"), 0) as "visitCount"
        FROM users u
        LEFT JOIN shortens s ON s."userId" = u.id
        GROUP BY u.id
        ORDER BY "visitCount" DESC
        LIMIT 10
      `);
        res.status(200).send(rows);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
      }
}

