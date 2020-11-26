class NoSwipingCarousel {
  constructor(el, options) {
    this.el = el; // 目标 css 样式
    this.slidesPerView = options.slidesPerView || 3; // 并列显示几个内容
    this.initialSlide = Math.floor((this.slidesPerView - 1) / 2); // swiper 初始 index
    this.spaceBetween = options.spaceBetween || 30; // slide 间距
    this.activeStyle = options.activeStyle || ""; // 处于选中状态的样式
    this.loop = options.loop || false; // 是否循环
    this.prevBtn = document.querySelector(options.navigation.prevEl); // 上一个按钮
    this.nextBtn = document.querySelector(options.navigation.nextEl); // 下一个按钮
    this.slides = document.querySelectorAll(`${this.el} .swiper-slide`); // 所有 slides
    this.length = this.slides.length; // slide 的个数
    this.handleSelectChange = options.handleSelectChange || function () {}; // 监听 slide 切换事件
    this.currentIndex = 0; // 当前处于选中状态的 slide index
    this.swiper = null; // swiper 实例
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
      observer: true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents: true,//修改swiper的父元素时，自动初始化swiper
      on: {
        init(e) {
          // swiper 初始化后，让首个 slide 处于 active 状态
          self.setActiveState(self.currentIndex);
        },
        slideChangeTransitionEnd: this.slideChangeTransitionEnd,
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
        } else if (this.currentIndex === 0 && this.loop) {
          this.currentIndex = this.length - 1;
          this.setActiveState(this.currentIndex);
          this.swiper.slideTo(this.length - 1 - this.initialSlide);
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
        } else if (this.currentIndex === this.length - 1 && this.loop) {
          this.currentIndex = 0;
          this.setActiveState(this.currentIndex);
          this.swiper.slideTo(this.initialSlide);
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
    this.handleSelectChange({
      index,
      element: this.slides[index],
    });
  }
}

try {
  if (exports) {
    exports.default = NoSwipingCarousel;
  }
} catch {}
