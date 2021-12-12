<!--HIT_EXECUTE

If (_HIT_AuthenticateSession ="Session-Authenticated-OK")
READ WRITE([Invoice_Items])
QUERY([Invoice_Items];[Invoice_Items]uuid=_HIT_WebApp_GetField ("delitem_uuid"))
If (Records in selection([Invoice_Items])=1)
DELETE RECORD([Invoice_Items])
_HIT_HTMLTXT:="OK"

Else 
_HIT_HTMLTXT:="ERR"

End if 
SET BLOB SIZE(Web_ResponseDataBLOB;0)
TEXT TO BLOB(_HIT_HTMLTXT;Web_ResponseDataBLOB;UTF8 text without length)
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

End if 


-->