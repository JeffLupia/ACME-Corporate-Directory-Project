var loggedIn = false;
var tempID = "";


function update(){
  var newEmail = document.getElementById("editUserEmail").value;
  var newMobilePhone = document.getElementById("editUserMobilePhone").value;
  var newOfficePhone = document.getElementById("editUserOfficePhone").value;
  var newCity = document.getElementById("userCity").value;
  var newDeptName = document.getElementById("userDept").value;
  
  var departmentArray = ["IT", "Human Resources", "Front End", "Accounting", "Marketing", "Support", "Executive"];
  var newDeptid = departmentArray.indexOf(newDeptName) + 1;
  
  var branchArray = ["New York", "Los Angeles", "Chicago", "London", "Paris", "Tokyo"];
  var newBranchid = branchArray.indexOf(newCity) + 1;
  console.log(newDeptName);
  console.log(newDeptid);
  if(newEmail != ""){
    var request = new XMLHttpRequest();
    const url = 'http://10.10.9.116:8080/CappingTest/rest/update?employeeid=' + window.id + '&parameter=companyemail&newinfo=' + newEmail;
    request.open('GET', url, true);
    request.send(null);
  }
  if(newMobilePhone != ""){
    var request = new XMLHttpRequest();
    const url = 'http://10.10.9.116:8080/CappingTest/rest/update?employeeid=' + window.id + '&parameter=personalcell&newinfo=' + newMobilePhone;
    request.open('GET', url, true);
    request.send(null);
  }
  if(newOfficePhone != ""){
    var request = new XMLHttpRequest();
    const url = 'http://10.10.9.116:8080/CappingTest/rest/update?employeeid=' + window.id + '&parameter=companyphone&newinfo=' + newOfficePhone;
    request.open('GET', url, true);
    request.send(null);
  }
  if(newCity != document.getElementById("userCity").value){
    var request = new XMLHttpRequest();
    const url = 'http://10.10.9.116:8080/CappingTest/rest/update?employeeid=' + window.id + '&parameter=branchid&newinfo=' + newBranchid;
    request.open('GET', url, true);
    request.send(null);
  }
  if(newDeptName != document.getElementById("userDept").value){
    var request = new XMLHttpRequest();
    const url = 'http://10.10.9.116:8080/CappingTest/rest/update?employeeid=' + window.id + '&parameter=departmentid&newinfo=' + newDeptid;
    request.open('GET', url, true);
    request.send(null);
  }
  cancelEditProfile();
  //getInfo();
  document.getElementById("userMobilePhone").innerHTML = newMobilePhone;
  document.getElementById("userOfficePhone").innerHTML = newOfficePhone;
}

function profilePreload(){
	console.log(tempID);
	var request = new XMLHttpRequest();
	var preURL = 'http://10.10.9.116:8080/CappingTest/rest/getteam?employeeid=' + tempID;
	const url = preURL;
	request.open('GET', url, true);
	request.onload = function() {
		var data = JSON.parse(this.response);
		var table = document.getElementById("contactTable");
		console.log("Got here",data);
		var rows = table.getElementsByTagName("tr");
		var rowCount = 0;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].getElementsByTagName("td").length > 0) {
                rowCount++;
            }
		};
		for (var u = 0; u < rowCount; u++){
			document.getElementById("contactTable").deleteRow(1);
		};
		for (var y = 0; y < data.length; y++){
			var row = table.insertRow(1+y);
			var nameCell = row.insertCell(0);
			var deptCell = row.insertCell(1);
			var positCell = row.insertCell(2);
			var cellCell = row.insertCell(3);
			nameCell.innerHTML = (data[y].employeefirst + " " + data[y].employeelast);
			deptCell.innerHTML = (data[y].departmentname);
			positCell.innerHTML = (data[y].positionname);
			cellCell.innerHTML = (data[y].companyphone);
		};
	};
	request.send(null);
	
}

