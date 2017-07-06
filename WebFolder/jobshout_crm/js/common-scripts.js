var domainName="";
var Script = function () {
	//    tool tips
	$('.tooltips').tooltip();
	//    popovers
	$('.popovers').popover();
}();

	(function() {

   			$('<i id="back-to-top"></i>').appendTo($('body'));

			$(window).scroll(function() {

				if($(this).scrollTop() != 0) {
					$('#back-to-top').fadeIn();	
				} else {
					$('#back-to-top').fadeOut();
				}

			});
			
			$('#back-to-top').click(function() {
				$('body,html').animate({scrollTop:0},600);
			});	

	})();

function timeConverter(UNIX_timestamp, dateformat){
	var a = new Date(UNIX_timestamp * 1000);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	if(dateformat=="date"){
  		return  date;
  	} else if(dateformat=="month"){
  		return  month;
  	} else {
  		return  date+' '+month+' '+year;
  	}
}

function fetch_follow_us()	{
	$('#follow_us_tokens').hide();
	var val= "['jobshout-facebook', 'jobshout-linkedin', 'jobshout-google-plus']";
	var jsonRow=domainName+"/fetch_tokens_content?code="+val+"callback=?";
	$.getJSON(jsonRow,function(html){
		if(html.aaData){
			var contentHtml="";
			$.each(html.aaData, function(i,row){
				var iconUi='';
				switch (row.code) {
    				case 'jobshout-linkedin':
       				iconUi = '<i class="fa fa-linkedin"></i>';
        			break;
        			case 'jobshout-facebook':
       				iconUi = '<i class="fa fa-facebook"></i>';
        			break;
        			case 'jobshout-twitter':
       				iconUi = '<i class="fa fa-twitter"></i>';
        			break;
        			case 'jobshout-youtube':
       				iconUi = '<i class="fa fa-youtube"></i>';
        			break;    
        			case 'jobshout-google-plus':
       				iconUi = '<i class="fa fa-google-plus"></i>';
        			break;    	
				}
				contentHtml+='<li><a href="'+row.token_content+'" target="_blank">'+iconUi+'</i></a></li>';
			});
			if(contentHtml!=""){
				$('#follow_us_tokens').show();
				$("#follow_us_data").html(contentHtml);
			}
		}
	});
}
function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
function fetch_navigation()	{
	//var jsonRow="/return_navigation.txt"; // this is for testing
	var jsonRow="/api_fetch_navigation";
	$.getJSON(jsonRow,function(response){
		if(response && response.length>0){
			var footerNavigationStr='', mainNavigationStr='';
			$.each(response, function(i,row){
				var tempNavStr='';
				if(row.type=="url"){
					tempNavStr='<li><a HREF="'+row.content+'" title="'+row.label+'"><span>'+row.label+'</span></a></li>';
				}else if(row.type=="items"){
					try{
						var bookmarkItems = JSON.parse(row.bookmark_items); 
        			}	catch (error){
       					var bookmarkItems = row.bookmark_items; 
    				} 
					if(bookmarkItems.length>0){
						tempNavStr='<li class="dropdown">';
						tempNavStr+='<a class="dropdown-toggle" data-close-others="false" data-delay="0" data-hover="dropdown" data-toggle="dropdown" href="#">'+row.label+' <i class="fa fa-angle-down"></i></a>';
						tempNavStr+='<ul class="dropdown-menu">';
						bookmarkItems.sort(dynamicSort("item_sort_order"));
						for(var count=0; count< bookmarkItems.length; count++){
							if(bookmarkItems[count].type=="url"){
								tempNavStr+='<li><a href="'+bookmarkItems[count].content+'" title="'+bookmarkItems[count].label+'">'+bookmarkItems[count].label+'</a></li>';
							}else if(bookmarkItems[count].type=="html"){
								tempNavStr+='<li>'+bookmarkItems[count].content+'</li>';
							}
						}
						tempNavStr+='</ul></li>';
					}
				}
				
				if(row.categories=="footer-nav"){
					footerNavigationStr+=tempNavStr;
				}
				if(row.categories=="top-navigation"){
					mainNavigationStr+=tempNavStr;
				}
			});
			
			$("#footer_navigation_id").html(footerNavigationStr);
			$("#header_navigation_id").html(mainNavigationStr);
		}
	});
}
$(document).ready(function() {
	fetch_navigation();
	
	//fetch follow us content
	fetch_follow_us();
	$("#contactForm").validate({
		rules: {
			name: "required",
			email: {
				required: true, email: true
			},
			message: "required"
		},
		messages: {
			name: "Please enter your name",
			email: {
				required: "Please enter your E-mail",
				email: "Please enter valid E-mail"
			},
			message: "Please leave your message!"
		}
	});
	
	$.getJSON(domainName+"/fetchTweets",function(html){
		var contentHtml="";
		if(html.error){
			$("#load_tweets").append('<div class="tweet-box">Sorry, no latest tweets found!</div>');
		}else{
			$.each(html.aaData, function(i,row){
				contentHtml+='<div class="tweet-box">';
        		contentHtml+='<i class="fa fa-twitter"></i>';
         		var textStr=row.text;
        		if(textStr.length>50){
        			textStr=textStr.substr(0,50)+"...";
                }
                contentHtml+='<em>'+textStr+'<br><a target="_blank" href="https://twitter.com/jobshoutnews?ref_src=twsrc%5Etfw">twitter.com/jobshoutnews</a></em>';
              	contentHtml+='</div>';
			});	
		}
		$("#load_tweets").append(contentHtml);
	});
	
	$.getJSON(domainName+"/search-results?start=0&s=&type=blog&limit=3",function(html){
			if(html.error){
				$("#latestfooterblogs").before('<div class="alert">No blogs found!</div>');
			}else{
				
				var contentHtml="";
				$.each(html.aaData, function(i,row){
					if(row.Code!=""){
						contentHtml+='<li><i class="fa fa-angle-right"></i>';
						if(row.Published_timestamp){
							contentHtml+='<strong>'+timeConverter(row.Published_timestamp)+'</strong>:&nbsp;';
						}
						contentHtml+='<a href="/'+row.Code+'" title="'+row.Document+'">'+row.Document+'</a>';
						contentHtml+='</li>';
                    }
				});
				$("#latestfooterblogs").html(contentHtml);
			}
	});
});
$(window).load(function() {
	$('.flexslider').flexslider({
		animation: "slide",
		start: function(slider) {
			$('body').removeClass('loading');
        }
    });
});
new WOW().init();
	
$.checkSearchBox = function checkSearchBox(){
	var csearch = $('#csearch').val();	
	var csearch1 = $('#csearch1').val();	
	if(csearch=="" || csearch1==""){
		alert('Please enter job search keyword(s)');return false;
	}
	else return true;
}

