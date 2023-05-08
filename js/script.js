let index = 0;
let attempt = 0;
let score = 0;
let wrong = 0;
let getScore = 0;
let question = quiz.sort(function () {
    return 0.5 - Math.random();
});
let totalQuestion = question.length;


$(function () {
    let totalTime = 180;
    let min = 0;
    let sec = 0;
    let counter = 0;
    let time = setInterval(function () {
        counter++;
        min = Math.floor((totalTime - counter) / 60);
        sec = totalTime - (min * 60) - counter;

        $(".timerBox span").text(min + ":" + sec);
        if (counter == totalTime) {
            alert("Time's up. Press ok to show the result");
            result();
            clearInterval(timer);
        }
    }, 1000);
    printQuestion(index);

});

function printQuestion(i) {
    $(".questionBox").text(question[i].question); 
    $(".optionBox span").eq(0).text(question[i].option[0]);
    $(".optionBox span").eq(1).text(question[i].option[1]);
    $(".optionBox span").eq(2).text(question[i].option[2]);
    $(".optionBox span").eq(3).text(question[i].option[3]);
}

//function to check answer
function checkAnswer(option) {
    attempt++;

    let optionClicked = $(option).data("opt");

    if (optionClicked == question[index].answer) {
        $(option).addClass("right");
        score++;
        getScore++;
    } else {
        $(option).addClass("wrong");
        wrong++;
    }

    $(".scoreBox span").text(score);
    $(".resultBox span#scoreQuiz").text(getScore);

    $(".optionBox span").attr("onclick", "");

}

//function for next button

function showNext() {
    if (index >= (question.length - 1)) {
        showResult(0);
        return;
    }
    index++;
    $(".optionBox span").removeClass();
    $(".optionBox span").attr("onclick", "checkAnswer(this)");

    printQuestion(index);
}


//function for result
function showResult(j) {
    if (j == 1 &&
        index < question.length - 1 &&
        !confirm("Quiz has not finished yet"
        )
    ) {
        return;
    }
    result();

}

//result function alert
function result() {
    $("#questionScreen").hide();
    $("#resultScreen").show();

    $("#totalQuestion").text(totalQuestion);
    $("#attemptQuestion").text(attempt);
    $("#correctAnswers").text(score);
    $("#wrongAnswers").text(wrong);
    $("#scoreQuiz").text(getScore);
}