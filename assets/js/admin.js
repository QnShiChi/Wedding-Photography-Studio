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

// Lưu ảnh vào IndexedDB
function saveImageToDB(albumName, imageData) {
  openDatabase().then((db) => {
      const transaction = db.transaction(['albums'], 'readwrite');
      const objectStore = transaction.objectStore('albums');

      objectStore.get(albumName).onsuccess = function(event) {
          let albumData = event.target.result || { albumName: albumName, images: [] };
          albumData.images.push(imageData);

          objectStore.put(albumData).onsuccess = function() {
              console.log('Ảnh đã được lưu vào IndexedDB');
          };
      };

      transaction.onerror = function() {
          console.log('Lỗi khi lưu ảnh vào IndexedDB');
      };
  });
}

// Hiển thị hình ảnh từ IndexedDB
function displayImagesFromDB(albumName) {
  openDatabase().then((db) => {
      const transaction = db.transaction(['albums'], 'readonly');
      const objectStore = transaction.objectStore('albums');

      objectStore.get(albumName).onsuccess = function(event) {
          const albumData = event.target.result;
          const album = document.getElementById('album');
          album.innerHTML = ''; // Xóa các ảnh hiện tại

          if (albumData && albumData.images.length > 0) {
              albumData.images.forEach((imageSrc, index) => {
                  const imageBox = document.createElement('div');
                  imageBox.classList.add('album-edit-box');
                  imageBox.innerHTML = `
                      <img src="${imageSrc}" alt="Image ${index + 1}">
                      <button class="delete-btn" onclick="deleteImageFromDB('${albumName}', ${index})">Xóa</button>
                  `;
                  album.appendChild(imageBox);
              });
          }
      };
  });
}

// Upload hình ảnh và lưu vào IndexedDB
function uploadImages() {
  const imageUpload = document.getElementById('imageUpload');
  const files = imageUpload.files;
  const selectedAlbum = document.getElementById('albumSelect').value;

  for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = function(event) {
          const img = new Image();
          img.src = event.target.result;

          img.onload = function() {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              const maxWidth = 800; // Giảm kích thước hình ảnh
              const scaleSize = maxWidth / img.width;
              canvas.width = maxWidth;
              canvas.height = img.height * scaleSize;

              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

              const reducedDataURL = canvas.toDataURL('image/jpeg', 0.9); // Tăng chất lượng ảnh

              // Lưu ảnh vào IndexedDB
              saveImageToDB(selectedAlbum, reducedDataURL);

              // Cập nhật lại hiển thị hình ảnh
              displayImagesFromDB(selectedAlbum);
          };
      };

      reader.readAsDataURL(file);
  }
}

// Xóa hình ảnh từ IndexedDB
function deleteImageFromDB(albumName, index) {
  openDatabase().then((db) => {
      const transaction = db.transaction(['albums'], 'readwrite');
      const objectStore = transaction.objectStore('albums');

      objectStore.get(albumName).onsuccess = function(event) {
          const albumData = event.target.result;
          if (albumData && albumData.images.length > 0) {
              albumData.images.splice(index, 1); // Xóa ảnh tại vị trí 'index'

              objectStore.put(albumData).onsuccess = function() {
                  console.log('Ảnh đã bị xóa');
                  displayImagesFromDB(albumName); // Cập nhật lại giao diện sau khi xóa
              };
          }
      };
  });
}

// Hiển thị hình ảnh khi chọn album khác
document.getElementById('albumSelect').addEventListener('change', function() {
  const selectedAlbum = document.getElementById('albumSelect').value;
  displayImagesFromDB(selectedAlbum);
});

// Hiển thị hình ảnh của album mặc định khi tải trang
window.onload = function() {
  const selectedAlbum = document.getElementById('albumSelect').value;
  displayImagesFromDB(selectedAlbum);
};
