# no-swiping-carousel
自己借助 swiper 写了一个不通过 swiping，通过按钮和点击 slide 实现的居中轮播展示组件

## 使用方式

1. 因为本组件依赖 [swiper.js](https://swiperjs.com/get-started/)，所以需要先映入 swiper 的 css 和 js 文件，再引入本组件 js 文件：

   ```javascript
     <link rel="stylesheet" href="./node_modules/swiper/swiper-bundle.min.css">
     <script src="./node_modules/swiper/swiper-bundle.min.js"></script>
   ```

2. 添加和使用 `swiper` 时类似的 html 代码和 javascript 代码即可：

   ```html
     <div class="swiper-container">
       <div class="swiper-wrapper">
         <div class="swiper-slide">1</div>
         <div class="swiper-slide">2</div>
         <div class="swiper-slide">3</div>
         <div class="swiper-slide">4</div>
         <div class="swiper-slide">5</div>
         <div class="swiper-slide">6</div>
         <div class="swiper-slide">7</div>
         <div class="swiper-slide">8</div>
         <div class="swiper-slide">9</div>
         <div class="swiper-slide">10</div>
       </div>
     </div>
     <button class="prev">&lt;</button>
     <button class="next">&gt;</button>
   ```

   ```javascript
       new NoSwipingCarousel(".swiper-container", {
         slidesPerView: 5, // 并列显示 slide 数量
         spaceBetween: 30, // 间距
         navigation: {
           nextEl: ".next", // 下一个按钮
           prevEl: ".prev", // 上一个按钮
         },
         activeStyle: "active" // 选中后 slide 样式
       });
   ```

   ## demo

   [demo](https://trcat.github.io/no-swiping-carousel/)

   ## 环境支持情况

   目前已通过 `babel` 编译，但是未添加 `polyfill`，请按实际情况添加。浏览器支持情况如下：

   ```json
   {
       "browserslist": [
       "last 2 versions",
       "> 1%",
       "ie >= 9"
     ]
   }
   ```

