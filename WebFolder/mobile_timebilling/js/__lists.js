//var serviceURL = "/../../sachinmishra/test/jQmsearch/services/";
//var serviceURL = "/../../sachinmishra/test/jQmsearch/services/";
//var serviceURL = "http://localhost/jQmsearch/services/";

var jobs;
$( '#jobsListPage' ).live('pageshow', function(event) {
	getJobsList();
});


function getJobsList() {
	var str = "?";
	var cat_id = getUrlVars()["cat_id"];
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
	}
	
	
	$.getJSON('../jqm/includes/listing.php'+str, function(data) {
		$('#jobsList li').remove();
		jobss = data.items;
		$.each(jobss, function(index, jobs) {
			$('#jobsList').append('<li><a href="jobdetail.php?code=' + jobs.Code + '">' +
					'<h4>' + jobs.Document + '</h4>' +
					'<p>' + jobs.FFAlpha80_1 + '</p>' +
					'<p>' + jobs.ID + '</p>');
		});
		$('#jobsList').listview('refresh');
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
