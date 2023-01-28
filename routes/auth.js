// auth Routes

const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { validateField } = require("../middlewares/fieldValidator");
const {
  createUser,
  loginUser,
  revalidateToken,
} = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validateJWT");

router.post(
  "/new",
  [
    check("name", "Name is not valid").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("password", "Password needs to be longer").isLength({ min: 6 }),
    validateField,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password needs to be longer").isLength({ min: 6 }),
    validateField,
  ],
  loginUser
);

router.get("/renew", validateJWT, revalidateToken);

module.exports = router;
