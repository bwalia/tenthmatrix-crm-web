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

function total_for_edit()
{
	var total = 0;
	var tot_rate = 0;
	var tot_hour = 0;
	var total_with_tax = 0;
	var hour=0;
	var discount_perc=0;
	var discount=0;
	
  $('.hours').each(function(i){
	hour = $(this).val();
	
	if (!isNaN(hour)) tot_hour += Number(hour);
  });

	tot_hour = roundNumber(tot_hour,2);
  total = $('#total_due_without_tax').val();
  tot_tax = $('#total_tax').val();
  total_with_tax = roundNumber(Number(total)+Number(tot_tax),2);  

  $('#total_hours').val(tot_hour);

  $('#total_due_with_tax').val(total_with_tax);
  
  update_balance();	
	
}


function update_total() {
	var sub_total = 0;
	var tot_rate = 0;
	var tot_hour = 0;
	var total_with_tax = 0;
	var total_due_without_tax = 0;
	var hour=0;
	var discount_perc=0;
	var discount=0;
	
  $('.hours').each(function(i){
    hour = $(this).val();
	
    if (!isNaN(hour)) tot_hour += Number(hour);
  });
  
  $('.price').each(function(i){
    price = $(this).html();
    if (!isNaN(price)) sub_total += Number(price);
  });
  
	tot_hour = roundNumber(tot_hour,2);
	sub_total = roundNumber(sub_total,2);
	
	//discount applied if any
	discount_perc= $("#discount_applied").val();
	discount = roundNumber(sub_total*discount_perc/100,2);
	total_due_without_tax = roundNumber(sub_total - discount,2);
	
	//evaluate total with tax applied
	tot_rate=$('#tax_rate').val();
	tot_tax = roundNumber(total_due_without_tax*tot_rate/100,2);
	//alert(tot_tax);
	total_with_tax = roundNumber(Number(total_due_without_tax)+Number(tot_tax),2);
	
  //$('#total').html("$"+total);
  $('#order_subtotal').val(sub_total);
  
  $('#total_hours').val(tot_hour);
  $('#total_due_without_tax').val(total_due_without_tax);
  
  $('#total_tax').val(tot_tax);
  $('#total_due_with_tax').val(total_with_tax);
  
  //$("#invoice_total_paid").val("$0");
  update_balance();
}

function update_balance() {
	
	var total_due_with_tax= $("#total_due_with_tax").val();
	// var due = $("#order_subtotal").val() - discount;
	// due = roundNumber(due,2);
  
	  $('#total').val(total_due_with_tax);
	  $('#balance_due').val(total_due_with_tax);
}

function update_price() {
  var row = $(this).parents('.item-row');
  var sub_price = roundNumber(row.find('.rate').val() * row.find('.hours').val(),2);
  var item_discount = roundNumber(sub_price * row.find('.i_discount').val()/100,2);
  var price= sub_price - item_discount;
  // price = roundNumber(price,2);
  isNaN(price) ? row.find('.price').html("N/A") : row.find('.price').html(price);
  
  update_total();
}

function save() {

	var row = $(this).parents('.item-row');
	var ID=row.find('.item_id').html();
	var order_uuid=$('#order_uuid').val();

	var order_item_uuid=row.find('.item_uuid').val();
	var description =row.find('.description').val();
	var uuid_product =row.find('.i_description').val();
	var rate =row.find('.rate').val();
	var amount=row.find('.price').html();
	var hours =row.find('.hours').val();
	var discount =row.find('.i_discount').val();	
	if(description!='' && rate!='' && hours!=''){
		if(!isNaN(rate)){
			if(!isNaN(hours)){
				if(hours != 0){
					if(ID!=''){
						var dataString = 'id='+ ID +'&order_item_uuid='+order_item_uuid+'&description='+description+'&rate='+rate+'&amount='+amount+'&hours='+hours+'&discount='+discount+'&order_uuid='+order_uuid+'&uuid_product='+uuid_product+'&redirect=false';
					} else {
						var dataString = 'order_item_uuid='+order_item_uuid+'&description='+description+'&rate='+rate+'&amount='+amount+'&hours='+hours+'&discount='+discount+'&order_uuid='+order_uuid+'&uuid_product='+uuid_product+'&redirect=false';	
					}
					
					$.ajax({
						type: "POST",
						url: "saveorderitem.cgi",
						data: dataString,
						cache: false,
						success: function(html)
						{
							//__alertMessage(html);
							//var result=html.split(",");
							row.find('.item_id').html(html.id);

							row.find('.item_uuid').val(html.uuid);
							//$('#items').html(html);
							row.find('.s_description').html(description);
							row.find('.s_rate').html(rate);
							row.find('.s_hours').html(hours);
							row.find('.s_discount').html(discount);
							row.find('.s_description').show();
							row.find('.s_rate').show();
							row.find('.s_hours').show();
							row.find('.s_discount').show();
							row.find('.div_i_description').hide();
							row.find('.rate').hide();
							row.find('.hours').hide();
							row.find('.i_discount').hide();
							
							row.find('.savelink').hide();
							row.find('.editlink').show();
							row.find('.cancellink').hide();
							row.find('.removelink').show();
							
							update_total();
						}
					});
				}else{
					__alertMessage("Quantity can't be 0");
					$('.hours').focus();
				}
			}else{
				__alertMessage('Enter a numeric value');
				$('.hours').focus();
			}
		}else{
			__alertMessage('Enter a numeric value');
			$('.rate').focus();
		}
	}else {
		__alertMessage('Enter all values');
	}
}

