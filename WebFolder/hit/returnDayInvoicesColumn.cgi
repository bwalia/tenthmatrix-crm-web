<!--HIT_EXECUTE
 
C_LONGINT(jsonobject;result;sdatetimeStamp;edatetimeStamp)

start_date:=Date(_HIT_WebApp_GetField ("s_date"))
end_date:=Date(_HIT_WebApp_GetField ("e_date"))

client_id:=_HIT_WebApp_GetField ("client_id")
project_id:=_HIT_WebApp_GetField ("project_id")



ARRAY LONGINT(status;0)

result:=JSON New Array 



//DISTINCT VALUES([Invoices]invoice_status;status)
jsonobject:=JSON New Object 

//Invoiced 
QUERY([Invoices];[Invoices]inv_date=start_date;*)

If (client_id#"")
QUERY([Invoices]; & ;[Invoices]client_id=Num(client_id);*)
End if
If (project_id#"")
QUERY([Projects];[Projects]proj_id=Num(project_id))
QUERY([Invoices]; & ;[Invoices]project_code=[Projects]proj_name;*)
End if
QUERY ([Invoices]; & ;[Invoices]invoice_status="Invoiced")

JSON Set Number (jsonobject;"Invoiced";Records in selection([Invoices]))

//Paid 
QUERY([Invoices];[Invoices]inv_date=start_date;*)

If (client_id#"")
QUERY([Invoices]; & ;[Invoices]client_id=Num(client_id);*)
End if
If (project_id#"")
QUERY([Projects];[Projects]proj_id=Num(project_id))
QUERY([Invoices]; & ;[Invoices]project_code=[Projects]proj_name;*)
End if
QUERY ([Invoices]; & ;[Invoices]invoice_status="Paid")

JSON Set Number (jsonobject;"Paid";Records in selection([Invoices]))

//Partially Paid 
QUERY([Invoices];[Invoices]inv_date=start_date;*)

If (client_id#"")
QUERY([Invoices]; & ;[Invoices]client_id=Num(client_id);*)
End if
If (project_id#"")
QUERY([Projects];[Projects]proj_id=Num(project_id))
QUERY([Invoices]; & ;[Invoices]project_code=[Projects]proj_name;*)
End if
QUERY ([Invoices]; & ;[Invoices]invoice_status="Partially Paid")

JSON Set Number (jsonobject;"Partially_Paid";Records in selection([Invoices]))

//Bad debt 
QUERY([Invoices];[Invoices]inv_date=start_date;*)

If (client_id#"")
QUERY([Invoices]; & ;[Invoices]client_id=Num(client_id);*)
End if
If (project_id#"")
QUERY([Projects];[Projects]proj_id=Num(project_id))
QUERY([Invoices]; & ;[Invoices]project_code=[Projects]proj_name;*)
End if
QUERY ([Invoices]; & ;[Invoices]invoice_status="Bad debt")

JSON Set Number (jsonobject;"Bad_Debt";Records in selection([Invoices]))

//Needs chasing 
QUERY([Invoices];[Invoices]inv_date=start_date;*)

If (client_id#"")
QUERY([Invoices]; & ;[Invoices]client_id=Num(client_id);*)
End if
If (project_id#"")
QUERY([Projects];[Projects]proj_id=Num(project_id))
QUERY([Invoices]; & ;[Invoices]project_code=[Projects]proj_name;*)
End if
QUERY ([Invoices]; & ;[Invoices]invoice_status="Needs chasing")

JSON Set Number (jsonobject;"Needs_Chasing";Records in selection([Invoices]))

JSON Set Object (result;"";jsonobject)


SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)


-->