/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
  //Calc

  const result = document.querySelector('.calculating__result span');
  let sex,
    height,
    weight,
    age,
    ratio = 1.375;
  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
  } else {
    sex = 'female';
    localStorage.setItem('sex', 'female');
  }
  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }
  ;
  function initStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
      el.classList.remove(activeClass);
      if (localStorage.getItem('sex') === el.getAttribute('id')) {
        el.classList.add(activeClass);
      }
      if (localStorage.getItem('ratio') === el.getAttribute('data-ratio')) {
        el.classList.add(activeClass);
      }
    });
  }
  ;
  initStaticInformation('#gender div', 'calculating__choose-item_active');
  initStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
  function calcResult() {
    if (!sex || !ratio || !weight || !height || !age) {
      result.textContent = 0;
      return;
    }
    if (sex === 'female') {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }
  ;
  calcResult();
  function staticInformation(parentSelector, activeClass) {
    const elements = document.querySelectorAll(`${parentSelector} div`);
    elements.forEach(el => {
      el.addEventListener('click', e => {
        elements.forEach(el => el.classList.remove(activeClass));
        e.target.classList.add(activeClass);
        if (e.target.getAttribute('data-ratio')) {
          ratio = +e.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
        } else {
          sex = e.target.getAttribute('id');
          localStorage.setItem('sex', e.target.getAttribute('id'));
        }
        calcResult();
      });
    });
  }
  ;
  staticInformation('#gender', 'calculating__choose-item_active');
  staticInformation('.calculating__choose_big', 'calculating__choose-item_active');
  function dinamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid red';
      } else {
        input.style.border = 'none';
      }
      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      calcResult();
    });
  }
  dinamicInformation('#height');
  dinamicInformation('#weight');
  dinamicInformation('#age');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
  class Card {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }
    changeToUAH() {
      this.price = this.price * this.transfer;
    }
    render() {
      let element = document.createElement('div');
      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }
      element.innerHTML = `
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
                `;
      this.parent.append(element);
    }
  }
  ;
  const getResourse = async url => {
    const res = await fetch(url);
    return await res.json();
  };
  getResourse('http://localhost:3000/menu').then(data => {
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new Card(img, altimg, title, descr, price, '.menu .container').render();
    });
  }); //после промиса получаю массив обьектов и хочу деструктиризировать его то есть вытянуть значения свойств {}ю

  // new Card(
  //     'img/tabs/vegy.jpg',
  //     'Меню "Фитнес"',
  //     'Меню "Фитнес" - это новый подход к приготовлению блюд:',
  //     9,
  //     '.menu__field .container'
  //     ).render();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");

