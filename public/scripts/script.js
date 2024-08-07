
document.addEventListener('DOMContentLoaded', function () {

    const notifications = document.querySelectorAll('.notification');

    notifications.forEach(notification => {
      notification.classList.add('show');

      setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('hide');
      }, 5000);
    });




  function checkUrlParameter() {
    // Obtém a URL atual
    const url = new URL(window.location.href);

    if (url.search.length > 0) {
      reloadpage();
    } else {
      console.log("Nenhum parâmetro encontrado na URL");
    }
  }

  const cardContainer = document.getElementById('card-con');
  function deleteposts() {

  }
  cardContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete') || event.target.closest('.delete')) {
      const card = event.target.closest('.card');
      const productId = card.dataset.id;

      if (confirm('Voce tem certeza que deseja deletar?')) {
        deleteProduct(productId, card);
      }
    }
  });

  function deleteProduct(id, cardElement) {
    fetch(`/produtos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
        cardElement.remove();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while deleting the product.');
      });
  }



  window.onload = checkUrlParameter;
  // Get the modal
  const modal = document.getElementById("productModal");

  function reloadpage() {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let postParam = params.get('post');
    console.log(postParam);

    let variabel = document.querySelectorAll(`[data-id="${postParam}"]`)[0]
    console.log(variabel);


    const title2 = variabel.querySelector('.question-div').textContent;
    const description2 = variabel.querySelector('.answer-div-descricao').textContent;
    const author2 = variabel.querySelector('.answer-div-autor').textContent;
    console.log(author2);
    const lastEdited2 = variabel.querySelector('.answer-div-lastedit').textContent;

    openModal(title2, author2, lastEdited2, description2);
  }


  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // Function to open the modal
  function openModal(title, author, dateTime, description) {
    document.getElementById("modalTitle").textContent = "Title : " + title;
    document.getElementById("modalAuthor").textContent = "Author: " + author;
    document.getElementById("modalDateTime").textContent = "Criado em: " + dateTime;
    document.getElementById("modalDescription").textContent = "Descricao: " + description;
    modal.style.display = "block";

  }





  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const postId = getQueryParam('post');

  if (postId) {
    const form = document.getElementById('comentarioForm');
    if (form) {
      form.action = `/produtos/comentar/${postId}`;
    } else {
      console.log("Formulário não encontrado");
    }
  } else {
    console.log("Erro: parâmetro 'post' não encontrado na URL");
  }





  let boneca = document.getElementById("boneka");
  console.log(boneca);

  let closemodal = document.getElementById("closemodalbutton");
  //ESSE IF QUE TA COMENTADO TA FAZENDO O LOGIN FUNCIONAR, NÃO SEI CONCERTAR ESSA MERDA
  console.log(span)
  if (span) {
    span.onclick = function () {
      modal.style.display = "none";
      window.location.href = "/produtos";

    }
  }


  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      window.location.href = "/produtos";

    }
  }

  // Add click event listeners to all "Show More" buttons
  document.querySelectorAll('.show-more-btn').forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const card = this.closest('.card');
      const title = card.querySelector('.question-div').textContent;
      console.log(title);
      const description = card.querySelector('.answer-div-descricao').textContent;
      const author = card.querySelector('.answer-div-autor').textContent;
      const lastEdited = card.querySelector('.answer-div-lastedit').textContent;


      const postId = card.dataset.id;
      const newUrl = `/produtos/?post=${postId}`;

      history.pushState({ postId: postId }, '', newUrl);
      window.location.href = newUrl;

    });
  });


  const sidebarBtn = document.querySelector(".sidebarBtn");
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


  if (sidebarBtn) {
    sidebarBtn.onclick = function () {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("active");
      if (sidebar.classList.contains("active")) {
        sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
      } else {
        sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
      }
    };
  } else {
    console.error('Botão da barra lateral não encontrado.');
  }

  if (addQuestion) {
    addQuestion.addEventListener("click", showAddQuestionCard);
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", hideAddQuestionCard);
  }

  if (closeShowMore) {
    closeShowMore.addEventListener("click", hideShowMoreModal);
  }

  if (cardButton) {
    cardButton.addEventListener("click", saveFlashcard);
  }

  if (cardListContainer) {
    cardListContainer.addEventListener("click", handleCardActions);
  }


  console.log('Script carregado com sucesso.');

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

  }




});
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

const button = document.querySelector('.nightmode-btn');
const icon = button.querySelector('i');
const lightTheme = document.getElementById('light');
const darkTheme = document.getElementById('dark');

// Função para definir o tema e salvar no localStorage
function setTheme(theme) {
  if (theme === 'light') {
    lightTheme.disabled = false;
    darkTheme.disabled = true;
    localStorage.setItem('theme', 'light');
  } else if (theme === 'dark') {
    lightTheme.disabled = true;
    darkTheme.disabled = false;
    localStorage.setItem('theme', 'dark');
  }
  console.log(theme);
}

// Função para inicializar o tema com base no valor armazenado no localStorage
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
    if (savedTheme === 'light') {
      icon.classList.remove('bx-moon');
      icon.classList.add('bx-sun');
      button.classList.remove('moon-mode');
    } else {
      icon.classList.remove('bx-sun');
      icon.classList.add('bx-moon');
      button.classList.add('moon-mode');
    }
  }
}

// Evento de clique no botão para alternar entre temas
button.addEventListener('click', function () {
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
  }, 200);
});

// Inicializar o tema ao carregar a página
initializeTheme();





function upload() {
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

function filterPosts() {
  const searchInput = document.getElementById('searchInput');
  const filter = searchInput.value.toUpperCase();
  const cards = document.getElementsByClassName('card');

  for (let i = 0; i < cards.length; i++) {
    const titleElement = cards[i].getElementsByClassName('question-div')[0];
    const title = titleElement.textContent || titleElement.innerText;
    if (title.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}

document.getElementById('searchInput').addEventListener('input', filterPosts);

document.addEventListener('DOMContentLoaded', filterPosts);


