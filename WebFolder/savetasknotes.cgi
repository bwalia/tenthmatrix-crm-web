<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)

C_BLOB(Web_ResponseDataBLOB)
C_LONGINT(mitemID)
C_TEXT(muuid)
_HIT_HTMLTXT:=_HIT_AuthenticateSession 
If (_HIT_HTMLTXT="Session-Authenticated-OK")
C_TEXT(mUUIDStr)

mUUIDStr:=_HIT_WebApp_GetField ("tasknote_uuid")
READ WRITE([Task_Notes])
QUERY([Task_Notes];[Task_Notes]uuid=mUUIDStr)

If (Records in selection([Task_Notes])=0)
CREATE RECORD([Task_Notes])
[Task_Notes]uuid:=Generate UUID
muuid:=[Task_Notes]uuid
[Task_Notes]Timestamp_created:=timestamp_unix_Get
End if 

[Task_Notes]Task_Note:=_HIT_WebApp_GetField ("note")
[Task_Notes]uuid_task:=_HIT_WebApp_GetField ("uuid_task")
[Task_Notes]Timestamp_modified:=timestamp_unix_Get
mDate:=timestamp_unix_toGMT ([Task_Notes]Timestamp_modified)

SAVE RECORD([Task_Notes])
UNLOAD RECORD([Task_Notes])
READ ONLY([Task_Notes])


//_HIT_HTMLTXT:="[{\"item_id\": "+String(mitemID)+"},{\"m_uuid\": "+muuid+"}]"
_HIT_HTMLTXT:=muuid+","+mDate

//SET BLOB SIZE(Web_ResponseDataBLOB;0)
//TEXT TO BLOB(_HIT_HTMLTXT;Web_ResponseDataBLOB;UTF8 text without length)
//_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

Else

_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

End if 
-->