const meetingsRouter = require('express').Router({mergeParams: true})

const { createMeeting, getAllFromDatabase, getFromDatabaseById,
addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId,
deleteAllFromDatabase } = require('./db.js');

meetingsRouter.get('/', (req, res, next) => {
  let meetings = getAllFromDatabase('meetings');
  res.send(meetings);
});

meetingsRouter.get('/:meetingId', (req, res, next) => {
  let meeting = getFromDatabaseById('meeting', Number(req.params.meetingId));
  res.send(meeting);
});

module.exports = meetingsRouter;
