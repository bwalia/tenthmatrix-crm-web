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

// from http://www.mediacollege.com/internet/javascript/number/round.html
function roundNumber(number,decimals) {
  var newString;// The new rounded number
  decimals = Number(decimals);
  if (decimals < 1) {
    newString = (Math.round(number)).toString();
  } else {
    var numString = number.toString();
    if (numString.lastIndexOf(".") == -1) {// If there is no decimal point
      numString += ".";// give it one at the end
    }
    var cutoff = numString.lastIndexOf(".") + decimals;// The point at which to truncate the number
    var d1 = Number(numString.substring(cutoff,cutoff+1));// The value of the last decimal place that we'll end up with
    var d2 = Number(numString.substring(cutoff+1,cutoff+2));// The next decimal, after the last one we want
    if (d2 >= 5) {// Do we need to round up at all? If not, the string will just be truncated
      if (d1 == 9 && cutoff > 0) {// If the last digit is 9, find a new cutoff point
        while (cutoff > 0 && (d1 == 9 || isNaN(d1))) {
          if (d1 != ".") {
            cutoff -= 1;
            d1 = Number(numString.substring(cutoff,cutoff+1));
          } else {
            cutoff -= 1;
          }
        }
      }
      d1 += 1;
    } 
    if (d1 == 10) {
      numString = numString.substring(0, numString.lastIndexOf("."));
      var roundedNum = Number(numString) + 1;
      newString = roundedNum.toString() + '.';
    } else {
      newString = numString.substring(0,cutoff) + d1.toString();
    }
  }
  if (newString.lastIndexOf(".") == -1) {// Do this again, to the new string
    newString += ".";
  }
  var decs = (newString.substring(newString.lastIndexOf(".")+1)).length;
  for(var i=0;i<decimals-decs;i++) newString += "0";
  //var newNumber = Number(newString);// make it a number if you like
  return newString; // Output the result to the form field (change for your purposes)
}

function update_distance()
{
	var start_mile=Number($('#start_mile').val());
	var end_mile=Number($('#end_mile').val());
	if(start_mile!='' && end_mile>0){
		var distance=roundNumber(end_mile-start_mile,2);
		$('#distance').val(distance);
		update_list();
	}
}

function update_tax()
{
	var tax_rate=Number($('#tax_rate').val());
	var total=0;
	$('#tbl_items tbody tr.item-row').each(function(){
		//alert($(this).find('.s_amount').html());
		total+=Number($(this).find('.amount').html());					   
	});
	if(tax_rate>0 && total>0){
		var tax_amt=roundNumber((total*tax_rate)/100,2);
		$('#tax_amount').val(tax_amt);
	}
}

function update_total()
{
	var total=0;
	$('#tbl_items tbody tr.item-row').each(function(){
		//alert($(this).find('.s_amount').html());
		total+=Number($(this).find('.amount').html());					   
	});
	
	var tax_rate=Number($('#tax_rate').val());
	
	if(tax_rate>0 && total>0){
		var tax_amt=roundNumber((total*tax_rate)/100,2);
		$('#tax_amount').val(tax_amt);
	}
	total=roundNumber(Number(total)+Number(tax_amt),2);
	$('#total_amount').val(total);
}

