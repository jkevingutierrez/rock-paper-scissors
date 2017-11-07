const Movement = require('../models/movement');

class MovementExpert {
  static initDefaultValues() {
    const defaultMovements = [{
        name: "paper",
        kills: "rock"
      },
      {
        name: "rock",
        kills: "scissors"
      },
      {
        name: "scissors",
        kills: "paper"
      }
    ];
    this.findOrCreateMovements(defaultMovements);
  }

  static findOrCreateMovements(defaultMovements) {
    defaultMovements.forEach(defaultMovement => {
      Movement.findOne({
          name: defaultMovement.name
        })
        .exec(function (err, movement) {
          if (err) return next(err);
          console.log('Stored movement:');
          console.log(movement);

          if (!movement || movement.length === 0) {
            Movement.create(defaultMovement, function (err, post) {
              if (err) return next(err);
              console.log('Created movement');
              console.log(post);
            });
          }
        });
    });
  }
}

module.exports = MovementExpert;
