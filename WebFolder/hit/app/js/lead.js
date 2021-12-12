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
function save_con(){
	
var lead_id=$('#lead_id').val();
var row = $(this).parents('.item-row');
var contact_uuid=row.find('.contact_uuid').val();
var forename=row.find('.forename').val();
var surname=row.find('.surname').val();
var email=row.find('.email').val();
var mobile=row.find('.mobile').val();

$('.form_validation_reg').removeData('validator');
	$('.form_validation_reg').validate({
				 ignore:':hidden',
				rules: {
					forename: { required: true },
					surname: { required: true },
					email: { required: true, email: true },
					mobile: { required: true },
				},

		});
	
	if($('.form_validation_reg').valid()){

		
var dataString = 'lead_id='+lead_id+'&contact_uuid='+contact_uuid+'&forename='+forename+'&surname='+surname+'&email='+email+'&mobile='+mobile+'&redirect=false';

//alert(dataString);
	
$.ajax({
type: "GET",
url: "saveleadcontact.cgi",
data: dataString,
cache: false,
success: function(html)
{	
	alert("Contact saved successfully");
	row.find('.contact_uuid').val(html.uuid);
	
	row.find('.s_forename').html(forename);
	row.find('.s_surname').html(surname);
	row.find('.s_email').html(email);
	row.find('.s_mobile').html(mobile);
	
	row.find('.s_forename').show();
	row.find('.s_surname').show();
	row.find('.s_email').show();
	row.find('.s_mobile').show();
	
	row.find('.forename').hide();
	row.find('.surname').hide();
	row.find('.email').hide();
	row.find('.mobile').hide();
		
	row.find('.con_savelink').hide();
	row.find('.con_editlink').show();
	row.find('.con_cancellink').hide();
	row.find('.con_removelink').show();
}
});



}


}

function edit_con() {
	$('#tbl_contact').find(".con_cancellink").trigger('click');
		var row = $(this).parents('.item-row');
	row.find('.s_forename').hide();
	row.find('.s_surname').hide();
	row.find('.s_email').hide();
	row.find('.s_mobile').hide();
	
	row.find('.forename').show();
	row.find('.surname').show();
	row.find('.email').show();
	row.find('.mobile').show();
		
	row.find('.con_savelink').show();
	row.find('.con_editlink').hide();
	row.find('.con_cancellink').show();
	row.find('.con_removelink').hide();
	
	row.find('.forename').focus();
		
	}
	
	function cancel_con() {
		var row = $(this).parents('.item-row');
		var uuid=row.find('.contact_uuid').val();
		if(uuid!=''){
			
	row.find('.s_forename').show();
	row.find('.s_surname').show();
	row.find('.s_email').show();
	row.find('.s_mobile').show();
	
	row.find('.forename').hide();
	row.find('.surname').hide();
	row.find('.email').hide();
	row.find('.mobile').hide();
		
	row.find('.con_savelink').hide();
	row.find('.con_editlink').show();
	row.find('.con_cancellink').hide();
	row.find('.con_removelink').show();
	$('label.error').remove();
		}
		else
		{
			
			row.remove();
		}
		
	}

function remove_con(){
var row = $(this).parents('.item-row');	
var lead_id=$('#lead_id').val();

var contact_uuid=row.find('.contact_uuid').val();
		
var dataString = 'lead_id='+lead_id+'&delcontact_uuid='+contact_uuid+'&redirect=false';

	
$.ajax({
type: "GET",
url: "saveleadcontact.cgi",
data: dataString,
cache: false,
success: function(html)
{	
	alert("Contact deleted successfully");	
	row.remove();
}
});

}


function save_act(){
	
var lead_id=$('#lead_id').val();
var row = $(this).parents('.item-row');
var activity_uuid=row.find('.activity_uuid').val();
var con_name=row.find('.ContactName').val();
var action=row.find('.action').val();
var phone=row.find('.phone').val();
var owner=row.find('.owner').val();

$('.form_validation_reg').removeData('validator');
	$('.form_validation_reg').validate({
				 ignore:':hidden',
				rules: {
					ContactName: { required: true },
					action: { required: true },
					phone: { required: true },
					owner: { required: true },
				},

		});
	
	if($('.form_validation_reg').valid()){

	 
var dataString = 'lead_id='+lead_id+'&activity_uuid='+activity_uuid+'&con_name='+con_name+'&action='+action+'&phone='+phone+'&owner='+owner+'&redirect=false';

//alert(dataString);
	
$.ajax({
type: "GET",
url: "saveleadactivity.cgi",
data: dataString,
cache: false,
success: function(html)
{	
	alert("Activity saved successfully");
	row.find('.activity_uuid').val(html.uuid);
	
	row.find('.s_ContactName').html(con_name);
	row.find('.s_action').html(action);
	row.find('.s_phone').html(phone);
	row.find('.s_owner').html(owner);
	
	row.find('.s_ContactName').show();
	row.find('.s_action').show();
	row.find('.s_phone').show();
	row.find('.s_owner').show();
	
	row.find('.ContactName').hide();
	row.find('.action').hide();
	row.find('.phone').hide();
	row.find('.owner').hide();
		
	row.find('.act_savelink').hide();
	row.find('.act_editlink').show();
	row.find('.act_cancellink').hide();
	row.find('.act_removelink').show();
}
});

}

}

