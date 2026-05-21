const DISC_TYPES = ["D", "I", "S", "C"];
const CODE_TO_DISC = { 1: "D", 2: "I", 3: "S", 4: "C" };
const TOTAL_GROUPS = 24;

const COLORS = {
  D: "#c95d68",
  I: "#e6a23a",
  S: "#6b9175",
  C: "#627fa8"
};

const DISC_PROFILES = {
  D: {
    label: "주도형",
    activity: "능동형",
    orientation: "과업지향",
    strength: "결단력, 추진력, 실행력",
    overState: "압박감, 조급함, 통제 욕구",
    recoveryDirection: "실행력과 자기주도감을 회복하는 방향",
    description: "목표를 향해 빠르게 결정하고 움직이는 경향이 강합니다.",
    strengthenOils: ["로즈마리", "사이프러스", "페퍼민트", "레몬"],
    softenOils: ["라벤더", "프랑킨센스", "시더우드", "만다린"]
  },
  I: {
    label: "사교형",
    activity: "능동형",
    orientation: "대인지향",
    strength: "표현력, 낙관성, 관계 확장성",
    overState: "산만함, 감정 과잉, 과도한 외부 자극",
    recoveryDirection: "표현력과 즐거운 관계 에너지를 회복하는 방향",
    description: "사람들과의 상호작용, 표현, 분위기 전환에서 에너지를 얻습니다.",
    strengthenOils: ["오렌지", "만다린", "버가못", "일랑일랑"],
    softenOils: ["프랑킨센스", "티트리", "시더우드"]
  },
  S: {
    label: "안정형",
    activity: "수동형",
    orientation: "대인지향",
    strength: "안정감, 배려, 지속성",
    overState: "변화 회피, 무기력, 지나친 양보",
    recoveryDirection: "안정감과 내면의 리듬을 회복하는 방향",
    description: "차분한 관계, 꾸준함, 안정적인 흐름을 중요하게 여깁니다.",
    strengthenOils: ["라벤더", "시더우드", "프랑킨센스"],
    softenOils: ["레몬그라스", "페퍼민트", "그레이프프룻"]
  },
  C: {
    label: "신중형",
    activity: "수동형",
    orientation: "과업지향",
    strength: "분석력, 정확성, 집중력",
    overState: "과분석, 긴장, 완벽주의",
    recoveryDirection: "정리력과 집중감을 회복하는 방향",
    description: "기준, 정확성, 분석, 완성도를 통해 안정감을 얻습니다.",
    strengthenOils: ["유칼립투스", "티트리", "레몬", "로즈마리"],
    softenOils: ["오렌지", "만다린", "일랑일랑"]
  }
};

const ENVIRONMENT_NOTES = {
  직장: "직장 환경에서는 역할 수행과 성과 압박 때문에 M 점수가 높아진 에너지를 먼저 살펴봅니다.",
  가정: "가정 환경에서는 회복감과 생활 리듬이 중요하므로 L에서 강하지만 M에서 낮아진 에너지를 함께 봅니다.",
  관계: "관계 환경에서는 표현, 배려, 거리감 조절이 중요하므로 대인지향 에너지의 과사용과 소진을 세밀하게 봅니다.",
  수업: "수업 환경에서는 집중, 발표, 참여 리듬이 중요하므로 과업지향과 능동형 에너지의 균형을 함께 봅니다."
};

