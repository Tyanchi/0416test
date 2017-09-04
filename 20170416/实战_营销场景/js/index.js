

$(function () {
  //定义初始化方向
  var direction = {up : 1 , down : 2 };
  var now = 1;  //竖向   横向
  var last = 0;

  //向上滑
  $('.page').swipeUp(function () {
    //将出场页面的坐标赋值给进场页面坐标
    last = now;

    //判断向上滑动的条件与临界点
    if(last<5){
      //得到进场的页面坐标    由出场页面坐标加1
      now = last + 1;
      movePage(direction.up);
    }else{
      now = 1;
      last = 5;
      movePage(direction.up);
    }
    console.log(last,now);

  })


  //向下滑
  $('.page').swipeDown(function () {

    //将出场页面坐标赋值给进场页面坐标
    last = now;

    //判断向下滑动临界点
    if(last>1){
      //得到进场页面坐标
      now = last - 1;
      movePage(direction.down);
    }else{
      now = 5;
      last = 1;
      movePage(direction.down);
    }
    console.log(last,now);
  })



  //定义动画函数
  function movePage(dir) {

    //定义进出场动画
    var inClass = '';
    var outClass = '';

    //定义进出场初始化页面
    var nowPage = '.page-' + now;
    var lastPage = '.page-' + last;


    //定义4个方向的动画
    switch (dir){
      case direction.up:
        inClass = 'page-moveFromBottom';
        outClass = 'page-moveToTop';
        break;
      case direction.down:
        inClass = 'page-moveFromTop';
        outClass = 'page-moveToBottom';
        break;
    }

    //给进出场页面添加添加动画类
    $(lastPage).addClass(outClass);
    $(lastPage).addClass('scale');
    $(nowPage).addClass(inClass);

    //进场页面移除隐藏类
    $(nowPage).removeClass('hide');
    $(nowPage).addClass('page_current');


    //动画执行完    滑动后添加上了动画类在滑动就不会再添加了  所以滑动依次后移除刚添加的动画类
    setTimeout(function () {

      $(lastPage).removeClass(outClass);
      $(lastPage).removeClass('page_current');
      $(lastPage).removeClass('scale');
      $(lastPage).find('img').addClass('hide');
      $(lastPage).find('div').addClass('hide');
      $(lastPage).find('li').addClass('hide');
      //出场了就该隐藏
      $(nowPage).removeClass(inClass);
      $(nowPage).removeClass(inClass);
      $(nowPage).addClass('page_current');
      $(nowPage).find('img').removeClass('hide');
      $(nowPage).find('div').removeClass('hide');
      $(nowPage).find('li').removeClass('hide');


    },800)

  };

  var music = document.querySelector('#wrap .music');
  var mAudio = document.querySelector('#wrap .music audio');
  var oc = document.querySelector('#oc');
  oc.width = document.documentElement.clientWidth;
  oc.height = document.documentElement.clientHeight;

  if(oc.getContext){

    var ctx = oc.getContext('2d');

    var img = new Image();
    img.src = "img/a.png";
    img.onload = function(){
      drag(this);
    }
  }

  //img函数
  function drag(img){
    ctx.drawImage(img, 0, 0, oc.width, oc.height);

    oc.addEventListener('touchstart',function(ev){

      var touchC = ev.changedTouches[0];
      var x = touchC.clientX - this.offsetLeft;
      var y = touchC.clientY - this.offsetTop;

      ctx.lineWidth = 20;
      ctx.lineCap = 'round';
      //只留下目标超过源的部分
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.moveTo(x,y)
      ctx.lineTo(x,y);
      ctx.stroke();

    });

    oc.addEventListener('touchmove',function(ev){
      var touchC = ev.changedTouches[0];
      var x = touchC.clientX - this.offsetLeft;
      var y = touchC.clientY - this.offsetTop;

      ctx.lineTo(x,y);
      ctx.stroke();

    });

    oc.addEventListener('touchend',function(){

      var imgData = ctx.getImageData(0,0,oc.width,oc.height);

      //所有的像素点
      var allPx = imgData.width*imgData.height;
      var flag = 0
      for(var i=0;i<allPx;i++){
        //imgData.data  整个区域内像素点rgba的数组
        if(imgData.data[4*i+3]==0){
          flag++;
        }
      };
      if(flag>allPx/2){
        oc.style.opacity = 0;
      }

    });

    //当元素发生过渡之后触发该事件   删除canvas
    oc.addEventListener('transitionend',function(){
      this.remove();
      mAudio.play();
      mAudio.className = 'page-moveMusic';
      music.onclick = function(){
        if(mAudio.paused){
          mAudio.play();
        }else{
          mAudio.pause();
        }
      }

    });

  }


});