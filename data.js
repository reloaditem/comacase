/* ══════════════════════════════════════════════
   오늘도 커마카세 — data.js
   50개 질문 중 랜덤 5개 출제
   각 질문 선택지 5개 → 태그 기반 음료 추천
══════════════════════════════════════════════ */

// ── 음료 데이터 (28종) ──
const DRINKS = [
  { name: "아이스 아메리카노", emoji: "🧊", sub: "깔끔하고 시원한 국민 음료",
    desc: "오늘도 아아로 시작하는 당신. 깔끔한 쓴맛과 시원함이 정신을 번쩍 들게 해줄 거예요.",
    tags: ["caffeine_high","ice","bitter","coffee","focus","refresh","classic","light"] },

  { name: "따뜻한 아메리카노", emoji: "☕", sub: "차분하게 하루를 여는 기본",
    desc: "복잡한 마음을 정돈해줄 한 잔. 온기와 함께 집중력이 살아날 거예요.",
    tags: ["caffeine_high","hot","bitter","coffee","focus","comfort","classic","light"] },

  { name: "아이스 라떼", emoji: "🥛", sub: "부드럽게, 그러나 확실하게",
    desc: "에스프레소의 강함을 우유가 감싸준 부드러운 조합. 일하면서 마시기 딱 좋아요.",
    tags: ["caffeine_mid","ice","milk","coffee","focus","social","classic","smooth"] },

  { name: "따뜻한 라떼", emoji: "🤍", sub: "포근하게 감싸주는 한 잔",
    desc: "오늘 하루 수고했어요. 따뜻한 라떼 한 잔으로 잠깐 숨 고르기 해요.",
    tags: ["caffeine_mid","hot","milk","coffee","comfort","relax","classic","smooth"] },

  { name: "카푸치노", emoji: "☁️", sub: "폼 가득, 기분도 가득",
    desc: "두터운 우유 거품과 진한 에스프레소의 만남. 오늘만큼은 여유롭게 즐겨요.",
    tags: ["caffeine_mid","hot","milk","coffee","foam","social","classic","comfort"] },

  { name: "플랫화이트", emoji: "🎨", sub: "진하고 세련된 커피 한 잔",
    desc: "작지만 강한 플랫화이트. 집중해야 할 때 카페인과 밀크의 황금 비율을 느껴요.",
    tags: ["caffeine_high","hot","milk","coffee","focus","special","trendy","smooth"] },

  { name: "콜드브루", emoji: "🌊", sub: "12시간의 기다림이 만든 맛",
    desc: "저온으로 천천히 추출한 진하고 부드러운 커피. 각성이 필요한 날에 제격이에요.",
    tags: ["caffeine_high","ice","bitter","coffee","focus","refresh","special","smooth"] },

  { name: "나이트로 콜드브루", emoji: "🫧", sub: "질소 거품이 입안에서 톡톡",
    desc: "부드러운 질소 거품과 묵직한 콜드브루의 조합. 특별한 날에 딱이에요.",
    tags: ["caffeine_high","ice","bitter","coffee","foam","special","trendy","refresh"] },

  { name: "바닐라 라떼 (hot)", emoji: "🍦", sub: "달콤하고 포근한 바닐라 향기",
    desc: "우울하거나 당이 당길 때 딱이에요. 바닐라 향이 기분을 부드럽게 끌어올려줘요.",
    tags: ["caffeine_mid","hot","sweet","milk","coffee","comfort","social","smooth"] },

  { name: "바닐라 라떼 (ice)", emoji: "🍨", sub: "시원하게 달달한 최애 음료",
    desc: "시원한 바닐라 라떼는 언제 마셔도 기분이 좋아져요. 오늘도 잘 하고 있어요!",
    tags: ["caffeine_mid","ice","sweet","milk","coffee","social","refresh","smooth"] },

  { name: "카라멜 마키아또 (hot)", emoji: "🍮", sub: "달콤한 카라멜과 에스프레소의 이중주",
    desc: "진한 카라멜 시럽과 커피의 만남. 달달한 게 당기는 날, 기분 전환을 위한 선택이에요.",
    tags: ["caffeine_mid","hot","sweet","coffee","milk","social","comfort","caramel"] },

  { name: "카라멜 마키아또 (ice)", emoji: "🧡", sub: "아이스로 더 상큼하게 즐기는 카라멜",
    desc: "카라멜 시럽이 얼음 위로 흘러내리는 비주얼도 예술. SNS 감성 충전까지 OK.",
    tags: ["caffeine_mid","ice","sweet","coffee","milk","social","refresh","caramel"] },

  { name: "돌체 라떼", emoji: "✨", sub: "연유 품은 달콤한 라떼",
    desc: "연유의 부드러운 단맛이 커피를 감싸요. 오늘 나에게 작은 사치를 선물해요.",
    tags: ["caffeine_mid","hot","sweet","milk","coffee","comfort","special","smooth"] },

  { name: "말차 라떼 (hot)", emoji: "🍵", sub: "은은하고 깊은 말차의 세계",
    desc: "초록빛 말차의 쌉싸름함이 정신을 맑게 해줘요. 카페인은 살짝, 여운은 길게.",
    tags: ["caffeine_low","hot","matcha","milk","focus","comfort","trendy","bitter"] },

  { name: "말차 라떼 (ice)", emoji: "🌿", sub: "시원하고 건강한 그린 라떼",
    desc: "선명한 초록색 비주얼에 개운한 말차 향. 건강하게 하루를 충전하고 싶을 때.",
    tags: ["caffeine_low","ice","matcha","milk","refresh","trendy","special","bitter"] },

  { name: "초코 라떼 (hot)", emoji: "🍫", sub: "포근하고 달콤한 초콜릿 위로",
    desc: "힘든 날엔 초코 라떼 한 잔. 달콤한 카카오 향이 마음을 녹여줄 거예요.",
    tags: ["caffeine_none","hot","chocolate","sweet","milk","comfort","relax","rich"] },

  { name: "초코 라떼 (ice)", emoji: "🍪", sub: "달콤하고 진하게 시원한 초코",
    desc: "진한 초콜릿의 단맛이 시원하게 퍼져요. 달달한 것이 당기는 오후에 딱.",
    tags: ["caffeine_none","ice","chocolate","sweet","milk","refresh","social","rich"] },

  { name: "딸기 라떼 (ice)", emoji: "🍓", sub: "사랑스럽고 상큼한 핑크 음료",
    desc: "새콤달콤한 딸기와 우유의 만남. 오늘 하루가 핑크빛이길 바라는 마음을 담아요.",
    tags: ["caffeine_none","ice","fruit","sweet","milk","social","trendy","refresh"] },

  { name: "유자 에이드", emoji: "🍋", sub: "상콤달콤, 기분이 화사해지는",
    desc: "유자의 향긋함이 기분을 확 살려줘요. 카페인 없이도 활기차게 오후를 보낼 수 있어요.",
    tags: ["caffeine_none","ice","fruit","sour","refresh","social","light","bright"] },

  { name: "자몽 에이드", emoji: "🍊", sub: "쌉싸름하고 상쾌한 에이드",
    desc: "쌉싸름한 자몽과 청량한 탄산의 조합. 기분 전환이 필요할 때 한 번에 해결해줘요.",
    tags: ["caffeine_none","ice","fruit","sour","bitter","refresh","special","light"] },

  { name: "레몬 에이드", emoji: "🍋‍🟩", sub: "상쾌하고 깔끔한 시트러스",
    desc: "레몬의 산뜻한 신맛이 더위와 피로를 동시에 날려줘요. 심플하지만 확실한 맛.",
    tags: ["caffeine_none","ice","fruit","sour","refresh","focus","light","bright"] },

  { name: "복숭아 아이스티", emoji: "🍑", sub: "달콤하고 우아한 복숭아 향",
    desc: "복숭아 향이 은은하게 퍼지는 아이스티. 여름 오후 카페에서 여유를 즐기기 딱이에요.",
    tags: ["caffeine_low","ice","fruit","sweet","tea","relax","light","smooth"] },

  { name: "히비스커스 티", emoji: "🌺", sub: "선명한 루비빛, 개성 있는 한 잔",
    desc: "새콤하고 진한 히비스커스의 풍미. 카페인 없이 몸도 마음도 가볍게 정화하는 느낌.",
    tags: ["caffeine_none","ice","fruit","sour","tea","special","refresh","light"] },

  { name: "캐모마일 티", emoji: "🌼", sub: "포근하고 잔잔한 꽃향기",
    desc: "바쁜 하루 끝에 긴장을 내려놓게 해주는 티. 아무것도 하기 싫을 때 최고의 선택이에요.",
    tags: ["caffeine_none","hot","tea","comfort","relax","light","classic","smooth"] },

  { name: "얼그레이 티", emoji: "🍵", sub: "클래식하고 향기로운 영국 홍차",
    desc: "베르가못의 은은한 향과 홍차의 깊은 맛. 잠깐 현실에서 벗어나 우아한 오후를 즐겨요.",
    tags: ["caffeine_mid","hot","tea","comfort","relax","classic","special","smooth"] },

  { name: "아샷추", emoji: "⚡", sub: "아이스티에 샷 추가, 독특한 조합",
    desc: "아이스티의 상큼함에 에스프레소 샷을 더한 마니아 음료. 눈 떠지게 하는 강력한 한 잔.",
    tags: ["caffeine_high","ice","tea","coffee","bitter","special","refresh","focus"] },

  { name: "흑당 버블티", emoji: "🧋", sub: "쫀득한 타피오카와 달달한 흑당",
    desc: "쫄깃한 타피오카 펄과 진한 흑당 시럽의 조화. 오늘 하루의 달달한 보상이에요.",
    tags: ["caffeine_low","ice","sweet","bubble","milk","social","trendy","rich"] },

  { name: "오트밀크 라떼", emoji: "🌾", sub: "가볍고 고소한 비건 라떼",
    desc: "오트밀크의 고소하고 가벼운 질감이 에스프레소와 잘 어울려요. 건강하고 트렌디한 선택.",
    tags: ["caffeine_mid","hot","milk","coffee","nutty","trendy","focus","smooth"] }
];

