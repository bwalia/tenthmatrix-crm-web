<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
C_LONGINT(client_ID)

_HIT_HTMLTXT:=_HIT_AuthenticateSession 

If (_HIT_HTMLTXT="Session-Authenticated-OK")
 
client_id:=Num(_HIT_WebApp_GetField ("Client_ID"))
QUERY([Companies];[Companies]account_Number=client_id)
If (Records in selection([Companies])>0)
CustomerAdress:=[Companies]address_line_1
CustomerAdress:=CustomerAdress+Char(Carriage return)+[Companies]address_line_2
End if

//_HIT_HTMLTXT:="{\"client_address\": "+CustomerAdress+"}"
_HIT_HTMLTXT:=CustomerAdress

//SET BLOB SIZE(Web_ResponseDataBLOB;0)
//TEXT TO BLOB(_HIT_HTMLTXT;Web_ResponseDataBLOB;UTF8 text without length)
//_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

Else 
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 

-->