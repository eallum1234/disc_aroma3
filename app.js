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
  group("사람을 잘 믿고 밝은 편이다", 2, 2, "다른 사람을 배려하는 편이다", 4, 4, "새로운 일을 겁내지 않는다", 5, 1, "다른 사람 의견에 잘 맞춰준다", 3, 3),
  group("사람들에게 따뜻하게 대한다", 2, 5, "시키는 일을 편하게 따른다", 5, 4, "빨리 결정하고 결과를 내려고 한다", 1, 1, "지금 상태에 만족하는 편이다", 3, 5),
  group("새로운 아이디어를 잘 떠올린다", 1, 1, "조용하고 말수가 적은 편이다", 4, 5, "사람들과 쉽게 친해진다", 5, 2, "싸우기보다 좋게 해결하려 한다", 3, 3),
  group("혼자서도 자신 있게 행동한다", 1, 1, "행동하기 전에 조심스럽게 생각한다", 4, 4, "걱정보다 일단 해보는 편이다", 2, 2, "예의 바르게 행동하려 한다", 3, 5),
  group("작은 부분까지 꼼꼼하게 본다", 5, 4, "목표를 정하면 끝까지 밀고 간다", 1, 5, "팀과 함께 움직이는 걸 좋아한다", 5, 3, "다른 사람을 응원하고 힘을 준다", 2, 2),
  group("계획을 세우고 책임감 있게 행동한다", 4, 5, "인정받고 성장하고 싶어 한다", 1, 1, "새로운 경험을 좋아한다", 2, 2, "믿을 수 있고 이야기를 잘 들어준다", 3, 3),
  group("상처를 쉽게 받는 편이다", 4, 4, "내 의견을 강하게 말하는 편이다", 1, 1, "익숙한 환경이 편하다", 3, 3, "내 생각을 말하고 인정받고 싶어 한다", 5, 2),
  group("규칙이 많으면 답답하고 불편하다", 2, 2, "정해진 방식보다 새롭게 해보고 싶다", 5, 1, "규칙이 있으면 마음이 편하다", 3, 3, "규칙은 모두에게 공평해야 한다고 생각한다", 4, 5),
  group("조용하고 편안한 상태를 좋아한다", 3, 3, "말을 잘하고 사람들의 관심을 끈다", 2, 5, "약속과 규칙을 잘 지키려 한다", 5, 4, "빠르게 움직이고 에너지가 많다", 1, 1),
  group("인정받거나 좋은 결과를 얻고 싶어 한다", 1, 1, "사람들과 모이는 자리를 좋아한다", 2, 5, "배우고 성장하는 일을 좋아한다", 5, 4, "위험한 일보다 안전한 선택을 좋아한다", 3, 3),
  group("계획을 세우고 시간을 잘 지키려 한다", 4, 5, "마음이 급하고 빨리 움직이는 편이다", 1, 1, "믿을 수 있고 쉽게 포기하지 않는다", 3, 3, "감정에 따라 바로 행동할 때가 있다", 2, 2),
  group("쉽게 결정하지 않고 따져보는 편이다", 4, 5, "한결같고 끝까지 꼼꼼하게 한다", 5, 3, "사람들과 있을 때 에너지가 난다", 5, 2, "먼저 나서고 바로 말하는 편이다", 1, 1),
  group("너무 조심해서 행동이 늦어질 때가 있다", 5, 4, "사람이나 일에 너무 몰입할 때가 있다", 2, 2, "익숙한 방식이 편하고 변화가 부담스럽다", 3, 5, "말이 세게 느껴질 때가 있다", 5, 1),
  group("기분 표현이 크고 밝은 편이다", 2, 2, "다른 사람 편을 잘 들어준다", 3, 5, "순서와 정확함을 중요하게 생각한다", 5, 4, "이기고 싶어 하고 토론을 좋아한다", 1, 1),
  group("문제를 차분히 분석하는 편이다", 4, 4, "다른 사람 이야기를 잘 들어준다", 3, 3, "사람들에게 힘이 되는 말을 잘한다", 2, 2, "일을 잘 나누고 맡길 줄 안다", 1, 1),
  group("먼저 정확한 사실을 확인하려 한다", 4, 5, "시작한 일은 끝까지 하려 한다", 3, 3, "앞에서 방향을 잡고 이끌고 싶어 한다", 1, 5, "내 생각을 잘 설명해서 설득하려 한다", 2, 2),
  group("어려워도 밀고 나가는 힘이 있다", 1, 1, "긍정적이고 사람들의 관심을 끈다", 5, 2, "혼자보다 함께하는 걸 좋아한다", 5, 3, "실수 없이 정확하게 하려 한다", 4, 4),
  group("믿음을 지키고 생각을 깊게 한다", 3, 3, "새로운 도전을 좋아한다", 1, 1, "생각이 깊고 다른 사람도 배려한다", 5, 4, "사람들에게 호감을 얻고 말을 잘한다", 2, 2),
  group("바로 사기보다 천천히 생각하고 산다", 3, 3, "마음에 들면 빠르게 결정하고 산다", 1, 1, "내가 원하는 것에는 돈을 쓰는 편이다", 2, 5, "갖고 싶어도 참을 수 있다", 5, 4),
  group("잘 맞춰주고 친근하게 대한다", 3, 3, "밝고 에너지가 많다", 5, 2, "겁내지 않고 과감하게 행동한다", 1, 1, "규칙을 지키면서 상황에 맞춘다", 4, 4),
  group("기준이 높고 정확하게 하려 한다", 4, 4, "반복되는 일은 금방 지루해한다", 5, 2, "변화를 좋아하고 과감하게 시도한다", 1, 1, "편하게 다가가고 친절하게 행동한다", 3, 5),
  group("강하게 이끌고 영향력을 주고 싶어 한다", 5, 1, "관심받는 것과 새로운 기회를 좋아한다", 2, 5, "다투기보다 편안하게 지내고 싶다", 3, 3, "규칙을 지키고 조심스럽게 말한다", 5, 4),
  group("감정이 올라오면 바로 표현하는 편이다", 2, 2, "너무 많은 부분을 따져서 복잡해질 때가 있다", 4, 5, "원하는 것을 강하게 요구하는 편이다", 1, 1, "싸움을 피하고 안정적으로 행동한다", 5, 3),
  group("새롭고 독특한 생각을 잘한다", 2, 2, "중요한 것만 정리하고 결과를 내려고 한다", 1, 5, "믿을 수 있고 진심이 느껴진다", 5, 3, "기준이 높고 더 잘하려고 노력한다", 4, 5)
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
