<!--HIT_EXECUTE

C_LONGINT(iCounter;mJSONOject;mJSOnResult;Client_ID)

start_date:=Date(_HIT_WebApp_GetField ("s_date"))
end_date:=Date(_HIT_WebApp_GetField ("e_date"))
mode:=_HIT_WebApp_GetField ("mode")
Client_ID:=Num(_HIT_WebApp_GetField ("Client_ID"))
loop_count:=Num(_HIT_WebApp_GetField ("loop"))
ALL RECORDS([Invoices])
CREATE SET([Invoices];"InvoiceAB")

If (Client_ID#0)
QUERY([Invoices];[Invoices]client_id=Client_ID)
CREATE SET([Invoices];"InvoiceA")
End if 
sdate:=start_date
edate:=start_date
mJSOnResult:=JSON New Array 
For (iCounter;1;loop_count)
sdate:=edate
Case of 
: (mode="year")
edate:=Add to date(edate;1;0;0)
Else 
edate:=Add to date(edate;0;0;1)
End case 

mJSONOject:=JSON New Object 

If (mode="year")
JSON Set Text (mJSONOject;"Date_Time";String(edate))
Else 
JSON Set Text (mJSONOject;"Date_Time";String(sdate))
End if 

If (Client_ID#0)
USE SET("InvoiceA")
Else 
USE SET("InvoiceAB")
End if 

If (mode="year")
QUERY SELECTION([Invoices];[Invoices]inv_date>sdate;*)
QUERY SELECTION([Invoices]; & ;[Invoices]inv_date<=edate)
Else 
QUERY SELECTION([Invoices];[Invoices]inv_date=sdate)
End if 
CREATE SET([Invoices];"InvoiceB")

USE SET("InvoiceB")
JSON Set Number (mJSONOject;"InvoiceDate";Records in selection([Invoices]))

USE SET("InvoiceB")
QUERY SELECTION([Invoices];[Invoices]invoice_status="Invoiced")
JSON Set Number (mJSONOject;"Invoiced";Records in selection([Invoices]))
 
USE SET("InvoiceB")
QUERY SELECTION([Invoices];[Invoices]invoice_status="paid")
JSON Set Number (mJSONOject;"Paid";Records in selection([Invoices]))

USE SET("InvoiceB")
QUERY SELECTION([Invoices];[Invoices]invoice_status="Partially Paid")
JSON Set Number (mJSONOject;"Partially_Paid";Records in selection([Invoices]))

USE SET("InvoiceB")
QUERY SELECTION([Invoices];[Invoices]invoice_status="Bad debt")
JSON Set Number (mJSONOject;"Bad_Debt";Records in selection([Invoices]))

USE SET("InvoiceB")
QUERY SELECTION([Invoices];[Invoices]invoice_status="Needs chasing")
JSON Set Number (mJSONOject;"Needs_Chasing";Records in selection([Invoices]))


JSON Set Object (mJSOnResult;"";mJSONOject)
End for 

SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (mJSOnResult)
JSON Save As Document (mJSOnResult;"invoices_year.txt")
JSON Release (mJSOnResult)

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->