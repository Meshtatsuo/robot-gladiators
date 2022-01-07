var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};

//shop items and costs
var upgradeAmount = 6;
var healAmount = 20;
var upgradeCost = 7;
var healCost = 7;
var skipCost = 2;

// Initialize player info
var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function () {
    this.heatlh = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function (healAmount, healCost) {
    this.health += healAmount;
    this.money -= Math.max(0, playerInfo.money - healCost);
  },
  upgradeAttack: function (upgradeAmount, upgradeCost) {
    this.attack += upgradeAmount;
    this.money -= Math.max(0, playerInfo.money - upgradeCost);
  },
};

// enemyInfo object stores our enemies and their data, some randomly generated.
var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14),
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14),
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14),
  },
];

//Functions

var startGame = function () {
  // reset player stats
  playerInfo.reset();
  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemyHealth before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);

      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;

      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyObj);

      // if we're not at the last enemy in the array
      if (i < enemyInfo.length - 1) {
        shop();
      }

      if (playerInfo.health <= 0) {
        window.alert("You have lost your robot in battle! Game Over!");
        break;
      }
    } else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }

  endGame();
};

var endGame = function () {
  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert(
      "Great job, you've survived the game! You now have a score of " +
        playerInfo.money +
        "."
    );
  } else {
    window.alert("You've lost your robot in battle.");
  }
  //ask player if they want to play again
  var playAgain = window.prompt("Would you like to play again?");
  if (playAgain === "yes" || playAgain === "YES") {
    startGame();
  } else {
    window.alert("Thank you for playing! Come back soon!");
  }
};

//shopping
var shop = function () {
  console.log("Player has entered the shop");

  if (playerInfo.money > 0) {
    window.alert(
      "Welcome to the shop! You currently have " + playerInfo.money + " coins."
    );
  } else {
    playerInfo.money = 0;
    window.alert("You have no money to shop with, sorry!");
  }
  var purchase = window.prompt(
    "Would you like to buy a REFILL, an UPGRADE, or LEAVE?"
  );

  switch (purchase.toUpperCase()) {
    case "LEAVE":
      window.alert("Thank you for stopping by! Good luck in the next round!");
      break;
    case "REFILL":
      if (playerInfo.money >= healCost) {
        window.alert("Refilling player's health by 20 for 7 dollars.");

        //increase health and decrease money
        playerInfo.refillHealth(healAmount, healCost);
        break;
      } else {
        window.alert("You can't afford this item. Sorry!");
        break;
      }

    case "UPGRADE":
      if (playerInfo.money >= upgradeCost) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");

        //increase ttack and decrease money
        playerInfo.upgradeAttack(upgradeAmount, upgradeCost);
        break;
      } else {
        window.alert("You don't have the money. sorry!");
        break;
      }
    default:
      window.alert("You did not pick a valid option. Try again.");

      // call shop() again to force player to pick a valid option
      shop();
  }
};

var fight = function (enemy) {
  // Only prompt next round if enemy is alive
  while (playerInfo.health > 0 && enemy.health > 0) {
    var promptFight = window.prompt(
      "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
    );
    //if player chooses to skip
    if (promptFight === "skip" || promptFight === "SKIP") {
      var confirmSkip = window.confirm("Are you sure?");
      //if yes, deduct money and quit
      if (confirmSkip && playerInfo.money >= skipCost) {
        playerInfo.money -= skipCost;
        window.alert(
          playerInfo.name + " has chosen to skip the fight. Goodbye!"
        );
        break;
      }
      // if no, run fight() again.
      else if (playerInfo.money < skipCost) {
        window.alert("You can't afford to skip!");
        fight();
      } else {
        fight();
      }
    }
    // if player chooses to fight, then fight
    else if (promptFight === "fight" || promptFight === "FIGHT") {
      // generate random damage value based on player attack power
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);

      // Log a resulting message to the console so we know that it worked.
      console.log(
        playerInfo.name +
          " attacked " +
          enemy.name +
          ". " +
          enemy.name +
          " for " +
          damage +
          "."
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
        break;
      } else {
        window.alert(
          enemy.name + " still has " + enemy.health + " health left."
        );
      }

      //deal random damage to player
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      playerInfo.health = Math.max(0, playerInfo.health - damage);

      // Log a resulting message to the console so we know that it worked.
      console.log(
        enemy.name + " attacked " + playerInfo.name + " for " + damage + "."
      );

      // Check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        break;
      } else {
        window.alert(
          playerInfo.name + " still has " + playerInfo.health + " health left."
        );
      }
    } else {
      window.alert("You need to choose a valid option, try again!");
    }
  }
};

// start game when page loads.
startGame();
