if (window.FormData) {
    let successPopup = document.querySelector('.popup-success');
    let errorPopup = document.querySelector('.popup-error');
    
    let message = new Object();
    message.success = showPopup;
    message.failure = showPopup;

    let forms = [...document.querySelectorAll('form')];

    for(let form of forms) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();        
            let formData = new FormData(form);
            let responce = await fetch('../send.php', {
                method: 'POST',
                body: formData
            });
            if(responce.ok) {
                let result = await responce.json();
                if(result.message == 'Oшибка') {
                    message.failure(errorPopup);
                } else {
                    form.reset();
                    message.success(successPopup);
                } 
            } else {
                message.failure(errorPopup);
            }

        });
    }
}