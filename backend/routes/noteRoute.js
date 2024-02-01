const express = require("express");
const { createNote, deleteNote, getNotes, updateNote, searchNote } = require("../controllers/noteController");

const router = express.Router();


router.route("/new").post(createNote)
router.route("/:id").delete(deleteNote)
router.route('/').get(getNotes)
router.route("/:id").put(updateNote)


module.exports = router