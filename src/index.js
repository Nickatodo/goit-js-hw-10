import { fetchBreeds,fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const catInfo = document.querySelector(".cat-info");

async function getCats() { 
    try {
        let cats = await fetchBreeds();
        const options = cats.map(cat => ({ text: cat.name, value: cat.id }));
        new SlimSelect({
            select: '.breed-select',
            data: options
        });
    } catch (error) {
        showError();
        console.log(error);
    } finally {
        hideLoader();
    }
}
getCats();

async function showCatInfo(breedId) {
    try {
        const data = await fetchCatByBreed(breedId);
        const cat = data[0].breeds[0];
        catInfo.innerHTML = `
            <img src="${data[0].url}" alt="${cat.name}" style="max-width: 300px;">
            <div>
            <h2>${cat.name}</h2>
            <p><strong>Description:</strong> ${cat.description}</p>
            <p><strong>Temperament:</strong> ${cat.temperament}</p>
            </div>  
        `;
        catInfo.style.display = "flex";
    } catch (error) {
        showError();
    } finally {
        hideLoader();
  }
}

function showLoader() {
    loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}

function showError() {
    Notiflix.Notify.failure("Oops! Something went wrong! Try reloading the page!");
}

breedSelect.addEventListener("change", async function () {
    const breedId = this.value;
    showLoader();
    catInfo.style.display = "none";
    await showCatInfo(breedId);
});
