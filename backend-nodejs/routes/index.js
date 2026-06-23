const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/users", require("./user.routes"));
router.use("/cards", require("./card.routes"));
router.use("/saved-cards", require("./savedcard.routes"));

module.exports = router;
