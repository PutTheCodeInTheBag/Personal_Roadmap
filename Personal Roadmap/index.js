
// Initializing

let roadmapList = [];

// Getting the html elements

const adder = document.getElementById("adder"); // The add roadmap button
const finderInput = document.getElementById("finder"); // Input to find specific roadmap
const cardOptions = document.getElementById("cardList"); // The option list from the availible roadmaps
const logout = document.getElementById("logout"); // Logout button
const content = document.getElementById("content"); // The content div

// Creating the roadmap prototype

function createCard() {

	adder.disabled = true;

	// Setting the creation date

	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0');
	let yyyy = today.getFullYear();

	today = mm + '/' + dd + '/' + yyyy;

	// Creating the html elements

	this.mainDiv = document.createElement("div");
	this.holder = document.createElement("div");
	this.description = document.createElement("div");
	this.footer = document.createElement("div");

	this.title = document.createElement("input");

	this.doneBtn = document.createElement("button");
	this.cancelBtn = document.createElement("button");

	// Adding text and attributes

	mainDiv.classList.add("card");

	holder.classList.add("holder");

	description.innerHTML = "Description";
	description.setAttribute("contenteditable", "true");
	description.setAttribute("spellcheck", "false");
	description.style.display = "block";
	description.classList.add("description");

	footer.classList.add("buttonHolder");

	title.placeholder = "Roadmap name";
	title.classList.add("setTitle");
	title.setAttribute("spellcheck", "false");

	doneBtn.innerHTML = "Finish";
	doneBtn.classList.add("doneBtn");
	doneBtn.addEventListener("click", function() {
		if(title.value.trim().length == 0) {
			window.alert("Invalid input");
			title.classList.add("invalidInput");
			title.value = "";
			title.focus();
			return;
		}
		else {
			let cardInfo = {
				title : title.value,
				description : description.innerHTML,
				cDate : today,
				lDate : today,
				id : Date.now().toString(36) + Math.random().toString(36).substr(2)
			};
			roadmapList.push(cardInfo);
			updateCardList();
			mainDiv.remove();
			new FinishedCard(cardInfo);
		}
	});

	cancelBtn.innerHTML = "Cancel";
	cancelBtn.classList.add("cancel");
	cancelBtn.addEventListener("click", e => cancelCreation(mainDiv));

	// Appending everything

	holder.appendChild(title);

	footer.appendChild(doneBtn);
	footer.appendChild(cancelBtn);

	mainDiv.appendChild(holder);
	mainDiv.appendChild(description);
	mainDiv.appendChild(footer);

	content.appendChild(mainDiv);

	title.focus();
}

// Finished card mold

class FinishedCard {
	
	constructor(cardInfo) {

		// Re-enableing adder

		adder.disabled = false;

		// Appending card info

		this.cardInfo = cardInfo;

		// Creating html elements

		let mainDiv = document.createElement("div");
		let holder = document.createElement("div");
		let description = document.createElement("div");

		let dateSpan = document.createElement("span");
		let titleSpan = document.createElement("span");
		let rightSpan = document.createElement("span");
		
		let title = document.createElement("h3");

		let lastDate = document.createElement("p");
		let creationDate = document.createElement("p");

		let expandBtn = document.createElement("button");
		let deleteBtn = document.createElement("button");
		let editBtn = document.createElement("button");

		let option = document.createElement("option");

		let anchor = document.createElement("a");

		// Setting classes and attributes

		mainDiv.classList.add("card");

		holder.classList.add("holder");

		description.classList.add("description");
		description.setAttribute("contenteditable", "true");
		description.setAttribute("spellcheck", "false");
		description.addEventListener("blur", e => updateIdDescription(cardInfo, description.innerHTML));
		description.style.display = "none";
		description.innerHTML = cardInfo.description;

		title.setAttribute("spellcheck", "false");
		title.addEventListener("click", e => redirectPage(cardInfo));
		
		title.innerHTML = cardInfo.title;

		lastDate.innerHTML = "Last access: " + cardInfo.lDate;
		creationDate.innerHTML = "Created: " + cardInfo.cDate;

		expandBtn.innerHTML = "\\/";
		expandBtn.classList.add("expand_button");
		expandBtn.addEventListener("click", e => expand(description, expandBtn));

		deleteBtn.classList.add("delete");
		deleteBtn.addEventListener("click", e => deleteDiv(mainDiv, cardInfo, option));
		deleteBtn.innerHTML = "";

		editBtn.classList.add("editBtn");
		editBtn.addEventListener("click", e=> editTitle(editBtn, title, titleSpan, cardInfo));
		editBtn.innerHTML = "";

		option.innerHTML = title.innerHTML;

		// Appending everything

		anchor.appendChild(title);

		dateSpan.appendChild(creationDate);
		dateSpan.appendChild(lastDate);

		titleSpan.appendChild(anchor);
		titleSpan.appendChild(editBtn);

		rightSpan.appendChild(deleteBtn);
		rightSpan.appendChild(expandBtn);

		holder.appendChild(dateSpan);
		holder.appendChild(titleSpan);
		holder.appendChild(rightSpan);

		mainDiv.appendChild(holder);
		mainDiv.appendChild(description);

		cardOptions.appendChild(option);

		content.appendChild(mainDiv);

	}

}

	// Roadmap functions

	function expand(desc, btn) {
		if(desc.style.display == "block") {
			btn.innerHTML = "\\/";
			desc.style.display = "none";
		}

		else {
			btn.innerHTML = "/\\";
			desc.style.display = "block";
		}
	}

	function deleteDiv(div, id, option) {

		let ask = window.confirm("Are you sure you want to delete this Roadmap?");

		if(ask) {
			let index = roadmapList.indexOf(id);
			roadmapList.splice(index, 1);
			div.remove();
			option.remove();
			updateCardList();
		}
	}

	// Cancels the creation of a new roadmap

	function cancelCreation(div) {
		div.remove();
		adder.disabled = false;
	}

	// Updates the information on the localStorage

	function updateCardList() {
		let RMList_serialized = JSON.stringify(roadmapList);

		localStorage.setItem("roadmaps", RMList_serialized);
	}

	// Updates the name

	function updateIdTitle(id, title) {
		id.title = title;
		updateCardList();
	}

	// Updates the description

	function updateIdDescription(id, desc) {
		id.description = desc;
		updateCardList();
	}

	// Checks if there are any cards to load

if(localStorage.length != 0) {
	roadmapList = JSON.parse(localStorage.getItem("roadmaps"));
	roadmapList.forEach((el) => new FinishedCard(el));
}

// Edits the title

function editTitle(btn, title, span, id) {

	let input = document.createElement("input"); 

	title.remove();
	btn.remove();

	span.appendChild(input);

	input.focus();

	input.addEventListener("blur", function(e) {
		if(input.value.trim().length != 0) {
		title.innerHTML = input.value;

		span.appendChild(title);
		span.appendChild(btn);

		input.remove();

		updateIdTitle(id, title.innerHTML);
	}
	});

}

// Opens the fluxogram page

function redirectPage(cardInfo) {

	// Changing the last update date

	let today = new Date();
	let dd = String(today.getDate()).padStart(2, '0');
	let mm = String(today.getMonth() + 1).padStart(2, '0');
	let yyyy = today.getFullYear();

	today = mm + '/' + dd + '/' + yyyy;

	cardInfo.lDate = today;

	updateCardList();

	location.replace("./fluxogram.html");
}