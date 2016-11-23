/* eslint-disable */
//= require vendor/velocity.min
//= require vendor/velocity.ui.min
//= require vendor/ScrollMagic.min
//= require vendor/plugins/jquery.ScrollMagic.min
//= require vendor/plugins/animation.velocity.min
//= require vendor/plugins/debug.addIndicators.min
/* eslint-enable */

var ScrollMagic = ScrollMagic || {}

$(function() { // wait for document ready
  // init
  var controller = new ScrollMagic.Controller({
    globalSceneOptions: {
      triggerHook: 'onLeave'
    }
  })

  // get all slides
  var slides = document.querySelectorAll('.section')

  // create scene for every slide
  for (var i = 0; i < slides.length; i++) {
    new ScrollMagic.Scene({
      triggerElement: slides[i]
    })
      .setPin(slides[i])
      // .setVelocity(slides[i], {opacity: 0}, {duration: 400})
      .addIndicators() // add indicators (requires plugin)
      .addTo(controller)
  }
})
