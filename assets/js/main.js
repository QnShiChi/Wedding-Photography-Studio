// Animation header
document.onscroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const header = document.querySelector("#header");

  if (scrollTop >= 45) {
    header.style.animationName = "slideHeader";
    header.style.animationDuration = "0.75s";
    header.style.animationTimingFunction = "ease";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const slidesContainer = document.querySelector(".slides");
  const slideImages = document.querySelectorAll(".slides img");
  let currentIndex = 0;
  let slideWidth = slideImages[0].clientWidth;
  let isTransitioning = false;
  let autoSlideTimeout;

  const updateSlideWidth = () => {
    slideWidth = slideImages[0].clientWidth;
    slidesContainer.style.transform = `translateX(${
      -slideWidth * (currentIndex + 1)
    }px)`;
  };

  const firstClone = slideImages[0].cloneNode(true);
  const lastClone = slideImages[slideImages.length - 1].cloneNode(true);

  slidesContainer.appendChild(firstClone);
  slidesContainer.insertBefore(lastClone, slideImages[0]);

  slidesContainer.style.width = `${(slideImages.length + 2) * 100}%`;

  function nextSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;

    slidesContainer.style.transition = "transform 0.5s ease-in-out";
    slidesContainer.style.transform = `translateX(${
      -(currentIndex + 1) * slideWidth
    }px)`;

    setTimeout(() => {
      if (currentIndex >= slideImages.length) {
        slidesContainer.style.transition = "none";
        currentIndex = 0;
        slidesContainer.style.transform = `translateX(${-slideWidth}px)`;
      }
      isTransitioning = false;
    }, 500);
  }

  function prevSlide() {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;

    slidesContainer.style.transition = "transform 0.5s ease-in-out";
    slidesContainer.style.transform = `translateX(${
      -(currentIndex + 1) * slideWidth
    }px)`;

    setTimeout(() => {
      if (currentIndex < 0) {
        slidesContainer.style.transition = "none";
        currentIndex = slideImages.length - 1;
        slidesContainer.style.transform = `translateX(${
          -(currentIndex + 1) * slideWidth
        }px)`;
      }
      isTransitioning = false;
    }, 500);
  }

  function autoSlide() {
    autoSlideTimeout = setTimeout(() => {
      nextSlide();
      autoSlide();
    }, 4000);
  }

  autoSlide();

  function resetAutoSlide() {
    clearTimeout(autoSlideTimeout);
    autoSlide();
  }

  document.querySelector(".next").addEventListener("click", () => {
    resetAutoSlide();
    nextSlide();
  });

  document.querySelector(".prev").addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  window.addEventListener("resize", updateSlideWidth);
  updateSlideWidth();
});

// Play video
document.addEventListener('DOMContentLoaded', function () {
  const videoBlocks = document.querySelectorAll('.video-block');
  const modal = document.querySelector('.video-modal');
  const modalVideo = document.querySelector('#modal-video');
  const closeBtn = document.querySelector('.close-modal');

  videoBlocks.forEach(block => {
      block.addEventListener('click', function () {
          const videoItem = block.querySelector("video");
          const videoSrc = videoItem.src;
          modalVideo.src = videoSrc;
          modal.style.display = 'flex';
          
          modalVideo.addEventListener('loadeddata', function () {
              modalVideo.play();
          }, { once: true });  
      });
  });

  window.addEventListener('click', function (e) {
      if (e.target === modal || e.target === closeBtn) {
          modal.style.display = 'none';
          modalVideo.pause();  
          modalVideo.src = '';  
      }
  });
});

// Fix navbar last item
const navbarItems = document.querySelectorAll(".nav-bar__item");
const navbarItemsLength = navbarItems.length;
let viewportWidth = window.innerWidth;

if (navbarItemsLength > 0) {
  const lastNavbarItem = navbarItems[navbarItemsLength - 1];

  lastNavbarItem.addEventListener("mouseover", () => {
    const dropdown = lastNavbarItem.querySelector(".dropdown");

    if (dropdown) {
      if (viewportWidth >= 992) {
        dropdown.style.left = "-275px";
      }
      else {
        dropdown.style.left = "-30px";
      }
    }
  });
}

