const slides = document.querySelectorAll('.slide');
    let currentSlideIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
    }

    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        showSlide(currentSlideIndex);
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    }

    // Show the initial slide
    showSlide(currentSlideIndex);


/*end*/
var config = {
  cUrl: 'https://api.countrystatecity.in/v1/countries',
  ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
}


var countrySelect = document.querySelector('.country'),
  stateSelect = document.querySelector('.state'),
  citySelect = document.querySelector('.city')


function loadCountries() {

  let apiEndPoint = config.cUrl

  fetch(apiEndPoint, {headers: {"X-CSCAPI-KEY": config.ckey}})
  .then(Response => Response.json())
  .then(data => {
      // console.log(data);

      data.forEach(country => {
          const option = document.createElement('option')
          option.value = country.iso2
          option.textContent = country.name 
          countrySelect.appendChild(option)
      })
  })
  .catch(error => console.error('Error loading countries:', error))

  stateSelect.disabled = true
  citySelect.disabled = true
  stateSelect.style.pointerEvents = 'none'
  citySelect.style.pointerEvents = 'none'
}


function loadStates() {
  stateSelect.disabled = false
  citySelect.disabled = true
  stateSelect.style.pointerEvents = 'auto'
  citySelect.style.pointerEvents = 'none'

  const selectedCountryCode = countrySelect.value
  // console.log(selectedCountryCode);
  stateSelect.innerHTML = '<option value="">Select State</option>' // for clearing the existing states
  citySelect.innerHTML = '<option value="">Select City</option>' // Clear existing city options

  fetch(`${config.cUrl}/${selectedCountryCode}/states`, {headers: {"X-CSCAPI-KEY": config.ckey}})
  .then(response => response.json())
  .then(data => {
      // console.log(data);

      data.forEach(state => {
          const option = document.createElement('option')
          option.value = state.iso2
          option.textContent = state.name 
          stateSelect.appendChild(option)
      })
  })
  .catch(error => console.error('Error loading countries:', error))
}


function loadCities() {
  citySelect.disabled = false
  citySelect.style.pointerEvents = 'auto'

  const selectedCountryCode = countrySelect.value
  const selectedStateCode = stateSelect.value

  citySelect.innerHTML = '<option value="">Select City</option>' // Clear existing city options

  fetch(`${config.cUrl}/${selectedCountryCode}/states/${selectedStateCode}/cities`, { headers: { "X-CSCAPI-KEY": config.ckey } })
      .then(response => response.json())
      .then(data => {
          if (data.length === 0) {
              // No cities available for the selected state
              // Provide a default city option or leave it empty based on your preference
              const defaultOption = document.createElement('option')
              defaultOption.value = 'default-city'
              defaultOption.textContent = 'No cities available'
              citySelect.appendChild(defaultOption)
          } else {
              data.forEach(city => {
                  const option = document.createElement('option')
                  option.value = city.iso2
                  option.textContent = city.name
                  citySelect.appendChild(option)
              })
          }
      })
      .catch(error => console.error('Error loading cities:', error))
}

// Add this to your existing JavaScript or create a new JavaScript file
function showModal(modalId, event) {
  event.preventDefault(); // Prevents the default behavior of the anchor link
  var modal = document.getElementById(modalId);
  modal.style.display = "block";
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}

// Close modal if clicked outside the content
window.onclick = function(event) {
  var modals = document.getElementsByClassName('modal');
  for (var i = 0; i < modals.length; i++) {
      if (event.target == modals[i]) {
          modals[i].style.display = "none";
      }
  }
};



window.onload = loadCountries


function toggleNav() {
  var navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('show');
}
// Add this function to your existing script
function toggleDropdown() {
  var dropdown = document.getElementById("myDropdown");
  dropdown.classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
}

/* video */
const learnMoreButton = document.getElementById('learn-more-button');
const videoSection = document.querySelector('.video-section');
const videoFrame = document.getElementById('video-frame');

