// JavaScript Document
// JavaScript Document
//$('#applynow').live('pageshow', function(event) {
	/*var name = getUrlVars()["name"];
	var email = getUrlVars()["email"];
	var tel = getUrlVars()["tel"];
	var notes = getUrlVars()["notes"];
	var data = $('#apply').serialize();
	
	$.getJSON('../jqm/includes/applyJob.php?data='+data, applyJob);*/
	
	$('#apply').submit(function() { // catch the form's submit event
	alert('dfhgdfgdfhgdfhgd');
		$.ajax({ // create an AJAX call...
			data: $(this).serialize(), // get the form data
			type: $(this).attr('method'), // GET or POST
			url: $(this).attr('action'), // the file to call
			success: function(response) { // on success..
				$('#created').html(response); // update the DIV
			}
		});
		return false; // cancel original event to prevent form submitting
	}); 	
	
	
//});

function applyJob(data) {
	var job = data.item;
	console.log(job);
	$('#jobName').text(job.Document);
	$('#jobDetail').html(job.Body);

	if (job.Published_timestamp>0) {
		var publish = timeConverter(job.Published_timestamp);
		$('#actionList').append('<li><h3>Date posted</h3>' +
				'<p>' + publish + '</p></li>');
	}
	
	
	$('#actionList').listview('refresh');
	
}

