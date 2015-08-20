$(function() {

  console.log('--- document ready ---');



  /*  CLIENT SIDE FORM VALIDATIONS
  ***************************************************************************/

  // Cocktail search form
  $('#drink-form').on('submit', function(e) {
    $('.form-msg').remove();
    if ($('#drink-query').val() === '') {
      e.preventDefault();
      $('#drink-query').after('<p class="form-msg">* You must actually type something</p>');
    }
  });

  // New user sign up form
  $('#signup-form').on('submit', function(e) {

    // clear any error messages
    $('.form-highlight').removeClass('form-highlight');
    $('.form-msg').remove();

    // collect form fields
    var email = $('#email');
    var name = $('#name');
    var password = $('#password');
    var pswdConfrm = $('#confirm-password');

    // ensure fields are properly entered or prevent submission
    if (email.val() === '') {
      e.preventDefault();
      email.addClass('form-highlight');
      email.after('<p class="form-msg">* This is a required field</p>');
    };

    if (name.val() === '') {
      e.preventDefault();
      name.addClass('form-highlight');
      name.after('<p class="form-msg">* This is a required field</p>');
    };

    if (password.val() === '') {
      e.preventDefault();
      password.addClass('form-highlight');
      password.after('<p class="form-msg">* This is a required field</p>');
    };

    if (pswdConfrm.val() === '') {
      e.preventDefault();
      pswdConfrm.addClass('form-highlight');
      pswdConfrm.after('<p class="form-msg">* This is a required field</p>');
    };

    if (password.val().length < 4 || password.val().length > 20) {
      e.preventDefault();
      password.addClass('form-highlight');
      password.after('<p class="form-msg">* Password must be between 4 and 20 characters long</p>');
    };

    if (password.val() !== pswdConfrm.val()) {
      e.preventDefault();
      password.addClass('form-highlight');
      pswdConfrm.addClass('form-highlight');
      pswdConfrm.after('<p class="form-msg">* Your passwords did not match</p>');
    };
  });

  // Modal login form
  $('#login-form-m').on('submit', function(e) {

    $('.form-highlight').removeClass('form-highlight');
    $('.form-msg').remove();

    var email = $('#email-m');
    var password = $('#password-m');

    if (email.val() === '') {
      e.preventDefault();
      $('#loginModal').modal('show'); // keeps modal from closing
      email.addClass('form-highlight');
      email.after('<p class="form-msg" style="color:#FDDE3F;">* This is a required field</p>');
    };

    if (password.val() === '') {
      e.preventDefault();
      $('#loginModal').modal('show');
      password.addClass('form-highlight');
      password.after('<p class="form-msg" style="color:#FDDE3F;">* This is a required field</p>');
    };

    if (password.val().length < 4 || password.val().length > 20) {
      e.preventDefault();
      $('#loginModal').modal('show');
      password.addClass('form-highlight');
      password.after('<p class="form-msg" style="color:#FDDE3F;">* Password must be between 4 and 20 characters long</p>');
    };
  });

  // Standard login form
  $('#login-form').on('submit', function(e) {

    $('.form-highlight').removeClass('form-highlight');
    $('.form-msg').remove();

    var email = $('#email');
    var password = $('#password');

    if (email.val() === '') {
      e.preventDefault();
      email.addClass('form-highlight');
      email.after('<p class="form-msg">* This is a required field</p>');
    };

    if (password.val() === '') {
      e.preventDefault();
      password.addClass('form-highlight');
      password.after('<p class="form-msg">* This is a required field</p>');
    };

    if (password.val().length < 4 || password.val().length > 20) {
      e.preventDefault();
      password.addClass('form-highlight');
      password.after('<p class="form-msg">* Password must be between 4 and 20 characters long</p>');
    };
  });


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

