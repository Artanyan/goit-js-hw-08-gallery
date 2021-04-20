import images from './gallery-items.js';

function createGalleryMarkup(images) {
    return images
      .map(({ preview, original, description }) => {
        return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
      })
      .join('');
  }

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const overlayRef = document.querySelector('.lightbox__overlay');
const imageRef = document.querySelector('.lightbox__image');
const btnModalCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]',
);


const galleryMarkup = createGalleryMarkup(images);
galleryRef.insertAdjacentHTML('beforeend', galleryMarkup);
galleryRef.addEventListener('click', openModal);

function openModal(event) {
  event.preventDefault();
  let image = event.target;
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  overlayRef.addEventListener('click', closeModal);
  btnModalCloseRef.addEventListener('click', closeModal);
  document.addEventListener('keydown', createSlider);
  window.addEventListener('keydown', escapeClose);
  lightboxRef.classList.add('is-open');

  updateAttr(image.dataset.source, image.alt);
}

function closeModal() {
  overlayRef.removeEventListener('click', closeModal);
  btnModalCloseRef.removeEventListener('click', closeModal);
  document.removeEventListener('keydown', createSlider);
  window.removeEventListener('keydown', escapeClose);
  lightboxRef.classList.remove('is-open');

  updateAttr();
}

function escapeClose(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function updateAttr(src = '', alt = '') {
  imageRef.src = src;
  imageRef.alt = alt;
}

let currentIndex = 0;
function createSlider(event) {
  switch (event.code) {
    case 'ArrowRight':
      goToNextImage();
      break;
    case 'ArrowLeft':
      goToPrevImage();
      break;
  }
}

function goToNextImage() {
  if (currentIndex === images.length - 1) {
    currentIndex = 0;
  } else {
    currentIndex += 1;
  }

  showImage();
}

function goToPrevImage() {
  if (currentIndex === 0) {
    currentIndex = images.length - 1;
  } else {
    currentIndex -= 1;
  }

  showImage();
}

function showImage() {
  const activeImage = images[currentIndex];
  imageRef.src = activeImage.original;
  imageRef.alt = activeImage.alt;
}