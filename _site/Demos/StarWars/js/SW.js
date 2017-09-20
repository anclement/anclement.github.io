$(function(){
  $('#locsubmitbtn').on('click', function(e){
    e.preventDefault();
    $('#ghapidata').html('<div id="loader"><img src="default.svg" alt="loading..."></div>');

     var random = getRandomIntInclusive(1,88);
     var swapiurl = 'https://swapi.co/api/people/'+random+'/?format=json';

    requestJSON(swapiurl, function(json) {
      if(json.name==null) {
        $('#ghapidata').html("<h2>No value found</h2>");
      }
      else {
      var name = json.name;
    	var height= json.height;
    	var mass=json.mass;
    	var hair_color=json.hair_color;
    	var eye_color=json.eye_color;
    	var birth_year=json.birth_year;
    	var gender=json.gender;

      var spec=json.species+'?format=json';
    	var homew=json.homeworld+'?format=json';
    	var films=json.films;
 	   	var vehicles=json.vehicles;
    	var url =json.url;

		var homeworld= homew.replace("http:", "https:")/// because why do i have to do this?
		var species= spec.replace("http:", "https:")/// because why do i have to do this?

//


//search api code from http://blog.comperiosearch.com/blog/2012/03/14/super-simple-image-search-json-jquery-flickr/

        $.getJSON('https://swapi.co/api/people/'+random+'/?format=json',
        {
          format: "json",
          callback: "?"
        },
        function(data) {

            console.log(data)
        });

//End Api code


//This is gonna be messey
          requestJSON(homeworld, function(hw) // will use the homeworld url to call the function add HW
          {
            console.log(hw.name);

           addHomeworld(hw.name);
            }
        );

        function addHomeworld(homeworld)
        {

                requestJSON(species, function(sc)
                      {
                               console.log(name);

                               try {
                                    addSpecies(sc.name);
                               }
                               catch(err) {
                                   addSpecies("Unknown");
                               }
                      }
                      );

        function addSpecies(species)
        {


          films=String(films);
      var films2 = films.replace("https://swapi.co/api/films/1/", "A New Hope").replace("https://swapi.co/api/films/2/", "The Empire Strikes Back").replace("https://swapi.co/api/films/3/", "Return of the Jedi").replace("https://swapi.co/api/films/4/", "The Phantom Menace").replace("https://swapi.co/api/films/5/", "Attack of the Clones").replace("https://swapi.co/api/films/6/", "Revenge of the Sith").replace("https://swapi.co/api/films/7/", "The Force Awakens").replace("https://swapi.co/api/films/8/", "The Last Jedi").replace("https://swapi.co/api/films/9/", "Star Wars 9");



      var outhtml = '<BR><h6>Name:'+name+'</h6> Height:'+ height + '<br>Mass:'+mass+'<br>Hair Color:'+hair_color+'<br> Eye Color:'+eye_color+
      '<br>Birthday Year: '+birth_year+'<br> Gender: '+gender+'<br>Homeworld: '+homeworld+'<br> Species:'+species+'<br> Films Appearing in:'
      +films2+'<br>URL:'+url;
        outputPageContent(outhtml);
      }
    }


  function outputPageContent(outhtml) {
      $('#ghapidata').html(outhtml);
     // $("<img/>").attr("src", "https://img.lum.dolimg.com/v1/images/starwars_551c43f4.jpeg").prependTo("#ghapidata");

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






function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//api key AIzaSyB15WRjq95crAEP2VQ3KMQWOWi4zc-pf7E
//https://www.googleapis.com/customsearch/v1?key=AIzaSyB15WRjq95crAEP2VQ3KMQWOWi4zc-pf7E&cx=014829506670370773268%3Awe5s_bnoiw8&q=StarWars&searchType=image&fileType=jpg&imgSize=small&alt=json
