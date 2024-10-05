// Lấy tên album từ URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Khởi tạo cơ sở dữ liệu IndexedDB
function openDatabase() {
  return new Promise((resolve, reject) => {
      const request = indexedDB.open('albumDB', 1);

      // Tạo objectStore cho albums nếu chưa tồn tại
      request.onupgradeneeded = function(event) {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('albums')) {
              const objectStore = db.createObjectStore('albums', { keyPath: 'albumName' });
              objectStore.createIndex('images', 'images', { unique: false });
          }
      };

      request.onsuccess = function(event) {
          resolve(event.target.result);
      };

      request.onerror = function(event) {
          reject('Lỗi mở IndexedDB: ' + event.target.errorCode);
      };
  });
}


// Hiển thị hình ảnh từ IndexedDB trong trang chi tiết album
function displayImagesFromDB(albumName) {
  openDatabase().then((db) => {
      const transaction = db.transaction(['albums'], 'readonly');
      const objectStore = transaction.objectStore('albums');

      objectStore.get(albumName).onsuccess = function(event) {
          const albumData = event.target.result;
          const albumContent = document.getElementById('album-content');
          albumContent.innerHTML = ''; // Xóa sạch album hiện tại

          if (albumData && albumData.images.length > 0) {
              albumData.images.forEach((imageSrc) => {
                  const imgElement = document.createElement('img');
                  imgElement.classList.add('album-detail__img');
                  imgElement.src = imageSrc;
                  albumContent.appendChild(imgElement);
              });

              // Thêm chức năng zoom khi nhấn vào ảnh
              setupZoomFeature();
          }
      };
  });
}

// Thiết lập chức năng zoom cho ảnh trong chi tiết album
function setupZoomFeature() {
  const images = document.querySelectorAll(".album-detail__img");
  const modal = document.querySelector(".detail-modal");
  const modalImg = document.getElementById("modal-detail");
  const closeModal = document.querySelector(".close");

  // Đảm bảo modal ẩn khi tải trang
  modal.style.display = "none"; 

  // Khi nhấn vào ảnh, hiển thị modal
  images.forEach((image) => {
      image.addEventListener("click", function () {
          modal.style.display = "block"; 
          modalImg.src = this.src; 
      });
  });

  // Khi nhấn vào nút 'close', ẩn modal
  closeModal.addEventListener("click", function () {
      modal.style.display = "none"; 
  });

  // Khi nhấn vào bất kỳ đâu bên ngoài modal, cũng ẩn modal
  modal.addEventListener("click", function (event) {
      if (event.target === modal) {
          modal.style.display = "none"; 
      }
  });
}


// Khi tải trang, lấy tên album từ URL và hiển thị ảnh từ IndexedDB
window.onload = function() {
  const albumName = getQueryParam('album');
  if (albumName) {
      displayImagesFromDB(albumName);
  } else {
      console.error("Không tìm thấy tên album trong URL");
  }
};
