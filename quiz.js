/* ══════════════════════════════════════════════
   오늘도 커마카세 — quiz.js
   질문 진행 로직 (랜덤 5개)
   버튼 안 눌리거나 질문 안 뜨는 오류 → 이 파일 확인!
══════════════════════════════════════════════ */

let step = 0;
let answers = []; // 선택한 태그 누적 배열

function init() {
  step = 0;
  answers = [];
  initQuestions(); // data.js에서 랜덤 5개 뽑기
  document.getElementById('quiz-screen').style.display = 'block';
  document.getElementById('result-screen').style.display = 'none';
  renderQuestion();
}

function renderProgress() {
  const wrap = document.getElementById('progress');
  wrap.innerHTML = QUESTIONS.map((_, i) => {
    let cls = 'progress-dot';
    if (i < step) cls += ' done';
    else if (i === step) cls += ' active';
    return `<div class="${cls}"></div>`;
  }).join('');
}

function renderQuestion() {
  renderProgress();
  const q = QUESTIONS[step];
  const card = document.getElementById('question-card');

  card.style.animation = 'none';
  card.offsetHeight;
  card.style.animation = '';

  card.innerHTML = `
    <div class="question-num">Q${step + 1} / ${QUESTIONS.length}</div>
    <div class="question-text">${q.text}</div>
    <div class="options">
      ${q.options.map((opt, i) => `
        <button class="opt-btn" onclick="selectOption(${i})">
          <span class="emoji">${opt.emoji}</span>
          <span>${opt.text}</span>
        </button>
      `).join('')}
    </div>
  `;
}

function selectOption(optionIndex) {
  const q = QUESTIONS[step];
  const selectedTags = q.options[optionIndex].tags;
  answers.push(...selectedTags); // 태그 누적

  step++;
  if (step < QUESTIONS.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function restart() {
  init();
}

window.addEventListener('DOMContentLoaded', init);
