var request;
var objJSON;
var id_mongo;

function doc(){
	$(document).ready(function () {
		$("nav a").removeClass('active');
		$('#a8').addClass('active');
	});
	
	var doc = "<h2>Techniki Internetowe - Projekt 2 </h2>"+
	"<p>Projekt został zrealizowany za pomocą PHP w stylu REST.</p>" +
	"<p>Skrypty zostały napisane przy pomocy języka JavaScript.</p>" +
	"<p>Dla niezarejestrowanych użytkowników - możliwość wprowadzenia odpowiedzi na ankietę offline w lokalnej bazie danych.</p> "+
	"<p>Możliwość oglądnięcia wykresów, gdy użytkownik jest zalogowany do serwisu.</p> "+
	"<p>Podtrzymanie sesji użytkownika realizowane przy użyciu ciasteczek.</p>"
	"<p>Dane zapisywane są w bazie danych MongoDB zlokalizowanej na pascalu, dla użytkowników zalogowanych.</p> ";

	document.getElementById("content").style.marginLeft="21%";
	document.getElementById("content").innerHTML=doc;
	document.getElementById("graph1").style.display="none";
	document.getElementById("graph2").style.display="none";
}

document.addEventListener('DOMContentLoaded', function() {
	ankieta_form();
}, false);

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers

var DBDeleteRequest = indexedDB.deleteDatabase("LocalDB");
var open = indexedDB.open("LocalDB", 3);

open.onupgradeneeded = function () {
	db = open.result;
	var objectStore = db.createObjectStore("ankieta", { keyPath: "id", autoIncrement: true });
	objectStore.createIndex("plec", "plec");
	objectStore.createIndex("pyt1", "pyt1");
	objectStore.createIndex("pyt2", "pyt2");
}

session();

function getRequestObject(){
	if ( window.ActiveXObject)  {
		return ( new ActiveXObject("Microsoft.XMLHTTP")) ;
	} else if (window.XMLHttpRequest)  {
		return (new XMLHttpRequest())  ;
	} else {
		return (null) ;
	}
}

function getSessionID() {
	var tmp;
	var cookies;
	cookies = document.cookie.split(';');
	for (var i = 0; i < cookies.length; i++) {
		tmp = cookies[i];
		while (tmp.charAt(0) == ' ') {
			tmp = tmp.substring(1, tmp.length);
		}
		if (tmp.indexOf("sessionID=") == 0) {
			return tmp.substring("sessionID=".length, tmp.length);
		}
	}
	return '';
}

function session() {
	var arr = {};
	var session_id = getSessionID();
	arr.sessionID = session_id;
	txt = JSON.stringify(arr);
	req = getRequestObject();
	req.onreadystatechange = function () {
		if (req.readyState == 4 && (req.status == 200 || req.status == 400)) {
			objJSON = JSON.parse(req.response);
			if (objJSON['status'] == 'ok') {
				document.getElementById('a1').style.display = "none";
				document.getElementById('a2').style.display = "none";
				document.getElementById('a3').style.display = "inline";
				document.getElementById('a4').style.display = "inline";
				document.getElementById('a5').style.display = "none";
				document.getElementById('a6').style.display = "inline";
				document.getElementById('a7').style.display = "inline";
			}
			else {
				
			}
		}
	}
	req.open("POST", "http://pascal.fis.agh.edu.pl/~7dlugosz/projekt2/rest/session", true);
	req.send(txt);
}

function setSessionID(value) {
	document.cookie = "sessionID=" + value + "; path=/";
}


