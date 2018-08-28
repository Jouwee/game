var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    backgroundColor: 0x66FF66
};

var game = new Phaser.Game(config);

let facing = "Left"
let state = 'idle'
let lastAnim
let player 
let pos = { x: 400, y: 100}

let AKey, DKey, SKey, WKey

let walkSound

function preload() {
    this.load.setBaseURL('http://127.0.0.1:8080/');

    this.load.spritesheet('player', 'assets/player.png', { frameWidth: 12, frameHeight: 15, spacing: 2 });
    this.load.audio('walk', [ 'assets/sounds/walk.wav' ]);
    //spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
}

function create() {

    walkSound = this.sound.add('walk')
    walkSound.addMarker({
        name: 'loop',
        start: 0,
        duration: 0.3,
        config: {
            loop: true
        }
    })

    this.anims.create({
        key: 'idleLeft',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
        frameRate: 3,
        repeat: -1
    });
    this.anims.create({
        key: 'idleRight',
        frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
        frameRate: 3,
        repeat: -1
    });
    this.anims.create({
        key: 'idleDown',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
        frameRate: 3,
        repeat: -1
    });
    this.anims.create({
        key: 'idleUp',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 7 }),
        frameRate: 3,
        repeat: -1
    });
    this.anims.create({
        key: 'walkLeft',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({
        key: 'walkRight',
        frames: this.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({
        key: 'walkDown',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({
        key: 'walkUp',
        frames: this.anims.generateFrameNumbers('player', { start: 6, end: 7 }),
        frameRate: 15,
        repeat: -1
    });
    
    player = this.add.sprite(pos.x, pos.y, 'player');
    console.log(this.add)

    AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

}

function update() {
    state = 'idle'
    if (AKey.isDown) {
        state = 'walk'
        facing = 'Left'
        pos.x -= 2
    }
    if (DKey.isDown) {
        state = 'walk'
        facing = 'Right'
        pos.x += 2
    }
    if (WKey.isDown) {
        state = 'walk'
        facing = 'Up'
        pos.y -= 2
    }
    if (SKey.isDown) {
        state = 'walk'
        facing = 'Down'
        pos.y += 2
    }
    anim = state + facing
    if (anim != lastAnim) {
        player.play(anim)
        if (state == 'walk') {
            walkSound.play('loop');
        } else {
            walkSound.stop();
        }
        lastAnim = anim
    }
    player.x = pos.x
    player.y = pos.y
}