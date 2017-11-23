// game state object
let GameState = {
  preload: function() { // preload assets here
    this.load.image('background', 'assets/images/background.png');
  },
  create: function() { // create scene here
    //set resizing and scale properties for device universiality
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // auto scale while maintaining aspect ratio
    this.scale.pageAlignHorizontally = true; // cetner horizontally
    this.scale.pageAlignVertivally = true; // center vertically
    // add background
    this.background = this.game.add.sprite(0, 0,'background');
    this.background.inputEnabled = true;
    this.background.events.onInputDown.add(this.sendMessage, this);
  },
  update: function() { // update function

  },

  sendMessage: function() {
    console.log('You clicked the background, you asshole!');
  }
};

let game = new Phaser.Game(640, 360, Phaser.AUTO); // init new Game; pahser will automatically append a canvas

game.state.add('GameState', GameState); // add GameState
game.state.start('GameState'); // start game state
