<!--HIT_EXECUTE
 
C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 

If (_HIT_HTMLTXT="Session-Authenticated-OK")
C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("uuid")

READ WRITE([businesses])
QUERY([businesses];[businesses]uuid=mUUIDStr)

If (Records in selection([businesses])=0)
CREATE RECORD([businesses])
[businesses]uuid:=Generate UUID
End if 
[businesses]name:=_HIT_WebApp_GetField ("name")
[businesses]company_no:=Num(_HIT_WebApp_GetField ("company_no"))
[businesses]vat_registration_no:=_HIT_WebApp_GetField ("vat_registration_no")
[businesses]trading_as:=_HIT_WebApp_GetField ("trading_as")
[businesses]address_full:=_HIT_WebApp_GetField ("address_full")

	If (_HIT_WebApp_GetField ("is_default_business")="true")
		[businesses]is_default_business:=1
	Else 
		[businesses]is_default_business:=0
	End if 
	
SAVE RECORD([businesses])
UNLOAD RECORD([businesses])
READ ONLY([businesses])
ORDER BY([businesses];[businesses]name;>)
_HIT_HTTPD_RedirectToURL ("businesses.shtml?"+"keyword="+_HIT_WebApp_GetField ("name"))
Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 
-->