const MARUKO_INDICES = {
  "Asking": [0, 0],
  "Correct": [2, 1],
  "Wrong": [0, 1]
}
let question = null;
let MAX_QUESTION_PER_TURN = 6;
let questionCompleted = 0;
let completedIngredients = [];
let completedCake = null;

function createObjects() {	
	startScreenObjects();
		
	welcomeObjects();
	
	taskObjects();
	
	wrongAnswerObjects();
	
	cakeObjects();
	
	endGameObjects();
}

function startScreenObjects() {
	//  Cake factory label  
	let style = new TextStyle({
		fontFamily: "Forte",
		fontSize: 60,
		fill: "#1FDE77",  //  mau chu~
		stroke: '#000000',  //  mau` vien` chu~
		strokeThickness: 1,
		dropShadow: true,
		dropShadowColor: "#000000",
		dropShadowBlur: 1,
	});
	let message = new Text(i18n.TITLE, style);
	message.position.set(
		window.innerWidth / 2 - message.width / 2, 
		window.innerHeight * .1
	);
  
	//  Start button label  
	let styleBtn = new TextStyle({
		fontFamily: "Forte",
		fontSize: 40,
		fill: "#1FDE77",  //  mau chu~
		stroke: '#000000',  //  mau` vien` chu~
	});
	let messageStart = new Text(i18n.PLAY, styleBtn);  
	//  Start button    
	let roundBox = new Graphics();
	roundBox.lineStyle(1, 0x000000);
	roundBox.beginFill(0xFFFA00);
	roundBox.drawRoundedRect(0, 0, messageStart.width * 1.5, messageStart.height * 1.1, 10);
	roundBox.endFill();
	roundBox.x = window.innerWidth / 2 - roundBox.width / 2;
	roundBox.y = window.innerHeight / 2;    
	messageStart.position.set(
		roundBox.x + roundBox.width / 2 - messageStart.width / 2,
		roundBox.y + roundBox.height / 2 - messageStart.height / 2
	);
	let btnStartContainer = new Container();
	btnStartContainer.addChild(roundBox);
	btnStartContainer.addChild(messageStart);
	btnStartContainer.interactive = true;
	btnStartContainer.hitArea = new Rectangle(
		roundBox.x, roundBox.y,
		roundBox.width, roundBox.height
	);
	btnStartContainer.mouseover = function(mouseData) {
		styleBtn.dropShadow = true;
		styleBtn.strokeThickness = 2;        
		roundBox.width = messageStart.width * 1.5;
		roundBox.height = messageStart.height * 1.1;
		roundBox.x += 2;
		roundBox.y += 2;
		messageStart.position.set(
			roundBox.x + roundBox.width / 2 - messageStart.width / 2,
			roundBox.y + roundBox.height / 2 - messageStart.height / 2
		);
	}
	btnStartContainer.mouseout = function(mouseData) {
		styleBtn.dropShadow = false;
		styleBtn.strokeThickness = 1;        
		roundBox.width = messageStart.width * 1.5;
		roundBox.height = messageStart.height * 1.1;
		roundBox.x -= 2;
		roundBox.y -= 2;
		messageStart.position.set(
			roundBox.x + roundBox.width / 2 - messageStart.width / 2,
			roundBox.y + roundBox.height / 2 - messageStart.height / 2
		);
	}
	btnStartContainer.click = function(mouseData) {	
		app.stage.removeChild(btnStartContainer);
		app.stage.removeChild(message);
		gameState = GAME_STATES.InGame_Welcome;	
	}
	btnStartContainer.buttonMode = true;

	objs["start_lblTitle"] = message;
	objs["start_btnPlay"] = btnStartContainer;  
}

