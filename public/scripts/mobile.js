const mobileMenuBtnElement = document.getElementById("mobile-menu-btn");
const mobileMenuElement = document.getElementById("mobile-menu");

function toggleMobileMenu() {
  mobileMenuElement.classList.toggle("open");
  // When the mobileMenuBtnElement is clicked, this "open" class is either added or removed from
  // mobileMenuElement.
}

mobileMenuBtnElement.addEventListener("click", toggleMobileMenu);
