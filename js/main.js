$(document).ready(function(){

  $('#js-register-form').validate({
    rules: {
      form_name: {
        required: true
      },
      form_email: {
        required: true,
        email: true
      },
      form_tel: {
        required: true,
        digits: true
      },
      invalidHandler: function(event, validator) {
        $('js-form-messege').text('Заполните все обязательные поля');
      }
    }
  });

  $('.productCard-more a').on('click', function(e){
    e.preventDefault();
    $(this).parent('div').toggleClass('is-hide');
    $(this).parent('div').siblings('.productCard-more-open').toggleClass('is-show');
  })
  $('.productCard-more-open a').on('click', function(e){
    e.preventDefault();
    $(this).parent('div').toggleClass('is-show');
    $(this).parent('div').siblings('.productCard-more').toggleClass('is-hide');
  })
  /*
 Reference: http://jsfiddle.net/BB3JK/47/
 */

 $('select').each(function(){
     var $this = $(this), numberOfOptions = $(this).children('option').length;

     $this.addClass('select-hidden');
     $this.wrap('<div class="select"></div>');
     $this.after('<div class="select-styled"></div>');

     var $styledSelect = $this.next('div.select-styled');
     $styledSelect.text($this.children('option').eq(0).text());

     var $list = $('<ul />', {
         'class': 'select-options'
     }).insertAfter($styledSelect);

     for (var i = 0; i < numberOfOptions; i++) {
         $('<li />', {
             text: $this.children('option').eq(i).text(),
             rel: $this.children('option').eq(i).val()
         }).appendTo($list);
     }

     var $listItems = $list.children('li');

     $styledSelect.click(function(e) {
         e.stopPropagation();
         $('div.select-styled.active').not(this).each(function(){
             $(this).removeClass('active').next('ul.select-options').hide();
         });
         $(this).toggleClass('active').next('ul.select-options').toggle();
     });

     $listItems.click(function(e) {
         e.stopPropagation();
         $styledSelect.text($(this).text()).removeClass('active');
         $this.val($(this).attr('rel'));
         $list.hide();
         //console.log($this.val());
     });

     $(document).click(function() {
         $styledSelect.removeClass('active');
         $list.hide();
     });

 });
});
//
//
$(function() {
	$('body').addClass('js');
		var	$menu = $('#menu'),
			$menulink = $('.menu-link'),
			$menuTrigger = $('.has-subnav');

	$menulink.click(function(e) {
		e.preventDefault();
		$menulink.toggleClass('active');
		$menu.toggleClass('active');
	});

	$menuTrigger.click(function(e) {
		e.preventDefault();
		var $this = $(this);
		$this.toggleClass('active').next('ul').toggleClass('active');
	});

});

// Remove "Active" Class from Menu on Resize
$(window).resize(function() {
	var viewportWidth = $(window).width();
		if (viewportWidth > 925) {
			$("#menu").removeClass("active");
		}
});
//
//


$(document).ready(function(){

        $("#sidebar").stick_in_parent();

        /**
         * This part does the "fixed navigation after scroll" functionality
         * We use the jQuery function scroll() to recalculate our variables as the
         * page is scrolled/
         */
        // $(window).scroll(function(){
        //     var window_top = $(window).scrollTop() + 12; // the "12" should equal the margin-top value for nav.stick
        //     var div_top = $('#nav-anchor').offset().top;
        //         if (window_top > div_top) {
        //             $('nav').addClass('stick');
        //         } else {
        //             $('nav').removeClass('stick');
        //         }
        //
        // });


        /**
         * This part causes smooth scrolling using scrollto.js
         * We target all a tags inside the nav, and apply the scrollto.js to it.
         */
        $("nav a").click(function(evn){
            evn.preventDefault();
            $('html,body').scrollTo(this.hash, this.hash);
        });



        /**
         * This part handles the highlighting functionality.
         * We use the scroll functionality again, some array creation and
         * manipulation, class adding and class removing, and conditional testing
         */
        var aChildren = $("nav li").children(); // find the a children of the list items
        var aArray = []; // create the empty aArray
        for (var i=0; i < aChildren.length; i++) {
            var aChild = aChildren[i];
            var ahref = $(aChild).attr('href');
            aArray.push(ahref);
        } // this for loop fills the aArray with attribute href values

        $(window).scroll(function(){
            var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
            var windowHeight = $(window).height(); // get the height of the window
            var docHeight = $(document).height();

            for (var i=0; i < aArray.length; i++) {
                var theID = aArray[i];
                var divPos = $(theID).offset().top; // get the offset of the div from the top of page
                var divHeight = $(theID).height(); // get the height of the div in question
                if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                    $("a[href='" + theID + "']").addClass("nav-active");
                } else {
                    $("a[href='" + theID + "']").removeClass("nav-active");
                }
            }

            if(windowPos + windowHeight == docHeight) {
                if (!$("nav li:last-child a").hasClass("nav-active")) {
                    var navActiveCurrent = $(".nav-active").attr("href");
                    $("a[href='" + navActiveCurrent + "']").removeClass("nav-active");
                    $("nav li:last-child a").addClass("nav-active");
                }
            }
        });
    });
