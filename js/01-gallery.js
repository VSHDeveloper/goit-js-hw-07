import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');

const makeGalleryMarkup = (galleryItem => {
    const { preview, original, description } = galleryItem;
    return `
    <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
`
});

const makeGallery = galleryItems.map(makeGalleryMarkup).join('');
galleryEl.insertAdjacentHTML('beforeend', makeGallery);

galleryEl.addEventListener('click', openModalImage);

let instance;

function openModalImage(e) {
    if (e.target.nodeName !== "IMG") {
        return;
    }
    e.preventDefault();

    instance = basicLightbox.create(`
    <img src="${e.target.dataset.source}">
`,
        {
            onShow: (instance) => {
                addListener();
            },
            onClose: (instance) => {
                removeListener();
            },
        }
    );
    instance.show();
};

function addListener() {
  window.addEventListener("keydown", onEscClick);
};

function removeListener() {
  window.removeEventListener("keydown", onEscClick);
};

function onEscClick(e) {
  if (e.code !== "Escape") {
    return;
  }

  instance.close();
}
