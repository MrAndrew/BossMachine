
const checkMillionDollarIdea = (req, res, next) => {
  let idea = req.body;
  let numWeeks = idea.numWeeks;
  let weeklyRevenue = idea.weeklyRevenue;
  let ideaValue = numWeeks * weeklyRevenue;
  if (!numWeeks || !weeklyRevenue) {
    res.status(400).send('Needs number of weeks and weekly revenue!');
  } else if (ideaValue < 1000000) {
    res.status(400).send('Not a million dollar idea.');
  } else if(isNaN(numWeeks) || isNaN(weeklyRevenue) ) {
    res.status(400).send('Number of Weeks or Weekly Revenue are not numbers.');
  } else if (ideaValue >= 1000000) {
    req.body = idea;
    next();
  }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
