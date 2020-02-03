//Aliases
let Application     = PIXI.Application,
loader              = PIXI.loader,
resources           = PIXI.loader.resources,
Sprite              = PIXI.Sprite,
Rectangle           = PIXI.Rectangle,
TextureCache        = PIXI.TextureCache,
Graphics            = PIXI.Graphics,
Text                = PIXI.Text,
TextStyle           = PIXI.TextStyle,
Container           = PIXI.Container;

//  CONSTANTS
const GAME_STATES = {
    "Start"     : 1, 
    "InGame_Welcome"   : 2,			// Display "welcome to the cake factory
	"InGame_Welcome_1" : 22,		// Display "Answer the question correctly"
    "InGame_Task_0"    : 3,    		// Display question text and answers
	"InGame_WA"			: 31,		// Display "you answered wrong"
	"InGame_AC"			: 32,		// Display "you answered correct"
	"InGame_FinishTurn" : 33,
    "InGame3"   : 4     //
}

//  IMAGES STORAGES
let imgs = [];

//  SPRITE OBJECTS
// let maru1 = null;
// let maru_intro = null;
let objs = [];

//  APPLICATION OBJECT
let app = null;

//  OTHER VARIABLES
let g_TICK = 40; // 1000/40 = 25 frames per second
let g_Time = 0;
let gameState = GAME_STATES.InGame_Welcome;
gameState = GAME_STATES.Start;

const LANGUAGE = {
	"DEUTSCH" : 1,
	"ENGLISH" : 2
}
let GAME_LANGUAGE = LANGUAGE.DEUTSCH;
let i18n = I18N_EN;
let AUDIOON = false;

function init() {
    let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
        type = "canvas"
    }

    PIXI.utils.sayHello(type)    

    //  CREATE APPLICATION OBJECT
    app = new Application({ 
        width: 256, 
        height: 256,                       
        antialias: true, 
        transparent: false, 
        resolution: 1
        }
    );

    // app.renderer.backgroundColor = 0x061639;
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);    

    //Add the canvas that Pixi automatically created for you to the HTML document
    document.body.appendChild(app.view);

    //load an image and run the `setup` function when it's done
    loader.add([
	//	BACKGROUND
        "assets/background_1.jpg",
		
		// MC
        "assets/maruko.png",
        "assets/dialog_balloon.png",
		
		// MATERIAL
		"assets/mat_egg.png",
		"assets/mat_choco.png",
		"assets/mat_flour.png",
		"assets/mat_milk.png",
		"assets/mat_sugar.png",
		"assets/mat_egg_yolk.png",
		
		// CHECK MARK
		"assets/mat_check.png", 
		
		// CAKE
		"assets/kuchen_sponge_cake.png",
		"assets/kuchen_choco_cake.png"
    ]).load(setup);  	
}

function playSound() {
	let song = document.getElementById("myAudio");
	if(!song.paused || song.currentTime) {	
		AUDIOON = true;	
	} else {
		let promise = song.play(); 			
		if (promise) {
			promise.catch(function(err) {});
			
			promise.then(_ => {			
				x.play();
			}).catch(error => { });			
		}
	}
}

//This `setup` function will run when the image has loaded
function setup() {      
	// SET QUESTIONS SET BASE
	if(GAME_LANGUAGE == LANGUAGE.ENGLISH) {
		questions = questions_en;
		i18n = I18N_EN;
	} else {
		questions = questions_de;
		i18n = I18N_DE;
	}	

    //  LOAD BACKGROUND    
    let bg = new Sprite(resources["assets/background_1.jpg"].texture);
    bg.x = window.innerWidth / 2 - bg.width / 2;
    bg.y = window.innerHeight / 2 - bg.height / 2;
    window.addEventListener("resize", function(event) {
        //  RECENTER BACKGROUND
        bg.x = window.innerWidth / 2 - bg.width / 2;
        bg.y = window.innerHeight / 2 - bg.height / 2;
    });    
        
    objs["bg"] = bg;
    app.stage.addChild(bg);                  // Uncomment to display background

    createObjects();

    app.ticker.add(delta => gameLoop(delta));

    app.renderer.render(app.stage);	
	
	let song = document.getElementById("myAudio");
	song.loop = true;
}

function gameLoop(delta) {
    //  LIMIT FPS
    let timeNow = (new Date()).getTime();
    let timeDiff = timeNow - g_Time;
    if (timeDiff < g_TICK)
        return;
    g_Time = timeNow;	
		
	// 	START
    if(gameState == GAME_STATES.Start) {
		prepareAllChild();
	
        app.stage.addChild(objs.start_lblTitle);
        app.stage.addChild(objs.start_btnPlay);
    } else if(gameState == GAME_STATES.InGame_Welcome || gameState == GAME_STATES.InGame_Welcome_1) {
	//	WELCOME
		prepareAllChild();
		
		changeMarukoLook(0, 0);
		
        app.stage.addChild(objs.ingame_maruko);
		app.stage.addChild(objs.ingame_nextBtn);
    } else if(gameState == GAME_STATES.InGame_Task_0) {		
	
		prepareAllChild();		
		
		changeMarukoLook(0, 2);
		
		objs.txtDialog.text = question.txt;
		
		app.stage.addChild(objs.ingame_maruko);
		for(let i = 0 ; i < objs.task_answers.length; i++){
			app.stage.addChild(objs.task_answers[i]);
		}	
	} else if(gameState == GAME_STATES.InGame_WA) {
		prepareAllChild();
		
		changeMarukoLook(1, 0);		
		objs.txtDialog.text = i18n.WRONG_ANS;
		app.stage.addChild(objs.ingame_maruko);
		app.stage.addChild(objs.ingame_nextBtn);
	} else if(gameState == GAME_STATES.InGame_AC) {
		prepareAllChild();
		
		changeMarukoLook(1, 2);		
		objs.txtDialog.text = i18n.CORRECT_ANS;
		app.stage.addChild(objs.ingame_maruko);
		app.stage.addChild(objs.ingame_nextBtn);
	} else if(gameState == GAME_STATES.FinishTurn) {
		prepareAllChild();
		
		changeMarukoLook(3, 1);		
		objs.txtDialog.text = i18n.FINISH_TURN;
		app.stage.addChild(objs.ingame_maruko);
		app.stage.addChild(objs.yes_btn);
		app.stage.addChild(objs.no_btn);		
	}	
}

function prepareAllChild() {
	//	Clear everything
	for (let i = app.stage.children.length - 1; i >= 0; i--) {	
		app.stage.removeChild(app.stage.children[i]);
	}
	
	//	Draw background
	app.stage.addChild(objs.bg);	
	
	//	Draw completed ingredients
	let matX = objs.bg.x + objs.bg.width - 100; 
	for(let i = 0 ; i < completedIngredients.length ; i++) {		
		let ing = objs[completedIngredients[i]];
		ing.x = matX;
		ing.y = i * 100 + 20;
		app.stage.addChild(ing);
	}	
	
	//	Draw cake if finished
	if(completedCake != null) {
		app.stage.addChild(objs[completedCake]);
	}		
	
	//	Play song if not play yet
	if(!AUDIOON)
		playSound();
}


