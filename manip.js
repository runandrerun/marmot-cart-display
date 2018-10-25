fetchCart = () => {
  fetch(`api/v1/cart`).then(res => res.text()).then(html => {
    // Parse HTML Response
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    return doc
  }).then(html => parseCart(html)).then(handleCart)
}

parseCart = (cartData) => {

  // Products
  let quantity = cartData.getElementsByClassName('mini-cart-product').length
  let products = cartData.getElementsByClassName('mini-cart-product')

  // Store Every Product
  let items = []

  if (products) {
    for (let i = 0; i < quantity; i++) {
      console.log('Inside Loop', products[i])
      let newItem = {
        name: products[i].getElementsByClassName('mini-cart-name')[0].innerText,
        image: products[i].getElementsByClassName('mini-cart-image')[0].innerHTML,
        price: products[i].getElementsByClassName('mini-cart-price')[0].innerHTML,
        pricing: products[i].getElementsByClassName('mini-cart-pricing')[0].innerHTML,
        entireProduct: products[i].getElementsByClassName('mini-cart-product')
      }
      items.push(newItem)
      console.log('Items inside Loop', items)
    }
  }   else {
    null
  }

  // Cart Data
  const cart = {
    qty: quantity,
    allItems: items
    }
  return cart
}

handleCart = (cart) => {
  console.log('Inside Handle', cart)
  createModal(cart)
}

// Modal at the Bottom of Marmot

createModal = (cartData) => {


  let pageHeight = $(document).height();
  let pageWidth = $(window).width();

  // Backdrop div: Create, append & style it:
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
    'z-index':'10'
  });

  // LightBox container: Create, append, empty & style it:
  let lightBox = $('<div id="lightBox"></div>').appendTo($(backdropDiv));
  $(lightBox).empty();

  $(lightBox).css({
    'background-color':'rgba(255,255,255,0.8)',
    'position':'absolute',
    'border':'3px',
    'border-style':'solid',
    'border-color': '#1F1F2E',
    'z-index':'50',
    'height':'60%',
    'width':'60%',
    'padding':'50px',
    'left':'25%',
    'top':'10%',
    'overflow':'scroll',
  });

  // Create span with close button, append to lightBox, style button:
  let closeButtonSpan = $('<span id="close-button-span"></span>').appendTo(lightBox);
  let closeButton = $('<a id="close-button">Close</a>').appendTo($(closeButtonSpan));
  closeButton.css({
    'text-align': 'right',
  });

  // Close modal functionality:
  $('#close-button').click(function() {
    $(backdropDiv).fadeOut("slow");
  });

  // Header
  let boxLogoSpan = $('<span id="box-logo-span"></span>').appendTo(lightBox);
  let boxLogo = $('<h1 id="box-logo">MARMOT</a>').appendTo($(boxLogoSpan));
  boxLogo.css({
    'text-align': 'center',
    'font-family': 'Proxima'
  });

  // Cart Info
  const cartContainer = document.createElement('div')
  let products = cartData.allItems
  products.forEach(product => {
    let hr = document.createElement('hr')
    let productDiv = document.createElement('div')
    productDiv.id = product.name
    let productTitle = document.createElement('h2')
    productTitle.innerHTML = product.name
    let productImage = document.createElement('div')
    productImage.innerHTML = product.image
    let price = document.createElement('h2')
    price.innerHTML = product.price
    let pricing = document.createElement('div')
    pricing.innerHTML = product.pricing
    let dv = document.createElement('div')
    dv.innerHTML = product.entireProduct
    productDiv.append(productTitle, productImage, price, pricing, hr, dv)
    cartContainer.append(productDiv)
  })
  lightBox.append(cartContainer)
  console.log('Inside Modal', products)


  let msgDiv = $('<div id="msg-div"></div>').appendTo(lightBox);
    $('<br>').appendTo(msgDiv);
    $('<h3 class="msg-spans"></h3>').text("Items: " + cartData.qty).appendTo(msgDiv);
    $('<h3 class="msg-spans"></h3>').text("Subtotal: $" + subtotal).appendTo(msgDiv);
    cartData.allItems.forEach(item => {
      $(`<h2 id=${item.name}></h2>`).text(`${item.name}`).appendTo(msgDiv);
    })
    $('<br>').appendTo(msgDiv);
    $('<br>').appendTo(msgDiv);
    $('.msg-spans').css({
        'text-align': 'center',
        'font-family': 'Proxima',
        'font-weight': 'normal',
        'font-style': 'normal',
        'color': '#008ec2',
        'font-size':'25px'
      });
    $('<a href="https://www.marmot.com/cart" id="checkout-btn"><span class="checkout-button cart-button button">Cart</span></a>').appendTo(msgDiv);
    $('.checkout-button').css({
    'display': 'block',
    'margin-left':'auto',
    'margin-right':'auto'
  });
}


cartAppear = () => {
  let scroll = $(window).scrollTop(),
               docHeight = $(document).height(),
               windowHeight = $(window).height();
  let scrollPercent = (scroll / (docHeight-windowHeight)) * 100;
  if (scrollPercent > 89) {
    console.log('Reached beyond 90%')
    return true;
  }
}

$(window).scroll( function() {
  if (cartAppear()) {
    $(this).off();
    fetchCart()
  }
});
