import { Router } from "express";
import { urlValidation } from "../middleware/urls.middleware.js"
import { getUserById,showShortUrl,urlConverter,deleteUrl } from "../controllers/urls.controller.js"
import { userValidation } from "../middleware/user.middleware.js"

const router = Router();

router.post("/urls/shorten" ,urlValidation,urlConverter);
router.get("/urls/:id", getUserById);
router.get("/urls/open/:shortUrl",showShortUrl);
router.delete("/urls/:id", userValidation,deleteUrl);


export default router;
