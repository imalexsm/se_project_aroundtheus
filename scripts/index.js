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
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
//profile add buttons and data
const profileAddBtn = document.querySelector("#profile-add-btn");
const profileAddModal = document.querySelector("#add-card-modal");
const profileAddCloseBtn = document.querySelector("#profile-add-closebtn");
const profileAddForm = document.querySelector("#add-profile-form");
const profileAddTitleInput = document.querySelector("#add-title-input");
const profileImageLinkInput = document.querySelector(
  "#profile-imagelink-input"
);
const addProfileForm = document.getElementById("#add-profile-form");
//preview image modal
const previewAddModal = document.querySelector("#preview-image-modal");
const previewCloseBtn = document.querySelector("#preview-image-close-btn");

const modalOpenedClassName = "modal_opened";

//Functions//
function openModal(modal) {
  modal.classList.add(modalOpenedClassName);
}

function closeModal(modal) {
  modal.classList.remove(modalOpenedClassName);
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  // like button
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  // delete button
  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewAddModal);
    const cardImagePreviewEl = document.querySelector(".modal__image-preview");
    const modalTitleEl = document.querySelector(".modal__title");
    cardImagePreviewEl.src = cardData.link;
    modalTitleEl.textContent = cardData.name;
    modalTitleEl.alt = cardData.name;
  });

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
  closeModal(profileEditModal);
}

function handleCardAddSubmit(e) {
  e.preventDefault();
  const name = profileAddTitleInput.value;
  const link = profileImageLinkInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(profileAddModal);
  const addCardForm = e.target;
  addCardForm.reset();
}

//Event Listeners//
profileEditBtn.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

profileAddBtn.addEventListener("click", () => {
  profileAddTitleInput.value = profileAddTitleInput.textContent;
  profileImageLinkInput.value = profileImageLinkInput.textContent;
  openModal(profileAddModal);
});

//add new card button
profileAddCloseBtn.addEventListener("click", () => {
  closeModal(profileAddModal)
});
profileAddModal.addEventListener("submit", handleCardAddSubmit);

//edit profile button
profileEditCloseBtn.addEventListener("click", () => {
  closeModal(profileEditModal)
});
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//Preview Button
previewCloseBtn.addEventListener("click", () => {
  closeModal(previewAddModal)
});

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
