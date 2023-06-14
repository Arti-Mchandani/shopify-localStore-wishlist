//  juery in head
<script src="https://code.jquery.com/jquery-3.6.4.min.js" integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8=" crossorigin="anonymous"></script>

// code


$(document).ready(function (i) {
  //     for pdp page button====

  var cartProductData = {
    productId: $(".product__content input[type='hidden']").attr("value"),
    productTitle: "{{ product.title | strip_html }}",
    productImg: "{{ product.featured_image | img_url: 'master' }}",
    productPrice: "{{ product.price | money | remove_first: '' }}",
    productUrl: "{{ product.url }}"
  };
  //     local storage
  console.log(cartProductData.productId)
  let cartlocal = JSON.parse(localStorage.getItem('cartObject')) || [];
  var count = 0;
  var productCount = `<div class="prodCount">${count}</div>`

  // when page is empty====
  let emptyWishlist = "<div class='emptyWishlist'><p>No item your wishlist</p><a href='/collections/all' class='btn js-btn'>Add item</a></div>";
  if (cartlocal.length == 0 || cartlocal.length == null) {
    $("#wishlist-wrapper").append(emptyWishlist);
    $("#WishlistHeaderIcon").append(productCount);
  }

  //   keep th eicon red on page load  
  cartlocal.map(item => {
    if (item.productId === cartProductData.productId || item.productId === parseInt(cartProductData.productId)) {
< !--$(`.heartIcon-${cartProductData.productId} svg`).html('<path  style="fill: red;" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>'); -->
        $(`.heartIcon-${cartProductData.productId} svg`).html('<path style="fill:red;" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" ></path>');
    } else {
      return item;
    }
  });
  // pdp button click======
  $('.btn-wishlistpdp').on('click', addWish)
  function addWish(e) {
    e.preventDefault();
    console.log("clicked")
    let isInCart = false;
    if (cartlocal) {
      isInCart = cartlocal.some(item => item.productId === cartProductData.productId || item.productId === parseInt(cartProductData.productId));
    } else {
      cartlocal = [];
      if (isInCart) {
        cartlocal.map(item => {
          if (item.productId === cartProductData.productId || item.productId === parseInt(cartProductData.productId)) {

            var index = cartlocal.indexOf(item);
            if (index > -1) {
              cartlocal.splice(index, 1);
              $(`.heartIcon-${cartProductData.productId} svg`).html('<path style="fill:white" d="m244 84 11.1 12 12-11.98C300.6 51.37 347 36.51 392.6 44.1c68.9 11.48 119.4 71.1 119.4 141v5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.59 300.4C17.23 272.1 0 232.4 0 190.9v-5.8c0-69.9 50.52-129.52 119.4-141 44.7-7.59 92 7.27 124.6 39.9-.9 0 0 .01 0 0zm11.1 79.9-45-46.8c-21.7-20.82-52.5-30.7-82.8-25.66C81.55 99.07 48 138.7 48 185.1v5.8c0 28.2 11.71 55.2 32.34 74.4L256 429.3l175.7-164c20.6-19.2 32.3-46.2 32.3-74.4v-5.8c0-46.4-33.6-86.03-79.3-93.66-30.3-5.04-61.1 4.84-82.8 25.66l-46.8 46.8z"></path>');
            }
            return item;
          }
        });
      }
      else {
        cartlocal.push(cartProductData);
        $(`.heartIcon-${cartProductData.productId} svg`).html('<path style="fill:red;" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" ></path>');
      }
      localStorage.setItem("cartObject", JSON.stringify(cartlocal));
    }

    setTimeout(function () {
      $(".btn-wishlists[data-product-id]").each(function () {

        cartlocal.forEach(item => {

          if (item.productId === $(this).data('product-id').toString() || item.productId === $(this).data('product-id')) {
            $(this).find('svg').html('<path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" style="fill: red;"></path>');
          }
        });
      })
    }, 2000)
    // on product card icon button click=====
    $(document).on("click", ".btn-wishlists", function (e) {
      console.log(e)
      let productHandle = e.currentTarget.dataset.handle;
      console.log(productHandle)
      //         api to get info from handle======
      jQuery.getJSON(window.Shopify.routes.root + `products/${productHandle}.js`, function (product) {
        var availableVar;
        //           get the varient id
        $.each(product.variants, function (i, value) {
          if (value.available) {
            availableVar = value.id
            return false;
          }
        })
        console.log(availableVar)
        var cartProductData = {

          productId: availableVar,
          productTitle: product.title,
          productImg: product.featured_image,
          productPrice: "$" + product.price / 100,
          productUrl: product.url
        };
        let isInCart = false;
        if (cartlocal) {
          isInCart = cartlocal.some(item => item.productId == cartProductData.productId.toString() || item.productId === parseInt(cartProductData.productId));
        } else {
          cartlocal = [];
        }
        if (isInCart) {
          cartlocal.map(item => {
            if (item.productId === cartProductData.productId || item.productId === cartProductData.productId.toString()) {

              var index = cartlocal.indexOf(item);
              if (index > -1) {
                cartlocal.splice(index, 1);
                $(".wishRemove-" + cartProductData.productId).fadeIn().delay(2000).fadeOut();
                $(`.heartIcon-${cartProductData.productId} svg`).html('<path style="fill:black" d="m244 84 11.1 12 12-11.98C300.6 51.37 347 36.51 392.6 44.1c68.9 11.48 119.4 71.1 119.4 141v5.8c0 41.5-17.2 81.2-47.6 109.5L283.7 469.1c-7.5 7-17.4 10.9-27.7 10.9s-20.2-3.9-27.7-10.9L47.59 300.4C17.23 272.1 0 232.4 0 190.9v-5.8c0-69.9 50.52-129.52 119.4-141 44.7-7.59 92 7.27 124.6 39.9-.9 0 0 .01 0 0zm11.1 79.9-45-46.8c-21.7-20.82-52.5-30.7-82.8-25.66C81.55 99.07 48 138.7 48 185.1v5.8c0 28.2 11.71 55.2 32.34 74.4L256 429.3l175.7-164c20.6-19.2 32.3-46.2 32.3-74.4v-5.8c0-46.4-33.6-86.03-79.3-93.66-30.3-5.04-61.1 4.84-82.8 25.66l-46.8 46.8z"></path>');
              }
              return item;
            }
          });
        } else {
          cartlocal.push(cartProductData);
          $(`.wishAdded-${cartProductData.productId}`).fadeIn().delay(2000).fadeOut();
          $(`.heartIcon-${cartProductData.productId} svg`).html('<path  style="fill:red;" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>');
        }
        localStorage.setItem("cartObject", JSON.stringify(cartlocal));

      })
    });
  });
