<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 

If (_HIT_HTMLTXT="Session-Authenticated-OK")

C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("Product_uuid")
READ WRITE([Products])
QUERY([Products];[Products]uuid=mUUIDStr)

If (Records in selection([Products])=0)
CREATE RECORD([Products])
[Products]uuid:=Generate UUID
[Products]ProductID:=Sequence number([Products])
End if

[Products]ProductName:=_HIT_WebApp_GetField ("ProductName")
[Products]Unit_Price:=Num(_HIT_WebApp_GetField ("Unit_Price"))
[Products]Product_Type:=_HIT_WebApp_GetField ("Product_Type")
[Products]NumberOfUsers:=Num(_HIT_WebApp_GetField ("NumberOfUsers"))
[Products]CurrentVersion:=_HIT_WebApp_GetField ("CurrentVersion")
[Products]Platform:=_HIT_WebApp_GetField ("Platform")

If (_HIT_WebApp_GetField ("SerialNumberRequired")="Required")
[Products]SerialNumberRequired:=True
Else
[Products]SerialNumberRequired:=False
End if

SAVE RECORD([Products])
UNLOAD RECORD([Products])
READ ONLY([Products])
ORDER BY([Products];[Products]ProductName;>)
_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("products.shtml?"+"keyword="+_HIT_WebApp_GetField ("ProductName"))
Else
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if

-->