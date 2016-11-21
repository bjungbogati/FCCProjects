$(document).ready(function() {
// ajax api call
  var get = function() {

    $.ajax({
      url: "https://andruxnet-random-famous-quotes.p.mashape.com/cat=famous?callback?",
      headers: {
        'X-Mashape-Key': 'iqlzfqnkfYmshcx2oD4mKkBKYZBbp1gOWiXjsnBt6cX2hdeRbl'
      },
      success: function(data) {
        var quoteObj = JSON.parse(data);
        var quote = quoteObj.quote;
        var author = quoteObj.author;
        $('.quote').html(quote);
        $('.author').html(author);
        $('#tw-share').attr('title', quote + ' via @bjungbogati');
      }
    });
  };

  get(); // calling get function

  $('#refresh').on('click', get);
// twitter popup window
  $('#tw-share').click(function(e) {
    e.preventDefault();

    var loc = $(this).attr('href');
    var title = encodeURIComponent($(this).attr('title'));

    window.open('http://twitter.com/share?url=' + loc + '&text=' + title + '&', 'twitterwindow', 'height=450, width=550, top=' + ($(window).height() / 2 - 225) + ', left=' + $(window).width() / 2 + ', toolbar=0, location=0, menubar=0, directories=0, scrollbars=0');
  });

});