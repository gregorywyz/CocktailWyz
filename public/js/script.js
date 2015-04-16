$(function() {

  console.log('--- document ready ---');



/*  ASYNC ADD BUTTON HERE
***************************************************************************/

// // POST - AJAX call to login
// $('.login-modal').on('submit', function(e) {
//   e.preventDefault();
//   var loginBtn = $(this);
//   var loginURL = $(this).attr('action');
//   var loginData = $(this).serialize;

//   $.ajax({
//     method: 'POST',
//     url: loginURL,
//     data: loginData
//   })
// })



/*  ASYNC ADD BUTTON HERE
***************************************************************************/

// POST - AJAX call add drink to favs
$('.favs-add-btn').on('submit', function(e) {
  e.preventDefault();
  var addBtn = $(this);
  var addURL = $(this).attr('action');
  var drinkData = $(this).serialize();

  $.ajax({
    method: 'POST',
    url: addURL,
    data: drinkData
  }).done(function() {
    addBtn.addClass('hidden');
    $('.favs-del-btn').removeClass('hidden');
    // do cool stuff here
  });
});

// POST - AJAX call add drink to shopping list
$('.shop-add-btn').on('submit', function(e) {
  e.preventDefault();
  var addBtn = $(this);
  var addURL = $(this).attr('action');
  var drinkData = $(this).serialize();
  console.log('clicked add to shopping list button');

  $.ajax({
    method: 'POST',
    url: addURL,
    data: drinkData
  }).done(function() {
    console.log('done with AJAX call for shopping list');
    addBtn.addClass('hidden');
    $('.shop-del-btn').removeClass('hidden');
    // do cool stuff here
  });
});


/*  ASYNC DELETE BUTTON HERE
***************************************************************************/

// DELETE - AJAX call remove of drink from favs - show page
$('.favs-del-btn').on('submit', function(e) {
  e.preventDefault();
  var delBtn = $(this);
  console.log('Clicked and ready to delete');// LOG

  if (confirm('You will remove this drink from your favorites?')) {
    var delURL = $(this).attr('action');
    $.ajax({
      method: 'DELETE',
      url: delURL
    }).done(function(data) {
      console.log('AJAX done, item deleted');// LOG
      delBtn.addClass('hidden');
      $('.favs-add-btn').removeClass('hidden');
      // do cool stuff here
    });
  };
});

// DELETE - AJAX call remove of drink from shopping - show page
$('.shop-del-btn').on('submit', function(e) {
  e.preventDefault();
  var delBtn = $(this);
  console.log('Clicked and ready to delete');// LOG

  if (confirm('You will remove this drink from your shopping list?')) {
    var delURL = $(this).attr('action');
    console.log('delURL',delURL); // LOG
    $.ajax({
      method: 'DELETE',
      url: delURL
    }).done(function(data) {
      console.log('AJAX done, item deleted');// LOG
      delBtn.addClass('hidden');
      $('.shop-add-btn').removeClass('hidden');
      // do cool stuff here
    });
  };
});

// DELETE - AJAX call remove of drink from favs - favs page
$('.favs-page-del-btn').on('click', function(e) {
  e.preventDefault();
  var delBtn = $(this);
  console.log('Clicked and ready to delete');// LOG

  if (confirm('You will remove this drink from your favorites?')) {
    var delURL = $(this).attr('href');
    $.ajax({
      method: 'DELETE',
      url: delURL
    }).done(function(data) {
      console.log('AJAX done, item deleted');// LOG
      delBtn.closest('tr').fadeOut('slow', function() {
        $(this).remove();
        // do cool stuff here
      });
    });
  };
});

// DELETE - AJAX call remove of drink from shopping - shopping page
$('.shop-page-del-btn').on('click', function(e) {
  e.preventDefault();
  var delBtn = $(this);
  console.log('Clicked and ready to delete');// LOG

  if (confirm('You will remove this drink from your shopping list?')) {
    var delURL = $(this).attr('href');
    $.ajax({
      method: 'DELETE',
      url: delURL
    }).done(function(data) {
      console.log('AJAX done, item deleted');// LOG
      delBtn.closest('li').fadeOut('slow', function() {
        $(this).remove();
        // do cool stuff here
      });
    });
  };
});







}); // END OF DOC READY

