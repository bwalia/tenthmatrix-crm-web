function print_today() {
  // ***********************************************
  // AUTHOR: WWW.CGISCRIPT.NET, LLC
  // URL: http://www.cgiscript.net
  // Use the script, just leave this message intact.
  // Download your FREE CGI/Perl Scripts today!
  // ( http://www.cgiscript.net/scripts.htm )
  // ***********************************************
  var now = new Date();
  var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
  var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();
  function fourdigits(number) {
    return (number < 1000) ? number + 1900 : number;
  }
  var today =  months[now.getMonth()] + " " + date + ", " + (fourdigits(now.getYear()));
  return today;
}


function save() {

var row = $(this).parents('.item-row');
var client_id=$('#acc_no').val();
var contact_uuid=row.find('.contact_uuid').val();
var first_name =row.find('.firstname').val();
var surname =row.find('.surname').val();
var email=row.find('.email').val();

var mobile =row.find('.mobile').val();

$('.form_validation_reg').removeData('validator');
	$('.form_validation_reg').validate({
				 ignore:':hidden',
				rules: {
					firstname: { required: true },
					email: { required: true, email: true },
				},

		});
	
	if($('.form_validation_reg').valid()){


//if(first_name!='' && email!=''){
	
		var dataString = 'client_id='+ client_id +'&contact_uuid='+contact_uuid+'&first_name='+first_name+'&surname='+surname+'&email='+email+'&mobile='+mobile+'&redirect=false';

			
		$.ajax({
		type: "POST",
		dataType: "json",
		url: "savecustomercontacts.cgi",
		data: dataString,
		cache: false,
		success: function(html)
		{
			//alert(html);
			if(contact_uuid==''){
			 
			row.find('.contact_uuid').val(html.uuid);
			}
			
		row.find('.s_firstname').html(first_name);
			row.find('.s_surname').html(surname);
			row.find('.s_email').html(email);
			
			row.find('.s_mobile').html(mobile);
			
			row.find('.s_firstname').show();
			row.find('.s_surname').show();
			row.find('.s_email').show();
			
			row.find('.s_mobile').show();
			
			row.find('.firstname').hide();
			row.find('.surname').hide();
			row.find('.email').hide();
			
			row.find('.mobile').hide();
			
			row.find('.savelink').hide();
			row.find('.editlink').show();
			row.find('.cancellink').hide();
			row.find('.removelink').show();
		 bind();
		}
		});
	
}

}

function edit() {
	$('#tbl_contact').find(".cancellink").trigger('click');
		var row = $(this).parents('.item-row');
	row.find('.s_firstname').hide();
	row.find('.s_surname').hide();
	row.find('.s_email').hide();
	
	row.find('.s_mobile').hide();
	
	row.find('.firstname').show();
	row.find('.surname').show();
	row.find('.email').show();
	
	row.find('.mobile').show();
	
	row.find('.savelink').show();
	row.find('.editlink').hide();
	row.find('.cancellink').show();
	row.find('.removelink').hide();
	
	row.find('.firstname').focus();
		
	}
	
	function cancel() {
		var row = $(this).parents('.item-row');
		var contact_uuid=row.find('.contact_uuid').val();
		if(contact_uuid!=''){
			
	row.find('.s_firstname').show();
	row.find('.s_surname').show();
	row.find('.s_email').show();
	
	row.find('.s_mobile').show();
	
	row.find('.firstname').hide();
	row.find('.surname').hide();
	row.find('.email').hide();
	
	row.find('.mobile').hide();
	
	row.find('.savelink').hide();
	row.find('.editlink').show();
	row.find('.cancellink').hide();
	row.find('.removelink').show();
	$('label.error').remove();
		}
		else
		{
			
			row.remove();
		}
	
	}
	
	function remove() {
		
		var row = $(this).parents('.item-row');
		
		var contact_uuid=row.find('.contact_uuid').val();

var dataString = 'delcontact_uuid='+contact_uuid;

$.ajax({
type: "GET",
dataType: "json",
url: "savecustomercontacts.cgi",
data: dataString,
cache: false,
success: function(html)
{
//$('#items').html(html);
row.remove();
 bind();
}
});
}	



function bind() {
	
  
  $(".savelink").unbind();
  $(".editlink").unbind();
  $(".cancellink").unbind();
  $(".removelink").unbind();
 
  $(".savelink").click(save);
  $(".editlink").click(edit);
  $(".cancellink").click(cancel);
  $(".removelink").click(remove);
}

$(function() {

 
  $("#addrow").click(function(){
	$('#tbl_contact').find(".cancellink").trigger('click');
    $(".item").after('<tr class="item-row"><td ><span class="s_firstname" style="display:none" ></span><input class="contact_uuid" type="hidden" value="" /><div><input type="text" class="firstname" name="firstname"></div></td><td><span class="s_surname" style="display:none" ></span><div><input type="text" class="surname" name="surname" ></div></td><td><span class="s_email" style="display:none" ></span><div><input type="text" class="email" name="email" ></div></td><td><span class="s_mobile" style="display:none" ></span><div><input type="text" class="mobile" name="mobile"  ></div></td><td ><a href="javascript:void(0)" class="editlink" style="display:none">Edit</a><a href="javascript:void(0)" class="savelink" >Save</a></td><td><a href="javascript:void(0)" class="removelink" style="display:none" >Remove</a><a href="javascript:void(0)" class="cancellink" >Cancel</a></td></tr>');
	var curr_row = $('.item').next();
	curr_row.find('.firstname').focus();
	
   
    bind();
  });
  
  bind();
  
 
  
  $("#date").val(print_today());
  
});