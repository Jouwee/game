class Player {

    constructor() {
        this.facing = "Left"
        this.state = 'idle'
        this.lastAnim = ''
        this.sprite = undefined 
        this.pos = { x: 400, y: 100}
        this.AKey
        this.DKey
        this.SKey
        this.WKey
        this.walkSound
    }

    static preload(game) {
        game.load.spritesheet('player', 'assets/player.png', { frameWidth: 12, frameHeight: 15, spacing: 2 });
        game.load.audio('walk', ['assets/sounds/walk.wav']);
    }

    create(game) {
        this.walkSound = game.sound.add('walk')
        this.walkSound.addMarker({
            name: 'loop',
            start: 0,
            duration: 0.3,
            config: {
                loop: true
            }
        })

        game.anims.create({
            key: 'idleLeft',
            frames: game.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1
        });
        game.anims.create({
            key: 'idleRight',
            frames: game.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
            frameRate: 3,
            repeat: -1
        });
        game.anims.create({
            key: 'idleDown',
            frames: game.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
            frameRate: 3,
            repeat: -1
        });
        game.anims.create({
            key: 'idleUp',
            frames: game.anims.generateFrameNumbers('player', { start: 6, end: 7 }),
            frameRate: 3,
            repeat: -1
        });
        game.anims.create({
            key: 'walkLeft',
            frames: game.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 15,
            repeat: -1
        });
        game.anims.create({
            key: 'walkRight',
            frames: game.anims.generateFrameNumbers('player', { start: 2, end: 3 }),
            frameRate: 15,
            repeat: -1
        });
        game.anims.create({
            key: 'walkDown',
            frames: game.anims.generateFrameNumbers('player', { start: 4, end: 5 }),
            frameRate: 15,
            repeat: -1
        });
        game.anims.create({
            key: 'walkUp',
            frames: game.anims.generateFrameNumbers('player', { start: 6, end: 7 }),
            frameRate: 15,
            repeat: -1
        });

        this.sprite = game.add.sprite(this.pos.x, this.pos.y, 'player');

        this.AKey = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.DKey = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.SKey = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.WKey = game.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    }

    update(game) {
        this.state = 'idle'
        if (this.AKey.isDown) {
            this.state = 'walk'
            this.facing = 'Left'
            this.pos.x -= 2
        }
        if (this.DKey.isDown) {
            this.state = 'walk'
            this.facing = 'Right'
            this.pos.x += 2
        }
        if (this.WKey.isDown) {
            this.state = 'walk'
            this.facing = 'Up'
            this.pos.y -= 2
        }
        if (this.SKey.isDown) {
            this.state = 'walk'
            this.facing = 'Down'
            this.pos.y += 2
        }
        this.anim = this.state + this.facing
        if (this.anim != this.lastAnim) {
            this.sprite.play(this.anim)
            if (this.state == 'walk') {
                this.walkSound.play('loop');
            } else {
                this.walkSound.stop();
            }
            this.lastAnim = this.anim
        }
        this.sprite.x = this.pos.x
        this.sprite.y = this.pos.y
    }

}