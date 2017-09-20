$(function(){
  $('#locsubmitbtn').on('click', function(e){
    e.preventDefault();
    $('#ghapidata').html('<div id="loader"><img src="default.svg" alt="loading..."></div>');

      var Lat = $('#Lat').val();
        var Long = $('#Long').val();
         var tempY = document.getElementById("Year");
		var Year = tempY.options[tempY.selectedIndex].value;
		  var tempD = document.getElementById("Day");
		var Day = tempD.options[tempD.selectedIndex].value;
			  var tempM = document.getElementById("Month");
		var Month = tempM.options[tempM.selectedIndex].value;
     var address  = 'https://api.nasa.gov/planetary/earth/imagery?lon='+Long+'&lat='+Lat+'&date='+Year+'-'+Month+'-'+Day+'&cloud_score=True&api_key=QejLcBisOiNzFnAE9EM1h6UDCwGpLN6HN9Bvyf5t';


    requestJSON(address, function(json) {
      if(json.message =='Admins have been notified') {
        $('#ghapidata').html("<h2>No value found</h2>"); //Error message from api, display error to user
      }

      else {
        var date  =  json.date ; //else we have valid dataset and we can diplsay
        var url = json.url;
        var message = json.message;
		if(message='undefined')
		{	message='No Errors';}

        var outhtml ='<h6> System Message:'+message+'<br>'+'User Input:'+'Latittude:'+Lat+' Longitude: '+Long+' '+'  Year: '+Year+' Day: '+ Day +' Month: ' + Month+' <br> <span class="smallname"><img src="'+url+'">'+'</a></span></h6> </font>';

           outputPageContent();

        function outputPageContent() {
          $('#ghapidata').html(outhtml);
        } // end outputPageContent()

      } // end else statement

    }); // end requestJSON Ajax call

  }); // end click event handler

  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
});
