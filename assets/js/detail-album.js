// Hàm lấy tham số từ URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Hàm để hiển thị hình ảnh trong album từ LocalStorage
function displayImages() {
  const albumContent = document.getElementById('album-content');
  albumContent.innerHTML = ''; // Xóa sạch album hiện tại

  const albumName = getQueryParam('album');
  const storedImages = JSON.parse(localStorage.getItem(albumName)) || [];
  
  storedImages.forEach((imageSrc) => {
    const imgElement = document.createElement('img');
    imgElement.classList.add('album-detail__img');
    imgElement.src = imageSrc;
    albumContent.appendChild(imgElement);
  });

  // Thêm chức năng zoom khi nhấn vào ảnh
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
}

// Hiển thị hình ảnh khi tải trang
window.onload = displayImages;
