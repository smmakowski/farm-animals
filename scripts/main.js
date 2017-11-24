// game state object
let GameState = {
  // game state to control moving
  isMoving: false,
  // game state methods
  preload: function() { // preload assets here
    // load images
    this.load.image('background', 'assets/images/background.png');
    this.load.image('arrow', 'assets/images/arrow.png'); // params = (key, file sour)
    this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png', 131, 200, 3);
    this.load.spritesheet('pig', 'assets/images/pig_spritesheet.png', 297, 200, 3); //params = (key, path, height, width, frames);
    this.load.spritesheet('horse', 'assets/images/horse_spritesheet.png', 212, 200, 3);
    this.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png', 244, 200, 3);

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


    animalData.forEach(function(animal, idx) {

      animal = self.animals.create(-1000, self.game.world.centerY, animal.key, 0); // creates an isprtie in the group (x, 4, imagekey, frame (if sprtiesheet))
     // high negative keeps it off screen
      animal.anchor.setTo(.5);

      animal.animations.add('animate', [0, 1, 2, 1, 0,], 3, false); // params = (name, [sequence of frames), frames in sheet, replay)
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
    console.log(self.currentAnimal);
    // use isMoving state to prvent multi-click when switching
    if (this.isMoving) {
      return false;
    } else {
      this.isMoving = true;
    }
    // check current and next to prevent moving further than  list intends
    // if (this.currentAnimal.key === 'chicken' && direction === -1) {
    //   return false;
    // } else if (this.currentAnimal.key === 'sheep' && direction === 1) {
    //   return false;
    // }

    // determine new animal based on arrow direction
    if (direction === 1) {
      newAnimal = this.animals.next(); // set the new animal to next
      newAnimal.x = -1000; /// place animal all the way left to prevent cross tweeing
      endX = 1000;

    }  else if (direction === -1) {
      newAnimal = this.animals.previous();
      newAnimal.x = 1000;
      endX = -1000;
    }

    //move current
    // move current off screen
    // store twee animation
    const currentAnimalMovement = this.add.tween(self.currentAnimal);
    currentAnimalMovement.to({x: endX}, 1000); // set tween options
    currentAnimalMovement.onComplete.add(function() {
      self.isMoving = false;
    });
    currentAnimalMovement.start(); // begin animation


    const newAnimalMovement = this.add.tween(newAnimal);
    newAnimalMovement.to({x: self.game.world.centerX}, 1000);
    newAnimalMovement.onComplete.add(function() {
      self.isMoving = false;
    });
    newAnimalMovement.start();
    // this.currentAnimal.position.set(-1000, self.game.world.centerY);
    this.currentAnimal = newAnimal; //reset current and move new curren tot cente
    // this.currentAnimal.position.set(self.game.world.centerX, self.game.world.centerY);
  },

  animateAnimal: function(sprite, event) {
    sprite.animations.play('animate');
    sprite.customParams.sound.play(); // debug me later
  }
};

let game = new Phaser.Game(640, 360, Phaser.AUTO); // init new Game; pahser will automatically append a canvas

game.state.add('GameState', GameState); // add GameState
game.state.start('GameState'); // start game state