// comment ko muna baka kailanganin sa susunod
/*learnMoreButton.addEventListener('click', function() {
    if (videoSection.style.display === 'none' || videoSection.style.display === '') {
        videoSection.style.display = 'block';
        videoFrame.src = 'link ng youtube';
    } else {
        videoSection.style.display = 'none';
        videoFrame.src = '';
    }
});

/*end*/
  document.addEventListener("DOMContentLoaded", function () {
  const cart = {};  
  const cartItemsList = document.getElementById("cart-items");
  const totalCostElement = document.getElementById("total-cost"); 
  let totalCost = 0;

  const products = document.querySelectorAll(".product");

  //nakadepende sa product id yung 1,2,3,4,5,6
  const stock = {
    "1": 30, 
    "2": 50,
    "3": 45,
    "4": 60,
    "5": 75,
    "6": 70,
    "7": 20,
    "8": 20,
    "9": 20,
    "10": 20,
    "11": 20,
    "12": 20,
    "13": 20,
    "14": 20,
    "15": 20,
    "16": 20,
    "17": 20,
    "18": 20,
    "19": 20,
    "20": 20,
    "21": 20,
    "22": 20,
    "23": 20,
    "24": 20

  };
  
  const viewModeButton = document.getElementById('view-mode-button');
    if (viewModeButton) {
        viewModeButton.addEventListener('click', function () {
            window.location.href = '/view-mode' ;
        });
    }
    const viewMode = window.location.pathname.includes('/view-mode');
    const accessoriesLink = document.getElementById('accessories-link');
    const cameraLink = document.getElementById('camera-link');
    const lensLink = document.getElementById('lens-link');
    const profileLink = document.getElementById('profile-link');
    
    if (viewMode) {
        // disbale yung mga href pero di na ata need to diko lang tinatanggal baka may magalaw e
        accessoriesLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default action
        });
    
        cameraLink.addEventListener('click', function (event) {
            event.preventDefault();
        });
    
        lensLink.addEventListener('click', function (event) {
            event.preventDefault();
        });

        profileLink.addEventListener('click', function (event){
          event.preventDefault();
          alert("You need to login first!")
        })
    }
  if (window.location.pathname.includes('/view-mode')) {
    const logoutLink = document.getElementById('login-link');
    if (logoutLink) {
        logoutLink.textContent = 'Log In';
    }

    // para di makapag add-to-cart kapag nasa view mode
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach((button) => {
            button.addEventListener('click', function (event) {
                event.preventDefault(); 
                alert('You need to log in first.');
            });
        });
        const quantityInputs = document.querySelectorAll('.product input[type="number"]');
        quantityInputs.forEach((input) => {
            input.disabled = true;
        });
    

      if (window.location.pathname.includes('/view-mode')) {
        const logoutLink = document.getElementById('login-link');
        if (logoutLink) {
            logoutLink.textContent = 'Log In';
        }
    }
  }
  
  const checkoutButton = document.getElementById("checkout-button");
  const orderTable = document.getElementById("order-table");
  const cartMessage = document.getElementById("cart-message"); 
  function updateCheckoutButtonVisibility() {
    if (Object.keys(cart).length === 0) {
      const checkoutButton = document.getElementById("checkout-button");
        // kapag walang laman yung cart ito yung iddisplay
        checkoutButton.style.display = "none";
        cartMessage.textContent = "Your cart is currently empty.";
    } else {
        // papakita yung checkout button kapag hindi empty yung cart
        checkoutButton.style.display = "block";
        cartMessage.textContent = "";
    }
}

