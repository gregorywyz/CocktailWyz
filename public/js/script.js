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

  // CREATE - AJAX call adds drink to favs model
  $('.favs-add-btn').on('submit', function(e) {  // when  + add btn clicked
    e.preventDefault();
    var addBtn = $(this);
    var addURL = $(this).attr('action'); // form action -> /favorites
    var drinkData = $(this).serialize();

    $.ajax({
      method: 'POST',
      url: addURL,
      data: drinkData
    }).done(function() {
      addBtn.addClass('hidden');
      $('.favs-del-btn').removeClass('hidden');
    });
  });

  // CREATE - AJAX call adds drink to shop model
  $('.shop-add-btn').on('submit', function(e) {  // when  - add btn clicked
    e.preventDefault();
    var addBtn = $(this);
    var addURL = $(this).attr('action');  // form action -> /shopping
    var drinkData = $(this).serialize();

    $.ajax({
      method: 'POST',
      url: addURL,
      data: drinkData
    }).done(function() {
      addBtn.addClass('hidden');
      $('.shop-del-btn').removeClass('hidden');
    });
  });


  /*  ASYNC DELETE BUTTON HERE
  ***************************************************************************/

  // DELETE - AJAX call deletes drink from favs model - show page btn
  $('.favs-del-btn').on('submit', function(e) {
    e.preventDefault();
    var delBtn = $(this);

    if (confirm('You will remove this drink from your favorites?')) { // JS alert for confirm
      var delURL = $(this).attr('action'); // form action -> /shopping/:id

      $.ajax({
        method: 'DELETE',
        url: delURL
      }).done(function(data) {
        delBtn.addClass('hidden');
        $('.favs-add-btn').removeClass('hidden');
      });
    };
  });

  // DELETE - AJAX call deletes drink from shop model - show page btn
  $('.shop-del-btn').on('submit', function(e) {
    e.preventDefault();
    var delBtn = $(this);

    if (confirm('You will remove this drink from your shopping list?')) {
      var delURL = $(this).attr('action');  // form action -> /shopping/:id

      $.ajax({
        method: 'DELETE',
        url: delURL
      }).done(function(data) {
        delBtn.addClass('hidden');
        $('.shop-add-btn').removeClass('hidden');
      });
    };
  });

  // DELETE - AJAX call deletes drink from favs model - favs page btn
  $('.favs-page-del-btn').on('click', function(e) {
    e.preventDefault();
    var delBtn = $(this);

    if (confirm('You will remove this drink from your favorites?')) {
      var delURL = $(this).attr('href');  // form action -> /favorites/:id
      $.ajax({
        method: 'DELETE',
        url: delURL
      }).done(function(data) {
        delBtn.closest('tr').fadeOut('slow', function() {
          $(this).remove();
        });
      });
    };
  });

  // DELETE - AJAX call removes of drink from shop model - shopping page btn
  $('.shop-page-del-btn').on('click', function(e) {
    e.preventDefault();
    var delBtn = $(this);

    if (confirm('You will remove this drink from your shopping list?')) {
      var delURL = $(this).attr('href');
      $.ajax({
        method: 'DELETE',
        url: delURL
      }).done(function(data) {

        delBtn.closest('div').fadeOut('slow', function() {
          $(this).remove();
        });
      });
    };
  });





}); // END OF DOC READY

