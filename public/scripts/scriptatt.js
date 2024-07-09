// Selecionadores de elementos
const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");
const showMoreModal = document.getElementById("show-more-modal");
const closeShowMore = document.getElementById("close-show-more");
const showMoreTitle = document.getElementById("show-more-title");
const cardListContainer = document.querySelector(".card-list-container");

let editBool = false;
let originalId;
let flashcards = [];

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  initializeFlashcards();
  setupEventListeners();
});

function initializeFlashcards() {
  const cardElements = cardListContainer.querySelectorAll('.card');
  flashcards = Array.from(cardElements).map(card => ({
    id: parseInt(card.dataset.id),
    question: card.querySelector('.question-div').textContent,
    answer: card.querySelector('.answer-div').textContent,
    lastEdited: card.querySelector('.answer-div:nth-child(3)').textContent.split(': ')[1],
    autor: card.querySelector('.answer-div:nth-child(4)').textContent.split(': ')[1],
    favoritadoPor: []
  }));
}

function setupEventListeners() {
  addQuestion.addEventListener("click", showAddQuestionCard);
  closeBtn.addEventListener("click", hideAddQuestionCard);
  closeShowMore.addEventListener("click", hideShowMoreModal);
  cardButton.addEventListener("click", saveFlashcard);
  cardListContainer.addEventListener("click", handleCardActions);
}

function showAddQuestionCard() {
  question.value = "";
  answer.value = "";
  addQuestionCard.classList.remove("hide");
  document.body.classList.add('no-scroll');
}

function hideAddQuestionCard() {
  addQuestionCard.classList.add("hide");
  document.body.classList.remove('no-scroll');
  editBool = false;
}

function hideShowMoreModal() {
  showMoreModal.classList.add("hide");
  document.body.classList.remove('no-scroll');
}

function saveFlashcard() {
  const tempQuestion = question.value.trim();
  const tempAnswer = answer.value.trim();
  if (!tempQuestion || !tempAnswer) {
    errorMessage.classList.remove("hide");
    return;
  }
  
  const now = new Date().toLocaleString();
  const id = editBool ? originalId : Date.now();
  const newFlashcard = { id, question: tempQuestion, answer: tempAnswer, lastEdited: now, favoritadoPor: [] };
  
  if (editBool) {
    updateExistingFlashcard(newFlashcard);
  } else {
    addNewFlashcard(newFlashcard);
  }
  
  hideAddQuestionCard();
  question.value = "";
  answer.value = "";
  editBool = false;
}

function addNewFlashcard(flashcard) {
  flashcards.push(flashcard);
  const newCardElement = createCardElement(flashcard);
  cardListContainer.appendChild(newCardElement);
}

function updateExistingFlashcard(updatedFlashcard) {
  const index = flashcards.findIndex(f => f.id === updatedFlashcard.id);
  if (index !== -1) {
    flashcards[index] = updatedFlashcard;
    const existingCard = cardListContainer.querySelector(`[data-id="${updatedFlashcard.id}"]`);
    if (existingCard) {
      existingCard.replaceWith(createCardElement(updatedFlashcard));
    }
  }
}

function createCardElement(flashcard) {
  const div = document.createElement("div");
  div.classList.add("card");
  div.setAttribute('data-id', flashcard.id);
  div.innerHTML = `
    <p class="question-div">${flashcard.question}</p>
    <div class="answer-container hide">
      <p class="answer-div">${flashcard.answer}</p>
      <p class="answer-div">Id do produto: ${flashcard.id}</p>
      <p class="answer-div">Última edição: ${flashcard.lastEdited}</p>
      <p class="answer-div">Author: ${flashcard.autor || 'Não especificado'}</p>
    </div>
    <a href="#" class="show-more-btn">Show More</a>
    <div class="buttons-con">
      <button class="info"><i class="fa-solid fa-circle-info"></i></button>
      <div class="favorite-container">
        <button class="favorite"><i class="fa-regular fa-heart"></i> ${flashcard.favoritadoPor.length}</button>
      </div>
      <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  `;
  return div;
}

function handleCardActions(event) {
  const target = event.target;
  const card = target.closest('.card');
  if (!card) return;

  const flashcardId = parseInt(card.dataset.id);

  if (target.classList.contains('show-more-btn')) {
    showMoreInfo(flashcardId);
  } else if (target.classList.contains('info') || target.closest('.info')) {
    toggleAnswerVisibility(card);
  } else if (target.classList.contains('favorite') || target.closest('.favorite')) {
    toggleFavorite(flashcardId);
  } else if (target.classList.contains('edit') || target.closest('.edit')) {
    editFlashcard(flashcardId);
  } else if (target.classList.contains('delete') || target.closest('.delete')) {
    deleteFlashcard(flashcardId);
  }
}

function showMoreInfo(id) {
  const flashcard = flashcards.find(f => f.id === id);
  if (flashcard) {
    const additionalInfo = `
      <p class="answer-div">${flashcard.answer}</p>
      <p class="answer-div">Id do produto: ${flashcard.id}</p>
      <p class="answer-div">Última edição: ${flashcard.lastEdited}</p>
      <p class="answer-div">Author: ${flashcard.autor || 'Não especificado'}</p>
      <p class="answer-div">Favoritado por: ${flashcard.favoritadoPor.length} pessoas</p>
    `;
    showMoreTitle.innerHTML = flashcard.question + additionalInfo;
    showMoreModal.classList.remove("hide");
    document.body.classList.add('no-scroll');
  }
}

function toggleAnswerVisibility(card) {
  card.querySelector(".answer-container").classList.toggle("hide");
}

function toggleFavorite(id) {
  const flashcard = flashcards.find(f => f.id === id);
  if (flashcard) {
    const userId = getCurrentUserId();
    const index = flashcard.favoritadoPor.indexOf(userId);
    if (index === -1) {
      flashcard.favoritadoPor.push(userId);
    } else {
      flashcard.favoritadoPor.splice(index, 1);
    }
    updateFavoriteDisplay(id);
  }
}

function updateFavoriteDisplay(id) {
  const card = cardListContainer.querySelector(`[data-id="${id}"]`);
  if (card) {
    const flashcard = flashcards.find(f => f.id === id);
    const favoriteButton = card.querySelector('.favorite');
    const heartIcon = favoriteButton.querySelector('i');
    const favCount = flashcard.favoritadoPor.length;
    
    heartIcon.className = flashcard.favoritadoPor.includes(getCurrentUserId()) 
      ? 'fa-solid fa-heart' 
      : 'fa-regular fa-heart';
    favoriteButton.innerHTML = `${heartIcon.outerHTML} ${favCount}`;
  }
}

function editFlashcard(id) {
  const flashcard = flashcards.find(f => f.id === id);
  if (flashcard) {
    editBool = true;
    originalId = id;
    question.value = flashcard.question;
    answer.value = flashcard.answer;
    addQuestionCard.classList.remove("hide");
    document.body.classList.add('no-scroll');
  }
}

function deleteFlashcard(id) {
  flashcards = flashcards.filter(f => f.id !== id);
  const cardToRemove = cardListContainer.querySelector(`[data-id="${id}"]`);
  if (cardToRemove) {
    cardToRemove.remove();
  }
}

function getCurrentUserId() {
  // Implemente a lógica para obter o ID do usuário atual
  return 'currentUserId';
}