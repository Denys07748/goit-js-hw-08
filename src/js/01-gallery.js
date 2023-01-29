// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);

const galleryContainerEl = document.querySelector('.gallery');
const imegesMarkup = createImegesMarkup(galleryItems);

galleryContainerEl.insertAdjacentHTML('beforeend', imegesMarkup);

function createImegesMarkup(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) => `
  <div>
    <a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>
  </div>`
    )
    .join('');
}

const simpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
