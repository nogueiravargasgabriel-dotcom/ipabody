"use strict";

const STORAGE_KEY = "o-corpo-na-arte-com-simulado";

const topics = [
  { id: "primitivas", title: "Manifestações primitivas", mapTitle: ["Manifestações", "primitivas"] },
  { id: "grecia-roma", title: "Grécia e Roma antigas", mapTitle: ["Grécia e Roma", "antigas"] },
  { id: "medieval", title: "Idade Média", mapTitle: ["Idade Média"] },
  { id: "renascimento", title: "Renascimento", mapTitle: ["Renascimento"] }
];

const mapPositions = [
  { x: 450, y: 85 },
  { x: 700, y: 250 },
  { x: 450, y: 415 },
  { x: 200, y: 250 }
];

const questions = [
  {
    title: "Representações primitivas",
    support: "Na arte rupestre, figuras humanas podem aparecer com traços simplificados e membros alongados, especialmente quando a imagem busca sugerir movimento.",
    prompt: "Essa forma de representação indica que as imagens pré-históricas",
    options: {
      A: "eram tentativas fracassadas de reproduzir o corpo com precisão anatômica.",
      B: "utilizavam simplificação e estilização como recursos de representação.",
      C: "tinham como função exclusiva decorar os espaços habitados.",
      D: "não apresentavam interesse pelo corpo humano.",
      E: "seguiam as mesmas regras de proporção do Renascimento."
    },
    answer: "B",
    explanation: "A simplificação e a estilização são escolhas visuais. O alongamento dos membros podia contribuir para sugerir movimento, e não deve ser entendido simplesmente como falta de habilidade."
  },
  {
    title: "Arte rupestre e ancestralidade",
    support: "As manifestações rupestres fazem parte da história e da ancestralidade dos povos que as produziram.",
    prompt: "Compreender esse contexto ajuda a evitar a ideia de que a arte primitiva",
    options: {
      A: "tem valor apenas quando representa animais.",
      B: "é menos desenvolvida por ser anterior a outras tradições artísticas.",
      C: "pode ser interpretada a partir de seus próprios contextos culturais e históricos.",
      D: "não possui relação com a vida coletiva.",
      E: "deve ser analisada exclusivamente por critérios contemporâneos."
    },
    answer: "C",
    explanation: "A interpretação deve considerar a história e a cultura dos povos responsáveis pelas obras, sem colocá-las automaticamente abaixo de produções posteriores."
  },
  {
    title: "Grécia antiga e ideal corporal",
    support: "Na Grécia antiga, o exercício físico, os ginásios e a nudez masculina relacionavam-se a um ideal de beleza corporal e equilíbrio entre corpo e mente.",
    prompt: "A valorização do corpo nesse contexto estava ligada",
    options: {
      A: "à rejeição completa da atividade física.",
      B: "a um ideal social de beleza, exercício e equilíbrio.",
      C: "à igualdade de acesso entre homens e mulheres aos ginásios.",
      D: "à proibição de representar atletas.",
      E: "somente à observação científica da anatomia."
    },
    answer: "B",
    explanation: "O texto relaciona o corpo belo ao exercício físico e a uma ideia de equilíbrio entre corpo e mente. O acesso aos ginásios, porém, não era igual para homens e mulheres."
  },
  {
    title: "Grécia e Roma: corpo e poder",
    support: "Na Grécia, o corpo podia expressar beleza e preparo físico; em Roma, esculturas de imperadores, soldados e gladiadores também evidenciavam poder e força.",
    prompt: "A comparação permite perceber que as representações do corpo",
    options: {
      A: "possuem significados associados às sociedades em que são produzidas.",
      B: "são sempre independentes da política e da vida social.",
      C: "tinham uma única função decorativa em ambas as culturas.",
      D: "eram proibidas em Roma.",
      E: "deixaram de valorizar o corpo no período Helenístico."
    },
    answer: "A",
    explanation: "As imagens corporais podem expressar ideais estéticos, valores sociais e relações de poder, variando conforme seu contexto histórico."
  },
  {
    title: "Idade Média e simbolismo",
    support: "No Ocidente medieval, sob forte influência religiosa, muitas representações priorizavam símbolos e significados espirituais em vez da descrição física do corpo.",
    prompt: "Nesse padrão de representação, o corpo",
    options: {
      A: "era sempre exibido com estudo anatômico detalhado.",
      B: "podia ser subordinado à comunicação de ideias religiosas e simbólicas.",
      C: "era o único elemento importante da imagem.",
      D: "deixava de aparecer em qualquer tipo de obra.",
      E: "passava a seguir o ideal atlético grego."
    },
    answer: "B",
    explanation: "O texto destaca a prioridade do significado religioso e da alma sobre a representação física, com o simbolismo ocupando um lugar central."
  },
  {
    title: "Renascimento e beleza idealizada",
    support: "No Renascimento, a representação humana retomou ideais clássicos e buscou combinar semelhança com o real e uma perfeição superior ao modelo observado.",
    prompt: "Essa concepção pode ser definida como",
    options: {
      A: "uma beleza idealizada ou sublimada.",
      B: "uma rejeição completa da figura humana.",
      C: "uma reprodução sem seleção ou interpretação.",
      D: "um retorno exclusivo ao simbolismo medieval.",
      E: "uma proibição do estudo da proporção."
    },
    answer: "A",
    explanation: "A beleza renascentista podia se aproximar da realidade, mas também idealizar o corpo, buscando uma perfeição superior ao modelo real."
  },
  {
    title: "Homem vitruviano, anatomia e proporção",
    support: "Leonardo da Vinci relacionou seus estudos do corpo a escritos de Vitrúvio e a conhecimentos de anatomia, matemática e geometria.",
    prompt: "O exemplo do Homem vitruviano evidencia",
    options: {
      A: "a separação completa entre arte e investigação científica.",
      B: "a relação entre observação do corpo, proporção e conhecimento artístico.",
      C: "a rejeição renascentista da geometria.",
      D: "a intenção de esconder qualquer referência à Antiguidade.",
      E: "o abandono do estudo anatômico após a Idade Média."
    },
    answer: "B",
    explanation: "O Homem vitruviano articula desenho, observação anatômica, geometria e proporção, exemplificando o interesse renascentista pela investigação do corpo."
  }
];

