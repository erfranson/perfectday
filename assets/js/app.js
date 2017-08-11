//THIS IS THE START OF SIGN UP

// Initialize Firebase
var config = {
	apiKey: "AIzaSyAqKEVE2OkbS65BcE43GNUML6cbUkKIo7Q",
    authDomain: "perfectday-28ddb.firebaseapp.com",
    databaseURL: "https://perfectday-28ddb.firebaseio.com",
    projectId: "perfectday-28ddb",
    storageBucket: "gs://perfectday-28ddb.appspot.com",
    messagingSenderId: "711082949083"
  };
  firebase.initializeApp(config);

var database = firebase.database();
var data = [];
var loginState = false;

database.ref('/login').on("value", function(snap) {
  data = snap.val().users;
  data = JSON.parse(data);
  console.log(data);
});

// Button for adding new users
$('#signUp').on("click", function (event) {
  event.preventDefault();

//if statement for passing matching passwords to database or providing an alert that they do not match
  if (document.getElementById('inputPassword3').value === document.getElementById('inputPassword4').value) {
    //alert that new user was added
  var loginInfo = {
    email: $('#inputEmail3').val(),
    password: $('#inputPassword3').val()
  };
    alert("New User Added");
  data.push(loginInfo);
  data = JSON.stringify(data);
  database.ref('/login').set({
    users: data
  });
    //clear inputs
    $("#inputEmail3").val("");
    $("#inputPassword3").val("");
    $("#inputPassword4").val("");
    window.location.href = "../dailyQuestions/dailyQuestions.html";
  } else {
    alert("Passwords do not match!");
  }
});

//END OF SIGNUP


//BEGIN SIGN-IN SECTION

$('#signIn').on('click', function(event) {
	loginState = false;
	var loginInfo = {
		email: $('#inputEmail3').val(),
		password: $('#inputPassword3').val()
	}
	console.log(data);
	console.log(loginInfo.email);
	console.log(loginInfo.password);
	for (var i = 0; i < data.length; i++) {
		if(loginInfo.email === data[i].email && loginInfo.password === data[i].password){
			loginState = true;
		}
	}
	if(loginState){
		console.log(window.location.href);
		alert("You are logged in");
//Should Direct to Daily Questions - not working
		window.location.href = "../dailyQuestions/dailyQuestions.html";
	} else {
		alert("No matching credentials on record.  Please Register.");
	}
});

//END SIGN-IN SECTION

//---------------------------Music algorithm material -------------------------------------
//_________________________________________________________________________________________

//initialize and declare variables
const lastSecret = "6f8f8bde4aea4f35b0d9be752f214e1b";
const lastId = "a5149e7d86da487788743bddb8aea6c5";
var Lastkey = "0b46e5625710ee145a28dbf47184c251";
var mood = "";
var artist = "metallica";
var track = "master_of_puppets";
var url, isNew, trackChecker, trackRandomizer, questionNum, songArtist, songTrack;
var playlist = [];
var newTrack = {};
var playlistLength = 15;
var userFeelings = [];

//set up the questions gauging how the user is feeling
var userQuestions = [
	//question 1
	{	verbiage: "How is your day going so far?"
	,	answers: ["Freaking Awesome!", "No complaints here.", "I want to break something.", "I feel like my heart has been round housed.", "Ready to get frisky!"]
	,}
	//question 2
	,{	verbiage: "What type of music are you feeling like?"
	,	answers: ["Rock", "Country", "Rap", "Hip Hop", "Pop", "Alternative/Punk"]
	,}
	//question 3
	
];

//set up the questions gauging how the user is feeling
function questionSetup(){
	questionNum = 0;
		//display our questions and answers
		$("#dailyQuestionButton").html("");
		nextQuestion();
}; //when the user selects an answer this function will run
function answerSelect(choice){
	userFeelings.push(choice);
	nextQuestion();
	console.log(userFeelings)
}; //this function appends the next question to the page
function nextQuestion(){
	if(questionNum < userQuestions.length){
	$("#dailyQuestionAnswers").html(""); // clear the previous question
	$("#dailyQuestion").html(userQuestions[questionNum].verbiage);
		for (var i = 0; i < userQuestions[questionNum].answers.length; i++) {
			//set up and append the new answers
			var newP = $("<p>").text(userQuestions[questionNum].answers[i]);
			newP.attr("class", "text-center");
			newP.attr("id", "answerId");
			newP.attr("onclick", "answerSelect(this.innerHTML)");	
			$("#dailyQuestionAnswers").append(newP);	
		}
		questionNum++;
	}else{
		//if we have answered the final question, display the final user prompt
		$("#questionsHeader").html("Are you ready to see your Perfect Day?");
		$("#dailyQuestion").html("");
		$("#dailyQuestionAnswers").html("");
		$("#dailyQuestionButton").html("<button type='submit' class='btn btn-default' onclick='generateDay()'>Let's do it</button>");
	}
}