function update_list()
{
	var start_mile=Number($('#start_mile').val());
	var end_mile=Number($('#end_mile').val());
	var distance=Number($('#distance').val());
	var price_per=Number($('#price_per').val());
	var amount=roundNumber(distance*price_per,2);
	var type="Travel";
	var description="Distance Travelled "+distance+" Miles. Start Mileage: "+start_mile+" End Mileage: "+end_mile;
	
	
	var row_edit='';
	var rowCount = $('#tbl_items tbody tr').length;
	var rows = $('tr', '#tbl_items tbody');
	for(var i=0; i<=rowCount-2; i++){
		var curr_row = rows.eq(i);
		
		if(curr_row.find(".type").html().trim()=="Travel"){
			
			row_edit=curr_row;
			break;	
		}
	}
	if(row_edit!=''){
		row_edit.find('.editlink a').trigger('click');
		var start_mile=Number($('#start_mile').val());
		var end_mile=Number($('#end_mile').val());
		var distance=Number($('#distance').val());
		var price_per=Number($('#price_per').val());
		var amount=roundNumber(distance*price_per,2);
		var description="Distance Travelled "+distance+" Miles. Start Mileage: "+start_mile+" End Mileage: "+end_mile;
		$('#description').val(description);
		$('#amount').val(amount);
		
		$('#submit_item').trigger('click');
	}
	else
	{
		var uuid='';
		show_itemform(uuid, description, type, amount);	
		$('#submit_item').trigger('click');
	}
	
}



function get_client()
{
	var inv_no=	$("#inv_no").val();
	var dataString = 'inv_no='+inv_no;
	$.ajax({
type: "GET",
dataType: "json",
url: "getclientname.cgi",
data: dataString,
cache: false,
success: function(html)
{
	$("#client_id").val(html.CustomerID);
	$("#client_name").val(html.CustomerName);
}
});
}



function show_itemform(uuid, type, descr, amt)
{
	$('#expitem_uuid').val(uuid);
	$('#description').val(descr);
	$('#type').val(type);
	$('#amount').val(amt);	
	
	$('#div_item').show();
	$('#div_travel').hide();
}

function hide_itemform()
{
	$('#div_item').hide();
	$('#div_travel').show();	
}

function save() {
	if($("#frm_item").valid())
	{
		
		var m_uuid=$('#mileage_uuid').val();
		var item_uuid=$('#expitem_uuid').val();
		var description =$('#description').val();
		var type =$('#type').val();
		var amount=$('#amount').val();
					
		var dataString = 'item_uuid='+item_uuid+'&description='+description+'&type='+type+'&amount='+amount+'&m_uuid='+m_uuid+'&redirect=false';	
		
			//alert(dataString);
		$.ajax({
		type: "GET",
		url: "saveexpenseitem.cgi",
		data: dataString,
		cache: false,
		success: function(html)
		{
			
			if(item_uuid=='')
			{					
				$('#tbl_items tbody tr.newrow').before("<tr class='item-row' id='"+html.uuid+"'><td class='type' >"+type+"</td><td class='description' >"+description+"</td><td class='amount' >"+amount+"</td><td class='editlink'><a href='javascript:void(0)' onClick=\"show_itemform('"+html.uuid+"','"+type+"','"+description+"','"+amount+"')\" >Edit</a></td><td ><a href='javascript:void(0)' onClick=\"remove_item('"+html.uuid+"')\" >Remove</a></td></tr>");
			}
			else
			{
				$('#'+item_uuid).find('.type').html(type);
				$('#'+item_uuid).find('.description').html(description);
				$('#'+item_uuid).find('.amount').html(amount);
				$('#'+item_uuid).find('.editlink').html("<a href='javascript:void(0)' onClick=\"show_itemform('"+item_uuid+"','"+type+"','"+description+"','"+amount+"')\" >Edit</a>");
			}
			hide_itemform();
			update_total();
			
		}
		});
	}

}

function remove_item(item_uuid) {
		
var mileage_uuid=$('#mileage_uuid').val();

var dataString = 'delitem_uuid='+item_uuid+'&m_uuid='+mileage_uuid;

//alert(dataString);

$.ajax({
type: "POST",
url: "saveexpenseitem.cgi",
data: dataString,
cache: false,
success: function(html)
{
//$('#items').html(html);
$('#'+item_uuid).remove();
update_total();
 
}
});
}	

$(function() {

  $("#start_mile").blur(update_distance);
  $("#end_mile").blur(update_distance);
  $("#tax_rate").blur(update_tax);
  //$("#items").change(update_total);
  $("#distance").blur(update_list);
  $("#inv_no").blur(get_client);
  
  
  
  
});