// update lang kapag nag load yung page
updateCheckoutButtonVisibility();


  checkoutButton.addEventListener("click", function () {
    
      // para to sa your order sa checkout-section
      orderTable.innerHTML = "";

      // header row
      const headerRow = document.createElement("tr");
      const headerImageCell = document.createElement("th");
      const headerNameCell = document.createElement("th");
      const headerQuantityCell = document.createElement("th");
      const headerPriceCell = document.createElement("th");

      headerImageCell.textContent = "";
      headerNameCell.textContent = "Product";
      headerQuantityCell.textContent = "Quantity";
      headerPriceCell.textContent = "Price";

      headerRow.appendChild(headerImageCell);
      headerRow.appendChild(headerNameCell);
      headerRow.appendChild(headerQuantityCell);
      headerRow.appendChild(headerPriceCell);

      orderTable.appendChild(headerRow);

      // para mag add yung product sa table
      for (const productId in cart) {
          const product = cart[productId];

          // table row to kada product
          const orderItem = document.createElement("tr");

          // para sa image
          const imageCell = document.createElement("td");
          const productImage = document.createElement("img");
          productImage.src = product.imageSrc;
          productImage.alt = product.name;
          productImage.style.width = "50px"; 
          productImage.style.height = "50px";
          imageCell.appendChild(productImage);

          // product name
          const nameCell = document.createElement("td");
          nameCell.textContent = product.name;

          // quantity
          const quantityCell = document.createElement("td");
          quantityCell.textContent = product.quantity;

          //  price
          const priceCell = document.createElement("td");
          priceCell.textContent = `₱${(product.price * product.quantity * 1000).toLocaleString()}`;

          // append kung paano pagkakasunod
          orderItem.appendChild(imageCell);
          orderItem.appendChild(nameCell);
          orderItem.appendChild(quantityCell);
          orderItem.appendChild(priceCell);

          // append yung table row sa table
          orderTable.appendChild(orderItem);
      }

      // display ng total cost 
      const totalCostElement = document.getElementById("total-cost");
      totalCostElement.textContent = `Total Cost: ₱${(totalCost * 1000).toLocaleString()}`;
      updateCheckoutButtonVisibility();
     cart = {};
    updateCartSection(cart);
    updateProductStock();  // If needed
    updateCheckoutButtonVisibility();
  });

  
  const placeOrderButton = document.getElementById("placeOrderButton");

  placeOrderButton.addEventListener("click", function (event) {

    event.preventDefault(); // para di magrefresh

      const username = document.getElementById("username").value;
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const country = document.getElementById("country").value;
      const streetAddress = document.getElementById("streetAddress").value;
      const unit = document.getElementById("unit").value;
      const townCity = document.getElementById("townCity").value;
      const state = document.getElementById("state").value;
      const postcode = document.getElementById("postcode").value;
      const phoneNumber = document.getElementById("phoneNumber").value;
      const paymentMethod = document.getElementById("paymentMethod").value;
      
      if ((paymentMethod === "bdo" || paymentMethod === "bpi") && !validateCreditCardInput()) {
        return;
    } else if ((paymentMethod === "gcash" || paymentMethod === "maya") && !validateMobileNumberInput()) {
        return;
    } 
    
      // pang validate ng mga ininput
      if (validateInputs(username, firstName, lastName, country, streetAddress, unit, townCity, state, postcode, phoneNumber, paymentMethod)) {
          // kapag hindi 11 digit inenter
          if (phoneNumber.length !== 11) {
            alert("Please enter a valid 11-digit phone number.");
            return;
        }
        // kapag hindi valid inenter na email
        if (!isValidEmail(username)) {
          alert("Please enter a valid email address.");
          return;
      }
         
      // mag update yung stock sa pag place order
          updateStockAtCheckout(cart);
          
          // Close the checkout modal (you may need to adapt this based on your modal implementation)
          document.getElementById("checkout-section").style.display = "none";

          // pambura ng mga order sa cart
          clearCheckedItemsFromCart();
          document.getElementById("checkout-section").style.display = "none";
          document.getElementById("main-content").style.display = "block";
          // alert para sa order confirmation
                 // Alert for order confirmation
        alert("Thank you for your order! Your item will be delivered to you soon.");

      } else {
          // kapag may field na di nainput
          alert("Please fill in all required fields.");
      }
  });
  
  const paymentMethodSelect = document.getElementById("paymentMethod");
  const creditCardInput = document.getElementById("creditCardInput");
  const mobileNumberInput = document.getElementById("mobileNumberInput");
  
  paymentMethodSelect.addEventListener("change", function () {
      const selectedPaymentMethod = paymentMethodSelect.value;
  
      // para di agad kita yung input field sa cc at mobile number sa payment
      creditCardInput.style.display = "none";
      mobileNumberInput.style.display = "none";
  
      // para makita yung mga input kung ano pinili na mode of payment
      if (selectedPaymentMethod === "bdo" || selectedPaymentMethod === "bpi") {
          creditCardInput.style.display = "block";
      } else if (selectedPaymentMethod === "gcash" || selectedPaymentMethod === "maya") {
          mobileNumberInput.style.display = "block";
      }
  });
