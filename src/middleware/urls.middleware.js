import { connectionDB } from "../database/db.js";
import { urlSchema } from "../models/url.schema.js"


export async function urlValidation(req, res, next) {

    const { authorization } = req.headers;

    if(!authorization){
      return res.status(401).send("Falhou");
    }
    const token = authorization?.replace("Bearer ", "");

    const {error} = urlSchema.validate(req.body, {abortEarly: false});

    if (error) {
      return res.status(422).send(error.details.map(detail => detail.message));
    }

    if(!token) {
       return res.status(401)
    }

    try {
    const { rows: sessions } = await connectionDB.query( 
        `SELECT *  FROM sessions WHERE token = $1`,
    [token])

    const [session] = sessions;

    if (!session) {
      return res.status(401);
    }

    const { rows: users } = await connectionDB.query(
        `SELECT * FROM users WHERE id = $1 `,
        [session.userId]
      );
      const [user] = users;
  
      if (!user) {
        return res.status(401);
      }

        res.locals.user = user;

    next();
  } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}