function ankieta_form(){
	document.getElementById("graph1").style.display="none";
	document.getElementById("graph2").style.display="none"
	$(document).ready(function () {
		$("nav a").removeClass('active');
		$('#a4').addClass('active');
	});

	var form = "<form method='post' class = 'input'>";
	form += "<p>Płeć:</p>"+
			"<input type='radio' name='Plec' value='Kobieta'>Kobieta&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>"+
			"<input type='radio' name='Plec' value='Mężczyzna'>Mężczyzna<br>";

	form +=	"<p><b>Pytanie 1:</b> Ile posiłków dziennie spożywasz ?</p>"+
			"<input type='radio' name='Posilek' value='1-2'>1-2&nbsp;&nbsp;<br>"+
			"<input type='radio' name='Posilek' value='3-4'>3-4<br>"+
			"<input type='radio' name='Posilek' value='5-6'>5-6<br>"+
			"<input type='radio' name='Posilek' value='7-8'>7-8&nbsp;&nbsp;</input><br>";
	form +=	"<p><b>Pytanie 2:</b> Ile dni w tygodniu ćwiczysz ?</p>"+
			"<input type='radio' name='Ruch' value='1-2'>1-2&nbsp;&nbsp;<br>"+
			"<input type='radio' name='Ruch' value='3-4'>3-4<br>"+
			"<input type='radio' name='Ruch' value='5-6'>5-6<br>";
		
	var session_id=getSessionID();	
	if(session_id==""){
		form += "<input type='button' value='Prześlij' onclick='offline_insert(this.form)'>";
		document.getElementById('content').innerHTML = form;}

	else{
		form += "<input type='button' value='Prześlij' onclick='online_insert(this.form)'>";
		document.getElementById('content').innerHTML = form;
	}
	document.getElementById("content").style.marginLeft='33%';
	document.getElementById("content").style.marginTop='1%';
	document.getElementById('content').style.padding='0%';
	document.getElementById("content").style.paddingBottom='2%';
}

function online_insert(form) {
	var data = {};
	data.plec = form.Plec.value;
	data.pyt1 = form.Posilek.value;
	data.pyt2 = form.Ruch.value;
	
	txt = JSON.stringify(data);
	req = getRequestObject();
	req.onreadystatechange = function () {
		if (req.readyState == 4 && req.status == 200) {
			objJSON = JSON.parse(req.response);
			if (objJSON['status'] == 'ok') {
				alert("Pomyślnie dodano dane online.");
			}
			else {
				alert("Błąd bazy danych. Nie dodano danych.");
			}
		}
		else if (req.readyState == 4 && req.status == 400) {
			alert("Wprowadzone dane są niepoprawne!");
		}
	}
	req.open("POST", "http://pascal.fis.agh.edu.pl/~7dlugosz/projekt2/rest/save", true);
	req.send(txt);
}


function offline_insert(form) {
	
		var data = {};
		data.plec = form.Plec.value;
		data.pyt1 = form.Posilek.value;
		data.pyt2 = form.Ruch.value;
		if(data.plec==""||data.pyt1==""||data.pyt2==""){
			alert("Odpowiedz na wszystkie pytania!");
		}
		else{

		var trans = db.transaction("ankieta", "readwrite");
		var obj = trans.objectStore("ankieta");

		if(obj.put(data)){
			alert("Pomyślnie dodano dane do bazy przeglądarki offline!");
		}
	}	
}

