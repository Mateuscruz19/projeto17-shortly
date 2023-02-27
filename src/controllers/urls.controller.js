import { nanoid } from "nanoid";
import { connectionDB } from "../database/db.js";


export async function urlConverter(req, res) {
    const { id } = res.locals.user;
    const { url } = req.body;

    const shortUrl = nanoid(8);

    try {
        await connectionDB.query(
          `
        INSERT INTO shortens(url, shorturl, userid)
        VALUES ($1, $2, $3)
      `,
          [url, shortUrl, id]
        );
    
        res.status(201).send({ id,shortUrl });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error.message);
      }
}

export async function getUserById(req, res) {
    const { id } = req.params;

    try {
      const shortUrlWithId = await connectionDB.query(`SELECT * FROM shortens WHERE id = $1`, [id]);
  
      if (shortUrlWithId.rowCount === 0) return res.sendStatus(404);
  
      const [url] = shortUrlWithId.rows;
  
      delete url.views;
      delete url.userId;
      delete url.createdAt;
      delete url.userid;
      delete url.createdat;  

      res.status(200).send(url);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error.message);
    }
}