// pang validate ng cc kung tama ba inenter o may inenter
function validateCreditCardInput() {
  const creditCardNumber = document.getElementById("creditCardNumber").value;
  
  if (creditCardNumber.trim() === "") {
      alert("Please enter your 16-digit credit card number.");
      return false;
  }

  if (!/^\d{16}$/.test(creditCardNumber)) {
      alert("Please enter a valid 16-digit credit card number.");
      return false;
  }

  return true;
}

// same sa cc pero ito mobile number
function validateMobileNumberInput() {
  const mobileNumber = document.getElementById("mobileNumber").value;
  
  if (mobileNumber.trim() === "") {
      alert("Please enter your 11-digit mobile number.");
      return false;
  }

  if (!/^\d{11}$/.test(mobileNumber)) {
      alert("Please enter a valid 11-digit mobile number.");
      return false;
  }

  return true;
}
const phoneNumberInput = document.getElementById("phoneNumber");

phoneNumberInput.addEventListener("input", function () {
    // para di makapag enter ng mga letters
    const sanitizedPhoneNumber = phoneNumberInput.value.replace(/[^0-9]/g, '');

    // kailangan 11 digits lang
    const validPhoneNumber = sanitizedPhoneNumber.slice(0, 11);

    // ma update yung input value
    phoneNumberInput.value = validPhoneNumber;
});

