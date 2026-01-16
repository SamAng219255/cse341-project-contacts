const express = require("express");
const router = express.Router();
const contactsController = require("../controllers/contacts");

router.get("/contacts/:id", contactsController.get);

router.get("/contacts/", contactsController.getAll);

router.post("/contacts/", contactsController.create);

router.put("/contacts/:id", contactsController.update);

router.delete("/contacts/:id", contactsController.remove);

module.exports = router;
