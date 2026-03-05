/* ══════════════════════════════════════════════
   오늘도 커마카세 — quiz.js
   질문 진행 로직 담당
   버튼 안 눌리거나 질문 안 뜨는 오류 → 이 파일 확인!
══════════════════════════════════════════════ */

let step = 0;
let answers = {};

function init() {
  step = 0;
  answers = {};
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

  // 애니메이션 리셋
  card.style.animation = 'none';
  card.offsetHeight; // reflow 강제
  card.style.animation = '';

  card.innerHTML = `
    <div class="question-num">Q${step + 1} / ${QUESTIONS.length}</div>
    <div class="question-text">${q.text}</div>
    <div class="options">
      ${q.options.map(opt => `
        <button class="opt-btn" onclick="selectOption('${q.key}', ${opt.val})">
          <span class="emoji">${opt.emoji}</span>
          <span>${opt.text}</span>
        </button>
      `).join('')}
    </div>
  `;
}

function selectOption(key, val) {
  answers[key] = val;
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

// 페이지 로드 시 자동 시작
window.addEventListener('DOMContentLoaded', init);
