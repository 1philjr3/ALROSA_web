function goBack() {
    window.history.back();
} // вернуть на страницу назад
function GetData() {
    var fname = document.getElementById("fname").value;
    var gender = getGender();
    var reg_email = document.getElementById("reg_email").value;
    var pno = document.getElementById("pno").value;
    var dob = document.getElementById("dob").value;
    var reg_login = document.getElementById("reg_login").value;
    var reg_password = document.getElementById("reg_password").value;
    var reg_repeat_password = document.getElementById("reg_repeat_password").value;

    var fname_patt = /^[A-Za-z\s]+$/;
    var pno_patt = /^\d+$/;
    var email_at = "@";
    var email_atsrh = reg_email.indexOf(email_at);

    // Остальной код для валидации и заполнения таблицы

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

}

function getGender() {
    var male = document.getElementById("Male").checked;
    var female = document.getElementById("Female").checked;

    if (male) {
        return "Мужской";
    } else if (female) {
        return "Женский";
    } else {
        document.getElementById("gender_alert").innerHTML = "Выберите пол";
        document.getElementById("gender_alert").style.color = "red";
        return ""; // или можно выбрать значение по умолчанию
    }
}


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


