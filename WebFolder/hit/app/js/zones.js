
function save() {
	var curr_table=$(this).parents('.dns_tab').find('table');
	var row = $(this).parents('.item-row');
	var domain_uuid= $('#domain_uuid').val();
	var uuid=row.find('.uuid').val();
	var type =row.find('.type').val();
	var host='', ttl='', priority='', target='', comment='', text='', validate='', weight='', port='', service='', protocol='';
	if(type=='IN MX'){
		host=row.find('.mx_host').val();
		ttl =row.find('.mx_ttl').val();
		priority=row.find('.mx_prty').val();
		target =row.find('.mx_target').val();
		comment =row.find('.mx_cmnt').val();
		
		if(host=='' || type=='' || target=='' ){
			alert('Enter all values');
			return false;
		}
	}
	else if(type=='IN TXT'){
		host=row.find('.txt_host').val();
		ttl =row.find('.txt_ttl').val();
		text=row.find('.txt_text').val();
		comment =row.find('.txt_cmnt').val();
		validate =row.find('.txt_val').val();
		
		if(host=='' || type=='' || text=='' || validate=='' ){
			alert('Enter all values');
			return false;
		}
	}
	else if(type=='IN SRV'){
		service=row.find('.srv_service').val();
		protocol=row.find('.srv_proto').val();
		host=row.find('.srv_host').val();
		ttl =row.find('.srv_ttl').val();
		priority=row.find('.srv_prty').val();
		weight =row.find('.srv_wght').val();
		port =row.find('.srv_port').val();
		target =row.find('.srv_target').val();
		comment =row.find('.srv_cmnt').val();
		
		if(host=='' || type=='' || target=='' ){
			alert('Enter all values');
			return false;
		}
	}
	else{
		host=row.find('.a_host').val();
		ttl =row.find('.a_ttl').val();
		target=row.find('.a_target').val();
		comment =row.find('.a_cmnt').val();
		
		if(host=='' || type=='' || target=='' ){
			alert('Enter all values');
			return false;
		}
	}

		
		var dataString = 'host='+host+'&ttl='+ttl+'&type='+type+'&target='+target+'&comment='+comment+'&priority='+priority+'&text='+text+'&validate='+validate+'&weight='+weight+'&port='+port+'&service='+service+'&protocol='+protocol+'&uuid='+uuid+'&domain_uuid='+domain_uuid+'&redirect=false';	
		
		$.ajax({
		type: "GET",
		url: "savedomainserver.cgi",
		data: dataString,
		dataType: "json",
		cache: false,
		success: function(html)
		{
			if(uuid==''){
				row.find('.uuid').val(html.uuid);
				var statesdemo = {
					state0: {
						title: 'Added Successfully',
						html:'',
						buttons: { OK: 1 },																		
						submit:function(e,v,m,f){ 
							//console.log(f);
							if(v==1) {
								$.prompt.close();
								start=0;
								end=start+25;
								curr_table.find('tbody').html('');
								jsonRaw = 'loaddnsrecords.cgi?start='+start+'&end='+end+'&tablname='+tablname+'&type='+zonetype+'&domain_uuid='+domain_uuid;
								if(keyword!=''){
									jsonRaw +='&keyword='+keyword;
								}	
								load_data(jsonRaw,zonetype);
							}
							
						}
					},
					
				};
				if(!($(".jqibox").length))
				$.prompt(statesdemo);
			}
			if(type=='IN MX'){
				row.find('.mx_chk').val(html.uuid);
				row.find('.s_mx_host').html(host);
				row.find('.s_mx_ttl').html(ttl);			
				row.find('.s_mx_prty').html(priority);
				row.find('.s_mx_target').html(target);
				row.find('.s_mx_cmnt').html(comment);
				row.find('.s_mx_host').show();
				row.find('.s_mx_ttl').show();			
				row.find('.s_mx_prty').show();
				row.find('.s_mx_target').show();
				row.find('.s_mx_cmnt').show();
				row.find('.mx_host').hide();
				row.find('.mx_ttl').hide();
				row.find('.mx_prty').hide();
				row.find('.mx_target').hide();
				row.find('.mx_cmnt').hide();
			}
			else if(type=='IN TXT'){
				row.find('.txt_chk').val(html.uuid);
				row.find('.s_txt_host').html(host);
				row.find('.s_txt_ttl').html(ttl);
				row.find('.s_txt_text').html(text);
				row.find('.s_txt_cmnt').html(comment);
				row.find('.s_txt_val').html(validate);
				row.find('.s_txt_host').show();
				row.find('.s_txt_ttl').show();
				row.find('.s_txt_text').show();
				row.find('.s_txt_cmnt').show();
				row.find('.s_txt_val').show();
				row.find('.txt_host').hide();
				row.find('.txt_ttl').hide();
				row.find('.txt_text').hide();
				row.find('.txt_cmnt').hide();
				row.find('.div_txt_val').hide();
			}
			else if(type=='IN SRV'){
				row.find('.srv_chk').val(html.uuid);
				row.find('.s_srv_service').html(service);
				row.find('.s_srv_proto').html(protocol);
				row.find('.s_srv_host').html(host);
				row.find('.s_srv_ttl').html(ttl);
				row.find('.s_srv_prty').html(priority);
				row.find('.s_srv_wght').html(weight);
				row.find('.s_srv_port').html(port);
				row.find('.s_srv_target').html(target);
				row.find('.s_srv_cmnt').html(comment);
				row.find('.s_srv_service').show();
				row.find('.s_srv_proto').show();
				row.find('.s_srv_host').show();
				row.find('.s_srv_ttl').show();
				row.find('.s_srv_prty').show();
				row.find('.s_srv_wght').show();
				row.find('.s_srv_port').show();
				row.find('.s_srv_target').show();
				row.find('.s_srv_cmnt').show();
				row.find('.srv_service').hide();
				row.find('.srv_proto').hide();
				row.find('.srv_host').hide();
				row.find('.srv_ttl').hide();
				row.find('.srv_prty').hide();
				row.find('.srv_wght').hide();
				row.find('.srv_port').hide();
				row.find('.srv_target').hide();
				row.find('.srv_cmnt').hide();
			}
			else{
				row.find('.a_chk').val(html.uuid);
				row.find('.s_a_host').html(host);
				row.find('.s_a_ttl').html(ttl);
				row.find('.s_type').html(type);
				row.find('.s_a_target').html(target);
				row.find('.s_a_cmnt').html(comment);
				row.find('.s_a_host').show();
				row.find('.s_a_ttl').show();
				row.find('.s_type').show();
				row.find('.s_a_target').show();
				row.find('.s_a_cmnt').show();
				row.find('.a_host').hide();
				row.find('.a_ttl').hide();
				row.find('.div_type').hide();
				row.find('.a_target').hide();
				row.find('.a_cmnt').hide();
			}
			
			row.find('.savelink').hide();
			row.find('.editlink').show();
			row.find('.cancellink').hide();
			row.find('.removelink').show();
		}
		});
		

}

