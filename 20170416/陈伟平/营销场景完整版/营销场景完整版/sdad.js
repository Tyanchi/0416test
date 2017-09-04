function move() {
    z_index--;
    liNodes[0].style.visibility = "visible";
    wrapNode.addEventListener("touchstart", function (ev) {
      var ev = ev || event;
      var touchC = ev.changedTouches[0];
      startX = touchC.clientX;
      startY = touchC.clientY;
    })
    wrapNode.addEventListener("touchmove", function (ev) {

      var ev = ev || event;
      var touchC = ev.changedTouches[0];
      var nowX = touchC.clientX;
      var nowY = touchC.clientY;
     
      if (flag) {
          oldIndex = index;
         
        flag =false;
        if (nowY > startY) {
          index--
          if(index<0){
          index=liNodes.length-1
          }
        }
        else if (nowY < startY) {
          index++
          if(index>(liNodes.length-1)){
              index =0;
          }
        }
          if(oldIndex>index){
            liNodes[index].style.top = -wrapNode.offsetHeight+"px";
          //css(liNodes[index],"translateY",-wrapNode.offsetHeight)
       }else if(oldIndex===0&&index===liNodes.length-1){
        liNodes[index].style.top = wrapNode.offsetHeight+"px";
       }
        else if(oldIndex<index){
         liNodes[index].style.top = wrapNode.offsetHeight+"px";
          //css(liNodes[index],"translateY",wrapNode.offsetHeight)
       }
        else if(oldIndex===liNodes.length-1&&index===0){
          liNodes[index].style.top = -wrapNode.offsetHeight+"px";
        }
        
        for(var i=0;i<liNodes.length;i++){
        liNodes[i].style.visibility = "hidden";
        }
      liNodes[oldIndex].style.visibility = "visible";
      liNodes[index].style.visibility = "visible";
      }
      var moveC = nowY-startY;
      css(liNodes[index],"translateY",moveC)
      css(liNodes[oldIndex],"translateY",moveC)
      css(liNodes[oldIndex],"translateZ",z_index)
      
    })
    wrapNode.addEventListener("touchend", function (ev) {
      flag = true;
      var ev = ev || event;
    })
  }