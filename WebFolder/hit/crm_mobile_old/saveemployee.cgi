<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 


If (_HIT_HTMLTXT="Session-Authenticated-OK")

C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("Employee_uuid")
READ WRITE([Employees])
QUERY([Employees];[Employees]uuid=mUUIDStr)

If (Records in selection([Employees])=0)
CREATE RECORD([Employees])
[Employees]uuid:=Generate UUID
[Employees]emp_id:=Sequence number([Employees])
End if

[Employees]emp_position:=_HIT_WebApp_GetField ("Position")
[Employees]emp_first_name:=_HIT_WebApp_GetField ("FirstName")
[Employees]emp_last_name:=_HIT_WebApp_GetField ("Lastname")
[Employees]email:=_HIT_WebApp_GetField ("Email")
[Employees]zWebPassword:=_HIT_WebApp_GetField ("Password")
[Employees]emp_type:=_HIT_WebApp_GetField ("Type")

If (_HIT_WebApp_GetField ("Allow_Web_Access")="Allow")
[Employees]AllowWebAccess:=True
Else
[Employees]AllowWebAccess:=False
End if

If (_HIT_WebApp_GetField ("Status")="Active")
[Employees]emp_active:=True
Else
[Employees]emp_active:=False
End if

SAVE RECORD([Employees])
UNLOAD RECORD([Employees])
READ ONLY([Employees])
ORDER BY([Employees];[Employees]emp_first_name;>)

_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("employees.shtml?"+"keyword="+_HIT_WebApp_GetField ("FirstName"))
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 

-->
-->