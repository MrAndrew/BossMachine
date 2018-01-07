const ideasRouter = require('express').Router();

const { createMeeting, getAllFromDatabase, getFromDatabaseById,
addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId,
deleteAllFromDatabase } = require('./db.js');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');
//had to get .param from solution code, appears to change './:ideaId'
//to './id' instead, not sure why
ideasRouter.param('id', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (idea) {
    req.idea = idea;
    next();
  } else {
    res.status(404).send();
  }
});

ideasRouter.get('/', (req, res, next) => {
  let ideas = getAllFromDatabase('ideas');
  res.send(ideas);
});

ideasRouter.get('/:id', (req, res, next) => {
  let idea = req.idea;
  if (idea) {
    res.send(idea);
  } else if (!idea) {
    res.status(404).send('Idea not found.');
  }
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  //req.body and not req.query because of using bodyParser middleware in server.js
  newIdea = addToDatabase('ideas', req.body);
  if (newIdea) {
      res.status(201).send(newIdea);
    } else if (!newIdea) {
      res.status(400).send('Problem adding a new idea.');
    }
});
// '/:id' because .params changes the path aparently
ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
  let changedIdea = req.body;
  let updatedIdea = updateInstanceInDatabase('ideas', changedIdea);
  res.send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    let deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
    if (deletedIdea) {
      res.status(204).send();
    } else if (!deletedIdea) {
      res.status(404).send('Idea not found, so not deleted.');
    }
  });

module.exports = ideasRouter;
