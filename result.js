/* ══════════════════════════════════════════════
   오늘도 커마카세 — result.js
   태그 기반 추천 알고리즘 + 결과 카드 + 공유
   결과 안 뜨거나 공유 오류 → 이 파일 확인!
══════════════════════════════════════════════ */

// ── 태그 기반 음료 추천 ──
function recommend() {
  const scores = DRINKS.map(d => {
    let score = 0;
    answers.forEach(tag => {
      if (d.tags.includes(tag)) score++;
    });
    return { d, score };
  });

  const max = Math.max(...scores.map(s => s.score));
  const best = scores.filter(s => s.score === max);
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
  tagsEl.innerHTML = drink.tags
    .filter(t => !t.includes('_')) // caffeine_high 같은 내부 태그 숨기기
    .slice(0, 4)
    .map(t => `<span class="tag">${tagLabel(t)}</span>`)
    .join('');
}

// 태그 → 한국어 라벨
function tagLabel(tag) {
  const map = {
    hot:'따뜻함', ice:'시원함', sweet:'달달함', bitter:'쌉쌀함',
    sour:'상큼함', milk:'부드러움', coffee:'커피', tea:'티',
    fruit:'과일', matcha:'말차', chocolate:'초코', foam:'거품',
    bubble:'버블', caramel:'카라멜', nutty:'고소함',
    focus:'집중력', relax:'힐링', comfort:'포근함', social:'소셜',
    special:'특별함', refresh:'청량함', trendy:'트렌디', classic:'클래식',
    light:'가벼움', smooth:'부드러움', bright:'화사함', rich:'진함'
  };
  return map[tag] || tag;
}

// ── 카카오 SDK 초기화 ──
function initKakao() {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init('94b6d35d05072306a013f8ab95e6a736');
  }
}

// ── 카카오톡 공유 ──
function shareKakao() {
  initKakao();
  const drink = document.getElementById('res-drink').textContent;
  const sub   = document.getElementById('res-sub').textContent;
  const emoji = document.getElementById('res-emoji').textContent;

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '오늘의 커마카세 ' + emoji + ' ' + drink,
      description: sub + ' 나도 내 음료 찾아보기 👇',
      imageUrl: 'https://coffee.replaymylife.kr/images/og_image.png',
      link: {
        mobileWebUrl: 'https://coffee.replaymylife.kr',
        webUrl: 'https://coffee.replaymylife.kr'
      }
    },
    buttons: [
      {
        title: '나도 추천받기 ☕',
        link: {
          mobileWebUrl: 'https://coffee.replaymylife.kr',
          webUrl: 'https://coffee.replaymylife.kr'
        }
      }
    ]
  });
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

// ── 배민 주문 딥링크 ──
function orderBaemin() {
  const drink = document.getElementById('res-drink').textContent;
  const query = encodeURIComponent(drink);

  // 배민 앱 딥링크 시도 → 없으면 웹으로 fallback
  const appLink = `baemin://search?query=${query}`;
  const webLink = `https://www.baemin.com/search/items?q=${query}`;

  // 앱 링크 시도 후 1.5초 안에 안 열리면 웹으로
  const start = Date.now();
  window.location.href = appLink;
  setTimeout(() => {
    if (Date.now() - start < 2000) {
      window.open(webLink, '_blank');
    }
  }, 1500);
}

// ── 쿠팡이츠 주문 딥링크 ──
function orderCoupang() {
  const drink = document.getElementById('res-drink').textContent;
  const query = encodeURIComponent(drink);

  const appLink = `coupangeats://search?keyword=${query}`;
  const webLink = `https://www.coupangeats.com/search?query=${query}`;

  const start = Date.now();
  window.location.href = appLink;
  setTimeout(() => {
    if (Date.now() - start < 2000) {
      window.open(webLink, '_blank');
    }
  }, 1500);
}

// ── 링크 복사 ──
function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast('링크가 복사됐어요! ☕');
  });
}

// ── 토스트 알림 ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}
