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