const TEST_GROUPS = [
  group("신뢰적, 열정적", 2, 2, "관대함, 존중", 4, 4, "용감함, 모험적", 5, 1, "동의함, 순응적", 3, 3),
  group("애정적, 다정함", 2, 5, "단순함, 순종적", 5, 4, "결단력, 결과 추구", 1, 1, "만족함, 충족감", 3, 5),
  group("혁신적, 비전가", 1, 1, "내성적, 말수 적음", 4, 5, "사교적, 친화력", 5, 2, "평화적, 협상가", 3, 3),
  group("두려움 없음, 독립적", 1, 1, "조심스러움, 신중한 자제", 4, 4, "걱정 없음, 무모함", 2, 2, "친절함, 정중함", 3, 5),
  group("정확함, 꼼꼼함", 5, 4, "집중력, 목표 지향", 1, 5, "팀 플레이어, 순응적", 5, 3, "타인 격려, 자극적", 2, 2),
  group("양심적, 미래 계획", 4, 5, "인정, 발전 추구", 1, 1, "모험적, 대담함", 2, 2, "의존 가능, 경청자", 3, 3),
  group("예민함, 쉽게 좌절", 4, 4, "반대에 맞섬, 당당함", 1, 1, "현실 안주, 감정 억제", 3, 3, "내 입장 말하기, 인정받고 싶음", 5, 2),
  group("규칙이 지루함, 불안함", 2, 2, "규칙에 도전, 대담함", 5, 1, "규칙이 안전함, 안정 추구", 3, 3, "규칙이 공정함, 정의 추구", 4, 5),
  group("균형 추구, 평온함", 3, 3, "말이 많음, 카리스마", 2, 5, "규율적, 규칙 준수", 5, 4, "빠른 속도, 활기참", 1, 1),
  group("상을 좋아함, 성취 추구", 1, 1, "사교적, 모임 즐김", 2, 5, "교육 지속, 교양 있음", 5, 4, "안전 추구, 위협 없음", 3, 3),
  group("체계적, 시간 관리", 4, 5, "불안함, 서두름", 1, 1, "의존 가능, 끈기 있음", 3, 3, "감정적, 충동적", 2, 2),
  group("조심성, 계산적", 4, 5, "일관성, 철저함", 5, 3, "외향적, 열정적", 5, 2, "주도력, 직접적 접근", 1, 1),
  group("초연함, 지나친 신중", 5, 4, "비현실적, 과도한 헌신", 2, 2, "현실 안주, 변화 저항", 3, 5, "퉁명스러움, 위압적", 5, 1),
  group("흥분적, 명랑함", 2, 2, "지지자, 옹호자", 3, 5, "체계적, 정확함", 5, 4, "경쟁적, 논쟁적", 1, 1),
  group("좋은 분석가", 4, 4, "좋은 경청자", 3, 3, "좋은 격려자", 2, 2, "좋은 위임자", 1, 1),
  group("사실을 파악할 것", 4, 5, "끝까지 실행할 것", 3, 3, "이끌어 나갈 것", 1, 5, "설득할 것", 2, 2),
  group("강인함, 추진력", 1, 1, "낙관적, 카리스마", 5, 2, "협력적, 함께 하자", 5, 3, "정확성 중시, 꼼꼼함", 4, 4),
  group("충성스러움, 성찰적", 3, 3, "도전 좋아함, 개척", 1, 1, "분석적, 배려심", 5, 4, "인기 있음, 설득력", 2, 2),
  group("기다리며 구매, 인내심", 3, 3, "충동적 구매, 결단력", 1, 1, "원하는 것에 지출, 이기적", 2, 5, "없이 지냄, 자제력", 5, 4),
  group("동의함, 친근함", 3, 3, "활기참, 열정적", 5, 2, "대담함, 용감함", 1, 1, "규율적, 적응적", 4, 4),
  group("엄격함, 정확성 추구", 4, 4, "단조로움 회피, 루틴 지루함", 5, 2, "변화 추구, 과감함", 1, 1, "친근함, 친절한 행동", 3, 5),
  group("권위적, 영향력", 5, 1, "주목 즐김, 새 기회", 2, 5, "갈등 회피, 편안함", 3, 3, "규정 준수, 외교적", 5, 4),
  group("충동적, 감정적", 2, 2, "계산적, 세부사항 과부하", 4, 5, "요구적, 지배적", 1, 1, "비대립적, 예측 가능", 5, 3),
  group("창의적, 독특함", 2, 2, "핵심 정리자, 결과 지향", 1, 5, "신뢰할 수 있음, 진정성", 5, 3, "높은 기준, 벤치마크 추구", 4, 5)
];

const SAMPLE_SELECTIONS = [
  [2, 1], [2, 3], [0, 1], [0, 3], [1, 2],
  [1, 0], [1, 2], [1, 0], [3, 0], [0, 3],
  [1, 3], [3, 0], [3, 2], [3, 1], [3, 0],
  [2, 1], [0, 2], [1, 0], [1, 3], [2, 0],
  [2, 3], [0, 2], [2, 3], [1, 2]
];