function welcomeObjects() {
	//====================== CHARACTER DIALOG //======================
	//  MARUKO SPRITE
	//  Maruko sprite file size = 420x1121
	let spriteW = 420 / 4;    // 105
	let spriteH = 1121 / 10;  // 110    
	let texture = loader.resources["assets/maruko.png"].texture;
	let rect = new Rectangle(0 * spriteW, 0 * spriteH, spriteW, spriteH);  // Defaut greeting
	texture.frame = rect;
	let sprite = new Sprite(texture);
	sprite.width = sprite.width * 1.5;
	sprite.height = sprite.height * 1.5;
  
	//  GREEN CIRCLE AROUND MARUKO
	let circle = new Graphics();
	circle.beginFill(0x00B74F);
	circle.lineStyle(2, 0x000000);
	circle.drawCircle(0, 0, 100);
	circle.endFill();
	circle.x = sprite.x + sprite.width / 2;
	circle.y = sprite.y + sprite.height / 2;

	let container = new Container();
	container.position.set(
		objs.bg.x * 1.4,
		objs.bg.height * 0.45
	); 

	//  DIALOG BALLOON BESIDES MARUKO
	let dialogTexture = loader.resources["assets/dialog_balloon.png"].texture;
	let dialogSprite = new Sprite(dialogTexture);
	let scale = .8
	dialogSprite.scale.x = scale;
	dialogSprite.scale.y = .35;
	dialogSprite.x = 50;
	dialogSprite.y = -200;
  
	//  DISPLAY TEXT INSIDE THE DIALOG BALLOON
	let style = new TextStyle({
		fontFamily: "Candara",
		fontSize: 28,
		fill: "#003AFF",
		stroke: '#000000',
		strokeThickness: 1,
		wordWrap: true, 
		wordWrapWidth: 450
	});
	//let txt = "Hello, I'm Maruko. Welcome to the Cake Factory";
	let txt = i18n.WELCOME;
	let message = new Text(txt, style);
	message.position.set(dialogSprite.x * 3, dialogSprite.y * .6);
  
	//====================== NAVIGATE BUTTON //======================
	//  Nav button label  
	let navBtnStyle = new TextStyle({
		fontFamily: "Tahoma",
		fontSize: 40,
		fill: "#003AFF",  //  mau chu~
		stroke: '#000000'  //  mau` vien` chu~
	});
	let navBtnTxt = new Text(i18n.NEXT, navBtnStyle);  
	//  Start button    
	let roundBox = new Graphics();
	roundBox.lineStyle(1, 0x000000);
	roundBox.beginFill(0xFFFA00);
	roundBox.drawRoundedRect(0, 0, 250, navBtnTxt.height * 1.1, 10);
	roundBox.endFill();
	roundBox.x = window.innerWidth / 2 - roundBox.width / 2;
	roundBox.y = window.innerHeight * .8;    
	navBtnTxt.position.set(
		roundBox.x + roundBox.width / 2 - navBtnTxt.width / 2,
		roundBox.y + roundBox.height / 2 - navBtnTxt.height / 2
	);
	let navBtnContainer = new Container();  
	navBtnContainer.addChild(roundBox);
	navBtnContainer.addChild(navBtnTxt);
	navBtnContainer.interactive = true;
	navBtnContainer.hitArea = new Rectangle(
		roundBox.x, roundBox.y,
		roundBox.width, roundBox.height
	);
	navBtnContainer.mouseover = function(mouseData) {    
		navBtnStyle.strokeThickness = 2;            
		roundBox.beginFill(0x00C67D);
		roundBox.endFill();
		navBtnTxt.position.set(
			roundBox.x + roundBox.width / 2 - navBtnTxt.width / 2,
			roundBox.y + roundBox.height / 2 - navBtnTxt.height / 2
		);
	}
	navBtnContainer.mouseout = function(mouseData) {
		navBtnStyle.dropShadow = false;
		navBtnStyle.strokeThickness = 0;        		
		navBtnTxt.position.set(
			roundBox.x + roundBox.width / 2 - navBtnTxt.width / 2,
			roundBox.y + roundBox.height / 2 - navBtnTxt.height / 2
		);
	}
	navBtnContainer.click = function(mouseData) {    
		if(gameState == GAME_STATES.InGame_Welcome) {			
			objs.txtDialog.text = i18n.INTRODUCTION;
			gameState = GAME_STATES.InGame_Welcome_1;
			objs.ingame_nextBtnTxt.text = i18n.START;
			navBtnTxt.position.set(
				roundBox.x + roundBox.width / 2 - navBtnTxt.width / 2,
				roundBox.y + roundBox.height / 2 - navBtnTxt.height / 2
			);
		} else if(gameState == GAME_STATES.InGame_Welcome_1) {					
			objs.ingame_nextBtnTxt.text = i18n.NEXT;
			gameState = GAME_STATES.InGame_Task_0;
			navBtnTxt.position.set(
				roundBox.x + roundBox.width / 2 - navBtnTxt.width / 2,
				roundBox.y + roundBox.height / 2 - navBtnTxt.height / 2
			);
		} else if(gameState == GAME_STATES.InGame_WA) {			
			gameState = GAME_STATES.InGame_Task_0;
		} else if(gameState == GAME_STATES.InGame_AC) {									
			questionCompleted = (questionCompleted + 1) % MAX_QUESTION_PER_TURN;
			if(questionCompleted == 0) {			
				completedIngredients = [];
				gameState = GAME_STATES.FinishTurn;
				completedCake = question.cake;
			} else {							
				gameState = GAME_STATES.InGame_Task_0;			
			}
		
			question = questionGenerator();	
			updateAnswerButtonTxt();
		} else if(gameState == GAME_STATES.FinishTurn) {			
			completedCake = null;
			gameState = GAME_STATES.InGame_Task_0;
		}
	}
	navBtnContainer.buttonMode = true;
  
	container.addChild(circle, sprite, dialogSprite, message);
	navBtnContainer.addChild(roundBox);
	navBtnContainer.addChild(navBtnTxt);
  
	objs["ingame_maruko"] = container;    
	objs["ingame_nextBtn"] = navBtnContainer;
	objs["ingame_nextBtnBox"] = roundBox;
	objs["ingame_nextBtnTxt"] = navBtnTxt;
	objs["txtDialog"] = message;
}

