import { Router } from "express";
import { urlValidation } from "../middleware/urls.middleware.js"
import { urlConverter } from "../controllers/urls.controller.js"
import { getUserById } from "../controllers/urls.controller.js"

const router = Router();

router.post("/urls/shorten" ,urlValidation,urlConverter);
router.get("/urls/:id", getUserById);
router.delete("/urls/:id");
router.get("/urls/open/:shortUrl");

export default router;
