(function($) {
  "use strict";

  /*--------------------------------------------------------------
    Scripts initialization
  --------------------------------------------------------------*/

  $(window).on("load", function() {
    $(window).trigger("scroll");
    $(window).trigger("resize");
  });

  $(document).on("ready", function() {
    $(window).trigger("resize");
    mainMenu();
    mobileMenu();
    sideBarHeader();
    stickyHeader();
    onePageNav();
    dynamicBackgroundImage();
    tabInt();
    accordianInt();
    progressBar();
    swiperSlider();
    calendarInt();
    customSelectInt();
    chattingInt();
    chattingToggle();
    modalVideoInt();
    verticalChart();
    nicescrollInt();
    dragDropInt();
    customToggleInt();
    emailEditorInt();
    nestableSetup();
    dynamicTableInt();
    bootstrapInt();
    colorPicker();
  });

  $(window).on("resize", function() {
    mobileMenu();
  });

  $(window).on("scroll", function() {
    stickyHeader();
  });

  $.exists = function(selector) {
    return $(selector).length > 0;
  };

  /*--------------------------------------------------------------
    1. Header Sctipt
  --------------------------------------------------------------*/

  /* Main Menu */
  function mainMenu() {
    $(".tb-nav-toggle").on("click", function() {
      $(this).siblings(".tb-nav").slideToggle();
      $(this).toggleClass("tb-active");
    });
    $(".tb-has-children").append('<span class="tb-dropdown-btn"></span>');
    $(".tb-dropdown-btn").on("click", function() {
      $(this).siblings("ul, .tb-megamenu-in, .tb-vertical-megamenu-in").slideToggle("slow");
      $(this).toggleClass("tb-active");
    });

  }
  /* Mobile Menu */
  function mobileMenu() {
    if ($(window).width() <= 991) {
      $(".tb-header").addClass("tb-mobile-header");
      $(".tb-nav").addClass("tb-mobile-nav").removeClass("tb-desktop-nav");
    } else {
      $(".tb-header").removeClass("tb-mobile-header");
      $(".tb-nav").addClass("tb-desktop-nav").removeClass("tb-mobile-nav");
    }
  }
  /* Sticky Header */
  function stickyHeader() {
    var scroll = $(window).scrollTop();
    if (scroll >= 10) {
      $(".tb-header").addClass("tb-sticky-active");
    } else {
      $(".tb-header").removeClass("tb-sticky-active");
    }
  }
  /* Sidebar Header */
  function sideBarHeader() {
    $(".tb-sidebar-has-children").append('<span class="tb-dropdown-arrow"></span>');
    $(".tb-sidebar-has-children>a").removeAttr("href").on("click", function() {
      $(this).siblings(".tb-sidebar-nav-dropdown").slideToggle();
      $(this).siblings(".tb-dropdown-arrow").toggleClass("active");
    });
    $(".tb-sidebarheader-toggle").on("click", function() {
      $("body").toggleClass("tb-sidebar-active");
    });
    // Hover To Class Toggle
    $(".tb-sidebarheader").hover(
      function() {
        $("body").addClass("tb-sidebar-hover-active");
      },
      function() {
        $("body").removeClass("tb-sidebar-hover-active");
      }
    );
  }
  /*--------------------------------------------------------------
    2. One Page Navigation
  --------------------------------------------------------------*/
  function onePageNav() {
    $('.tb-doc-nav-dropdown-btn').on('click', function() {
      $(this).toggleClass('active');
      $(this).siblings('.tb-doc-nav-dropdown-list').slideToggle();
    })
    // Click to Go Top Animation
    $('.tb-onepage-nav a').each(function() {
      var thisAttr = $(this).attr('href');
      if ($(thisAttr).length) {
        $(this).addClass('tb-page-nav');
      }
    });
    $('.tb-page-nav').on('click', function() {
      var thisAttr = $(this).attr('href');
      if ($(thisAttr).length) {
        var scrollPoint = $(thisAttr).offset().top - 80;
        $('body,html').animate({
          scrollTop: scrollPoint
        }, 650);
      }
      return false;
    });
    // One Page Active Class
    var topLimit = 300,
      ultimateOffset = 200;
    $('.tb-onepage-nav').each(function() {
      var $this = $(this),
        $parent = $this.parent(),
        current = null,
        $findLinks = $this.find("a");

      function getHeader(top) {
        var last = $findLinks.first();
        if (top < topLimit) {
          return last;
        }
        for (var i = 0; i < $findLinks.length; i++) {
          var $link = $findLinks.eq(i),
            href = $link.attr("href");
          if (href.charAt(0) === "#" && href.length > 1) {
            var $anchor = $(href).first();
            if ($anchor.length > 0) {
              var offset = $anchor.offset();
              if (top < offset.top - ultimateOffset) {
                return last;
              }
              last = $link;
            }
          }
        }
        return last;
      }
      $(window).on("scroll", function() {
        var top = window.scrollY,
          height = $this.outerHeight(),
          max_bottom = $parent.offset().top + $parent.outerHeight(),
          bottom = top + height + ultimateOffset;
        var $current = getHeader(top);
        if (current !== $current) {
          $this.find(".active").removeClass("active");
          $current.addClass("active");
          current = $current;
        }
      });
    });
  }

  /*--------------------------------------------------------------
    3. Background Image Script
  --------------------------------------------------------------*/
  function dynamicBackgroundImage() {
    $('.tb-dynamicbg').each(function() {
      var src = $(this).attr('data-src');
      $(this).css({
        'background-image': 'url(' + src + ')'
      });
    });
  }

  /*--------------------------------------------------------------
    4. Tab Style
  --------------------------------------------------------------*/
  function tabInt() {
    $('.tb-tabs.tb-fade-tabs .tb-tab-links a:not(.tb-work-link)').on('click', function(e) {
      var currentAttrValue = $(this).attr('href');
      $('.tb-tabs ' + currentAttrValue).fadeIn(400).siblings().hide();
      $(this).parents('li').addClass('tb-active').siblings().removeClass('tb-active');
      e.preventDefault();
    });
  }

  /*--------------------------------------------------------------
    4. Accordion
  --------------------------------------------------------------*/
  function accordianInt() {
    $('.tb-accordian.tb-active').find('.tb-accordian-title').addClass('tb-open');
    $(".tb-accordian-wrap .tb-accordian-title").on('click', function(e) {
      $(this).toggleClass('tb-open');
      $(this).parents('.tb-accordian').siblings().find('.tb-accordian-title').removeClass('tb-open');
      $(this).parents('.tb-accordian-wrap').find(".tb-accordian-body").slideUp();
      if ($(this).next().is(":hidden")) {
        $(this).next().slideDown();
      }
    });
  }

  /*--------------------------------------------------------------
    5. Progress Bar
  --------------------------------------------------------------*/
  function progressBar() {
    $(".tb-single-progress").each(function() {
      let progressPercentage = $(this).find(".tb-progressbar").data("progress-percentage") + "%";
      $(this).find(".tb-progressbar-in").css("width", progressPercentage);
      $(this).find(".tb-progress-percentage").html(progressPercentage);
    });
  }

  /*--------------------------------------------------------------
    6. Swiper Slider
  --------------------------------------------------------------*/
  function swiperSlider() {
    for (var i = 0; i < $('.swiper-container').length; i++) {
      // Swiper Slider Active Mechanisum
      var mySwiper = mySwiper + i;
      var swiperMain = $('.swiper-container').eq(i);
      var swiperControl = swiperMain.parents('.tb-slider');
      swiperMain.addClass('swiper-container' + i);
      swiperControl.find('.pagination').addClass('pagination' + i);
      swiperControl.find('.swiper-arrow-right').addClass('swiper-arrow-right' + i);
      swiperControl.find('.swiper-arrow-left').addClass('swiper-arrow-left' + i);

      // Added Unique Class
      var activeSwiper = '.swiper-container' + i;
      var activePagination = '.pagination' + i;
      var arrowRight = '.swiper-arrow-right' + i;
      var arrowLeft = '.swiper-arrow-left' + i;

      // Auro Play
      var autoPlay = parseInt($(activeSwiper).attr('data-autoplay'));
      (autoPlay === 0) ? (autoPlay = false) : (autoPlay = true);

      // Slider Loop
      var sliderLoop = parseInt($(activeSwiper).attr('data-loop'));
      (sliderLoop === 0) ? (sliderLoop = false) : (sliderLoop = true);

      // Auro Play Speed
      var sliderSpeed = parseInt($(activeSwiper).attr('data-speed'));

      // Slider Per View
      var slidesPerView = $(activeSwiper).attr('data-slides-per-view');
      var slideView = parseInt($(activeSwiper).attr('data-add-slides'));
      var xlPoint = parseInt($(activeSwiper).attr('data-lg-slides'));
      var lgPoint = parseInt($(activeSwiper).attr('data-md-slides'));
      var mdPoint = parseInt($(activeSwiper).attr('data-sm-slides'));
      var smPoint = parseInt($(activeSwiper).attr('data-xs-slides'));
      var sliderBreakpoints = {};
      if (slidesPerView == 1) {
        slidesPerView = 1;
      } else if (slidesPerView === 'auto') {
        slidesPerView = 'auto';
      } else {
        slidesPerView = slideView;
        sliderBreakpoints = {
          575: {
            slidesPerView: smPoint
          },
          767: {
            slidesPerView: mdPoint
          },
          991: {
            slidesPerView: lgPoint
          },
          1199: {
            slidesPerView: xlPoint
          }
        }
      }

      mySwiper = new Swiper(activeSwiper, {
        loop: sliderLoop,
        autoplay: autoPlay,
        speed: sliderSpeed,
        pagination: {
          el: activePagination,
          clickable: true,
        },
        navigation: {
          nextEl: arrowRight,
          prevEl: arrowLeft,
        },
        slidesPerView: slidesPerView,
        breakpoints: sliderBreakpoints
      });
    }
  }

  /*--------------------------------------------------------------
    7. Calendar
  --------------------------------------------------------------*/
  function calendarInt() {
    if ($.exists("#tb-calendar")) {
      $('#tb-calendar').fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
        },
        defaultDate: '2019-01-12',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [{
            title: 'All Day Event',
            start: '2019-01-01T20:00:00'
          },
          {
            title: 'Long Event',
            start: '2019-01-07T10:00:00',
            end: '2019-01-08T16:00:00'
          },
          {
            title: 'Repeating Event',
            start: '2019-01-10T16:00:00'
          },
          {
            title: 'Conference',
            start: '2019-01-10T09:00:00'
          },
          {
            title: 'Meeting',
            start: '2019-01-12T10:30:00',
            end: '2019-01-12T12:30:00'
          },
          {
            title: 'Lunch',
            start: '2019-01-12T12:00:00'
          },
          {
            title: 'Meeting',
            start: '2019-01-12T14:30:00'
          },
          {
            title: 'Happy Hour',
            start: '2019-01-12T17:30:00'
          },
          {
            title: 'Dinner',
            start: '2019-01-01T14:00:00',
            end: '2019-01-02T14:30:00'
          },
          {
            title: 'Birthday Party',
            start: '2019-01-13T07:00:00'
          },
          {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2019-01-28T08:00:00'
          }
        ]
      });
    }
  }

  /*--------------------------------------------------------------
    8. Custom Select
  --------------------------------------------------------------*/
  function customSelectInt() {
    $(".tb-custom-select").each(function() {
      var classes = $(this).attr("class"),
        id = $(this).attr("id"),
        name = $(this).attr("name");
      var template = '<div class="' + classes + '">';
      template += '<span class="custom-select-trigger">' + $(".tb-custom-select-wrap > .tb-custom-select option:first").html() + "</span>";
      template += '<div class="custom-options">';
      $(this).find("option").each(function() {
        template += '<span class="custom-option ' + $(this).attr("class") + " data-value=" + $(this).attr("value") + '">' + $(this).html() + "</span>";
      });
      template += "</div></div>";

      $(this).wrap('<div class="custom-select-wrapper"></div>');
      $(this).hide();
      $(this).after(template);
    });
    $(".custom-select-trigger").on("click", function(event) {
      $("html").one("click", function() {
        $(".tb-custom-select").removeClass("opened");
      });
      $(this).parents(".tb-custom-select").toggleClass("opened");
      event.stopPropagation();
    });
    $(".custom-option").on("click", function() {
      $(this).parents(".custom-select-wrapper").find("select").val($(this).data("value"));
      $(this).parents(".custom-options").find(".tb-custom-option").removeClass("selection");
      $(this).addClass("selection");
      $(this).parents(".custom-select").removeClass("opened");
      $(this).parents(".tb-custom-select").find(".custom-select-trigger").text($(this).text());
    });
  }


  /*--------------------------------------------------------------
    9. Chatting Setup
  --------------------------------------------------------------*/
  function chattingInt() {
    // Input Clone To To Chat Box
    $('.tb-chat-input').keypress(function(ev) {
      if (ev.keyCode == 13 && !ev.shiftKey) {
        var p = ev.which;
        var chatTime = moment().format("h:mm:a");
        var chatText = $(this).html();
        if (p == 13) {
          if (chatText == "") {
            alert('Empty Field');
          } else {
            // Live Chat Input
            $(this).parents('.tb-chat-conversation').find('.tb-conversation-list').append(
              `<li>
                <div class="tb-conversation-text">
                    <div><p>${chatText}</p></div>
                </div>
              </li>`);
            // Messanger Chat Input
            $(this).parents('.tb-chatbox-wrap').find('.tb-chatbox-for-messaenger').append(
              `<div class="tb-user tb-style2 tb-right-side">
                <div class="tb-user-chat-text-group">
                  <div class="tb-user-chat-text">
                    <div class="tb-user-chat-text-in">
                      ${chatText}
                      <div class="tb-user-chat-text-seting">
                        <ul class="tb-icon-group tb-style1 tb-mp0">
                          <li><a href="#" class="tb-icon-group-icon"><i class="material-icons-outlined">insert_emoticon</i></a></li>
                          <li><a href="#" class="tb-icon-group-icon"><i class="material-icons-outlined">reply</i></a></li>
                          <li><a href="#" class="tb-icon-group-icon"><i class="material-icons-outlined">more_horiz</i></a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`);
            // Chatting Software Input
            $(this).parents('.tb-chatbox-wrap').find('.tb-chatbox-for-chatting-software').append(
              `<div class="tb-user tb-style2">
                <div class="tb-user-img"><img src="assets/img/msg/msg2.png" alt=""></div>
                <div class="tb-user-info">
                  <h3 class="tb-user-name">marthaa<span class="tb-user-time">${chatTime}</span></h3>
                  <div class="tb-user-chat-text">
                    <p>${chatText}</p>
                  </div>
                </div>
              </div>`);
            reverseScroll();
          }
          $(this).html('');
          return false;
          ev.epreventDefault();
          ev.stopPropagation();
        }
        return false
      }
    });

    // Reverse Scroll
    function reverseScroll() {
      var height = 0;
      $('.tb-reverse-scroll').children().each(function(i, value) {
        height += parseInt($(this).height());
      });

      height += '';
      $('.tb-reverse-scroll').animate({ scrollTop: height });
    }
    reverseScroll();
  }

  /* Chatting Toggle */
  function chattingToggle() {
    // Liver Chat Toggle
    $('.tb-toggle-chat-btn').on('click', function() {
      $(this).parents('.tb-toggle-chat-wrap').toggleClass('tb-active');
    })

    $(document).on("click", function() {
      $(".tb-toggle-chat-wrap").removeClass("tb-active");
    });
    $(".tb-toggle-chat-wrap, .tb-toggle-chat-btn").on("click", function(e) {
      e.stopPropagation();
    });

    // Click to single chat window
    $('.tb-live-chat-single').on('click', function() {
      $(this).parents('.tb-live-chat-wrap').toggleClass('tb-active');
    });
    $('.tb-live-chat-heading').on('click', function() {
      $(this).parents('.tb-live-chat-wrap').removeClass('tb-active');
    });

    // Info Sidebar Toggle
    $('.tb-chat-info-toggle-btn').on('click', function() {
      $('.tb-chat-container').toggleClass('tb-active');
    });
    $('.tb-chat-info-cross').on('click', function() {
      $('.tb-chat-container').toggleClass('tb-active');
    });
  }

  /*--------------------------------------------------------------
    10. Modal Video
  --------------------------------------------------------------*/
  function modalVideoInt() {
    $(document).on('click', '.tb-video-open', function(e) {
      e.preventDefault();
      var video = $(this).attr('href');
      $('.tb-video-popup-container iframe').attr('src', video);
      $('.tb-video-popup').addClass('active');

    });
    $('.tb-video-popup-close, .tb-video-popup-layer').on('click', function(e) {
      $('.tb-video-popup').removeClass('active');
      $('html').removeClass('overflow-hidden');
      $('.tb-video-popup-container iframe').attr('src', 'about:blank')
      e.preventDefault();
    });
  }

  /*--------------------------------------------------------------
    11. Vertical Chart
  --------------------------------------------------------------*/
  function verticalChart() {
    if ($.exists(".tb-vertical-chart-layer")) {
      $("body").append('<div class="tb-chart-tooltip"></div>');

      // Vertical Chart
      $(".tb-vertical-chart-layer").each(function() {
        // var chartUp = chart-up
        var chartLayertHeight = $(this).data("cl-height") + "%",
          chartLayertOpacity = $(this).data("cl-opacity");
        $(this)
          .css("height", chartLayertHeight)
          .css("opacity", chartLayertOpacity);
      });
      $(".tb-vertical-chart-up, .tb-vertical-chart-up-pair").each(function() {
        var chartUp = $(this).data("chart-up") + "%",
          chartLabel = $(this).data("chart-label");
        $(this).css("height", chartUp);
        $(this).append('<div class="tb-chart-label"><span></span></div>');
        $(this).children(".tb-chart-label").find("span").html(chartLabel);
        var chartUpWidth = $(this).width(),
          chartUpChildWidth = $(this).children(".tb-chart-label").find("span").width();
        if (chartUpWidth < chartUpChildWidth) {
          $(this).parents(".tb-vertical-chart").addClass("tb-chart-label-rotate");
        }
      });
      // ToolTip Detact
      var $chartTooltip = $(".tb-chart-tooltip");
      $(".tb-vertical-chart-layer").hover(
        function() {
          $chartTooltip.addClass("active");
          $chartTooltip.html(
            `${$(this).data("cl-name")}: ${$(this).data("cl-height")}%`
          );
        },
        function() {
          $chartTooltip.removeClass("active");
        }
      );
      $(document).on("mousemove", function(e) {
        $chartTooltip.css({
          left: e.pageX,
          top: e.pageY - 50
        });
      });
      // Vertical Chart Stoke List
      $(".tb-vertical-chart-stroke li").each(function() {
        var vcStokeOpacity = $(this).data("cl-opacity");
        $(this).children("span").css("opacity", vcStokeOpacity);
      });
    }
  }

  /*--------------------------------------------------------------
    12. Nice Scroll
  --------------------------------------------------------------*/
  function nicescrollInt() {
    Scrollbar.initAll();
  }

  /*--------------------------------------------------------------
    13. Drag and Drop
  --------------------------------------------------------------*/
  function dragDropInt() {
    // Road Map Drag and Drop Initialize
    if ($.exists('.tb-roadmap-user-task-list')) {
      $('.tb-roadmap-user-task-list').sortable({
        connectWith: '.tb-roadmap-user-task-list'
      });
    }
    if ($.exists('.tb-roadmap-taskes')) {
      $('.tb-roadmap-taskes').sortable({
        connectWith: '.tb-roadmap-taskes'
      });
    }
    if ($.exists('.tb-roadmap-body')) {
      $('.tb-roadmap-body').sortable();
      $('.tb-roadmap-body').disableSelection();
    }

    // Project Management Drap and Drop Initialize
    if ($.exists('.tb-drop-list')) {
      $('.tb-drop-list').sortable({
        connectWith: '.tb-drop-list'
      });
    }
    if ($.exists('.tb-drop-list-wrap')) {
      $('.tb-drop-list-wrap').sortable();
      $('.tb-drop-list-wrap').disableSelection();
    }

    // Dragable Card
    $('.tb-dragable-card-toggle').on('click', function() {
      $(this).toggleClass('tb-active').parents('.tb-card-heading').siblings('.tb-card-body').slideToggle();
    });
    $('.tb-dragable-card-close').on('click', function() {
      $(this).parents('.tb-card').remove();
    });
  }

  /*--------------------------------------------------------------
    14. Toggle Btn
  --------------------------------------------------------------*/
  function customToggleInt() {
    // Custome Toggle Button
    $(".tb-toggle-btn").on("click", function() {
      $(this).toggleClass("active").siblings(".tb-dropdown").toggleClass("active");
      $(this).parents("li").siblings().find(".tb-dropdown, .tb-toggle-btn").removeClass("active");
      $(this).parents('.tb-toggle-body').siblings().find('.tb-dropdown, .tb-toggle-btn').removeClass('active');
    });
    $('.tb-toggle-cross-btn').on('click', function() {
      $(this).parents('.tb-toggle-body').find('.tb-toggle-btn, .tb-dropdown').removeClass('active');
    })
    $(document).on("click", function() {
      $(".tb-dropdown").removeClass("active").siblings().removeClass("active");
    });
    $(".tb-dropdown, .tb-toggle-btn").on("click", function(e) {
      e.stopPropagation();
    });

    $(".tb-circle-color, .tb-vertical-chart-layer").each(function() {
      let buletColor = $(this).data("bulet-color");
      $(this).css("background-color", buletColor);
    });
    $('.tb-toggle-cross').on('click', function(){
      $(this).parents('.tb-dropdown').removeClass('active').siblings('.tb-toggle-btn').removeClass('active');
    })
    // Star Toggle Btn
    $('.tb-get-star, .tb-mobile-toggle-btn').on('click', function() {
      $(this).toggleClass('active');
    })

    // Switch Btn Toggle
    $('.tb-switch').on('click', function() {
      $(this).toggleClass('tb-active');
    })
    // Profile Toggle
    $('.tb-profile-sidebar-btn').on('click', function() {
      $(this).parents('.tb-profile-sidebar').addClass('active');
    })
    $('.tb-profile-sidebar-cross').on('click', function() {
      $(this).parents('.tb-profile-sidebar').removeClass('active');
    })
  }

  /*--------------------------------------------------------------
    15. Email Editor
  --------------------------------------------------------------*/
  function emailEditorInt() {
    if ($.exists("#tb-email-editor")) {
      console.clear()
      var FontAttributor = Quill.import('formats/font');
      var fonts = ['impact', 'courier', 'comic'];
      var lHeights = ['1.0', '1.1', '1.2', '1.3', '1.4', '1.5', '1.6'];
      FontAttributor.whitelist = fonts;
      Quill.register(FontAttributor, true);
      var quill = new Quill('#tb-email-editor', {
        modules: {
          toolbar: { container: '#tb-email-editor-toolbox' }
        },
        placeholder: 'Type something here',
        theme: 'snow' // 'snow' or 'bubble'
      });
      $('.ql-bold').html('<i class="material-icons-outlined">format_bold</i>');
      $('.ql-italic').html('<i class="material-icons-outlined">format_italic</i>');
      $('.ql-underline').html('<i class="material-icons-outlined">format_underlined</i>');
    }
  }

  /*--------------------------------------------------------------
    16. Nestable List
  --------------------------------------------------------------*/
  function nestableSetup() {
    if ($.exists("#tb-nestable1")) {
      $('#tb-nestable1').nestable();
    }
    if ($.exists("#tb-nestable2")) {
      $('#tb-nestable2').nestable();
    }

    $('.tb-nested-dropdown-btn').on('click', function() {
      $(this).toggleClass('tb-active').siblings('.tb-nested-dropdown').slideToggle();
    });
    $('.tb-nosted-cancel').on('click', function() {
      $(this).parents('.tb-nested-dropdown').slideUp();
    })
    $('.tb-nosted-delete').on('click', function() {
      $(this).parents('.tb-nested-dropdown-wrap').parent('.dd-item').remove();
    })
  }

  /*--------------------------------------------------------------
    17. Dynamic Table
  --------------------------------------------------------------*/
  function dynamicTableInt() {
    $("#tb-left-locked").each(function() {
      var table = $('#tb-left-locked').DataTable({
        scrollY: "600px",
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        fixedColumns: {
          leftColumns: 1
        }
      });
    })
    $("#tb-right-locked").each(function() {
      var table = $('#tb-right-locked').DataTable({
        scrollY: "600px",
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        fixedColumns: {
          leftColumns: 0,
          rightColumns: 1
        }
      });
    })
    $("#tb-left-right-locked").each(function() {
      var table = $('#tb-left-right-locked').DataTable({
        scrollY: "600px",
        scrollX: true,
        scrollCollapse: true,
        paging: false,
        fixedColumns: {
          leftColumns: 1,
          rightColumns: 1
        }
      });
    })
    $("#tb-no-locked").each(function() {
      var table = $('#tb-no-locked').DataTable({
        scrollX: true,
        scrollCollapse: true,
        paging: false
      });
    })
  }

  /*--------------------------------------------------------------
    18. Bootstrap Setup Mode
  --------------------------------------------------------------*/
  function bootstrapInt() {
    $('.your-checkbox').prop('indeterminate', true);

    $('#myModal').on('shown.bs.modal', function() {
      $('#myInput').trigger('focus')
    })
  }

  /*--------------------------------------------------------------
    ## Theme Opton Settings
  --------------------------------------------------------------*/
  function colorPicker() {
    // Color Switcher
    $(".tb-color-switch").on('click', function() {
      $(this).addClass('active-mode').siblings().removeClass('active-mode');
      $("head link#mode-option").attr("href", $(this).data("color-mode"));
      var chartjsColor = $(this).data("chartjs-color");
      $('#chart-style').remove();
      $('body').append("<script src=\"".concat(chartjsColor, "\" id=\"chart-style\"></script>"));
    });
    // Iocn option
    $('.tb-icon-switch').on('click', function() {
      $(this).addClass('active-mode').siblings().removeClass('active-mode');
      $('i').toggleClass('material-icons').toggleClass('material-icons-outlined');
    });

    // Custome Toggle Button
    $(".tb-theme-options-toggle-switch-btn").on("click", function() {
      $(this).parents('.tb-theme-options').addClass("active");
    });
    $(document).on("click", function() {
      $(".tb-theme-options").removeClass("active");
    });
    $(".tb-theme-options-body, .tb-theme-options-switch").on("click", function(e) {
      e.stopPropagation();
    });

    $('.tb-option-switch').on('click', function() {
      $(this).parents('.tb-pricing-switch-parents').toggleClass('active');
    });
    $('.tb-theme-options').append('<span class="tb-ops-cross"><i class="material-icons">clear</i></span>');
    $('.tb-ops-cross').on('click', function() {
      $(this).parents('.tb-theme-options').removeClass('active');
    })
  }


})(jQuery); // End of use strict
