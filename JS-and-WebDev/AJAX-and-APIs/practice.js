// fetch("https://official-joke-api.appspot.com/random_joke").then((data) => data.json()).then((data) => {
//     console.log(data)
//     document.getElementById("setup").innerHTML = data.setup
//     // document.getElementById()
// })

function processOrder(orderId) {
  return fetch(`/api/orders/${orderId}`)
    .then((response) => response.json())
    .then((order) => {
      return fetch(`/api/inventory/${order.productId}`);
    })
    .then((response) => response.json())
    .then((inventory) => {
      if (inventory.stock > 0) {
        return { success: true, message: "Order processed" };
      } else {
        return { success: false, message: "Out of stock" };
      }
    });
}

async function process(orderId) {
  try {
    const orderRes = await fetch(`/api/orders/${orderId}`);
    const order = await orderRes.json();

    const inventoryRes = await fetch(`/api/inventory/${order.productId}`);
    const inventory = await inventoryRes.json();

    if (inventory.stock > 0) {
      return { success: true, message: "Order processed" };
    } else {
      return { success: false, message: "Out of stock" };
    }
  } catch (error) {
    return { success: false, message: "Error processing order", error };
  }
}
