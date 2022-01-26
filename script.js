//const api_url = "<heroku_app_url>"
const api_url = "https://addtogether.herokuapp.com/user"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {
		table_data += `<tr>`;
		table_data += `<td>${records[i].name}</td>`;
		table_data += `<td>${records[i].address}</td>`;
		table_data += `<td>${records[i].contact}</td>`;
        table_data += `<td>${records[i].luggageCount}</td>`;
        table_data += `<td>${records[i].to}</td>`;
        table_data += `<td>${records[i].from}</td>`;
        table_data += `<td>${records[i].flightNo}</td>`;
        table_data += `<td>${records[i].status}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?contact=${records[i].contact}"><button class="btn btn-primary">Edit</button></a>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData('${records[i].contact}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}


function getDataByContact(contact) {
	fetch("https://addtogether.herokuapp.com/find", {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify({"contact": contact})
	})
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
		document.getElementById("contact").value = contact;
		document.getElementById("status").value = data.list[0].status;
		document.getElementById("luggageCount").value = data.list[0].luggageCount;
	})
}


function postData() {
	var name = document.getElementById("name").value;
	var address = document.getElementById("address").value;
	var contact = document.getElementById("contact").value;
	var luggageCount = document.getElementById("luggageCount").value;
	var to = document.getElementById("to").value;
	var from = document.getElementById("from").value;
	var flightNo = document.getElementById("flightNo").value;
	var status = document.getElementById("status").value;
	
	data = {name: name, address: address, contact: contact, luggageCount: luggageCount, to: to, from: from, flightNo: flightNo, status: status};
	
	fetch("https://addtogether.herokuapp.com/entry", {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response, data) =>{ 
        console.log(response);
        if(response.status==400) window.alert("Please Try Again!");
        else{
            console.log(data); 
	        window.location.href = "index.html";
        }
    })
}	


function updateData() {
	
	var contact = document.getElementById("contact").value;
	var status = document.getElementById("status").value;
	var luggageCount = document.getElementById("luggageCount").value;
	
    data = {contact: contact, luggageCount: luggageCount, status: status};
	
	fetch("https://addtogether.herokuapp.com/update", {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "index.html";
	})
}


function deleteData(contact) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch("https://addtogether.herokuapp.com/delete", {
			method: "POST",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"contact": contact})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}