function taskObjects() {	
	// 1st time question is created
	question = questionGenerator();
	
	//	BUTTON FOR THE ANSWERS	
	objs["task_answers"] = [];
	objs["task_answers_txt"] = [];
	objs["task_answers_roundBox"] = [];
	
	for(let i = 0 ; i < question.answers.length ; i++) {			
		let ans = createAnswerButton(question.answers[i], question.index, i + 1, i);
		objs.task_answers.push(ans);		
	}	
}

function updateAnswerButtonTxt() {
	for(let i = 0 ; i < question.answers.length ; i++) {
		objs.task_answers_txt[i].text = question.answers[i];
		objs.task_answers_txt[i].position.set(
			objs.task_answers_roundBox[i].x + objs.task_answers_roundBox[i].width / 2 - objs.task_answers_txt[i].width / 2,
			objs.task_answers_roundBox[i].y + objs.task_answers_roundBox[i].height / 2 - objs.task_answers_txt[i].height / 2,
		);
	}
}

function createAnswerButton(message, questionIndex, answerIndex, buttonIndex) {	
	//  Button text style
	let btnStyle = new TextStyle({
		fontFamily: "Tahoma",
		fontSize: 40,
		fill: "#003AFF",  //  mau chu~
		stroke: '#000000'  //  mau` vien` chu~
	});
	let navBtnTxt = new Text(message, btnStyle);
	objs.task_answers_txt[buttonIndex] = navBtnTxt;
	
	//  Round box around text
	let roundBox = new Graphics();
	roundBox.lineStyle(1, 0x000000);
	roundBox.beginFill(0xFFFA00);
	roundBox.drawRoundedRect(0, 0, navBtnTxt.width * 1.5, navBtnTxt.height * 1.1, 10);	
	roundBox.drawRoundedRect(0, 0, 350, navBtnTxt.height * 1.1, 10);	
	roundBox.endFill();
	roundBox.x = window.innerWidth / 2 - roundBox.width / 2;
	roundBox.y = window.innerHeight * .6 + buttonIndex * 60;
	navBtnTxt.position.set(
		roundBox.x + roundBox.width / 2 - navBtnTxt.width / 2,
		roundBox.y + roundBox.height / 2 - navBtnTxt.height / 2
	);
	objs.task_answers_roundBox[buttonIndex] = roundBox;
	
	//	CONTAINER FOR THE WHOLE BUTTON
	let container = new Container();  
	container.addChild(roundBox);
	container.addChild(navBtnTxt);
	container.interactive = true;
	container.hitArea = new Rectangle(
		roundBox.x, roundBox.y,
		roundBox.width, roundBox.height
	);
	container.mouseover = function(mouseData) {    
		btnStyle.strokeThickness = 2;            
		roundBox.beginFill(0x00C67D);
		roundBox.endFill();
		navBtnTxt.position.set(
			roundBox.x + roundBox.width / 2 - navBtnTxt.width / 2,
			roundBox.y + roundBox.height / 2 - navBtnTxt.height / 2
		);
	}
	container.mouseout = function(mouseData) {
		btnStyle.dropShadow = false;
		btnStyle.strokeThickness = 0;        		
		roundBox.height = navBtnTxt.height * 1.1;    
		navBtnTxt.position.set(
			roundBox.x + roundBox.width / 2 - navBtnTxt.width / 2,
			roundBox.y + roundBox.height / 2 - navBtnTxt.height / 2
		);
	}
	container.click = function(mouseData) {  		
		let judge = answerAndJudge(question.index, answerIndex);
		
		if(judge == true) {			
			
			let comingIngredient = question.material;
			let push = true;
			for(let i = 0 ; i < completedIngredients.length ; i++) {
				if(completedIngredients[i] == comingIngredient) {
					push = false;
				}
			}
			if(push) completedIngredients.push(question.material);
			gameState = GAME_STATES.InGame_AC;
		} else {
			gameState = GAME_STATES.InGame_WA;
		}
	}
	container.buttonMode = true;
	return container;
}

