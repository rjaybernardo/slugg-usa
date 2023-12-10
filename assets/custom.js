// jQuery('.mobile-menu-icon').click(function(e){
//   e.preventDefault();
//   MobileMenuLength = jQuery('.sidebar-nav[data-modal-label="Header menu"]:visible').length;
//   console.log(MobileMenuLength);
//   if(MobileMenuLength > 0){
//       jQuery('.close-btn-mobile-menu').click();
//   }
// });

theme_custom.slickSlider = function () {
  jQuery('.image_slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  })

  jQuery('.custom_testimonial_slider').slick({
    infinite: false,
    slidesToShow: 2.7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  })
}
theme.custom_stickyData = function () {
  var data = jQuery('.select-variant.selected').html()
  jQuery('.product-variant .selected_data').html(data)
}

jQuery('.selected_data').on('click', function () {
  jQuery(this)
    .closest('.product-variant')
    .find('ul')
    .toggleClass('variant_open')
  jQuery(this).toggleClass('active')
})

theme.custom_stickyCart = function () {
  jQuery('.sticky_cart_add').on('click', function () {
    jQuery('.shopify-product-form .spice-submit-button').trigger('click')
  })

  jQuery('.select-variant').on('click', function () {
    jQuery(this)
      .closest('.product-variant')
      .find('ul')
      .removeClass('variant_open')
    jQuery(this)
      .closest('.product-variant')
      .find('.selected_data')
      .removeClass('active')
    jQuery('.select-variant').removeClass('selected')
    jQuery(this).addClass('selected')
    var variantTitle = jQuery(this).find('.variant_title').attr('title')
    var variantImage = jQuery(this)
      .find('.variant_colors')
      .attr('variant_image')
    jQuery('img.sticky_variant_image').attr('src', variantImage)
    jQuery('.product-block-variant-picker .variant-input').each(function (e) {
      var getValue = jQuery(this).find('input').val()
      if (getValue == variantTitle) {
        jQuery(this).find('input').trigger('click')
        return false
      }
    })
    theme.custom_stickyData()
  })

  jQuery('.product-block-variant-picker .variant-input').on(
    'click',
    function () {
      var getValue = $(this).find('input').val()
      jQuery('.select-variant').each(function (e) {
        var getSelect = jQuery(this).find('.variant_title').attr('title')
        var variantImage = jQuery(this)
          .find('.variant_colors')
          .attr('variant_image')
        if (getSelect == getValue) {
          console.log('getSelect', getSelect)
          jQuery('img.sticky_variant_image').attr('src', variantImage)
          jQuery('.select-variant').removeClass('selected')
          jQuery(this).addClass('selected')
          theme.custom_stickyData()
        }
      })
    }
  )
}

theme.countdown_timer = function () {
  if (jQuery('.current_date_time_main').length > 0) {
    var afterDayDelivery = parseInt(
      jQuery('.current_date_time_main').attr('data-after-day')
    )

    var originalDateString = jQuery('.current_date_time_main').attr(
      'data-date-time'
    )
    var originalDate = new Date(originalDateString)

    // Add 3 days to the original date
    var futureDate = new Date(originalDate)
    futureDate.setDate(originalDate.getDate() + afterDayDelivery)
    var convertedDateStr = futureDate.toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

    var targetTime = new Date()
    dataTimeCountdown = jQuery('.current_date_time_main')
      .attr('data-time-countdown')
      .split(',')

    targetTime.setHours(
      dataTimeCountdown[0],
      dataTimeCountdown[1],
      dataTimeCountdown[2]
    )

    function updateCounter() {
      var currentTime = new Date()
      var timeDifference = targetTime - currentTime

      if (timeDifference <= 0) {
        jQuery('.current_date_time_main').hide()
        return
      }

      var hours = Math.floor(timeDifference / 3600000)
      var minutes = Math.floor((timeDifference % 3600000) / 60000)
      var seconds = Math.floor((timeDifference % 60000) / 1000)

      // Format the time with leading zeros
      // var formattedTime = ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
      var formattedTime =
        ('0' + hours).slice(-2) +
        'h and ' +
        ('0' + minutes).slice(-2) +
        ' miniutes'
      // console.log(formattedTime2);

      var expectedDeliveryText =
        '<span>Free metro delivery expected on <b>' +
        convertedDateStr +
        '</b> if you order in the next <b>' +
        formattedTime +
        '</b></span>'

      jQuery('.current_date_time_main').html(expectedDeliveryText)
      setTimeout(updateCounter, 60000) // Update the counter every 1 second
    }

    updateCounter()
  }
}

jQuery(document).ready(function () {
  // Add an event listener to the cart button
  jQuery('#CartButton').click(function () {
    // Hide the sticky_cart when the cart button is clicked
    jQuery('.sticky_cart').hide()
  })

  theme_custom.slickSlider()
  theme.countdown_timer()
  theme.custom_stickyCart()
  theme.custom_stickyData()
})
jQuery(window).scroll(function () {
  if (jQuery('body.template-product').length > 0) {
    if (jQuery('.sticky_cart.product_full_info_sticky').length == 0) {
      var addToCartOffsetTop =
        jQuery(
          '.product-block-container .shopify-product-form .add-to-cart-btn'
        ).offset().top + 100
      if (jQuery(this).scrollTop() > addToCartOffsetTop) {
        jQuery('.sticky_cart').show()
        jQuery('.sticky_cart').addClass('product_info_sticky')
      } else {
        jQuery('.sticky_cart').removeClass('product_info_sticky')
      }
      var footerCarthide = jQuery('#shopify-section-footer').offset().top - 400
      if (jQuery(this).scrollTop() > footerCarthide) {
        jQuery('.sticky_cart').removeClass('product_info_sticky')
      }
    }
  }
})
