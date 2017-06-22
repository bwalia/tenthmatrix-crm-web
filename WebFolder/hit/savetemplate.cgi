<!--HIT_EXECUTE
 
C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 

If (_HIT_HTMLTXT="Session-Authenticated-OK")
C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("uuid")

READ WRITE([Templates])
QUERY([Templates];[Templates]uuid=mUUIDStr)

If (Records in selection([Templates])=0)
CREATE RECORD([Templates])
[Templates]uuid:=Generate UUID
End if 
[Templates]code:=_HIT_WebApp_GetField ("code")
[Templates]subject:=_HIT_WebApp_GetField ("subject")
[Templates]contentTxt:=_HIT_WebApp_GetField ("contentTxt")
[Templates]comments:=_HIT_WebApp_GetField ("comments")

SAVE RECORD([Templates])
UNLOAD RECORD([Templates])
READ ONLY([Templates])
ORDER BY([Templates];[Templates]code;>)
_HIT_HTTPD_RedirectToURL ("templates.shtml?"+"keyword="+_HIT_WebApp_GetField ("code"))
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 
-->