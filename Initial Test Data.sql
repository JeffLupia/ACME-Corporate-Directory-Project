INSERT INTO position(positionID, positionName)
VALUES (1,'Product Manager'),(2,'Database Manager'),(3,'Software Designer'),
(4,'IT Manager'),(5,'Programmer');

INSERT INTO department(departmentID, departmentName)
VALUES (1,'IT'),(2,'HR'),(3,'Front End');

INSERT INTO branch(branchLocation)
VALUES ('New York');

INSERT INTO employee(employeeID, employeeFirst, employeeLast, departmentID, branchID, 
					 positionID, startDate, DOB)
VALUES (1,'Jeff','Lupia',3,1,5,current_date,'1997-09-18'),
	(2,'Colin','May',1,1,2,current_date,'1996-10-16'),
	(3,'Nicholas','Bradford',2,1,1,current_date,'1996-12-03'),
	(4,'James','Holden',3,1,3,current_date,'1997-07-17'),
	(5,'Garrett','Meyer',1,1,4,current_date,'1997-06-27');
	
INSERT INTO credentials(companyEmail,employeePW, employeeID,lastPasswordUpdate)
VALUES ('cmay@acmecorp.com','password1',2,current_timestamp),
	('gmeyer@acmecorp.com','password1',5,current_timestamp),
	('jholden@acmecorp.com','password1',4,current_timestamp),
	('jlupia@acmecorp.com','password1',1,current_timestamp),
	('nbradford@acmecorp.com','password1',3,current_timestamp);