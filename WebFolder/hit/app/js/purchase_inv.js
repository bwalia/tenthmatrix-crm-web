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


function update_total() {
  var subtotal = 0;
 var item_amount=0;
  
  $('.s_item_total').each(function(i){
    item_amount = $(this).html();
	
    if (!isNaN(item_amount)) subtotal += Number(item_amount);
  });
  
subtotal = roundNumber(subtotal,2);

  $('#payment_subtotal').val(subtotal);
	calculate_tax();
}

function calculate_tax(){
	/*var tax_rate= $('#tax_rate').val();
	$('.item-row').each(function(){
		var total_price = $(this).find('.item_quantity').val() * $(this).find('.item_unit_price').val();
		var tax= roundNumber((total_price * tax_rate)/100, 2);
		$(this).find('.s_item_tax').html(tax);
		var amount= roundNumber(total_price + tax, 2);
		$(this).find('.s_item_total').html(amount);
		if($(this).find('.item_uuid').val()!=''){
			$(this).find('.savelink').trigger(click);
		}
	});
	update_total();*/
	var tax_rate= $('#tax_rate').val();
	var subtotal= $('#payment_subtotal').val();
	var tax= roundNumber((subtotal * tax_rate)/100, 2);
	var total= Number(subtotal) + Number(tax);
	
	$('#payment_tax').val(tax);
	$('#payment_total').val(total);
	
}



function update_price() {
	var tax=0;
  var row = $(this).parents('.item-row');
  var total_price = row.find('.item_quantity').val() * row.find('.item_unit_price').val();

	total_price= roundNumber(total_price, 2);

  isNaN(total_price) ? row.find('.s_item_total').html("N/A") : row.find('.s_item_total').html(total_price);
  
  //update_total();
}

function save() {

	var row = $(this).parents('.item-row');
	var item_uuid=row.find('.item_uuid').val();
	var payment_id=$('#purchase_id').val();
	var payment_uuid=$('#purchase_uuid').val();
	var line_number=row.find('.line_number').val();
	var item_purchased =row.find('.item_purchased').val();
	var item_quantity =row.find('.item_quantity').val();
	var item_unit_price=row.find('.item_unit_price').val();
	//var item_tax =row.find('.item_tax').val();
	var item_total =row.find('.s_item_total').html();
	//var item_category_uuid =row.find('.item_category_uuid').val();
	var tax_rate =$('#tax_rate').val();
	
	$('.form_validation_reg').removeData('validator');
	$('.form_validation_reg').validate({
				 ignore:':hidden',
				rules: {
					line_number: { required: true },
					item_purchased: { required: true },
					item_quantity: { required: true, digits: true },
					item_unit_price: { required: true, number: true },
				},

		});
	
	if($('.form_validation_reg').valid()){
	
		
				if(item_uuid!=''){
					var dataString = 'item_uuid='+ item_uuid +'&line_number='+line_number+'&item_purchased='+item_purchased+'&item_quantity='+item_quantity+'&item_unit_price='+item_unit_price+'&item_total='+item_total+'&payment_id='+payment_id+'&payment_uuid='+payment_uuid+'&tax_rate='+tax_rate+'&redirect=false&action=Save';
				} else {
					var dataString = 'line_number='+line_number+'&item_purchased='+item_purchased+'&item_quantity='+item_quantity+'&item_unit_price='+item_unit_price+'&item_total='+item_total+'&payment_id='+payment_id+'&payment_uuid='+payment_uuid+'&tax_rate='+tax_rate+'&redirect=false&action=Save';
				}
				// alert(dataString);
				$.ajax({
					type: "GET",
					url: "savepurchaseitem.cgi",
					data: dataString,
					cache: false,
					success: function(html)
					{
						//alert(html);
						//var result=html.split(",");
						if(html.Success) {
							row.find('.item_uuid').val(html.ItemUUID);
							//$('#items').html(html);
							row.find('.s_line_number').html(line_number);
							row.find('.s_item_purchased').html(item_purchased);
							row.find('.s_item_quantity').html(item_quantity);
							row.find('.s_item_unit_price').html(item_unit_price);
							//row.find('.s_item_tax').html(item_tax);
							// row.find('.s_item_category_uuid').html(item_category_uuid);
	
							row.find('.s_line_number').show();
							row.find('.s_item_purchased').show();
							row.find('.s_item_quantity').show();
							row.find('.s_item_unit_price').show();
							//row.find('.s_item_tax').show();
							// row.find('.s_item_category_uuid').show();
							
							row.find('.line_number').hide();
							row.find('.item_purchased').hide();
							row.find('.item_quantity').hide();
							row.find('.item_unit_price').hide();
							//row.find('.item_tax').hide();
							// row.find('.item_category_uuid').hide();
							
							row.find('.savelink').hide();
							row.find('.editlink').show();
							row.find('.cancellink').hide();
							row.find('.removelink').show();

							if(html.Total){
								$('#payment_subtotal').val(html.Subtotal);
								$('#payment_tax').val(html.Payment_Tax);
								$('#payment_total').val(html.Total);
							}
							else{
								update_total();
							}
						}	
					}
				});

	}
}

