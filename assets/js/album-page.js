// Hiển thị ảnh đại diện trên trang album từ IndexedDB
function displayCoverImage(albumName) {
    openDatabase().then((db) => {
        const transaction = db.transaction(['albums'], 'readonly');
        const objectStore = transaction.objectStore('albums');

        objectStore.get(albumName).onsuccess = function(event) {
            const albumData = event.target.result;
            if (albumData && albumData.coverImage) {
                document.getElementById(`coverImageDisplay${albumName}`).src = albumData.coverImage;
            }
        };
    });
}

// Khởi tạo IndexedDB
function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('albumDB', 1);
        request.onsuccess = function(event) {
            resolve(event.target.result);
        };
        request.onerror = function(event) {
            reject('Lỗi mở IndexedDB: ' + event.target.errorCode);
        };
    });
}

// Tự động hiển thị ảnh đại diện khi tải trang
window.onload = function() {
    ['album1', 'album2', 'album3', 'album4', 'album5', 'album6', 'album7', 'album8', 'album9', 'album10', 'album11'].forEach(album => {
        displayCoverImage(album);
    });
};
