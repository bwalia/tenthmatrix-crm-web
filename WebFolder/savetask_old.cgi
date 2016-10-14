<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 


If (_HIT_HTMLTXT="Session-Authenticated-OK")
CREATE RECORD([Tasks])
[Tasks]task_name:=_HIT_WebApp_GetField ("Task_Name")
[Tasks]task_id:=Sequence number([Tasks])
[Tasks]proj_id:=Num(_HIT_WebApp_GetField ("Project_ID"))
[Tasks]task_estimated_hours:=Num(_HIT_WebApp_GetField ("Task_Estimated_Hour"))
[Tasks]task_rate:=Num(_HIT_WebApp_GetField ("Task_Rate"))
[Tasks]task_active:=Num(_HIT_WebApp_GetField("Task_Activate"))
[Tasks]uuid:=Generate UUID

if(String(_HIT_WebApp_GetField("Task_Active"))="Active")
[Tasks]task_active:=True
Else
[Tasks]task_active:=False
End if

SAVE RECORD([Tasks])

_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("tasks.shtml")
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 

-->                                                                                                                     