function profileLogin(){
	
	var email = document.getElementById("username").value;
	var pw = document.getElementById("password").value;
	var request = new XMLHttpRequest();
  // Open a new connection, using the GET request on the URL endpoint
	const url = 'http://10.10.9.116:8080/CappingTest/rest/sso?email=' + email + '&password=' + pw;
	request.open('GET', url, true);

	request.onload = function() {
	
	var data = JSON.parse(this.response);
	if(data.length == 0){
		
		console.log("login failed");
		document.getElementById("username").value = "";
		document.getElementById("password").value = "";
		document.getElementById("errorMessage").className = "displayed";
	}
	else{
		tempID = data[0].employeeid;
		window.id = tempID;
		document.getElementById("sessionID").innerHTML = tempID;
		console.log("login Worked: " + tempID);
		loginTab();
		loggedIn = true;
		getInfo();
		document.getElementById("option1").style.display = "none";
		document.getElementById("option2").style.display = "block";
		document.getElementById("helloMsg").style.display = "none";
			profileView();
		}
	};
	request.send(null);
	
}

function sendGenForm() {
  var x = document.getElementById("genSearch").value;
  var request = new XMLHttpRequest();
  // Open a new connection, using the GET request on the URL endpoint
  const url = 'http://10.10.9.116:8080/CappingTest/rest/test?variable=' + x;
	request.open('GET', url, true);

	request.onload = function() {
		
		var data = JSON.parse(this.response);
		var table = document.getElementById("resultsTable");
		var rows = table.getElementsByTagName("tr");
		var rowCount = 0;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].getElementsByTagName("td").length > 0) {
                rowCount++;
            }
		};
		for (var u = 0; u < rowCount; u++){
			document.getElementById("resultsTable").deleteRow(1);
		};
		for (var y = 0; y < data.length; y++){
			var row = table.insertRow(1+y);
			var nameCell = row.insertCell(0);
			var deptCell = row.insertCell(1);
			var positCell = row.insertCell(2);
			var locCell = row.insertCell(3);
		
			nameCell.innerHTML = (data[y].employeefirst + " " + data[y].employeelast);
			deptCell.innerHTML = (data[y].departmentname);
			positCell.innerHTML = (data[y].positionname);
			locCell.innerHTML = (data[y].branchlocation);
		};

	};
  request.send(null);
}

function sendAdvForm(){
  var first = document.getElementById("fName").value;
  var last = document.getElementById("lName").value;
  var posit = document.getElementById("position").value;
  var locat = document.getElementById("location").value;
  var dept = document.getElementById("department").value;

  var request = new XMLHttpRequest();
  // Open a new connection, using the GET request on the URL endpoint
  var preURL = 'http://10.10.9.116:8080/CappingTest/rest/advancedsearch?'
  if (first != ""){
	  preURL += ('firstname=' + first + "&");
  }
  if (last != ""){
	 preURL += ('lastname=' + last + "&");
  }
  if (posit != "*"){
	preURL += ('position=' + posit + "&");
  }
  if (dept != "*"){
	 preURL += ('dept=' + dept + "&");
  }
  if (locat != "*"){
	 preURL += ('&location=' + locat);
  }
	const url = preURL;
	
	request.open('GET', url, true);

	request.onload = function() {
		
		var data = JSON.parse(this.response);
		var table = document.getElementById("resultsTable");
		var rows = table.getElementsByTagName("tr");
		var rowCount = 0;
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].getElementsByTagName("td").length > 0) {
                rowCount++;
            }
		};
		for (var u = 0; u < rowCount; u++){
			document.getElementById("resultsTable").deleteRow(1);
		};
		for (var y = 0; y < data.length; y++){
			var row = table.insertRow(1+y);
			var nameCell = row.insertCell(0);
			var deptCell = row.insertCell(1);
			var positCell = row.insertCell(2);
			var locCell = row.insertCell(3);
			nameCell.innerHTML = (data[y].employeefirst + " " + data[y].employeelast);
			deptCell.innerHTML = (data[y].departmentname);
			positCell.innerHTML = (data[y].positionname);
			locCell.innerHTML = (data[y].branchlocation);
		};

	};
  request.send(null);
}

function getUser(){
	console.log("Activated");
	var useID = document.innerHTML;
	console.log(useID);
	var request = new XMLHttpRequest();
	const url = 'http://10.10.9.116:8080/CappingTest/rest/searchbyid?employeeid=' + useID; 
	request.open('GET', url, true);
	request.onload = function() {
		var data = JSON.parse(this.response);
		console.log(data);
		return data;
		var employeeInfo = data[0];
		
		var fname = employeeinfo.employeefirst;
		var lname = employeeinfo.employeefirst;
		
		
	};
	request.send(null);
}

