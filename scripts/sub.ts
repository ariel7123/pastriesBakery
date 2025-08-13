function handleSubmit(event: Event) {
  event.preventDefault();
  
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);
  
  const data = {
    nameProduct: formData.get('nameProduct') as string,
    img: formData.get('img') as string,
    price: formData.get('price') as string,
    inStock: formData.has('inStock')
  };
  
  console.log('Product data:', data);
}

(window as any).handleSubmit = handleSubmit;
