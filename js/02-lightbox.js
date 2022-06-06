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
      alt="${description}"
    />
  </a>
</div>
`
});

const makeGallery = galleryItems.map(makeGalleryMarkup).join('');
galleryEl.insertAdjacentHTML('beforeend', makeGallery);

const lightbox = new SimpleLightbox('.gallery a', { captionsData: `alt`, captionDelay: 250 });