function isValidEmail(email) {
  // dapat yung email ay may @
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



// pang validate din
function validateInputs(username, firstName, lastName, country, streetAddress, unit, townCity, state, postcode, phoneNumber, paymentMethod) {
  

  // Return true kapag lahat valid pero pag hindi, false
  return (
      username.trim() !== "" &&
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      country.trim() !== "" &&
      streetAddress.trim() !== "" &&
      unit.trim() !== "" &&
      townCity.trim() !== "" &&
      state.trim() !== "" &&
      postcode.trim() !== "" &&
      phoneNumber.trim() !== "" &&
      paymentMethod.trim() !== ""
  );
}

// para makuha yung order summary 
function getOrderSummary(cart) {
    let orderSummary = "";

    for (const productId in cart) {
        const product = cart[productId];
        orderSummary += `${product.name} x${product.quantity}\n`;
    }

    orderSummary += `Total Cost: ₱${(calculateTotalCost(cart) * 1000).toLocaleString()}`;

    return orderSummary;
}
function updateStockAtCheckout(cart) {
  for (const productId in cart) {
      const product = cart[productId];
      stock[productId] -= product.quantity; // decrease yung stock pagkacheckout
  }

  updateProductStock(); // mag update yung product stock
}




  
  //para mabura yung item sa cart pag ni check out
  function clearCheckedItemsFromCart() {
    for (const productId in cart) {
      const checkbox = document.querySelector(`[name="checkout-item-${productId}"]`);

      if (checkbox.checked) {
        delete cart[productId];
      }
    }
    updateCartSection(cart);
    updateCheckoutButtonVisibility(); // para to sa visibility ng checkout button

  }

 
  


  function updateProductStock() {
    for (const productId in stock) {
      const stockElement = document.querySelector(`[data-productid="${productId}"] #stock`);
      stockElement.textContent = stock[productId];
    }
  }
   // mga event listener to para sa bawat product
    products.forEach((product) => {
    const addToCartButton = product.querySelector(".add-to-cart");
    const buyNowButton = product.querySelector(".buy-now");
    const quantityInput = product.querySelector("#quantity");
    const stockElement = product.querySelector("#stock");
    const productId = product.getAttribute("data-productid");

    // quantity kung ilan i a add to cart o i bu buy
    stockElement.textContent = stock[productId];
    quantityInput.value = 0;

      quantityInput.addEventListener("input", function () {
      const selectedQuantity = parseInt(quantityInput.value);
      const availableStock = parseInt(stockElement.textContent);

      if (selectedQuantity < 0) {
        quantityInput.value = 0;
      } else if (selectedQuantity > availableStock) {
        quantityInput.value = availableStock;
      }
    });

    //add to cart 
 
  addToCartButton.addEventListener("click", function () {
  const productName = product.querySelector("h3").textContent;
  const productPriceText = product.querySelector(".price").textContent;
  const productPrice = parseFloat(productPriceText.replace("₱", "").trim()) / 1000;
  const selectedQuantity = parseInt(quantityInput.value);
  const availableStock = parseInt(stockElement.textContent);

  if (selectedQuantity === 0 || selectedQuantity > availableStock) {
    if (!viewMode) {
      // kapag nakalogin at wala sa view or guest mode
      showAlert('Invalid quantity or product out of stock.');
    }
  } else {
    if (viewMode) {
      // pag nasa view mode
      alert('You need to log in first.');
    } else {
      //ito yung para sa laman ng cart
      if (!cart[productId]) {
        cart[productId] = {
          name: productName,
          price: productPrice,
          quantity: selectedQuantity,
          imageSrc: product.querySelector("img").src, 

        };
       
      } else {
        cart[productId].quantity += selectedQuantity;
      }

      /* hide ko muna ito
      stock[productId] -= selectedQuantity;
      stockElement.textContent = stock[productId];
      */
      updateCartSection(cart);

      if (cart[productId].quantity >= 2) {
        const checkbox = document.querySelector(`[name="checkout-item-${productId}"]`);
        checkbox.checked = true;
      }

      quantityInput.value = 0;

      showAlert(`Added ${selectedQuantity} ${productName}(s) to the cart. Total cost: ₱${(selectedQuantity * productPrice * 1000).toLocaleString()}`);
    }
  }
});

    


            // buy now
        // ito yung pang represent para sa current product
let currentProduct;


buyNowButton.addEventListener("click", function () {
    const productName = product.querySelector("h3").textContent;
    const productPriceText = product.querySelector(".price").textContent;
    const productPrice = parseFloat(productPriceText.replace("₱", "").trim()) / 1000;
    const selectedQuantity = parseInt(quantityInput.value);
    const availableStock = parseInt(stockElement.textContent);

    // set ng current product
    currentProduct = {
        name: productName,
        price: productPrice,
        quantity: selectedQuantity,
        imageSrc: product.querySelector("img").src,
    };

    if (viewMode) {
        // nasa view or guest mode
        alert('You need to log in first.');
    } else if (selectedQuantity === 0 || selectedQuantity > availableStock) {
        showAlert('Invalid quantity or product out of stock.');
    } else {
        // mapunta sa checkout-section
        showSection(checkoutSection);

        // ma update yung sa "your order" depende sa current product
        updateOrderTable(currentProduct);

       
        //hide ko muna to
        /*stock[productId] -= selectedQuantity;
        stockElement.textContent = stock[productId];
*/
        quantityInput.value = 0;
    }
});
});


// ito yung table para sa pag buy now
function updateOrderTable(product) {
  orderTable.innerHTML = "";
  // header ng table
  if (orderTable.children.length === 0) {
      const headerRow = document.createElement("tr");
      const headerImageCell = document.createElement("th");
      const headerNameCell = document.createElement("th");
      const headerQuantityCell = document.createElement("th");
      const headerPriceCell = document.createElement("th");

      headerImageCell.textContent = "";
      headerNameCell.textContent = "Product";
      headerQuantityCell.textContent = "Quantity";
      headerPriceCell.textContent = "Price";

      headerRow.appendChild(headerImageCell);
      headerRow.appendChild(headerNameCell);
      headerRow.appendChild(headerQuantityCell);
      headerRow.appendChild(headerPriceCell);

      orderTable.appendChild(headerRow);
  }

  // table row para sa product
  const orderItem = document.createElement("tr");

  // image
  const imageCell = document.createElement("td");
  const productImage = document.createElement("img");
  productImage.src = product.imageSrc;
  productImage.alt = product.name;
  productImage.style.width = "50px"; // Adjust the width as needed
  productImage.style.height = "50px";
  imageCell.appendChild(productImage);

  // name
  const nameCell = document.createElement("td");
  nameCell.textContent = product.name;

  // quantity
  const quantityCell = document.createElement("td");
  quantityCell.textContent = product.quantity;

  // price
  const priceCell = document.createElement("td");
  priceCell.textContent = `₱${(product.price * product.quantity * 1000).toLocaleString()}`;

  // pang append lang kung paano pagkakasunod
  orderItem.appendChild(imageCell);
  orderItem.appendChild(nameCell);
  orderItem.appendChild(quantityCell);
  orderItem.appendChild(priceCell);

  // mapakita yung table
  orderTable.appendChild(orderItem);

  // total cost
  totalCost += product.price * product.quantity;

  //pang display din ng total cost
 // Update the total cost with the current product
 totalCost = product.price * product.quantity;
 totalCostElement.textContent = `Total Cost: ₱${(totalCost * 1000).toLocaleString()}`;
  updateCheckoutButtonVisibility();
}



          
          


  cartItemsList.addEventListener("change", function (event) {
    const element = event.target;
    if (element.type === "checkbox") {
        // Checkbox change
        const productId = element.value;

        if (!element.checked) {
            const product = cart[productId];
            const confirmation = confirm("Do you want to remove this product from the cart?");

            if (confirmation) {
                delete cart[productId];
                stock[productId] === product.quantity;
                updateCartSection(cart);
                updateProductStock();

                updateCheckoutButtonVisibility();

            } else {
                element.checked = true;
            }
        }
    }
});
  
  // para mag update yung stock bawat product
  function updateProductStock() {
    for (const productId in stock) {
      const stockElement = document.querySelector(`[data-productid="${productId}"] #stock`);
      stockElement.textContent = stock[productId];
    }
  }
  
  // para lang mag update yung nasa side bar o cart section
  function updateCartSection(cart) {
    // para walang laman pag walang product sa cart
    cartItemsList.innerHTML = "";
    // 0 muna total cost
    totalCost = 0;

    // table 
    const cartTable = document.createElement("table");
    cartTable.className = "cart-table";

    //header row
    const headerRow = document.createElement("tr");
    const headerCheckboxCell = document.createElement("th");
    const headerImageCell = document.createElement("th");
    const headerNameCell = document.createElement("th");
    const headerPriceCell = document.createElement("th");
    const headerQuantityCell = document.createElement("th");

    headerCheckboxCell.textContent = " ";
    headerImageCell.textContent = "";
    headerNameCell.textContent = "Product Name";
    headerPriceCell.textContent = "Price";
    headerQuantityCell.textContent = "Quantity";

    headerRow.appendChild(headerCheckboxCell);
    headerRow.appendChild(headerImageCell);
    headerRow.appendChild(headerNameCell);
    headerRow.appendChild(headerPriceCell);
    headerRow.appendChild(headerQuantityCell);

    cartTable.appendChild(headerRow);

   
    for (const productId in cart) {
        const product = cart[productId];

      
        const cartItem = document.createElement("tr");

     
        const checkboxCell = document.createElement("td");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = `checkout-item-${productId}`;
        checkbox.value = productId;
        checkbox.checked = true; // nakacheck agad sa cart yung product
        checkboxCell.appendChild(checkbox);

       
        const imageCell = document.createElement("td");
        const productImage = document.createElement("img");
        productImage.src = cart[productId].imageSrc;
        productImage.alt = cart[productId].name;
        productImage.style.width = "50px"; 
        productImage.style.height = "50px";
        imageCell.appendChild(productImage);


        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;


        const priceCell = document.createElement("td");
        priceCell.textContent = `₱${(product.price * product.quantity * 1000).toLocaleString()}`;


        const quantityCell = document.createElement("td");

    
        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.name = `quantity-item-${productId}`;
        quantityInput.value = product.quantity;
        quantityInput.min = 0;
        quantityInput.max = stock[productId];

        // pang update ng total cost kapag nag change din ng quantity
        quantityInput.addEventListener("input", function () {
          const newQuantity = parseInt(quantityInput.value);
          const availableStock = parseInt(stock[productId]);

          if (newQuantity < 0) {
              quantityInput.value = 0;
          } else if (newQuantity > availableStock) {
              // para sakto lang sa stock kung mag exceed man yung ininput
              quantityInput.value = availableStock;
          }

          product.quantity = parseInt(quantityInput.value);

          totalCost = calculateTotalCost(cart);

          priceCell.textContent = `₱${(product.price * product.quantity * 1000).toLocaleString()}`;

          totalCostElement.textContent = `Total Cost: ₱${(totalCost * 1000).toLocaleString()}`;
      });
      updateCheckoutButtonVisibility();

    
        quantityCell.appendChild(quantityInput);


        cartItem.appendChild(checkboxCell);
        cartItem.appendChild(imageCell);
        cartItem.appendChild(nameCell);
        cartItem.appendChild(priceCell);
        cartItem.appendChild(quantityCell);

        cartTable.appendChild(cartItem);

        totalCost += product.price * product.quantity;
    }

    if (Object.keys(cart).length === 0) {
      //pag empty yung cart hide yung table
      cartTable.style.display = "none";
  } else {
      // para makita yung table pag hindi empty
      cartTable.style.display = "table";
  }


    cartItemsList.appendChild(cartTable);

    // Display total cost
    totalCostElement.textContent = `Total Cost: ₱${(totalCost * 1000).toLocaleString()}`;
}

  
  // calculate total cost to yung kabuohan
  function calculateTotalCost(cart) {
    let total = 0;
    for (const productId in cart) {
      const product = cart[productId];
      total += product.price * product.quantity;
    }
    return total;
  }

    alert(`You are checking out:\n\n${itemsToCheckout.map(item => `${cart[item.productId].name} x${item.quantity}`).join('\n')}\n\nTotal Cost: ₱${(totalCheckoutCost * 1000).toFixed(0)}`);
  });

  /* alert modal to */
  function showAlert(message) {
    const customModal = document.getElementById("custom-alert");
    const alertMessage = document.getElementById("alert-message");

    alertMessage.textContent = message;

    customModal.style.display = "block";

    const closeAlertButton = document.getElementById("close-alert");
    closeAlertButton.addEventListener("click", function () {
      customModal.style.display = "none";
    });
  }
  /* end */
 
 
  function closePopup() {
    const popupWindow = document.getElementById("popup-window");
    popupWindow.style.display = "none";
}
const viewProductButtons = document.querySelectorAll(".view-product");

