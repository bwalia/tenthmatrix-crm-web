<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 


If (_HIT_HTMLTXT="Session-Authenticated-OK")
CREATE RECORD([Projects])

[Projects]client_id:=Num(_HIT_WebApp_GetField ("Client_ID"))
[Projects]proj_id:=Num(_HIT_WebApp_GetField ("Project_id"))
[Projects]proj_name:=_HIT_WebApp_GetField ("Project_Name")
[Projects]proj_rate:=_HIT_WebApp_GetField ("Rate")
[Projects]budget:=_HIT_WebApp_GetField ("Budget")
[Projects]start_date:=date(_HIT_WebApp_GetField ("Start_Date"))
[Projects]currency_code:=_HIT_WebApp_GetField ("Currency")
[Projects]end_date:=date(_HIT_WebApp_GetField ("End_Date"))
[Projects]uuid:=Generate UUID

if(String(_HIT_WebApp_GetField("Project_Active"))="Active")
[Projects]proj_active:=True
Else
[Projects]proj_active:=False
End if
SAVE RECORD([Projects])

_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("Projects.shtml")
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 

-->