// Parse HTML Response as there was no JSON response.
fetchCart = () => {
  fetch(`api/v1/cart`).then(res => res.text()).then(html => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    return doc
  }).then(parseCart).then(createModal)
}

// This function gathers data from the parsed HTML from the fetch and creates a new object
parseCart = (cartData) => {

  // Products
  let quantity = cartData.getElementsByClassName('mini-cart-product').length
  let products = cartData.getElementsByClassName('mini-cart-product')
  let subtotal = cartData.getElementsByClassName('order-totals-table')[0].innerHTML

  // Store Every Product
  let items = []
  // Loop over Products Array to Creat Individual Objects
  if (products) {
    for (let i = 0; i < quantity; i++) {
      let newItem = {
        entireProduct: products[i].innerHTML,
      }
      items.push(newItem)
    }
  }   else {
    null
  }

  // Cart Data -- Provides Quantity, Total, Logo, and EVERY item.
  const cart = {
    qty: quantity,
    allItems: items,
    total: subtotal,
    logo: cartData.getElementsByClassName('logo-container')[1].innerHTML,
    }
  return cart
}

// Modal creation

createModal = (cartData) => {

  let pageHeight = $(document).height();
  let pageWidth = $(window).width();

  // Backdrop div - Obscures the Main page
  let backdropDiv = $('<div id="backdrop"></div>').appendTo('body');
  $(backdropDiv).css({
    'position':'fixed',
    'margin': '0',
    'padding':'0',
    'top':'0',
    'left':'0',
    'background-color':'rgba(0,0,0,0.7)',
    'height':'100%',
    'width':'100%',
    'z-index':'10',
    'display':'none',
  });

  // Modal - All Content will be displayed here
  let lightBox = $('<div id="lightBox"></div>').appendTo($(backdropDiv));
  $(lightBox).empty();

  $(lightBox).css({
    'background-color':'rgba(255,255,255,1)',
    'position':'absolute',
    'border':'1px',
    'border-style':'solid',
    'border-color': '#1F1F2E',
    'z-index':'50',
    'height':'60%',
    'width':'60%',
    'padding':'50px',
    'left':'25%',
    'top':'10%',
    'overflow':'scroll',
    'display':'none',
  });

  // Header - Marmot Logo and Close button to the right
  let boxLogoSpan = $('<span id="box-logo-span"></span>').appendTo(lightBox);
  let boxLogo = $(`${cartData.logo}`).appendTo($(boxLogoSpan));
  boxLogo.css({
    'text-align': 'left',
    'font-family': 'Proxima'
  });

  // Close button
  let closeButton = $('<a id="close-button">Close</a>').appendTo($(boxLogoSpan));
  closeButton.css({
    'text-align': 'right',
    'float': 'right',
  });

  // Close Cart Functionality
  $('#close-button').click(function() {
    $(backdropDiv).fadeOut("slow");
    toggleCartOff()
  });


  // Separator
  const separator = document.createElement('hr')
  lightBox.append(separator)

  // Cart Info - Items and Pricing Per Item and Quantity of Item
  const cartContainer = document.createElement('div')
  let products = cartData.allItems
  products.forEach(product => {
    let hr = document.createElement('hr')
    let productDiv = document.createElement('div')
    productDiv.id = product.name

    let dv = document.createElement('div')
    dv.innerHTML = product.entireProduct
    productDiv.append(dv, hr)
    cartContainer.append(productDiv)
  })

  // Total Info - Includes Item count and Pricing
  const total = document.createElement('div')
  total.innerHTML = `<table><tr class="order-subtotal">
    <td>Total Items </td>
    <td>${cartData.qty}</td>
    </tr>
    ${cartData.total}</table>`

  // Cart + Checkout Button. This redirects the user to the Checkout/Cart
  const visitCart = document.createElement('div')
  visitCart.innerHTML = `<a href="https://www.marmot.com/cart" id="checkout-btn"><span class="checkout-button cart-button button">Cart</span></a>`
  cartContainer.append(total)
  lightBox.append(cartContainer, visitCart)
  console.log('Inside Modal', products)
}

// This function vets the positioning of the scrollbar at all times

checkScroll = () => {
  let scroll = $(window).scrollTop(),
               docHeight = $(document).height(),
               windowHeight = $(window).height();
  let scrollPercent = (scroll / (docHeight-windowHeight)) * 100;
  if (scrollPercent > 89) {
    console.log('Reached beyond 90%')
    return true;
  }
};

// This Event Listener utilizes the checkScroll function to determine when to toggle the modal on
window.addEventListener('scroll', () => {
  if (checkScroll()) {
    toggleCartOn();
  }
});

toggleCartOn = () => {
  // Uncomment the below to stop scrolling after cart is toggled on.
  // $('body').css({'overflow':'hidden'})
  $('#backdrop').css({'display':'inline'})
  $('#lightBox').css({'display':'inline'})
};

toggleCartOff = () => {
  // Uncomment the below to start scrolling after cart is toggled off.
  // $('body').css({'overflow':'scroll'})
  $('#backdrop').css({'display':'none'})
  $('#lightBox').css({'display':'none'})
};

// Run the below function to start
fetchCart()


allProducts = (products) => {
  // Store Every Product
  let items = []
  // Loop over Products Array to Creat Individual Objects
  if (products) {
    for (let i = 0; i < products.length; i++) {
      let newItem = {
        entireProduct: products[i].innerHTML,
      }
      items.push(newItem)
    } return items
  } else {
    return items
  }
}
