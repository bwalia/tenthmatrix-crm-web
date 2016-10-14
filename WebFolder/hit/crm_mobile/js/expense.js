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
	if(start_mile>0 && end_mile>start_mile){
		var distance=roundNumber(end_mile-start_mile,2);
		$('#distance').val(distance);
		//update_list();
	}
	else{
		$('#distance').val('0');
	}
}

function update_tax()
{
	var tax_rate=Number($('#tax_rate').val());
	var total=0;
	$('.s_amount').each(function(){
		total+=Number($(this).val());
	});
	
	var tax_amt=0;
	if(tax_rate>0 && total>0){
		tax_amt=roundNumber((total*tax_rate)/100,2);
		$('#tax_amount').val(tax_amt);
	}
	total=roundNumber(Number(total)+Number(tax_amt),2);
	$('#total_amount').val(total);
}

function update_total()
{
	var total=0;
	$('.s_amount').each(function(){
		total+=Number($(this).val());
		alert(total);				   
	});
	
	var tax_rate=Number($('#tax_rate').val());
		var tax_amt=0;
	if(tax_rate>0 && total>0){
		tax_amt=roundNumber((total*tax_rate)/100,2);
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
	
	if(amount>0) {
	var row_edit='';
	var rowCount = $('#contentoftable tr').length;
	var rows = $('tr', '#contentoftable');
	for(var i=rowCount-2; i>=1; i--){
		var curr_row = rows.eq(i);
		if(curr_row.find(".s_type").html().trim()=="Travel"){
			row_edit=curr_row;
			break;	
		}
	}
	if(row_edit!=''){
		row_edit.find('.editlink').trigger('click');
		row_edit.find('.description').val(description);
		row_edit.find('.type').val(type);
		row_edit.find('.amount').val(amount);
		row_edit.find('.editlink').trigger('click');
		row_edit.find('.savelink').trigger('click');
	}
	else
	{
	
	$("#items tr.item").after('<tr class="item-row"><td class="item-id"><span class="s_type" style="display:none;" ></span><div class="ui-select div_type"><select class="type" ><option value="">--Type--</option>'+type_options+'</select></div><input class="item_uuid" type="hidden" /></td><td ><span class="s_description" style="display:none" ></span><textarea class="description">'+description+'</textarea></td><td><span class="s_amount" style="display:none;" ></span><input type="text" class="amount" value="'+amount+'" ></td><td ><a href="javascript:void(0)" class="editlink" style="display:none">Edit</a><a href="javascript:void(0)" class="savelink" >Save</a></td><td><a href="javascript:void(0)" class="removelink" style="display:none" >Remove</a><a href="javascript:void(0)" class="cancellink" >Cancel</a></td></tr>');
	bind();
	var curr_row = $('#items tr.item').next();
	
	curr_row.find('.savelink').trigger('click');
	}
	
	}
	
}

function addnewItem(){
	$("#invErr").remove();
	var m_uuid=$('#mileage_uuid').val();
	var type =$('#n_type').val();
	var description =$('#n_description').val();
	var amount=$('#n_amount').val();
		
	if(description!='' && type!='' && amount!=''){
		if(!isNaN(amount)){
			var dataString = 'description='+description+'&type='+type+'&amount='+amount+'&m_uuid='+m_uuid+'&redirect=false';

				$.ajax({
					type: "POST",
					url: "saveexpenseitem.cgi",
					data: dataString,
					cache: false,
					success: function(html){
						if(html.uuid) {
							$('#popupForNewItem').popup('close');
							var tablerow="<tr><td>"+type+"<input class='s_type' type='hidden' value='"+type+"'></td><td><input class='s_description' type='hidden' value='"+description+"'>"+description+"</td><td><input class='s_amount' type='hidden' value='"+amount+"'>"+amount+"</td></tr>";
							$("#contentoftable").append(tablerow);
							$( ".loadedTable" ).table( "rebuild" );
							update_total();
							
						}	
					}
				});
			}else{
				var e_msg = "<div id='invErr' style='color:#CC0000; font-size:14px;font-style:italic;'>* Enter a numeric value for amount</div>" ;
				$(".newItemMsg").after(e_msg);
				$('#new_unit_price').val('');
				$('#new_unit_price').focus();
			}
	}else {
		var e_msg = "<div id='invErr' style='color:#CC0000; font-size:14px;font-style:italic;'>* Enter all fields!</div>" ;
		$(".newItemMsg").after(e_msg);
	}
}

function get_client()
{
	var inv_no=	$("#inv_no").val();
	if(Number(inv_no)>0) {
	var dataString = 'inv_no='+inv_no;
	$.ajax({
type: "GET",
dataType: "json",
url: "getclientname.cgi",
data: dataString,
cache: false,
success: function(html)
{
	if(html.paid){
		__alertMessage("This Invoice is Already Paid");
		$("#inv_no").val('0');
		$("#client_id").val('');
		$("#client_name").val('');
		$("#project_code").val('');
	}else{
		$("#client_id").val(html.CustomerID);
		$("#client_name").val(html.CustomerName);
		$("#project_code").val(html.ProjectName);
	}
}
});
	}
	else{
		$("#client_id").val('');
	$("#client_name").val('');
	$("#project_code").val('');
	}
}
$(function() {
  $("#start_mile").blur(update_distance);
  $("#end_mile").blur(update_distance);
  $("#tax_rate").blur(update_tax);
  
  //$("#price_per").blur(update_list);
  $("#inv_no").blur(get_client);
});