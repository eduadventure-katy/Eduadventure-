const quizData = [
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language","Home Tool Markup Language","Hyperlinks and Text Markup Language"], answer: "Hyper Text Markup Language" },
  { question: "Which property changes text color in CSS?", options: ["font-color","color","text-color"], answer: "color" },
  { question: "Which keyword is used to declare a variable in JS?", options: ["let","var","const","All of the above"], answer: "All of the above" }
];

let current = 0, score = 0;
const q = document.getElementById('question');
const o = document.getElementById('options');
const n = document.getElementById('next-btn');
const s = document.getElementById('score');

function loadQuestion(){
  o.innerHTML = "";
  const qData = quizData[current];
  q.textContent = qData.question;
  qData.options.forEach(opt=>{
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.classList.add('btn');
    btn.onclick = ()=>checkAnswer(opt);
    o.appendChild(btn);
  });
}

function checkAnswer(opt){
  if(opt === quizData[current].answer){
    score++;
    alert("✅ Correct!");
  } else {
    alert("❌ Wrong!");
  }
  n.style.display = "block";
}

n.addEventListener('click', ()=>{
  current++;
  if(current < quizData.length){
    loadQuestion();
    n.style.display = "none";
  } else {
    document.querySelector('#quiz-box').innerHTML = `<h3>Quiz Completed!</h3><p>Score: ${score}/${quizData.length}</p>`;
  }
});

window.onload = ()=>{
  loadQuestion();
  n.style.display = "none";
};