class VisibleMap {

    constructor() {
        this.tiles = []
        this.width = 100
        this.height = 100
        for (let x = 0; x < this.width; x++) {
            this.tiles[x] = []
            for (let y = 0; y < this.height; y++) {
                this.tiles[x][y] = Math.random() > 0.2 ? Tiles.GRASS : Tiles.WATER
            }
        }
    }

    static preload(game) {
        game.load.spritesheet('tilemap', 'assets/tilemap.png', { frameWidth: 16, frameHeight: 16 });
    }

    create(game) {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const tile = this.get(x, y)
                game.add.sprite(x * 16, y * 16, 'tilemap', tile.tile);
            }
        }
    }

    getAtPixel(x, y) {
        return this.get(Math.round(x / 16), Math.round(y / 16))
    }

    get(x, y) {
        return this.tiles[x][y]
    }

}