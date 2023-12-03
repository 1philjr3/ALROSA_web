(function() {
    function calculateLoadTime() {
        return window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
    }
    function displayLoadTime() {
        const loadTime = calculateLoadTime();
        const footer = document.querySelector(".footer");
        const p = document.createElement("p");
        p.innerText = `Page loaded in ${loadTime} ms`;
        footer.appendChild(p);
    }
    window.addEventListener("load", function() {
        setTimeout(displayLoadTime, 0);
    });
})();