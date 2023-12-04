function goBack() {
    window.history.back();
}

// получение данных из формы и их валидации
function GetData() {
    // получили все поля
    const fname = document.getElementById("fname").value;
    const gender = getGender(); // Вызываем функцию getGender без аргументов
    const reg_email = document.getElementById("reg_email").value;
    const pno = document.getElementById("pno").value;
    const dob = document.getElementById("dob").value;
    const reg_login = document.getElementById("reg_login").value;
    const reg_password = document.getElementById("reg_password").value;
    const reg_repeat_password = document.getElementById("reg_repeat_password").value;

    // регулярки для валидации
    const fname_patt = /^[А-Яа-я\s]+$/;
    const pno_patt = /^\d{10}$/;
    const email_at = "@";
    const email_atsrh = reg_email.indexOf(email_at);

    // Проверка на ввод ФИО русскими буквами
    if (!fname_patt.test(fname)) {
        alert("Введите ФИО русскими буквами");
        return;
    }

    if (gender === "") {
        return;
    }

    // Проверка на наличие @ в почте
    if (email_atsrh === -1) {
        alert("Введите корректный адрес электронной почты через @");
        return;
    }

    // Проверка длины номера телефона
    if (!pno_patt.test(pno)) {
        alert("Введите корректный номер телефона (10 цифр)");
        return;
    }

    // Проверка возраста пользователя
    const dobValue = new Date(dob);
    const currentDate = new Date();
    const minAllowedDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());

    if (dobValue > minAllowedDate) {
        alert("Пользователь должен быть старше 10 лет");
        return;
    }

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

document.addEventListener('DOMContentLoaded', function () {
    const genderAlert = document.getElementById("gender_alert");
    genderAlert.style.visibility = "hidden"; // Начально скрыть сообщение об ошибке
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

function saveDataToLocalStorage(fname, gender, reg_email, pno, dob, reg_login, reg_password, reg_repeat_password) {
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

    localStorage.setItem('userData', JSON.stringify(userData));
}

function getGender() {
    var male = document.getElementById("Male").checked;
    var female = document.getElementById("Female").checked;
    var genderAlert = document.getElementById("gender_alert");

    if (male || female) {
        genderAlert.innerHTML = "";
        return male ? "Мужской" : "Женский";
    } else {
        alert("Выберите пол");
        return "";
    }
}

function loadUserDataFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');

    if (userDataString) {
        const userData = JSON.parse(userDataString);

        document.getElementById("fname").value;
        document.getElementById("gender").textContent = userData.gender;
        document.getElementById("reg_email").value = userData.reg_email;
        document.getElementById("pno").value = userData.pno;
        document.getElementById("dob").value = userData.dob;
        document.getElementById("reg_login").value = userData.reg_login;
        document.getElementById("reg_password").value = userData.reg_password;
        document.getElementById("reg_repeat_password").value = userData.reg_repeat_password;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    loadUserDataFromLocalStorage();
});
