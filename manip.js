fetchCart = () => {
  fetch(`api/v1/cart`).then(res => res.text()).then(html => {
    // Parse HTML Response
    let parser = new DOMParser();
    let doc = parser.parseFromString(html, "text/html");
    return doc
  }).then(html => parseCart(html)).then(res => console.log('After parse', res))
}

parseCart = (cartData) => {

  // Products
  let quantity = cartData.getElementsByClassName('mini-cart-product').length
  let products = cartData.getElementsByClassName('mini-cart-product')

  // Store Every Product
  let items = []

  if (products) {
    for (let i = 0; i < quantity; i++) {
      console.log('Inside Loop', products[i].getElementsByClassName('mini-cart-name')[0].innerText)
      let newItem = {
        name: products[i].getElementsByClassName('mini-cart-name')[0].innerText,
        image: products[i].getElementsByClassName('mini-cart-image')[0].innerHTML,
        price: products[i].getElementsByClassName('mini-cart-price')[0].innerHTML,
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
