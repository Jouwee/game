class Camera {

    create(game) {
        this.camera = game.cameras.main
        this.camera.scrollX = 0
        this.camera.scrollY = 0
    }

    update(game) {
        this.camera.scrollX = player.pos.x - 200
        this.camera.scrollY = player.pos.y - 150
    }

}