function getInfo(){
   console.log(window.id);
  const url = 'http://10.10.9.116:8080/CappingTest/rest/searchbyid?employeeid=' + window.id;
  var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.onload = function() {
		var data = JSON.parse(this.response);
		  document.getElementById("userEmail").innerHTML = data[0].employeefirst + "." + data[0].employeelast + "@acme.com";
		  document.getElementById("userMobilePhone").innerHTML = data[0].personalcell;
		  document.getElementById("userOfficePhone").innerHTML = data[0].companyphone;
		  document.getElementById("userCity").innerHTML = data[0].branchlocation;
		  document.getElementById("userDept").innerHTML = data[0].departmentname;
		  document.getElementById("userOfficeNumber").innerHTML = data[0].cubicle;
		  document.getElementById("userEmployeeSince").innerHTML = data[0].startdate;
		  document.getElementById("editOfficeNumber").innerHTML = data[0].cubicle;
		  document.getElementById("editEmployeeSince").innerHTML = data[0].startdate;
		  //populates name of employee on profile page
		  document.getElementById("userFullName").innerHTML = data[0].employeefirst + " " + data[0].employeelast;
		  document.getElementById("userPosition").innerHTML = data[0].positionname;
		  document.getElementById("userCity").innerHTML = data[0].branchlocation;
		  document.getElementById("userDept").innerHTML = data[0].departmentname;
	};
	request.send(null);
}

///////////////////
function editProfile(){
	document.getElementById("displayUserInfo").className = "hidden";
	document.getElementById("editUserInfo").className = "displayed";
}
function cancelEditProfile(){
	document.getElementById("editUserInfo").className = "hidden";
	document.getElementById("displayUserInfo").className = "displayed";
}

///////////
	
function loginTab() {
	if(document.getElementById("loginPg").style.display == "block") {
		document.getElementById("loginPg").style.display = "none";
		
	}
	else {
		document.getElementById("loginPg").style.display = "block";
	}
}
	
function signOutTab() {
	if(document.getElementById("signOutPg").style.display == "block") {
		document.getElementById("signOutPg").style.display = "none";
		
	}
	else {
		document.getElementById("employeeProfileView").className = "hidden";
		document.getElementById("employeeSearchView").className = "hidden";
			document.getElementById("searchTab").className = "unselected";
		document.getElementById("profileTab").className = "unselected";
		document.getElementById("signOutPg").style.display = "block";
	}
}
function signOut(){
	location.reload();
}
/**/
function closeTab() {
	document.getElementById("loginPg").style.display = "none";
	console.log("modal closed :)");
}
/*When the profile tab is clicked, changes styling (selected/unselected)*/
function profileView() {
	if(loggedIn == true){
		
		if(document.getElementById("profileTab").className == "unselected"){
			
			document.getElementById("searchTab").className = "unselected";
			document.getElementById("profileTab").className = "selected";
			document.getElementById("employeeSearchView").className = "hidden";
			document.getElementById("employeeProfileView").className = "displayed";
			getProjects();
			getInfo();
			profilePreload();
		}
		else{
			document.getElementById("employeeProfileView").className = "hidden";
			document.getElementById("profileTab").className = "unselected";
		}
	}
	
}
/*
function managerView() {
	document.getElementById("searchTab").className = "unselected";
	document.getElementById("profileTab").className = "selected";
	document.getElementById("employeeSearchView").className = "hidden";
	document.getElementById("employeeProfileView").className = "hidden";
	//document.getElementById("ManagerProfileView").className = "displayed";
	
}*/
/*When the search tab is clicked, changes styling (selected/unselected)*/
function searchView() {
	if(loggedIn == true){
		if(document.getElementById("searchTab").className == "unselected"){
			//if employee has signed in, allow functionality
			document.getElementById("profileTab").className = "unselected";
			document.getElementById("searchTab").className = "selected";
			document.getElementById("employeeProfileView").className = "hidden";
			document.getElementById("employeeSearchView").className = "displayed";
		}
		else{
			document.getElementById("employeeSearchView").className = "hidden";
			document.getElementById("searchTab").className = "unselected";
		}
	}
}
function getProjects(){
	document.getElementById("currentProjects").innerHTML="";
  const url = 'http://10.10.9.116:8080/CappingTest/rest/showprojects?employeeid=' + window.id;
  var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.onload = function() {
		var data = JSON.parse(this.response);
		for(var i = 0; i < data.length; i++){
		  document.getElementById("currentProjects").innerHTML += data[i].projectname + "<br>";
	   }
	};
	request.send(null);
}
