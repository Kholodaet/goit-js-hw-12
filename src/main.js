import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import getImagesFromApi from './js/pixibay-api';
import { createMarkup } from './js/render-functions';

const ref = {
  form: document.querySelector('.js-form'),
  gallery: document.querySelector('.js-gallery'),
  btnLoadMore: document.querySelector('.btn-load-more'),
  loader: document.querySelector('.loader'),
};

let textForm;
let page = 1;
let perPage = 15;

ref.form.addEventListener('submit', onSubmitForm);
ref.btnLoadMore.addEventListener('click', onClickLoadMore);

async function onSubmitForm(event) {
  event.preventDefault();
  showLoader();
  ref.gallery.innerHTML = '';
  const { text } = event.currentTarget.elements;
  textForm = text.value.trim();

  if (textForm === '') {
    hideBtnAndLoader();
    iziToast.warning({
      color: '#fc6e51',
      message: 'Field is empty!',
      position: 'topCenter',
    });
    return;
  }
  try {
    const { hits } = await getImagesFromApi(textForm, (page = 1), perPage);

    if (hits.length === 0) {
      iziToast.warning({
        color: '#fc6e51',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topCenter',
      });
      hideBtnAndLoader();
      return;
    }
    if (hits.length < perPage) {
      ref.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
      lightbox.refresh();
      iziToast.warning({
        color: '#fc6e51',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomRight',
      });
      hideBtnAndLoader();
      return;
    }
    ref.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
    lightbox.refresh();
    hideLoader();
  } catch (error) {
    iziToast.error({
      color: 'red',
      message: `${error}`,
      position: 'topCenter',
    });
  } finally {
    ref.form.reset();
  }
}

async function onClickLoadMore(event) {
  showLoader();
  page += 1;

  try {
    const { hits, totalHits } = await getImagesFromApi(textForm, page, perPage);
    const limit = Math.ceil(totalHits / perPage);

    if (page === limit) {
      const diff = totalHits - (limit - 1) * perPage;
      const lastHits = hits.slice(0, diff);
      ref.gallery.insertAdjacentHTML('beforeend', createMarkup(lastHits));
      lightbox.refresh();
      hideBtnAndLoader();
      iziToast.warning({
        color: '#fc6e51',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomRight',
      });
      return;
    }
    ref.gallery.insertAdjacentHTML('beforeend', createMarkup(hits));
    lightbox.refresh();
    hideLoader();
    scroll();
  } catch (error) {
    iziToast.error({
      color: 'red',
      message: `${error}`,
      position: 'topCenter',
    });
  } finally {
    ref.form.reset();
  }
}

const lightbox = new SimpleLightbox('.card a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'outside',
});

function showLoader() {
  ref.loader.classList.remove('is-active');
  ref.btnLoadMore.classList.add('is-active');
}
function hideLoader() {
  ref.loader.classList.add('is-active');
  ref.btnLoadMore.classList.remove('is-active');
}

function hideBtnAndLoader() {
  ref.btnLoadMore.classList.add('is-active');
  ref.loader.classList.add('is-active');
}
function scroll() {
  const card = document.querySelector('.card');
  const cardHeight = card.getBoundingClientRect().height;
  window.scrollBy({
    left: 0,
    top: cardHeight * 3,
    behavior: 'smooth',
  });
}