const questionGroups = document.querySelector("#questionGroups");
const scoreGrid = document.querySelector("#scoreGrid");
const sampleButton = document.querySelector("#sampleButton");
const resetButton = document.querySelector("#resetButton");

function group(...values) {
  const items = [];
  for (let index = 0; index < values.length; index += 3) {
    items.push({
      text: values[index],
      mostCode: values[index + 1],
      leastCode: values[index + 2]
    });
  }
  return items;
}

function createQuestionGroups() {
  questionGroups.innerHTML = TEST_GROUPS.map((items, groupIndex) => `
    <article class="question-card" data-group-index="${groupIndex}">
      <header>
        <span>${groupIndex + 1}</span>
        <strong>가장 가까운 모습과 가장 먼 모습 선택</strong>
      </header>
      <div class="choice-grid">
        <div class="choice-head">표현</div>
        <div class="choice-head">Most</div>
        <div class="choice-head">Least</div>
        ${items.map((item, itemIndex) => createChoiceRow(item, groupIndex, itemIndex)).join("")}
      </div>
    </article>
  `).join("");
}

function createChoiceRow(item, groupIndex, itemIndex) {
  return `
    <div class="choice-text">${item.text}</div>
    <label class="choice-radio">
      <input type="radio" name="most_${groupIndex}" value="${itemIndex}" />
      <span>Most</span>
    </label>
    <label class="choice-radio">
      <input type="radio" name="least_${groupIndex}" value="${itemIndex}" />
      <span>Least</span>
    </label>
  `;
}

function createScoreControls() {
  scoreGrid.innerHTML = DISC_TYPES.map((type) => {
    const profile = DISC_PROFILES[type];
    return `
      <article class="score-card">
        <header>
          <div>
            <span class="disc-badge" style="background:${COLORS[type]}">${type}</span>
          </div>
          <small>${profile.label} · ${profile.activity} · ${profile.orientation}</small>
        </header>
        ${createScoreRow(type, "M", "적응")}
        ${createScoreRow(type, "L", "자연")}
      </article>
    `;
  }).join("");
}

function createScoreRow(type, styleKey, label) {
  const id = `${styleKey}_${type}`;
  return `
    <div class="score-row">
      <label for="${id}">${label}</label>
      <input id="${id}_range" data-score="${id}" type="range" min="0" max="${TOTAL_GROUPS}" value="0" />
      <input id="${id}" data-score="${id}" type="number" min="0" max="${TOTAL_GROUPS}" value="0" inputmode="numeric" />
    </div>
  `;
}

function getSheetScores() {
  const scores = {
    D: { M: 0, L: 0 },
    I: { M: 0, L: 0 },
    S: { M: 0, L: 0 },
    C: { M: 0, L: 0 }
  };
  let completed = 0;

  TEST_GROUPS.forEach((items, groupIndex) => {
    const most = document.querySelector(`input[name="most_${groupIndex}"]:checked`);
    const least = document.querySelector(`input[name="least_${groupIndex}"]:checked`);
    if (most && least) completed += 1;

    if (most) {
      const item = items[Number(most.value)];
      const type = CODE_TO_DISC[item.mostCode];
      if (type) scores[type].M += 1;
    }

    if (least) {
      const item = items[Number(least.value)];
      const type = CODE_TO_DISC[item.leastCode];
      if (type) scores[type].L += 1;
    }
  });

  return { scores, completed };
}

function setManualValues(values) {
  DISC_TYPES.forEach((type) => {
    ["M", "L"].forEach((key) => {
      const scoreKey = `${key}_${type}`;
      const value = values[type][key];
      document.querySelectorAll(`[data-score="${scoreKey}"]`).forEach((input) => {
        input.value = value;
      });
    });
  });
}

function syncManualInput(event) {
  const source = event.target;
  const scoreKey = source.dataset.score;
  if (!scoreKey) return;

  const value = clampScore(source.value);
  document.querySelectorAll(`[data-score="${scoreKey}"]`).forEach((input) => {
    input.value = value;
  });
  renderResult(getManualScores(), TOTAL_GROUPS);
}

function getManualScores() {
  return DISC_TYPES.reduce((scores, type) => {
    scores[type] = {
      M: clampScore(document.querySelector(`#M_${type}`).value),
      L: clampScore(document.querySelector(`#L_${type}`).value)
    };
    return scores;
  }, {});
}

