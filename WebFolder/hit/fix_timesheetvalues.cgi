<!--HIT_EXECUTE

READ WRITE([Timeslips])

QUERY([Tasks];[Tasks]proj_id=79)

RELATE MANY SELECTION([Timeslips]task_id)

C_LONGINT(pCount;mJSONObject)
For (pCount;1;Records in selection([Timeslips])

[Timeslips]slip_hours:=Round([Timeslips]slip_hours;2)
[Timeslips]slip_value:=Round([Timeslips]slip_value;2)

SAVE RECORD([Timeslips])

NEXT RECORD([Timeslips])
End for 

READ ONLY([Timeslips])

C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)

mJSONObject:=JSON New Object 
JSON Set Number (mJSONObject;"result";"done")
Web_ResponseDataBLOB:=JSON Save As Blob (mJSONObject)
JSON Release (mJSONObject)
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)



-->