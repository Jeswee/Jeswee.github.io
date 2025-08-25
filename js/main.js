let animalCount = parseInt(localStorage.getItem('animalCount') || '0');
const totalAnimals = 10;

function updateCounter() {
    document.getElementById('count').textContent = animalCount;
    localStorage.setItem('animalCount', animalCount.toString());
    if (animalCount === totalAnimals) {
        alert('Congratulations! You`ve found all the animals! Check the home page for a special celebration!');
    }
}

function hideAnimal(animal) {
    animal.style.display = 'none';
    animalCount++;
    updateCounter();
}

document.querySelectorAll('.hidden-animal').forEach(animal => {
    animal.addEventListener('click', () => hideAnimal(animal));
});

updateCounter();