//the final user prompt that will generate the Perfect Day
function generateDay(){
//decide what song to use for determining similar tracks
//[0] is the mood
//[1] is the genre choice
	if(userFeelings[0] === "Freaking Awesome!"){
		if(userFeelings[1] === "Rock"){
			songArtist = "ACDC";
			songTrack = "shoot+to+thrill";
		}else if(userFeelings[1] === "Country"){
			songArtist = "Jason+Aldean";
			songTrack = "My+Kinda+Party";
		}else if(userFeelings[1] === "Rap"){
			songArtist = "Ice+Cube";
			songTrack = "You+Can+Do+It";
		}else if(userFeelings[1] === "Hip Hop"){
			songArtist = "Kid+Cudi";
			songTrack = "Soundtrack+2+My+Life";
		}else if(userFeelings[1] === "Pop"){
			songArtist = "Katy+Perry";
			songTrack = "Last+Friday+Night";
		}else if(userFeelings[1] === "Alternative/Punk"){
			songArtist = "Avril+Lavigne";
			songTrack = "Girlfriend";
		}
	}else if(userFeelings[0] === "No complaints here."){
		if(userFeelings[1] === "Rock"){
			songArtist = "Aerosmith";
			songTrack = "sweet+emotion";
		}else if(userFeelings[1] === "Country"){
			songArtist = "George+Strait";
			songTrack = "Give+it+Away";
		}else if(userFeelings[1] === "Rap"){
			songArtist = "Tech+N9ne";
			songTrack = "Dysfunctional";
		}else if(userFeelings[1] === "Hip Hop"){
			songArtist = "Shakira";
			songTrack = "Hips+Don't+Lie";
		}else if(userFeelings[1] === "Pop"){
			songArtist = "Twenty+One+Pilots";
			songTrack = "Stressed+Out";
		}else if(userFeelings[1] === "Alternative/Punk"){
			songArtist = "Green+Day";
			songTrack = "Basket+Case";
		}
	}else if(userFeelings[0] === "I want to break something."){
		if(userFeelings[1] === "Rock"){
			songArtist = "Metallica";
			songTrack = "master+of+puppets";
		}else if(userFeelings[1] === "Country"){
			songArtist = "brantley+gilbert";
			songTrack = "Take+it+outside";
		}else if(userFeelings[1] === "Rap"){
			songArtist = "Pastor+Troy";
			songTrack = "Murder+Man";
		}else if(userFeelings[1] === "Hip Hop"){
			songArtist = "DMX";
			songTrack = "Party+Up";
		}else if(userFeelings[1] === "Pop"){
			songArtist = "Pink";
			songTrack = "So+What";
		}else if(userFeelings[1] === "Alternative/Punk"){
			songArtist = "Rage+Against+The+Machine";
			songTrack = "Killing+in+the+Name+Of";
		}
	}else if(userFeelings[0] === "I feel like my heart has been round housed."){
		if(userFeelings[1] === "Rock"){
			songArtist = "The+Who";
			songTrack = "Behind+Blue+Eyes";
		}else if(userFeelings[1] === "Country"){
			songArtist = "Brad+Paisley";
			songTrack = "Whiskey+Lullaby";
		}else if(userFeelings[1] === "Rap"){
			songArtist = "Eminem";
			songTrack = "When+I'm+Gone";
		}else if(userFeelings[1] === "Hip Hop"){
			songArtist = "TLC";
			songTrack = "Waterfalls";
		}else if(userFeelings[1] === "Pop"){
			songArtist = "Backstreet+Boys";
			songTrack = "Show+Me+The+Meaning+of+Being+Lonely";
		}else if(userFeelings[1] === "Alternative/Punk"){
			songArtist = "Linkin+Park";
			songTrack = "Shadow+of+The+Day";
		}
	}else if(userFeelings[0] === "Ready to get frisky!"){
		if(userFeelings[1] === "Rock"){
			songArtist = "Def+Leppard";
			songTrack = "Pour+Some+Sugar+on+Me";
		}else if(userFeelings[1] === "Country"){
			songArtist = "Shania+Twain";
			songTrack = "That+Don%27t+Impress+Me+Much";
		}else if(userFeelings[1] === "Rap"){
			songArtist = "Lil+Kim";
			songTrack = "Magic+Stick";
		}else if(userFeelings[1] === "Hip Hop"){
			songArtist = "Justin+Timberlake";
			songTrack = "SexyBack";
		}else if(userFeelings[1] === "Pop"){
			songArtist = "Taylor+Swift";
			songTrack = "Wildest+Dreams";
		}else if(userFeelings[1] === "Alternative/Punk"){
			songArtist = "Say+Anything";
			songTrack = "Wow,+I+Can+Get+Sexual+Too";
		}
	}
console.log("Artist: " + songArtist);
console.log("Track: " + songTrack);
//set up our api
	var queryURL = "http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + songArtist + "&track=" + songTrack + "&api_key=" + Lastkey + "&format=json";
   
  	$.ajax({
      url: queryURL,
      method: "GET",
    }).done(function(response) {
    	console.log(response);
    	trackChecker = [];

    	//set up a playlist containing i songs
    	for (var i = 0; i < playlistLength; i++) {

    		//randomize the songs in the list so no 2 playlists are the same
     		var isNew = false;
			while(isNew === false){
				isNew = true;
				trackRandomizer = Math.floor(Math.random() * response.similartracks.track.length);
				for (var i = 0; i <= trackChecker.length; i++) {
					if(trackChecker[i] === trackRandomizer){
						isNew = false;
					}
				}
				if(isNew === true){
					trackChecker.push(trackRandomizer);
				}
			}
			
    		//create a new object containing our related song info.
    		var newTrack = {
    			artist: response.similartracks.track[trackRandomizer].artist.name
    			,track: response.similartracks.track[trackRandomizer].name
    			,url: response.similartracks.track[trackRandomizer].artist.url
    			,duration: response.similartracks.track[trackRandomizer].duration
    		};
    		//add our new song to our playlist
    		playlist.push(newTrack);   		
    	}
    	//console.log("trackChecker: " + trackChecker);
    	console.log(playlist);
    });


}
//------------------------end music algorithm material---------------------------
//_________________________________________________________________________________
