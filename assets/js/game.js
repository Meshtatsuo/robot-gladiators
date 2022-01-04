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

//Functions

var fight = function (enemyName) {
  // Alert player that the round is starting
  window.alert("Welcome to Robot Gladiators!");

  var promptFight = window.prompt(
    "Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose."
  );

  // if player chooses to fight, then fight

  if (promptFight === "fight" || promptFight === "FIGHT") {
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
    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  }

  //if player chooses to skip
  else if (promptFight === "skip" || promptFight === "SKIP") {
    var confirmSkip = window.confirm("Are you sure?");
    //if yes, deduct money and quit
    if (confirmSkip) {
      playerMoney -= 2;
      window.alert(playerName + " has chosen to skip the fight. Goodbye!");
    }
    // if no, run fight() again.
    else {
      fight();
    }
  } else {
    window.alert("You need to choose a valid option, try again!");
  }
};

for (var i = 0; i < enemyNames.length; i++) {
  fight(enemyNames[i]);
}
