
// function sticky_scroll() {
//     if (window.pageYOffset >= sticky) {
//         navbar.classList.add("sticky")
//         loginbar.classList.add("sticky2")
//     } else {
//         navbar.classList.remove("sticky");
//         loginbar.classList.remove("sticky2");
//     }
// }




function close_modal() {
    modal.style.display = "none";
}

function validateLogin() {
    let x = document.forms["loginForm"]["adminpassword"].value;
    if (x != "CorrectPassword") {
        window.alert("Incorrect Password");
    }
};

const quiz_data = {
    "question1": { "question": "What is 5 + 25?", "answer": 30 },
    "question2": { "question": "What is 18/3?", "answer": 6 }

}

function markQuiz() {
    console.log(quiz_data.question1.answer)
    let answers = [undefined, 30, 6]
    let score = 0
    let username = document.forms["quiz"]["name"].value;
    let userAns = document.forms["quiz"];

    for (let i = 1; i < document.forms["quiz"].length - 1; i++) {
        if (userAns[i].value == answers[i]) {
            score += 1
        }
    }
    document.getElementById("outputbox").innerHTML += (username + " your score is " + score);



}

