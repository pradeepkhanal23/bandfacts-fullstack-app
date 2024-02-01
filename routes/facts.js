//importing core express
const express = require("express");

//this is creating an instance of an Express router. In Express.js, a router is a middleware that helps in modularizing and organizing route handlers for specific paths or groups of related routes. It's a way to group route-handling logic together, making your code more organized and maintainable.
const router = express.Router();

//importing the fact schema create in the models
const Fact = require("../models/facts");

// -------------------------------GET REquest--------------------------------------

// get all facts
router.get("/", async (req, res) => {
  try {
    /**
     * TODO: here find() method in Mongoose allows you to specify a query object as a parameter to filter the results. If you pass an empty object {}, it essentially means you are not applying any specific filtering criteria, and you want to retrieve all documents in the collection.So make sure you pass that empty object {} inside the find method like this --- facts = await Fact.find({})----;
     */
    const facts = await Fact.find({});
    res.json({
      success: true,
      data: facts,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      error: "Something went wrong",
    });
  }
});

//get single idea
router.get("/:id", async (req, res) => {
  try {
    const fact = await Fact.findById(req.params.id);
    res.send({
      success: true,
      data: fact,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      error: "Couldn't locate the fact by the given ID",
    });
  }
});

// -----------------------------POST REquest----------------------------

//add an idea
router.post("/", async (req, res) => {
  const fact = new Fact({
    username: req.body.username,
    text: req.body.text,
    tag: req.body.tag,
    date: Date.now(),
  });

  try {
    await fact.save();
    res.json({
      success: true,
      data: fact,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      error: "Something went wrong",
    });
  }
});

// -----------------------------PUT REquest----------------------------

//update an idea
// router.put("/:id", (req, res) => {
//   const idToUpdate = +req.params.id;

//   const idea = facts.find((idea) => {
//     return idea.id === idToUpdate;
//   });

//   if (idea) {
//     res.send({
//       success: true,
//       data: {
//         ...idea,
//         text: req.body.text || idea.text,
//         tag: req.body.tag || idea.tag,
//         date: Date.now(),
//       },
//     });
//   }

//   res.status(404).json({
//     success: false,
//     error: "Idea not found",
//   });
// });

//delete an idea
// router.delete("/:id", (req, res) => {
//   const idToDelete = +req.params.id;

//   // Find the index of the idea to delete
//   const indexToDelete = facts.findIndex((idea) => idea.id === idToDelete);

//   if (indexToDelete === -1) {
//     // Idea with the given ID not found
//     return res.status(404).json({ error: "Idea not found" });
//   }

//   // Perform the deletion
//   const deletedIdea = facts.splice(indexToDelete, 1);

//   res.json({ message: "Idea deleted successfully", deletedIdea });

//   console.log(indexToDelete);
// });

//exporting the router as we are using this in the main app to connect it with its associated files based on the user hit url path
module.exports = router;
