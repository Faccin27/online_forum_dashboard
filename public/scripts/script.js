

document.addEventListener('DOMContentLoaded', function () {
  const lightTheme = document.getElementById('light');
const darkTheme = document.getElementById('dark');
const styleTheme = document.getElementById('style');

if(styleTheme){
  console.log("a")
}

if(darkTheme){
  console.log("d")
}
if(lightTheme){
  console.log("w")
}
  console.log('Script carregado');

  const sidebar = document.querySelector(".sidebar");
  const sidebarBtn = document.querySelector(".sidebarBtn");
  if (sidebarBtn) {
    sidebarBtn.onclick = function () {
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


  
document.addEventListener('DOMContentLoaded', () => {
  initializeFlashcards();
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

  function closeAddQuestionModal() {
    const addQuestionCard = document.getElementById("add-question-card");
    addQuestionCard.classList.add("hide");
    document.body.classList.remove('no-scroll');
  }

  if (addQuestion && closeBtn && cardButton && question && answer && showMoreModal && closeShowMore && showMoreTitle) {
    let editBool = false;
    let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    let nextId = flashcards.length ? Math.max(...flashcards.map(flashcard => flashcard.id)) + 1 : 1;

    addQuestion.addEventListener("click", () => {
      
      question.value = "";
      answer.value = "";
      addQuestionCard.classList.remove("hide");
      document.body.classList.add('no-scroll');
      viewlist()
      
    });

    closeBtn.addEventListener("click", () => {
      addQuestionCard.classList.add("hide");
      document.body.classList.remove('no-scroll');
      if (editBool) {
        editBool = false;
      }
      viewlist()
    });

    closeShowMore.addEventListener("click", () => {
      showMoreModal.classList.add("hide");
      document.body.classList.remove('no-scroll');
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
        flashcards.push({ id, question: tempQuestion, answer: tempAnswer, lastEdited: now, favoritadoPor: [] });
        localStorage.setItem('flashcards', JSON.stringify(flashcards));
        viewlist();
        question.value = "";
        answer.value = "";
        editBool = false;
        addQuestionCard.classList.add("hide");
        document.body.classList.remove('no-scroll');
        closeAddQuestionModal();
        console.log("F")
      }
    });

    function viewlist() {
      const listCard = document.querySelector(".card-list-container");
      listCard.innerHTML = '';
      flashcards.forEach(flashcard => {
        const favoritadoPor = flashcard.favoritadoPor || [];
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
          <p class="question-div">${flashcard.question}</p>
          <div class="answer-container hide">
            <p class="answer-div">Author: Guilherme Faccin</p>
          </div>
          <a href="#" class="show-more-btn">Show More</a>
          <div class="buttons-con">
            <button class="info"><i class="fa-solid fa-circle-info"></i></button>
            <div class="favorite-container">
              <button class="favorite ${favoritadoPor.includes(getCurrentUserId()) ? 'active' : ''}"><i class="${favoritadoPor.includes(getCurrentUserId()) ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}"></i> ${favoritadoPor.length}</button>
            </div>
            <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        `;
        div.setAttribute('data-id', flashcard.id);
        const answerContainer = div.querySelector(".answer-container");
        const showMoreBtn = div.querySelector(".show-more-btn");
        const editButton = div.querySelector(".edit");
        const deleteButton = div.querySelector(".delete");
        const favoriteButton = div.querySelector(".favorite");
        const infoButton = div.querySelector(".info");

        showMoreBtn.addEventListener("click", (event) => {
          event.preventDefault();
          const additionalInfo = `
            <p class="answer-div">${flashcard.answer}</p>
            <p class="answer-div">Id do produto: ${flashcard.id}</p>
            <p class="answer-div">Última edição: ${flashcard.lastEdited}</p>
            <p class="answer-div">Author: Guilherme Faccin</p>
            <p class="answer-div">Favoritado por: ${favoritadoPor.length} pessoas</p>
          `;
          showMoreTitle.innerHTML = flashcard.question + additionalInfo;
          showMoreModal.classList.remove("hide");
          document.body.classList.add('no-scroll');// pra n rolar 
        });

        editButton.addEventListener("click", () => {
          editBool = true;
          modifyElement(editButton, true);
          addQuestionCard.classList.remove("hide");
          document.body.classList.add('no-scroll');
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

    function toggleFavorite(id) {
      const index = flashcards.findIndex(flashcard => flashcard.id === id);
      if (index !== -1) {
        const userId = getCurrentUserId();
        if (!flashcards[index].favoritadoPor) {
          flashcards[index].favoritadoPor = [];
        }
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

    function getCurrentUserId() {
      return 'currentUserId';
    }

    viewlist();
    const addCommentButton = document.getElementById("add-comment-btn");
    const commentTextArea = document.getElementById("comment");
    const commentList = document.querySelector(".comment-list");

    addCommentButton.addEventListener("click", function () {
      const commentText = commentTextArea.value.trim();
      if (commentText !== "") {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");

        const imageElement = document.createElement("img");
        imageElement.src = "/images/profile.jpg";
        imageElement.alt = "Profile Picture";
        commentElement.appendChild(imageElement);

        const nameAndTextContainer = document.createElement("div");

        const nameElement = document.createElement("span");
        nameElement.textContent = "Faccin ";
        nameAndTextContainer.appendChild(nameElement);

        nameAndTextContainer.appendChild(document.createElement("br"));

        const textElement = document.createElement("span");
        textElement.textContent = commentText;
        nameAndTextContainer.appendChild(textElement);

        commentElement.appendChild(nameAndTextContainer);

        const dateElement = document.createElement("span");
        dateElement.classList.add("date"); // Adiciona a classe 'date'
        const currentTime = new Date();
        dateElement.textContent = currentTime.toLocaleTimeString();
        commentElement.appendChild(dateElement);

        commentList.appendChild(commentElement);
        commentTextArea.value = ""; // Limpar o campo de texto
      }
    });




  } else {
    console.error('Flashcard elements not found in the DOM');
  }
  
  const content = document.getElementById('content');
  const registerBtn = document.getElementById('register');
  const loginBtn = document.getElementById('login');

  console.log('DOM fully loaded and parsed');
  console.log('registerBtn:', registerBtn);
  console.log('loginBtn:', loginBtn);
  console.log('content:', content);

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

function toggleCombobox() {
  var combobox = document.getElementById("profileCombobox");
  var icon = document.querySelector(".bx-chevron-down, .bx-chevron-up");

  if (combobox.classList.contains("show")) {
    combobox.classList.remove("show");
    icon.classList.remove("bx-chevron-up");
    icon.classList.add("bx-chevron-down");
    
    // Aguarda o fim da animação antes de esconder completamente
    setTimeout(() => {
      combobox.style.display = "none";
    }, 300); // 300ms é a duração da animação no CSS
  } else {
    combobox.style.display = "block";
    
    // Força um reflow para que a transição funcione
    combobox.offsetHeight;
    
    combobox.classList.add("show");
    icon.classList.remove("bx-chevron-down");
    icon.classList.add("bx-chevron-up");
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const button = document.querySelector('.nightmode-btn');
  const icon = button.querySelector('i');
  const lightTheme = document.getElementById('light');
  const darkTheme = document.getElementById('dark');

  function setTheme(theme) {
    if (theme === 'light') {
      lightTheme.disabled = false;
      darkTheme.disabled = true;
      
    } else if (theme === 'dark') {
      lightTheme.disabled = true;
      darkTheme.disabled = false;
      
    }
    console.log(theme);
  }



  button.addEventListener('click', function() {
    icon.classList.add('animate-icon');

    setTimeout(() => {
      if (icon.classList.contains('bx-moon')) {
        icon.classList.remove('bx-moon');
        icon.classList.add('bx-sun');
        setTheme('light');
        button.classList.remove('moon-mode');
      } else {
        icon.classList.remove('bx-sun');
        icon.classList.add('bx-moon');
        setTheme('dark');
        button.classList.add('moon-mode');
      }
      icon.classList.remove('animate-icon');
    }, 300);
  });
});



function upload(){
  const fileUploadInput = document.querySelector('.file-uploader');
  const image = fileUploadInput.files[0];
  if (!image.type.includes('image')) {
    return alert('Only images are allowed!');
  }
  if (image.size > 10_000_000) {
    return alert('Maximum upload size is 10MB!');    
  }

  const fileReader = new FileReader();
  fileReader.readAsDataURL(image);

  fileReader.onload = (fileReaderEvent) => {
    const profilePicture = document.querySelector('.profile-image');
    profilePicture.src = fileReaderEvent.target.result;
    const profilePicture2 = document.querySelector('.profile-image-sidebar');
    profilePicture2.src = fileReaderEvent.target.result;
  }
}

//https://dev.to/mirzaleka/upload-the-image-with-a-preview-using-html-css-javascript-53cb
//Ajuda do bonekazz https://github.com/Bonekazz