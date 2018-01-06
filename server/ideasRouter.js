const ideasRouter = require('express').Router({mergeParams: true})

const { createMeeting, getAllFromDatabase, getFromDatabaseById,
addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId,
deleteAllFromDatabase } = require('./db.js');

const { checkMillionDollarIdea } = require('./checkMillionDollarIdea.js');

ideasRouter.get('/', (req, res, next) => {
  let ideas = getAllFromDatabase('ideas');
  res.send(ideas);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  let idea = getFromDatabaseById('ideas', req.params.ideaId);
  if (idea) {
    res.send(idea);
  } else if (!idea) {
    res.status(404).send('Idea not found.');
  }
});

ideasRouter.post('/', (req, res, next) => {
  //req.body and not req.query because of using bodyParser middleware in server.js
  newIdea = addToDatabase('ideas', req.body);
  if (newIdea) {
      res.status(201).send(newIdea);
    } else if (!newIdea) {
      res.status(400).send('Problem adding a new idea.');
    }
});

ideasRouter.put('/:ideaId', (req, res, next) => {
  let changedIdea = req.body;
  const updatedIdea = updateInstanceInDatabase('ideas', changedIdea);
  if (updatedIdea) {
    res.send(updatedIdea);
  } else if (!updatedIdea) {
    res.status(404).send('This idea does not exist.');
  }
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
