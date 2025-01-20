import {closeModal, openModal} from './modal';

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

    const message = { // 9.создание сообщения о статусе выполнения запроса и обработки данных
        load: 'img/forms/spinner.svg',
        success: 'Done',
        fail: 'Fail'
    }

    forms.forEach(item => { // 8. использование функции дл каждой формы 
        bindPostData(item);
    });

    const postData = async (url, data) => { // предупреждает что впереди ассинхронный кодб в котором нужно ждать получения результата
        const res = await fetch(url, {// остановочные пунктыб которые нужно подождать
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
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
        openModal('.modal', modalInterval);

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
            closeModal('.modal');
        }, 4000)
    };
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));
}

export default forms;