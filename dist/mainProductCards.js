export function createMain() {
    return `
<main class="main">
  <section class="main__header">
    <h2 class="main__title">Our selected pastries!</h2>
  </section>

  <section class="product-list main__productsCont" id="products"></section>

  <section class="copyright-section">
    <span class="copyright-section__text">
      © 2025
      <a class="copyright-section__link"
         href="https://www.boutiquenic.com/" target="_blank" rel="noopener noreferrer">
        boutiquenic.com
      </a> 🍰 All images are reserved
    </span>
  </section>  
</main>`;
}