function clampScore(value) {
  const number = Number(value);
  if (Number.isNaN(number)) return 0;
  return Math.min(TOTAL_GROUPS, Math.max(0, number));
}

function syncFromSheet() {
  const { scores, completed } = getSheetScores();
  setManualValues(scores);
  renderResult(scores, completed);
}

function getSelectedEnvironment() {
  return document.querySelector('input[name="environment"]:checked').value;
}

function analyze(scores) {
  const rows = DISC_TYPES.map((type) => ({
    type,
    M: scores[type].M,
    LRaw: scores[type].L,
    L: TOTAL_GROUPS - scores[type].L,
    gap: scores[type].M - (TOTAL_GROUPS - scores[type].L),
    absGap: Math.abs(scores[type].M - (TOTAL_GROUPS - scores[type].L))
  }));

  const maxM = maxBy(rows, "M");
  const minM = minBy(rows, "M");
  const maxL = maxBy(rows, "L");
  const largestGap = rows.slice().sort((a, b) => b.absGap - a.absGap || b.M - a.M)[0];

  const states = rows.flatMap((row) => getStates(row, maxM, minM, maxL, largestGap.absGap));
  const primary = states[0] || buildFallbackState(maxM);
  const secondary = states.find((state) => state.type !== primary.type && state.priority <= 3);

  const recommendedOils = unique([
    ...primary.oils,
    ...(secondary ? secondary.oils.slice(0, 2) : [])
  ]).slice(0, 3);

  const avoidOils = unique([
    ...getOppositeOils(primary),
    ...(secondary ? getOppositeOils(secondary).slice(0, 2) : [])
  ]).filter((oil) => !recommendedOils.includes(oil)).slice(0, 4);

  return {
    rows,
    maxM,
    minM,
    maxL,
    largestGap,
    primary,
    secondary,
    recommendedOils,
    avoidOils
  };
}

function getStates(row, maxM, minM, maxL, largestAbsGap) {
  const profile = DISC_PROFILES[row.type];
  const states = [];

  if (largestAbsGap >= 5 && row.absGap === largestAbsGap) {
    states.push(buildGapState(row, 1));
  }

  if (row.type === maxM.type && row.gap > 0) {
    states.push({
      type: row.type,
      label: `${row.type} 현재 압박 에너지`,
      direction: "완화 우선",
      sentence: `현재 ${row.type} 에너지를 원래보다 많이 사용하고 있어. 이 에너지는 ${profile.strength}으로 작용할 수 있지만, 과해지면 ${profile.overState}로 이어질 수 있어.`,
      oils: profile.softenOils,
      mode: "soften",
      priority: 2
    });
  }

  if (row.type === maxL.type && row.M < row.L) {
    states.push({
      type: row.type,
      label: `${row.type} 회복 필요 에너지`,
      direction: "회복 우선",
      sentence: `본래 ${row.type} 에너지가 강한 편이지만, 현재는 그 힘이 줄어든 상태로 보여. 그래서 ${profile.recoveryDirection}이 필요해.`,
      oils: profile.strengthenOils,
      mode: "strengthen",
      priority: 3
    });
  }

  if (row.type === minM.type && row.M <= 3) {
    states.push({
      type: row.type,
      label: `${row.type} 보완 필요`,
      direction: "필요 시 강화",
      sentence: `현재 ${row.type} 에너지가 낮게 나타나서 ${profile.recoveryDirection}을 보완해도 좋아.`,
      oils: profile.strengthenOils,
      mode: "strengthen",
      priority: 4
    });
  }

  if (row.M >= 7 && row.L >= 7) {
    states.push({
      type: row.type,
      label: `${row.type} 핵심 성향`,
      direction: "균형 유지",
      sentence: `${row.type} 에너지는 적응 스타일과 자연 스타일 모두에서 높아 핵심 성향으로 보여. 무리하게 더 끌어올리기보다 균형을 유지하는 편이 좋아.`,
      oils: profile.softenOils.slice(0, 2).concat(profile.strengthenOils.slice(0, 1)),
      mode: "balance",
      priority: 5
    });
  }

  return states.sort((a, b) => a.priority - b.priority);
}

