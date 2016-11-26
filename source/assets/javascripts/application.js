/* eslint-disable */
//= require vendor/velocity.min
//= require vendor/velocity.ui.min
//= require vendor/ScrollMagic.min
//= require vendor/plugins/jquery.ScrollMagic.min
//= require vendor/plugins/animation.velocity.min
//= require vendor/plugins/debug.addIndicators.min
/* eslint-enable */

// Canvas drawing script
function drawCanvas() {
  var canvas = document.getElementById('stars-bg')
  var ctx = canvas.getContext('2d')
  var xMax = canvas.width = window.screen.availWidth
  var yMax = canvas.height = window.screen.availHeight
  var numberOfStars = Math.round(xMax + yMax)

  for (var i = 0; i <= numberOfStars; i++) {
    var randomX = Math.floor((Math.random() * xMax) + 1)
    var randomY = Math.floor((Math.random() * yMax) + 1)
    var randomSize = Math.floor((Math.random() * 2) + 1)
    var randomOpacityOne = Math.floor((Math.random() * 9) + 1)
    var randomOpacityTwo = Math.floor((Math.random() * 2) + 1)
    var randomHue = Math.floor((Math.random() * 360) + 1)
    if (randomSize > 1) {
      ctx.shadowBlur = Math.floor((Math.random() * 2) + 5)
      ctx.shadowColor = 'white'
    }
    ctx.fillStyle = 'hsla(' + randomHue + ', 30%, 95%, .' + randomOpacityOne + randomOpacityTwo + ')'
    ctx.fillRect(randomX, randomY, randomSize, randomSize)
  }
}

// bind anchor links
function bindAnchorLink(e) {
  var id = $(this).attr('href')
  if ($(id).length > 0) {
    e.preventDefault()
    controller.scrollTo(function(newScrollPos) {
      $('html, body').animate({scrollTop: newScrollPos})
    })

    // trigger scroll
    controller.scrollTo(id)
    // if supported by the browser we can even update the URL.
    if (window.history && window.history.pushState) {
      window.history.pushState('', document.title, id)
    }
  }
}

// Global Vars
var ScrollMagic = ScrollMagic || {}
var controller = new ScrollMagic.Controller({
  globalSceneOptions: {triggerHook: 'onLeave'}
})

$(function() {
  drawCanvas()

  var slides = document.querySelectorAll('.section')
  var slideContents = document.querySelectorAll('.section__inner')
  var offsetHeight = $(window).height() * 0.75

  // Create a scene for each slide
  for (var i = 0; i < slides.length; i++) {
    new ScrollMagic.Scene({triggerElement: slides[i]})
      .setPin(slides[i])
      .addIndicators()
      .addTo(controller)
  }

  // Create a scene for each slide contents
  for (var j = 0; j < slideContents.length; j++) {
    new ScrollMagic.Scene({triggerElement: slides[j]})
      .setVelocity(slideContents[j], {opacity: 0}, { duration: 300 })
      .offset(offsetHeight)
      .addIndicators()
      .addTo(controller)
  }
})

//  bind scroll to anchor links
$(document).on('click', "a[href^='#']", bindAnchorLink)
