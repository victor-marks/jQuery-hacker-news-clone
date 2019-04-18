$(function() {
  const $submit = $('#submit');
  const $favorites = $('#favorites');
  const $newForm = $('#new-form');
  const $stories = $('#stories');
  const $title = $('#title');
  const $url = $('#url');
  const $clearFilter = $('.navbar-right');
  const $logInForm = $('#login-form');
  const $logInNav = $('#log-in');
  const $createBtn = $('#create-user-btn');

  $submit.on('click', function() {
    $newForm.slideToggle();
  });

  // $logInForm.trigger('click');

  $logInNav.on('click', function() {
    $logInForm.slideToggle();
  });

  let currentUser = new User();

  $("#login-btn").on('click', function(e) {
    e.preventDefault();
    console.log('clicking log in button');
    let newUser = new User(username, password);
    newUser.login(x => {}); // pass in undefined function to avoid
    $logInForm.slideToggle();
  });

  $createBtn.on('click', function() {
    $logInForm.slideToggle();
    console.log($('#username').val());
    User.create(
      $('#username').val(),
      $('#password').val(),
      'name should go here',
      function(newUser) {
        console.log('created user: ', newUser);
      }
    );
  });

  $newForm.on('submit', function(e) {
    e.preventDefault();

    let title = $title.val();
    let url = $url.val();
    let $newLink = $('<a>', {
      text: ` ${title}`,
      href: url,
      target: '_blank'
    });

    // get short hostname: http://foo.bar.baz.com/page.html -> baz.com
    let hostname = $newLink
      .prop('hostname')
      .split('.')
      .slice(-2)
      .join('.');
    let $small = $('<small>', {
      text: `(${hostname})`
    });

    let $star = $('<span>', {
      class: 'far fa-star'
    });

    let $newStory = $('<li>').append($star, $newLink, $small);
    $submit.trigger('click');
    $title.val('');
    $url.val('');

    $stories.append($newStory);
  });

  $stories.on('click', 'small', function(e) {
    let currentHostname = $(e.target).text();
    $stories
      .children('li')
      .filter(function(i, el) {
        return (
          $(el)
            .children('small')
            .text() !== currentHostname
        );
      })
      .hide();

    $stories.addClass('hide-numbers');
    $clearFilter.show();
    $favorites.text('all');
  });

  $stories.on('click', '.far, .fas', function(e) {
    $(e.target).toggleClass('far fas');
  });

  $favorites.on('click', function(e) {
    if ($favorites.text() === 'favorites') {
      $stories
        .children('li')
        .filter(function(i, el) {
          return $(el)
            .children('.fa-star')
            .hasClass('far');
        })
        .hide();
      $stories.addClass('hide-numbers');
      $favorites.text('all');
    } else {
      $stories.children('li').show();
      $stories.removeClass('hide-numbers');
      $favorites.text('favorites');
    }
  });

  //*********************************/

  let topTenList;
  //get top ten stories and post to front page
  StoryList.getStories(list => {
    topTenList = list;
    populatedTopTen(topTenList);
  });

  function populatedTopTen(topTenList) {
    for (let i = 0; i < topTenList.stories.length; i++) {
      let title = topTenList.stories[i].title;
      let url = topTenList.stories[i].url;
      let $newLink = $('<a>', {
        text: ` ${title}`,
        href: url,
        target: '_blank'
      });

      // get short hostname: http://foo.bar.baz.com/page.html -> baz.com
      let hostname = $newLink
        .prop('hostname')
        .split('.')
        .slice(-2)
        .join('.');
      let $small = $('<small>', {
        text: `(${hostname})`
      });

      let $star = $('<span>', {
        class: 'far fa-star'
      });

      let $newStory = $('<li>').append($star, $newLink, $small);
      // $submit.trigger('click');
      $title.val('');
      $url.val('');

      $stories.append($newStory);
    }
  }
});


