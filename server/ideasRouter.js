const ideasRouter = require('express').Router({mergeParams: true})

const { createMeeting, getAllFromDatabase, getFromDatabaseById,
addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId,
deleteAllFromDatabase } = require('./db.js');

ideasRouter.get('/', (req, res, next) => {
  let ideas = getAllFromDatabase('ideas');
  res.send(ideas);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  let idea = getFromDatabaseById('ideas', Number(req.params.ideaId));
  res.send(idea);
});

module.exports = ideasRouter;
