const express = require('express');
const apiRouter = express.Router();

const { createMeeting, getAllFromDatabase, getFromDatabaseById,
addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId,
deleteAllFromDatabase } = require('./db.js');

//require and use minions router for all minion routes
const minionsRouter = require('./minionsRouter');
apiRouter.use('/minions', minionsRouter);
//require and use ideas router for all idea routes
const ideasRouter = require('./ideasRouter');
apiRouter.use('/ideas', ideasRouter);
//require and use meetings router for all meeting routes
const meetingsRouter = require('./meetingsRouter');
apiRouter.use('/meetings', meetingsRouter);

//filters out get requests for non existent objects


module.exports = apiRouter;