function graph1(K,M,K2,M2){
	var wykres1 = "<canvas id='myCanvas1' height='300' width='400'>";
	var wykres2 = "<canvas id='myCanvas2' height='300' width='400'>";
	document.getElementById("graph1").innerHTML=wykres1;
	document.getElementById("graph2").innerHTML=wykres2;
	var canvas1 = document.getElementById("myCanvas1");
	var canvas2 = document.getElementById("myCanvas2");
	var ctx1 = canvas1.getContext("2d");
	var ctx2 = canvas2.getContext("2d");

	function siatka(ctx1,str){
		var grid_size = 20;
		var x_axis_distance_grid_lines = 14
		var y_axis_distance_grid_lines = 1;
		var x_axis_starting_point = { number: 1, suffix: '\u03a0' };
		var y_axis_starting_point = { number: 1, suffix: '' };
		
		var canvas_width = canvas1.width;
		var canvas_height = canvas1.height;
		
		var num_lines_x = Math.floor(canvas_height/grid_size);
		var num_lines_y = Math.floor(canvas_width/grid_size);
		
		for(var i=0; i<=num_lines_x; i++) {
			ctx1.beginPath();
			ctx1.lineWidth = 1;
			
			if(i == x_axis_distance_grid_lines) 
				ctx1.strokeStyle = "#000000";
			else
				ctx1.strokeStyle = "#e9e9e9";
			
			if(i == num_lines_x) {
				ctx1.moveTo(0, grid_size*i);
				ctx1.lineTo(canvas_width, grid_size*i);
			}
			else {
				ctx1.moveTo(0, grid_size*i+0.5);
				ctx1.lineTo(canvas_width, grid_size*i+0.5);
			}
			ctx1.stroke();
		}
		
		for(i=0; i<=num_lines_y; i++) {
			ctx1.beginPath();
			ctx1.lineWidth = 1;
			
			if(i == y_axis_distance_grid_lines) 
				ctx1.strokeStyle = "#000000";
			else
				ctx1.strokeStyle = "#e9e9e9";
			
			if(i == num_lines_y) {
				ctx1.moveTo(grid_size*i, 0);
				ctx1.lineTo(grid_size*i, canvas_height);
			}
			else {
				ctx1.moveTo(grid_size*i+0.5, 0);
				ctx1.lineTo(grid_size*i+0.5, canvas_height);
			}
			ctx1.stroke();
		}
		
		ctx1.fillStyle="rgba(0, 0, 0, 1)"
		ctx1.font = " 12px sans-serif";
		ctx1.fillText("1-2", 60, 295);
		ctx1.fillText("3-4", 130, 295);
		ctx1.fillText("5-6", 211, 295);
		ctx1.fillText("7-8", 300, 295);
		ctx1.fillText(str, 170, 20);
		ctx1.fillText("Czerwony - Kobiety", 60, 40);
		ctx1.fillText("Zielony - Mężczyźni", 220, 40)
		ctx1.font = " 10px sans-serif";
		let k =20;
		for(k=0;k<20;k++){
			ctx1.fillText(k.toString(), 7,300-(k*20) -21);
		}		
	}

	var percent = 0;
	animate();
	function animate() {
		if (percent++ < 100) {
			requestAnimationFrame(animate);
		}

		var x_from = 30;

		siatka(ctx1,"Ile posiłków dziennie spożywasz ?");
		siatka(ctx2,"Ile dni w tygodniu ćwiczysz ?");

		var step =40+1;
		var j =-1;
		for (var i = 0; i <4; i++) {
			j++;
			var x_next = x_from + (j * step) ;

			ctx1.fillStyle = "rgba(255, 0, 0, 1)";
			ctx1.fillRect(x_next, 280, 40, -K[i]*20 *percent / 100);
			ctx2.fillStyle = "rgba(255, 0, 0, 1)";
			ctx2.fillRect(x_next, 280, 40, -K2[i]*20* percent / 100);
			j++;
			x_next = x_from + (j * step) ;
			ctx1.fillStyle = "rgba(130, 255, 0, 1)";
			ctx1.fillRect(x_next, 280, 40, -M[i]*20* percent / 100);
			ctx2.fillStyle = "rgba(130, 255, 0, 1)";
			ctx2.fillRect(x_next, 280, 40, -M2[i]*20* percent / 100);
		}
	}
}

function answer_form(){
	
	$(document).ready(function () {
		$("nav a").removeClass('active');
		$('#a5').addClass('active');
	});

	var trans = db.transaction("ankieta");
	objectStore = trans.objectStore("ankieta");
	request = objectStore.openCursor();

	table = "<table id='offline_table'>"+
	"<tr><th>Nr.</th><th>Płeć</th><th>Pytanie 1</th><th>Pytanie 2</th></tr>";

	request.onsuccess = function(){
		let cursor = request.result;
		if (cursor) {
			let key = cursor.primaryKey;
			let plec = cursor.value.plec;
			let pyt1 = cursor.value.pyt1;
			let pyt2 = cursor.value.pyt2;
			table+="<tr><td>"+key+"</td><td>"+plec+"</td><td>"+pyt1+"</td><td>"+pyt2+"</td></tr>";
			cursor.continue();
		}
		else{		
			table+="</table>";
			document.getElementById('content').innerHTML = table;
		}
	}
	document.getElementById('content').style.padding='0%';
	document.getElementById('content').style.marginLeft='39%';
	document.getElementById('content').style.marginTop='1%'	
}