function buildGapState(row, priority) {
  const profile = DISC_PROFILES[row.type];

  if (row.gap >= 5) {
    return {
      type: row.type,
      label: `${row.type} 과사용`,
      direction: "완화",
      sentence: `현재 ${row.type} 에너지를 원래보다 많이 사용하고 있어. 이 에너지는 ${profile.strength}으로 작용할 수 있지만, 과해지면 ${profile.overState}로 이어질 수 있어.`,
      oils: profile.softenOils,
      mode: "soften",
      priority
    };
  }

  if (row.gap <= -5) {
    return {
      type: row.type,
      label: `${row.type} 소진/억제`,
      direction: "회복/강화",
      sentence: `본래 ${row.type} 에너지가 강한 편이지만, 현재는 그 힘이 줄어든 상태로 보여. 그래서 ${profile.recoveryDirection}이 필요해.`,
      oils: profile.strengthenOils,
      mode: "strengthen",
      priority
    };
  }

  return buildFallbackState(row);
}

function buildFallbackState(row) {
  const profile = DISC_PROFILES[row.type];
  return {
    type: row.type,
    label: `${row.type} 균형 점검`,
    direction: "균형 유지",
    sentence: `${row.type} 에너지가 현재 가장 높게 나타나고 있어. ${profile.strength}을 살리되 과하게 밀어붙이지 않는 조합이 좋아.`,
    oils: profile.softenOils.slice(0, 2).concat(profile.strengthenOils.slice(0, 1)),
    mode: "balance",
    priority: 6
  };
}

function getOppositeOils(state) {
  const profile = DISC_PROFILES[state.type];
  if (state.mode === "soften") return profile.strengthenOils;
  if (state.mode === "strengthen") return profile.softenOils;
  return [];
}

function renderResult(scores = getSheetScores().scores, completed = getSheetScores().completed) {
  const environment = getSelectedEnvironment();
  const result = analyze(scores);
  const primaryProfile = DISC_PROFILES[result.maxL.type];
  const status = [result.primary.label, result.secondary?.label].filter(Boolean).join(" + ");
  const progress = `${completed} / ${TOTAL_GROUPS} 완료`;

  document.querySelector("#progressText").textContent = progress;
  document.querySelector("#resultProgress").textContent = progress;
  document.querySelector("#primaryDisc").textContent = completed ? `${result.maxL.type} ${primaryProfile.label}` : "-";
  document.querySelector("#mainStatus").textContent = completed ? status : "응답하면 표시됩니다";
  document.querySelector("#scentDirection").textContent = completed ? result.primary.direction : "-";
  document.querySelector("#discInterpretation").textContent = completed ? buildDiscInterpretation(result) : "검사 시트에 응답하면 DISC 경향을 요약합니다.";
  document.querySelector("#interpretation").textContent = completed ? buildAromaInterpretation(result) : "Most와 Least를 선택하면 적응 스타일과 자연 스타일 차이를 해석합니다.";
  document.querySelector("#environmentNote").textContent = ENVIRONMENT_NOTES[environment];
  renderChips("#recommendedOils", completed ? result.recommendedOils : []);
  renderChips("#avoidOils", completed ? (result.avoidOils.length ? result.avoidOils : ["과한 단일 방향 사용"]) : []);
  drawChart(result.rows);
}

function buildDiscInterpretation(result) {
  const natural = DISC_PROFILES[result.maxL.type];
  const adapted = DISC_PROFILES[result.maxM.type];
  return `자연 스타일은 ${result.maxL.type} ${natural.label} 경향이 가장 높습니다. ${natural.description} 현재 환경에서는 ${result.maxM.type} ${adapted.label} 에너지를 가장 많이 쓰고 있어, ${adapted.strength}이 더 전면에 나타납니다.`;
}

function buildAromaInterpretation(result) {
  const parts = [result.primary.sentence];
  if (result.secondary) parts.push(result.secondary.sentence);

  const oils = result.recommendedOils.join(", ");
  parts.push(`이번 블렌딩은 ${result.primary.direction} 방향을 중심으로, ${oils} 조합을 추천해.`);
  return parts.join(" ");
}

