const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//Elements//
//profile edit buttons and data
const profileEditBtn = document.querySelector("#profile-edit-btn");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseBtn = document.querySelector("#profile-edit-closebtn");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.querySelector("#edit-profile-form");
// cards
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
//profile add buttons and data
const profileAddBtn = document.querySelector("#profile-add-btn");
const profileAddModal = document.querySelector("#add-card-modal");
const profileAddCloseBtn = document.querySelector("#profile-add-closebtn");
const profileAddForm = document.querySelector("#add-profile-form");
const profileAddTitleInput = document.querySelector("#add-title-input");
const profileImageLinkInput = document.querySelector("#profile-imagelink-input");


//Functions//
function closeEditPopup() {
  profileEditModal.classList.remove("modal_opened");
}

function closeAddPopup() {
  profileAddModal.classList.remove("modal_opened");
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.append(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  return cardElement;
}

//Event Handlers//
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeEditPopup();
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  const titleValue = profileAddTitleInput.value
  const linkValue = profileImageLinkInput.value
  renderCard({titleValue, linkValue}, cardListEl);
  closeAddPopup();
}


//Event Listeners//
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileAddBtn.addEventListener("click", () => {
  profileAddTitleInput.value = profileAddTitleInput.textContent;
  profileImageLinkInput.value = profileImageLinkInput.textContent;
  profileAddModal.classList.add("modal_opened");
})



//add new card button
profileAddCloseBtn.addEventListener("click", () => closeAddPopup(profileAddModal));
profileAddForm.addEventListener("submit", handleCardAddSubmit);

//edit profile button
profileEditCloseBtn.addEventListener("click", closeEditPopup);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);





initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

//LikeButton
const likeButtons = document.querySelectorAll(".card__like-button");
likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle(".card__like-button_active");
  });
});
