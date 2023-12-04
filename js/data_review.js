// Функция для генерации случайного целого числа в заданном диапазоне
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// внутри функции будет выполняться асинхрон
async function fetchComment(randomLimit) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_start=1&_limit=${randomLimit}`);
    const data = await response.json();
    return data;
    // await возвращает response тип данных (сразу получаем response и сразу можем взять из него json)
    // fetch возвращает promise (доступ делаем через .then)
}

// добавили слушатель событий load к объекту window (добавления слушателей событий, таких как клики, нажатия клавиш и другие)
window.addEventListener("load", function () {
    const fetchButton = document.getElementById('fetchButton');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const commentTable = document.getElementById('commentTable');

    // Скрываем таблицу при загрузке страницы
    commentTable.style.display = 'none';

    fetchButton.addEventListener('click', async () => {
        // Если в таблице уже есть элементы, удалить их
        while (commentTable.rows.length > 1) {
            commentTable.deleteRow(1);
        }

        // Показываем индикатор загрузки
        loadingIndicator.style.display = 'flex';

        let randomLimit = getRandomInt(5, 10);

        // Задержка на выполнение кода на 2 секунды
        setTimeout(async () => {
            try {
                // Выполнение запроса на получение комментариев с случайным лимитом
                const json = await fetchComment(randomLimit);

                // Скрыли индикатор загрузки
                loadingIndicator.style.display = 'none';

                // Показываем таблицу
                commentTable.style.display = 'table';

                // Получили данные и добавили их в таблицу
                json.forEach(comment => {
                    const tableRow = commentTable.insertRow();
                    const nameColumn = tableRow.insertCell(0);
                    const emailColumn = tableRow.insertCell(1);
                    const bodyColumn = tableRow.insertCell(2);

                    nameColumn.textContent = comment.name;
                    emailColumn.textContent = comment.email;
                    bodyColumn.textContent = comment.body;
                });

            } catch (error) {
                // Скрыли индикатор загрузки и вывели ошибку
                loadingIndicator.style.display = 'none';
                const listItem = commentTable.insertRow();
                const cell = listItem.insertCell(0);
                cell.colSpan = 3;
                cell.textContent = "⚠ Что-то пошло не так";
            }
        }, 2000);
    });
});