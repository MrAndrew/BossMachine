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
  let allMinionWork = getAllFromDatabase('work');
  let minionId = req.params.minionId;
  function findMinionWork(work) {
    return work === minionId;
  };
  minionWorkIndex = allMinionWork.findIndex(findMinionWork);
  minionWork = allMinionWork.indexOf(minionWorkIndex);
  if (minionWork) {
    res.status(200).send(minionWork);
  } else if (!minionWork) {
    res.status(404).send('Minion\'s work not found.');
  }
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

minionsRouter.put('/:minionId/work:workId', (req, res, next) => {
  let changedMinionWork = req.body;
  const updatedMinionWork = updateInstanceInDatabase('work', changedMinionWork);
  if (updatedMinionWork) {
    res.send(updatedMinionWork);
  } else if (!updatedMinionWork) {
    res.status(404).send('This minion\'s work does not exist.');
  }
});

minionsRouter.delete('/:minionId/work:workId', (req, res, next) => {
    let deletedMinionWork = deleteFromDatabasebyId('work', req.params.minionId);
    if (deletedMinionWork) {
      res.status(204).send();
    } else if (!deletedMinionWork) {
      res.status(404).send('Minion\'s work not found, so not deleted.');
    }
  });

module.exports = minionsRouter;
