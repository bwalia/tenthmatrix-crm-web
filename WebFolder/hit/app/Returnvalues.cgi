<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT;CustomerAdress)C_LONGINT(client_ID)_HIT_HTMLTXT:=_HIT_AuthenticateSession If (_HIT_HTMLTXT="Session-Authenticated-OK")client_id:=Num(_HIT_WebApp_GetField ("Client_ID"))QUERY([Companies];[Companies]account_Number=client_id)If (Records in selection([Companies])>0)CustomerAdress:=BuildMailAddress Else 
client_id:=(_HIT_WebApp_GetField ("Client_ID"))QUERY([Companies];[Companies]uuid=String(client_id))If (Records in selection([Companies])>0)CustomerAdress:=BuildMailAddress Else CustomerAdress:="" End if End if_HIT_HTMLTXT:=CustomerAdressElse_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "_HIT_HTTPD_RedirectToURL ("sign-in.shtml")End if

-->