window.addEventListener("resize", () => {
  viewportWidth = window.innerWidth;
});

// Handle load html to index file
function loadHtmlToIndex (linkFile) {
  return fetch(linkFile)
  .then(response => response.text())
  .then(data => {
    document.body.insertAdjacentHTML('beforeend', data);
  });
}

// Load contact buttons 
loadHtmlToIndex('contact-buttons.html');

// Kiểm tra trạng thái âm thanh và thời gian phát trong sessionStorage
const isPlaying = sessionStorage.getItem("isPlaying") === "true";
const savedTime = parseFloat(sessionStorage.getItem("audioCurrentTime")) || 0;

loadHtmlToIndex('play-music-btn.html').then(() => {
  const audioButton = document.querySelector('.audio-button');
  const audio = audioButton.querySelector("audio");
  const pauseIcon = audioButton.querySelector(".pause-icon");
  const playIcon = audioButton.querySelector(".play-icon");

  // Thiết lập cờ để theo dõi người dùng đã tương tác với trang chưa
  let hasInteracted = false;

  // Khôi phục trạng thái phát và thời gian nếu trạng thái là đang phát
  if (isPlaying) {
    audio.currentTime = savedTime;
    audio.play().then(() => {
      pauseIcon.style.display = "block"; 
      playIcon.style.display = "none"; 
    }).catch(error => {
      console.error("Error playing audio:", error);
    });
  } else {
    audio.currentTime = savedTime; // Đảm bảo nhạc sẽ phát tiếp từ vị trí lưu trước đó
    pauseIcon.style.display = "none";
    playIcon.style.display = "block";
  }

  // Chỉ phát nhạc khi người dùng tương tác với trang nếu trạng thái isPlaying là false
  document.addEventListener('click', () => {
    if (!hasInteracted && sessionStorage.getItem("isPlaying") === null) {
      audio.play().then(() => {
        hasInteracted = true;
        sessionStorage.setItem("isPlaying", "true"); // Lưu trạng thái là đang phát
        pauseIcon.style.display = "block"; 
        playIcon.style.display = "none";
      }).catch(error => {
        console.error("Error playing audio:", error);
      });
    }
  });

  // Thêm sự kiện click cho nút âm thanh
  audioButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click từ propagating lên document
    if (audio.paused) {
      audio.currentTime = savedTime; // Đảm bảo nhạc phát tiếp từ thời điểm dừng trước đó
      audio.play(); 
      sessionStorage.setItem("isPlaying", "true"); // Lưu trạng thái là đang phát
      pauseIcon.style.display = "block"; 
      playIcon.style.display = "none"; 
    } else {
      audio.pause(); 
      sessionStorage.setItem("isPlaying", "false"); // Đảm bảo trạng thái là đã dừng
      sessionStorage.setItem("audioCurrentTime", audio.currentTime); // Lưu thời gian hiện tại
      pauseIcon.style.display = "none"; 
      playIcon.style.display = "block"; 
    }
  });

  // Lưu thời gian phát hiện tại vào sessionStorage mỗi khi thời gian thay đổi
  audio.addEventListener('timeupdate', () => {
    if (!audio.paused) {
      sessionStorage.setItem("audioCurrentTime", audio.currentTime);
    }
  });

  // Khi người dùng tắt trang, chỉ lưu lại trạng thái và thời gian nếu nhạc đang phát
  window.addEventListener('beforeunload', () => {
    if (!audio.paused) {
      sessionStorage.setItem("audioCurrentTime", audio.currentTime);
      sessionStorage.setItem("isPlaying", "true"); // Lưu trạng thái của audio
    } else {
      sessionStorage.setItem("isPlaying", "false"); // Đảm bảo trạng thái là đã dừng
      sessionStorage.setItem("audioCurrentTime", audio.currentTime); // Lưu thời gian hiện tại khi dừng
    }
  });
});














