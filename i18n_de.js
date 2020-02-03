let I18N_DE = {
	"TITLE"			: "Kuchen Backen mit Maruko",
	"WELCOME" 		: "Hallo ich heiße Maruko. Willkommen zum Kuchen backen!",
	"INTRODUCTION"	: "Beantworte die Fragen korrekt. Wenn du eine richtige Antwort gibst, dann erhälst du eine Zutat für den Kuchen!",
	"CORRECT_ANS"	: "Ja wohl, das ist richtig. Lass uns zur nächsten Zutat gehen",
	"WRONG_ANS"		: "Das sieht nicht nach einer richtigen Antwort aus, versuchen wir es noch einmal",
	"FINISH_TURN"	: "Hervorragend! Das hast du toll gemacht! Möchtest du noch einmal spielen?",
	"PLAY" 			: "Spiel",
	"START"			: "Los geht’s",
	"NEXT" 			: "Weiter",
	"YES"			: "Ja",
	"NO"			: "Nein"
}

let questions_de = [
	//	SET 1
	{		
		"index": 1,
		"txt" : "Rechne 1 Kg Mehl in Gramm um",
		"answers" : ["100 gr", "10 gr", "1000 gr"],
		"correctIndex": 3,
		"material" : "mat_flour",
		"cake" : "kuchen_sponge"
	},
	{
		"index": 2,
		"txt": "Du hast 6 Eier. Wie viele mehr brauchst du, bis du ein Dutzend hast?",
		"answers" : ["3 mehr", "6 mehr", "9 mehr"],
		"correctIndex": 2,
		"material" : "mat_egg",
		"cake" : "kuchen_sponge"
	},
	{
		"index": 3,
		"txt": "Wir brauchen 1 Liter Milch im Becher. Wir haben bereist 150 ml hereingetan. Wie viel mehr brauchen wir noch?",
		"answers": ["850 ml", "einen halben liter", "1000 ml"],
		"correctIndex" : 1,
		"material" : "mat_milk",
		"cake" : "kuchen_sponge"
	},
	
	// SET 2
	{		
		"index": 4,
		"txt" : "Wir brauchen 0.2 kg Schokopulver. Wie viel ist das in Gramm?",
		"answers" : ["2000 gr", "200 gr", "20 gr"],
		"correctIndex": 2,
		"material" : "mat_choco",
		"cake" : "kuchen_choco"
	},
	{
		"index": 5,
		"txt": "Wir brauchen 3 Eier. In der Schüssel sind bereits 3 Eiweiß und 2 Eigelb. Was fehlt da noch?",
		"answers" : ["1 Eigelb", "1 Eiweiß", "1 Ei"],
		"correctIndex": 1,
		"material" : "mat_egg_yolk",
		"cake" : "kuchen_choco"
	},
	{
		"index": 6,
		"txt": "60g Zucker reichen für 3 Leute. Wie viel Zucker brauchen wir für 10 Leute?",
		"answers": ["ein halbes Kilo", "100 gr", "0.2 kg"],
		"correctIndex" : 3,
		"material" : "mat_sugar",
		"cake" : "kuchen_choco"
	}
];