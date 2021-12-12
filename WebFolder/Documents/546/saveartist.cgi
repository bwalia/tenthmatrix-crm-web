<!--HIT_EXECUTE

C_TEXT(mUUIDStr;_HIT_HTMLTXT)

mUUIDStr:=_HIT_WebApp_GetField ("uuid")
READ WRITE([Artist])
QUERY([Artist];[Artist]uuid=mUUIDStr)

If (Records in selection([Artist])=0)
CREATE RECORD([Artist])
[Artist]uuid:=Generate UUID
End if 

[Artist]name:=_HIT_WebApp_GetField ("artist_name")

SAVE RECORD([Artist])
UNLOAD RECORD([Artist])
READ ONLY([Artist])

_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("artists.shtml?new_srch="+_HIT_WebApp_GetField ("artist_name"))

-->
