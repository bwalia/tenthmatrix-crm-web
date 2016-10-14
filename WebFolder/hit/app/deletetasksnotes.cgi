<!--HIT_EXECUTE

//If (_HIT_AuthenticateSession ="Session-Authenticated-OK")
READ WRITE([Task_Notes])
QUERY([Task_Notes];[Task_Notes]uuid=_HIT_WebApp_GetField ("deletenotes_uuid"))
If (Records in selection([Task_Notes])=1)
DELETE RECORD([Task_Notes])
_HIT_HTMLTXT:="OK"

Else 
_HIT_HTMLTXT:="ERR"

End if 
SET BLOB SIZE(Web_ResponseDataBLOB;0)
TEXT TO BLOB(_HIT_HTMLTXT;Web_ResponseDataBLOB;UTF8 text without length)
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

//End if 


-->