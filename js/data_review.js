function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

async function fetchComment(randomLimit) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_start=1&_limit=${randomLimit}`);
    const data = await response.json();
    return data;
}

window.addEventListener("load", function() {
    const fetchButton = document.getElementById('fetchButton');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const dataList = document.getElementById('dataList');

    fetchButton.addEventListener('click', () => {
        if (dataList.children.length !== 0) {
            while (dataList.firstChild) {
                dataList.removeChild(dataList.lastChild);
            }
        }

        loadingIndicator.style.display = 'flex';

        // let randomLimit = getRandomInt(5, 10);

        setTimeout(() => {
            fetchComment(5)
                .then(json => {
                    loadingIndicator.style.display = 'none';
                    json.forEach(comment => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${comment.name} // ${comment.email} // ${comment.body}`;
                        dataList.appendChild(listItem);
                    });
                })
                .catch(error => {
                    loadingIndicator.style.display = 'none';
                    const listItem = document.createElement('li');
                    listItem.textContent = "«⚠ Что-то пошло не так»";
                    dataList.appendChild(listItem);
                });
        }, 2000);
    });
});

const fetchButton = document.getElementById('fetchButton');
const reviewsText = document.getElementById('review');

// Добавляем обработчик события на кнопку
fetchButton.addEventListener('click', function () {
    // Инвертируем свойство display у элемента
    reviewsText.style.display = (reviewsText.style.display === 'none') ? 'block' : 'none';
});