$(document).ready(function() {

	$(".newGame").hide();

	var charPick;
	var enemyPick;
	var enemyBattling = false;
	var playerWon;
	var enemies = [];

	var obi = {
		name: "obi",
		display: "Obi-Wan Kenobi",
		health: 120,
		attack: 10,
		baseAttack: 10,
		counterAttack: 12,
		characterSelect: "images/Obi.jpg",
		playCharSelect: "images/Obi.jpg",
		enemyCharSelect: "images/Obi.jpg"
	}
	var luke = {
		name: "luke",
		display: "Luke Skywalker",
		health: 100,
		attack: 12,
		baseAttack: 12,
		counterAttack: 15,
		characterSelect: "images/Luke.jpg",
		playCharSelect: "images/Luke.jpg",
		enemyCharSelect: "images/Luke.jpg"
	}
	var sidious = {
		name: "sidious",
		display: "Darth Sidious",
		health: 150,
		attack: 16,
		baseAttack: 16,
		counterAttack: 20,
		characterSelect: "images/Sidious.jpg",
		playCharSelect: "images/Sidious.jpg",
		enemyCharSelect: "images/Sidious.jpg"
	}
	var maul = {
		name: "maul",
		display: "Darth Maul",
		health: 180,
		attack: 5,
		baseAttack: 5,
		counterAttack: 14,
		characterSelect: "images/Maul.jpg",
		playCharSelect: "images/Maul.jpg",
		enemyCharSelect: "images/Maul.jpg"
	}

	var characters = [obi, luke, sidious, maul];

	$(".playerCharPick").on("click", function() {
		charPick = eval($(this).data("obj"));
		$("#playerCharArea").append('<img src="'+ charPick.playCharSelect + '" class="image" data-obj="' + charPick.name + '">');
		$("#playerCharArea").show();
		updatePlayerStats();
		$("#playerCharSelection").empty();
		$("#result").html("");
		for (i=0;i<characters.length;i++) {
			if (characters[i].name !== charPick.name) {
				$("#enemyCharSelection").append('<div class = "col-lg-3 cont"><img src="' + characters[i].characterSelect + '" class="enemyCharPick" data-obj="' + characters[i].name + '"></div>');
			}
		}

	});

	$("#enemyCharSelection").on("click", ".enemyCharPick", function() {
		$(".newGame").show();
		if (!enemyBattling) {
			enemyPick = eval($(this).data("obj"));
			$("#enemyCharArea").append('<img src="'+ enemyPick.enemyCharSelect + '" class="image" id="enemyChar" data-obj="' + enemyPick.name + '">');
			$("#enemyCharArea").show();
			updateEnemyStats();
			$("#attack").show();
			$(this).hide();
			enemies.push(enemyPick);
			enemyBattling = true;
		}
	});

	$(".attack").on("click", function() {
		if (enemyBattling == true) {
			enemyPick.health -= charPick.attack;
			charPick.attack += charPick.baseAttack;
			updateEnemyStats();

			if (enemyPick.health <= 0) { 
				$("#enemyChar").remove();
				$("#enemyName").html("");
				$("#enemyHealth").html("");
				enemyBattling = false;
				if (enemies.length == 3) {
					var enemyLiving = false;
					for (i=0; i<enemies.length;i++) {
						if (enemies[i].health > 0) {
							enemyLiving = true;
						}
					}
					if (enemyLiving == false) {
						playerWon = true;
						$("#result").html("Player 1 Wins!");
						$(".attack").hide();
					}
				}
			}
			else {
				charPick.health -= enemyPick.counterAttack;
				updatePlayerStats();
					if (charPick.health <= 0) {
						playerLoss = false;
						$("#result").html("Computer Wins");
						$(".attack").hide();
					}
			}
		}
		else {
			alert("Select an Enemy");
		}
	});
	$(".newGame").on("click", function() {
		location.reload();
	});
	function updatePlayerStats() {
		$("#playerHealth").html("HP: " + charPick.health + "<br />Attack: " + charPick.attack);
		$("#playerName").html(charPick.display);
	}
	function updateEnemyStats() {
		$("#enemyHealth").html("HP: " + enemyPick.health + "<br />Attack: " + enemyPick.attack);
		$("#enemyName").html(enemyPick.display);
	}
})