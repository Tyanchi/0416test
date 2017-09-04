$(function () {
  var dir = {up: 1, down: 2};
  var now = 1;
  var last = 0;

  var isMoving = false;

  $('.page').swipeUp(function () {

    if(isMoving){
      return;
    }
    last = now ;

    if(last < 5){
      now = last + 1;
      movePage(dir.up);
    }
  })


  $('.page').swipeDown(function () {

    if(isMoving){
      return;
    }
    last = now ;

    if(last > 1){
      now = last - 1;
      movePage(dir.down);
    }
  })




  function movePage(dir) {

    var inClass = '' ;
    var outClass = '';

    var nowPage = '.page-' + now;
    var lastPage = '.page-' + last;

    switch(dir){
      case 1://up in
        inClass = '.page-from-bottom';
        outClass = '.page-to-top';
        break;
      case 2://down out

        inClass = '.page-to-bottom';
        outClass = '.page-from-top';
        break;
    }


    $(lastPage).addClass(outClass);
    $(nowPage).addClass(inClass);
    $(nowPage).removeClass('hide')

    isMoving = true ;

    setTimeout(function () {
      $(lastPage).removeClass(outClass);
      $(nowPage).removeClass(inClass);
      $(lastPage).addClass('hide')
      $(lastPage).removeClass('current');
      $(nowPage).addClass('current');

      isMoving = false;

    },1000)
  }
})