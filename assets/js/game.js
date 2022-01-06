// Initialize player info
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//Log multiple values at once using commas
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//shop items and costs
var upgradeAmount = 6;
var healAmount = 20;
var upgradeCost = 7;
var healCost = 7;
var skipCost = 2;

//Functions

var startGame = function () {
  // reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;
  for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyName = enemyNames[i];

      // reset enemyHealth before starting new fight
      enemyHealth = 50;

      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;

      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyName);

      // if we're not at the last enemy in the array
      if (i < enemyNames.length - 1) {
        shop();
      }

      if (playerHealth <= 0) {
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
  if (playerHealth > 0) {
    window.alert(
      "Great job, you've survived the game! You now have a score of " +
        playerMoney +
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
    window.prompt("Thank you for playing! Come back soon!");
  }
};

//shopping
var shop = function () {
  console.log("Player has entered the shop");

  if (playerMoney > 0) {
    window.alert(
      "Welcome to the shop! You currently have " + playerMoney + " coins."
    );
  } else {
    playerMoney = 0;
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
      if (playerMoney >= healCost) {
        window.alert("Refilling player's health by 20 for 7 dollars.");

        //increase health and decrease money
        playerHealth += 20;
        playerMoney -= 7;
        break;
      } else {
        window.alert("You can't afford this item. Sorry!");
        break;
      }

    case "UPGRADE":
      if (playerMoney >= upgradeCost) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");

        //increase ttack and decrease money
        playerAttack += upgradeAmount;
        console.log(playerAttack);
        playerMoney -= upgradeCost;
        console.log(playerMoney);
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

var fight = function (enemyName) {
  // Only prompt next round if enemy is alive
  while (playerHealth > 0 && enemyHealth > 0) {
    var promptFight = window.prompt(
      "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
    );
    //if player chooses to skip
    if (promptFight === "skip" || promptFight === "SKIP") {
      var confirmSkip = window.confirm("Are you sure?");
      //if yes, deduct money and quit
      if (confirmSkip && playerMoney >= skipCost) {
        playerMoney -= skipCost;
        window.alert(playerName + " has chosen to skip the fight. Goodbye!");
        break;
      }
      // if no, run fight() again.
      else if (playerMoney < skipCost) {
        window.alert("You can't afford to skip!");
        fight();
      } else {
        fight();
      }
    }
    // if player chooses to fight, then fight
    else if (promptFight === "fight" || promptFight === "FIGHT") {
      //subtract value of playerAttack from value of  enemyHealth
      //and use that result to update the value in the `enemyHealth` variable
      enemyHealth = enemyHealth - playerAttack;

      // Log a resulting message to the console so we know that it worked.
      console.log(
        playerName +
          " attacked " +
          enemyName +
          ". " +
          enemyName +
          " now has " +
          enemyHealth +
          " health."
      );

      // check enemy's health
      if (enemyHealth <= 0) {
        window.alert(enemyName + " has died!");
        break;
      } else {
        window.alert(enemyName + " still has " + enemyHealth + " health left.");
      }

      // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
      playerHealth = playerHealth - enemyAttack;

      // Log a resulting message to the console so we know that it worked.
      console.log(
        enemyName +
          " attacked " +
          playerName +
          ". " +
          playerName +
          " now has " +
          playerHealth +
          " health."
      );

      // Check player's health
      if (playerHealth <= 0) {
        window.alert(playerName + " has died!");
        break;
      } else {
        window.alert(
          playerName + " still has " + playerHealth + " health left."
        );
      }
    } else {
      window.alert("You need to choose a valid option, try again!");
    }
  }
};

// start game when page loads.
startGame();
