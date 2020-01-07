        //On page load, create game config
        var config = {
            // Rendering auto
            type: Phaser.AUTO,
            // Width and height of the game
            width: 480,
            height: 600,
            // Enable physics
            physics: {
                default: 'arcade',
                arcade: {
                    // Disable gravity
                    // Physics needded for collisions
                    gravity: { y: 0 },
                    // shows hitboxes
                    debug: true
                }
            },
            // id for html
            parent:'phaser',
            scene: myGame.scenes
        };
        //Instantiate the game with the config
        var game = new Phaser.Game(config);