export function createAdminPanelFooter(): string {
  return `
<form class="admin-panel adminPanel admin-panel--fixed" onsubmit="handleSubmit?.(event)">
  <div class="admin-panel__left adminPanel__left">
    <div class="admin-panel__group form-group" data-field="nameProduct">
      <label for="nameProduct" class="admin-panel__label visually-hidden">name product</label>
      <input 
        type="text" 
        id="nameProduct"
        class="admin-panel__input adminPanel__left--nameProduct" 
        name="nameProduct"
        placeholder="name product"
        required
      >
    </div>

    <div class="admin-panel__group form-group" data-field="img">
      <label for="img" class="admin-panel__label visually-hidden">img url</label>
      <input 
        type="text" 
        id="img"
        class="admin-panel__input adminPanel__left--img" 
        name="img"
        placeholder="img url"
        required
      >
    </div>

    <div class="admin-panel__group form-group" data-field="price">
      <label for="price" class="admin-panel__label visually-hidden">price</label>
      <input 
        type="number" 
        id="price"
        class="admin-panel__input adminPanel__left--price" 
        name="price"
        min="0"
        placeholder="price"
        required
      >
    </div>

    <div class="admin-panel__group admin-panel__group--checkbox form-group form-group--checkbox" data-field="inStock">
      <label for="inStock" class="admin-panel__checkbox-label adminPanel__left--stock">
        <input type="checkbox" id="inStock" name="inStock">
        in stock?
      </label>
    </div>
  </div>

  <div class="admin-panel__right adminPanel__right">
    <button 
      type="submit" 
      class="admin-panel__submit adminPanel__right--submit" 
      data-state="idle"
      aria-busy="false"
    >
      submit
    </button>
  </div>
</form>`;
}

export function handleSubmit(event: Event) {
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