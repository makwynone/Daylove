const heartButton = document.getElementById('heartButton');
const pauseButton = document.getElementById('pauseButton');
const backgroundMusic = document.getElementById('backgroundMusic');
const heartSound = document.getElementById('heartSound');
const heartBackContent = document.querySelector('.heart-back .heart-content p');

let isMusicStarted = false;
let isFlipped = false;

// Массив всех фраз
const allPhrases = [
    "Ты особенный мой пирожочек!",
    "С 14 февраля, моя клубничка с сахаром!",
    "Ты самая вкусная чипсинка в пачке принглс!",
    "Люблю тебя больше, чем Шрек болото!",
    "Я рад, что мы вместе!",
    "Детка, я конечно не шкатулка, но ты меня заводишь АХАХАХАХАХ",
    "Спасибо, что ты есть!",
    "Ты самый дорогой мне человечек!",
    "Ты такая хорошенькая, милая, красивая, а еще у тебя голос прекрасный!",
    "Любовь — это ты!",
    "Я тебя люблю!",
    "Ты всё еще тыкаешь?) хех",
    "Напоминание сходить покушать..",
    "Чмок-чмок-чмок!",
    "Ты самый лучший подарочек!",
    "Ты моё любимое уведомление!",
    "Не стесняйся светиться, ведь ты солнышко!",
    "Ты самая прекрасная девушка, которую я встречал!"
];

// Копия массива для работы
let availablePhrases = [...allPhrases];

// Функция для выбора случайной фразы
function getRandomPhrase() {
    if (availablePhrases.length === 0) {
        // Если все фразы показаны, восстанавливаем массив
        availablePhrases = [...allPhrases];
    }

    // Выбираем случайный индекс
    const randomIndex = Math.floor(Math.random() * availablePhrases.length);
    const phrase = availablePhrases[randomIndex];

    // Удаляем фразу из массива, чтобы она не повторялась
    availablePhrases.splice(randomIndex, 1);

    return phrase;
}

// Функция для создания маленьких сердечек
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤️'; // Сердечко

    // Случайные координаты для появления
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    // Добавляем сердечко на страницу
    document.body.appendChild(heart);

    // Удаляем сердечко через 4 секунды
    setTimeout(() => {
        heart.remove();
    }, 4000);
}

// Функция для запуска музыки (только при первом нажатии)
function startMusic() {
    if (!isMusicStarted) {
        backgroundMusic.play()
            .then(() => {
                isMusicStarted = true;
                pauseButton.textContent = '⏸️';
                showMessage("Музыка включена! ❤️");
            })
            .catch((error) => {
                console.error("Ошибка воспроизведения музыки:", error);
                alert("Нажмите на сердечко ещё раз, чтобы запустить музыку.");
            });
    }
}

// Обработчик для сердечка
heartButton.addEventListener('click', () => {
    if (!isMusicStarted) {
        startMusic(); // Запускаем музыку только при первом нажатии
    }
    heartSound.play(); // Воспроизводим звук сердечка при каждом нажатии

    // Переворачиваем сердечко
    if (isFlipped) {
        heartButton.classList.remove('flipped');
    } else {
        heartButton.classList.add('flipped');
        // Обновляем текст на обратной стороне
        heartBackContent.textContent = getRandomPhrase();
    }
    isFlipped = !isFlipped;

    // Создаем 10 маленьких сердечек
    for (let i = 0; i < 10; i++) {
        createFloatingHeart();
    }
});

// Обработчик для кнопки паузы
pauseButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        pauseButton.textContent = '⏸️';
    } else {
        backgroundMusic.pause();
        pauseButton.textContent = '▶️';
    }
});

// Функция для показа сообщения
function showMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.style.position = 'fixed';
    messageElement.style.bottom = '20px';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translateX(-50%)';
    messageElement.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    messageElement.style.color = '#fff';
    messageElement.style.padding = '10px 20px';
    messageElement.style.borderRadius = '10px';
    messageElement.style.zIndex = '1000';
    messageElement.textContent = message;

    document.body.appendChild(messageElement);

    setTimeout(() => messageElement.remove(), 3000);
}
