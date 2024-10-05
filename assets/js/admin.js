      // Hàm để hiển thị hình ảnh trong album đã chọn
      function displayImages() {
        const album = document.getElementById('album');
        album.innerHTML = ''; // Xóa sạch album hiện tại

        const selectedAlbum = document.getElementById('albumSelect').value;
        const storedImages = JSON.parse(localStorage.getItem(selectedAlbum)) || [];

        storedImages.forEach((imageSrc, index) => {
          const imageBox = document.createElement('div');
          imageBox.classList.add('album-edit-box');
          imageBox.innerHTML = `
            <img src="${imageSrc}" alt="Image ${index + 1}">
            <button class="delete-btn" onclick="deleteImage(${index})">Xóa</button>
          `;
          album.appendChild(imageBox);
        });
      }

      // Hàm upload hình ảnh
      function uploadImages() {
    const imageUpload = document.getElementById('imageUpload');
    const files = imageUpload.files;
    const selectedAlbum = document.getElementById('albumSelect').value;
    const storedImages = JSON.parse(localStorage.getItem(selectedAlbum)) || [];

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        reader.onload = function (event) {
            // Sau khi đọc xong file, tạo một ảnh mới để giảm kích thước
            const img = new Image();
            img.src = event.target.result;
            img.onload = function () {
                // Tạo canvas để vẽ lại ảnh với kích thước nhỏ hơn
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Thiết lập kích thước ảnh nhỏ hơn (ví dụ: 500px chiều rộng)
                const maxWidth = 500;
                const scaleSize = maxWidth / img.width;
                canvas.width = maxWidth;
                canvas.height = img.height * scaleSize;

                // Vẽ ảnh lên canvas với kích thước đã giảm
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Lấy ảnh đã giảm kích thước dưới dạng base64
                const reducedDataURL = canvas.toDataURL('image/jpeg', 0.7); // Chất lượng 70%

                // Lưu ảnh đã giảm kích thước vào localStorage
                storedImages.push(reducedDataURL);
                localStorage.setItem(selectedAlbum, JSON.stringify(storedImages));

                // Cập nhật lại hiển thị hình ảnh
                displayImages();
            };
        };

        reader.readAsDataURL(file);
    }
}


      // Hàm xóa hình ảnh
      function deleteImage(index) {
        const selectedAlbum = document.getElementById('albumSelect').value;
        const storedImages = JSON.parse(localStorage.getItem(selectedAlbum)) || [];
        storedImages.splice(index, 1); // Xóa hình ảnh tại vị trí index
        localStorage.setItem(selectedAlbum, JSON.stringify(storedImages));
        displayImages(); // Cập nhật lại giao diện
      }

      // Hiển thị hình ảnh khi chọn album khác
      document.getElementById('albumSelect').addEventListener('change', displayImages);

      // Hiển thị hình ảnh của album mặc định khi tải trang
      window.onload = displayImages;