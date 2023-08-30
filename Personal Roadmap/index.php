
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Hello Roadmap</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	
</head>
<body>

	<nav>
		<button id="adder" onclick="createCard()">+</button>
		<input type="text" list="cardList" placeholder="Find Roadmap" id="finder">
		<datalist id="cardList">
		</datalist>
		<button id="logout">Logout</button>
	</nav> 

	<div id="content">
	</div>
	<script src="index.js"></script>
</body>
</html>