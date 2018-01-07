const meetingsRouter = require('express').Router();

const { createMeeting, getAllFromDatabase, getFromDatabaseById,
addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId,
deleteAllFromDatabase } = require('./db.js');

meetingsRouter.get('/', (req, res, next) => {
  let meetings = getAllFromDatabase('meetings');
  res.send(meetings);
});

meetingsRouter.post('/', (req, res, next) => {
  let newMeeting = createMeeting();
  newMeeting = addToDatabase('meetings', newMeeting);
  if (newMeeting) {
      res.status(201).send(newMeeting);
    } else if (!newMeeting) {
      res.status(400).send('Problem adding a new meeting.');
    }
});

meetingsRouter.delete('/', (req, res, next) => {
    let deletedMeetings = deleteAllFromDatabase('meetings');
    if (deletedMeetings) {
      res.status(204).send('Meetings deleted.');
    } else if (!deletedMeetings) {
      res.status(404).send('Problem deleting all the meetings.');
    }
  });

module.exports = meetingsRouter;
