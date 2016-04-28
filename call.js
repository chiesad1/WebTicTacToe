var video_hold = document.getElementById("video-chat");
var video_out = document.getElementById("vid-box");
var game_board = document.getElementById("tic-tac-box");
var user_name = "";

var game_board = ticTacToe(game_board);

function login(form) {
	user_name = form.username.value || "Anonymous";
	var phone = window.phone = PHONE ({
		number			:user_name, //listens on user_name if not then Anonymous
		publish_key		:'pub-c-719ca735-c2c0-4d8f-bb2a-c5118229d5d2',
		subscribe_key	:'sub-c-89d9c652-0c99-11e6-a8fd-02ee2ddab7fe',
		datachannels	:true,	//Enable Data Channels
	});
	phone.ready(function(){
		form.username.style.background="55ff5b"; form.login_submit.hidden="true";}
		);
	phone.receive(function(session){
		session.connected(function(session) { video_hold.hidden=false; video_out.appendChild(session.video);});
		session.ended(function(session) {video_out.innerHTML='';});
});
	//Prep Data Channel
	return false;
}

function makeCall(form){
	if(!window.phone) alert("Login First!");
	else phone.dial(form.number.value);
	return false;
}

function end(){
	if (!window.phone) return;
	window.phone.hangup();
	video_hold.hidden = true;
}

game_board.onSquareClicked(
		function(squareNum){ //Says which box was clicked
			if (!window.phone) return;
			var data = {square:squareNum, username:user_name};
			window.phone.sendData(data);	
		}
	)

function onDataReceived(msg){
	var sqr_num = msg.square;
	game_board.markBox(sqr_num);
}

function login(form) {
	//Sets up phone
	//Ready and receives callbacks
	phone.datachannel(onDataReceived);
	return false;
}