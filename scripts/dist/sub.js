"use strict";
function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {
        nameProduct: formData.get('nameProduct'),
        img: formData.get('img'),
        price: formData.get('price'),
        inStock: formData.has('inStock')
    };
    console.log('Product data:', data);
}
window.handleSubmit = handleSubmit;