function edit() {
	var row = $(this).parents('.item-row');
	var type=row.find('.type').val();
	if(type=='IN MX'){
		row.find('.s_mx_host').hide();
		row.find('.s_mx_ttl').hide();			
		row.find('.s_mx_prty').hide();
		row.find('.s_mx_target').hide();
		row.find('.s_mx_cmnt').hide();
		row.find('.mx_host').show();
		row.find('.mx_ttl').show();
		row.find('.mx_prty').show();
		row.find('.mx_target').show();
		row.find('.mx_cmnt').show();
		row.find('.mx_host').focus();
	}
	else if(type=='IN TXT'){
		row.find('.s_txt_host').hide();
		row.find('.s_txt_ttl').hide();
		row.find('.s_txt_text').hide();
		row.find('.s_txt_cmnt').hide();
		row.find('.s_txt_val').hide();
		row.find('.txt_host').show();
		row.find('.txt_ttl').show();
		row.find('.txt_text').show();
		row.find('.txt_cmnt').show();
		row.find('.div_txt_val').show();
		row.find('.txt_host').focus();
	}
	else if(type=='IN SRV'){
		row.find('.s_srv_service').hide();
		row.find('.s_srv_proto').hide();
		row.find('.s_srv_host').hide();
		row.find('.s_srv_ttl').hide();
		row.find('.s_srv_prty').hide();
		row.find('.s_srv_wght').hide();
		row.find('.s_srv_port').hide();
		row.find('.s_srv_target').hide();
		row.find('.s_srv_cmnt').hide();
		row.find('.srv_service').show();
		row.find('.srv_proto').show();
		row.find('.srv_host').show();
		row.find('.srv_ttl').show();
		row.find('.srv_prty').show();
		row.find('.srv_wght').show();
		row.find('.srv_port').show();
		row.find('.srv_target').show();
		row.find('.srv_cmnt').show();
		row.find('.srv_service').focus();
	}
	else{
		row.find('.s_a_host').hide();
		row.find('.s_a_ttl').hide();
		row.find('.s_type').hide();
		row.find('.s_a_target').hide();
		row.find('.s_a_cmnt').hide();
		row.find('.a_host').show();
		row.find('.a_ttl').show();
		row.find('.div_type').show();
		row.find('.a_target').show();
		row.find('.a_cmnt').show();
		row.find('.a_host').focus();
	}
	
	row.find('.savelink').show();
	row.find('.editlink').hide();
	row.find('.cancellink').show();
	row.find('.removelink').hide();
	
	
}	
function cancel() {
	var row = $(this).parents('.item-row');
	var uuid=row.find('.uuid').val();
	if(uuid!=''){
		var type=row.find('.type').val();
		if(type=='IN MX'){
			row.find('.s_mx_host').show();
			row.find('.s_mx_ttl').show();			
			row.find('.s_mx_prty').show();
			row.find('.s_mx_target').show();
			row.find('.s_mx_cmnt').show();
			row.find('.mx_host').hide();
			row.find('.mx_ttl').hide();
			row.find('.mx_prty').hide();
			row.find('.mx_target').hide();
			row.find('.mx_cmnt').hide();
		}
		else if(type=='IN TXT'){
			row.find('.s_txt_host').show();
			row.find('.s_txt_ttl').show();
			row.find('.s_txt_text').show();
			row.find('.s_txt_cmnt').show();
			row.find('.s_txt_val').show();
			row.find('.txt_host').hide();
			row.find('.txt_ttl').hide();
			row.find('.txt_text').hide();
			row.find('.txt_cmnt').hide();
			row.find('.div_txt_val').hide();
		}
		else if(type=='IN SRV'){
			row.find('.s_srv_service').show();
			row.find('.s_srv_proto').show();
			row.find('.s_srv_host').show();
			row.find('.s_srv_ttl').show();
			row.find('.s_srv_prty').show();
			row.find('.s_srv_wght').show();
			row.find('.s_srv_port').show();
			row.find('.s_srv_target').show();
			row.find('.s_srv_cmnt').show();
			row.find('.srv_service').hide();
			row.find('.srv_proto').hide();
			row.find('.srv_host').hide();
			row.find('.srv_ttl').hide();
			row.find('.srv_prty').hide();
			row.find('.srv_wght').hide();
			row.find('.srv_port').hide();
			row.find('.srv_target').hide();
			row.find('.srv_cmnt').hide();
		}
		else{
			row.find('.s_a_host').show();
			row.find('.s_a_ttl').show();
			row.find('.s_type').show();
			row.find('.s_a_target').show();
			row.find('.s_a_cmnt').show();
			row.find('.a_host').hide();
			row.find('.a_ttl').hide();
			row.find('.div_type').hide();
			row.find('.a_target').hide();
			row.find('.a_cmnt').hide();
		}
		row.find('.savelink').hide();
		row.find('.editlink').show();
		row.find('.cancellink').hide();
		row.find('.removelink').show();
	}
	else
	{
		row.remove();
	}
	
}

