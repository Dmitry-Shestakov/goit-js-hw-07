import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);
const imgContainer = document.querySelector(".gallery");
const imgMarkup = createImgMarkup(galleryItems);

imgContainer.insertAdjacentHTML("beforeend", imgMarkup);

imgContainer.addEventListener("click", onImgContainerClick);

function createImgMarkup(gallery) {
  return gallery
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
        <a class="gallery__link" href="${original}"">
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

function onImgContainerClick(evt) {
  evt.preventDefault();
  const isImgEl = evt.target.classList.contains("gallery__image");

  if (!isImgEl) {
    return;
  }

  const instance = basicLightbox.create(`
    <img src='${evt.target.dataset.source}' width="800" height="600">
`);

  instance.show(() => {
    window.addEventListener("keydown", onEscKeyPress);
  });

  function onEscKeyPress(evt) {
    if (evt.code === "Escape") {
      instance.close(() => {
        window.removeEventListener("keydown", onEscKeyPress);
      });
      console.log(evt.code);
    }
  }
}
