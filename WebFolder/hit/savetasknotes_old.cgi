<!--HIT_EXECUTE


C_TEXT(_HIT_HTMLTXT)
C_BLOB(Web_ResponseDataBLOB)
C_INTEGER(setFlagTask)
C_LONGINT(mitemID)
C_TEXT(muuid)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 
setFlagTask:=0

EmpName:="Admin"
Case of 
: (Web_isUserStaff )
EmployeeUUID:=[Employees]uuid
EmpName:=[Employees]emp_first_name+" "+[Employees]emp_last_name
: (Web_isUserClient )
EmployeeUUID:=[Contacts]uuid
EmpName:=[Contacts]First name+" "+[Contacts]Surname
End case 


If (_HIT_HTMLTXT="Session-Authenticated-OK")
C_TEXT(mUUIDStr)

mUUIDStr:=_HIT_WebApp_GetField ("tasknote_uuid")
READ WRITE([Task_Notes])
QUERY([Task_Notes];[Task_Notes]uuid=mUUIDStr)

If (Records in selection([Task_Notes])=0)
CREATE RECORD([Task_Notes])
[Task_Notes]uuid:=Generate UUID
muuid:=[Task_Notes]uuid
[Task_Notes]Timestamp_created:=timestamp_unix_Get 
setFlagTask:=1
[Task_Notes]tasknote_user_name:=EmpName
End if   // 
[Task_Notes]Task_Note:=_HIT_WebApp_GetField ("note")
[Task_Notes]uuid_task:=_HIT_WebApp_GetField ("uuid_task")
[Task_Notes]Timestamp_modified:=timestamp_unix_Get 

mDate:=timestamp_unix_toGMT ([Task_Notes]Timestamp_modified)

SAVE RECORD([Task_Notes])
If (OK=1)
CREATE RECORD([Activity_Log])
[Activity_Log]uuid:=Generate UUID

projectID:=Num(_HIT_WebApp_GetField ("Project_ID"))
QUERY([Projects];[Projects]proj_id=projectID)
QUERY([Companies];[Companies]account_Number=[Projects]client_id)
[Activity_Log]Task_uuid:=_HIT_WebApp_GetField ("uuid_task")
[Activity_Log]uuid_client:=[Companies]uuid
[Activity_Log]Activity_Type:="Task_Activity"
[Activity_Log]Timestamp_created:=timestamp_unix_Get 
[Activity_Log]Timestamp_modified:=timestamp_unix_Get 
[Activity_Log]Activity_status:=0
QUERY([Tasks];[Tasks]uuid=_HIT_WebApp_GetField ("uuid_task"))
[Activity_Log]Activity_Description:=[Tasks]task_name
If ([Tasks]uuid_reported_by=EmployeeUUID)
[Activity_Log]uuid_employee:=[Tasks]uuid_assigned_to
Else 
[Activity_Log]uuid_employee:=[Tasks]uuid_reported_by
End if 
If (setFlagTask=1)
[Activity_Log]Activity_Title:=EmpName+" added a new Note to "+String([Tasks]task_id)
Else 
[Activity_Log]Activity_Title:=EmpName+" edited a Note to "+String([Tasks]task_id)
End if 
SAVE RECORD([Activity_Log])

End if 
UNLOAD RECORD([Task_Notes])
READ ONLY([Task_Notes])
  //_HIT_HTMLTXT:="[{\"item_id\": "+String(mitemID)+"},{\"m_uuid\": "+muuid+"}]"
_HIT_HTMLTXT:=muuid+","+mDate

Else 

_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")
End if 

-->