const minionsRouter = require('express').Router({mergeParams: true})

const { createMeeting, getAllFromDatabase, getFromDatabaseById,
addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId,
deleteAllFromDatabase } = require('./db.js');

minionsRouter.get('/', (req, res, next) => {
  let minions = getAllFromDatabase('minions');
  res.send(minions);
});

minionsRouter.get('/:minionId', (req, res, next) => {
  let minion = getFromDatabaseById('minions', req.params.minionId);
  if (minion) {
    res.send(minion);
  } else if (!minion) {
    res.status(404).send('Minion not found.');
  }
});

minionsRouter.post('/', (req, res, next) => {
  const recievedMinion = addToDatabase('minions', req.query);
  if (recievedMinion) {
      res.status(201).send(newMinion);
    } else if (!newMinion) {
      res.status(400).send('Problem adding a new minion.');
    }
});

minionsRouter.put('/:minionId', (req, res, next) => {
  let changedMinion = req.query;
  let currentMinion = getFromDatabaseById('minions', req.params.minionId);
  const updatedMinion = updateInstanceInDatabase('minions', changedMinion);
  if (updatedMinion) {
    res.send(updatedMinion);
  } else if (!updatedMinion) {
    res.status(404).send('This minion does not exist.');
  }
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    let deletedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deletedMinion) {
      res.status(204).send();
    } else if (!deletedMinion) {
      res.status(404).send('Minion not found, so not deleted.');
    }
  });

module.exports = minionsRouter;
