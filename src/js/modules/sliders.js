function sliders({slider, totalWrap, slideWrap, prevArrow, nextArrow, totalSliders, currentSliders, slideInner}) {
    // //Slider моя работа
    // const slidersImg = document.querySelectorAll('.offer__slide'),
    //       totalQuantSlide = document.querySelector('#total'),
    //       nextArrow = document.querySelector('.offer__slider-next'),
    //       prewArrow = document.querySelector('.offer__slider-prev');
    // let currentNumberSlide = document.querySelector('#current');


    // function searchSumSlide () {
    //     let quantSlide = 0;

    //     slidersImg.forEach((img) => {
    //         ++quantSlide;
    //     });
    //     return quantSlide;
    // };
    // searchSumSlide();
    
    // function writeTotalSumSlide () {
    //     const result = searchSumSlide();
    //     if(result < 10){
    //         totalQuantSlide.textContent = `0${result}`;
    //     } else {
    //         totalQuantSlide.textContent = `${re}`;
    //     }
    // }
    // writeTotalSumSlide();
    
    // function changeNumberSlide() {
    //     let numerSlide = document.querySelector('.offer__slide.show').getAttribute('data-numer');
    //     if(numerSlide < 10){
    //         currentNumberSlide.textContent = `0${numerSlide}`;
    //     }else {
    //         currentNumberSlide.textContent = `${numerSlide}`;
    //     }
    // };
    // changeNumberSlide();

    // function minusSlide() {
    //     let numerSlide = document.querySelector('.offer__slide.show').getAttribute('data-numer');
    //     if(numerSlide > 1) {
    //         slidersImg.forEach(img => {
    //             img.classList.remove('show');
    //             img.classList.add('hide');
    //         })
    //         --numerSlide;
    //         let currentSlide = document.querySelector(`[data-numer="${numerSlide}"]`);
    //         currentSlide.classList.add('show');
    //         currentSlide.classList.remove('hide');
    //         changeNumberSlide();
    //     }
    // };
    // function plusSlide() {
    //     let numerSlide = document.querySelector('.offer__slide.show').getAttribute('data-numer');
    //     if(numerSlide < searchSumSlide()) {
    //         slidersImg.forEach(img => {
    //             img.classList.remove('show');
    //             img.classList.add('hide');
    //         })
    //         ++numerSlide;
    //         let currentSlide = document.querySelector(`[data-numer="${numerSlide}"]`);
    //         currentSlide.classList.add('show');
    //         currentSlide.classList.remove('hide');
    //         changeNumberSlide();
    //     }
    // };
    // prewArrow.addEventListener('click', minusSlide);
    // nextArrow.addEventListener('click', plusSlide);
    
    //Слайдер работа petrichenkoo
    
    const sliders = document.querySelectorAll(slider),
            sliderWrapper = document.querySelector(slideWrap),
            prev = document.querySelector(prevArrow),
            next = document.querySelector(nextArrow),
            total = document.querySelector(totalSliders),
            current = document.querySelector(currentSliders),
            sliderWrrapper = document.querySelector(totalWrap),
            sliderInner = document.querySelector(slideInner),
            width = window.getComputedStyle(sliderWrrapper).width;
            
    let indexSlider = 1;
    let offset = 0;
    const dots = [];
    //  Слайдер-карусель

   sliderInner.style.width = 100 * (sliders.length) + '%';
   sliderInner.style.display = 'flex';
   sliderWrrapper.style.overflow = 'hidden';
   sliderInner.style.transition = "0.5s all";

   sliders.forEach(slider => {
       slider.style.width = width;
   });

   if(sliders.length < 10) {
    total.textContent = `0${sliders.length}`;
   } else{
    total.textContent = sliders.length;
   }


    next.addEventListener('click', () => {
        if(offset == (+width.replace(/\D/g, '') * (sliders.length - 1))){
            offset = 0;
            
        } else {
            offset += +width.replace(/\D/g, '');
        }
        sliderInner.style.transform = `translateX(-${offset}px)`;

        if(indexSlider == sliders.length){
            indexSlider = 1;
        } else {
            indexSlider++;
        }

        if(indexSlider < 10) {
            current.textContent = `0${indexSlider}`;
        } else {
            current.textContent = indexSlider;
        }

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[indexSlider - 1].style.opacity = '1';
        
    });

    prev.addEventListener('click', () => {
        if(offset == 0){
            offset = +width.replace(/\D/g, '') * (sliders.length - 1);
        } else {
            offset -= +width.replace(/\D/g, '');
        }
        sliderInner.style.transform = `translateX(-${offset}px)`;

        if(indexSlider == 1){
            indexSlider = sliders.length;
        } else {
            indexSlider--;
        }

        if(indexSlider < 10) {
            current.textContent = `0${indexSlider}`;
        } else {
            current.textContent = indexSlider;
        };

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[indexSlider - 1].style.opacity = '1';
        
    });
    
    sliderWrapper.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('dots-indicators');
    indicators.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;`
    sliderWrapper.append(indicators);

    for(let i = 0; i < sliders.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-dot', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;`

            if( i == 0) {
                dot.style.opacity = '1';
            }
        indicators.append(dot);
        dots.push(dot);

    }
    dots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            
            let numerSlide = e.target.getAttribute('data-dot');
            indexSlider = numerSlide;

            if(indexSlider < 10) {
                current.textContent = `0${indexSlider}`;
            } else {
                current.textContent = indexSlider;
            };

            offset = (changePxtoNumber(width) * (numerSlide - 1));
            sliderInner.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[indexSlider - 1].style.opacity = '1';
        })
    })

    function changePxtoNumber(data) {
        return +data.replace(/\D/g, '');
    };
}

// слайдер обычным способом
//     showSlider(indexSlider);

//     if(sliders.length < 10) {
//         total.textContent = `0${sliders.length}`;
//     } else{
//         total.textContent = sliders.length;
//     }

//     function showSlider(n) {
//         if(n > sliders.length) {
//             indexSlider = 1;
//         } ;
//         if(n < 1) {
//             indexSlider = sliders.length;
//         };
//         sliders.forEach(item => item.style.display = 'none');
        
//         sliders[indexSlider - 1].style.display = 'block';

//         if(indexSlider < 10) {
//             current.textContent = `0${indexSlider}`;
//         } else{
//             current.textContent = indexSlider;
//         }

//     };

//     function plusSlider(n) {
//         showSlider(indexSlider += n);
//     };

//     prev.addEventListener('click', () => {
//         plusSlider(-1);
//     });
//     next.addEventListener('click', () => {
//         plusSlider(1);
//     });

export default sliders;