function reg_form() {
	$(document).ready(function () {
		$("nav a").removeClass('active');
		$('#a2').addClass('active');
	});

	var form = "<form method='post' class = 'input'>";
	form += "<b>REJESTRACJA</b><br>";
	form += "Podaj login:<input type = 'text' name = 'nazwa' placeholder = 'login' required ><br>";
	form += "Podaj hasło:<input type = 'password' name = 'haslo' placeholder = 'hasło' required><br>";
	form += "<input type='button' value='Zarejestruj' onclick='add_user(this.form)'>";
	form += "</form>"
	document.getElementById('content').innerHTML = form;

	document.getElementById('content').style.padding='3%';
	document.getElementById('content').style.marginLeft='38%';
	document.getElementById('content').style.marginTop='1%';
}

function login_form(){
	$(document).ready(function () {
		$("nav a").removeClass('active');
		$('#a1').addClass('active');
	});

	var form = "<form method='post' class = 'input'>";
	form += "<b>LOGOWANIE</b><br>";
	form += "Podaj login<input type = 'text' name = 'nazwa' placeholder = 'login' required ><br>";
	form += "Podaj hasło<input type = 'password' name = 'haslo' placeholder = 'hasło' required><br>";
	form += "<input type='button' value='Zaloguj' onclick='log_user(this.form)'>";
	form += "</form>";
	document.getElementById('content').innerHTML = form;
	document.getElementById('content').style.padding='3%';
	document.getElementById('content').style.marginLeft='38%';
	document.getElementById('content').style.marginTop='1%';
}

function add_user(form) {
	var user = {};
	user.username = form.nazwa.value;
	user.password = form.haslo.value;
	txt = JSON.stringify(user);
	req = getRequestObject();
	req.onreadystatechange = function () {
		if (req.readyState == 4 && req.status == 200) {
			objJSON = JSON.parse(req.response);
			if (objJSON['status'] == 'ok') {
				alert("Zarejestrowano pomyślnie!");
			}
			else {
				alert("Wprowadzony login już istnieje.");
			}
		}
	}
	req.open("POST", "http://pascal.fis.agh.edu.pl/~7dlugosz/projekt2/rest/register", true);
	req.send(txt);
}

function log_user(form) {
	if (form.nazwa.value == "" || form.haslo.value == "") {
		alert("Wprowadź dane.");
		return;
	}
	var user = {};
	user.username = form.nazwa.value;
	user.password = form.haslo.value;
	txt = JSON.stringify(user);
	req = getRequestObject();
	req.onreadystatechange = function () {
		if (req.readyState == 4 && req.status == 200) {
			objJSON = JSON.parse(req.response);
			if (objJSON['status'] == 'ok') {
				document.getElementById('a5').style.display = "none";
				document.getElementById('a1').style.display = "none";
				document.getElementById('a2').style.display = "none";
				document.getElementById('a6').style.display = "inline";
				document.getElementById('a7').style.display = "inline";
				document.getElementById('a3').style.display = "inline";
				
				setSessionID(objJSON['sessionID']);
				alert("zalogowano");
				document.getElementById('content').innerHTML = "";
				document.getElementById("content").style.padding="0";
			}
			else
				alert("Podano błędne dane. Logowanie nieudane");
			}
	}
	req.open("POST", "http://pascal.fis.agh.edu.pl/~7dlugosz/projekt2/rest/login", true);
	req.send(txt);
}

function log_out() {
	document.getElementById("graph1").style.display="none";
	document.getElementById("graph2").style.display="none";
	document.getElementById("content").innerHTML="";
	var session_id = getSessionID();
	var cookies = {};
	cookies.sessionID = session_id;
	txt = JSON.stringify(cookies);
	req = getRequestObject();
	req.onreadystatechange = function () {
		if (req.readyState == 4 && req.status == 200) {
			objJSON = JSON.parse(req.response);
			if (objJSON['status'] == 'ok') {
				document.getElementById('a7').style.display = "none";
				document.getElementById('a3').style.display = "none";
				document.getElementById('a6').style.display = "inline";
				document.getElementById('a1').style.display = "inline";
				document.getElementById('a2').style.display = "inline";
				document.getElementById('a5').style.display = "inline";
				setSessionID('');
				alert("Pomyślnie wylogowano!");
			}
		}
	}
	req.open("POST", "http://pascal.fis.agh.edu.pl/~7dlugosz/projekt2/rest/logout", true);
	req.send(txt);
}


