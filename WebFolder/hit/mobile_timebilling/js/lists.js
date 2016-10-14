/*
File Name: lists.js
Description: Document gets job listing from database and sends back json data
Author: Chetan Sharma
Created On: ‎Wednesday, ‎August ‎01, ‎2012, ‏‎2:12:58 PM
*/

//var serviceURL = "/../../sachinmishra/test/jQmsearch/services/";
//var serviceURL = "/../../sachinmishra/test/jQmsearch/services/";
//var serviceURL = "http://localhost/jQmsearch/services/";

var jobs;
$( '#jobsListPage' ).live('pageshow', function(event) {
	getJobsList();
});


function getJobsList() {
	//alert(window.location.href.slice(window.location.href.indexOf('?') + 1));
	var type= "";
	var str = "?";
	
	var permanent = getUrlVars()["permanent"];
	var contract = getUrlVars()["contract"];
	var freelance_temp = getUrlVars()["freelance_temp"];

	if(permanent){
		type += permanent+',';
	}
	if(contract){
		type += contract+',';
	}
	if(freelance_temp){
		type += freelance_temp;
	}
	if(type!=''){
		str += "jobtype="+type+"&"
	}
		
	var quer_str = window.location.href.slice(window.location.href.indexOf('?') + 1);
	str += quer_str;
	//alert(str);
	
	/*var cat_id = getUrlVars()["cat_id"];
	var location = getUrlVars()["loc"];
	var division = getUrlVars()["emp"];
	var iws_search = getUrlVars()["iws_search"];
	var salary = getUrlVars()["salary"];

	if(cat_id){
		str = str+"cat_id="+cat_id;
	}
	if(location){
		str = str+"location="+location;
	}
	if(division){
		str = str+"division="+division;
	}
	if(iws_search){
		str = str+"iws_search="+iws_search;
	}
	if(salary){
		str = str+"salary_range="+salary;
	}*/
	
	
	$.getJSON('../jqm/includes/listing.php'+str, function(data) {
		$('#jobsList li').remove();
		jobss = data.items;
		/*$.each(jobss, function(index, jobs) {
			$('#jobsList').append('<li><a href="jobdetail.php?code=' + jobs.Code + '">' +
					'<h4>' + jobs.Document + '</h4>' +
					'<p>' + jobs.FFAlpha80_1 + '</p>' +
					'<p>' + jobs.ID + '</p>');
		});*/
		/*$.each(jobss, function(index, jobs) {
			$('#jobsList').append('<div data-role="collapsible" data-collapsed="true" data-iconpos="right" data-theme="a" data-content-theme="a"><h3>' + jobs.Document  +
					'<p style="font-size:12px;">Salary:' + jobs.FFAlpha80_2 + '<br>Location:' + jobs.FFAlpha80_1 + '</p></h3>' +
					'<p>Type:' + jobs.FFAlpha80_3 + '<br>Company:' + jobs.FFAlpha80_4 + '<br>Division:' + jobs.Title + '</p><a data-role="button" data-transition="fade" data-theme="a" data-rel="View" class="ui-btn-left" href="jobdetail.php?code=' + jobs.Code + '">View</a><a data-role="button" data-transition="fade" data-theme="a" data-rel="dialog" class="ui-btn-left" href="applynow.php?jobId='+jobs.ID+'">Apply</a></div>');
		});*/
		var htmcode = '';
		$.each(jobss, function(index, jobs) {
			htmcode += '<div data-role="collapsible" data-collapsed="true" data-iconpos="right" data-theme="a" data-content-theme="a"><h3>' + jobs.Document  +
					'<p style="font-size:12px;">Salary:' + jobs.FFAlpha80_2 + '<br>Location:' + jobs.FFAlpha80_1 + '</p></h3>' +
					'<p>Type:' + jobs.FFAlpha80_3 + '<br>Company:' + jobs.FFAlpha80_4 + '<br>Division:' + jobs.Title + '</p><a data-role="button" data-transition="fade" data-theme="a" data-rel="View" class="ui-btn-left" href="jobdetail.php?code=' + jobs.Code + '">View</a><a data-role="button" data-transition="fade" data-theme="a" class="ui-btn-left" href="applynow.php?jobId='+jobs.ID+'">Apply</a></div>';
		});
		$('#jobsList').html(htmcode).trigger( "create" );
		//$('#jobsList').listview('refresh');
	});
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
