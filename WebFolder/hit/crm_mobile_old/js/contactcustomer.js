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

$(function() {
  $("#date").val(print_today());
  
});


function show_contactform(uuid, f_name, s_name, c_email, c_mobile)
{
	$('#cntitem_uuid').val(uuid);
	$('#f_name').val(f_name);
	$('#s_name').val(s_name);
	$('#c_email').val(c_email);	
	$('#c_mobile').val(c_mobile);	
	
	$('#div_contact').show();
	$('#div_cust').hide();
}

function hide_contactform()
{
	$('#div_contact').hide();
	$('#div_cust').show();	
}

function save() {
	if($("#frm_contact").valid())
	{
		
		var client_id=$('#acc_no').val();
		var contact_uuid=$('#cntitem_uuid').val();
		var first_name =$('#f_name').val();
		var surname =$('#s_name').val();
		var email=$('#c_email').val();
		var mobile=$('#c_mobile').val();
					
		var dataString = 'client_id='+ client_id +'&contact_uuid='+contact_uuid+'&first_name='+first_name+'&surname='+surname+'&email='+email+'&mobile='+mobile+'&redirect=false';
		
			//alert(dataString);
		$.ajax({
		type: "GET",
		dataType: "json",
		url: "savecustomercontacts.cgi",
		data: dataString,
		cache: false,
		success: function(html)
		{
			
			if(contact_uuid=='')
			{					
				$('#tbl_items tbody tr.newrow').before("<tr class='item-row' id='"+html.uuid+"'><td class='firstname' >"+first_name+"</td><td class='email' >"+email+"</td><td class='mobile' >"+mobile+"</td><td class='editlink'><a href='javascript:void(0)' onClick=\"show_contactform('"+html.uuid+"','"+first_name+"','"+surname+"','"+email+"','"+mobile+"')\" >Edit</a></td><td ><a href='javascript:void(0)' onClick=\"remove_contact('"+html.uuid+"')\" >Remove</a></td></tr>");
			}
			else
			{
				$('#'+contact_uuid).find('.firstname').html(first_name);
				$('#'+contact_uuid).find('.email').html(email);
				$('#'+contact_uuid).find('.mobile').html(mobile);
				$('#'+contact_uuid).find('.editlink').html("<a href='javascript:void(0)' onClick=\"show_contactform('"+contact_uuid+"','"+first_name+"','"+surname+"','"+email+"','"+mobile+"')\" >Edit</a>");
			}
			hide_contactform();
			
		}
		});
	}

}

function remove_contact(cnt_uuid) {


var dataString = 'delcontact_uuid='+cnt_uuid;

//alert(dataString);

$.ajax({
type: "GET",
dataType: "json",
url: "savecustomercontacts.cgi",
data: dataString,
cache: false,
success: function(html)
{
//$('#items').html(html);
$('#'+cnt_uuid).remove();

 
}
});
}	