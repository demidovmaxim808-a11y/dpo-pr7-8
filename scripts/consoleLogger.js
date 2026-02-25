// consoleLogger.js
document.addEventListener('DOMContentLoaded', function() {
    // Слушаем кастомное событие от validation.js
    document.addEventListener('formValid', function(event) {
        // Получаем данные формы
        const formData = event.detail;
        
        // Очищаем консоль для наглядности
        console.clear();
        
        // Красивое оформление вывода
        console.log('%c📬 НОВОЕ СООБЩЕНИЕ С ФОРМЫ', 'color: #0d6efd; font-size: 16px; font-weight: bold;');
        console.log('%c════════════════════════════════', 'color: #6c757d');
        
        console.log('%c👤 ФИО:', 'color: #198754; font-weight: bold;', formData.name);
        console.log('%c📧 Email:', 'color: #198754; font-weight: bold;', formData.email);
        console.log('%c📋 Тема:', 'color: #198754; font-weight: bold;', formData.topic);
        console.log('%c💬 Сообщение:', 'color: #198754; font-weight: bold;', formData.message);
        console.log('%c✅ Согласие:', 'color: #198754; font-weight: bold;', formData.consent);
        
        console.log('%c════════════════════════════════', 'color: #6c757d');
        console.log('%c⏰ Время отправки:', 'color: #0d6efd;', formData.timestamp);
        
        // Выводим объект целиком для подробного просмотра
        console.log('%c📦 Полные данные:', 'color: #6f42c1; font-weight: bold;', formData);
    });
    
    // Дополнительно: логируем загрузку страницы
    console.log('%c🔧 ConsoleLogger загружен и готов к работе', 'color: #198754');
});