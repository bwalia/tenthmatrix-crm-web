function save_contact(lead_uuid){
var div_par=$('#tabs-2');	
var lead_id=$('#lead_id').val();
var contact_uuid=div_par.find('.contact_uuid').val();
var forename=div_par.find('.forename').val();
var surname=div_par.find('.surname').val();
var email=div_par.find('.email').val();
var mobile=div_par.find('.mobile').val();
var lead_uuid=div_par.find('.lead_uuid').val();
 

// var not_for_sale='';
// var keyword_complete='';
// var alt_preview='';
// 
// if(div_par.find('.not_for_sale').is(':checked')){
// 	not_for_sale=div_par.find('.not_for_sale').val();
// }
// if(div_par.find('.keyword_complete').is(':checked')){
// 	keyword_complete=div_par.find('.keyword_complete').val();
// }
// if(div_par.find('.alt_preview').is(':checked')){
// 	alt_preview=div_par.find('.alt_preview').val();
// }

		
var dataString = 'lead_id='+lead_id+'&contact_uuid='+contact_uuid+'&forename='+forename+'&surname='+surname+'&email='+email+'&mobile='+mobile+'&lead_uuid='+lead_uuid+'&keyword_complete='+keyword_complete+'&alt_preview='+alt_preview+'&redirect=false';

//alert(dataString);
	
$.ajax({
type: "GET",
url: "saveleadcontact.cgi",
data: dataString,
cache: false,
success: function(html)
{	
	alert("Contact saved successfully");
}
});

}

