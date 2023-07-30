
const apiUrl = 'https://opentdb.com/api.php?amount=10&category=30&type=multiple';




const button = document.getElementById('btn');
const quizContainer = document.getElementById('quiz-container');
const displayResult = document.getElementById('result')

let questionList, currentQuestion;

function fetchQuestions() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      questionList = data.results;
      currentQuestion = 0;
      showQuestion();
    })
    .catch(error => {
      console.error('Error fetching questions:', error);
    });
}

function showQuestion() {
  const questionData = questionList[currentQuestion];
  document.getElementById('question').innerHTML = 'Question: ' + questionData.question;

  quizContainer.innerHTML = '';

  const allAnswers = [...questionData.incorrect_answers, questionData.correct_answer];
  shuffleArray(allAnswers);

  allAnswers.forEach(answer => {
    const option = document.createElement('div');
    option.innerHTML = `
      <input type="radio" name="answer" value="${answer}">
      <label>${answer}</label>
    `;
    quizContainer.appendChild(option);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

var results = 0;

function clickBtn() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    const userAnswer = selectedAnswer.value;
    const correctAnswer = questionList[currentQuestion].correct_answer;
    if (userAnswer === correctAnswer) {
      results++
      console.log('Correct! Moving to the next question...');
      showAlert('Correct')
    } else {
      
      console.log('Incorrect!');
      showAlert('Incorrect!');
    }

    displayResult.innerHTML = results
    

    currentQuestion++;
    if (currentQuestion < questionList.length) {
      setTimeout(() => showQuestion(), 1000); // Display next question after 1 second
    } else {
      console.log('Quiz Completed!'); // Show quiz completion message
    }
  } else {
    console.log('Please select an answer.'); // Show error message if no answer selected
  }
}

function showAlert(message) {
  const alertBox = document.createElement('div');
  alertBox.classList.add('alert');
  alertBox.textContent = message;
  if(message === 'Incorrect!') {
    alertBox.style.backgroundColor = 'red';
  } else {
    alertBox.style.backgroundColor = 'green';
  }
  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 3000); // Remove the alert after 3 seconds
}

function finish() {
  let message1 = "You scored ";
  let final = message1 +  results.toString();
  alert(final);
  window.location.reload(true);
}

button.addEventListener('click', clickBtn);
fetchQuestions();
