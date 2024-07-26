document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('input[type=checkbox]');

    
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                const checkboxesInGroup = document.querySelectorAll(`input[type=checkbox][name=${checkbox.name}]`);
                checkboxesInGroup.forEach(cb => {
                    if (cb !== checkbox) {
                        cb.checked = false;
                    }
                });
            }
        });
    });
});

document.getElementById('showMoreButton').addEventListener('click', function() {
    var sneakers = document.querySelectorAll('.sneakers2');
    var button = document.getElementById('showMoreButton');

    sneakers.forEach(function(sneaker) {
        sneaker.classList.add('show');
    });

    button.classList.add('fade-out');

    button.addEventListener('transitionend', function() {
        button.style.display = 'none';
    }, { once: true });
});


function applyFilters() {
    const minPrice = document.getElementById('input0').value;
    const maxPrice = document.getElementById('input1').value;
    const isMaleChecked = document.getElementById('checkbox-1').checked;
    const isFemaleChecked = document.getElementById('checkbox-2').checked;
    const selectedSize = document.querySelector('.num-of-size.selected')?.dataset.size;
    
    const sneakers = document.querySelectorAll('.sneaker');

    sneakers.forEach(sneaker => {
        const price = parseInt(sneaker.dataset.price, 10);
        const gender = sneaker.dataset.gender;
        const size = sneaker.dataset.size;
        
        let isVisible = true;

        if (minPrice && price < minPrice) {
            isVisible = false;
        }

        if (maxPrice && price > maxPrice) {
            isVisible = false;
        }

        if (!isMaleChecked && gender === 'male') {
            isVisible = false;
        }

        if (!isFemaleChecked && gender === 'female') {
            isVisible = false;
        }

        if (selectedSize && selectedSize !== size) {
            isVisible = false;
        }

        if (isVisible) {
            sneaker.style.display = 'block';
        } else {
            sneaker.style.display = 'none';
        }
    });
}

document.querySelectorAll('.num-of-size').forEach(sizeElem => {
    sizeElem.addEventListener('click', () => {
        document.querySelectorAll('.num-of-size').forEach(el => el.classList.remove('selected'));
        sizeElem.classList.add('selected');
        applyFilters();
    });
});

function resetFilters() {
    document.getElementById('input0').value = '';
    document.getElementById('input1').value = '';
    document.getElementById('checkbox-1').checked = true;
    document.getElementById('checkbox-2').checked = false;
    document.querySelectorAll('.num-of-size').forEach(sizeElem => {
        sizeElem.classList.remove('selected');
    });
    applyFilters();
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("next1").addEventListener("click", function() {
        document.getElementById("quiz1").style.display = "none";
        document.getElementById("quiz2").style.display = "flex";
    });

    document.getElementById("next2").addEventListener("click", function() {
        document.getElementById("quiz2").style.display = "none";
        document.getElementById("quiz3").style.display = "flex";
    });

    document.getElementById("next3").addEventListener("click", function() {
        document.getElementById("quiz3").style.display = "none";
        document.getElementById("quiz4").style.display = "flex";
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const getOfferButton = document.getElementById("getOfferButton");
    const tenderScreen = document.getElementById("tenderScreen");

    getOfferButton.addEventListener("click", function() {
        tenderScreen.classList.add("show");
    });
});

