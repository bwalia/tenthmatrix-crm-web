<!--HIT_EXECUTE
 
C_LONGINT(iCounter;jsonobject;result;sdatetimeStamp;edatetimeStamp)
ARRAY LONGINT(status;0)

result:=JSON New Array 

//DISTINCT VALUES([Invoices]invoice_status;status)
jsonobject:=JSON New Object 

//Active 
QUERY ([Projects];[Projects]proj_active=True)
JSON Set Text (jsonobject;"label";"Active")
JSON Set Number (jsonobject;"data";Records in selection([Projects]))
JSON Set Object (result;"";jsonobject)

//Inactive 
jsonobject:=JSON New Object 
QUERY ([Projects];[Projects]proj_active=False)
JSON Set Text (jsonobject;"label";"Inactive")
JSON Set Number (jsonobject;"data";Records in selection([Projects]))

JSON Set Object (result;"";jsonobject)

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)


-->