function edit_act() {
	$('#tbl_activity').find(".act_cancellink").trigger('click');
		var row = $(this).parents('.item-row');
	row.find('.s_ContactName').hide();
	row.find('.s_action').hide();
	row.find('.s_phone').hide();
	row.find('.s_owner').hide();
	
	row.find('.ContactName').show();
	row.find('.action').show();
	row.find('.phone').show();
	row.find('.owner').show();
		
	row.find('.act_savelink').show();
	row.find('.act_editlink').hide();
	row.find('.act_cancellink').show();
	row.find('.act_removelink').hide();
	
	row.find('.ContactName').focus();
		
	}
	
	function cancel_act() {
		var row = $(this).parents('.item-row');
		var uuid=row.find('.activity_uuid').val();
		if(uuid!=''){
			
	row.find('.s_ContactName').show();
	row.find('.s_action').show();
	row.find('.s_phone').show();
	row.find('.s_owner').show();
	
	row.find('.ContactName').hide();
	row.find('.action').hide();
	row.find('.phone').hide();
	row.find('.owner').hide();
		
	row.find('.act_savelink').hide();
	row.find('.act_editlink').show();
	row.find('.act_cancellink').hide();
	row.find('.act_removelink').show();
	$('label.error').remove();
		}
		else
		{
			
			row.remove();
		}
		
	}

function remove_act(){
var row = $(this).parents('.item-row');	
var lead_id=$('#lead_id').val();

var activity_uuid=row.find('.activity_uuid').val();
		
var dataString = 'lead_id='+lead_id+'&delactivity_uuid='+activity_uuid+'&redirect=false';

	
$.ajax({
type: "GET",
url: "saveleadactivity.cgi",
data: dataString,
cache: false,
success: function(html)
{	
	alert("Activity deleted successfully");	
	row.remove();
}
});

}

 function con_bind() {
 	
   
   $(".con_savelink").unbind();
   $(".con_editlink").unbind();
   $(".con_cancellink").unbind();
   $(".con_removelink").unbind();
    $(".phone").unbind();
  
   $(".con_savelink").click(save_con);
   $(".con_editlink").click(edit_con);
   $(".con_cancellink").click(cancel_con);
   $(".con_removelink").click(remove_con);
   $('.phone').keypress(function(e){
 		checkphone(e);					
 	}); 
 }

 function act_bind() {
 	
   
   $(".act_savelink").unbind();
   $(".act_editlink").unbind();
   $(".act_cancellink").unbind();
   $(".act_removelink").unbind();
    $(".phone").unbind();
  
   $(".act_savelink").click(save_act);
   $(".act_editlink").click(edit_act);
   $(".act_cancellink").click(cancel_act);
   $(".act_removelink").click(remove_act);
   $('.phone').keypress(function(e){
 		checkphone(e);					
 	}); 
 }
 
 $(function() {
 
   $("#addcontact").click(function(){
	$('#tbl_contact').find(".con_cancellink").trigger('click');
     $('#tbl_contact').find("tr.item").after('<tr class="item-row" ><td><span class="s_forename" style="display:none;" ></span><input class="contact_uuid" type="hidden" /><div><input type="text" class="forename" name="forename" ></div></td><td ><span class="s_surname" style="display:none;" ></span><div><input type="text" class="surname" name="surname" ></div></td><td><span class="s_email" style="display:none;" ></span><div><input type="text" class="email" name="email" ></div></td><td><span class="s_mobile" style="display:none;" ></span><div><input type="text" class="mobile phone" name="mobile" ></div></td><td ><a href="javascript:void(0)" class="con_editlink" style="display:none;" >Edit</a><a href="javascript:void(0)" class="con_savelink" >Save</a></td><td><a href="javascript:void(0)" class="con_removelink" style="display:none;" >Remove</a><a href="javascript:void(0)" class="con_cancellink" >Cancel</a></td></tr>');
 	var curr_row = $('#tbl_contact').find("tr.item").next();
 	curr_row.find('.forename').focus();

     con_bind();
   });
   
   $("#addactivity").click(function(){
	$('#tbl_activity').find(".act_cancellink").trigger('click');
     $('#tbl_activity').find("tr.item").after('<tr class="item-row"><td><span class="s_ContactName" style="display:none;" ></span><input class="activity_uuid" type="hidden" /><div><input type="text" class="ContactName" name="ContactName"  ></div></td><td ><span class="s_action" style="display:none;" ></span><div><input type="text" class="action" name="action" ></div></td><td><span class="s_phone" style="display:none;" ></span><div><input type="text" class="phone" name="phone" ></div></td><td><span class="s_owner" style="display:none;" ></span><div><input type="text" class="owner" name="owner" ></div></td><td><a href="javascript:void(0)" class="act_editlink" style="display:none;">Edit</a><a href="javascript:void(0)" class="act_savelink" >Save</a></td><td><a href="javascript:void(0)" class="act_removelink" style="display:none;" >Remove</a><a href="javascript:void(0)" class="act_cancellink" >Cancel</a></td></tr>');
 	var curr_row = $('#tbl_activity').find("tr.item").next();
 	curr_row.find('.ContactName').focus();

     act_bind();
   });
   
   con_bind();
   
  act_bind();
   
   $("#date").val(print_today());
   
 });