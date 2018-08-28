var config = {
    type: Phaser.AUTO,
    width: 400,
    height: 300,
    pixelArt: true,
    zoom: 2,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    backgroundColor: 0x66FF66
};

var game = new Phaser.Game(config);

let map
let player

function preload() {
    this.load.setBaseURL('http://127.0.0.1:8080/');
    Player.preload(this)
    VisibleMap.preload(this)
}

function create() {
    map = new VisibleMap()
    map.create(this)
    player = new Player()
    player.create(this)
}

function update() {
    player.update(this)
}