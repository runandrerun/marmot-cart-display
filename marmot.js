fetch(`https://www.marmot.com/cart`).then(res => res).then(data => data.body.getReader().read().blob())

fetch(`https://www.marmot.com/cart`).then(res => res).then(data => data.blob()).then(blob => URL.createObjectURL(blob))

var parser = new DOMParser();
var doc = parser.parseFromString(html, "text/html");

fetch(`https://www.marmot.com/cart`).then(res => res.text()).then(html => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(html, "text/html");
  console.log(doc)
})


items = fetch(`api/v1/cart`).then(res => res.text()).then(html => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(html, "text/html");
  const cart = {items: doc.forms}
  return cart
})


items = fetch(`api/v1/cart`).then(res => res.text()).then(html => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(html, "text/html");
  let cart = {html: doc}
  console.log(doc)
})

items = fetch(`api/v1/cart`).then(res => res.text()).then(html => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(html, "text/html");
  let cart = {html: doc}
  console.log(doc.getElementsByClassName('mini-cart-container'))
})


items = fetch(`api/v1/cart`).then(res => res.text()).then(html => {
  let parser = new DOMParser();
  let doc = parser.parseFromString(html, "text/html");
  let cart = {
    container: doc.getElementsByClassName('mini-cart-container'),
    quantity: doc.getElementsByClassName('mini-cart-container')[0].dataset.quantity,
    content: doc.getElementsByClassName('mini-cart-content')
  }
 	console.log(cart)
})

var numItems = 0;
var subtotal = 0;



fetchCart = () => {
  fetch(`api/v1/cart`).then(res => res.text()).then(html => {
    // Parse HTML Response
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    // Products
    let quantity = doc.getElementsByClassName('mini-cart-product').length
    let product = doc.getElementsByClassName('mini-cart-product')
    // Data Object
    let cart = {
      container: doc.getElementsByClassName('mini-cart-container'),
      quantity: doc.getElementsByClassName('mini-cart-container')[0].dataset.quantity,
      content: doc.getElementsByClassName('mini-cart-content'),
      orderValue: doc.getElementsByClassName('order-value')[0].innerHTML,
      products: doc.getElementsByClassName('mini-cart-product'),
      length: quantity,
    }
    debugger
    let items = {}

    // for (let i = 0; i < quantity; i++) {
    //   let items = {
    //     ...items,
    //     name: ,
    //     image:,
    //     price:,
    //   }
    // }
 	  return cart
  }).then(data => console.log(data))
}

// Clean

fetchCart = () => {
  fetch(`api/v1/cart`).then(res => res.text()).then(html => {
    // Parse HTML Response
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    // Products
    let quantity = doc.getElementsByClassName('mini-cart-product').length
    let products = doc.getElementsByClassName('mini-cart-product')
    // Data Object
    const items = {}
    const cart = {
      qty: quantity,
      allProducts: items,
      }
      debugger
    // products.map(product => {
    //   let items = {
    //     ...items,
    //     name: products[i].getElementsByClassName('mini-cart-name')[0].innerText,
    //     image: products[i].getElementsByClassName('mini-cart-image')[0].innerHTML,
    //     price: products[i].getElementsByClassName('mini-cart-price')[0].innerHTML,
    //     total: 0,
    //   }
    //   return items
    // })
    for (let i = 0; i < quantity; i++) {
      let items = {
        ...items,
        name: products[i].getElementsByClassName('mini-cart-name')[0].innerText,
        image: products[i].getElementsByClassName('mini-cart-image')[0].innerHTML,
        price: products[i].getElementsByClassName('mini-cart-price')[0].innerHTML,
        total: 0,
      }
      return items
    }

    console.log(quantity)
    console.log(products)
    console.log(cart)
    // return cart
    }).then(data => console.log('outside of parse', data))
}


fetchCart = () => {
  fetch(`api/v1/cart`).then(res => res.text()).then(html => {
    // Parse HTML Response
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    return doc
  }).then(html => parseCart(html)).then(console.log)
}

