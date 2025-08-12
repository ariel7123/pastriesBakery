function handleSubmit(event) {
    event.preventDefault();
    var form = event.target;
    var formData = new FormData(form);
    var data = {
        nameProduct: formData.get('nameProduct'),
        img: formData.get('img'),
        price: formData.get('price'),
        inStock: formData.has('inStock')
    };
    console.log('Product data:', data);
}
window.handleSubmit = handleSubmit;
+;
