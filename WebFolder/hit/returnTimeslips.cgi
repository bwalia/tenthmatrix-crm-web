<!--HIT_EXECUTE

C_TEXT($0;$1)
ARRAY LONGINT(nTaskIDArr;0)
ARRAY TEXT(TaskNameArr;0)
ARRAY REAL(TaskSlipHourArr;0)
ARRAY REAL(TaskSlipRateArr;0)
C_DATE(sDate;eDate)
C_LONGINT(TotalTimeSlips;TaskID;StartTimeStamp;EndTimeStamp)
StartTimeStamp:=0
EndTimeStamp:=0
TaskID:=0
EmployeeID:=Num(_HIT_WebApp_GetField ("employeeID"))
ProjectID:=Num(_HIT_WebApp_GetField ("projectID"))
StartDate:=_HIT_WebApp_GetField ("start_date")
TaskID:=Num(_HIT_WebApp_GetField ("taskid"))

If (StartDate#"")
sDate:=Date(_HIT_WebApp_GetField ("start_date"))
StartTimeStamp:=timestamp_unix_Get (sDate)
End if 

EndDate:=_HIT_WebApp_GetField ("end_date")
If (EndDate#"")
eDate:=Date(_HIT_WebApp_GetField ("end_date"))
EndTimeStamp:=timestamp_unix_Get (eDate)
End if 

eStatus:=Num(_HIT_WebApp_GetField ("status"))

QUERY([Projects];[Projects]proj_id=ProjectID)
If (Records in selection([Projects])>0)
RELATE MANY SELECTION([Tasks]proj_id)
SELECTION TO ARRAY([Tasks]task_id;nTaskIDArr)

If (TaskID=0)
QUERY WITH ARRAY([Timeslips]task_id;nTaskIDArr)
Else 
nfind:=Find in array(nTaskIDArr;TaskID)
If (nfind#-1)
QUERY([Timeslips];[Timeslips]task_id=TaskID)
End if 
End if 

QUERY SELECTION([Timeslips];[Timeslips]emp_id=EmployeeID)

If (Records in selection([Timeslips])>0)

If (StartTimeStamp#0)
QUERY SELECTION([Timeslips];[Timeslips]Timestamp_start>=StartTimeStamp)
End if 
If (EndTimeStamp#0)
QUERY SELECTION([Timeslips];[Timeslips]Timestamp_end<=EndTimeStamp)
End if 

Case of 
: (eStatus=1)
QUERY SELECTION([Timeslips];[Timeslips]billing_status=1)
: (eStatus=2)
QUERY SELECTION([Timeslips];[Timeslips]billing_status=2)
: (eStatus=3)
QUERY SELECTION([Timeslips];[Timeslips]billing_status#1)
Else 

End case 

CREATE SET([Timeslips];"SetA")
Path:=Get 4D folder(Database Folder)+"savedset.4st"
SAVE SET("SetA";Path)

If (Records in selection([Timeslips])>0)

nJSONResult:=JSON New Array 
For (count;1;Records in selection([Timeslips]))
nJSONObject:=JSON New Object 
APPEND TO ARRAY(TaskSlipHourArr;[Timeslips]slip_hours)
JSON Set Number (nJSONObject;"Hours";[Timeslips]slip_hours)
APPEND TO ARRAY(TaskSlipRateArr;[Timeslips]slip_rate)
JSON Set Number (nJSONObject;"Rate";[Timeslips]slip_rate)
Amount:=[Timeslips]slip_hours*[Timeslips]slip_rate
JSON Set Number (nJSONObject;"Amount";Round(Amount;2))

JSON Set Text (nJSONObject;"UUID";[Timeslips]uuid)
QUERY([Tasks];[Tasks]task_id=[Timeslips]task_id)
APPEND TO ARRAY(TaskNameArr;[Tasks]task_name)
JSON Set Text (nJSONObject;"Task";[Tasks]task_name)


Case of 
: ([Timeslips]billing_status=1)
rStatus:="Chargeable"
: ([Timeslips]billing_status=2)
rStatus:="Billed"
: ([Timeslips]billing_status#1)
rStatus:="Non Chargeable"
End case 

JSON Set Text (nJSONObject;"Status";rStatus)

JSON Set Object (nJSONResult;"";nJSONObject)

NEXT RECORD([Timeslips])
End for 

nJSONObject:=JSON New Object 
JSON Set Number (nJSONObject;"Hours";Sum([Timeslips]slip_hours))
JSON Set Number (nJSONObject;"Rate";Sum([Timeslips]slip_rate))
JSON Set Number (nJSONObject;"Amount";Round(Sum([Timeslips]slip_value);2))
JSON Set Text (nJSONObject;"Task";"TOTAL")
JSON Set Object (nJSONResult;"";nJSONObject)

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)
JSON Save As Document (nJSONResult;"timeslip.txt")

Else 
nJSONResult:=JSON New Object 
JSON Set Text (nJSONResult;"nResult";"No Records found.")
Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)
End if 

Else 
nJSONResult:=JSON New Object 
JSON Set Text (nJSONResult;"nResult";"No Records found.")
Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)
End if 
End if 

If (JSON Is Valid Object (nJSONResult)=1)
JSON Release (nJSONResult)
End if 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->