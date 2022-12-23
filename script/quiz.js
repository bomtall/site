
// Define arrays to hold quiz data
var questions = [];
var options = [];
var answers = [];

// Get elements to put data into
var optionlabels = document.getElementsByClassName("quizRadioLabels")
var qlabels = document.getElementsByClassName("questionLabels")


var getAnswers = false

//Get the quiz data json object and pass to loadQuiz function
const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function () {

    if (getAnswers) {
        markQuiz(JSON.parse(this.responseText));
    } else {
        loadQuiz(JSON.parse(this.responseText));
    }



};

xmlhttp.open("GET", "https://raw.githubusercontent.com/bomtall/site/main/json/quiz_data.json");
xmlhttp.send();



//Load the quiz questions and possible answers into the elements
function loadQuiz(data) {

    for (const [key, value] of Object.entries(data)) {

        console.log(key);
        console.log(value);

        questions.push(value.question);
        answers.push(value.answer);

        console.log(value.question);
        console.log(value.answer);

        console.log(value.options);

        for (i = 0; i < value.options.length; i++) {
            options.push(value.options[i])
        }

    }

    for (let i = 0; i < qlabels.length; i++) {
        qlabels[i].innerHTML = questions[i]
    }


}



function loadAnswers() {
    getAnswers = true;

    xmlhttp.open("GET", "https://raw.githubusercontent.com/bomtall/site/main/json/quiz_data.json");
    xmlhttp.send();
}




function markQuiz(data) {

    let answers = []

    for (const [key, value] of Object.entries(data)) {
        console.log(`${key}: ${value}`);

        console.log(value['real_answer']);

        answers.push(value['real_answer'])


    }

    let score = 0

    for (i = 0; i < answers.length; i++) {

        //look up which answer is checked for each question
        //compare to real answer in answers list above



    }

    console.log(answers)


}


