window.addEventListener('load', function () {
  // 轮播图
  // 获取元素
  var focus = document.querySelector('.focus');
  var ul = focus.querySelector('ul');
  var ol = focus.querySelector('ol');
  // 动画
  var index = 0;
  var timer = setInterval(function (e) {
    index++;
    var translatex = -index * focus.offsetWidth;
    // 给ul添加过渡效果
    ul.style.transition = 'all .3s';
    // ul移动效果
    ul.style.transform = 'translateX(' + translatex + 'px)';
  }, 2000);
  // 监听过渡完成事件
  ul.addEventListener('transitionend', function () {
    // 无缝滚动
    if (index >= 3) {
      index = 0;
      // 去掉过渡效果
      ul.style.transition = 'none';
      // 从新的index值进行移动
      var translatex = -index * focus.offsetWidth;
      ul.style.transform = 'translateX(' + translatex + 'px)';
    } else if (index < 0) {
      index = 2;
      ul.style.transition = 'none';
      var translatex = -index * focus.offsetWidth;
      ul.style.transform = 'translateX(' + translatex + 'px)';
    }

    // 小圆点跟随变化
    // 将带有current类名的选出然后去掉
    ol.querySelector('.current').classList.remove('current');
    // 将当前索引添加current类名
    ol.children[index].classList.add('current');
  });

  // 手指滑动
  // 触摸事件
  var stratX = 0;
  var moveX = 0;
  var flag = false;
  ul.addEventListener('touchstart', function (e) {
    stratX = e.targetTouches[0].pageX;
    // 停止定时器
    clearInterval(timer);
  });
  // 滑动事件
  ul.addEventListener('touchmove', function (e) {
    moveX = e.targetTouches[0].pageX - stratX;
    var translatex = -index * focus.offsetWidth + moveX;
    // 拖动时不需要过渡效果
    ul.style.transition = 'none';
    ul.style.transform = 'translateX(' + translatex + 'px)';
    // 如果发生移动才会进行判断
    flag = true;
    // 阻止默认行为
    e.preventDefault();
  });
  // 离开事件
  ul.addEventListener('touchend', function (e) {
    if (flag) {
      // 当滑动距离大于50就播放上一张或下一张
      if (Math.abs(moveX) > 50) {
        // 右滑moveX为正值
        if (moveX > 0) {
          index--;
        } else {
          // 左滑moveX为负值
          index++;
        }
        var translatex = -index * focus.offsetWidth;
        // 给ul添加过渡效果
        ul.style.transition = 'all .3s';
        // ul移动效果
        ul.style.transform = 'translateX(' + translatex + 'px)';
      } else {
        var translatex = -index * focus.offsetWidth;
        // 给ul添加过渡效果
        ul.style.transition = 'all .1s';
        // ul移动效果
        ul.style.transform = 'translateX(' + translatex + 'px)';
      }
    }
    // 开启定时器
    clearInterval(timer);
    timer = setInterval(function (e) {
      index++;
      var translatex = -index * focus.offsetWidth;
      // 给ul添加过渡效果
      ul.style.transition = 'all .3s';
      // ul移动效果
      ul.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
  });
  // 返回顶部
  var goBack = document.querySelector('.goBack');
  var nav = document.querySelector('nav');
  window.addEventListener('scroll', function (e) {
    if (window.pageYOffset >= nav.offsetTop) {
      goBack.style.display = 'block';
    } else {
      goBack.style.display = 'none';
    }
  });
  goBack.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
});