// Popup elements
const popupWindow = document.getElementById("popup-window");
const popupImage = document.getElementById("popup-image");
const popupName = document.getElementById("popup-name");
const popupPrice = document.getElementById("popup-price");
const popupSpecs = document.getElementById("popup-specs");

// Close button
const closeButton = document.querySelector(".close-button");

// close popup to
function closePopup() {
    popupWindow.style.display = "none";
}

// view product
function handleViewProductClick(event) {

    event.preventDefault();

    // container ng product
    const product = event.target.closest(".product");

    // details
    const productName = product.querySelector("h3").textContent;
    const productPriceText = product.querySelector(".price").textContent;
    const productImageSrc = product.querySelector("img").src;

    // product specifications
    const specsContainer = product.querySelector(".specs");
    const specsHTML = specsContainer ? specsContainer.innerHTML : "";

    // kung ano lalabas sa popup window or modal
    popupImage.src = productImageSrc;
    popupName.textContent = productName;
    popupPrice.textContent = productPriceText;
    popupSpecs.innerHTML = specsHTML;

    // para lumabas yung popup
    popupWindow.style.display = "block";
}

// para to sa lahat ng view product na button
viewProductButtons.forEach(function (button) {
    button.addEventListener("click", handleViewProductClick);
});

// close button naman
if (closeButton) {
    closeButton.addEventListener("click", function () {
        closePopup();
    });
}

// mag close kapag clinick yung close kapag naka open yung popup window
window.addEventListener("click", function (event) {
    if (event.target === popupWindow) {
        closePopup();
    }
});

 


   totalCost = 0;

  products.forEach((product) => {
    const checkbox = product.querySelector("input[type='checkbox']");
    const quantityInput = product.querySelector("input[type='number']");
    const productPriceText = product.querySelector(".price").textContent;
    const productPrice = parseFloat(productPriceText.replace("₱", "").trim()) / 1000;

    checkbox.addEventListener("change", function () {
      const selectedQuantity = parseInt(quantityInput.value);

      if (checkbox.checked) {
        // kung ano mga nasa cart na nakacheck mag u update yung total cost
        const itemCost = productPrice * selectedQuantity;
        totalCost += itemCost;
      } else {
        // ito yung mababawasan yung total cost pag nagbawas ng product
        const itemCost = productPrice * selectedQuantity;
        totalCost -= itemCost;
      }

      const totalcartCostElement = document.getElementById("total-cost");
      totalcartCostElement.textContent = `Total Cost: ₱${(totalCost * 1000).toFixed(0)}`;
    });
  });



  
 



