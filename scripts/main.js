// game state object
var GameState = {
  preload: function() { // preload assets here
    this.load.image('background', 'assets/images/sample-background.png');
  },
  create: function() { // create scene here
    //set resizing and scale properties for device universiality
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; // auto scale while maintaining aspect ratio
    this.scale.pageAlignHorizontally = true; // cetner horizontally
    this.scale.pageAlignVertivally = true; // center vertically

    this.background = this.game.add.sprite(0, 0,'background');
  },
  update: function() { // update function

  },
};

var game = new Phaser.Game(640, 360, Phaser.AUTO); // init new Game; pahser will automatically append a canvas

game.state.add('GameState', GameState); // add GameState
game.state.start('GameState'); // start game state