parseCart = (cartData) => {
  console.log('Inside parse', cartData)
  // Products
  let quantity = cartData.getElementsByClassName('mini-cart-product').length
  let products = cartData.getElementsByClassName('mini-cart-product')
  // Data Object
  let items = { name: products[0].getElementsByClassName('mini-cart-name')[0].innerText,
  image: products[0].getElementsByClassName('mini-cart-image')[0].innerHTML,
  price: products[0].getElementsByClassName('mini-cart-price')[0].innerHTML,}
  console.log('Before For Loop', items)
  const cart = {
    qty: quantity,
    allItems: items,
    }
  for (let i = 0; i < quantity; i++) {
    console.log('Inside Loop', products[i].getElementsByClassName('mini-cart-name')[0].innerText)
    let newItem = {
      name: products[i].getElementsByClassName('mini-cart-name')[0].innerText,
      image: products[i].getElementsByClassName('mini-cart-image')[0].innerHTML,
      price: products[i].getElementsByClassName('mini-cart-price')[0].innerHTML,
    }
  }
    // let items = {
    //   ...items,
    //   newItem
    // }
  }
  console.log('Cart', cart)
  console.log('Items', items)
  return newItem
}

// Small Copy

parseCart = (cartData) => {
  const cartQty = cartData.getElementsByClassName('mini-cart-product').length
  const products = cartData.getElementsByClassName('mini-cart-product')
  for (let i = 0; i < cartQty; i++) {
    let qty = data["line_items"][i]["qty"];
    let price = products[i].getElementsByClassName('mini-cart-price')[0].innerText;
    // Add qty to numItems:
    numItems += qty;
    // Add item price to subtotal:
    subtotal += price / 1;
  }
}

// Copy

parseCart = (cart) => {
  console.log('Inside parse', cart)
  Products
  let quantity = doc.getElementsByClassName('mini-cart-product').length
  let products = doc.getElementsByClassName('mini-cart-product')
  // Data Object
  let items = {}
  let cart = {
    qty: quantity
    }
  for (let i = 0; i < quantity; i++) {
    let items = {
      ...items,
      name: products[i].getElementsByClassName('mini-cart-name')[0].innerText,
      image: products[i].getElementsByClassName('mini-cart-image')[0].innerHTML,
      price: products[i].getElementsByClassName('mini-cart-price')[0].innerHTML,
      total: 0,
    }
  }
  return cart
  }).then(data => console.log('outside of parse', data))
}

$.get("/api/v1/cart", function( data ) {
  for (var i = 0; i < data["line_items"].length; i++) {
    var qty = data["line_items"][i]["qty"];
    var price = data["line_items"][i]["amount"] / 100;
    // Add qty to numItems:
    numItems += qty;
    // Add item price to subtotal:
    subtotal += price / 1;
  }
});


var moreThan89 = function() {
  var scroll = $(window).scrollTop(),
               docHeight = $(document).height(),
               windowHeight = $(window).height();
  var scrollPercent = (scroll / (docHeight-windowHeight)) * 100;
  if (scrollPercent > 89) {
    return true;
  }
};

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
  if (moreThan89()) {
    $(this).off();

    var pageHeight = $(document).height();
    var pageWidth = $(window).width();

    // Backdrop div: Create, append & style it:
    var backdropDiv = $('<div id="backdrop"></div>').appendTo('body');
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
    var lightBox = $('<div id="lightBox"></div>').appendTo($(backdropDiv));
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
    var closeButtonSpan = $('<span id="close-button-span"></span>').appendTo(lightBox);
    var closeButton = $('<a id="close-button">Close X</a>').appendTo($(closeButtonSpan));
    closeButton.css({
      'text-align': 'right',
    });

    // Close modal functionality:
    $('#close-button').click(function() {
      $(backdropDiv).fadeOut("slow");
    });

    // Warby Parker header:
    var boxLogoSpan = $('<span id="box-logo-span"></span>').appendTo(lightBox);
    var boxLogo = $('<h1 id="box-logo">WARBY PARKER</a>').appendTo($(boxLogoSpan));
    boxLogo.css({
      'text-align': 'center',
      'font-family': 'Proxima'
    });

    // Message div containing cart info:
    var msgDiv = $('<div id="msg-div"></div>').appendTo(lightBox);
      $('<br>').appendTo(msgDiv);
      $('<h3 class="msg-spans"></h3>').text("Items: " + numItems).appendTo(msgDiv);
      $('<h3 class="msg-spans"></h3>').text("Subtotal: $" + subtotal).appendTo(msgDiv);
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
    $('<a href="https://www.warbyparker.com/checkout" id="checkout-btn"><span class="checkout-button cart-button button">Checkout</span></a>').appendTo(msgDiv);
    $('.checkout-button').css({
      'display': 'block',
      'margin-left':'auto',
      'margin-right':'auto'
    });
  }
});
