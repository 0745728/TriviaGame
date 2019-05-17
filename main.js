var panel = $("#quiz-area");

var countStartNumber = 15;

// Question set
var questions = [
    
    {
        question: "What was the first animated disney movie in this decade?",
        answers: ["The Little Mermaid" , "The Fox and the Hound" , "The Jungle Book" , "The Lion King"],
        correctAnswer: "The Fox and the Hound",
        image: "assests/the fox and the hound.jpg"
    },

    {
        question: "What country are the muppets from the movie The Great Muppet Caper?",
        answers: ["United States" , "New Zealand" , "United Kingdom" , "Canada"],
        correctAnswer: "United Kingdom",
        image: "assests/united kingdom.jpg"
    },

    {
        question: "Which member of the Beatles was assassinated in 1980?",
        answers: ["George Harrison" , "Ringo Starr" , "John Lennon" , "Paul McCartney"],
        correctAnswer: "John Lennon",
        image: "assests/John_Lennon_1969_(cropped).jpg"
    },

    {
        question: "What game emerged in 1980??",
        answers: ["Snatcher" , "Super Mario" , "Pokemon" , "Pac-Man"],
        correctAnswer: "Pac-Man",
        image: "assests/pac-man.png"
    },

    {
        question: "What is the name of Popeye's girlfriend?",
        answers: ["Olive Oyl" , "Princess Fiona" , "Minnie Mouse" , "Elsa"],
        correctAnswer: "Olive Oyl",
        image: "assests/popeye.jpg"
    },


]

// Variable to hold our setInterval
var timer;

var game = {

    questions: questions,
    currentQuestion: 0,
    counter: countStartNumber,
    correct: 0,
    incorrect: 0,

    countdown: function() {
        game.counter--;
        $("#counter-number").html(game.counter);
        if (game.counter === 0) {
            console.log("TIME UP");
            game.timeUp();
        }
    },

    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++)
        {
            panel.append("<button class='answer-button' id='button' data-name=' " +
            questions[this.currentQuestion].answers[i] +
            "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
    },

    nextQuestion: function() {
        game.counter = countStartNumber;
        $("#counter-number").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },

    timeUp: function() {
        
        clearInterval (timer);

        $("#counter-number").html(game.counter);
        panel.html("<h2>Out of Time!</h2>");
        panel.append("<h3> The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
        panel.append("<img src= '" + questions[this.currentQuestion].image + "'/>");

        if (game.currentQuestion === questions.length - 1)
        {
            setTimeout(game.results, 3 * 1000);
        }
        else
        {
            setTimeout(game.nextQuestion, 3 * 1000);
        }
        
    },

    results: function() {

        clearInterval(timer);

        panel.html("<h2>All done, here's how you did!</h2>");

        $("#counter-number").html(game.counter);

        panel.append("<h3>Corect Answers: " + game.correct + "</h3>");
        panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>")
        panel.append("<h3>Unanswered " +(questions.length - (game.correct + game.incorrect)) + "</h3>")
        panel.append("<br><button id= 'start-over'>Start Over?</button>");
    
    },

    clicked: function(e) {

        clearInterval(timer);

        if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer)
        {
            this.answeredCorrectly();
        }
        else
        {
            this.answeredIncorrectly();
        }
    },

    answeredIncorrectly: function()  {

    game.incorrect++;

        clearInterval(timer);

        panel.html("<h2>Nope!</h2>");
        panel.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].correctAnswer + "</h3>");
        panel.append("<img src='" + questions[game.currentQuestion].image + "'/>" );


        if (game.currentQuestion === questions.length - 1)
    {
        setTimeout(game.results, 3 * 1000);
    }
    else
    {
        setTimeout(game.nextQuestion, 3 * 1000);
    }

    },

    answeredCorrectly: function() {

        game.correct++;

        clearInterval(timer);

        panel.html("<h2>Correct!</h2>");
        panel.append("<img src='" + questions[game.currentQuestion].image + "'/>" );

        if (game.currentQuestion === questions.length - 1)
        {
            setTimeout(game.results, 3 * 1000);
        }
        else
        {
            setTimeout(game.nextQuestion, 3 * 1000);
        }


    },

        reset: function() {

            this.currentQuestion =0;
            this.counter = countStartNumber;
            this.correct =0;
            this.incorrect =0;
            this.loadQuestion();
        }

};


// CLICK EVENTS
// ----------------------------------------------------------------
$(document).on("click", "#start-over", function() {

    game.reset();

});

$(document).on("click", ".answer-button", function(e) {
    game.clicked(e);

});

$(document).on("click", "#start", function() {
    $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>15 </span> Seconds</h2>");
    game.loadQuestion();
    
});
