export function createAdminPanelFooter(): string {
  return `
      <form class="adminPanel">
      <div class="adminPanel__left">
        <div class="form-group">
          <label for="nameProduct" class="visually-hidden">name product</label>
          <input 
            type="text" 
            id="nameProduct"
            class="adminPanel__left--nameProduct" 
            name="nameProduct"
            placeholder="name product"
            required
          >
        </div>
        <div class="form-group">
          <label for="img" class="visually-hidden">img url</label>
          <input 
            type="text" 
            id="img"
            class="adminPanel__left--img" 
            name="img"
            placeholder="img url"
            required
          >
        </div>
        <div class="form-group">
          <label for="price" class="visually-hidden">price</label>
          <input 
            type="number" 
            id="price"
            class="adminPanel__left--price" 
            name="price"
            min="0"
            placeholder="price"
            required
          >
        </div>
        <div class="form-group form-group--checkbox">
          <label for="inStock" class="adminPanel__left--stock">
            <input 
              type="checkbox"
              id="inStock"
              name="inStock"
            >
            in stock?
          </label>
        </div>
      </div>
      <div class="adminPanel__right">
        <button 
          type="submit" 
          class="adminPanel__right--submit"
        >
          submit
        </button>
      </div>
    </form>`
}