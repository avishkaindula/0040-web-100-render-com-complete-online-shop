const cartItemUpdateFormElement = document.querySelectorAll(
  ".cart-item-management"
);

async function updateCartItem(event) {
  event.preventDefault();

  const form = event.target;

  const productId = form.dataset.productid;
  const csrfToken = form.dataset.csrf;
  const quantity = form.firstElementChild.value;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        // productId and quantity are the keys we set on the cart-controller.js file.
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // This is the patch route we created on cart.routes.js file.
  } catch (error) {
    alert("Something went wrong!");
    return;
  }

  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }

  const responseData = await response.json();
}

for (const formElement of cartItemUpdateFormElements) {
  formElement.addEventListener("submit", updateCartItem);
}