function delete_contact(lead_uuid){
var div_par=$('#tabs-1');	
var lead_id=$('#lead_id').val();

var delcontact_uuid=div_par.find('.contact_uuid').val();

		
var dataString = 'lead_id='+lead_id+'delcontact_uuid='+contact_uuid+'&redirect=false';

//alert(dataString);
	
$.ajax({
type: "GET",
url: "saveleadcontact.cgi",
data: dataString,
cache: false,
success: function(html)
{	

		alert("Contact deleted successfully");
		window.location.href="lead.shtml?id="+lead_id;
	
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

function save_acivity() {

var row = $(this).parents('.item-row');


var lead_id=$('#lead_id').val();
var activity_uuid =row.find('.activity_uuid').val();
var action =row.find('.action').val();
var phone =row.find('.phone').val();
var owner =row.find('.owner').val();
 
 
		
var dataString = 'lead_id='+lead_id+'&activity_uuid='+activity_uuid+'&action='+action+'&phone='+phone+'&owner='+owner+'&redirect=false';

//alert(dataString);
	
$.ajax({
type: "GET",
url: "saveleadacivity.cgi",
data: dataString,
dataType: "json",
cache: false,
success: function(html)
{
	//alert(html);
	
	if(html.id!=''){
		
	row.find('.lead_id').val(html.id);
	
	}

row.find('.s_ContactName').html(rid);
	row.find('.s_action').html(relation);
	
row.find('.s_ContactName').show();
	row.find('.s_action').show();
	
	
	row.find('.s_ContactName').hide();
	row.find('.s_action').hide();
	
	
	row.find('.savelink').hide();
	row.find('.editlink').show();
	row.find('.cancellink').hide();
	row.find('.removelink').show();
 bind();
 
});
}
else
{
alert('enter all values');
}
}

function edit() {
	
		var row = $(this).parents('.item-row');
	row.find('.s_ContactName').hide();
	row.find('.s_action').hide();
	
	
	row.find('.s_ContactName').show();
	row.find('.s_action').show();
	
	row.find('.savelink').show();
	row.find('.editlink').hide();
	row.find('.cancellink').show();
	row.find('.removelink').hide();
	
	row.find('.description').focus();
		
	}
	
	function cancel() {
		var row = $(this).parents('.item-row');
		var id=row.find('.id').val();
		if(id!=''){
			
	row.find('.s_ContactName').show();
	row.find('.s_action').show();
	
	
	row.find('.s_ContactName').hide();
	row.find('.s_action').hide();
	
	row.find('.savelink').hide();
	row.find('.editlink').show();
	row.find('.cancellink').hide();
	row.find('.removelink').show();
		}
		else
		{
			
			row.hide();
		}
		
	}
	
	function remove() {
		
		var row = $(this).parents('.item-row');
		
		var activity_uuid=row.find('.activity_uuid').val();

var dataString = 'delact_uuid='+activity_uuid;
//alert(dataString);
$.ajax({
type: "GET",
url: "saveleadacivity.cgi",
data: dataString,
cache: false,
success: function(html)
{
//$('#items').html(html);

	row.hide();

 
}
});
}	

/* varient keywords- start */
 

   
// 
// /* varient related- start */
// function rel_var_bind() {
// 	
//   $(".rel_var_savelink").unbind();
//   $(".rel_var_editlink").unbind();
//   $(".rel_var_cancellink").unbind();
//   $(".rel_var_removelink").unbind();
//   
//   $(".rel_var_savelink").click(rel_var_save);
//   $(".rel_var_editlink").click(rel_var_edit);
//   $(".rel_var_cancellink").click(rel_var_cancel);
//   $(".rel_var_removelink").click(rel_var_remove);
//   
// }
// 
// function rel_var_save() {
// 	
// var par_div= $(this).parents('.var_tabs');
// var var_id= par_div.find('.var_id').val();
// 
// var img_id=$('#img_id').val();
// 
// var row = $(this).parents('.item-row');
// 
// var id=row.find('.id').val();
// var rid =row.find('.rid').val();
// var relation =row.find('.relation').val();
// 
// 
// if(rid!='' && relation!='' )
// {
// 	
// 		
// var dataString = 'img_id='+img_id+'&var_id='+var_id+'&id='+id+'&rid='+rid+'&relation='+relation+'&redirect=false';
// 
// alert(dataString);
// 	
// $.ajax({
// type: "GET",
// url: "saverelatedvarient.cgi",
// data: dataString,
// dataType: "json",
// cache: false,
// success: function(html)
// {
// 	//alert(html);
// 	
// 	if(html.id!=''){
// 		
// 	row.find('.id').val(html.id);
// 	
// 	}
// 
// row.find('.s_rid').html(rid);
// 	row.find('.s_relation').html(relation);
// 	
// row.find('.s_rid').show();
// 	row.find('.s_relation').show();
// 	
// 	
// 	row.find('.rid').hide();
// 	row.find('.relation').hide();
// 	
// 	
// 	row.find('.rel_var_savelink').hide();
// 	row.find('.rel_var_editlink').show();
// 	row.find('.rel_var_cancellink').hide();
// 	row.find('.rel_var_removelink').show();
// 
//  
// }
// });
// }
// else
// {
// alert('enter all values');
// }
// }
// 
// function rel_var_edit() {
// 	
// 		var row = $(this).parents('.item-row');
// 	row.find('.s_rid').hide();
// 	row.find('.s_relation').hide();
// 	
// 	
// 	row.find('.rid').show();
// 	row.find('.relation').show();
// 	
// 	row.find('.rel_var_savelink').show();
// 	row.find('.rel_var_editlink').hide();
// 	row.find('.rel_var_cancellink').show();
// 	row.find('.rel_var_removelink').hide();
// 	
// 	row.find('.rid').focus();
// 		
// 	}
// 	
// 	function rel_var_cancel() {
// 		var row = $(this).parents('.item-row');
// 		var id=row.find('.id').val();
// 		if(id!=''){
// 			
// 	row.find('.s_rid').show();
// 	row.find('.s_relation').show();
// 	
// 	
// 	row.find('.rid').hide();
// 	row.find('.relation').hide();
// 	
// 	row.find('.rel_var_savelink').hide();
// 	row.find('.rel_var_editlink').show();
// 	row.find('.rel_var_cancellink').hide();
// 	row.find('.rel_var_removelink').show();
// 		}
// 		else
// 		{
// 			
// 			row.hide();
// 		}
// 		
// 	}
// 	
// 	function rel_var_remove() {
// 		
// 		var row = $(this).parents('.item-row');
// 		
// 		var id=row.find('.id').val();
// 
// var dataString = 'delitem_id='+id;
// //alert(dataString);
// $.ajax({
// type: "GET",
// url: "delrelatedvarient.cgi",
// data: dataString,
// cache: false,
// success: function(html)
// {
// //$('#items').html(html);
// 
// 	row.hide();
// 
// }
// });
// }	
// /* varient related- end */
// 
// $(function () {
// 	
// 	bind();
// 	
// 	var_key_bind();
// 	rel_var_bind();
// 		
// 		$(".rel_addrow").click(function(){
//     $("#rel_images tr.item").after('<tr class="item-row"><td class="item-id"><span class="s_rid" style="display:none;" ></span><input type="text" class="rid" ><input type="hidden" class="id" ></td><td ><span class="s_relation" style="display:none;" ></span><input type="text" class="relation" ></td><td ><a href="javascript:void(0)" class="editlink" style="display:none">Edit</a><a href="javascript:void(0)" class="savelink" >Save</a></td><td><a href="javascript:void(0)" class="removelink" style="display:none" >Remove</a><a href="javascript:void(0)" class="cancellink" >Cancel</a></td></tr>');
// 	var curr_row = $("#rel_images tr.item").next();
// 	curr_row.find('.rid').focus();
// 	
//     //if ($(".delete").length > 0) $(".delete").show();
//     bind();
//   });
//   
//   $(".vkey_addrow").click(function(){
// 								  
// 	var tbl= $(this).parents('table');
//     tbl.find("tr.item").after('<tr class="item-row" ><td class="item-id"><span class="s_vkeyword" style="display:none;" ></span><input type="hidden" class="key_vid" value="" ><input type="text" class="vkeyword" value="" ></td><td ><span class="s_vpriority" style="display:none;" ></span><input type="text" class="vpriority"  value="" ></td><td><span class="s_vlanguage" style="display:none;" ></span><input type="text" class="vlanguage"  value="" ></td><td><span class="s_vsource" style="display:none;" ></span><input type="text" class="vsource"  value="" ></td><td><span class="s_vsynonym" style="display:none;" ></span><input type="text" class="vsynonym"  value="" ></td><td ><a href="javascript:void(0)" class="vkey_editlink" style="display:none">Edit</a><a href="javascript:void(0)" class="vkey_savelink" >Save</a></td><td><a href="javascript:void(0)" class="vkey_removelink" style="display:none" >Remove</a><a href="javascript:void(0)" class="vkey_cancellink" >Cancel</a></td></tr>');
// 	var curr_row = tbl.find("tr.item").next();
// 	curr_row.find('.vkeyword').focus();
// 	
//     //if ($(".delete").length > 0) $(".delete").show();
//     var_key_bind();
//   });
//   
//   $(".rel_var_addrow").click(function(){
// 	var tbl= $(this).parents('table');
//     tbl.find("tr.item").after('<tr class="item-row"><td class="item-id"><span class="s_rid" style="display:none;" ></span><input type="text" class="rid" ><input type="hidden" class="id" ></td><td ><span class="s_relation" style="display:none;" ></span><input type="text" class="relation" ></td><td ><a href="javascript:void(0)" class="rel_var_editlink" style="display:none">Edit</a><a href="javascript:void(0)" class="rel_var_savelink" >Save</a></td><td><a href="javascript:void(0)" class="rel_var_removelink" style="display:none" >Remove</a><a href="javascript:void(0)" class="rel_var_cancellink" >Cancel</a></td></tr>');
// 	var curr_row = tbl.find("tr.item").next();
// 	curr_row.find('.rid').focus();
// 	
//     //if ($(".delete").length > 0) $(".delete").show();
//     rel_var_bind();
//   });
// 	
// 			
// });