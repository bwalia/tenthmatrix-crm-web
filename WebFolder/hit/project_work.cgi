<!--HIT_EXECUTE

C_DATE(proj_start_date;curr_date;start_date)

ARRAY LONGINT(TaskID;0)
C_LONGINT(iCounter;nJSONObject;nJSONResult;hours;project_id)

project_id:=Num(_HIT_WebApp_GetField ("project_id"))
QUERY([Projects];[Projects]proj_id=project_id)
proj_start_date:=[Projects]start_date
If(proj_start_date=!00/00/00!)
proj_start_date:=!01/11/2013!
End If
curr_date:=Current date
start_date:=proj_start_date

QUERY([Tasks];[Tasks]proj_id=project_id)
DISTINCT VALUES([Tasks]task_id;TaskID)

nJSONResult:=JSON New Array 



While (curr_date>start_date)
nJSONObject:=JSON New Object 
hours:=0

For (iCounter;1;Size of array(TaskID))

QUERY([Timeslips];[Timeslips]task_id=TaskID{iCounter})
QUERY SELECTION BY FORMULA([Timeslips];timestamp_unix_toDate ([Timeslips]Timestamp_start)=start_date)

hours:=hours+Sum([Timeslips]slip_hours)

End for 

JSON Set Text (nJSONObject;"StartDate";String(proj_start_date))

JSON Set Text (nJSONObject;"Date_Time";String(start_date))

JSON Set Number (nJSONObject;"Hours";hours)

JSON Set Object (nJSONResult;"";nJSONObject)

start_date:=start_date+1
End while 

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (nJSONResult)
JSON Save As Document (nJSONResult;"Employee.txt")

JSON Release (nJSONResult)

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->