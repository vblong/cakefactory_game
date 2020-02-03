let questions = [];
let index = 0;

function questionGenerator() {
	
	// Choose one	
	let res = questions[getQuestionIndex(questions.length)];	
	return res;
};

function getQuestionIndex(questionLength) {	
	let res = (index++) % questionLength;	
	return res;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function answerAndJudge(questionIndex, answerIndex) {	
	for(let i = 0 ; i < questions.length ; i++ ){
		if(questions[i].index == questionIndex) {
			if(questions[i].correctIndex == answerIndex) {				
				return true;				
			} else {				
				return false;				
			}
		}
	}
	//	DOES NOT FIND ANY QUESTION
	console.log(true, false);
	return false;
}