let data = {
  notes: {},
  answers: {},
  quizFinished: false
};

document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  loadData();
  setupMenu();
  setupNotes();
  setupQuizActions();
  setupDialog();
  renderQuiz();
  renderMindMap();
}

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved && typeof saved === "object") {
      data = {
        notes: saved.notes || {},
        answers: saved.answers || {},
        quizFinished: Boolean(saved.quizFinished)
      };
    }
  } catch (error) {
    console.warn("Não foi possível carregar os dados salvos.", error);
  }

  document.querySelectorAll("[data-topic]").forEach((field) => {
    const savedNote = data.notes[field.dataset.topic];
    if (typeof savedNote === "string") field.value = savedNote;
  });
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn("Não foi possível salvar os dados.", error);
  }
}

function setupMenu() {
  const button = document.querySelector("#menu-button");
  const navigation = document.querySelector("#main-navigation");
  if (!button || !navigation) return;

  button.addEventListener("click", () => {
    const open = navigation.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });

  navigation.addEventListener("click", (event) => {
    if (!event.target.closest("a")) return;
    navigation.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Abrir menu");
  });
}

function setupNotes() {
  document.querySelectorAll("[data-topic]").forEach((field) => {
    field.addEventListener("input", () => {
      data.notes[field.dataset.topic] = field.value;
      saveData();
      showSaveStatus(field);
      renderMindMap();
    });
  });
}

function showSaveStatus(field) {
  const status = field.parentElement.querySelector(".save-status");
  if (!status) return;

  status.textContent = "Anotação salva neste navegador.";
  clearTimeout(field.saveTimer);
  field.saveTimer = setTimeout(() => {
    status.textContent = "As anotações são salvas automaticamente neste navegador.";
  }, 1500);
}

function setupQuizActions() {
  document.querySelector("#finish-quiz")?.addEventListener("click", gradeQuiz);
  document.querySelector("#reset-quiz")?.addEventListener("click", resetQuiz);
}

