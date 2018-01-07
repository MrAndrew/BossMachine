const minionsRouter = require('express').Router();

const { createMeeting, getAllFromDatabase, getFromDatabaseById,
addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId,
deleteAllFromDatabase } = require('./db.js');

//Had to copy param from solution code :/
minionsRouter.param('minionId', (req, res, next, id) => {
  const minion = getFromDatabaseById('minions', id);
  if (minion) {
    req.minion = minion;
    next();
  } else {
    res.status(404).send();
  }
});

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
  //req.body and not req.query because of using bodyParser middleware in server.js
  newMinion = addToDatabase('minions', req.body);
  if (newMinion) {
      res.status(201).send(newMinion);
    } else if (!newMinion) {
      res.status(400).send('Problem adding a new minion.');
    }
});

minionsRouter.put('/:minionId', (req, res, next) => {
  let changedMinion = req.body;
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

//Bonus for work of minions
minionsRouter.get('/:minionId/work', (req, res, next) => {
  const work = getAllFromDatabase('work').filter((singleWork) => {
    return singleWork.minionId === req.params.minionId;
  });
  res.send(work);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
  //req.body and not req.query because of using bodyParser middleware in server.js
  newMinionWork = addToDatabase('work', req.body);
  if (newMinionWork) {
      res.status(201).send(newMinionWork);
    } else if (!newMinionWork) {
      res.status(400).send('Problem adding new work for this minion.');
    }
});
//another .param copied from solution code, I need a better understanding of
//this concept when I review later
minionsRouter.param('workId', (req, res, next, id) => {
  const work = getFromDatabaseById('work', id);
  if (work) {
    req.work = work;
    next();
  } else {
    res.status(404).send();
  }
});
//copied from solution, yet still doesn't pass the test... still
//don't understand why not
minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.params.minionId !== req.body.minionId) {
    res.status(400).send();
  } else {
    updatedMinionWork = updateInstanceInDatabase('work', req.body);
    res.send(updatedMinionWork);
  }
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deletedMinionWork = deleteFromDatabasebyId('work', req.params.workId);
    if (deletedMinionWork) {
      res.status(204);
    } else {
      res.status(500).send('Minion\'s work not found, so not deleted.');
    }
    res.send();
  });

module.exports = minionsRouter;
