<!--HIT_EXECUTE
C_TEXT(_HIT_HTMLTXT)

_HIT_HTMLTXT:=_HIT_WebApp_GetField ("url_to_redirect")

If (_HIT_HTMLTXT="")

_HIT_HTMLTXT:="navigator.shtml"

Else 

End if 

If (_HIT_AuthenticateSession ="Session-Authenticated-OK")

_HIT_HTTPD_RedirectToURL (_HIT_HTMLTXT)

Else 

_HIT_HTTPD_RedirectToURL ("sign-in.shtml?url="+_HIT_HTMLTXT)

End if 
-->