// ── 질문 50개 ──
const ALL_QUESTIONS = [
  { text: "지금 기분이 어떤가요?", options: [
    { emoji:"💪", text:"맑고 의욕 넘친다", tags:["focus","caffeine_high","refresh"] },
    { emoji:"🍭", text:"달달한 게 당긴다", tags:["sweet","comfort","social"] },
    { emoji:"🛋️", text:"쉬고 싶고 지쳤다", tags:["relax","comfort","caffeine_none"] },
    { emoji:"🌈", text:"뭔가 특별한 게 마시고 싶다", tags:["special","trendy","refresh"] },
    { emoji:"😐", text:"그냥 평범한 하루", tags:["classic","smooth","caffeine_mid"] }
  ]},
  { text: "오늘 하루 어땠어요?", options: [
    { emoji:"🔥", text:"엄청 바빴어요", tags:["caffeine_high","focus","refresh"] },
    { emoji:"😌", text:"여유로웠어요", tags:["relax","comfort","light"] },
    { emoji:"😤", text:"스트레스 받았어요", tags:["sweet","comfort","relax"] },
    { emoji:"🎉", text:"특별한 일이 있었어요", tags:["special","trendy","social"] },
    { emoji:"🥱", text:"너무 졸려요", tags:["caffeine_high","bitter","focus"] }
  ]},
  { text: "지금 가장 필요한 게 뭐예요?", options: [
    { emoji:"⚡", text:"에너지 충전", tags:["caffeine_high","focus","refresh"] },
    { emoji:"🤗", text:"위로와 포근함", tags:["comfort","hot","sweet"] },
    { emoji:"🎯", text:"집중력", tags:["focus","caffeine_mid","bitter"] },
    { emoji:"🌬️", text:"청량함", tags:["refresh","ice","light"] },
    { emoji:"✨", text:"기분 전환", tags:["special","trendy","bright"] }
  ]},
  { text: "지금 얼마나 피곤해요?", options: [
    { emoji:"😵", text:"거의 쓰러질 것 같아요", tags:["caffeine_high","focus","bitter"] },
    { emoji:"😩", text:"꽤 피곤해요", tags:["caffeine_mid","sweet","comfort"] },
    { emoji:"😐", text:"보통이에요", tags:["caffeine_mid","classic","smooth"] },
    { emoji:"😊", text:"괜찮아요", tags:["caffeine_low","refresh","light"] },
    { emoji:"🤩", text:"컨디션 최고예요!", tags:["caffeine_none","special","trendy"] }
  ]},
  { text: "오늘 기분을 색으로 표현하면?", options: [
    { emoji:"🔴", text:"빨강 — 열정적이고 에너지 넘침", tags:["caffeine_high","focus","refresh"] },
    { emoji:"🟡", text:"노랑 — 밝고 활기차요", tags:["fruit","bright","social"] },
    { emoji:"🟢", text:"초록 — 차분하고 건강한 느낌", tags:["matcha","light","focus"] },
    { emoji:"🔵", text:"파랑 — 조용하고 차가운 느낌", tags:["ice","relax","bitter"] },
    { emoji:"🟣", text:"보라 — 몽환적이고 특별한 느낌", tags:["special","trendy","sweet"] }
  ]},
  { text: "지금 감정을 동물로 표현하면?", options: [
    { emoji:"🦁", text:"사자 — 힘차고 당당해요", tags:["caffeine_high","focus","bitter"] },
    { emoji:"🐱", text:"고양이 — 여유롭고 도도해요", tags:["relax","comfort","classic"] },
    { emoji:"🐶", text:"강아지 — 활발하고 사교적이에요", tags:["social","sweet","bright"] },
    { emoji:"🦦", text:"수달 — 귀엽고 장난기 많아요", tags:["trendy","special","refresh"] },
    { emoji:"🐻", text:"곰 — 느긋하고 포근해요", tags:["comfort","hot","smooth"] }
  ]},
  { text: "지금 음악을 고른다면?", options: [
    { emoji:"🎸", text:"락/메탈 — 강렬하게!", tags:["caffeine_high","bitter","focus"] },
    { emoji:"🎵", text:"재즈/보사노바 — 여유롭게", tags:["relax","classic","smooth"] },
    { emoji:"🎤", text:"K-POP — 신나게!", tags:["sweet","trendy","social"] },
    { emoji:"🎹", text:"클래식 — 집중하면서", tags:["focus","comfort","classic"] },
    { emoji:"🎧", text:"로파이 — 감성적으로", tags:["relax","light","special"] }
  ]},
  { text: "오늘 나에게 하고 싶은 말은?", options: [
    { emoji:"💪", text:"오늘도 파이팅!", tags:["caffeine_high","refresh","focus"] },
    { emoji:"🥺", text:"오늘 수고했어", tags:["comfort","sweet","relax"] },
    { emoji:"🌟", text:"나 오늘 최고야!", tags:["special","trendy","bright"] },
    { emoji:"🤷", text:"그냥 하루하루", tags:["classic","smooth","caffeine_mid"] },
    { emoji:"😴", text:"빨리 집에 가고 싶다", tags:["caffeine_none","relax","comfort"] }
  ]},
  { text: "지금 날씨는 어때요?", options: [
    { emoji:"☀️", text:"맑고 화창해요", tags:["ice","refresh","bright"] },
    { emoji:"🌧️", text:"흐리거나 비 와요", tags:["hot","comfort","relax"] },
    { emoji:"🔥", text:"덥고 습해요", tags:["ice","refresh","light"] },
    { emoji:"🧤", text:"춥고 쌀쌀해요", tags:["hot","comfort","sweet"] },
    { emoji:"🌫️", text:"안개 끼고 흐려요", tags:["hot","relax","classic"] }
  ]},
  { text: "지금 계절 느낌은?", options: [
    { emoji:"🌸", text:"봄 — 따뜻하고 화사해요", tags:["bright","fruit","light"] },
    { emoji:"☀️", text:"여름 — 덥고 활기차요", tags:["ice","refresh","fruit"] },
    { emoji:"🍂", text:"가을 — 쌀쌀하고 감성적이에요", tags:["hot","comfort","caramel"] },
    { emoji:"❄️", text:"겨울 — 춥고 포근함이 필요해요", tags:["hot","sweet","comfort"] },
    { emoji:"🌈", text:"사계절 다 섞인 것 같아요", tags:["special","trendy","smooth"] }
  ]},
  { text: "창밖 풍경이 어때요?", options: [
    { emoji:"🌳", text:"초록 나무들이 가득해요", tags:["matcha","light","refresh"] },
    { emoji:"🏙️", text:"빌딩 숲이에요", tags:["caffeine_high","focus","bitter"] },
    { emoji:"🌊", text:"바다나 강이 보여요", tags:["refresh","light","special"] },
    { emoji:"🌧️", text:"비가 내리고 있어요", tags:["hot","comfort","relax"] },
    { emoji:"🌟", text:"야경이 예뻐요", tags:["special","trendy","social"] }
  ]},
  { text: "오늘 옷차림은?", options: [
    { emoji:"🧥", text:"두꺼운 코트 입었어요", tags:["hot","comfort","sweet"] },
    { emoji:"👕", text:"반팔이에요", tags:["ice","refresh","light"] },
    { emoji:"🧣", text:"목도리 두르고 왔어요", tags:["hot","comfort","classic"] },
    { emoji:"👗", text:"가볍게 입었어요", tags:["light","refresh","social"] },
    { emoji:"🧤", text:"장갑까지 꼈어요", tags:["hot","sweet","rich"] }
  ]},
  { text: "오늘 카페에 온 이유는?", options: [
    { emoji:"📚", text:"공부 또는 작업", tags:["focus","caffeine_mid","classic"] },
    { emoji:"💬", text:"친구와 수다 삼매경", tags:["social","sweet","bright"] },
    { emoji:"🌿", text:"혼자 조용히 쉬러", tags:["relax","comfort","light"] },
    { emoji:"⚡", text:"빠르게 충전하고 나갈 예정", tags:["caffeine_high","refresh","focus"] },
    { emoji:"📸", text:"감성 사진 찍으러", tags:["trendy","special","social"] }
  ]},
  { text: "지금 뭐 하고 있어요?", options: [
    { emoji:"💻", text:"노트북으로 작업 중", tags:["focus","caffeine_mid","bitter"] },
    { emoji:"📖", text:"책 읽는 중", tags:["relax","classic","smooth"] },
    { emoji:"📱", text:"SNS 보는 중", tags:["trendy","social","sweet"] },
    { emoji:"🎧", text:"음악 들으며 쉬는 중", tags:["relax","light","comfort"] },
    { emoji:"👥", text:"친구랑 대화 중", tags:["social","bright","sweet"] }
  ]},
  { text: "오늘 운동했어요?", options: [
    { emoji:"🏃", text:"격하게 운동했어요", tags:["refresh","caffeine_high","light"] },
    { emoji:"🚶", text:"가볍게 산책했어요", tags:["light","refresh","caffeine_low"] },
    { emoji:"🧘", text:"요가/스트레칭했어요", tags:["matcha","light","comfort"] },
    { emoji:"🛋️", text:"운동은 무슨요...", tags:["comfort","sweet","relax"] },
    { emoji:"🤔", text:"내일 할 거예요", tags:["caffeine_mid","smooth","classic"] }
  ]},
  { text: "오늘 식사는 어떻게 했어요?", options: [
    { emoji:"🍱", text:"든든하게 먹었어요", tags:["light","caffeine_low","refresh"] },
    { emoji:"🥗", text:"가볍게 먹었어요", tags:["light","caffeine_mid","smooth"] },
    { emoji:"🍔", text:"기름진 거 먹었어요", tags:["caffeine_high","bitter","refresh"] },
    { emoji:"🍰", text:"달달한 디저트 먹었어요", tags:["light","caffeine_none","tea"] },
    { emoji:"😅", text:"아직 못 먹었어요", tags:["caffeine_high","sweet","rich"] }
  ]},
  { text: "오늘 몇 번째 카페 방문이에요?", options: [
    { emoji:"1️⃣", text:"오늘 첫 번째예요", tags:["caffeine_high","classic","bitter"] },
    { emoji:"2️⃣", text:"두 번째예요", tags:["caffeine_mid","smooth","social"] },
    { emoji:"3️⃣", text:"세 번째예요", tags:["caffeine_low","light","refresh"] },
    { emoji:"🔢", text:"세 번 이상이요", tags:["caffeine_none","tea","relax"] },
    { emoji:"🤷", text:"카운트 못 해요", tags:["special","trendy","sweet"] }
  ]},
  { text: "카페에서 얼마나 있을 예정이에요?", options: [
    { emoji:"⚡", text:"30분 이내로 빠르게", tags:["caffeine_high","focus","refresh"] },
    { emoji:"🕐", text:"1~2시간", tags:["caffeine_mid","smooth","classic"] },
    { emoji:"🕓", text:"3~4시간", tags:["caffeine_mid","comfort","focus"] },
    { emoji:"🌙", text:"오래 있을 거예요", tags:["caffeine_low","relax","light"] },
    { emoji:"🏠", text:"그냥 테이크아웃이에요", tags:["caffeine_high","bitter","focus"] }
  ]},
  { text: "카페인은 얼마나 필요해요?", options: [
    { emoji:"🚀", text:"많이! 지금 졸려요", tags:["caffeine_high","bitter","focus"] },
    { emoji:"😌", text:"조금만요", tags:["caffeine_low","smooth","light"] },
    { emoji:"🙅", text:"없어도 괜찮아요", tags:["caffeine_none","tea","fruit"] },
    { emoji:"🤷", text:"상관없어요", tags:["caffeine_mid","classic","social"] },
    { emoji:"⚖️", text:"적당히요", tags:["caffeine_mid","smooth","comfort"] }
  ]},
  { text: "오늘 몇 시에 일어났어요?", options: [
    { emoji:"🌅", text:"5~6시 새벽형이에요", tags:["caffeine_low","light","matcha"] },
    { emoji:"☀️", text:"7~8시 아침형이에요", tags:["caffeine_mid","classic","smooth"] },
    { emoji:"🕙", text:"9~10시 평범해요", tags:["caffeine_mid","comfort","social"] },
    { emoji:"😴", text:"11시 이후 올빼미예요", tags:["caffeine_high","bitter","focus"] },
    { emoji:"🤦", text:"아직 안 잤어요", tags:["caffeine_high","refresh","bitter"] }
  ]},
  { text: "요즘 건강 관리는?", options: [
    { emoji:"💪", text:"철저하게 관리해요", tags:["caffeine_none","light","matcha"] },
    { emoji:"🥗", text:"나름 신경 써요", tags:["caffeine_low","light","tea"] },
    { emoji:"🤷", text:"그냥 살아요", tags:["caffeine_mid","classic","smooth"] },
    { emoji:"🍰", text:"달달한 거 못 끊어요", tags:["sweet","social","comfort"] },
    { emoji:"💀", text:"건강은 포기했어요", tags:["caffeine_high","sweet","rich"] }
  ]},
  { text: "평소 커피를 얼마나 마셔요?", options: [
    { emoji:"☕", text:"하루 1잔이요", tags:["caffeine_mid","classic","smooth"] },
    { emoji:"☕☕", text:"하루 2~3잔이요", tags:["caffeine_high","bitter","focus"] },
    { emoji:"☕☕☕", text:"하루 4잔 이상이요", tags:["caffeine_high","bitter","coffee"] },
    { emoji:"🙅", text:"커피 안 마셔요", tags:["caffeine_none","tea","fruit"] },
    { emoji:"😅", text:"세다 포기했어요", tags:["caffeine_high","rich","special"] }
  ]},
  { text: "오늘 물은 충분히 마셨어요?", options: [
    { emoji:"💧", text:"충분히 마셨어요", tags:["light","refresh","caffeine_low"] },
    { emoji:"😅", text:"별로 못 마셨어요", tags:["refresh","light","fruit"] },
    { emoji:"🤔", text:"물 말고 음료만 마셨어요", tags:["caffeine_mid","social","sweet"] },
    { emoji:"😓", text:"탈수 상태인 것 같아요", tags:["refresh","ice","fruit"] },
    { emoji:"🚰", text:"물을 너무 많이 마셨어요", tags:["light","caffeine_none","tea"] }
  ]},
  { text: "오늘 어떤 맛이 당겨요?", options: [
    { emoji:"🍫", text:"달달하고 진한 맛", tags:["sweet","rich","chocolate"] },
    { emoji:"🍋", text:"새콤하고 상큼한 맛", tags:["sour","fruit","refresh"] },
    { emoji:"☕", text:"쌉쌀하고 깊은 맛", tags:["bitter","coffee","focus"] },
    { emoji:"🥛", text:"부드럽고 고소한 맛", tags:["milk","smooth","comfort"] },
    { emoji:"🌿", text:"은은하고 담백한 맛", tags:["light","tea","matcha"] }
  ]},
  { text: "단 거 얼마나 좋아해요?", options: [
    { emoji:"🍭", text:"엄청 좋아해요", tags:["sweet","caramel","chocolate"] },
    { emoji:"😊", text:"적당히 좋아해요", tags:["sweet","smooth","milk"] },
    { emoji:"🤷", text:"보통이에요", tags:["caffeine_mid","classic","smooth"] },
    { emoji:"😐", text:"별로 안 좋아해요", tags:["bitter","light","tea"] },
    { emoji:"🙅", text:"단 거 싫어요", tags:["bitter","caffeine_high","coffee"] }
  ]},
  { text: "커피 맛 중에 좋아하는 건?", options: [
    { emoji:"🌑", text:"진하고 쓴 맛", tags:["bitter","caffeine_high","coffee"] },
    { emoji:"🥛", text:"우유 많이 들어간 부드러운 맛", tags:["milk","smooth","comfort"] },
    { emoji:"🍮", text:"달달한 시럽이 들어간 맛", tags:["sweet","caramel","social"] },
    { emoji:"🌿", text:"커피 말고 다른 거 마셔요", tags:["tea","matcha","fruit"] },
    { emoji:"✨", text:"새로운 맛 도전!", tags:["special","trendy","refresh"] }
  ]},
  { text: "아이스 vs 핫 뭐가 더 좋아요?", options: [
    { emoji:"🧊", text:"무조건 아이스!", tags:["ice","refresh","light"] },
    { emoji:"🔥", text:"무조건 핫!", tags:["hot","comfort","smooth"] },
    { emoji:"🌡️", text:"날씨에 따라 달라요", tags:["classic","caffeine_mid","smooth"] },
    { emoji:"🤔", text:"그때그때 달라요", tags:["special","trendy","social"] },
    { emoji:"😅", text:"미지근한 게 제일 좋아요", tags:["relax","comfort","classic"] }
  ]},
  { text: "음료에 거품 좋아해요?", options: [
    { emoji:"☁️", text:"거품 많을수록 좋아요", tags:["foam","milk","comfort"] },
    { emoji:"🫧", text:"탄산 거품이 좋아요", tags:["foam","refresh","bright"] },
    { emoji:"😐", text:"거품 별로예요", tags:["smooth","light","classic"] },
    { emoji:"🧋", text:"타피오카 펄이 최고!", tags:["bubble","sweet","trendy"] },
    { emoji:"🤷", text:"상관없어요", tags:["caffeine_mid","social","smooth"] }
  ]},
  { text: "좋아하는 향기는?", options: [
    { emoji:"☕", text:"커피 향이 최고예요", tags:["coffee","bitter","classic"] },
    { emoji:"🍵", text:"녹차/말차 향이 좋아요", tags:["matcha","tea","light"] },
    { emoji:"🌸", text:"플로럴한 향이 좋아요", tags:["tea","special","light"] },
    { emoji:"🍋", text:"과일 향이 좋아요", tags:["fruit","bright","refresh"] },
    { emoji:"🍫", text:"초콜릿/카라멜 향이 좋아요", tags:["chocolate","caramel","sweet"] }
  ]},
  { text: "음료 농도는 어떻게 좋아해요?", options: [
    { emoji:"💪", text:"진하게!", tags:["caffeine_high","bitter","rich"] },
    { emoji:"⚖️", text:"적당히요", tags:["caffeine_mid","smooth","classic"] },
    { emoji:"💧", text:"연하게요", tags:["light","caffeine_low","refresh"] },
    { emoji:"🥛", text:"우유 많이 넣어서요", tags:["milk","smooth","comfort"] },
    { emoji:"🤷", text:"상관없어요", tags:["social","trendy","sweet"] }
  ]},
  { text: "디저트랑 같이 먹는다면?", options: [
    { emoji:"🍰", text:"케이크", tags:["caffeine_high","bitter","coffee"] },
    { emoji:"🍪", text:"쿠키/스콘", tags:["caffeine_mid","classic","comfort"] },
    { emoji:"🧁", text:"마카롱/달달한 것", tags:["sweet","special","trendy"] },
    { emoji:"🍓", text:"과일 케이크", tags:["fruit","light","refresh"] },
    { emoji:"🙅", text:"음료만요", tags:["caffeine_high","light","focus"] }
  ]},
  { text: "지금 함께 있는 사람은?", options: [
    { emoji:"👤", text:"혼자요", tags:["relax","focus","light"] },
    { emoji:"👫", text:"연인이랑요", tags:["special","sweet","social"] },
    { emoji:"👯", text:"친구랑요", tags:["social","bright","trendy"] },
    { emoji:"💼", text:"동료랑 미팅 중", tags:["classic","caffeine_mid","focus"] },
    { emoji:"👨‍👩‍👧", text:"가족이랑요", tags:["comfort","sweet","classic"] }
  ]},
  { text: "오늘 대화를 많이 했어요?", options: [
    { emoji:"🗣️", text:"정말 많이 했어요", tags:["refresh","light","caffeine_low"] },
    { emoji:"💬", text:"적당히 했어요", tags:["social","caffeine_mid","smooth"] },
    { emoji:"🤫", text:"거의 안 했어요", tags:["relax","comfort","light"] },
    { emoji:"🔇", text:"아무도 안 만났어요", tags:["focus","caffeine_mid","classic"] },
    { emoji:"📞", text:"전화/영상통화 많이 했어요", tags:["refresh","social","caffeine_mid"] }
  ]},
  { text: "SNS를 얼마나 해요?", options: [
    { emoji:"📱", text:"하루 종일 봐요", tags:["trendy","social","sweet"] },
    { emoji:"😊", text:"가끔 확인해요", tags:["smooth","caffeine_mid","classic"] },
    { emoji:"🤷", text:"보통이에요", tags:["social","light","refresh"] },
    { emoji:"😐", text:"별로 안 해요", tags:["focus","classic","bitter"] },
    { emoji:"🙅", text:"SNS 끊었어요", tags:["relax","light","matcha"] }
  ]},
  { text: "오늘 특별한 날인가요?", options: [
    { emoji:"🎂", text:"생일이에요!", tags:["special","sweet","trendy"] },
    { emoji:"💕", text:"기념일이에요", tags:["special","social","sweet"] },
    { emoji:"🎉", text:"축하할 일이 있어요", tags:["special","bright","social"] },
    { emoji:"😔", text:"힘든 날이에요", tags:["comfort","sweet","relax"] },
    { emoji:"😐", text:"그냥 평범한 날이에요", tags:["classic","caffeine_mid","smooth"] }
  ]},
  { text: "주변 카페 분위기는?", options: [
    { emoji:"📚", text:"조용하고 집중하는 분위기", tags:["focus","classic","bitter"] },
    { emoji:"🎵", text:"음악 있고 활기차요", tags:["social","bright","sweet"] },
    { emoji:"🌿", text:"인테리어 예쁜 감성 카페", tags:["special","trendy","smooth"] },
    { emoji:"🏠", text:"아늑하고 포근한 분위기", tags:["comfort","hot","relax"] },
    { emoji:"⚡", text:"바쁘고 북적북적해요", tags:["caffeine_high","refresh","focus"] }
  ]},
  { text: "지금 몇 시예요?", options: [
    { emoji:"🌅", text:"아침 (6~9시)", tags:["caffeine_high","bitter","focus"] },
    { emoji:"☀️", text:"오전 (9~12시)", tags:["caffeine_mid","classic","smooth"] },
    { emoji:"🕛", text:"점심 (12~14시)", tags:["light","refresh","caffeine_low"] },
    { emoji:"🌤️", text:"오후 (14~18시)", tags:["sweet","social","caffeine_mid"] },
    { emoji:"🌙", text:"저녁/밤 (18시 이후)", tags:["caffeine_none","relax","comfort"] }
  ]},
  { text: "오늘이 무슨 요일이에요?", options: [
    { emoji:"😫", text:"월요일 (최악)", tags:["caffeine_high","bitter","focus"] },
    { emoji:"💪", text:"화~목 (평일)", tags:["caffeine_mid","classic","focus"] },
    { emoji:"🎉", text:"금요일 (신남)", tags:["social","sweet","bright"] },
    { emoji:"😴", text:"토요일 (여유)", tags:["relax","special","trendy"] },
    { emoji:"😔", text:"일요일 (내일이 걱정)", tags:["comfort","hot","sweet"] }
  ]},
  { text: "요즘 생활 패턴은?", options: [
    { emoji:"🌅", text:"일찍 자고 일찍 일어나요", tags:["caffeine_low","light","matcha"] },
    { emoji:"🌙", text:"늦게 자고 늦게 일어나요", tags:["caffeine_high","bitter","focus"] },
    { emoji:"⏰", text:"규칙적으로 생활해요", tags:["classic","caffeine_mid","smooth"] },
    { emoji:"🔀", text:"매일 달라요", tags:["special","trendy","refresh"] },
    { emoji:"😴", text:"수면 부족이에요", tags:["caffeine_high","sweet","rich"] }
  ]},
  { text: "퇴근/하교 후 기분은?", options: [
    { emoji:"😤", text:"스트레스 폭발!", tags:["sweet","comfort","relax"] },
    { emoji:"😌", text:"홀가분해요", tags:["refresh","light","bright"] },
    { emoji:"😵", text:"너무 피곤해요", tags:["caffeine_none","comfort","relax"] },
    { emoji:"🤩", text:"오늘 대박이었어요", tags:["special","trendy","social"] },
    { emoji:"😐", text:"그냥 평범해요", tags:["classic","smooth","caffeine_mid"] }
  ]},
  { text: "오늘 이동은 어떻게 했어요?", options: [
    { emoji:"🚇", text:"대중교통", tags:["caffeine_high","focus","classic"] },
    { emoji:"🚗", text:"자가용", tags:["caffeine_mid","comfort","smooth"] },
    { emoji:"🚶", text:"걸어서", tags:["refresh","light","caffeine_low"] },
    { emoji:"🚲", text:"자전거/킥보드", tags:["refresh","light","trendy"] },
    { emoji:"🏠", text:"재택/집에 있어요", tags:["relax","comfort","caffeine_none"] }
  ]},
  { text: "지금 어디 있어요?", options: [
    { emoji:"🏢", text:"회사/학교 근처", tags:["caffeine_high","focus","bitter"] },
    { emoji:"🏠", text:"집 근처", tags:["comfort","relax","classic"] },
    { emoji:"🛍️", text:"쇼핑몰/번화가", tags:["social","trendy","sweet"] },
    { emoji:"🌳", text:"공원/자연 가까이", tags:["light","refresh","matcha"] },
    { emoji:"✈️", text:"여행 중이에요", tags:["special","bright","social"] }
  ]},
  { text: "요즘 관심사는?", options: [
    { emoji:"💻", text:"IT/테크", tags:["caffeine_high","focus","bitter"] },
    { emoji:"🎨", text:"예술/디자인", tags:["special","trendy","smooth"] },
    { emoji:"🍳", text:"요리/카페", tags:["social","sweet","classic"] },
    { emoji:"🏋️", text:"건강/운동", tags:["matcha","light","caffeine_low"] },
    { emoji:"📚", text:"독서/공부", tags:["focus","classic","relax"] }
  ]},
  { text: "이번 주말에 뭐 할 것 같아요?", options: [
    { emoji:"🛋️", text:"집에서 쉴 거예요", tags:["comfort","relax","caffeine_none"] },
    { emoji:"🌍", text:"여행/나들이", tags:["refresh","bright","special"] },
    { emoji:"👯", text:"친구 만날 거예요", tags:["social","sweet","trendy"] },
    { emoji:"💪", text:"운동/취미 활동", tags:["light","refresh","caffeine_low"] },
    { emoji:"💼", text:"일해야 해요...", tags:["caffeine_high","focus","bitter"] }
  ]},
  { text: "요즘 즐겨 보는 콘텐츠는?", options: [
    { emoji:"🎬", text:"넷플릭스/드라마", tags:["comfort","sweet","relax"] },
    { emoji:"📺", text:"유튜브/숏폼", tags:["trendy","social","light"] },
    { emoji:"📚", text:"책/만화", tags:["relax","classic","smooth"] },
    { emoji:"🎮", text:"게임", tags:["caffeine_high","sweet","focus"] },
    { emoji:"🎵", text:"음악/팟캐스트", tags:["light","relax","caffeine_low"] }
  ]},
  { text: "MBTI가 뭐예요? (대략)", options: [
    { emoji:"🌟", text:"E (외향형) — 사람들이랑 있는 게 좋아요", tags:["social","bright","sweet"] },
    { emoji:"🌙", text:"I (내향형) — 혼자 있는 게 좋아요", tags:["relax","focus","light"] },
    { emoji:"📋", text:"J (계획형) — 계획대로 살아요", tags:["classic","focus","caffeine_mid"] },
    { emoji:"🎲", text:"P (즉흥형) — 그때그때 달라요", tags:["special","trendy","refresh"] },
    { emoji:"🤔", text:"MBTI 잘 몰라요", tags:["smooth","classic","caffeine_mid"] }
  ]},
  { text: "요즘 다이어트 중이에요?", options: [
    { emoji:"🥗", text:"열심히 하고 있어요", tags:["light","caffeine_none","tea"] },
    { emoji:"🤔", text:"하려는 중이에요", tags:["caffeine_low","light","matcha"] },
    { emoji:"🤷", text:"그냥 살아요", tags:["classic","smooth","caffeine_mid"] },
    { emoji:"🍰", text:"오늘만 먹고 내일부터", tags:["sweet","rich","comfort"] },
    { emoji:"🙅", text:"다이어트 안 해요", tags:["sweet","social","trendy"] }
  ]},
  { text: "지갑 사정은 어때요?", options: [
    { emoji:"💸", text:"오늘은 좀 써도 돼요", tags:["special","rich","trendy"] },
    { emoji:"💰", text:"평소처럼요", tags:["classic","caffeine_mid","smooth"] },
    { emoji:"🪙", text:"좀 아껴야 해요", tags:["light","classic","caffeine_low"] },
    { emoji:"😱", text:"거의 없어요", tags:["light","caffeine_none","tea"] },
    { emoji:"🤑", text:"오늘 보너스 받았어요!", tags:["special","sweet","social"] }
  ]},
  { text: "오늘 나에게 주고 싶은 선물은?", options: [
    { emoji:"😴", text:"달콤한 낮잠", tags:["caffeine_none","comfort","relax"] },
    { emoji:"🍕", text:"맛있는 음식", tags:["rich","sweet","social"] },
    { emoji:"🛁", text:"여유로운 시간", tags:["relax","light","special"] },
    { emoji:"⚡", text:"에너지 폭발", tags:["caffeine_high","refresh","focus"] },
    { emoji:"💝", text:"따뜻한 위로", tags:["comfort","hot","sweet"] }
  ]},
  { text: "지금 이 순간을 표현한다면?", options: [
    { emoji:"🌊", text:"파도처럼 역동적이에요", tags:["caffeine_high","refresh","focus"] },
    { emoji:"🌸", text:"꽃처럼 화사해요", tags:["bright","fruit","social"] },
    { emoji:"🌙", text:"달빛처럼 잔잔해요", tags:["relax","light","smooth"] },
    { emoji:"⛰️", text:"산처럼 묵직해요", tags:["caffeine_high","bitter","classic"] },
    { emoji:"☁️", text:"구름처럼 둥둥 떠있어요", tags:["foam","sweet","special"] }
  ]}
];

// ══════════════════════════════════════════════
//  랜덤 5개 질문 뽑기
// ══════════════════════════════════════════════
function getRandomQuestions(count = 5) {
  const shuffled = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

let QUESTIONS = [];

function initQuestions() {
  QUESTIONS = getRandomQuestions(5);
}
