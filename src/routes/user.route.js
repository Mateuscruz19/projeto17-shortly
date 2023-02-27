import { Router } from "express";
import { whatRanking, whatUser } from "../controllers/user.controller.js";
import { userValidation } from "../middleware/user.middleware.js";

const router = Router();

router.get("/users/:id", userValidation, whatUser);
router.get("/ranking", whatRanking);

export default router;