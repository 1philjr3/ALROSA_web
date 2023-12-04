(function() {
    function calculateLoadTime() {
        // веренм времы загрузки
        return window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    }
    function displayLoadTime() {
        // Отобразим в футере с использованием спойлера
        const loadTime = calculateLoadTime();
        const footer = document.querySelector(".footer");

        // Создаем элемент спойлера
        const spoiler = document.createElement("span");
        spoiler.classList.add("spoiler");
        spoiler.innerText = `Page loaded in ${loadTime} ms`;

        // Добавляем спойлер в футер
        footer.appendChild(spoiler);
    }
    // load происходит когда все загружено, все элементы прогружены
    window.addEventListener("load", function() {
        setTimeout(displayLoadTime, 0);
        // поместили в таймаут с нулевой задержкой для того, чтобы удостовериться в измерение времени
        // загрузки будет происходить после заврешения основного потока выполнения
        // короче я говорю брузеру "подожди ровно 0 миллисекунд после того, как все загрузится, и затем выполнить функцию"
    });
})();