const e = require("cors");

window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent =document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach((item) => {
            item.classList.remove('tabheader__item_active');
        })
    }
    hideTabContent();
    
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    })

    //Timer

    const deadline = '2025-11-6';

    function getTimeRemaning(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());
        if(t < 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / 1000 / 60 / 60 / 24),
            hours = Math.floor((t/ 1000 / 60 /60) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function getZero(num) {
        if(num >=0 && num < 10) {
            return `0${num}`
        } else{
            return num
        }
    }

    function setClock (selector, endtime) {

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
            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
        
    setClock('.timer', deadline);

//    modal
    const modalTrigger = document.querySelectorAll('[data-modal'),
          modalWindow = document.querySelector('.modal');

    function openModal() {
        modalWindow.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalInterval);
    }
    modalTrigger.forEach((btn) => {
        btn.addEventListener('click', openModal)
    });


    function closeModal() {
        modalWindow.style.display = 'none';
        document.body.style.overflow = '';
    };
    modalWindow.addEventListener('click', (e) => {
        if(e.target === modalWindow || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if(e.code === "Escape" && modalWindow.style.display == 'block') {
            closeModal();
        }
    });
    const modalInterval = setInterval(openModal, 3000);

    function showModalScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalScroll);
        }
    }
    window.addEventListener('scroll', showModalScroll);
    

    // Create cards

    

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
            if(this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            }else {
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
                `
            ;
            this.parent.append(element);
        }
       
    };
    const getResourse =  async (url) => { 
        const res =  await fetch(url);
        return await res.json(); 
     }

    getResourse('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new Card(img, altimg, title, descr, price, '.menu .container').render();
            }
        );
    })//после промиса получаю массив обьектов и хочу деструктиризировать его то есть вытянуть значения свойств {}ю

    // new Card(
    //     'img/tabs/vegy.jpg',
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд:',
    //     9,
    //     '.menu__field .container'
    //     ).render();
    
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

const message = { // 9.создание сообщения о статусе выполнения запроса и обработки данных
    load: 'img/forms/spinner.svg',
    success: 'Done',
    fail: 'Fail'
 }

 forms.forEach(item => { // 8. использование функции дл каждой формы 
    bindPostData(item);
 });

 const postData =  async (url, data) => { // предупреждает что впереди ассинхронный кодб в котором нужно ждать получения результата
    const res =  await fetch(url, {// остановочные пунктыб которые нужно подождать
        method: 'POST',
        headers: {
            'Content-type' : 'application/json'
        },
        body: data
    });
    return await res.json(); // остановочный пункт который нужно пордождать
 }

 function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();// 2.обязательно обнулить стандартное поведение браузера - обновление страницы

        const statusMesage = document.createElement('img');// 10.создание допоолнительного элемента о статусе выполнения запроса. Модно использовать картинки ы
        statusMesage.src = message.load;
        statusMesage.style.cssText = `
            display: block;
            margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMesage);

        const formData = new FormData(form);//сбор всех данных указанных клиентом в один обьект
        
        const json = JSON.stringify(Object.fromEntries(formData.entries()))//переворматирует из формдата в массивы потом из массива в классический обьект и из обьекта в формат json

        postData('http://localhost:3000/requests', json)
        // .then((data) => data.text())//переформатирование полученных данных из ввведнной формы от клиента в  понятный обьект
        .then((data) => {// при успешегм выполнении запроса
            console.log(data);
            showThanksModal(message.success);
            statusMesage.remove();
        }).catch(() => {// при ошибке
            console.log('Error');
            showThanksModal(message.fail);
        }).finally(() => {//обязателное условие - очищение формы
            form.reset();
        });
    })
}
function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog ');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close="" class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>
    `
    document.querySelector('.modal').append(thanksModal);

    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000)
};
fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));
    


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
    

    //Calc

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age,
        ratio = 1.375;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    };

    function initStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(el => {
            el.classList.remove(activeClass);
            if(localStorage.getItem('sex') === el.getAttribute('id')){
                el.classList.add(activeClass);
            }
            if(localStorage.getItem('ratio') === el.getAttribute('data-ratio')){
                el.classList.add(activeClass);
            }
        })
    };
    initStaticInformation('#gender div', 'calculating__choose-item_active');
    initStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function calcResult () {
        if(!sex || !ratio || !weight || !height || !age) {
            result.textContent = 0;
            return
        }
        if(sex === 'female') {
            result.textContent = Math.round(( 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    };
    calcResult ();


    function staticInformation (parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(el => {
            el.addEventListener('click', (e) => {
                elements.forEach(el => el.classList.remove(activeClass));
                e.target.classList.add(activeClass);
                
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                calcResult();
            });
            
        })
    };

    staticInformation('#gender', 'calculating__choose-item_active');
    staticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function dinamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch(input.getAttribute('id')) {
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
        })

    }
    dinamicInformation('#height');
    dinamicInformation('#weight');
    dinamicInformation('#age');

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


    
});