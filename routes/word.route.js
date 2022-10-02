const express = require("express");
const router = express.Router();

// import word model
const Word = require("../models/word.model");

//import helper -formatter
const errFormat = require("../helper/errorFormater");

//get route
router.get("/", async (req, res) => {
  try {
    const word = await Word.find({ sort: [["date", "desc"]] });
    res.send(word);
  } catch (err) {
    return res.status(500).send(err);
  }
});

//post route
router.post("/", async (req, res) => {
  const word = new Word({
    word: req.body.word,
  });
  try {
    const result = await word.save();
    // res.redirect("/");
    res.send(result);
  } catch (e) {
    if (e.code === 11000) {
      return res.json({ word: "Word is already exist!" });
    }
    res.send(errFormat(e.message));
  }
});

module.exports = router;
