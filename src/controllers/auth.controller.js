import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { connectionDB } from "../database/db.js";

export async function signUp(req, res) {
    const { name, email, password, confirmPassword } = res.locals.user;

    if (password !== confirmPassword) {
        res.status(422).send("Senhas diferentes")
    }
    
    const passwordHash = bcrypt.hashSync(password, 10);

    try {
      await connectionDB.query(
        "INSERT INTO users (email,password,name) VALUES ($1, $2, $3)",
        [email, passwordHash, name]
      );
  
     return res.sendStatus(201);
    } catch (err) {
     return res.status(422).send(err.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const { rows: users } = await connectionDB.query(
            `SELECT * FROM users WHERE email = $1 `,
            [email]
        );
        const [user] = users;

        if (!user) {
            return res.sendStatus(401);
        }

        if (bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            await connectionDB.query(
            `
        INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
            [token, user.id]
            );
           return res.status(200).send({token})
        }  

    return res.status(401);
    } catch (error) {
        res.status(401).send(error.message);
    }
       
}