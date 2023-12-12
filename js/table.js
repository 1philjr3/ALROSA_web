function goBack() {
    window.history.back();
}

// получение данных из формы и их валидации
function GetData() {
    // получили все поля
    const fname = document.getElementById("fname").value;
    const gender = getGender();
    const reg_email = document.getElementById("reg_email").value;
    const pno = document.getElementById("pno").value;
    const dob = document.getElementById("dob").value;
    const reg_login = document.getElementById("reg_login").value;
    const reg_password = document.getElementById("reg_password").value;
    const reg_repeat_password = document.getElementById("reg_repeat_password").value;

    // для заполнения таблицы
    var table = document.getElementsByTagName('table')[0];
    var newRow = table.insertRow(table.rows.length);

    var cel1 = newRow.insertCell(0);
    var cel2 = newRow.insertCell(1);
    var cel3 = newRow.insertCell(2);
    var cel4 = newRow.insertCell(3);
    var cel5 = newRow.insertCell(4);
    var cel6 = newRow.insertCell(5);
    var cel7 = newRow.insertCell(6);
    var cel8 = newRow.insertCell(7);

    cel1.innerHTML = fname;
    cel2.innerHTML = gender;
    cel3.innerHTML = reg_email;
    cel4.innerHTML = pno;
    cel5.innerHTML = dob;
    cel6.innerHTML = reg_login;
    cel7.innerHTML = reg_password;
    cel8.innerHTML = reg_repeat_password;

    // сохраняем данные в localStorage
    saveDataToLocalStorage(fname, gender, reg_email, pno, dob, reg_login, reg_password, reg_repeat_password);
}

function getGender() {
    const maleChecked = document.getElementById("Male").checked;
    const femaleChecked = document.getElementById("Female").checked;

    if (maleChecked) {
        return "Male";
    } else if (femaleChecked) {
        return "Female";
    } else {
        handleGenderSelection();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const genderAlert = document.getElementById("gender_alert");
    const form = document.getElementById('registrationForm');

    // Добавляем обработчик события на ввод в поля формы
    // Добавляем обработчик события на потерю фокуса (blur) на полях формы
    form.addEventListener('blur', function (event) {
        const input = event.target;
        validateInput(input);
    }, true);

    function validateInput(input) {
        const errorElement = input.nextElementSibling; // Получаем элемент, в котором будем выводить сообщение об ошибке

        if (input.checkValidity()) {
            input.classList.remove('error'); // Удаляем класс ошибки
            errorElement.textContent = ''; // Очищаем сообщение об ошибке
        } else {
            input.classList.add('error'); // Добавляем класс ошибки
            errorElement.textContent = input.validationMessage; // Выводим стандартное сообщение об ошибке
        }
    }

    function handleGenderSelection() {
        // Проверка, выбран ли хотя бы один из полов
        const maleChecked = document.getElementById("Male").checked;
        const femaleChecked = document.getElementById("Female").checked;
        const genderAlert = document.getElementById("gender_alert");

        if (!maleChecked && !femaleChecked) {
            genderAlert.textContent = "Выберите пол";
            document.getElementById("gender").classList.add('error'); // Добавляем класс ошибки
        } else {
            genderAlert.textContent = ""; // Очищаем сообщение об ошибке
            document.getElementById("gender").classList.remove('error'); // Удаляем класс ошибки
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Отменяем стандартное поведение формы
        if (validateForm()) {
            GetData(); // Вызываем функцию для получения данных и их валидации
        }
    });

    function validateForm() {
        handleGenderSelection(); // Вызываем функцию для проверки выбора пола

        const inputs = form.querySelectorAll('input');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
            }
        });

        if (!validatePasswordMatch()) {
            isValid = false;
        }

        if (!isValid) {
            alert("Заполните все поля");
        }

        return isValid;
    }

    loadUserDataFromLocalStorage();
});

function togglePasswordVisibility(inputId) {
    var passwordInput = document.getElementById(inputId);
    var eyeIcon = document.querySelector(".smiley-icon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.add("active");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("active");
    }
}

function validatePasswordMatch() {
    const password = document.getElementById("reg_password").value;
    const repeatPassword = document.getElementById("reg_repeat_password").value;
    const repeatPasswordAlert = document.getElementById("reg_repeat_password_alert");

    if (password !== repeatPassword) {
        repeatPasswordAlert.textContent = "Пароли не совпадают";
        repeatPasswordAlert.style.color = "red";
        return false;
    }

    repeatPasswordAlert.textContent = ""; // Очищаем сообщение об ошибке
    return true;
}

function saveDataToLocalStorage(fname, gender, reg_email, pno, dob, reg_login, reg_password, reg_repeat_password) {
    const userName = reg_login; // Используем логин пользователя в качестве ключа

    // Получаем текущие данные из localStorage, если они там есть
    const storedDataString = localStorage.getItem(userName);
    const storedData = storedDataString ? JSON.parse(storedDataString) : [];

    // Создаем объект для новых данных
    const userData = {
        fname,
        gender,
        reg_email,
        pno,
        dob,
        reg_login,
        reg_password,
        reg_repeat_password
    };

    // Добавляем новые данные в массив
    storedData.push(userData);

    // Сохраняем массив в localStorage
    localStorage.setItem(userName, JSON.stringify(storedData));
}

function loadUserDataFromLocalStorage(userName) {
    const userDataString = localStorage.getItem(userName);

    if (userDataString) {
        const allUserData = JSON.parse(userDataString);

        // Очищаем предыдущие данные на странице
        const tableBody = document.getElementById('userTableBody');
        tableBody.innerHTML = '';

        // Проходим по всем пользователям и добавляем их данные на страницу
        allUserData.forEach((userData, index) => {
            const newRow = tableBody.insertRow(tableBody.rows.length);

            const cells = Object.values(userData);
            cells.forEach((cell, cellIndex) => {
                const newCell = newRow.insertCell(cellIndex);
                newCell.textContent = cell;
            });
        });
    }
}


