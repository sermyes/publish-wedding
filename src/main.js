$(document).ready(function () {
  scrollNav();
  // nav scroll function

  const mainSlide = $(".mainSlide");
  const subSlide = $(".subSlide");
  mySlide(mainSlide);
  mySlide(subSlide);
  // mySlide function

  countDown("12/26/2021 00:00 PM");
  // countDown function

  filterGallery();
  // galleryFilter function

  animateScroll();
  // scrollAnimate function
});

function scrollNav() {
  const $headerNav = $("header div nav ul li");
  const $footNav = $("footer div ul li");
  const scroll_duration = 1000;
  let areaId = "";

  $headerNav.eq(0).addClass("active");

  $headerNav.click(function (e) {
    e.preventDefault();
    $(this).addClass("active").siblings().removeClass("active");
    areaId = $(this).attr("data-nav");
    moveScroll();
  });

  $footNav.click(function (e) {
    e.preventDefault();
    areaId = $(this).attr("data-nav");
    moveScroll();
  });

  function moveScroll() {
    let areaDistance = $("#" + areaId).offset().top;
    if (areaId == "home") {
      $("html, body").stop().animate(
        {
          scrollTop: 0,
        },
        scroll_duration
      );
    } else {
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: areaDistance - 100,
          },
          scroll_duration
        );
    }
  }
}
// nav scroll function

function mySlide(container) {
  const $slideContainer = container;
  const $slideGroup = $slideContainer.find(".slideGroup"); // ul
  const $slide = $slideGroup.find("li"); // li
  const slideCount = $slide.length; // li 갯수
  const slideName = $slideContainer.attr("data-slide");
  const $pagerGroup = $slideContainer.find(".pagerGroup"); // ol
  const $pager = $pagerGroup.find("li"); // li
  const duration = 500; // slide 변환속도
  const interval = 5000; // autoSlide interval
  let timer = 0;
  let currentIndex = 0; // 현재 slide index위치
  // Slide variable

  if (slideName === "mainSlide") {
    stopSlide();
    autoSlide();
  }

  $slide.each(function (i) {
    let newLeft = i * 100 + "%";
    $(this).css({
      left: newLeft,
    });
    // slide position 배치
  });

  $pager.eq(0).addClass("active"); // 첫번쨰 pager button active.

  $pager.click(function (e) {
    var index = $(this).index();
    e.preventDefault();

    goToSlide(index);
  });

  function autoSlide() {
    startSlide();
    $slideContainer
      .mouseenter(function () {
        stopSlide();
      })
      .mouseleave(function () {
        startSlide();
      });
  }

  function startSlide() {
    timer = setInterval(function () {
      let nextIndex = (currentIndex + 1) % slideCount;
      goToSlide(nextIndex);
    }, interval);
  }

  function stopSlide() {
    clearInterval(timer);
  }

  function goToSlide(index) {
    let newLeft = -100 * index + "%";

    if (currentIndex > index && currentIndex - index >= 2) {
      let preLeft = -100 * (index + 1) + "%";
      $slideGroup.css({
        left: preLeft,
      });
    }
    if (index > currentIndex && index - currentIndex >= 2) {
      let preLeft = -100 * (index - 1) + "%";
      $slideGroup.css({
        left: preLeft,
      });
    }

    $slideGroup.animate(
      {
        left: newLeft,
      },
      duration
    );
    currentIndex = index;

    $pager.eq(currentIndex).addClass("active").siblings().removeClass("active");

    if (slideName == "mainSlide") {
      $pager.eq(currentIndex).find("a img").css({
        src: "images/slider_indicator_active.png",
      });
      $pager.eq(currentIndex).siblings().find("a img").css({
        src: "images/slider_indicator.png",
      });
    }
    if (slideName == "subSlide") {
      $pager.eq(index).find("a img").css({
        src: "images/slider_indicator_active.png",
      });
      $pager.eq(index).siblings().find("a img").css({
        src: "images/slider_indicator_black.png",
      });
    }
    // pager active btn toggle.
  }
}
// mySlide function

function countDown(date) {
  const toDate = new Date(date);
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  let timer = 0;

  timer = setInterval(startCountDown, 1000);

  function startCountDown() {
    let now = new Date();
    let $times = $(".count ul li");
    let distDt = toDate - now;
    let $md_time = $times.find("#md-time");
    let $md_expried = $times.find("#md-expired");

    let days = Math.floor(distDt / day);
    let hours = Math.floor((distDt % day) / hour);
    let minutes = Math.floor((distDt % hour) / minute);
    let seconds = Math.floor((distDt % minute) / second);

    $md_expried.text("expired");
    $md_time.text(days + ":" + hours + ":" + minutes + ":" + seconds);

    $times.find("#days").text(days);
    $times.find("#hours").text(hours);
    $times.find("#minutes").text(minutes);
    $times.find("#seconds").text(seconds);

    if (distDt < 0) {
      clearInterval(timer);
      $md_time.text(00 + ":" + 00 + ":" + 00 + ":" + 00);
      $times.find("#days").text(0);
      $times.find("#hours").text(0);
      $times.find("#minutes").text(0);
      $times.find("#seconds").text(0);
    }
  }
}
// countDown function

function filterGallery() {
  $filter = $(".filter li");
  $targetImg = $(".gallery_container li");

  $filter.click(function (e) {
    e.preventDefault();
    $(this).addClass("active").siblings().removeClass("active");

    let targetClass = "." + $(this).attr("id");
    if (targetClass === ".all") {
      $targetImg.hide();
      $targetImg.slideDown(1000);
    } else {
      $targetImg.hide();
      $(targetClass).slideDown(1000);
    }
  });
}
// galleryFilter function

function animateScroll() {
    animate();

  $(window).scroll(function () {
    animate();
  });

  function animate(){
    $('.fadeIn').each(function(i){
        const target = $(this).offset().top;
        let offset = $(window).scrollTop() + $(window).height();
        
        if(offset > target){
            $(this).addClass('animate');
        }
    })
  }

}
// scrollAnimate function
