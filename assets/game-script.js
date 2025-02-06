var SceneA = new Phaser.Class({
	Extends: Phaser.Scene,

	preload: function () {
		this.load.path = "./";
		this.load.image("illustration_0", "illustration_0.png");
		this.load.image("illustration_1", "illustration_1.png");
		this.load.image("illustration_2", "illustration_2.png");
    this.load.image("illustration_3", "illustration_3.png");
    this.load.image("illustration_4", "illustration_4.png");
    this.load.image("cpr", "cpr1.png")
	},

	create: function () {
		this.anims.create({
			key: "snooze",
			frames: [
        { key: "illustration_0", duration: 1 },
				{ key: "illustration_1", duration: 1000 },
				{ key: "illustration_2", duration: 1000 },
        { key: "illustration_3", duration: 2000 },
        { key: "illustration_4", duration: 2500 },

			],
			frameRate: 1,
			repeat: 0,
		});

		var sprite = this.add
			.sprite(0, 0, "illustration_0")
      .setOrigin(0, 0)
      .setInteractive({ cursor: "pointer" })

      sprite.on('pointerdown', function (pointer) {
        this.play("snooze");
    });

		sprite.on(
			"animationcomplete",
			function () {
        // this.add.image(0, 0, "cpr").setOrigin(0, 0);
				this.scene.start("sceneB");
			},
			this
		);
	},
});

var SceneB = new Phaser.Class({
	Extends: Phaser.Scene,

	initialize: function SceneB() {
		Phaser.Scene.call(this, { key: "sceneB" });
	},

	preload: function () {
		this.load.image("startButton", "./startButton.png");
		this.load.image("textBox", "./textBox.png");
    this.load.image("retryButton", "./retryButton.png");
    this.load.image("textBoxRetry", "./textBoxRetry.png");
    this.load.image("cpr", "./cpr1.png")

	},

	onObjectClicked: function () {
		this.cameras.main.once(
			"camerafadeoutcomplete",
			function (camera) {
				this.scene.start("sceneC");

				camera.fadeIn(1000, 0, 0, 0);
			},
			this
		);
		this.cameras.main.fadeOut(1000, 0, 0, 0);
	},
	create: function () {

    this.add.image(0, 0, "cpr").setOrigin(0, 0);

		var playButton = this.add.image(
			this.game.renderer.width / 2,
			this.game.renderer.height / 2,
			"textBox"
    )
    
    playButton.scale = 0.5; 

		loadPopup = this.time.delayedCall(10, newEvent, [], this);
	},
});

function newEvent() {
	var startButton = this.add
		.image(
			this.game.renderer.width / 2,
			this.game.renderer.height - 300,
			"startButton"
		)
	startButton.scale = 0.4;

	startButton.setInteractive({ cursor: "pointer" });
	startButton.on("pointerover", function (event) {
		this.setTint(0xe6e6e6);
	});

	startButton.on("pointerout", function (event) {
		this.clearTint();
	});

	startButton.on("pointerdown", this.onObjectClicked, this);
}

var SceneC = new Phaser.Class({
	Extends: Phaser.Scene,

	initialize: function SceneC() {
		Phaser.Scene.call(this, { key: "sceneC" });
	},

	preload: function () {
    this.add.image(0, 0, "cpr").setOrigin(0, 0);
		document.querySelector(".counter").style.display = "block";
		this.load.audio("heartbeat", "./Heartbeat.m4a");
	},

	create: function () {
		// var music = this.sound.add("heartbeat");
		// music.loop = true;

		// music.play();

		this.time.delayedCall(30000, onTime, [], this);

		var count = 30;

		var counter = setInterval(timer, 1000);

		document.getElementById("timer").innerHTML = "Begin!";

		function timer() {
			count = count - 1;
			if (count <= 0) {
				clearInterval(counter);
				return;
			}

			document.getElementById("timer").innerHTML = count;
		}
	},
});

function onTime() {
	this.game.sound.stopAll();
	this.scene.start("sceneD");
}

var SceneD = new Phaser.Class({
	Extends: Phaser.Scene,

	initialize: function SceneD() {
		Phaser.Scene.call(this, { key: "sceneD" });
	},

	preload: function () {
		document.querySelector(".counter").style.display = "none";
	},

	tryAgain: function () {
		this.scene.start("sceneC");
	},

	create: function () {
		this.add.image(0, 0, "cpr").setOrigin(0, 0);

		var retryPopup = this.add.image(
			this.game.renderer.width / 2,
			this.game.renderer.height / 2,
      "textBoxRetry")

      retryPopup.scale = 0.5;

		loadPopupRetry = this.time.delayedCall(10, retryEvent, [], this);
	},
});

function retryEvent() {
	var retryButton = this.add
		.image(
			this.game.renderer.width / 2,
			this.game.renderer.height - 280,
			"retryButton"
		)
		retryButton.scale = 0.4;

	retryButton.setInteractive({ cursor: "pointer" });
	retryButton.on("pointerover", function (event) {
		this.setTint(0xe6e6e6);
	});

	retryButton.on("pointerout", function (event) {
		this.clearTint();
	});

	retryButton.on("pointerdown", this.tryAgain, this);
}

var config = {
	type: Phaser.AUTO,
	width: 1280,
	height: 780,
  parent: "phaser-example",
	transparent: true,
	dom: {
		createContainer: true,
	},
	scene: [SceneA, SceneB, SceneC, SceneD],
};

var game = new Phaser.Game(config);
