(function() {
    function calculateLoadTime() {
        // веренм времы загрузки
        return window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    }
    function displayLoadTime() {
        // отобразим в футере
        const loadTime = calculateLoadTime();
        const footer = document.querySelector(".footer");
        const p = document.createElement("p");
        p.innerText = `Page loaded in ${loadTime} ms`;
        // добавили абзац в футер
        footer.appendChild(p);
    }
    // load происходит когда все загружено, все элементы прогружены
    window.addEventListener("load", function() {
        setTimeout(displayLoadTime, 0);
        // поместили в таймаут с нулевой задержкой для того, чтобы удостовериться в измерение времени
        // загрузки будет происходить после заврешения основного потока выполнения
        // короче я говорю брузеру "подожди ровно 0 миллисекунд после того, как все загрузится, и затем выполнить функцию"
    });
})();