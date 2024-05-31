// Importa dom no começo pq se importar por parte n funciona ???
// trycatch n ta funcionando, ñ sei pq
// troquei os for por map, corrigiu o bug da loginpage ai ja fiz em td pq fica melhor


document.addEventListener('DOMContentLoaded', function() {
  console.log('Script carregado');

  // Sidebar functionality
  const sidebar = document.querySelector(".sidebar");
  const sidebarBtn = document.querySelector(".sidebarBtn");
  if (sidebarBtn) {
    sidebarBtn.onclick = function() {
      sidebar.classList.toggle("active");
      if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    };
  } else {
    console.error('Sidebar button not found');
  }

  // Flashcard functionality
  const container = document.querySelector(".container");
  const addQuestionCard = document.getElementById("add-question-card");
  const cardButton = document.getElementById("save-btn");
  const question = document.getElementById("question");
  const answer = document.getElementById("answer");
  const errorMessage = document.getElementById("error");
  const addQuestion = document.getElementById("add-flashcard");
  const closeBtn = document.getElementById("close-btn");

  if (addQuestion && closeBtn && cardButton && question && answer) {
    let editBool = false;
    let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    let nextId = flashcards.length ? Math.max(...flashcards.map(flashcard => flashcard.id)) + 1 : 1;

    viewlist();
    addQuestion.addEventListener("click", () => {
      question.value = "";
      answer.value = "";
      addQuestionCard.classList.remove("hide");
    });

    closeBtn.addEventListener("click", () => {
      addQuestionCard.classList.add("hide");
      if (editBool) {
        editBool = false;
      }
    });

    cardButton.addEventListener("click", () => {
      let tempQuestion = question.value.trim();
      let tempAnswer = answer.value.trim();
      if (!tempQuestion || !tempAnswer) {
        errorMessage.classList.remove("hide");
      } else {
        let now = new Date().toLocaleString();
        if (editBool) {
          flashcards = flashcards.filter(flashcard => flashcard.id !== originalId);
        }
        let id = editBool ? originalId : nextId++;
        flashcards.push({ id, question: tempQuestion, answer: tempAnswer, lastEdited: now });
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
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
      flashcards.forEach(flashcard => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <p class="question-div">${flashcard.question}</p>
          <div class="answer-container hide">
          <p class="answer-div">${flashcard.answer}</p>
          <p class="answer-div">Id do produto: ${flashcard.id}</p>
          <p class="answer-div">Última edição: ${flashcard.lastEdited}</p>
          <p class="answer-div">Author: Guilherme Faccin</p>
          <p class="answer-div">Favoritado por: ${flashcard.favoritadoPor ? flashcard.favoritadoPor.length : 0} pessoas</p>
        </div>
          <a href="#" class="show-hide-btn">Show More</a>
          <div class="buttons-con">
            <button class="info"><i class="fa-solid fa-circle-info"></i></button>
            <div class="favorite-container">
              <button class="favorite"><i class="${flashcard.favorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i></button>
            </div>
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        `;
        div.setAttribute('data-id', flashcard.id);
        const answerContainer = div.querySelector(".answer-container");
        const showHideBtn = div.querySelector(".show-hide-btn");
        const editButton = div.querySelector(".edit");
        const deleteButton = div.querySelector(".delete");
        const favoriteButton = div.querySelector(".favorite");
        const infoButton = div.querySelector(".info");

        showHideBtn.addEventListener("click", () => {
          const cardId = flashcard.id;
          window.location.href = `/produtos/${cardId}`;
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

        infoButton.addEventListener("click", () => {
          answerContainer.classList.toggle("hide");
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
        if (!flashcards[index].favoritadoPor) {
          flashcards[index].favoritadoPor = [];
        }
        const userId = getCurrentUserId(); // Implemente a função para obter o ID do usuário atual
        if (!flashcards[index].favoritadoPor.includes(userId)) {
          flashcards[index].favoritadoPor.push(userId);
        } else {
          const userIndex = flashcards[index].favoritadoPor.indexOf(userId);
          flashcards[index].favoritadoPor.splice(userIndex, 1);
        }
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        viewlist();
      }
    }
  } else {
    console.error('Flashcard elements not found in the DOM');
  }

  // login
  const content = document.getElementById('content');
  const registerBtn = document.getElementById('register');
  const loginBtn = document.getElementById('login');

  console.log('DOM fully loaded and parsed'); // depurando
  console.log('registerBtn:', registerBtn); // depurando
  console.log('loginBtn:', loginBtn); // depurando
  console.log('content:', content); // depurando

  if (registerBtn && loginBtn && content) {
    registerBtn.addEventListener('click', () => {
      console.log('Register button clicked');
      content.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
      console.log('Login button clicked');
      content.classList.remove("active");
    });
  } else {
    console.error('Login/Register elements not found in the DOM'); 
  }
});
