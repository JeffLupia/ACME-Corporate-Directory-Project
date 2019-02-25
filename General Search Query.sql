SELECT employee.employeeFirst, employee.employeeLast, position.positionName,
	department.departmentName, branch.branchLocation--, contactInformation.companyEmail, contactInformation.companyPhone,
	--contactInformation.cubicle, project.projectName
	FROM department inner join employee on department.departmentID=employee.departmentID
		inner join position on position.positionID=employee.positionID
		inner join branch on branch.branchID=employee.branchID
		--inner join contactInformation on contactInformation.employeeID=employee.employeeID 
		--inner join team on team.employeeID=employee.employeeID
		--inner join project on team.projectID=project.projectID
	order by employee.employeeID;
	--where (employee.employeeLast='%' OR employee.employee.employeeFirst='%') AND
	--position.positionName='' AND
	--contactInformation.companyEmail='%' AND
	--branch.branchLocation=''
	--department.departmentName="" AND
	--project.projectName="";
	