function renderQuiz() {
  const container = document.querySelector("#quiz-container");
  if (!container) return;

  container.innerHTML = questions.map((question, index) => {
    const number = index + 1;
    const options = Object.entries(question.options).map(([letter, text]) => `
      <li>
        <label class="option-label">
          <input
            type="radio"
            name="question-${number}"
            value="${letter}"
            data-question="${number}"
            ${data.answers[number] === letter ? "checked" : ""}>
          <span><strong>${letter})</strong> ${escapeHtml(text)}</span>
        </label>
      </li>
    `).join("");

    const isAnswered = Boolean(data.answers[number]);
    const correct = data.answers[number] === question.answer;
    const showFeedback = data.quizFinished;

    return `
      <article class="question-card ${showFeedback && isAnswered ? (correct ? "is-correct" : "is-wrong") : ""}"
        id="question-${number}">
        <h3>Questão ${number} · ${escapeHtml(question.title)}</h3>

        <div class="question-support">
          <p><strong>Texto de apoio</strong></p>
          <p>${escapeHtml(question.support)}</p>
        </div>

        <p class="question-command">${escapeHtml(question.prompt)}</p>
        <ul class="options-list">${options}</ul>

        <div class="question-feedback ${correct ? "correct-feedback" : "wrong-feedback"}"
          id="feedback-${number}" ${showFeedback ? "" : "hidden"}>
          ${showFeedback ? feedbackMarkup(question, data.answers[number]) : ""}
        </div>
      </article>
    `;
  }).join("");

  container.querySelectorAll('input[type="radio"]').forEach((input) => {
    input.addEventListener("change", () => {
      data.answers[input.dataset.question] = input.value;
      data.quizFinished = false;
      saveData();
      updateQuizProgress();
      renderMindMap();
      hideQuizResult();
      clearFeedback();
    });
  });

  updateQuizProgress();
  if (data.quizFinished) showQuizResult();
}

function feedbackMarkup(question, selected) {
  if (!selected) {
    return `<strong>Não respondida.</strong>
      <p>A alternativa correta é <strong>${question.answer}</strong>.</p>
      <p>${escapeHtml(question.explanation)}</p>`;
  }

  const correct = selected === question.answer;
  return `<strong>${correct ? "Resposta correta!" : "Resposta para revisar."}</strong>
    <p>Sua resposta: <strong>${selected}</strong>. Alternativa correta: <strong>${question.answer}</strong>.</p>
    <p>${escapeHtml(question.explanation)}</p>`;
}

function updateQuizProgress() {
  const progress = document.querySelector("#quiz-progress");
  if (!progress) return;

  const answered = questions.filter((_, index) => data.answers[index + 1]).length;
  progress.textContent = `${answered} de ${questions.length} questões respondidas.`;
}

function gradeQuiz() {
  data.quizFinished = true;
  saveData();

  questions.forEach((question, index) => {
    const number = index + 1;
    const card = document.querySelector(`#question-${number}`);
    const feedback = document.querySelector(`#feedback-${number}`);
    const selected = data.answers[number];
    const correct = selected === question.answer;

    card?.classList.remove("is-correct", "is-wrong");
    card?.classList.add(correct ? "is-correct" : "is-wrong");

    if (feedback) {
      feedback.hidden = false;
      feedback.className = `question-feedback ${correct ? "correct-feedback" : "wrong-feedback"}`;
      feedback.innerHTML = feedbackMarkup(question, selected);
    }
  });

  showQuizResult();
  renderMindMap();
}

function showQuizResult() {
  const result = document.querySelector("#quiz-result");
  if (!result) return;

  const score = questions.reduce((total, question, index) =>
    total + (data.answers[index + 1] === question.answer ? 1 : 0), 0);
  const unanswered = questions.filter((_, index) => !data.answers[index + 1]).length;

  result.hidden = false;
  result.innerHTML = `
    <strong>${score} de ${questions.length} respostas corretas</strong>
    <span>${unanswered
      ? `${unanswered} questão(ões) ainda sem resposta.`
      : "Você respondeu a todas as questões."}</span>
  `;
}

function hideQuizResult() {
  const result = document.querySelector("#quiz-result");
  if (result) result.hidden = true;
}

