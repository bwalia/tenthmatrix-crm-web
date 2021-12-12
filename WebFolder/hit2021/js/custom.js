(function ($) {
    "use strict";

    // metisMenu 
$("#sidebar_menu").metisMenu();
// metisMenu 
$("#admin_profile_active").metisMenu();
	
$(".open_miniSide").click(function () {
    $(".sidebar").toggleClass("mini_sidebar");
    $(".main_content ").toggleClass("full_main_content");
    $(".footer_part ").toggleClass("full_footer");
  });
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 400) {
    $('#back-top').fadeOut(500);
	} else {
    $('#back-top').fadeIn(500);
	}
});

// back to top 
$('#back-top a').on("click", function () {
    $('body,html').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });


// PAGE ACTIVE 
/*$( "#sidebar_menu" ).find( "a" ).removeClass("active");
$( "#sidebar_menu" ).find( "li" ).removeClass("mm-active");
$( "#sidebar_menu" ).find( "li ul" ).removeClass("mm-show");*/

/*var current = window.location.pathname
$("#sidebar_menu >li a").filter(function() {

    var link = $(this).attr("href");
    if(link){
        if (current.indexOf(link) != -1) {
            $(this).parents().parents().children('ul.mm-collapse').addClass('mm-show').closest('li').addClass('mm-active');
            $(this).addClass('active');
            return false;
        }
    }
});*/

// #NOTIFICATION_ 
	// for MENU notification
	$('.bell_notification_clicker').on('click', function () {
		$('.Menu_NOtification_Wrap').toggleClass('active');
	});

	$(document).click(function(event){
        if (!$(event.target).closest(".bell_notification_clicker ,.Menu_NOtification_Wrap").length) {
            $("body").find(".Menu_NOtification_Wrap").removeClass("active");
        }
    });
    
    //notification section js
    $(".close_icon").click(function () {
      $(this).parents(".hide_content").slideToggle("0");
    });

    //active sidebar
    $('.sidebar_icon').on('click', function(){
        $('.sidebar').toggleClass('active_sidebar');
    });
    $('.sidebar_close_icon i').on('click', function(){
        $('.sidebar').removeClass('active_sidebar');
    });
    
    //active menu
    $('.troggle_icon').on('click', function(){
        $('.setting_navbar_bar').toggleClass('active_menu');
    });

    $('.custom_select').click( function(){
        if ( $(this).hasClass('active') ) {
            $(this).removeClass('active');
        } else {
            $('.custom_select.active').removeClass('active');
            $(this).addClass('active');    
        }
    });


    $(document).click(function(event){
        if (!$(event.target).closest(".custom_select").length) {
            $("body").find(".custom_select").removeClass("active");
        }
    });
    //remove sidebar
    $(document).click(function(event){
        if (!$(event.target).closest(".sidebar_icon, .sidebar").length) {
            $("body").find(".sidebar").removeClass("active_sidebar");
        }
    });
    
    // check all
    $("#checkAll").click(function () {
        $('input:checkbox').not(this).prop('checked', this.checked);
    });

    
    //custom file
    $('.input-file').each(function() {
        var $input = $(this),
            $label = $input.next('.js-labelFile'),
            labelVal = $label.html();
        
       $input.on('change', function(element) {
          var fileName = '';
          if (element.target.value) fileName = element.target.value.split('\\').pop();
          fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);
       });
    });
    
    //custom file
    $('.input-file2').each(function() {
        var $input = $(this),
            $label = $input.next('.js-labelFile1'),
            labelVal = $label.html();
        
       $input.on('change', function(element) {
          var fileName = '';
          if (element.target.value) fileName = element.target.value.split('\\').pop();
          fileName ? $label.addClass('has-file').find('.js-fileName1').html(fileName) : $label.removeClass('has-file').html(labelVal);
       });
    });

}(jQuery));