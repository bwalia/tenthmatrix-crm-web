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

function update_price() {
  var price = $('#rate').val() * $('#hours').val();
  price = roundNumber(price,2);
  isNaN(price) ? $('#amount').val("N/A") : $('#amount').val(price); 
}

function save() {
	if($("#frm_item").valid())
	{
		var ID=$('#ivcnitem_id').val();
		var invoice_id=$('#invoice_id').val();
		var ivcnitem_uuid=$('#ivcnitem_uuid').val();
		var description =$('#description').val();
		var rate =$('#rate').val();
		var hours =$('#hours').val();
		var amount=$('#amount').val();
		
			if(ID!=''){
				
		var dataString = 'id='+ ID +'&ivcnitem_uuid='+ivcnitem_uuid+'&description='+description+'&rate='+rate+'&amount='+amount+'&hours='+hours+'&invoice_id='+invoice_id+'&redirect=false';
			}
			else
			{
				
		var dataString = 'ivcnitem_uuid='+ivcnitem_uuid+'&description='+description+'&rate='+rate+'&amount='+amount+'&hours='+hours+'&invoice_id='+invoice_id+'&redirect=false';	
			}
			//alert(dataString);
		$.ajax({
		type: "GET",
		url: "saveinvoiceitem.cgi",
		data: dataString,
		cache: false,
		success: function(html)
		{
			if(ID=='')
			{				
				$('#tbl_items tbody tr.newrow').before("<tr id='"+html.id+"'><td >"+html.id+"<input type='hidden' class='hours' value='"+hours+"'></td><td class='description' >"+description+"</td><td class='amount' >"+amount+"</td><td class='editlink'><a href='javascript:void(0)' onClick=\"show_invoiceform('"+html.id+"','"+html.uuid+"','"+description+"','"+rate+"','"+hours+"','"+amount+"')\" >Edit</a></td><td ><a href='javascript:void(0)' onClick=\"remove_item('"+html.id+"','"+html.uuid+"')\" >Remove</a></td></tr>");
			}
			else
			{
				$('#'+ID).find('.hours').val(hours);
				$('#'+ID).find('.description').html(description);
				$('#'+ID).find('.amount').html(amount);
				$('#'+ID).find('.editlink').html("<a href='javascript:void(0)' onClick=\"show_invoiceform('"+ID+"','"+ivcnitem_uuid+"','"+description+"','"+rate+"','"+hours+"','"+amount+"')\" >Edit</a>");
			}
			hide_invoiceform();
			update_total();
			
		}
		});
	}

}

function remove_item(id,ivcnitem_uuid) {
		
var invoice_id=$('#invoice_id').val();
var dataString = 'id='+ id+'&delitem_uuid='+ivcnitem_uuid+'&invoice_id='+invoice_id+'&redirect=false';

//alert(dataString);

$.ajax({
type: "POST",
url: "saveinvoiceitem.cgi",
data: dataString,
cache: false,
success: function(html)
{
//$('#items').html(html);
$('#'+id).hide();
update_total();
 
}
});
}	


function show_invoiceform(id, uuid, descr, rate, hrs, amt)
{
	$('#ivcnitem_id').val(id);
	$('#ivcnitem_uuid').val(uuid);
	$('#description').val(descr);
	$('#rate').val(rate);
	$('#hours').val(hrs);
	$('#amount').val(amt);	
	
	$('#div_item').show();
	$('#div_invoice').hide();
}

function hide_invoiceform()
{
	$('#div_item').hide();
	$('#div_invoice').show();	
}


function total_for_edit()
{
var total = 0;
  var tot_rate = 0;
  var tot_hour = 0;
  var total_with_tax = 0;
  var hour=0;
  
  $('.hours').each(function(i){
    hour = $(this).val();
	
    if (!isNaN(hour)) tot_hour += Number(hour);
  });
  

tot_hour = roundNumber(tot_hour,2);
  total = $('#total_due').val();
  tot_tax = $('#invoice_total_tax').val();
  total_with_tax = roundNumber(Number(total)+Number(tot_tax),2);  

  $('#total_hours').val(tot_hour);

  $('#invoice_total_due_with_tax').val(total_with_tax);
  
  update_balance();	
	
}


function update_total() {
  var total = 0;
  var tot_rate = 0;
  var tot_hour = 0;
  var total_with_tax = 0;
  var hour=0;
   var price=0;
  
  $('.hours').each(function(i){
    hour = $(this).val();
	
    if (!isNaN(hour)) tot_hour += Number(hour);
  });
  
  $('.amount').each(function(i){
    price = $(this).html();
    if (!isNaN(price)) total += Number(price);
  });
  
  

tot_hour = roundNumber(tot_hour,2);
  total = roundNumber(total,2);
  tot_rate=$('#invoice_tax_rate').val();
  tot_tax = roundNumber(total*tot_rate/100,2);
  total_with_tax = roundNumber(Number(total)+Number(tot_tax),2);
  
  

  //$('#subtotal').html("$"+total);
  //$('#total').html("$"+total);
  $('#total_hours').val(tot_hour);
  $('#total_due').val(total);
  $('#invoice_total_tax').val(tot_tax);
  $('#invoice_total_due_with_tax').val(total_with_tax);
  //$("#invoice_total_paid").val("$0");
  
  update_balance();
}

function update_balance() {
  var due = $("#invoice_total_due_with_tax").val() - $("#invoice_total_paid").val();
  due = roundNumber(due,2);
  
  $('#total').val($("#invoice_total_due_with_tax").val());
  $('#balance_due').val(due);
}

