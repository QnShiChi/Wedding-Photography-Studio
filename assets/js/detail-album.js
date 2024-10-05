// Hàm lấy tham số từ URL

// Show img detail 
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".album-detail__img");
  const modal = document.querySelector(".detail-modal");
  const modalImg = document.getElementById("modal-detail");
  const closeModal = document.querySelector(".close");

  modal.style.display = "none"; 

  images.forEach((image) => {
    image.addEventListener("click", function () {
      modal.style.display = "block"; 
      modalImg.src = this.src; 
    });
  });

  closeModal.addEventListener("click", function () {
    modal.style.display = "none"; 
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none"; 
    }
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Lấy tên album từ URL
const albumName = getQueryParam('album');
const albumTitle = document.getElementById('album-title');
const albumContent = document.getElementById('album-content');

// Thay đổi nội dung trang dựa trên albumName
if (albumName === 'album1') {
  albumTitle.innerText = 'Album ảnh cưới 1';
  albumContent.innerHTML = `
    <img class="album-detail__img" src="./assets/img/album-1/img-1.jpg" alt="Image 1">
    <img class="album-detail__img" src="./assets/img/album-1/img-2.jpg" alt="Image 2">
    <img class="album-detail__img" src="./assets/img/album-1/img-3.jpg" alt="Image 3">
    <img class="album-detail__img" src="./assets/img/album-1/img-4.jpg" alt="Image 4">
    <img class="album-detail__img" src="./assets/img/album-1/img-5.jpg" alt="Image 1">
    <img class="album-detail__img" src="./assets/img/album-1/img-6.jpg" alt="Image 2">
    <img class="album-detail__img" src="./assets/img/album-1/img-7.jpg" alt="Image 3">
    <img class="album-detail__img" src="./assets/img/album-1/img-8.jpg" alt="Image 4">
  `;
} else if (albumName === 'album2') {
  albumTitle.innerText = 'Album ảnh cưới 2';
  albumContent.innerHTML = `
    <img class="album-detail__img" src="./assets/img/album-2/img-1.jpg" alt="Image 1">
    <img class="album-detail__img" src="./assets/img/album-2/img-2.jpg" alt="Image 2">
    <img class="album-detail__img" src="./assets/img/album-2/img-3.jpg" alt="Image 3">
    <img class="album-detail__img" src="./assets/img/album-2/img-4.jpg" alt="Image 4">
    <img class="album-detail__img" src="./assets/img/album-2/img-5.jpg" alt="Image 1">
    <img class="album-detail__img" src="./assets/img/album-2/img-6.jpg" alt="Image 2">
    <img class="album-detail__img" src="./assets/img/album-2/img-7.jpg" alt="Image 3">
    <img class="album-detail__img" src="./assets/img/album-2/img-8.jpg" alt="Image 4">
    <img class="album-detail__img" src="./assets/img/album-2/img-9.jpg" alt="Image 1">
    <img class="album-detail__img" src="./assets/img/album-2/img-10.jpg" alt="Image 2">
    <img class="album-detail__img" src="./assets/img/album-2/img-11.jpg" alt="Image 3">
    <img class="album-detail__img" src="./assets/img/album-2/img-12.jpg" alt="Image 4">
  `;
} else if (albumName === 'album3') {
  albumTitle.innerText = 'Album ảnh cưới 3';
  albumContent.innerHTML = `
    <img class="album-detail__img" src="./assets/img/album-3/img-1.jpg" alt="Image 1">
    <img class="album-detail__img" src="./assets/img/album-3/img-2.jpg" alt="Image 2">
    <img class="album-detail__img" src="./assets/img/album-3/img-3.jpg" alt="Image 3">
    <img class="album-detail__img" src="./assets/img/album-3/img-4.jpg" alt="Image 4">
    <img class="album-detail__img" src="./assets/img/album-3/img-5.jpg" alt="Image 1">
    <img class="album-detail__img" src="./assets/img/album-3/img-6.jpg" alt="Image 2">
    <img class="album-detail__img" src="./assets/img/album-3/img-7.jpg" alt="Image 3">
    <img class="album-detail__img" src="./assets/img/album-3/img-8.jpg" alt="Image 4">
    <img class="album-detail__img" src="./assets/img/album-3/img-9.jpg" alt="Image 1">
    <img class="album-detail__img" src="./assets/img/album-3/img-10.jpg" alt="Image 2">
    <img class="album-detail__img" src="./assets/img/album-3/img-11.jpg" alt="Image 3">
    <img class="album-detail__img" src="./assets/img/album-3/img-12.jpg" alt="Image 4">
    <img class="album-detail__img" src="./assets/img/album-3/img-13.jpg" alt="Image 1">
    <img class="album-detail__img" src="./assets/img/album-3/img-14.jpg" alt="Image 2">
    <img class="album-detail__img" src="./assets/img/album-3/img-15.jpg" alt="Image 3">
    <img class="album-detail__img" src="./assets/img/album-3/img-16.jpg" alt="Image 4">
  `;
} else if (albumName === 'album4') {
  albumTitle.innerText = 'Album ảnh cưới 4';
  albumContent.innerHTML = `
    <img class="album-detail__img" src="./assets/img/album-4/img-1.jpg" alt="Image 1">
    <img class="album-detail__img" src="./assets/img/album-4/img-2.jpg" alt="Image 2">
    <img class="album-detail__img" src="./assets/img/album-4/img-3.jpg" alt="Image 3">
    <img class="album-detail__img" src="./assets/img/album-4/img-4.jpg" alt="Image 4">
    <img class="album-detail__img" src="./assets/img/album-4/img-5.jpg" alt="Image 1">
    <img class="album-detail__img" src="./assets/img/album-4/img-6.jpg" alt="Image 2">
    <img class="album-detail__img" src="./assets/img/album-4/img-7.jpg" alt="Image 3">
    <img class="album-detail__img" src="./assets/img/album-4/img-8.jpg" alt="Image 4">
  `;
}

