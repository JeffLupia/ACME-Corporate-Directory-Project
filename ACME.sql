DROP VIEW IF EXISTS manager;
DROP VIEW IF EXISTS IT;
DROP VIEW IF EXISTS HR;
DROP TABLE IF EXISTS accessLog;
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS permissions;
DROP TABLE IF EXISTS credentials;
DROP TABLE IF EXISTS team;
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS application;
DROP TABLE IF EXISTS branch;
DROP TABLE IF EXISTS position;
DROP TABLE IF EXISTS contactInformation;
DROP TABLE IF EXISTS project;
DROP TYPE IF EXISTS status;
DROP TYPE IF EXISTS location;
-- Project --
CREATE TABLE project (
	projectID			SERIAL,
	projectName			text not null,
	primary key(projectID)
);

-- ContactInformation --
CREATE TABLE contactInformation (
	employeeID			SERIAL,
	personalEmail		text,
	personalCell		integer,
	personalHome		integer,
	homeAddress			text,
	companyPhone		integer not null,
	companyEmail		text not null,
	cubicle				text not null,
	primary key(employeeID)
);

-- Position --
CREATE TABLE position (
	positionID			SERIAL,
	positionName		text not null,
	primary key(positionID)
);

-- Branch --
CREATE TYPE location AS ENUM ('New York', 'Los Angeles', 'Chicago',
							  'London','Paris','Tokyo');
CREATE TABLE branch (
	branchID			SERIAL,
	branchlocation		location not null,
	primary key(branchID)
);

-- Application --
CREATE TABLE application (
	applicationID		SERIAL,
	applicationName		text not null,
	primary key(applicationID)
);

-- Department --
CREATE TABLE department (
	departmentID		SERIAL,
	departmentName		text not null,
	managerID			integer,
	primary key(departmentID)
);

-- Employee --
CREATE TABLE employee (
	employeeID			SERIAL,
	employeeFirst		text not null,
	employeeLast		text not null,
	positionID			integer not null references position(positionID),
	departmentID		integer not null references department(departmentID),
	branchID			integer not null references branch(branchID),
	startDate			date not null,
	DOB					date not null,
	primary key(employeeID)
);

-- Team --
CREATE TABLE team (
	projectID			integer not null references project(projectID),
	employeeID			integer not null references employee(employeeID),
	primary key(projectID, employeeID)
);

-- Credentials --
CREATE TABLE credentials (
	companyEmail		text not null,
	employeePW			text not null,
	employeeID			integer not null references employee(employeeID),
	lastPasswordUpdate	timestamptz not null,
	primary key(employeeID)
);

-- Permissions --
CREATE TABLE permissions (
	employeeID			integer not null references employee(employeeID),
	applicationID		integer not null references application(applicationID),
	accessGranted		date not null,
	primary key(employeeID, applicationID)
);

-- Requests --
CREATE TYPE status AS ENUM('Pending','Approved','Denied','Completed','Invalid');
CREATE TABLE requests (
	employeeID			integer not null references employee(employeeID),
	applicationID		integer not null references application(applicationID),
	dateRequested		timestamptz not null,
	ManagerID			integer not null references employee(employeeID),
	status				status not null,
	primary key(employeeID, applicationID, dateRequested)
);

-- AccessLog --
CREATE TABLE accessLog (
	employeeID			integer not null references employee(employeeID),
	applicationID		integer not null references application(applicationID),
	loginTime			timestamptz not null,
	primary key(employeeID, applicationID, loginTime)
);

CREATE VIEW manager as
	SELECT employee.employeeID, employee.employeeFirst, employee.employeeLast, position.positionName,
	department.departmentName, branch.branchLocation, contactInformation.companyEmail, contactInformation.companyPhone,
	contactInformation.cubicle
	FROM department inner join employee on department.departmentID=employee.departmentID
		inner join position on position.positionID=employee.positionID
		inner join branch on branch.branchID=employee.branchID
		inner join contactInformation on contactInformation.employeeID=employee.employeeID 
	order by employee.employeeID;
	--where department.managerID=
	
CREATE VIEW HR as
	SELECT employee.employeeID, employee.employeeFirst, employee.employeeLast, position.positionName,
	department.departmentName, department.managerID, branch.branchLocation, contactInformation.companyEmail, contactInformation.companyPhone,
	contactInformation.cubicle, employee.startDate, employee.DOB
	FROM department inner join employee on department.departmentID=employee.departmentID
		inner join position on position.positionID=employee.positionID
		inner join branch on branch.branchID=employee.branchID
		inner join contactInformation on contactInformation.employeeID=employee.employeeID 
	order by employee.employeeID;

CREATE VIEW  IT as
	SELECT employee.employeeID, employee.employeeFirst, employee.employeeLast, position.positionName,
	department.departmentName, department.managerID, branch.branchLocation, contactInformation.companyEmail, contactInformation.companyPhone,
	contactInformation.cubicle, project.projectName, employee.startDate
	FROM department inner join employee on department.departmentID=employee.departmentID
		inner join position on position.positionID=employee.positionID
		inner join branch on branch.branchID=employee.branchID
		inner join contactInformation on contactInformation.employeeID=employee.employeeID
		inner join team on team.employeeID=employee.employeeID
		inner join project on team.projectID=project.projectID
	order by employee.employeeID;