function cakeObjects() {	
	let materialX = objs.bg.x + objs.bg.width - 100; 
	//	Material						
	let textureEgg = TextureCache["assets/mat_egg.png"];
	let spriteEgg = new Sprite(textureEgg);
	spriteEgg.width = 100;
	spriteEgg.height = 100;		
	let checkEgg = TextureCache["assets/mat_check.png"];
	let spriteEggCheck = new Sprite(checkEgg);
	spriteEggCheck.width = 80;
	spriteEggCheck.height = 80;
	spriteEggCheck.x = materialX - 90;
	spriteEggCheck.y = 500;		
	objs["mat_egg"] = spriteEgg;
	objs["mat_egg_check"] = spriteEggCheck;
	
	let textureChoco = TextureCache["assets/mat_choco.png"];
	let spriteChoco = new Sprite(textureChoco);
	spriteChoco.width = 100;
	spriteChoco.height = 100;	
	objs["mat_choco"] = spriteChoco;
	
	let textureFlour = TextureCache["assets/mat_flour.png"];
	let spriteFlour = new Sprite(textureFlour);
	spriteFlour.width = 100;
	spriteFlour.height = 100;	
	objs["mat_flour"] = spriteFlour;
	
	let textureMilk = TextureCache["assets/mat_milk.png"];
	let spriteMilk = new Sprite(textureMilk);
	spriteMilk.width = 100;
	spriteMilk.height = 100;	
	objs["mat_milk"] = spriteMilk;
	
	let textureSugar = TextureCache["assets/mat_sugar.png"];
	let spriteSugar = new Sprite(textureSugar);
	spriteSugar.width = 100;
	spriteSugar.height = 100;	
	objs["mat_sugar"] = spriteSugar;
		
	let textureEggYolk = TextureCache["assets/mat_egg_yolk.png"];
	let spriteEggYolk = new Sprite(textureEggYolk);
	spriteEggYolk.width = 100;
	spriteEggYolk.height = 100;	
	objs["mat_egg_yolk"] = spriteEggYolk;
	
	//	Product			
	let textureSpongeCake = TextureCache["assets/kuchen_sponge_cake.png"];
	let spriteSpongeCake = new Sprite(textureSpongeCake);
	spriteSpongeCake.width *= .075;
	spriteSpongeCake.height *= .075;
	spriteSpongeCake.x = window.innerWidth / 2 - spriteSpongeCake.width / 2;
	spriteSpongeCake.y = window.innerHeight * .55;
	objs["kuchen_sponge"] = spriteSpongeCake;
	
	let textureChocoCake = TextureCache["assets/kuchen_choco_cake.png"];
	let spriteChocoCake = new Sprite(textureChocoCake);
	spriteChocoCake.width *= .15;
	spriteChocoCake.height *= .15;
	spriteChocoCake.x = window.innerWidth / 2 - spriteChocoCake.width / 2;
	spriteChocoCake.y = window.innerHeight * .55;
	objs["kuchen_choco"] = spriteChocoCake;
}