function getdata(form) {
	$(document).ready(function () {
		$("nav a").removeClass('active');
		$('#a7').addClass('active');
	});
	
	document.getElementById("content").innerHTML="";
	document.getElementById("content").style.padding="0";
	document.getElementById("graph1").style.display="inline";
	document.getElementById("graph2").style.display="inline";
	var K_pyt1 = [0,0,0,0];
	var K_pyt2 = [0,0,0,0];
	var M_pyt1 = [0,0,0,0];
	var M_pyt2 = [0,0,0,0];
	req = getRequestObject();
	req.onreadystatechange = function () {
		if (req.readyState == 4 && req.status == 200) {
			objJSON = JSON.parse(req.response);
			for (var id in objJSON) {
				if (objJSON[id]['plec'] == "Kobieta") {
					if(objJSON[id]['pyt1']=="1-2") K_pyt1[0]++;
					else if(objJSON[id]['pyt1']=="3-4") K_pyt1[1]++;
					else if(objJSON[id]['pyt1']=="5-6") K_pyt1[2]++;
					else if(objJSON[id]['pyt1']=="7-8") K_pyt1[3]++;	
				}
				else {
					if(objJSON[id]['pyt1']=="1-2") M_pyt1[0]++;
					else if(objJSON[id]['pyt1']=="3-4") M_pyt1[1]++;
					else if(objJSON[id]['pyt1']=="5-6") M_pyt1[2]++;
					else if(objJSON[id]['pyt1']=="7-8") M_pyt1[3]++;					
				}
			}
			for (var id in objJSON) {
				if (objJSON[id]['plec'] == "Kobieta") {
					if(objJSON[id]['pyt2']=="1-2") K_pyt2[0]++;
					else if(objJSON[id]['pyt2']=="3-4") K_pyt2[1]++;
					else if(objJSON[id]['pyt2']=="5-6") K_pyt2[2]++;
					else if(objJSON[id]['pyt2']=="7-8") K_pyt2[3]++;
					
				}
				else {
					if(objJSON[id]['pyt2']=="1-2") M_pyt2[0]++;
					else if(objJSON[id]['pyt2']=="3-4") M_pyt2[1]++;
					else if(objJSON[id]['pyt2']=="5-6") M_pyt2[2]++;
					else if(objJSON[id]['pyt2']=="7-8") M_pyt2[3]++;	
				}
			}
		}
		
		graph1(K_pyt1,M_pyt1,K_pyt2,M_pyt2);
	}	

	req.open("GET", "http://pascal.fis.agh.edu.pl/~7dlugosz/projekt2/rest/list", true);
	req.send(null);
}



function send_data() {
	document.getElementById("graph1").style.display="none";
	document.getElementById("graph2").style.display="none";
	$(document).ready(function () {
		$("nav a").removeClass('active');
		$('#a6').addClass('active');
	});
	var trans = db.transaction("ankieta", "readwrite");
	var obj = trans.objectStore("ankieta");
	obj.openCursor().onsuccess = function (event) {
		var cursor = event.target.result;
		
		if (cursor) {
			var data = {};
			data.plec = cursor.value.plec;
			data.pyt1 = cursor.value.pyt1;
			data.pyt2 = cursor.value.pyt2;

			txt = JSON.stringify(data);
			req = getRequestObject();

			req.onreadystatechange = function () {
				if (req.readyState == 4 && req.status == 200) {
					objJSON = JSON.parse(req.response);
					if (objJSON['status'] == 'ok') {
						alert("Pomyślnie dodano dane!");
					}
				}
			}
			req.open("POST", "http://pascal.fis.agh.edu.pl/~7dlugosz/projekt2/rest/save", true);
			req.send(txt);
			cursor.delete();
			cursor.continue();
		}
	};
}


