import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector(".gallery");
const galleryMarkup = createMarkupGallery(galleryItems);

galleryList.insertAdjacentHTML("beforeend", galleryMarkup);
galleryList.addEventListener("click", onGalleryItemClick);

// Create dynamic layout  "создание динамической разметки"
function createMarkupGallery(array) {
  return array
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join("");
}

//Delegating and getting the URL of a large image  "Делегирование и получение URL большого изображения"
function onGalleryItemClick(event) {
  event.preventDefault();

  const isGalleryItemEl = event.target.classList.contains("gallery__image");
  if (!isGalleryItemEl) {
    return;
  }

  const galleryImage = event.target;
  const galleryImageUrlBig = galleryImage.dataset.source;

  onBasicLightbox(galleryImageUrlBig);
}

//Creating a global variable for basicLightbox  "Создание глобальной переменной для basicLightbox"
let instance = {};

//function basicLightbox   "Функция basicLightbox"
function onBasicLightbox(imgUrl) {
  instance = basicLightbox.create(
    `<img src="${imgUrl}" width="800" height="600">`,
    {
      onShow: () => {
        window.addEventListener("keydown", onEscKeyPress);
      },
      onClose: () => {
        window.removeEventListener("keydown", onEscKeyPress);
      },
    }
  );

  instance.show();
}

//Escape key press function "Функция проверки нажатия клавиши Escape"
function onEscKeyPress(event) {
  const ESC_KEY_CODE = "Escape";

  if (event.code === ESC_KEY_CODE) {
    instance.close();
  }
}
