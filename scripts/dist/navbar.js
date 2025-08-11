export function createNavBar() {
    return `
    <div class="navBar">
      <div class="navBar__left">
        <a class="navBar__left--logo navbar-brand" href="./index.html"></a>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active navBar__left--home">
              <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
            </li>

            <li class="nav-item navBar__left--about">
              <a class="nav-link" href="#">About</a>
            </li>

            <li class="nav-item dropdown navBar__left--languages">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Languages
              </a> 

              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">
                  <span class="fi fi-us"></span>
                  English
                </a>
                <a class="dropdown-item" href="#">
                  <span class="fi fi-il"></span>
                  Hebrew 
                </a>
              </div>
            </li>

          </ul>
        </div>
      </div>

      <div class="navBar__right">
        <button class="navBar__right--cart">
          <i class="fas fa-cart-shopping"></i> 
        </button>
      </div>
    </div>`;
}
