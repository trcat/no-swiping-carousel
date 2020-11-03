class NoSwipingCarousel {
  constructor(el, options) {
    this.el = el; // 目标 css 样式
    this.slidesPerView = options.slidesPerView || 3; // 并列显示几个内容
    this.initialSlide = Math.floor((this.slidesPerView - 1) / 2); // swiper 初始 index
    this.spaceBetween = options.spaceBetween || 30; //
    this.activeStyle = options.activeStyle || "";
    this.prevBtn = document.querySelector(options.navigation.prevEl);
    this.nextBtn = document.querySelector(options.navigation.nextEl);
    this.slides = document.querySelectorAll(`${this.el} .swiper-slide`);
    this.length = this.slides.length;
    this.currentIndex = 0;
    this.swiper = null;
    this.init();
  }
  // 初始
  init() {
    this.initSwiper();
    this.initEventListener();
  }
  // 初始化 swiper
  initSwiper() {
    const self = this;
    this.swiper = new Swiper(this.el, {
      slidesPerView: this.slidesPerView,
      spaceBetween: 30,
      centeredSlides: this.length >= this.slidesPerView,
      initialSlide: this.initialSlide,
      noSwiping: true,
      on: {
        init(e) {
          // swiper 初始化后，让首个 slide 处于 active 状态
          self.setActiveState(self.currentIndex);
        },
      },
    });
  }
  // 添加按钮和 slide 点击事件
  initEventListener() {
    // 上一个按钮点击事件
    this.prevBtn &&
      this.prevBtn.addEventListener("click", () => {
        if (this.currentIndex > 0) {
          this.currentIndex -= 1;
          this.setActiveState(this.currentIndex);
          if (
            this.currentIndex >= this.initialSlide &&
            this.currentIndex < this.length - 1 - this.initialSlide
          ) {
            this.swiper.slidePrev();
          }
        }
      });
    // 下一个按钮点击事件
    this.nextBtn &&
      this.nextBtn.addEventListener("click", () => {
        if (this.currentIndex < this.length - 1) {
          this.currentIndex += 1;
          this.setActiveState(this.currentIndex);
          if (
            this.currentIndex > this.initialSlide &&
            this.currentIndex <= this.length - 1 - this.initialSlide
          ) {
            this.swiper.slideNext();
          }
        }
      });
    // slide 点击事件
    this.slides &&
      this.slides.forEach((slide, index) => {
        slide.style.cursor = "pointer";
        slide.classList.add("swiper-no-swiping");
        slide.addEventListener("click", () => {
          this.currentIndex = index;
          this.setActiveState(index);
          if (
            this.currentIndex >= this.initialSlide &&
            this.currentIndex <= this.length - 1 - this.initialSlide
          ) {
            this.swiper.slideTo(this.currentIndex);
          } else if (this.currentIndex < this.initialSlide) {
            this.swiper.slideTo(this.initialSlide);
          } else if (this.currentIndex > this.length - 1 - this.initialSlide) {
            this.swiper.slideTo(this.length - 1 - this.initialSlide);
          }
        });
      });
  }
  /**
   * 给 slide 添加 active 样式
   * @param {number}} index
   */
  setActiveState(index) {
    this.slides.forEach((i) => i.classList.remove(this.activeStyle));
    this.slides[index].classList.add(this.activeStyle);
  }
}

try {
  if (exports) {
    exports.default = NoSwipingCarousel;
  }
} catch {}
