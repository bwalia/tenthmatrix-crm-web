<!--HIT_EXECUTE
C_LONGINT(pEmplIDNum;mJSONObject)
C_REAL(pTotalHours)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)

pEmplIDNum:=Num(_HIT_WebApp_GetField ("empl_id"))

QUERY([Tasks];[Tasks]proj_id=79)
RELATE MANY SELECTION([Timeslips]task_id)
QUERY SELECTION([Timeslips];[Timeslips]emp_id=pEmplIDNum)

pTotalHours:=Sum([Timeslips]slip_hours;3)

mJSONObject:=JSON New Object 
JSON Set Number (mJSONObject;"Total_hours";pTotalHours)


Web_ResponseDataBLOB:=JSON Save As Blob (mJSONObject)
JSON Release (mJSONObject)
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->

