let money = 500;

function updateMoney() {
  document.getElementById("money").textContent = money;
}

document.getElementById("checkPriceBtn").addEventListener("click", () => {
  const itemName = document.getElementById("itemInput").value.trim();

  if (!itemName) {
    document.getElementById("result").textContent =
      "Please enter an item name.";
    return;
  }

  fetch(`/priceCheck/${encodeURIComponent(itemName)}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.price !== null) {
        document.getElementById("result").textContent = `Price: $${data.price}`;
      } else {
        document.getElementById("result").textContent = "Item not found.";
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("result").textContent = "Error fetching price.";
    });
});

//priceCheck
document.getElementById("buyBtn").addEventListener("click", () => {
  const itemName = document.getElementById("buyInput").value.trim();

  if (!itemName) {
    document.getElementById("buyResult").textContent =
      "Please enter an item name.";
    return;
  }

  fetch(`/priceCheck/${encodeURIComponent(itemName)}`)
    .then((res) => res.json())
    .then((priceData) => {
      if (priceData.price === null) {
        document.getElementById("buyResult").textContent = "Item not found.";
        return;
      }

      if (money >= priceData.price) {
        fetch(`/buy/${encodeURIComponent(itemName)}`)
          .then((res) => res.json())
          .then((buyData) => {
            if (buyData.error) {
              document.getElementById("buyResult").textContent = buyData.error;
            } else {
              money -= buyData.price;
              updateMoney();
              document.getElementById("buyResult").textContent =
                `Congratulations, you've just bought ${buyData.name} for $${buyData.price}. There are ${buyData.inventory} left now in the store.`;
            }
          })
          .catch((err) => {
            console.error(err);
            document.getElementById("buyResult").textContent =
              "Error processing purchase.";
          });
      } else {
        document.getElementById("buyResult").textContent =
          "You don't have enough money. Get a job!";
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("buyResult").textContent =
        "Error fetching price.";
    });
});
