var randomNumber = (min, max) => {
    var Value = Math.floor(Math.random() * (max - min + 1) + min);
    return Value;
};

//fight function
var fight = function(enemy) {
    // repeat and execute as long as the enemy-robot is alive 
    while(palyerInfo.health >0 && enemy.health > 0) {
        
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        // Log result of promptFight
        console.log(promptFight);
        
        // if player choses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
            
            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(palyerInfo.name + " has decided to skip this fight. Goodbye!");
                // subtract money from palyerInfo.money for skipping
                palyerInfo.money = Math.max(0, palyerInfo.money - 10);
                console.log("palyerInfo.money", palyerInfo.money)
                break;
            }
        } 
        
        // remove enemy's health by subtracting the amount set in the palyerInfo.attack variable
        var damage = randomNumber(palyerInfo.attack-3, palyerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);
        console.log(
        palyerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
        
        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            
            // award player money for winning
            palyerInfo.money = palyerInfo.money + 20;
            
            // leave while() loop since enemy is dead
            break;
        } 
        
        else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }
        
        // remove player's health by subtracting the amount set in the enemy.attack variable
        var damage = randomNumber(enemy.attack-3, enemy.attack);
        palyerInfo.health = Math.max(0, palyerInfo.health - damage);
        console.log(enemy.name + " attacked " + palyerInfo.name + ". " + palyerInfo.name + " now has " + palyerInfo.health + " health remaining.");
            
        // check player's health
        if (palyerInfo.health <= 0) {
            window.alert(palyerInfo.name + " has died!");
            break;
        } 
        
        else {
            window.alert(palyerInfo.name + " still has " + palyerInfo.health + " health left.");
        }
    }
};



//function to start new game
var startGame = function() {
    // reset player stats
    palyerInfo.reset();
    for (var i = 0; i < enemyInfo.length; i++) {
        if (palyerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round" + (i + 1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);
            if (palyerInfo.health > 0 && i < enemyInfo.length - 1) {
                var storeConfrim = window.confirm ("The fight is over, visit the store before the next round?");
                if (storeConfrim) {
                    shop();
                }
            }
        }
        else{
            window.alert ("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame ();
};

// function to end the entire game
var endGame = function () {
    // if player is still alive, player wins!
    if (palyerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + palyerInfo.money + ".");
    } 
    else {
        window.alert("You've lost your robot in battle.");
    }
    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");
    
    if (playAgainConfirm) {
        // restart the game
        startGame();
    } 
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

var shop = function () {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    
    switch (shopOptionPrompt) {
        case "refill":
        case "REFILL":
            palyerInfo.refillHealth();
            break;
        case "upgrade":
        case "UPGRADE":
            palyerInfo.upgradeAttack();
            break;
        case "leave":
        case "LEAVE":
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            
            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};

var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log("Your robot's name is " + name);
    return name;
}

var palyerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if ( this.money >= 7) {
            window.alert("Refilling palyer's health by 20 for 7 dollars.")
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!")
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.")
            this.attack += 6
            this.money -= 7
        }
        else {
            window.alert("You don't have enough money!")
        }
    }
};

// You can also log multiple values at once like this
console.log(palyerInfo.name, palyerInfo.attack, palyerInfo.health);

var enemyInfo = [
    {
        name: "Brobot",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Tumble",
        attack: randomNumber(10, 14)
    }
];
// start the game when the page loads
startGame ();