function renderChips(selector, oils) {
  document.querySelector(selector).innerHTML = oils
    .map((oil) => `<span class="chip">${oil}</span>`)
    .join("");
}

function drawChart(rows) {
  const canvas = document.querySelector("#discChart");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const chartTop = 36;
  const chartBottom = height - 48;
  const chartHeight = chartBottom - chartTop;
  const groupWidth = width / rows.length;
  const maxScore = TOTAL_GROUPS;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "#d9e2dc";
  ctx.lineWidth = 1;
  ctx.font = "13px Segoe UI, sans-serif";
  ctx.fillStyle = "#52605a";

  [0, 5, 10, 15, 20].forEach((tick) => {
    const y = chartBottom - (tick / maxScore) * chartHeight;
    ctx.beginPath();
    ctx.moveTo(42, y);
    ctx.lineTo(width - 18, y);
    ctx.stroke();
    ctx.fillText(String(tick), 12, y + 4);
  });

  rows.forEach((row, index) => {
    const center = groupWidth * index + groupWidth / 2 + 18;
    const barWidth = 28;
    const mHeight = (Math.min(row.M, maxScore) / maxScore) * chartHeight;
    const lHeight = (Math.min(row.L, maxScore) / maxScore) * chartHeight;

    ctx.fillStyle = COLORS[row.type];
    ctx.fillRect(center - barWidth - 5, chartBottom - mHeight, barWidth, mHeight);
    ctx.fillStyle = "#cfd9d2";
    ctx.fillRect(center + 5, chartBottom - lHeight, barWidth, lHeight);

    ctx.fillStyle = "#19201d";
    ctx.font = "bold 16px Segoe UI, sans-serif";
    ctx.fillText(row.type, center - 5, height - 18);

    ctx.fillStyle = row.gap >= 0 ? "#405d4b" : "#865055";
    ctx.font = "bold 12px Segoe UI, sans-serif";
    ctx.fillText(`Gap ${row.gap > 0 ? "+" : ""}${row.gap}`, center - 26, chartTop - 12);
  });

  ctx.fillStyle = "#52605a";
  ctx.font = "12px Segoe UI, sans-serif";
  ctx.fillText("색상: Most 기반 M", width - 180, 20);
  ctx.fillText("회색: 자연 강도 L", width - 180, 38);
}

function setSampleAnswers() {
  SAMPLE_SELECTIONS.forEach(([mostIndex, leastIndex], groupIndex) => {
    const most = document.querySelector(`input[name="most_${groupIndex}"][value="${mostIndex}"]`);
    const least = document.querySelector(`input[name="least_${groupIndex}"][value="${leastIndex}"]`);
    if (most) most.checked = true;
    if (least) least.checked = true;
  });
  syncFromSheet();
}

function resetAll() {
  document.querySelectorAll(".choice-radio input").forEach((input) => {
    input.checked = false;
  });
  const emptyScores = { D: { M: 0, L: 0 }, I: { M: 0, L: 0 }, S: { M: 0, L: 0 }, C: { M: 0, L: 0 } };
  setManualValues(emptyScores);
  renderResult(emptyScores, 0);
}

function preventDuplicateSelection(event) {
  const input = event.target;
  if (!input.matches(".choice-radio input")) return;

  const [kind, groupIndex] = input.name.split("_");
  const oppositeKind = kind === "most" ? "least" : "most";
  const opposite = document.querySelector(`input[name="${oppositeKind}_${groupIndex}"][value="${input.value}"]`);
  if (opposite?.checked) opposite.checked = false;
}

function maxBy(items, key) {
  return items.slice().sort((a, b) => b[key] - a[key])[0];
}

function minBy(items, key) {
  return items.slice().sort((a, b) => a[key] - b[key])[0];
}

function unique(items) {
  return [...new Set(items)];
}

createQuestionGroups();
createScoreControls();
questionGroups.addEventListener("change", (event) => {
  preventDuplicateSelection(event);
  syncFromSheet();
});
scoreGrid.addEventListener("input", syncManualInput);
document.querySelector("#environmentGroup").addEventListener("change", () => renderResult(getManualScores(), getSheetScores().completed));
sampleButton.addEventListener("click", setSampleAnswers);
resetButton.addEventListener("click", resetAll);
resetAll();