function edit() {
	$('#items').find(".cancellink").trigger('click');
	var row = $(this).parents('.item-row');
	row.find('.s_description').hide();
	row.find('.s_rate').hide();
	row.find('.s_hours').hide();
	row.find('.s_discount').hide();
	row.find('.div_i_description').show();
	row.find('.div_i_description').find('.ui-autocomplete-input').val(row.find('.i_description option:selected').text());
	row.find('.rate').show();
	row.find('.hours').show();
	row.find('.i_discount').show();
	
	row.find('.savelink').show();
	row.find('.editlink').hide();
	row.find('.cancellink').show();
	row.find('.removelink').hide();
	
	row.find('.i_description').focus();
}
	
	function cancel() {
		var row = $(this).parents('.item-row');
		var id=row.find('.item_id').html();
		if(id!=''){
			
	row.find('.s_description').show();
	row.find('.s_rate').show();
	row.find('.s_hours').show();
	row.find('.s_discount').show();
	row.find('.div_i_description').hide();
	row.find('.rate').hide();
	row.find('.hours').hide();
	row.find('.i_discount').hide();
	
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
		update_total();
	}
	
	function remove() {
		
		var row = $(this).parents('.item-row');
		var id=row.find('.item_id').html();
		var item_uuid=row.find('.item_uuid').val();
		var order_uuid=$('#invoice_id').val();


var dataString = 'id='+ id+'&delitem_uuid='+item_uuid+'&order_uuid='+order_uuid+'&redirect=false';

$.ajax({
type: "POST",
url: "saveorderitem.cgi",
data: dataString,
cache: false,
success: function(html)
{
//$('#items').html(html);
row.remove();
update_total();
}
});
}	



function bind() {
$(".rate").unbind();
  $(".hours").unbind();
  
  $(".savelink").unbind();
  $(".editlink").unbind();
  $(".cancellink").unbind();
  $(".removelink").unbind();
	
  $(".rate").blur(update_price);
  $(".hours").blur(update_price);
  $(".i_discount").blur(update_price);
  
  $(".savelink").click(save);
  $(".editlink").click(edit);
  $(".cancellink").click(cancel);
  $(".removelink").click(remove);
}

function getproducts_dropdown(){
	var jsonRow = 'getproductsDropdown.cgi';
	$.getJSON(jsonRow,function(result){	
		if(result){
			var html='<option value=""></option>';
			$.each(result, function(i,item){
				html += '<option value="'+item.id+'">'+item.value+'</option>';
			});
			$('#get_products').html(html);
		}
	});
}

function get_details(ele){
	var row =ele.parents('.item-row');
	// var row =$(ele).parents('.item-row');
	// var row =ele.parents('.item-row');
	var id = ele.val();
	var jsonRow = 'getProductsDetail.cgi?id='+id;
	$.getJSON(jsonRow,function(result){	
		if(result){
			row.find('.rate').val(result.Unit_Price);
			row.find('.description').val(result.name);
			update_total();
		}
	});
}

$(function() {
	
<!--#4DIF (Records in selection([orders])=1)-->		   
	// total_for_edit();
	update_total();
<!--#4DELSE-->
	
	
	var taxCodeSelected = $('#tax_code').val();
	//console.log(taxCodeSelected)
	if(taxCodeSelected==""){
		$('#tax_rate').val("20");
		$('#tax_code').val("UK");
	}else if(taxCodeSelected=="US"){
		$('#tax_rate').val("");
		update_total();
	}else if(taxCodeSelected=="UK"){
		$('#tax_rate').val("20");
		update_total();
	}
<!--#4DENDIF-->

  $('input').click(function(){
    $(this).select();
  });
  
  $("#addrow").click(function(){
	$('#items').find(".cancellink").trigger('click');
    $(".item").after('<tr class="item-row"><td class="item-id"><span class="item_id"></span><input class="item_uuid" type="hidden" /></td><td><span class="s_description" style="display:none" ></span><input class="description form-control" type="hidden" /><div class="ui-widget div_i_description"><select name="product" id="get_products" class="i_description form-control"></select></div></td><td><span class="s_rate" style="display:none" ></span><div><input type="text" class="rate num form-control" name="rate" value="0"></div></td><td><span class="s_hours" style="display:none" ></span><div><input type="text" class="hours num form-control" name="hours" value="0" ></div></td><td><span class="s_discount" style="display:none" ></span><div><input type="text" class="i_discount num form-control" name="i_discount" value="0" ></div></td><td><span class="price">0</span></td><td ><a href="javascript:void(0)" class="editlink" style="display:none">Edit</a><a href="javascript:void(0)" class="savelink" >Save</a></td><td><a href="javascript:void(0)" class="removelink" style="display:none" >Remove</a><a href="javascript:void(0)" class="cancellink" >Cancel</a></td></tr>');
	var curr_row = $('.item').next();
	curr_row.find('.i_description').combobox();
    bind();
  });
  
  bind();
  
   
 $('#tax_code').change(function(){

	var tax_code=$(this).val();
	if(tax_code=='Rest of the world' || tax_code=='EU')
	{
		//var tax_rate=prompt("Enter tax rate");
		//$('#invoice_tax_rate').val(tax_rate);
		code = $('#tax_rate_code').text();
		(new Function(code))();
	}else if(tax_code=='US'){
		$('#tax_rate').val("");
		update_total();
	}else{
		$('#tax_rate').val("20");
		update_total();
	}
	
	
});
 
 $("#discount_applied").blur( function() {
		update_total();
	});
  $("#tax_rate").blur( function() {
	update_total();
	}); 
  //$("#date").val(print_today());
  
});