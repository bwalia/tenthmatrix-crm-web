<!--HIT_EXECUTE

C_DATE(s_date)
C_TEXT(EmpFirstName;EmpLastName)
ARRAY LONGINT(EmpID;0)

ARRAY LONGINT(nTaskIDArr;0)
ARRAY LONGINT(resultTaskIdArr;0)
C_LONGINT(iCounter;nJSONObject;nJSONResult;setFlag)
s_date:=Date(_HIT_WebApp_GetField ("s_date"))

ALL RECORDS([Employees])
DISTINCT VALUES([Employees]emp_id;EmpID)

task_id:=Num(_HIT_WebApp_GetField ("task_id"))
project_id:=Num(_HIT_WebApp_GetField ("project_id"))
setFlag:=0
Case of 
: ((task_id#0) | (project_id#0))
setFlag:=1
If (project_id#0)
QUERY([Projects];[Projects]proj_id=project_id)

If (Records in selection([Projects])>0)
RELATE MANY SELECTION([Tasks]proj_id)
  //QUERY([Tasks];[Tasks]proj_id=[Projects]proj_id)
SELECTION TO ARRAY([Tasks]task_id;nTaskIDArr)

If (task_id=0)
QUERY WITH ARRAY([Timeslips]task_id;nTaskIDArr)
Else 
QUERY([Timeslips];[Timeslips]task_id=task_id)
End if 
End if 
End if 

If (task_id#0)
QUERY([Timeslips];[Timeslips]task_id=task_id)
End if 

SELECTION TO ARRAY([Timeslips]task_id;resultTaskIdArr)

CREATE SET([Timeslips];"SetA")
End case 

sdate:=s_date
edate:=s_date

nJSONResult:=JSON New Array 
For (iCounter;1;Size of array(EmpID))
sdate:=s_date
edate:=Add to date(sdate;0;0;1)

QUERY([Employees];[Employees]emp_id=EmpID{iCounter})

nJSONObject:=JSON New Object 
JSON Set Number (nJSONObject;"id";[Employees]emp_id)

EmpFName:=[Employees]emp_first_name
EmpLName:=[Employees]emp_last_name
FullName:=EmpFName+Char(Space)+EmpLName
JSON Set Text (nJSONObject;"EmpName";FullName)

If (setFlag=1)
USE SET("SetA")
  //QUERY SELECTION BY FORMULA([Timeslips];timestamp_unix_toDate ([Timeslips]Timestamp_start)=s_date)
QUERY SELECTION([Timeslips];[Timeslips]Timestamp_start>Num(timestamp_unix_Get (sdate;Time("00:00:01")));*)
QUERY SELECTION([Timeslips]; & ;[Timeslips]Timestamp_end<=Num(timestamp_unix_Get (edate;Time("00:00:01"))))
QUERY SELECTION([Timeslips];[Timeslips]emp_id=[Employees]emp_id)
CREATE SET([Timeslips];"SetB")

USE SET("SetB")
QUERY SELECTION([Timeslips];[Timeslips]billing_status=2)
JSON Set Number (nJSONObject;"Billed";Round(Sum([Timeslips]slip_hours);2))

USE SET("SetB")
QUERY SELECTION([Timeslips];[Timeslips]billing_status=1)
JSON Set Number (nJSONObject;"Chargeble";Round(Sum([Timeslips]slip_hours);2))

USE SET("SetB")
QUERY SELECTION([Timeslips];[Timeslips]billing_status#1;*)
QUERY SELECTION([Timeslips]; & ;[Timeslips]billing_status#2)

JSON Set Number (nJSONObject;"NotChargeble";Round(Sum([Timeslips]slip_hours);2))

Else 
QUERY([Timeslips];[Timeslips]Timestamp_start>Num(timestamp_unix_Get (sdate;Time("00:00:01")));*)
QUERY([Timeslips]; & ;[Timeslips]Timestamp_end<=Num(timestamp_unix_Get (edate;Time("00:00:01"))))
QUERY SELECTION([Timeslips];[Timeslips]emp_id=[Employees]emp_id)
CREATE SET([Timeslips];"SetB")

USE SET("SetB")
QUERY SELECTION([Timeslips];[Timeslips]billing_status=2)
JSON Set Number (nJSONObject;"Billed";Round(Sum([Timeslips]slip_hours);2))

USE SET("SetB")
QUERY SELECTION([Timeslips];[Timeslips]billing_status=1)
JSON Set Number (nJSONObject;"Chargeble";Round(Sum([Timeslips]slip_hours);2))

USE SET("SetB")
QUERY SELECTION([Timeslips];[Timeslips]billing_status#1;*)
QUERY SELECTION([Timeslips]; & ;[Timeslips]billing_status#2)

JSON Set Number (nJSONObject;"NotChargeble";Round(Sum([Timeslips]slip_hours);2))

End if 

JSON Set Object (nJSONResult;"";nJSONObject)
End for 

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)

JSON Release (nJSONResult)

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)


-->