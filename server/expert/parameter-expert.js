const Parameter = require('../models/parameter');

class ParameterExpert {
  static initDefaultValues() {
    const numberOfPlayers = {
      name: 'Number of players',
      value: 2,
      type: 'Number'
    };
    this.findOrCreateParameter(numberOfPlayers);

    const roundsToWin = {
      name: 'Rounds to win',
      value: 3,
      type: 'Number'
    };
    this.findOrCreateParameter(roundsToWin);
  }

  static findOrCreateParameter(defaultParameter) {
    Parameter.findOne({
        name: defaultParameter.name
      })
      .exec(function (err, parameter) {
        if (err) return next(err);
        console.log('Stored parameter:');
        console.log(parameter);

        if (!parameter || !parameter.name) {
          Parameter.create(defaultParameter, function (err, post) {
            if (err) return next(err);
            console.log('Created parameter:');
            console.log(post);
          });
        }
      });
  }
}

module.exports = ParameterExpert;