function remove() {
	var curr_table=$(this).parents('.dns_tab').find('table');
	var row = $(this).parents('.item-row');
	var domain_uuid= $('#domain_uuid').val();
	var uuid=row.find('.uuid').val();
	var dataString = 'dns_uuids='+uuid+'&domain_uuid='+domain_uuid+'&redirect=false';

	$.ajax({
		type: "GET",
		url: "deletednsrecord.cgi",
		data: dataString,
		cache: false,
		success: function(html)
		{
			//row.remove();
			if(html.Success){
			var statesdemo = {
					state0: {
						title: 'Deleted Successfully',
						html:'',
						buttons: { OK: 1 },																		
						submit:function(e,v,m,f){ 
							//console.log(f);
							if(v==1) {
								$.prompt.close();
								start=0;
								end=start+25;
								curr_table.find('tbody').html('');
								jsonRaw = 'loaddnsrecords.cgi?start='+start+'&end='+end+'&tablname='+tablname+'&type='+zonetype+'&domain_uuid='+domain_uuid;
								if(keyword!=''){
									jsonRaw +='&keyword='+keyword;
								}	
								load_data(jsonRaw,zonetype);
							}
							
						}
					},
					
				};
				if(!($(".jqibox").length))
				$.prompt(statesdemo);
			}
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

function delete_dns(chk){
	var curr_table=$('.'+chk).parents('table');
	var selected='';
	$('.'+chk).each(function(){
		if($(this).is(":checked")){
			if(selected==''){
				selected=$(this).val();
			}
			else{
				selected+=","+$(this).val();
			}
		}					 
	});
	if(selected!=''){
		var domain_uuid= $('#domain_uuid').val();

	var dataString = 'dns_uuids='+selected+'&domain_uuid='+domain_uuid+'&redirect=false';

	$.ajax({
		type: "GET",
		url: "deletednsrecord.cgi",
		data: dataString,
		cache: false,
		success: function(html)
		{
			//row.remove();
			if(html.Success){
			var statesdemo = {
					state0: {
						title: 'Deleted Successfully',
						html:'',
						buttons: { OK: 1 },																		
						submit:function(e,v,m,f){ 
							//console.log(f);
							if(v==1) {
								$.prompt.close();
								start=0;
								end=start+25;
								curr_table.find('tbody').html('');
								jsonRaw = 'loaddnsrecords.cgi?start='+start+'&end='+end+'&tablname='+tablname+'&type='+zonetype+'&domain_uuid='+domain_uuid;
								if(keyword!=''){
									jsonRaw +='&keyword='+keyword;
								}	
								load_data(jsonRaw,zonetype);
							}
							
						}
					},
					
				};
				if(!($(".jqibox").length))
				$.prompt(statesdemo);
			}
		}
	});
	}
}


$(function() {
	$("#a_addrow").click(function(){
		$("#a_records").prepend('<tr class="item-row"><td><input type="checkbox" class="a_chk" ><input type="hidden" class="uuid" value=""/></td><td><span class="s_a_host" style="display:none" ></span><input class="a_host span12" type="text" value=""/></td><td ><span class="s_a_ttl" style="display:none" ></span><input type="text" class="a_ttl span12" value=""></td><td><span class="s_type" style="display:none" ></span><div class="ui-select div_type"><select class="type" ><option value="IN A">IN A</option><option value="IN AAAA">IN AAAA</option><option value="IN CNAME">IN CNAME</option></select></div></td><td><span class="s_a_target" style="display:none" ></span><input type="text" class="a_target span12" value=""  ></td><td><span class="s_a_cmnt" style="display:none" ></span><input type="text" class="a_cmnt span12" value="" ></td><td align="left"><a href="javascript:void(0)" class="editlink" style="display:none" title="Edit">Edit</a><a href="javascript:void(0)" title="Save" class="savelink" style="text-decoration: none;">Save</a>&nbsp;&nbsp;<a href="javascript:void(0)" class="removelink" style="display:none" title="Delete">Delete</a><a href="javascript:void(0)" style="text-decoration: none;" class="cancellink" title="Cancel">Cancel</a></td></tr>');
		 //$("input:checkbox, input:radio").uniform();
		var curr_row = $("#a_records").find('tr').eq(0);
		curr_row.find('.a_host').focus();
		bind();
	});
	
	$("#mx_addrow").click(function(){
		$("#mx_records").prepend('<tr class="item-row"><td><input type="checkbox" class="mx_chk" ><input type="hidden" class="uuid" value=""/></td><td ><span style="display:none;" class="s_mx_host"></span><input class="mx_host span12" type="text" /></td><td ><span class="s_mx_ttl" style="display:none;"></span><input class="mx_ttl span12" type="text" /></td><td >IN MX<input class="type" type="hidden" value="IN MX"/></td><td ><span style="display:none;" class="s_mx_prty"></span><input class="mx_prty span12" type="text" /></td><td ><span style="display:none;" class="s_mx_target"></span><input class="mx_target span12" type="text" /> </td><td ><span style="display:none;" class="s_mx_cmnt"></span><input class="mx_cmnt span12" type="text" /></td><td align="left"><a href="javascript:void(0)" class="editlink" style="display:none" title="Edit">Edit</a><a href="javascript:void(0)" title="Save" class="savelink" style="text-decoration: none;">Save</a>&nbsp;&nbsp;<a href="javascript:void(0)" class="removelink" style="display:none" title="Delete">Delete</a><a href="javascript:void(0)" style="text-decoration: none;" class="cancellink" title="Cancel">Cancel</a></td></tr>');
		// $("input:checkbox, input:radio").uniform();
		var curr_row = $("#mx_records").find('tr').eq(0);
		curr_row.find('.mx_host').focus();
		bind();
	});
	
	$("#txt_addrow").click(function(){
		$("#txt_records").prepend('<tr class="item-row"><td><input type="checkbox" class="txt_chk" ><input type="hidden" class="uuid" value=""/></td> <td ><span style="display:none;" class="s_txt_host"></span><input class="txt_host span12" type="text" /></td><td ><span style="display:none;" class="s_txt_ttl"></span><input class="txt_ttl span12" type="text" /></td><td >IN TXT<input class="type" type="hidden" value="IN TXT"/></td><td ><span style="display:none;" class="s_txt_text">Text</span><input class="txt_text span12" type="text" /></td><td ><span style="display:none;" class="s_txt_cmnt"></span><input class="txt_cmnt span12" type="text" /></td><td ><span style="display:none;" class="s_txt_val"></span><div class="ui-select div_txt_val"><select class="txt_val" ><option  value="None">None</option></select></div></td><td align="left"><a href="javascript:void(0)" class="editlink" style="display:none" title="Edit">Edit</a><a href="javascript:void(0)" title="Save" class="savelink" style="text-decoration: none;">Save</a>&nbsp;&nbsp;<a href="javascript:void(0)" class="removelink" style="display:none" title="Delete">Delete</a><a href="javascript:void(0)" style="text-decoration: none;" class="cancellink" title="Cancel">Cancel</a></td></tr>');
		//$("input:checkbox, input:radio").uniform();
		var curr_row = $("#txt_records").find('tr').eq(0);
		curr_row.find('.txt_host').focus();
		bind();
	});
	
	$("#srv_addrow").click(function(){
		$("#srv_records").prepend('<tr class="item-row"><td><input type="checkbox" class="srv_chk" ><input type="hidden" class="uuid" value=""/></td><td ><span style="display:none;" class="s_srv_service"></span><input class="srv_service span12" type="text" /></td><td ><span style="display:none;" class="s_srv_proto"></span><input class="srv_proto span12" type="text" /></td><td ><span style="display:none;" class="s_srv_host"></span><input class="srv_host span12" type="text" /></td><td ><span style="display:none;" class="s_srv_ttl"></span><input class="srv_ttl span12" type="text" /></td><td >IN SRV<input class="type" type="hidden" value="IN SRV"/></td><td ><span style="display:none;" class="s_srv_prty"></span><input class="srv_prty span12" type="text" /></td><td ><span style="display:none;" class="s_srv_wght"></span><input class="srv_wght span12" type="text" /></td><td ><span style="display:none;" class="s_srv_port"></span><input class="srv_port span12"  type="text" /></td><td ><span style="display:none;" class="s_srv_target"></span><input class="srv_target span12"  type="text" /></td><td ><span style="display:none;" class="s_srv_cmnt"></span><input class="srv_cmnt span12" type="text" /></td><td align="left"><a href="javascript:void(0)" class="editlink" style="display:none" title="Edit">Edit</a><a href="javascript:void(0)" title="Save" class="savelink" style="text-decoration: none;">Save</a>&nbsp;&nbsp;<a href="javascript:void(0)" class="removelink" style="display:none" title="Delete">Delete</a><a href="javascript:void(0)" style="text-decoration: none;" class="cancellink" title="Cancel">Cancel</a></td></tr>');
		//$("input:checkbox, input:radio").uniform();
		var curr_row = $("#srv_records").find('tr').eq(0);
		curr_row.find('.srv_service').focus();
		bind();
	});
	
	bind();
	
	$('#tabs-1').on("click","#a_chk_all", function(){
		if($(this).is(":checked")){
			$('#a_records div.checker').find('span').addClass('checked');
			$('.a_chk').prop('checked', true);
		}
		else{
			$('#a_records div.checker').find('span').removeClass('checked');
			$('.a_chk').prop('checked', false);	
		}
	});
	
	$('#tabs-2').on("click","#mx_chk_all", function(){
		if($(this).is(":checked")){
			$('#mx_records div.checker').find('span').addClass('checked');
			$('.mx_chk').prop('checked', true);
		}
		else{
			$('#mx_records div.checker').find('span').removeClass('checked');
			$('.mx_chk').prop('checked', false);	
		}
	});
	$('#tabs-3').on("click","#txt_chk_all", function(){
		if($(this).is(":checked")){
			$('#txt_records div.checker').find('span').addClass('checked');
			$('.txt_chk').prop('checked', true);
		}
		else{
			$('#txt_records div.checker').find('span').removeClass('checked');
			$('.txt_chk').prop('checked', false);	
		}
	});
	$('#tabs-4').on("click","#srv_chk_all", function(){
		if($(this).is(":checked")){
			$('#srv_records div.checker').find('span').addClass('checked');
			$('.srv_chk').prop('checked', true);
		}
		else{
			$('#srv_records div.checker').find('span').removeClass('checked');
			$('.srv_chk').prop('checked', false);	
		}
	});
});