function forms(modalInterval) {
  //Forms отправка данных на сервер через старый способ XMLHttpRequest

  //      const forms = document.querySelectorAll('form'); // 1. отыскиваю все формы

  //      const message = { // 9.создание сообщения о статусе выполнения запроса и обработки данных
  //         load: 'img/forms/spinner.svg',
  //         success: 'Done',
  //         fail: 'Fail'
  //      }

  //      forms.forEach(item => { // 8. использование функции дл каждой формы 
  //         postData(item);
  //      });

  //      function postData(form) {
  //         form.addEventListener('submit', (e) => {
  //             e.preventDefault();// 2.обязательно обнулить стандартное поведение браузера - обновление страницы

  //             const statusMesage = document.createElement('img');// 10.создание допоолнительного элемента о статусе выполнения запроса. Модно использовать картинки ы
  //             statusMesage.src = message.load;
  //             statusMesage.style.cssText = `
  //                 display: block;
  //                 margin: 0 auto;
  //             `;
  //             form.insertAdjacentElement('afterend', statusMesage);
  //             const request = new XMLHttpRequest(); //3.создать интерфейс запрса

  //             request.open('POST', 'js/server.php'); //4.собрать информаию о запросе
  //             // request.setRequestHeader('Content-type', 'multipart/form-data') !!!!!!при использовании XMLHttpRequest нельзя делать заголовки для форм, потому что не отправятся корректно данные
  //             const formData = new FormData(form);//5.сбор всех данных указанных клиентом в один обьект
  //             request.send(formData);// 6.отправить запрос как человека за покупками в мазазин

  //             request.addEventListener('load', () => {// 7.событие срабатывающее 1 раз, когда запрос готов
  //                 if( request.status === 200) {
  //                     console.log(request.response);
  //                     showThanksModal(message.success);
  //                     form.reset(); //11.очищение формы. альтернативное резение это выбрать все инпуты перебрать их и очистить из value
  //                     statusMesage.remove();
  //                 } else {
  //                     console.log('Error');
  //                     showThanksModal(message.fail);
  //                 }
  //             })
  //         })
  //     }
  //     function showThanksModal(message) {
  //         const prevModalDialog = document.querySelector('.modal__dialog ');

  //         prevModalDialog.classList.add('hide');
  //         openModal();

  //         const thanksModal = document.createElement('div');
  //         thanksModal.classList.add('modal__dialog');
  //         thanksModal.innerHTML = `
  //             <div class="modal__content">
  //                 <div data-close="" class="modal__close">×</div>
  //                 <div class="modal__title">${message}</div>
  //             </div>
  //         `
  //         document.querySelector('.modal').append(thanksModal);

  //         setTimeout(() => {
  //             thanksModal.remove();
  //             prevModalDialog.classList.add('show');
  //             prevModalDialog.classList.remove('hide');
  //             closeModal();
  //         }, 4000)
  //     }

  // !!!!!!!!!отправка данных на сервер через новый способ fetch

  const forms = document.querySelectorAll('form'); // 1. отыскиваю все формы

  const message = {
    // 9.создание сообщения о статусе выполнения запроса и обработки данных
    load: 'img/forms/spinner.svg',
    success: 'Done',
    fail: 'Fail'
  };
  forms.forEach(item => {
    // 8. использование функции дл каждой формы 
    bindPostData(item);
  });
  const postData = async (url, data) => {
    // предупреждает что впереди ассинхронный кодб в котором нужно ждать получения результата
    const res = await fetch(url, {
      // остановочные пунктыб которые нужно подождать
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });
    return await res.json(); // остановочный пункт который нужно пордождать
  };
  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault(); // 2.обязательно обнулить стандартное поведение браузера - обновление страницы

      const statusMesage = document.createElement('img'); // 10.создание допоолнительного элемента о статусе выполнения запроса. Модно использовать картинки ы
      statusMesage.src = message.load;
      statusMesage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
      form.insertAdjacentElement('afterend', statusMesage);
      const formData = new FormData(form); //сбор всех данных указанных клиентом в один обьект

      const json = JSON.stringify(Object.fromEntries(formData.entries())); //переворматирует из формдата в массивы потом из массива в классический обьект и из обьекта в формат json

      postData('http://localhost:3000/requests', json)
      // .then((data) => data.text())//переформатирование полученных данных из ввведнной формы от клиента в  понятный обьект
      .then(data => {
        // при успешегм выполнении запроса
        console.log(data);
        showThanksModal(message.success);
        statusMesage.remove();
      }).catch(() => {
        // при ошибке
        console.log('Error');
        showThanksModal(message.fail);
      }).finally(() => {
        //обязателное условие - очищение формы
        form.reset();
      });
    });
  }
  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog ');
    prevModalDialog.classList.add('hide');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalInterval);
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close="" class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
    }, 4000);
  }
  ;
  fetch('http://localhost:3000/menu').then(data => data.json()).then(res => console.log(res));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalInterval) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.style.display = 'block';
  document.body.style.overflow = 'hidden';
  if (modalInterval) {
    clearInterval(modalInterval);
  }
}
function closeModal(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.style.display = 'none';
  document.body.style.overflow = '';
}
;
modalWindow.addEventListener('click', e => {
  if (e.target === modalWindow || e.target.getAttribute('data-close') == "") {
    closeModal(modalSelector);
  }
});
function modal(triggerSelector, modalSelector, modalInterval) {
  //    modal
  const modalTrigger = document.querySelectorAll(triggerSelector),
    modalWindow = document.querySelector(modalSelector);
  document.addEventListener('keydown', e => {
    if (e.code === "Escape" && modalWindow.style.display == 'block') {
      closeModal(modalSelector);
    }
  });
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalInterval));
  });
  function showModalScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalInterval);
      window.removeEventListener('scroll', showModalScroll);
    }
  }
  window.addEventListener('scroll', showModalScroll);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./src/js/modules/sliders.js":
