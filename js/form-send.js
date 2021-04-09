if (window.FormData) {
    let successPopup = document.querySelector('.popup-success');
    let errorPopup = document.querySelector('.popup-error');
    
    let message = new Object();
    message.success = showPopup;
    message.failure = showPopup;

    let forms = [...document.querySelectorAll('form')];
    console.log(forms)
    // Добавляем обработчик на событие `submit`
    for(let form of forms) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Настройка AJAX запроса
            let request = new XMLHttpRequest();
            request.open('POST', 'ajax-simple.json', true);
            request.setRequestHeader('accept', 'application/json');

            let formData = new FormData(form);

            // Отправляем данные
            request.send(formData);

            // Функция для наблюдения изменения состояния request.readyState обновления statusMessage соответственно
            request.onreadystatechange = function () {
                // 4 = Ответ от сервера полностью загружен
                if (request.readyState === 4) {
                    // 200 - 299 = успешная отправка данных!
                if (request.status == 200 && request.status < 300)
                    message.success(successPopup);
                else
                    message.failure(errorPopup);
                }
            }
        });
    }
}