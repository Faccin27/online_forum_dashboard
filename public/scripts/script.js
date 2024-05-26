console.log('Script carregado');

let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".sidebarBtn");
sidebarBtn.onclick = function() {
  sidebar.classList.toggle("active");
  if(sidebar.classList.contains("active")){
  sidebarBtn.classList.replace("bx-menu" ,"bx-menu-alt-right");
}else
  sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
}

const container = document.querySelector(".container");
const addQuestionCard = document.getElementById("add-question-card");
const cardButton = document.getElementById("save-btn");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const errorMessage = document.getElementById("error");
const addQuestion = document.getElementById("add-flashcard");
const closeBtn = document.getElementById("close-btn");

let editBool = false;
let originalId = null;
let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

addQuestion.addEventListener("click", () => {
  container.classList.add("hide");
  question.value = "";
  answer.value = "";
  addQuestionCard.classList.remove("hide");
});

closeBtn.addEventListener("click", () => {
  container.classList.remove("hide");
  addQuestionCard.classList.add("hide");
  if (editBool) {
    editBool = false;
  }
});

cardButton.addEventListener("click", () => {
  // Save the flashcard
  let tempQuestion = question.value.trim();
  let tempAnswer = answer.value.trim();
  if (!tempQuestion || !tempAnswer) {
    errorMessage.classList.remove("hide");
  } else {
    if (editBool) {
      flashcards = flashcards.filter(flashcard => flashcard.id !== originalId);
    }
    let id = Date.now();
    flashcards.push({ id, question: tempQuestion, answer: tempAnswer });
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    container.classList.remove("hide");
    errorMessage.classList.add("hide");
    viewlist();
    question.value = "";
    answer.value = "";
    editBool = false;
    addQuestionCard.classList.add("hide"); 
  }
});
function viewlist() {
  const listCard = document.querySelector(".card-list-container");
  listCard.innerHTML = '';
  flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
  flashcards.forEach(flashcard => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <p class="question-div">${flashcard.question}</p>
      <p class="answer-div hide">${flashcard.answer}</p>
      <a href="#" class="show-hide-btn">Show/Hide</a>
      <div class="buttons-con">
        <div class="favorite-container">
          <button class="favorite"><i class="${flashcard.favorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i></button>
        </div>
        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;
    div.setAttribute('data-id', flashcard.id);
    const displayAnswer = div.querySelector(".answer-div");
    const showHideBtn = div.querySelector(".show-hide-btn");
    const editButton = div.querySelector(".edit");
    const deleteButton = div.querySelector(".delete");
    const favoriteButton = div.querySelector(".favorite");

    showHideBtn.addEventListener("click", () => {
      displayAnswer.classList.toggle("hide");
    });

    editButton.addEventListener("click", () => {
      editBool = true;
      modifyElement(editButton, true);
      addQuestionCard.classList.remove("hide");
    });

    deleteButton.addEventListener("click", () => {
      modifyElement(deleteButton);
    });

    favoriteButton.addEventListener("click", () => {
      toggleFavorite(flashcard.id);
    });

    listCard.appendChild(div);
  });
}



const modifyElement = (element, edit = false) => {
  const parentDiv = element.parentElement.parentElement;
  const id = Number(parentDiv.getAttribute('data-id'));
  const parentQuestion = parentDiv.querySelector(".question-div").innerText;
  if (edit) {
    const parentAns = parentDiv.querySelector(".answer-div").innerText;
    answer.value = parentAns;
    question.value = parentQuestion;
    originalId = id;
    disableButtons(true);
  } else {
    flashcards = flashcards.filter(flashcard => flashcard.id !== id);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }
  parentDiv.remove();
};

const disableButtons = (value) => {
  const editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = value;
  });
};

document.addEventListener("DOMContentLoaded", viewlist);

function toggleFavorite(id) {
  const index = flashcards.findIndex(flashcard => flashcard.id === id);
  if (index !== -1) {
    flashcards[index].favorite = !flashcards[index].favorite;
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    viewlist(); 
  }
}
