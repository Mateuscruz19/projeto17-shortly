import { userSchema } from "../models/auth.schema.js";
import bcrypt from "bcrypt";
import { connectionDB } from "../database/db.js";

export async function userSchemaValidation(req, res, next) {
    const user = req.body;

    const { error } = userSchema.validate(user, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
  
    const emailExists = await connectionDB.query("SELECT * FROM users WHERE email=$1",[user.email]);
  
    if (emailExists.rowCount > 0) {
        return res.sendStatus(409);
      }

    res.locals.user = user;

    next();
}

export async function signInBodyValidation(req, res, next) {


    next();
}