/*!***********************************!*\
  !*** ./src/js/modules/sliders.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function sliders() {
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

  const sliders = document.querySelectorAll('.offer__slide'),
    sliderWrapper = document.querySelector('.offer__slider'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    sliderWrrapper = document.querySelector('.offer__slider-wrapper'),
    sliderInner = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(sliderWrrapper).width;
  let indexSlider = 1;
  let offset = 0;
  const dots = [];
  //  Слайдер-карусель

  sliderInner.style.width = 100 * sliders.length + '%';
  sliderInner.style.display = 'flex';
  sliderWrrapper.style.overflow = 'hidden';
  sliderInner.style.transition = "0.5s all";
  sliders.forEach(slider => {
    slider.style.width = width;
  });
  if (sliders.length < 10) {
    total.textContent = `0${sliders.length}`;
  } else {
    total.textContent = sliders.length;
  }
  next.addEventListener('click', () => {
    if (offset == +width.replace(/\D/g, '') * (sliders.length - 1)) {
      offset = 0;
    } else {
      offset += +width.replace(/\D/g, '');
    }
    sliderInner.style.transform = `translateX(-${offset}px)`;
    if (indexSlider == sliders.length) {
      indexSlider = 1;
    } else {
      indexSlider++;
    }
    if (indexSlider < 10) {
      current.textContent = `0${indexSlider}`;
    } else {
      current.textContent = indexSlider;
    }
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[indexSlider - 1].style.opacity = '1';
  });
  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.replace(/\D/g, '') * (sliders.length - 1);
    } else {
      offset -= +width.replace(/\D/g, '');
    }
    sliderInner.style.transform = `translateX(-${offset}px)`;
    if (indexSlider == 1) {
      indexSlider = sliders.length;
    } else {
      indexSlider--;
    }
    if (indexSlider < 10) {
      current.textContent = `0${indexSlider}`;
    } else {
      current.textContent = indexSlider;
    }
    ;
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
            list-style: none;`;
  sliderWrapper.append(indicators);
  for (let i = 0; i < sliders.length; i++) {
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
            transition: opacity .6s ease;`;
    if (i == 0) {
      dot.style.opacity = '1';
    }
    indicators.append(dot);
    dots.push(dot);
  }
  dots.forEach(dot => {
    dot.addEventListener('click', function (e) {
      let numerSlide = e.target.getAttribute('data-dot');
      indexSlider = numerSlide;
      if (indexSlider < 10) {
        current.textContent = `0${indexSlider}`;
      } else {
        current.textContent = indexSlider;
      }
      ;
      offset = changePxtoNumber(width) * (numerSlide - 1);
      sliderInner.style.transform = `translateX(-${offset}px)`;
      dots.forEach(dot => dot.style.opacity = '.5');
      dots[indexSlider - 1].style.opacity = '1';
    });
  });
  function changePxtoNumber(data) {
    return +data.replace(/\D/g, '');
  }
  ;
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sliders);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }
  hideTabContent();
  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }
  showTabContent();
  tabsParent.addEventListener('click', event => {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
  const deadline = '2025-11-6';
  function getTimeRemaning(endtime) {
    let days, hours, minutes, seconds;
    const t = Date.parse(endtime) - Date.parse(new Date());
    if (t < 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / 1000 / 60 / 60 / 24), hours = Math.floor(t / 1000 / 60 / 60 % 24), minutes = Math.floor(t / 1000 / 60 % 60), seconds = Math.floor(t / 1000 % 60);
    }
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();
    function updateClock() {
      const t = getTimeRemaning(endtime);
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock('.timer', deadline);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./node_modules/cors/lib/index.js":
/*!****************************************!*\
  !*** ./node_modules/cors/lib/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(function () {

  'use strict';

  var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
  var vary = __webpack_require__(/*! vary */ "./node_modules/vary/index.js");

  var defaults = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  };

  function isString(s) {
    return typeof s === 'string' || s instanceof String;
  }

  function isOriginAllowed(origin, allowedOrigin) {
    if (Array.isArray(allowedOrigin)) {
      for (var i = 0; i < allowedOrigin.length; ++i) {
        if (isOriginAllowed(origin, allowedOrigin[i])) {
          return true;
        }
      }
      return false;
    } else if (isString(allowedOrigin)) {
      return origin === allowedOrigin;
    } else if (allowedOrigin instanceof RegExp) {
      return allowedOrigin.test(origin);
    } else {
      return !!allowedOrigin;
    }
  }

  function configureOrigin(options, req) {
    var requestOrigin = req.headers.origin,
      headers = [],
      isAllowed;

    if (!options.origin || options.origin === '*') {
      // allow any origin
      headers.push([{
        key: 'Access-Control-Allow-Origin',
        value: '*'
      }]);
    } else if (isString(options.origin)) {
      // fixed origin
      headers.push([{
        key: 'Access-Control-Allow-Origin',
        value: options.origin
      }]);
      headers.push([{
        key: 'Vary',
        value: 'Origin'
      }]);
    } else {
      isAllowed = isOriginAllowed(requestOrigin, options.origin);
      // reflect origin
      headers.push([{
        key: 'Access-Control-Allow-Origin',
        value: isAllowed ? requestOrigin : false
      }]);
      headers.push([{
        key: 'Vary',
        value: 'Origin'
      }]);
    }

    return headers;
  }

  function configureMethods(options) {
    var methods = options.methods;
    if (methods.join) {
      methods = options.methods.join(','); // .methods is an array, so turn it into a string
    }
    return {
      key: 'Access-Control-Allow-Methods',
      value: methods
    };
  }

  function configureCredentials(options) {
    if (options.credentials === true) {
      return {
        key: 'Access-Control-Allow-Credentials',
        value: 'true'
      };
    }
    return null;
  }

  function configureAllowedHeaders(options, req) {
    var allowedHeaders = options.allowedHeaders || options.headers;
    var headers = [];

    if (!allowedHeaders) {
      allowedHeaders = req.headers['access-control-request-headers']; // .headers wasn't specified, so reflect the request headers
      headers.push([{
        key: 'Vary',
        value: 'Access-Control-Request-Headers'
      }]);
    } else if (allowedHeaders.join) {
      allowedHeaders = allowedHeaders.join(','); // .headers is an array, so turn it into a string
    }
    if (allowedHeaders && allowedHeaders.length) {
      headers.push([{
        key: 'Access-Control-Allow-Headers',
        value: allowedHeaders
      }]);
    }

    return headers;
  }

  function configureExposedHeaders(options) {
    var headers = options.exposedHeaders;
    if (!headers) {
      return null;
    } else if (headers.join) {
      headers = headers.join(','); // .headers is an array, so turn it into a string
    }
    if (headers && headers.length) {
      return {
        key: 'Access-Control-Expose-Headers',
        value: headers
      };
    }
    return null;
  }

  function configureMaxAge(options) {
    var maxAge = (typeof options.maxAge === 'number' || options.maxAge) && options.maxAge.toString()
    if (maxAge && maxAge.length) {
      return {
        key: 'Access-Control-Max-Age',
        value: maxAge
      };
    }
    return null;
  }

  function applyHeaders(headers, res) {
    for (var i = 0, n = headers.length; i < n; i++) {
      var header = headers[i];
      if (header) {
        if (Array.isArray(header)) {
          applyHeaders(header, res);
        } else if (header.key === 'Vary' && header.value) {
          vary(res, header.value);
        } else if (header.value) {
          res.setHeader(header.key, header.value);
        }
      }
    }
  }

  function cors(options, req, res, next) {
    var headers = [],
      method = req.method && req.method.toUpperCase && req.method.toUpperCase();

    if (method === 'OPTIONS') {
      // preflight
      headers.push(configureOrigin(options, req));
      headers.push(configureCredentials(options, req));
      headers.push(configureMethods(options, req));
      headers.push(configureAllowedHeaders(options, req));
      headers.push(configureMaxAge(options, req));
      headers.push(configureExposedHeaders(options, req));
      applyHeaders(headers, res);

      if (options.preflightContinue) {
        next();
      } else {
        // Safari (and potentially other browsers) need content-length 0,
        //   for 204 or they just hang waiting for a body
        res.statusCode = options.optionsSuccessStatus;
        res.setHeader('Content-Length', '0');
        res.end();
      }
    } else {
      // actual response
      headers.push(configureOrigin(options, req));
      headers.push(configureCredentials(options, req));
      headers.push(configureExposedHeaders(options, req));
      applyHeaders(headers, res);
      next();
    }
  }

  function middlewareWrapper(o) {
    // if options are static (either via defaults or custom options passed in), wrap in a function
    var optionsCallback = null;
    if (typeof o === 'function') {
      optionsCallback = o;
    } else {
      optionsCallback = function (req, cb) {
        cb(null, o);
      };
    }

    return function corsMiddleware(req, res, next) {
      optionsCallback(req, function (err, options) {
        if (err) {
          next(err);
        } else {
          var corsOptions = assign({}, defaults, options);
          var originCallback = null;
          if (corsOptions.origin && typeof corsOptions.origin === 'function') {
            originCallback = corsOptions.origin;
          } else if (corsOptions.origin) {
            originCallback = function (origin, cb) {
              cb(null, corsOptions.origin);
            };
          }

          if (originCallback) {
            originCallback(req.headers.origin, function (err2, origin) {
              if (err2 || !origin) {
                next(err2);
              } else {
                corsOptions.origin = origin;
                cors(corsOptions, req, res, next);
              }
            });
          } else {
            next();
          }
        }
      });
    };
  }

  // can pass either an options hash, an options delegate, or nothing
  module.exports = middlewareWrapper;

}());


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/vary/index.js":
/*!************************************!*\
  !*** ./node_modules/vary/index.js ***!
  \************************************/
