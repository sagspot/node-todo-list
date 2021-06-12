const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const list = require('../../list');

router.get('/', (req, res) => res.json(list));

// POST
router.post('/', (req, res) => {
  const newItem = {
    id: uuid.v4(),
    item: req.body.item,
    status: 'pending',
  };

  if (!newItem.item) {
    return res.status(400).json({ msg: 'Please fill in all details' });
  }
  list.push(newItem);
  res.redirect('/');
});

// PUT
router.put('/:id', (req, res) => {
  const found = list.some((listItem) => listItem.id == req.params.id);

  if (found) {
    const updateItem = req.body;

    list.forEach((listItem) => {
      if (listItem.id == req.params.id) {
        listItem.item = req.body.item ? req.body.item : listItem.item;
        res.json(list);
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `No item with the ID of ${req.params.id} found` });
  }
});

// DELETE
router.delete('/:id', (req, res) => {
  const found = list.some((listItem) => listItem.id == req.params.id);

  if (found) {
    list.filter((item, i) => {
      if (item.id == req.params.id) {
        index = i;
        return i;
      }
    });

    list.splice(index, 1);
    // res.redirect('/');
    res.json(list);
  } else {
    res
      .status(400)
      .json({ msg: `No item with the ID of ${req.params.id} found` });
  }
});

module.exports = router;
