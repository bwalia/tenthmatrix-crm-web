<!--HIT_EXECUTE
 
C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 

If (_HIT_HTMLTXT="Session-Authenticated-OK")
C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("uuid")

READ WRITE([system_lists])
QUERY([system_lists];[system_lists]uuid=mUUIDStr)

If (Records in selection([system_lists])=0)
CREATE RECORD([system_lists])
[system_lists]uuid:=Generate UUID
End if 
[system_lists]key_name:=_HIT_WebApp_GetField ("key_name")
[system_lists]key_value:=_HIT_WebApp_GetField ("key_value")

SAVE RECORD([system_lists])
UNLOAD RECORD([system_lists])
READ ONLY([system_lists])
ORDER BY([system_lists];[system_lists]key_name;>)
_HIT_HTTPD_RedirectToURL ("system_lists.shtml?"+"keyword="+_HIT_WebApp_GetField ("key_name"))
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 
-->