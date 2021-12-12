<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
//_HIT_HTMLTXT:=_HIT_AuthenticateSession 

//If (_HIT_HTMLTXT="Session-Authenticated-OK")

C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("Project_uuid")
READ WRITE([Projects])
QUERY([Projects];[Projects]uuid=mUUIDStr)

If (Records in selection([Projects])=0)
CREATE RECORD([Projects])
[Projects]uuid:=Generate UUID
[Projects]proj_id:=Sequence number([Projects])
End if 

[Projects]client_id:=Num(_HIT_WebApp_GetField ("Client_ID"))
[Projects]proj_name:=_HIT_WebApp_GetField ("Project_Name")
[Projects]proj_rate:=Num(_HIT_WebApp_GetField ("Rate"))
[Projects]budget:=Num(_HIT_WebApp_GetField ("Budget"))
[Projects]start_date:=date(_HIT_WebApp_GetField ("Start_Date"))
[Projects]currency_code:=_HIT_WebApp_GetField ("Currency")

If (_HIT_WebApp_GetField ("Project_Active")="Active")
[Projects]proj_active:=True
Else
[Projects]proj_active:=False
End if
SAVE RECORD([Projects])
UNLOAD RECORD([Projects])
READ ONLY([Projects])
ORDER BY([Projects];[Projects]proj_name;>)
_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("projects.shtml?"+"keyword="+_HIT_WebApp_GetField ("Project_Name"))
//Else
//_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
//_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

//End if

-->