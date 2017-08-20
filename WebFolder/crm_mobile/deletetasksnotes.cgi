<!--HIT_EXECUTE
C_TEXT(_HIT_HTMLTXT)
C_BLOB(Web_ResponseDataBLOB)
C_LONGINT(mitemID)
C_TEXT(muuid)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 
If (_HIT_HTMLTXT="Session-Authenticated-OK")
C_TEXT(mDeleteuuid)
mDeleteuuid:=_HIT_WebApp_GetField ("deletenotes_uuid")
READ WRITE([Task_Notes])
QUERY([Task_Notes];[Task_Notes]uuid=mDeleteuuid)
If (Records in selection([Task_Notes])#0)
DELETE RECORD([Task_Notes])
End if 
Else

_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 
-->