function edit() {
	$('#items').find(".cancellink").trigger('click');
	var row = $(this).parents('.item-row');
	row.find('.s_line_number').hide();
	row.find('.s_item_purchased').hide();
	row.find('.s_item_quantity').hide();
	row.find('.s_item_unit_price').hide();
	//row.find('.s_item_tax').hide();
	// row.find('.s_item_category_uuid').hide();
	
	row.find('.line_number').show();
	row.find('.item_purchased').show();
	row.find('.item_quantity').show();
	row.find('.item_unit_price').show();
	//row.find('.item_tax').show();
	// row.find('.item_category_uuid').show();
	
	row.find('.savelink').show();
	row.find('.editlink').hide();
	row.find('.cancellink').show();
	row.find('.removelink').hide();
	
	row.find('.line_number').focus();
}
	
	function cancel() {
		var row = $(this).parents('.item-row');
		var item_uuid=row.find('.item_uuid').val();
		if(item_uuid!=''){
			
	row.find('.s_line_number').show();
	row.find('.s_item_purchased').show();
	row.find('.s_item_quantity').show();
	row.find('.s_item_unit_price').show();
	//row.find('.s_item_tax').show();
	// row.find('.s_item_category_uuid').show();
	
	row.find('.line_number').hide();
	row.find('.item_purchased').hide();
	row.find('.item_quantity').hide();
	row.find('.item_unit_price').hide();
	//row.find('.item_tax').hide();
	// row.find('.item_category_uuid').hide();
	
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
	var item_uuid=row.find('.item_uuid').val();
	var payment_id=$('#purchase_id').val();
	var payment_uuid=$('#purchase_uuid').val();
	var tax_rate =$('#tax_rate').val();
	
	var dataString = 'item_uuid='+item_uuid+'&payment_id='+payment_id+'&payment_uuid='+payment_uuid+'&tax_rate='+tax_rate+'&redirect=false&action=Delete';
	
	$.ajax({
		type: "GET",
		url: "savepurchaseitem.cgi",
		data: dataString,
		cache: false,
		success: function(html)
		{
			if(html.Success) {
				row.remove();
				if(html.Total){
					$('#payment_subtotal').val(html.Subtotal);
					$('#payment_tax').val(html.Payment_Tax);
					$('#payment_total').val(html.Total);
				}
				else{
					update_total();
				}
			}
		}
	});
}	



function bind() {
	$(".item_quantity").unbind();
  $(".item_unit_price").unbind();

  
  $(".savelink").unbind();
  $(".editlink").unbind();
  $(".cancellink").unbind();
  $(".removelink").unbind();
	
  $(".item_quantity").blur(update_price);
 $(".item_unit_price").blur(update_price);

  
  $(".savelink").click(save);
  $(".editlink").click(edit);
  $(".cancellink").click(cancel);
  $(".removelink").click(remove);
}

$(function() {
	//$('#invoice_tax_rate').val("20");
	//$('#inv_tax_code').val("UK");
   var tax_code_selected=$('#tax_code').val();
   if(tax_code_selected=='UK'){
	$('#tax_rate').val("20");
   }
  $("#addrow").click(function(){
	$('#items').find(".cancellink").trigger('click');
    $(".item").after('<tr class="item-row" id=""><td class="item-id"><span class="s_line_number" style="display:none;" ></span><div><input type="text" class="line_number"  name="line_number" value="" ></div><input class="item_id" name="item_id" type="hidden" value="" /><input class="item_uuid" name="item_uuid" type="hidden" value="" /></td><td ><span class="s_item_purchased" style="display:none;" ></span><div><input type="text" class="item_purchased" name="item_purchased"  value="" ></div></td><td><span class="s_item_quantity" style="display:none;" ></span><div><input type="text" class="item_quantity"  name="item_quantity" value="" ></div></td><td><span class="s_item_unit_price" style="display:none;" ></span><div><input type="text" class="item_unit_price" name="item_unit_price" value="" ></div></td><td><span class="s_item_total" ></span></td><td><a href="javascript:void(0)" class="editlink" style="display:none;">Edit</a><a href="javascript:void(0)" class="savelink" >Save</a></td><td><a href="javascript:void(0)" class="removelink" style="display:none;" >Remove</a><a href="javascript:void(0)" class="cancellink" >Cancel</a></td></tr>');
	var curr_row = $('.item').next();
	curr_row.find('.line_number').focus();
	
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
	}
	else
	{
		$('#tax_rate').val("20");
	}
	update_total();
	
});

  
 
  
  $("#date").val(print_today());
  
});