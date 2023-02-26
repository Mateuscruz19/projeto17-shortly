import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
import { connectionDB } from "../database/db.js";

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = res.locals.user;

    if (password !== confirmPassword) {
        res.status(409).send("Senhas diferentes")
    }
    
    const passwordHash = bcrypt.hashSync(password, 10);

    try {
      await connectionDB.query(
        "INSERT INTO users (email,password,name) VALUES ($1, $2, $3)",
        [email, passwordHash, name]
      );
  
      res.sendStatus(201);
    } catch (err) {
      res.status(422).send(err.message);
    }
}

export async function signIn(req, res) {


}