import { connectionDB } from "../database/db.js";


export async function userValidation(req, res, next) {

    const { authorization } = req.headers;

    if(!authorization){
      return res.status(401).send("Falhou");
    }

    const token = authorization?.replace("Bearer ", "");

    if(!token) {
       return res.status(401).send("Nao achou o token.");
    }

    try {
    const { rows: sessions } = await connectionDB.query( 
        `SELECT *  FROM sessions WHERE token = $1`,
    [token])

    const [session] = sessions;

    if (!session) {
      return res.status(401).send("Nao achou a sessão.");
    }

    const { rows: users } = await connectionDB.query(
        `SELECT * FROM users WHERE id = $1 `,
        [session.userId]
      );
      const [user] = users;
  
      if (!user) {
        return res.status(401).send("Nao achou o user.");
      }

        res.locals.user = user;

    next();
  } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

}