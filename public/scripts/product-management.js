const deleteProductButtonElements = document.querySelectorAll(
  ".product-item button"
);
// This will be linked to all products.ejs file
// In there, there will be delete buttons for every single product item.
// Therefor, we need to select all of those buttons by using querySelectorAll

async function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
  // We can access the data- attributes by using .dataset property.
  // Now we've chosen the actual delete button which was clicked.
  const csrfToken = buttonElement.dataset.csrf;

  // We need to send this request to the back-end now.
  const response = await fetch(
    "/admin/products/" + productId + "?_csrf=" + csrfToken,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }

  buttonElement.parentElement.parentElement.parentElement.parentElement.remove();
  // This will select the li element in all-products.ejs file.
}

for (const deleteProductButtonElement of deleteProductButtonElements) {
  deleteProductButtonElement.addEventListener("click", deleteProduct);
}
// the product-item.ejs is included inside a for loop in all-products.ejs file.
// therefor, in order to add event listeners to all delete buttons, we need to
// loop through all of those buttons like this.
