$(function() {
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');

    //The next thing our quiz needs are some questions to display. 
    //We’ll use object literals to represent the individual questions and an array to hold all of the questions that make up our quiz. 
    //Using an array will make the questions easy to iterate over.

    const myQuestions = [
        {
          question: "Who is the strongest?",
          answers: {
            a: "Superman",
            b: "The Terminator",
            c: "Waluigi, obviously"
          },
          correctAnswer: "c"
        },
        {
          question: "What is the best site ever created?",
          answers: {
            a: "SitePoint",
            b: "Simple Steps Code",
            c: "Trick question; they're both the best"
          },
          correctAnswer: "c"
        },
        {
          question: "Where is Waldo really?",
          answers: {
            a: "Antarctica",
            b: "Exploring the Pacific Ocean",
            c: "Sitting in a tree",
            d: "Minding his own business, so stop asking"
          },
          correctAnswer: "d"
        }
      ];

    function buildQuiz(){
        // we'll need a place to store the HTML output
        const output = [];

        //Array.forEach() //The forEach() method executes a provided function once for each array element.

        myQuestions.forEach(
            //An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target. 
            //These function expressions are best suited for non-method functions, and they cannot be used as constructors.


            //For brevity, we’re using an arrow function to perform our operations on each question. Because this is in a forEach loop, 
            //we get the current value, the index (the position number of the current item in the array), 
            //and the array itself as parameters. We only need the current value and the index, which for our purposes, 
            //we’ll name currentQuestion and questionNumber respectively.

            (currentQuestion, questionNumber) => {
                // we'll want to store the list of answer choices
                const answers = [];

                // and for each available answer...

                //The for...of statement creates a loop iterating over iterable objects (including the built-in String, Array, e.g. the Array-like arguments or NodeList objects, 
                //TypedArray, Map and Set, and user-defined iterables), 
                //invoking a custom iteration hook with statements to be executed for the value of each distinct property of the object.
                for(letter in currentQuestion.answers) {
                    // console.log(currentQuestion.answers[letter]);
                    // ...add an HTML radio button
                    answers.push(
                        `<label>
                          <input type="radio" class="radioButton" name="question-${questionNumber}" value="${letter}">
                          ${letter} :
                          ${currentQuestion.answers[letter]}
                        </label>`
                      );
                }
                
                //add this question and its answers to the output
                output.push(
                    `<div class="question"> ${currentQuestion.question} </div>
                     <div class="answers"> ${answers.join('')} </div>` //The join() method joins all elements of an array (or an array-like object) into a string and returns this string.
                );
            }
        );

            // finally combine our output list into one string of HTML and put it on the page
            quizContainer.innerHTML = output.join('');
    }

    function showResults(){

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');
        // console.log(answerContainers);
        // keep track of user's answers
        let numCorrect = 0;
      
        // for each question...
        myQuestions.forEach( (currentQuestion, questionNumber) => {
    //   console.log(questionNumber);
          // find selected answer
          const answerContainer = answerContainers[questionNumber];
          const selector = 'input[name=question'+questionNumber+']:checked';
          // const kurSelected = answerContainer.querySelector('.kur');
          // const bu = (answerContainer.querySelector('.kur:checked').value);
          // const userAnswer = (answerContainer.querySelector('.kur:checked').value || {}).value;
          const userAnswer = (answerContainer.querySelector('.radioButton:checked').value) || '';
          // console.log(bu);
          // console.log(kurSelected);
          // console.log(userAnswer);
          
          // console.log(answerContainer.querySelector('.kur'));
          
          // if answer is correct
          if(userAnswer===currentQuestion.correctAnswer){
            // add to the number of correct answers
            // console.log('correct answer');
            numCorrect++;
      
            // color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
            
          }
          // if answer is wrong or blank
          else{
            // color the answers red
            answerContainers[questionNumber].style.color = 'red';
            // console.log('wrong answer');
          }
        });
      
        // show number of correct answers out of total
        resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;
      }

    // display quiz right away
    buildQuiz();

    // on submit, show results
    submitButton.addEventListener('click', showResults); //The addEventListener() method attaches an event handler to an element without overwriting existing event handlers.
});