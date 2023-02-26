import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { signInBodyValidation, userSchemaValidation} from "../middleware/auth.middleware.js";

const router = Router();


router.post("/signup", userSchemaValidation, signUp);
router.post("/signin", signInBodyValidation, signIn);


export default router;