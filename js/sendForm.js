const server = 'https://jsonplaceholder.typicode.com/posts';

const sendData = (data, callBack, falseCallBack) => {
    const request = new XMLHttpRequest();
    request.open('POST', server);

    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        if (request.status === 200 || request.status === 201) {
            const response = JSON.parse(request.responseText);
            callBack(response.id);//возвращает данные в JSON формате
        } else {
            falseCallBack(request.status)
            throw new Error(request.status)
        }
    });

    request.send(data)
};

const formElems = document.querySelectorAll('.form');

const formHandler = (form) => {
    const smallElem = document.createElement('small'); // создаем пустой элемент чтобы вывести его вместо алерта
    form.append(smallElem);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {};
        let flag = true;

        const buttonSubmit = form.querySelector('.button[type="submit"]');

        for (const elem of form.elements) { //  перебираем элементы формы, получаем каждый элемент, используем деструктуризацию
            const { name, value } = elem;
            if (name) {
                if (value.trim()) {
                    elem.style.border = '';
                    data[name] = value; // создаем в объекте data св-во соответствующее св-ву name

                } else {
                    elem.style.border = '1px solid red';
                    flag = false;
                    elem.value = '';
                }

            }
        }

        if (!flag) {
            return smallElem.textContent = 'Заполните все поля!';
        }

        sendData(JSON.stringify(data),
            (id) => {
                smallElem.innerHTML = 'Ваша заявка ' + id + '! <br>В ближайшее время мы с вами свяжемся!';
                smallElem.style.color = 'green';
                buttonSubmit.disabled = true;

                setTimeout(() => {
                    smallElem.textContent = '';
                    buttonSubmit.disabled = false;
                }, 5000)
            },// первая коллбэк функция
            (err) => {
                smallElem.innerHTML = 'К сожалению, технические неполадки, попробуйте отправить данные позже :(';
                smallElem.style.color = 'red';
            });// 2-я коллбэк функция, запускается в сл-е неудачной отправки данных, переводим данные из объекта в формат JSON и отправляем их на сервер

        form.reset(); // очищает все поля формы
    });
};

formElems.forEach(formHandler);



/* const dataTest = {
    name: "Natasha",
    phone: "+79114353633"
}

sendData(JSON.stringify(dataTest), (id) => {
    alert('Ваша заявка ' + id + '! \nВ ближайшее время мы с вами свяжемся!')
    console.log(id);
},// первая коллбэк функция
    (err) => {
        alert('К сожалению, технические неполадки, попробуйте отправить данные позже:(')
    });// 2-я коллбэк функция, запускается в сл-е неудачной отправки данных, переводим данные из объекта в формат JSON и отправляем их на сервер*/