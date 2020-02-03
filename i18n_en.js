let I18N_EN = {
	"WELCOME" 		: "Hello, I'm Maruko. Welcome to the Cake Factory",
	"INTRODUCTION"	: "Answer the question correctly to get the ingredient for your cake",
	"CORRECT_ANS"	: "That's a correct answer, well done. Let's get to the next ingredient",
	"WRONG_ANS"		: "That does not look like a correct answer, let's try again",
	"FINISH_TURN"	: "Well done. Our cake is completed. Click \"Next\" to start another cake.",
	"PLAY" 			: "Play",
	"NEXT" 			: "Next",
}

let questions_en = [
	//	SET 1
	{		
		"index": 1,
		"txt" : "Convert 1 KG of flour into Grams",
		"answers" : ["100 gr", "10 gr", "1000 gr"],
		"correctIndex": 3
	},
	{
		"index": 2,
		"txt": "We have 6 eggs, how many more do we need to have a dozen?",
		"answers" : ["3 more", "6 more", "9 more"],
		"correctIndex": 2
	},
	{
		"index": 3,
		"txt": "We need 1 liter of milk, we already have 150ml. How much more do we need?",
		"answers": ["850 ml", "half liter", "1000ml"],
		"correctIndex" : 1
	},
	
	// SET 2
	{		
		"index": 4,
		"txt" : "We need 0.2 kg choco powder. How much is it in grams?",
		"answers" : ["2000 gr", "200 gr", "2 gr"],
		"correctIndex": 2
	},
	{
		"index": 5,
		"txt": "We need 3 eggs and there are already 3 white egg yolks and 2 yellow egg yolks, what should we need more?",
		"answers" : ["1 yellow yolk", "1 white yolk", "1 egg"],
		"correctIndex": 1
	},
	{
		"index": 6,
		"txt": "Every 60 gr of sugar can serve 3 people. How much sugar we need to serve 10 people?",
		"answers": ["180 gr", "100 gr", "0.2 kg"],
		"correctIndex" : 3
	}
];