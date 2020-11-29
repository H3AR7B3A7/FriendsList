// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)


import Rails from "@rails/ujs";

// Overrides default rails confirmation with bootstrap 4 confirm dialog
Rails.confirm = function(message, element) {
  let $element = $(element)
  let $dialog = $('#confirmation-modal')
  let $content = $dialog.find('#modal-content')
  let $ok = $dialog.find('#ok-button')
  $content.text(message)
  $ok.click(function(event) {
      event.preventDefault()
      $dialog.modal("hide")
      let old = Rails.confirm
      Rails.confirm = function() { return true }
      $element.get(0).click()
      Rails.confirm = old
    })
  $dialog.modal("show")
  return false;
}