function endGameObjects() {
	let btnWidth = 100;
	//  Yes button  
	let yBtnStyle = new TextStyle({
		fontFamily: "Tahoma",
		fontSize: 40,
		fill: "#003AFF",  //  mau chu~
		stroke: '#000000'  //  mau` vien` chu~
	});
	let yesBtnTxt = new Text(i18n.YES, yBtnStyle);  	
	let roundBoxY = new Graphics();
	roundBoxY.lineStyle(1, 0x000000);
	roundBoxY.beginFill(0xFFFA00);
	roundBoxY.drawRoundedRect(0, 0, btnWidth, yesBtnTxt.height * 1.1, 10);
	roundBoxY.endFill();
	roundBoxY.x = window.innerWidth *.4 - roundBoxY.width / 2;
	roundBoxY.y = window.innerHeight * .8;    	
	yesBtnTxt.position.set(
		roundBoxY.x + roundBoxY.width / 2 - yesBtnTxt.width / 2,
		roundBoxY.y + roundBoxY.height / 2 - yesBtnTxt.height / 2
	);
	let yBtnContainer = new Container();  
	yBtnContainer.addChild(roundBoxY, yesBtnTxt);	
	yBtnContainer.interactive = true;
	yBtnContainer.buttonMode = true;
	yBtnContainer.hitArea = new Rectangle(
		roundBoxY.x, roundBoxY.y,
		roundBoxY.width, roundBoxY.height
	);
	yBtnContainer.mouseover = function(mouseData) {    
		yBtnStyle.strokeThickness = 2;            
		roundBoxY.beginFill(0x00C67D);
		roundBoxY.endFill();
		yesBtnTxt.position.set(
			roundBoxY.x + roundBoxY.width / 2 - yesBtnTxt.width / 2,
			roundBoxY.y + roundBoxY.height / 2 - yesBtnTxt.height / 2
		);
	}
	yBtnContainer.mouseout = function(mouseData) {
		yBtnStyle.dropShadow = false;
		yBtnStyle.strokeThickness = 0;        		
		yesBtnTxt.position.set(
			roundBoxY.x + roundBoxY.width / 2 - yesBtnTxt.width / 2,
			roundBoxY.y + roundBoxY.height / 2 - yesBtnTxt.height / 2
		);
	}
	yBtnContainer.click = function(mouseData) {    		
		gameState = GAME_STATES.InGame_Welcome_1;
		objs.txtDialog.text = i18n.INTRODUCTION;
		completedCake = null;
		objs.ingame_nextBtnTxt.text = i18n.START;
		objs.ingame_nextBtnTxt.position.set(
			objs.ingame_nextBtnBox.x + objs.ingame_nextBtnBox.width / 2 - objs.ingame_nextBtnTxt.width / 2,
			objs.ingame_nextBtnBox.y + objs.ingame_nextBtnBox.height / 2 - objs.ingame_nextBtnTxt.height / 2
		);
	}	
	
	//  No button 
	let nBtnStyle = new TextStyle({
		fontFamily: "Tahoma",
		fontSize: 40,
		fill: "#003AFF",  //  mau chu~
		stroke: '#000000'  //  mau` vien` chu~
	}); 	
	let noBtnTxt = new Text(i18n.NO, nBtnStyle);  	
	let roundBoxN = new Graphics();
	roundBoxN.lineStyle(1, 0x000000);
	roundBoxN.beginFill(0xFFFA00);
	roundBoxN.drawRoundedRect(0, 0, btnWidth, noBtnTxt.height * 1.1, 10);
	roundBoxN.endFill();
	roundBoxN.x = window.innerWidth *.6 - roundBoxN.width / 2;
	roundBoxN.y = window.innerHeight * .8;    	
	noBtnTxt.position.set(
		roundBoxN.x + roundBoxN.width / 2 - noBtnTxt.width / 2,
		roundBoxN.y + roundBoxN.height / 2 - noBtnTxt.height / 2
	);
	let nBtnContainer = new Container();  
	nBtnContainer.addChild(roundBoxN, noBtnTxt);	
	nBtnContainer.interactive = true;
	nBtnContainer.buttonMode = true;
	nBtnContainer.hitArea = new Rectangle(
		roundBoxN.x, roundBoxN.y,
		roundBoxN.width, roundBoxN.height
	);
	nBtnContainer.mouseover = function(mouseData) {    
		nBtnStyle.strokeThickness = 2;            
		roundBoxN.beginFill(0x00C67D);
		roundBoxN.endFill();
		noBtnTxt.position.set(
			roundBoxN.x + roundBoxN.width / 2 - noBtnTxt.width / 2,
			roundBoxN.y + roundBoxN.height / 2 - noBtnTxt.height / 2
		);
	}
	nBtnContainer.mouseout = function(mouseData) {
		nBtnStyle.dropShadow = false;
		nBtnStyle.strokeThickness = 0;        		
		noBtnTxt.position.set(
			roundBoxN.x + roundBoxN.width / 2 - noBtnTxt.width / 2,
			roundBoxN.y + roundBoxN.height / 2 - noBtnTxt.height / 2
		);
	}
	nBtnContainer.click = function(mouseData) {    		
		gameState = GAME_STATES.Start;
		objs.txtDialog.text = i18n.INTRODUCTION;
		completedCake = null;		
	}
	
	objs["yes_btn"] = yBtnContainer;
	objs["no_btn"] = nBtnContainer;
}

function changeMarukoLook(i, j) {
	let spriteW = 420 / 4;    // 105
	let spriteH = 1121 / 10;  // 110 
	let texture = loader.resources["assets/maruko.png"].texture;
	let rect = new Rectangle(i * spriteW, j * spriteH, spriteW, spriteH);  // Defaut greeting
	texture.frame = rect;	
}

function getMarukoSprite(state) {  
	//  Maruko sprite file size = 420x1121
	let spriteW = 420 / 4;    // 105
	let spriteH = 1121 / 10;  // 110
    
	let texture = loader.resources["assets/maruko.png"].texture;
	let rect = new Rectangle(state[1] * spriteW, state[0] * spriteH, spriteW, spriteH);  
	texture.frame = rect;  
}