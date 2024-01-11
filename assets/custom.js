;(theme_custom.slickSlider = function () {
  jQuery('.image_slider').slick({
    infinite: !0,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  }),
    jQuery('.custom_testimonial_slider').slick({
      infinite: !1,
      slidesToShow: 2.7,
      slidesToScroll: 1,
      responsive: [
        { breakpoint: 992, settings: { slidesToShow: 3, slidesToScroll: 2 } },
        { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      ],
    })
}),
  (theme.custom_stickyData = function () {
    var t = jQuery('.select-variant.selected').html()
    jQuery('.product-variant .selected_data').html(t)
  }),
  jQuery('.selected_data').on('click', function () {
    jQuery(this)
      .closest('.product-variant')
      .find('ul')
      .toggleClass('variant_open'),
      jQuery(this).toggleClass('active')
  }),
  (theme.custom_stickyCart = function () {
    jQuery('.sticky_cart_add').on('click', function () {
      jQuery('.shopify-product-form .spice-submit-button').trigger('click')
    }),
      jQuery('.select-variant').on('click', function () {
        jQuery(this)
          .closest('.product-variant')
          .find('ul')
          .removeClass('variant_open'),
          jQuery(this)
            .closest('.product-variant')
            .find('.selected_data')
            .removeClass('active'),
          jQuery('.select-variant').removeClass('selected'),
          jQuery(this).addClass('selected')
        var t = jQuery(this).find('.variant_title').attr('title'),
          e = jQuery(this).find('.variant_colors').attr('variant_image')
        jQuery('img.sticky_variant_image').attr('src', e),
          jQuery('.product-block-variant-picker .variant-input').each(function (
            e
          ) {
            if (jQuery(this).find('input').val() == t)
              return jQuery(this).find('input').trigger('click'), !1
          }),
          theme.custom_stickyData()
      }),
      jQuery('.product-block-variant-picker .variant-input').on(
        'click',
        function () {
          var t = $(this).find('input').val()
          jQuery('.select-variant').each(function (e) {
            var i = jQuery(this).find('.variant_title').attr('title'),
              a = jQuery(this).find('.variant_colors').attr('variant_image')
            i == t &&
              (jQuery('img.sticky_variant_image').attr('src', a),
              jQuery('.select-variant').removeClass('selected'),
              jQuery(this).addClass('selected'),
              theme.custom_stickyData())
          })
        }
      )
  }),
  (theme.countdown_timer = function () {
    if (jQuery('.current_date_time_main').length > 0) {
      var t = parseInt(
          jQuery('.current_date_time_main').attr('data-after-day')
        ),
        e = jQuery('.current_date_time_main').attr('data-date-time'),
        i = new Date(e),
        a = new Date(i)
      a.setDate(i.getDate() + t)
      var r = a.toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        n = new Date()
      ;(dataTimeCountdown = jQuery('.current_date_time_main')
        .attr('data-time-countdown')
        .split(',')),
        n.setHours(
          dataTimeCountdown[0],
          dataTimeCountdown[1],
          dataTimeCountdown[2]
        ),
        (function t() {
          var e = new Date(),
            i = n - e
          if (i <= 0) jQuery('.current_date_time_main').hide()
          else {
            var a = Math.floor(i / 36e5),
              s = Math.floor((i % 36e5) / 6e4),
              o =
                (Math.floor((i % 6e4) / 1e3),
                ('0' + a).slice(-2) +
                  'h and ' +
                  ('0' + s).slice(-2) +
                  ' miniutes'),
              c =
                '<span>Free metro delivery expected on <b>' +
                r +
                '</b> if you order in the next <b>' +
                o +
                '</b></span>'
            jQuery('.current_date_time_main').html(c), setTimeout(t, 6e4)
          }
        })()
    }
  }),
  jQuery(document).ready(function () {
    jQuery('#CartButton').click(function () {
      jQuery('.sticky_cart').hide()
    }),
      theme_custom.slickSlider(),
      theme.countdown_timer(),
      theme.custom_stickyCart(),
      theme.custom_stickyData()
  })

// Add to cart Addon
jQuery(document).ready(function() {
    jQuery('.product-addon-checkbox').change(function() {
        var productId = jQuery(this).data('product-id');
        var quantity = jQuery(this).is(':checked') ? 1 : 0;

        jQuery.ajax({
            type: 'POST',
            url: '/cart/add.js',
            data: {
                items: [{
                    id: productId,
                    quantity: quantity
                }]
            },
            dataType: 'json',
            success: function() { 
                console.log('Product added to cart');
                // Update cart UI
            },
            error: function() {
                console.log('Could not add product to cart');
                // Handle error
            }
        });
    });
});
