
  const pdpData = JSON.parse(localStorage.getItem("cartObject")) || [];

  // Execute this function on DOM content load
  document.addEventListener("DOMContentLoaded", function (event) {
    getRecentPdp();
  });
// append wishlisted products
  function getRecentPdp() {
    pdpData.forEach(function (item) {
      let wishlistProd_grid = `<div class="wishlist product-item product-item--borderless product-item--centered">
      <a href=${item.productUrl}>
      <div class="media media--hover-effect">
         <img loading="lazy" src='${item.productImg}' width= "300" height="300"/>
       </div>
       <div class="product-information">
     <div class="product-item__title">${item.productTitle}</div>
     
     <p class="product-item__price__holder">${item.productPrice}</p>
     </a>
<button type="submit" class="btn js-btn addCart" id="customAddCart" data-cart-add="${item.productId}" data-cart-quantity="1">add to  cart</button>
<button class="removeItem btn js-btn" id="${item.productId}">Remove from wishlist </button>
      </div>
     </div>`;

      $("#wishlist-wrapper").append(wishlistProd_grid);
      
    });
  }
// code to remove item from the wishlist page===

  jQuery(document).on("click", ".removeItem", function (e) {
    var atr = e.target.id;

    let isInCart = false;
    if (pdpData) {
      isInCart = pdpData.some(item => item.productId === atr || item.productId === parseInt(atr));
    } else {
      pdpData = [];
    }
    if (isInCart) {
      pdpData.map(item => {
        console.log(item.length)
        if (item.productId === atr || item.productId === parseInt(atr)) {
          var index = pdpData.indexOf(item);
          if (index > -1) {
            pdpData.splice(index, 1);
            $("#wishlist-wrapper").html("");
            getRecentPdp();

          }
          if(index == 0){
            let emptyWishlist = "<div class='emptyWishlist'><p>No item your wishlist</p><a href='/collections/all' class='btn js-btn'>Add item</a></div>";
      
        $("#wishlist-wrapper").append(emptyWishlist);
      
          }
          return item;
        }
      });
    } else {
      return;
    }
    localStorage.setItem("cartObject", JSON.stringify(pdpData));

  })
// add item to cart======
  $(document).on("click", "#customAddCart", function (e) {
    var Id = $(this).attr("data-cart-add");
    console.log(Id);
    $.ajax({
      type: "POST",
      url: "/cart/add.js",
      data: {
        items: [
          {
            quantity: 1,
            id: Id
          }
        ]
      },
      dataType: "json",
      success: () => {
        let cartCount = parseInt($('.header__cart__status').attr('data-cart-count'));

        pdpData.map(item => {
          if (item.productId === parseInt(Id) || item.productId === Id) {

            var index = pdpData.indexOf(item);
            if (index > -1) {
              pdpData.splice(index, 1);
              $("#wishlist-wrapper").html("");
              getRecentPdp();
            }
              if(index == 0){
            let emptyWishlist = "<div class='emptyWishlist'><p>No item your wishlist</p><a href='/collections/all' class='btn js-btn'>Add item</a></div>";
      
        $("#wishlist-wrapper").append(emptyWishlist);      
          }
            return item;
          }
        });
// show msgs on adding item in the cart
        $(".cart_success-message").fadeIn().delay(2000).fadeOut();
        $('.header__cart__status').html(cartCount + 1);
        localStorage.setItem("cartObject", JSON.stringify(pdpData));
      },
      error: function () {
        $(".cart_error-message").fadeIn().delay(2000).fadeOut();
      }
    });
  });
