<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 

If (_HIT_HTMLTXT="Session-Authenticated-OK")

C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("Task_uuid")
READ WRITE([Tasks])
QUERY([Tasks];[Tasks]uuid=mUUIDStr)

If (Records in selection([Tasks])=0)
CREATE RECORD([Tasks])
[Tasks]task_id:=Sequence number([Tasks])
[Tasks]uuid:=Generate UUID
End if 

[Tasks]task_name:=_HIT_WebApp_GetField ("Task_Name")
[Tasks]proj_id:=Num(_HIT_WebApp_GetField ("Project_ID"))
[Tasks]task_estimated_hours:=Num(_HIT_WebApp_GetField ("Task_Estimated_Hour"))
[Tasks]task_rate:=Num(_HIT_WebApp_GetField ("Task_Rate"))
[Tasks]uuid_assigned_to:=_HIT_WebApp_GetField ("uuid_assigned_to")
[Tasks]uuid_reported_by:=_HIT_WebApp_GetField ("uuid_reported_by")
[Tasks]task_priority:=_HIT_WebApp_GetField ("task_priority")
[Tasks]task_status:=_HIT_WebApp_GetField ("task_status")
[Tasks]task_active:=(_HIT_WebApp_GetField ("Task_Active")="Active")
[Tasks]Timestamp_start:=timestamp_unix_Get (Date(_HIT_WebApp_GetField ("task_start_date")))
[Tasks]Timestamp_end:=timestamp_unix_Get (Date(_HIT_WebApp_GetField ("task_end_date")))

SAVE RECORD([Tasks])
UNLOAD RECORD([Tasks])
READ ONLY([Tasks])

_HIT_HTTPD_RedirectToURL ("tasks.shtml?"+"keyword="+_HIT_WebApp_GetField ("Task_Name"))
Else 
_HIT_HTTPD_RedirectToURL ("sign-in.shtml?url="+HTTPD_DocumentURI)

End if

-->                                                                                                                     