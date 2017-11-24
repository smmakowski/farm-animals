// game state object
let GameState = {
  preload: function() { // preload assets here
    // load images
    this.load.image('background', 'assets/images/background.png');
    this.load.image('arrow', 'assets/images/arrow.png');
    this.load.image('chicken', 'assets/images/chicken.png');
    this.load.image('pig', 'assets/images/pig.png');
    this.load.image('horse', 'assets/images/horse.png');
    this.load.image('sheep', 'assets/images/sheep.png');

    //load sounds
    this.load.audio('chickenSound', ['assets/audio/chicken.mp3', 'assets/audio/chicken.ogg']);
    this.load.audio('pigSound', ['assets/audio/pig.mp3', 'assets/audio/pig.ogg']);
    this.load.audio('horseSound', ['assets/audio/horse.mp3', 'assets/audio/horse.ogg']);
    this.load.audio('sheepSound', ['assets/audio/sheep.mp3', 'assets/audio/sheep.ogg']);
  },
  create: function() { // create scene here
    const animalData = [
      {key: 'chicken', text: 'CHICKEN', audio: 'chickenSound'},
      {key: 'horse', text: 'HORSE', audio: 'horseSound'},
      {key: 'pig', text: 'PIG', audio: 'pigSound'},
      {key: 'sheep', text: 'SHEEP', audio: 'sheepSound'},
    ];
    const self = this;

    //set resizing and scale properties for device universiality
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // auto scale while maintaining aspect ratio
    this.scale.pageAlignHorizontally = true; // cetner horizontally
    this.scale.pageAlignVertically = true; // center vertically

    // add background
    this.background = this.game.add.sprite(0, 0,'background');

    // add arrows
    this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
    this.rightArrow.anchor.setTo(.5); // sets anchor to middle of image (setTo(X, Y))
    this.rightArrow.customParams = {direction: 1}; // sets custom params
    this.rightArrow.inputEnabled = true; // add click handler
    this.rightArrow.events.onInputDown.add(this.switchAnimal, this);
    // this.rightArrow.events.onInputDown.add(this.switchAnimal, this);

    this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
    this.leftArrow.anchor.setTo(.5);
    this.leftArrow.scale.setTo(-1);
    this.leftArrow.customParams = {direction: -1};
    this.leftArrow.inputEnabled = true;
    this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

    // create groups of sprites

    this.animals = this.game.add.group();


    animalData.forEach(function(animal) {
      animal = self.animals.create(-1000, self.game.world.centerY, animal.key); // high negative keeps it off screen
      animal.anchor.setTo(.5);
      animal.customParams = {text: animal.text, sound: self.game.add.audio(animal.audio)}; // set custom paramater
      animal.inputEnabled = true;
      animal.input.pixelPerfectClick = true; //restricts clickable area to hug item
      animal.events.onInputDown.add(self.animateAnimal, self);
    });

    this.currentAnimal = this.animals.next(); // goes to next animal in list
    this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);
  },
  update: function() { // update function

  },

  switchAnimal: function(sprite, event) {
    const direction = sprite.customParams.direction;
    const self = this;
    let newAnimal, endX;
    // determine new animal based on arrow direction
    if (direction === 1) {
      newAnimal = this.animals.next();
      endX = 1000;

    }  else if (direction === -1) {
      newAnimal = this.animals.previous();
      endX = -1000;
    }
    //move current
    // move current off screen
    // store twee animation
    const currentAnimalMovement = this.add.tween(self.currentAnimal);
    currentAnimalMovement.to({x: endX}, 1000); // set tween options
    currentAnimalMovement.start(); // begin animation


    const newAnimalMovement = this.add.tween(newAnimal);
    newAnimalMovement.to({x: self.game.world.centerX}, 1000);
    newAnimalMovement.start();
    // this.currentAnimal.position.set(-1000, self.game.world.centerY);
    this.currentAnimal = newAnimal; //reset current and move new curren tot cente
    // this.currentAnimal.position.set(self.game.world.centerX, self.game.world.centerY);
  },

  animateAnimal: function(sprite, event) {
    sprite.customParams.sound.play(); // debug me later
  }
};

let game = new Phaser.Game(640, 360, Phaser.AUTO); // init new Game; pahser will automatically append a canvas

game.state.add('GameState', GameState); // add GameState
game.state.start('GameState'); // start game state
