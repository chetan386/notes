const express = require("express");
const { createNote, deleteNote, getNotes, updateNote } = require("../controllers/noteController");
const { verify } = require("../middleware/auth");
const { refreshToken } = require("../controllers/userController");

const router = express.Router();


router.route("/new").post(createNote)
router.route("/:id").delete(deleteNote)
router.route('/').get(verify,getNotes)
router.route("/:id").put(updateNote)



module.exports = router