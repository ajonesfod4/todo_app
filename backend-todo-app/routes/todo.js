const express = require("express");
const router = express.Router();

// Sequelize User model
const List = require("../models/list");
const Task = require("../models/task");

//middleware
const verifyJWT = require("../middleware/verfiyJWT");

//* ############### to do list routes routes ###############
router.post("/createList", verifyJWT, async (req, res) => {
  List.create({
    listUserID: req.body.userId,
    name: req.body.name,
    color: req.body.color,
  });
  res.send("list created");
});

router.post("/lists", verifyJWT, async (req, res) => {
  const lists = await List.findAll({
    where: { listUserID: req.body.userId },
  });

  //format lists
  let listArr = [];
  for (let i = 0; i < lists.length; i++) {
    const listName = lists[i].dataValues.name;
    const listColor = lists[i].dataValues.color;
    listArr.push({ listName: listName, color: listColor });
  }

  res.send(listArr);
});

router.post("/listItems", verifyJWT, async (req, res) => {
  const lists = await List.findAll({
    attributes: ["listID", "name", "color"],
    where: { listUserID: req.body.userId },
  });

  //reformat the list objects to include an array for the tasks
  let listObjArr = [];
  for (let i = 0; i < lists.length; i++) {
    const listObj = {
      listID: lists[i].dataValues.listID,
      listName: lists[i].dataValues.name,
      color: lists[i].dataValues.color,
      tasks: [],
    };
    listObjArr.push(listObj);
  }

  //Get all of the tasks from a specific list and add them
  for (let i = 0; i < listObjArr.length; i++) {
    const tasks = await Task.findAll({
      attributes: ["description", "dueDate", "priority"],
      where: { listID: listObjArr[i].listID },
    });

    for (let j = 0; j < tasks.length; j++) {
      listObjArr[i].tasks.push(tasks[j].dataValues);
    }
  }

  res.send(listObjArr);
});

router.post("/addTask", verifyJWT, async (req, res) => {
  const listData = await List.findAll({
    attributes: ["listID"],
    where: { name: req.body.list },
  });

  try {
    Task.create({
      listID: listData[0].dataValues.listID,
      description: req.body.taskName,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      userID: req.body.userId,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }

  res.send("task created");
});

router.patch("/editList", verifyJWT, async (req, res) => {
  const list = await List.findOne({
    where: { name: req.body.oldName, listUserID: req.body.userId },
  });

  list
    .update({ name: req.body.newName, color: req.body.color })
    .then((res) => {
      list.save;
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(503);
    });

  res.send("list updated");
});

router.delete("/deleteList", verifyJWT, async (req, res) => {
  const listData = await List.findAll({
    attributes: ["listID", "name"],
    where: { name: req.query.listName },
  });

  try {
    //must be in the following order due to foreign key constraints
    await Task.destroy({ where: { listID: listData[0].dataValues.listID } });
    await List.destroy({ where: { name: listData[0].dataValues.name } });
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }

  res.send("list deleted");
});

router.delete("/deleteTask", verifyJWT, async (req, res) => {
  try {
    await Task.destroy({ where: { description: req.query.description } });
  } catch (err) {
    console.log(err);
    res.sendStatus(503);
  }
  res.send("task deleted");
});

module.exports = router;
