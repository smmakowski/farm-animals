// game state object
let GameState = {
  preload: function() { // preload assets here
    // load images
    this.load.image('background', 'assets/images/background.png');
    this.load.image('arrow', 'assets/images/arrow.png');

    //load sounds
    this.load.audio('chicken', ['assets/audio/chicken.mp3', 'assets/audio/chicken.ogg']);
  },
  create: function() { // create scene here
    //set resizing and scale properties for device universiality
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // auto scale while maintaining aspect ratio
    this.scale.pageAlignHorizontally = true; // cetner horizontally
    this.scale.pageAlignVertically = true; // center vertically

    // add background
    this.background = this.game.add.sprite(0, 0,'background');
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(this.sendMessage, this);

    // add arrows
    this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
    this.rightArrow.anchor.setTo(.5);
    this.rightArrow.customParams = {direction: 1};
    this.rightArrow.inputEnabled = true;
    this.rightArrow.events.onInputDown.add(this.sendMessage, this);

    this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
    this.leftArrow.anchor.setTo(.5);
    this.leftArrow.scale.setTo(-1);
    this.leftArrow.inputEnabled = true;
    this.leftArrow.events.onInputDown.add(this.sendMessage, this);

    // create groups of sprites

    const animalData = [
      {key: 'chicken', text: 'CHICKEN'},
      {key: 'horse', text: ''}
    ];
  },
  update: function() { // update function

  },

  switchAnimal: function(sprite, event) {
    console.log('You clicked the background, you asshole!');
    game.sound.play('chicken');
  },

  animateAnimal: function(sprite, event) {
    console.log()
  },
};

let game = new Phaser.Game(640, 360, Phaser.AUTO); // init new Game; pahser will automatically append a canvas

game.state.add('GameState', GameState); // add GameState
game.state.start('GameState'); // start game state
