/* ══════════════════════════════════════════════
   오늘도 커마카세 — result.js
   추천 로직 + 결과 카드 + SNS 공유 담당
   결과 안 뜨거나 공유 오류 → 이 파일 확인!
══════════════════════════════════════════════ */

// ── 음료 추천 알고리즘 ──
function recommend() {
  const scores = DRINKS.map(d => {
    let score = 0;
    if (d.mood.includes(answers.mood))       score += 3;
    if (d.weather.includes(answers.weather)) score += 2;
    if (d.purpose.includes(answers.purpose)) score += 2;
    if (d.caffeine.includes(answers.caffeine)) score += 3;
    return { d, score };
  });

  const max = Math.max(...scores.map(s => s.score));
  const best = scores.filter(s => s.score === max);
  // 동점이면 랜덤으로 하나 선택
  return best[Math.floor(Math.random() * best.length)].d;
}

// ── 결과 화면 표시 ──
function showResult() {
  const drink = recommend();

  document.getElementById('quiz-screen').style.display = 'none';
  document.getElementById('result-screen').style.display = 'block';

  document.getElementById('res-emoji').textContent = drink.emoji;
  document.getElementById('res-drink').textContent = drink.name;
  document.getElementById('res-sub').textContent   = drink.sub;
  document.getElementById('res-desc').textContent  = drink.desc;

  const tagsEl = document.getElementById('res-tags');
  tagsEl.innerHTML = drink.tags.map(t => `<span class="tag">${t}</span>`).join('');
}

// ── 카카오톡 공유 ──
// 카카오 JS SDK 발급 후 아래 주석 해제해서 사용하세요
function shareKakao() {
  /*
  Kakao.Share.sendDefault({
    objectType: 'text',
    text: `오늘 나의 커마카세는 "${document.getElementById('res-drink').textContent}" ☕`,
    link: { mobileWebUrl: window.location.href, webUrl: window.location.href }
  });
  */
  alert('카카오 SDK를 연동하면 공유 가능해요!\n카카오 개발자 콘솔에서 JS 키 발급 후 result.js 수정하세요.');
}

// ── 인스타 이미지 저장 ──
async function saveImage() {
  const card  = document.getElementById('result-card');
  const toast = document.getElementById('toast');

  try {
    const canvas = await html2canvas(card, {
      backgroundColor: null,
      scale: 2,
      useCORS: true
    });
    const link = document.createElement('a');
    const drink = document.getElementById('res-drink').textContent;
    link.download = `커마카세_${drink}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    showToast('이미지 저장 완료! 인스타 스토리에 올려요 📸');
  } catch (e) {
    alert('이미지 저장에 실패했어요. 다시 시도해주세요.');
  }
}

// ── 링크 복사 ──
function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast('링크가 복사됐어요! ☕');
  });
}

// ── 토스트 알림 공통 함수 ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
