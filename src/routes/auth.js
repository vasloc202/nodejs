import { Router } from "express";
import { getAll, signin, signup } from "../controllers/auth.js";

const router = Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/users", getAll);

export default router;