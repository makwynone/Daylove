const heartButton = document.getElementById('heartButton');
const heartsContainer = document.getElementById('heartsContainer');

heartButton.addEventListener('click', () => {
    for (let i = 0; i < 10; i++) {
        createHeart();
    }
});

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}