const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contacts');

router.get("/:id", contactsController.get);

router.get("/", contactsController.getAll);

module.exports = router;
