export function createNavBar(): string {
  return `
<div class="nav-bar">
  <div class="nav-bar__start">
    <a class="nav-bar__logo navbar-brand" href="./index.html"></a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto nav-bar__menu">
        <li class="nav-item nav-bar__item nav-bar__item--active">
          <a class="nav-link nav-bar__link" href="#" aria-current="page">
            Home <span class="sr-only">(current)</span>
          </a>
        </li> 

        <li class="nav-item nav-bar__item">
          <a class="nav-link nav-bar__link" href="#">About</a>
        </li>

        <li class="nav-item dropdown nav-bar__item nav-bar__item--languages">
          <a class="nav-link dropdown-toggle nav-bar__link" href="#" id="navbarDropdown"
             role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Languages
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#"><span class="fi fi-us"></span> English</a>
            <a class="dropdown-item" href="#"><span class="fi fi-il"></span> Hebrew</a>
          </div>
        </li>
      </ul>
    </div>
  </div>

  <div class="nav-bar__right navBar__right">
    <button class="nav-bar__cart-btn navBar__right--cart" aria-label="Open cart" onclick="toggleCart()">
      <i class="fas fa-cart-shopping"></i>
    </button>
  </div>
</div>
`;
}