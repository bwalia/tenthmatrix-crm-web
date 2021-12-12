<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession
TRACE

if(_HIT_HTMLTXT="Session-Authenticated-OK")
_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("index.shtml")
Else
_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml?"+_HIT_WebApp_GetField ("auth_user")+"&"+_HIT_HTMLTXT)

End If


-->