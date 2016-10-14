<!--HIT_EXECUTE
C_TEXT(_HIT_HTMLTXT)
C_BLOB(Web_ResponseDataBLOB)
C_LONGINT(mitemID)
C_TEXT(muuid)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 
If (_HIT_HTMLTXT="Session-Authenticated-OK")
C_TEXT(mDeleteuuid)
mDeleteuuid:=_HIT_WebApp_GetField ("holiday_uuid")
READ WRITE([employee_holidays])
QUERY([employee_holidays];[employee_holidays]uuid=mDeleteuuid)
If (Records in selection([employee_holidays])#0)
DELETE RECORD([employee_holidays])
End if 
Else

_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 
-->