/***/ ((module) => {

"use strict";
/*!
 * vary
 * Copyright(c) 2014-2017 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 */

module.exports = vary
module.exports.append = append

/**
 * RegExp to match field-name in RFC 7230 sec 3.2
 *
 * field-name    = token
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 */

var FIELD_NAME_REGEXP = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/

/**
 * Append a field to a vary header.
 *
 * @param {String} header
 * @param {String|Array} field
 * @return {String}
 * @public
 */

function append (header, field) {
  if (typeof header !== 'string') {
    throw new TypeError('header argument is required')
  }

  if (!field) {
    throw new TypeError('field argument is required')
  }

  // get fields array
  var fields = !Array.isArray(field)
    ? parse(String(field))
    : field

  // assert on invalid field names
  for (var j = 0; j < fields.length; j++) {
    if (!FIELD_NAME_REGEXP.test(fields[j])) {
      throw new TypeError('field argument contains an invalid header name')
    }
  }

  // existing, unspecified vary
  if (header === '*') {
    return header
  }

  // enumerate current values
  var val = header
  var vals = parse(header.toLowerCase())

  // unspecified vary
  if (fields.indexOf('*') !== -1 || vals.indexOf('*') !== -1) {
    return '*'
  }

  for (var i = 0; i < fields.length; i++) {
    var fld = fields[i].toLowerCase()

    // append value (case-preserving)
    if (vals.indexOf(fld) === -1) {
      vals.push(fld)
      val = val
        ? val + ', ' + fields[i]
        : fields[i]
    }
  }

  return val
}

/**
 * Parse a vary header into an array.
 *
 * @param {String} header
 * @return {Array}
 * @private
 */

function parse (header) {
  var end = 0
  var list = []
  var start = 0

  // gather tokens
  for (var i = 0, len = header.length; i < len; i++) {
    switch (header.charCodeAt(i)) {
      case 0x20: /*   */
        if (start === end) {
          start = end = i + 1
        }
        break
      case 0x2c: /* , */
        list.push(header.substring(start, end))
        start = end = i + 1
        break
      default:
        end = i + 1
        break
    }
  }

  // final token
  list.push(header.substring(start, end))

  return list
}

/**
 * Mark that a request is varied on a header field.
 *
 * @param {Object} res
 * @param {String|Array} field
 * @public
 */

function vary (res, field) {
  if (!res || !res.getHeader || !res.setHeader) {
    // quack quack
    throw new TypeError('res argument is required')
  }

  // get existing header
  var val = res.getHeader('Vary') || ''
  var header = Array.isArray(val)
    ? val.join(', ')
    : String(val)

  // set new header
  if ((val = append(header, field))) {
    res.setHeader('Vary', val)
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_sliders__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/sliders */ "./src/js/modules/sliders.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
const e = __webpack_require__(/*! cors */ "./node_modules/cors/lib/index.js");









window.addEventListener('DOMContentLoaded', () => {
  const modalInterval = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.openModal)(modalSelector, modalInterval), 3000);
  console.log('hello1');
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__["default"])('[data-modal', '.modal', modalInterval);
  (0,_modules_sliders__WEBPACK_IMPORTED_MODULE_5__["default"])();
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])();
});
})();

/******/ })()
;
//# sourceMappingURL=script.js.map