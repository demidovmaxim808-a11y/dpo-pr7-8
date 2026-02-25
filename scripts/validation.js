// validation.js
document.addEventListener('DOMContentLoaded', function() {
    // Находим форму на странице контактов
    const form = document.querySelector('#contactsForm');
    
    // Если формы нет на текущей странице - выходим
    if (!form) return;
    
    // Функция показа ошибки для Bootstrap
    function showError(input, message) {
        // Добавляем класс ошибки (Bootstrap использует is-invalid)
        input.classList.add('is-invalid');
        
        // Ищем или создаем блок с ошибкой
        let feedback = input.nextElementSibling;
        if (!feedback || !feedback.classList.contains('invalid-feedback')) {
            feedback = document.createElement('div');
            feedback.className = 'invalid-feedback';
            input.parentNode.appendChild(feedback);
        }
        feedback.textContent = message;
    }
    
    // Функция очистки ошибок для конкретного поля
    function clearError(input) {
        input.classList.remove('is-invalid');
        const feedback = input.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.remove();
        }
    }
    
    // Очистка ошибок при вводе
    document.querySelectorAll('#contactsForm .form-control, #contactsForm .form-select, #contactsForm .form-check-input').forEach(input => {
        input.addEventListener('input', function() {
            clearError(this);
        });
        // Для select
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', function() {
                clearError(this);
            });
        }
        // Для checkbox
        if (input.type === 'checkbox') {
            input.addEventListener('change', function() {
                clearError(this);
            });
        }
    });
    
    // Обработчик отправки формы
    form.addEventListener('submit', function(event) {
        // Отменяем стандартную отправку
        event.preventDefault();
        
        // Очищаем все предыдущие ошибки
        document.querySelectorAll('#contactsForm .is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        document.querySelectorAll('#contactsForm .invalid-feedback').forEach(el => {
            el.remove();
        });
        
        let isValid = true;
        
        // 1. Проверка имени (не пустое, минимум 2 слова)
        const name = document.getElementById('name');
        const nameValue = name.value.trim();
        
        if (nameValue === '') {
            showError(name, 'Введите ваше имя');
            isValid = false;
        } else {
            const words = nameValue.split(' ').filter(word => word.length > 0);
            if (words.length < 2) {
                showError(name, 'Введите имя и фамилию');
                isValid = false;
            }
        }
        
        // 2. Проверка email
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email (например: name@domain.com)');
            isValid = false;
        }
        
        // 3. Проверка темы (выбрана ли)
        const topic = document.getElementById('topic');
        if (topic.value === '' || topic.value === 'Выберите тему') {
            showError(topic, 'Выберите тему сообщения');
            isValid = false;
        }
        
        // 4. Проверка согласия
        const consent = document.getElementById('consent');
        if (!consent.checked) {
            showError(consent, 'Необходимо согласие на обработку данных');
            isValid = false;
        }
        
        // 5. Сообщение (необязательное, но можно проверить длину)
        const message = document.getElementById('message');
        const messageValue = message.value.trim();
        
        // Если всё корректно - отправляем событие
        if (isValid) {
            // Собираем данные формы
            const formData = {
                name: nameValue,
                email: emailValue,
                topic: topic.options[topic.selectedIndex]?.text || 'Не выбрана',
                message: messageValue || '(не заполнено)',
                consent: consent.checked ? 'Да' : 'Нет',
                timestamp: new Date().toLocaleString()
            };
            
            // Создаем и диспатчим кастомное событие
            const event = new CustomEvent('formValid', { 
                detail: formData 
            });
            document.dispatchEvent(event);
            
            // Показываем сообщение об успехе
            alert('✓ Форма успешно отправлена! Проверьте консоль (F12) для просмотра данных.');
            
            // Опционально: очищаем форму
            // form.reset();
        }
    });
});