function clearFeedback() {
  document.querySelectorAll(".question-card").forEach((card) => {
    card.classList.remove("is-correct", "is-wrong");
  });

  document.querySelectorAll(".question-feedback").forEach((feedback) => {
    feedback.hidden = true;
  });
}

function resetQuiz() {
  data.answers = {};
  data.quizFinished = false;
  saveData();
  renderQuiz();
  renderMindMap();
}

function setupDialog() {
  const dialog = document.querySelector("#note-dialog");
  document.querySelector("#close-dialog")?.addEventListener("click", closeDialog);

  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dialog?.open) closeDialog();
  });
}

function renderMindMap() {
  const svg = document.querySelector("#mind-map");
  const summary = document.querySelector("#map-summary");
  if (!svg || !summary) return;

  svg.replaceChildren();

  const center = { x: 450, y: 250, radius: 67 };
  const nodes = topics.map((topic, index) => ({
    ...topic,
    ...mapPositions[index],
    radius: 62,
    hasNote: Boolean(data.notes[topic.id] && data.notes[topic.id].trim())
  }));

  nodes.forEach((node) => {
    svg.appendChild(createSvgElement("line", {
      x1: center.x,
      y1: center.y,
      x2: node.x,
      y2: node.y,
      class: "map-link"
    }));
  });

  drawMapNode(svg, {
    x: center.x,
    y: center.y,
    radius: center.radius,
    titleLines: ["O CORPO"],
    subtitle: "na história da Arte",
    type: "root"
  });

  nodes.forEach((node) => {
    drawMapNode(svg, {
      ...node,
      titleLines: node.mapTitle,
      subtitle: node.hasNote ? "Análise registrada" : "Sem análise",
      type: node.hasNote ? "noted" : "period"
    });
  });

  const complete = nodes.filter((node) => node.hasNote).length;
  summary.textContent =
    `${complete} de ${nodes.length} tópicos com análise registrada. Selecione um ramo para consultar sua anotação.`;
}

function drawMapNode(svg, node) {
  const isRoot = node.type === "root";
  const group = createSvgElement("g", {
    class: `map-node ${node.type}`,
    tabindex: isRoot ? "-1" : "0",
    role: isRoot ? "img" : "button",
    "aria-label": isRoot
      ? "O corpo na história da Arte"
      : `${node.title}. ${node.hasNote ? "Análise registrada." : "Sem análise registrada."}`
  });

  group.appendChild(createSvgElement("circle", {
    cx: node.x,
    cy: node.y,
    r: node.radius
  }));

  const lines = node.titleLines || [node.title];
  const titleStart = node.y - (lines.length === 1 ? 8 : 15);

  lines.forEach((line, index) => {
    const title = createSvgElement("text", {
      x: node.x,
      y: titleStart + index * 16,
      class: "map-title"
    });
    title.textContent = line;
    group.appendChild(title);
  });

  const subtitle = createSvgElement("text", {
    x: node.x,
    y: node.y + (lines.length === 1 ? 17 : 25),
    class: "map-subtitle"
  });
  subtitle.textContent = node.subtitle;
  group.appendChild(subtitle);

  if (!isRoot) {
    const open = () => showTopicNote(node.id, node.title);
    group.addEventListener("click", open);

    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  }

  svg.appendChild(group);
}

function showTopicNote(id, title) {
  const dialog = document.querySelector("#note-dialog");
  const dialogTitle = document.querySelector("#dialog-title");
  const dialogText = document.querySelector("#dialog-text");
  if (!dialog || !dialogTitle || !dialogText) return;

  dialogTitle.textContent = title;
  dialogText.textContent = data.notes[id]?.trim() ||
    "Ainda não há uma análise registrada para este tópico.";

  if (typeof dialog.showModal === "function") dialog.showModal();
  else dialog.setAttribute("open", "");
}

function closeDialog() {
  const dialog = document.querySelector("#note-dialog");
  if (!dialog) return;

  if (typeof dialog.close === "function") dialog.close();
  else dialog.removeAttribute("open");
}

function createSvgElement(tag, attributes) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&")
    .replaceAll("<", "<")
    .replaceAll(">", ">")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}