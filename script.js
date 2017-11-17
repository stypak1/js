window.onload = function() {
  var leftBall = document.querySelector('.left-field img');
  var rightBall = document.querySelector('.right-field img');
  var cart = document.querySelector('.cart-wrapper img');
  var cartField = document.querySelector('.cart-wrapper');
  var points = document.querySelector('.points');
  var pointsCounter = 0;

  // moving balls
  moveLeftBallStepOne();
  moveRightBallStepOne();

  // move left ball
  var leftBallOffsetFromLeft = 5;
  var leftBallOffsetFromTop = 0;
  var leftBallRotate = 0;

  function moveLeftBallStepOne() {
    var animate = requestAnimationFrame(moveLeftBallStepOne);
    leftBall.style.display = 'inline';
    leftBall.style.top = leftBallOffsetFromTop + '%';
    leftBall.style.left = leftBallOffsetFromLeft + '%';
    leftBall.style.transform = 'rotate(' + leftBallRotate + 'deg)';
    leftBallOffsetFromLeft += 1;
    leftBallRotate += 7;
    if (leftBall.style.left == '100%') {
      cancelAnimationFrame(animate);
      moveLeftBallStepTwo();
    }
  }

  function moveLeftBallStepTwo() {
    var animate = requestAnimationFrame(moveLeftBallStepTwo);
    leftBall.style.top = leftBallOffsetFromTop + '%';
    leftBall.style.left = leftBallOffsetFromLeft + '%';
    leftBall.style.transform = 'rotate(' + leftBallRotate + 'deg)';
    leftBallOffsetFromLeft += 0.3;
    leftBallOffsetFromTop += 2;
    leftBallRotate += 2;
    if (leftBall.style.top == '340%') {
      cancelAnimationFrame(animate);
      leftBall.style.display = 'none';
      leftBallOffsetFromLeft = 5;
      leftBallOffsetFromTop = 0;
      moveLeftBallStepOne();
    }
  }

  // move right ball
  var rightBallOffsetFromRight = 5;
  var rightBallOffsetFromTop = 0;
  var rightBallRotate = 0;

  function moveRightBallStepOne() {
    var animate = requestAnimationFrame(moveRightBallStepOne);
    rightBall.style.display = 'inline';
    rightBall.style.top = rightBallOffsetFromTop + '%';
    rightBall.style.right = rightBallOffsetFromRight + '%';
    rightBall.style.transform = 'rotate(' + -rightBallRotate + 'deg)';
    rightBallOffsetFromRight += 0.5;
    rightBallRotate += 3;
    if (rightBall.style.right == '100%') {
      cancelAnimationFrame(animate);
      moveRightBallStepTwo();
    }
  }

  function moveRightBallStepTwo() {
    var animate = requestAnimationFrame(moveRightBallStepTwo);
    rightBall.style.top = rightBallOffsetFromTop + '%';
    rightBall.style.right = rightBallOffsetFromRight + '%';
    rightBall.style.transform = 'rotate(' + -leftBallRotate + 'deg)';
    rightBallOffsetFromRight += 0.2;
    rightBallOffsetFromTop += 4;
    rightBallRotate += 2;
    if (rightBall.style.top == '340%') {
      rightBall.style.display = 'none';
      cancelAnimationFrame(animate);
      rightBallOffsetFromRight = 5;
      rightBallOffsetFromTop = 0;
      moveRightBallStepOne();
    }
  }

  // cart moving
  cart.onmousedown = function(e) {
    var cartCoords = getCoords(cart);
    var shiftX = e.pageX - cartCoords.left;
    var cartFieldCoords = getCoords(cartField);

    document.onmousemove = function(e) {
      var newLeft = e.pageX - shiftX - cartFieldCoords.left;

      if (newLeft < 0) {
        newLeft = 0;
      }
      var rightEdge = cartField.offsetWidth - cart.offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      cart.style.left = newLeft + 'px';

      checkHittingInCart();

      function checkHittingInCart() {
        var ball = findBallInCart(e);

        if (!ball) {
          return;
        } else {
          ball.style.display = 'none';
          pointsCounter++;
          points.innerHTML = pointsCounter;
        }
      }

      function findBallInCart(event) {
        cart.hidden = true;
        var elem = document.elementFromPoint(event.clientX, event.clientY);
        cart.hidden = false;
        return elem.closest('.ball');
      }
    };

    document.onmouseup = function() {
      document.onmousemove = document.onmouseup = null;
    };

    return false;
  };

  cart.ondragstart = function() {
    return false;
  };

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };

  }
};
