<!--HIT_EXECUTE
C_LONGINT(iCounter;jsonobject;result)
C_TEXT(month)
C_LONGINT($vlCounter)  // use local Long Integer variables

vResult:=Year of(Current date)
year:=String(vResult)
result:=JSON New Array
For (iCounter;1;12)

e_month:=iCounter+1
s_month:=String(iCounter)
e_month:=String(e_month)

start_date:="1/"+s_month+"/"+year
end_date:="1/"+e_month+"/"+year

start_date:=Date(start_date)
end_date:=Date(end_date)
sdate:=timestamp_unix_Get (start_date)
edate:=timestamp_unix_Get (end_date)

QUERY([Tasks];[Tasks]Timestamp_start>sdate;*)
QUERY([Tasks]; & ;[Tasks]Timestamp_end<=edate;*)
QUERY([Tasks]; & ;[Tasks]task_active=False)

jsonobject:=JSON New Array 
JSON Set Number (jsonobject;"Month";iCounter)
JSON Set Number (jsonobject;"All";Records in selection([Tasks]))
JSON Set Array (result;"";jsonobject)

End for 

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->