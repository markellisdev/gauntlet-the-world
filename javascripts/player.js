/*
  Define the base object for any player of Gauntlet,
  whether a human player or a monster.
 */
var Player = function(name) {
  this.species = null;
  this.class = null;
  this.weapon = null;

  this.playerName = name || "unknown adventurer";
  this.health = Math.floor(Math.random() * 40 + 50);
  this.limbs = ["head", "neck", "arm", "leg", "torso"];
  this.skinColor = "gray";
  this.skinColors = [this.skinColor];
  this.strength = 90;
  this.intelligence = 90;
  this.evade = 5;

  this.allowedClasses = ["ScottPilgrim", "RamonaFlowers", "NegaScott", "KimPines", "KnivesChau", "StevenStills", "YoungNeil", "WallaceWells"]
  this.toString = function() {
    var output = [this.playerName,
      ": a ",
      this.skinColor,
      " skinned ",
      this.species,
      " ",
      this.class,
      " with ",
      this.health,
      " health. ",
      (this.class.magical) ? "Able to cast " : " Wielding a ",
      this.weapon.toString(),
      "!"
    ].join("");
    return output;
  };
};

Player.prototype.setWeapon = function(newWeapon) {
  this.weapon = newWeapon;
}

Player.prototype.generateClass = function() {
  // Get a random index from the allowed classes array
  var random = Math.round(Math.random() * (this.allowedClasses.length - 1));
//  console.log(random);

  // Get the string at the index
  var randomClass = this.allowedClasses[random];
//  console.log(randomClass);

  // Composes the corresponding player class into the player object
  this.class = new window[randomClass]();

  // Add the health bonus
  this.health += this.class.healthBonus;
  this.strength += this.class.strengthBonus;
  this.intelligence += this.class.intelligenceBonus;
  this.evade += this.class.evadeBonus;
  return this.class;
};

/*
  Define the base properties for a human in a 
  constructor function.
 */
var Human = function() {
  var randomSkin;

  this.species = "Human";
  this.intelligence = this.intelligence + 20;

  this.skinColors.push("brown", "red", "white", "disease");
  randomSkin = Math.round(Math.random() * (this.skinColors.length-1));
  this.skinColor = this.skinColors[randomSkin];

  this.allowedClasses = ["ScottPilgrim", "RamonaFlowers", "NegaScott", "KimPines"];
};
Human.prototype = new Player();


/*
  Define the base properties for a monster in a 
  constructor function.
 */
var Monster = function() {
  this.health = this.health - 30;
  this.intelligence = this.intelligence -20;
  this.strength = this.strength + 30;
};
Monster.prototype = new Player();

