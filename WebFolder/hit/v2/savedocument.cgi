<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 

If (_HIT_HTMLTXT="Session-Authenticated-OK")

C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("doc_uuid")
READ WRITE([Documents])
QUERY([Documents];[Documents]uuid=mUUIDStr)

If (Records in selection([Documents])=0)
CREATE RECORD([Documents])
[Documents]uuid:=Generate UUID
mUUIDStr:=[Documents]uuid
[Documents]created_timestamp:=timestamp_unix_Get
End if 

[Documents]filename:=_HIT_WebApp_GetField ("file_name")
[Documents]modified_timestamp:=timestamp_unix_Get
[Documents]doctype:=_HIT_WebApp_GetField ("type")
[Documents]metadata:=_HIT_WebApp_GetField ("metadata")
[Documents]uuid_customer:=_HIT_WebApp_GetField ("company_uuid")
C_LONGINT(_HIT_JSON_LONG)
_HIT_WebApp_GetFileUploadInfo ("file_content";"AUTO-PARSE-JSON";->_HIT_JSON_LONG)
If (JSON Is Valid Object (_HIT_JSON_LONG)=1)
_HIT_HTMLTXT:=JSON Get Text (_HIT_JSON_LONG;"filename")

[Documents]filename:=_HIT_HTMLTXT

_HIT_HTMLTXT:=JSON Get Text (_HIT_JSON_LONG;"extension")
_HIT_HTMLTXT:=JSON Get Text (_HIT_JSON_LONG;"content-type")
_HIT_HTMLTXT:=JSON Get Text (_HIT_JSON_LONG;"temppath")

If (Test path name(_HIT_HTMLTXT)=Is a document)
SET BLOB SIZE([Documents]filecontent;0)
DOCUMENT TO BLOB(_HIT_HTMLTXT;[Documents]filecontent)
End if 

JSON Release (_HIT_JSON_LONG)
End if 

SAVE RECORD([Documents])
UNLOAD RECORD([Documents])
READ ONLY([Documents])

_HIT_HTTPD_RedirectToURL ("documents.shtml?uuid="+mUUIDStr)
Else 
_HIT_HTTPD_RedirectToURL ("sign-in.shtml?url="+HTTPD_DocumentURI)

End if 

-->                                                                                                                     