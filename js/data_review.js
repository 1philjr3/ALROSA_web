async function fetchComment(randomLimit) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_start=1&_limit=${randomLimit}`);
    const data = await response.json();
    return data;
}

// добавили слушатель событий load к объекту window (добавления слушателей событий, таких как клики, нажатия клавиш и другие)
window.addEventListener("load", function() {
    const fetchButton = document.getElementById('fetchButton');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const dataList = document.getElementById('dataList');

    fetchButton.addEventListener('click', () => {
        // если в списке уже есть элементы, удалить их
        if (dataList.children.length !== 0) {
            while (dataList.firstChild) {
                dataList.removeChild(dataList.lastChild);
            }
        }

        // поехали показывать инидикатор загрузки
        loadingIndicator.style.display = 'flex';

        // let randomLimit = getRandomInt(5, 10);

        // задержка на выполнение кода на 2 секунды
        setTimeout(() => {
            // выполнение запроса на получение комментариев (в данном случае, 5 комментариев)
            fetchComment(5)
                .then(json => {
                    // скрыли индикатор загрузки
                    loadingIndicator.style.display = 'none';
                    // получили данные о добавили в список элементы
                    json.forEach(comment => {
                        const listItem = document.createElement('li');
                        listItem.textContent = `${comment.name} // ${comment.email} // ${comment.body}`;
                        dataList.appendChild(listItem);
                    });
                })
                .catch(error => {
                    // скрыли индикатор загрузки вывели ошибку
                    loadingIndicator.style.display = 'none';
                    const listItem = document.createElement('li');
                    listItem.textContent = "«⚠ Что-то пошло не так»";
                    dataList.appendChild(listItem);
                });
        }, 2000);
    });
});

// сссылки на кнопку и блок текста отзывов
const fetchButton = document.getElementById('fetchButton');
const reviewsText = document.getElementById('review');

// Добавляем обработчик события на кнопку для кликов
fetchButton.addEventListener('click', function () {
    // Инвертируем свойство display у элемента
    reviewsText.style.display = (reviewsText.style.display === 'none') ? 'block' : 'none';
});