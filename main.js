const pancakeType = document.querySelector("#type");
const toppings = document.querySelectorAll(".topping");
const extras = document.querySelectorAll(".extra");
const totalPriceDisplay = document.querySelector("#totalPriceDisplay");
const totalPriceBanner = document.querySelector("#totalPrice");
const pancakeForm = document.querySelector("#pancakeForm");
const deliveryCost = document.querySelectorAll(".delivery");
const buttonSeeOrder = document.querySelector("#seeOrder");
const buttonOrderNow = document.querySelector("#orderButton");
const summaryText = document.querySelector("#orderSummary");
const customerName = document.querySelector("#customerName");
const changeHandler = () => {
  const basePrice = parseFloat(
    document.getElementById("type").selectedOptions[0].dataset.price
  );
  let selectedToppings = [];
  let selectedExtras = [];
  let selectedDelivery = [];
  let toppingsTotal = 0;
  toppings.forEach((topping) => {
    if (topping.checked) {
      selectedToppings.push(topping.dataset.name);
      toppingsTotal += parseFloat(topping.dataset.price);
    }
  });
  let extrasTotal = 0;
  extras.forEach((extra) => {
    if (extra.checked) {
      selectedExtras.push(extra.value);
      extrasTotal += parseFloat(extra.dataset.price);
    }
  });
  let deliveryTotal = 0;
  deliveryCost.forEach((delivery) => {
    if (delivery.checked) {
      selectedDelivery.push(delivery.value);
      deliveryTotal += parseFloat(delivery.dataset.price);
    }
  });
  const totalPrice = basePrice + toppingsTotal + extrasTotal + deliveryTotal;
  totalPriceDisplay.textContent = `$ {
        totalPrice
    }
    €`;
  totalPriceBanner.textContent = `$ {
        totalPrice
    }
    €`;
  return {
    basePrice,
    selectedToppings,
    selectedExtras,
    selectedDelivery,
    totalPrice,
  };
};

buttonSeeOrder.addEventListener("click", () => {
  const {
    basePrice,
    selectedToppings,
    selectedExtras,
    selectedDelivery,
    totalPrice,
  } = changeHandler();
  const toppingsText =
    selectedToppings.length > 0 ? selectedToppings.join(", ") : "None";
  const extrasText =
    selectedExtras.length > 0 ? selectedExtras.join(", ") : "None";
  const deliveryText =
    selectedDelivery.length > 0 ? selectedDelivery.join(", ") : "None";
  const customerOrderName = customerName.value.trim();
  summaryText.innerHTML = ` You chose $ {
        pancakeType.value
    }
    with the following options:<br><br> Toppings: $ {
        toppingsText
    }
    <br> Extras: $ {
        extrasText
    }
    <br> Delivery: $ {
        deliveryText
    }
    <br><br> Total price: $ {
        totalPrice
    }
    € `;
});
buttonOrderNow.addEventListener("click", () => {
  const {
    basePrice,
    selectedToppings,
    selectedExtras,
    selectedDelivery,
    totalPrice,
  } = changeHandler();
  const customerOrderName = customerName.value.trim();
  if (customerOrderName == "") {
    alert("Please input your name");
  } else {
    const newOrder = {
      id: Date.now(),
      customerName: customerOrderName,
      selectedPancake: pancakeType.value,
      toppings: selectedToppings,
      extras: selectedExtras,
      deliveryMethod: selectedDelivery,
      totalPrice: totalPrice,
      status: "waiting",
    };
    let orders = JSON.parse(localStorage.getItem("ordersNew")) || [];
    orders.push(newOrder);
    localStorage.setItem("ordersNew", JSON.stringify(orders));
    alert("Thank you for your order!");
    summaryText.textContent = "";
    pancakeForm.reset();
    totalPriceDisplay.textContent = "0 €";
    totalPriceBanner.textContent = "0 €";
  }
});
pancakeForm.addEventListener("change", changeHandler);
