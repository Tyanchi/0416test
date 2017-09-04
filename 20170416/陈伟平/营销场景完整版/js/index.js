document.addEventListener("touchstart", function (ev) {
  var ev = ev || event;
  ev.preventDefault();
});
//rem适配
(function () {
  var styleNode = document.createElement("style");
  var width = document.documentElement.clientWidth / 16 + "px";
  styleNode.innerHTML = "html{font-size:" + width + "px!important}";
  document.head.appendChild(styleNode);
})()
window.onload = function () {
  //定义元素标签
  var oc = document.getElementById("guaguaka");
  var wrapUl = document.querySelector("#wrapUl")
  var liNodes = document.querySelectorAll("#wrapUl > li")
  var wrapNode = document.querySelector("#wrap")
  var proverbsNode = document.querySelector("#wrapUl .proverbs")
  var proverbsP = document.querySelectorAll("#wrapUl .proverbs>p")
  var courseLis = document.querySelectorAll(".course>li")
  var oc = document.querySelector("#guaguaka");
  var adNode = document.querySelector("#wrapUl .ad")
  var textContainer = document.querySelector("#textContainer");
  var textNodes = document.querySelectorAll("#textContainer>.text1");
  //定义固定变量
  var index = 0;
  var oldIndex = 0;
  var startC = 0;
  var startY = 0;
  var flag = true;
  var s = 0;
  var z_index = 0;
  var moveX = 0;
  var moveZ = 0;
  var flag2 = false;
  var flag3 = false;
  //开场刮刮卡动画
  wow()

  function wow() {

    oc.width = document.documentElement.clientWidth;
    oc.height = document.documentElement.clientHeight;
    if (oc.getContext) {
      var ctx = oc.getContext("2d");

      var img = new Image();
      img.src = "../images/a.png";
      img.onload = function () {
        draw(this);
      }
    }

    function draw(img) {
      ctx.drawImage(img, 0, 0, oc.width, oc.height);
        
      oc.addEventListener('touchstart', function (ev) {
        var ev = ev || event;
         ev.preventDefault()
        var touchC = ev.changedTouches[0];

        var x = touchC.clientX - this.offsetLeft;
        var y = touchC.clientY - this.offsetTop;

        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 50;
        ctx.lineCap = "round";

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + 1, y + 1);
        ctx.stroke();


      });
      oc.addEventListener('touchmove', function (ev) {
        var ev = ev || event;
         ev.preventDefault()
        var touchC = ev.changedTouches[0];

        var x = touchC.clientX - this.offsetLeft;
        var y = touchC.clientY - this.offsetTop;

        ctx.lineTo(x, y);
        ctx.stroke();
      });
      oc.addEventListener("touchend", function (ev) {
        var ev = ev || event;
        ev.preventDefault();
         ev.stopPropagation();
        var imgData = ctx.getImageData(0, 0, oc.width, oc.height);
        var flag = 0;
        var allPx = imgData.width * imgData.height;
        for (var i = 0; i < allPx; i++) {
          if (imgData.data[4 * i + 3] == 0) {
            flag++;
          }
        }


        if (flag > allPx / 2) {
          oc.style.opacity = 0;
        }

      })

      oc.addEventListener("transitionend", function (ev) {
         var ev = ev || event;
        ev.preventDefault();
        ev.stopPropagation();
        this.remove();
for (var i = 0; i < proverbsP.length; i++) {
  proverbsP[i].style.transition = "1s all";
          proverbsP[i].style.transform = "translate(0)";
          proverbsP[i].style.opacity = 1;

        }
      })
    }
  }
  //第一幕


  first();

  function first() {
    wrapNode.addEventListener("touchstart", function (ev) {
      var ev = ev || event;
      ev.preventDefault();
      for (var i = 0; i < proverbsP.length; i++) {
        proverbsP[i].style.transition = "none";
      }
    })

    wrapNode.addEventListener("touchend", function (ev) {
      var ev = ev || event;
      ev.preventDefault();
      for (var i = 0; i < proverbsP.length; i++) {
        proverbsP[i].style.transition="none"
        proverbsP[0].style.transform = "translateX(300px)";
        proverbsP[2].style.transform = "translate(300px)";
        proverbsP[1].style.transform = "translateX(-300px)";
        proverbsP[3].style.transform = "translate(-320px)";
        proverbsP[i].style.opacity = 0;
      }
      setTimeout(function () {
        for (var i = 0; i < proverbsP.length; i++) {
          proverbsP[i].style.transform = "translate(0)";
          proverbsP[i].style.opacity = 1;
          proverbsP[i].style.transition = "1s all";

        }
      }, 20)
    })
  }

  //第二幕
  second()

  function second(ev) {
    var ev = ev || event;
    ev.stopPropagation();
    for (var i = 0; i < courseLis.length; i++) {
      courseLis[i].style.backgroundImage = "url(../images/c" + (i + 1) + ".png)";
      courseLis[i].style.backgroundSize="100% 100%"
      wrapNode.addEventListener("touchstart", function () {
        for (var i = 0; i < courseLis.length; i++) {
          courseLis[i].style.transition = "none"
        }
      })
      wrapNode.addEventListener("touchend", function (ev) {
        var ev = ev || event;
        ev.stopPropagation();
        for (var i = 0; i < courseLis.length; i++) {
          courseLis[i].style.top = "53%";
          courseLis[i].style.left = "37%";
          courseLis[i].style.transform = "rotate(0deg)";
        }
        setTimeout(function () {
          for (var i = 0; i < courseLis.length; i++) {
            courseLis[i].style.transition = "1s all";
            courseLis[i].style.transform = "rotate(720deg)";
          }
          courseLis[0].style.top = "30%";
          courseLis[0].style.left = "43%";
          courseLis[1].style.top = "40%";
          courseLis[1].style.left = "13%";
          courseLis[2].style.top = "40%";
          courseLis[2].style.left = "73%";
          courseLis[3].style.top = "65%";
          courseLis[3].style.left = "13%";
          courseLis[4].style.top = "65%";
          courseLis[4].style.left = "73%";
          courseLis[5].style.top = "75%";
          courseLis[5].style.left = "43%";
        }, 20)
      })


    }

  }

  //第三幕
  third()

  function third(ev) {
    var ev = ev || event;
    ev.stopPropagation();
    wrapNode.addEventListener("touchstart",function(ev){
         var ev = ev || event;
      ev.preventDefault();
      adNode.style.transition = "none"
    })
    wrapNode.addEventListener("touchend", function (ev) {
      var ev = ev || event;
      ev.preventDefault();
      adNode.style.transform = "rotateY(720deg)";
         setTimeout(function () {
           adNode.style.transition = "1s transform"
            adNode.style.transform = "rotateY(0deg)"
         },20)
    })

  }
  //第四幕
  fourth()
  function fourth(ev){
       var ev = ev || event;
    ev.stopPropagation();
    wrapNode.addEventListener("touchstart",function(ev){
         var ev = ev || event;
      ev.preventDefault();
console.log(textNodes.length)
      for( var i=0;i<textNodes.length;i++){
        textNodes[i].style.transition = "none"
      }
    })
    wrapNode.addEventListener("touchend", function (ev) {
      var ev = ev || event;
      ev.preventDefault();
      for( var i=0;i<textNodes.length;i++){
        textNodes[i].style.transform = "scale(0)"
      }
         setTimeout(function () {
      
          for( var i=0;i<textNodes.length;i++){
                 textNodes[i].style.transition = "1s transform"
        textNodes[i].style.transform = "scale(1)"
      }   
         },20)
    })
  }
  //屏幕滑动事件
  move()

  function move() {
    liNodes[index].style.visibility = "visible";
    wrapUl.addEventListener("touchstart", function (ev) {
      if (!flag) {
        return
      }

      var ev = ev || event;
      ev.preventDefault();
      var touchC = ev.changedTouches[0];
      startX = touchC.clientX;
      startY = touchC.clientY;
      oldIndex = index;
      moveX = 0;
      moveZ = 0;
      s = 0;
      liNodes[index].style.transition = "none";
      liNodes[oldIndex].style.transition = "none"
    })
    wrapUl.addEventListener("touchmove", function (ev) {
      if (!flag) {
        return
      }
      flag2 = true;
      flag3 = true;
      var ev = ev || event;
      var touchC = ev.changedTouches[0];
      var nowX = touchC.clientX;
      var nowY = touchC.clientY;
      var moveY = nowY - startY;
      s = document.documentElement.clientHeight/(document.documentElement.clientHeight+Math.abs(moveY));
      if (moveY > 0) {

        index = oldIndex - 1;
        console.log(index, oldIndex)
        if (oldIndex !== 0) {
          index = oldIndex - 1;
        } else {
          index = liNodes.length - 1;
        }
        // if(index<0){
        //       index = liNodes.length-1
        // }
        liNodes[index].style.top = -wrapNode.offsetHeight + "px"
      } else if (moveY < 0) {

        if (oldIndex !== liNodes.length - 1) {
          index = oldIndex + 1;
        } else {
          index = 0;
        }
        console.log(index, oldIndex)
        //  if(index>liNodes.length-1){
        //       index = 0
        // }
        liNodes[index].style.top = wrapNode.offsetHeight + "px"
      }

      liNodes[index].style.zIndex = 6;
      for (var i = 0; i < liNodes.length; i++) {
        liNodes[i].style.visibility = "hidden";
      }
      liNodes[oldIndex].style.visibility = "visible";
      liNodes[index].style.visibility = "visible";
      css(liNodes[oldIndex], "translateY", moveY / 2)
      css(liNodes[oldIndex], "scale", s)
      //  css(liNodes[oldIndex],"translateX",Math.abs(moveY/5))
      //   css(liNodes[oldIndex],"translateZ",-Math.abs(moveY/5))
      css(liNodes[index], "translateY", moveY)

    })
    wrapUl.addEventListener("touchend", function (ev) {
      if (!flag) {
        return
      }
      if (!flag2) {
        return
      }
      flag2 = false;
      flag = false;
      var ev = ev || event;
      if (oldIndex > index) {
        liNodes[index].style.transition = "0.3s ";
        if (index == 0 && oldIndex == liNodes.length - 1) {
          css(liNodes[index], "translateY", -wrapNode.offsetHeight)
        } else {
          css(liNodes[index], "translateY", wrapNode.offsetHeight)
        }

      } else if (oldIndex < index) {
        liNodes[index].style.transition = "0.3s";
        if (oldIndex == 0 && index == liNodes.length - 1) {
          css(liNodes[index], "translateY", wrapNode.offsetHeight)
        } else {
          css(liNodes[index], "translateY", -wrapNode.offsetHeight)
        }
      }
      liNodes[oldIndex].style.transition = "0.3s"
      css(liNodes[oldIndex], "scale", 0.85)
      liNodes[index].addEventListener("transitionend", function (ev) {
        var ev = ev || event;
        ev.preventDefault();
        ev.stopPropagation();
        if (!flag3) {
          return
        }
        flag3 = false;
        for (var i = 0; i < liNodes.length; i++) {
          liNodes[i].style.transition = "none";
        }
        liNodes[oldIndex].style.transition = "none"
        liNodes[oldIndex].style.visibility = "hidden";
        liNodes[oldIndex].style.top = 0;
        liNodes[index].style.top = 0;
        liNodes[index].style.zIndex = 5;
        css(liNodes[index], "translateY", 0)
        css(liNodes[oldIndex], "translateY", 0)
        css(liNodes[oldIndex], "scale", 1)
        flag = true;

        // if (index === 0) {
        //   for (var i = 0; i < proverbsP.length; i++) {
        //     proverbsP[i].style.transition = "1s all"
        //     proverbsP[i].style.transform = "translate(0)";
        //     proverbsP[i].style.opacity = 1;
        //   }
       // } else 
      if (index === 1) {
          for (var i = 0; i < courseLis.length; i++) {
            courseLis[i].style.transition = "1s all";
            courseLis[i].style.transform = "rotate(720deg)";
          }
          courseLis[0].style.top = "30%";
          courseLis[0].style.left = "43%";
          courseLis[1].style.top = "40%";
          courseLis[1].style.left = "13%";
          courseLis[2].style.top = "40%";
          courseLis[2].style.left = "73%";
          courseLis[3].style.top = "65%";
          courseLis[3].style.left = "13%";
          courseLis[4].style.top = "65%";
          courseLis[4].style.left = "73%";
          courseLis[5].style.top = "75%";
          courseLis[5].style.left = "43%";

        }
        // if (oldIndex === 0) {

        //   for (var i = 0; i < proverbsP.length; i++) {
        //     proverbsP[i].style.transition = "none"
        //     proverbsP[0].style.transform = "translateX(300px)";
        //     proverbsP[2].style.transform = "translate(300px)";
        //     proverbsP[1].style.transform = "translateX(-300px)";
        //     proverbsP[3].style.transform = "translate(-320px)";
        //     proverbsP[i].style.opacity = 0
        //   }
        //} else 
      if (oldIndex === 1) {
          for (var i = 0; i < courseLis.length; i++) {
            courseLis[i].style.transition = "none"
            courseLis[i].style.top = "53%";
            courseLis[i].style.left = "37%";
            courseLis[i].style.transform = "rotate(0deg)";
          }
        }

      

      })
    })
    liNodes[index].style.visibility = "visible";
  }


}