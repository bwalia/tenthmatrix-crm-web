<!--HIT_EXECUTE
C_LONGINT(result)
If (_HIT_AuthenticateSession ="Session-Authenticated-OK")

C_TEXT(muuid)

READ WRITE([TimeSlips])

CREATE RECORD([TimeSlips])
[TimeSlips]slip_id:=Sequence number([TimeSlips])
[TimeSlips]uuid:=Generate UUID
muuid:=[TimeSlips]uuid

[TimeSlips]task_id:=Num(_HIT_WebApp_GetField ("task_id"))
[TimeSlips]slip_description:=_HIT_WebApp_GetField ("descr")
[Timeslips]Timestamp_start:=timestamp_unix_Get (Date(_HIT_WebApp_GetField ("date"));Time(_HIT_WebApp_GetField ("s_time")))
[Timeslips]Timestamp_end:=timestamp_unix_Get (Date(_HIT_WebApp_GetField ("date"));Time(_HIT_WebApp_GetField ("e_time")))

SAVE RECORD([TimeSlips])
UNLOAD RECORD([TimeSlips])
READ ONLY([TimeSlips])

result:=JSON New Object 
JSON Set Text (result;"uuid";muuid)
SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)

Else 
result:=JSON New Object 
JSON Set Text (result;"error";"AUTH FAILED")
SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)

End if 

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->