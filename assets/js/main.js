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

// Load connects buttons
fetch('contact-buttons.html')
.then(response => response.text())
.then(data => {
  document.body.insertAdjacentHTML('beforeend', data);
});






