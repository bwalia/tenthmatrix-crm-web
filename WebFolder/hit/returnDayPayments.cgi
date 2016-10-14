<!--HIT_EXECUTE

C_LONGINT(iCounter;jsonobject;result;loop_count;diff)

start_date:=Date(_HIT_WebApp_GetField ("s_date"))

client_id:=_HIT_WebApp_GetField ("client_id")
 
sdate:=start_date


result:=JSON New Array 

jsonobject:=JSON New Object


QUERY([Payments];[Payments]date_received=sdate;*)
If (client_id#"")
QUERY([Payments]; & ;[Payments]client_accountnumber=Num(client_id);*)
End if
QUERY([Payments]; & ;[Payments]mode_of_payment="International Banking")
JSON Set Number (jsonobject;"IntBnk";Sum([Payments]amount_received))

QUERY([Payments];[Payments]date_received=sdate;*)
If (client_id#"")
QUERY([Payments]; & ;[Payments]client_accountnumber=Num(client_id);*)
End if
QUERY([Payments]; & ;[Payments]mode_of_payment="BACS")
JSON Set Number (jsonobject;"Bacs";Sum([Payments]amount_received))

QUERY([Payments];[Payments]date_received=sdate;*)
If (client_id#"")
QUERY([Payments]; & ;[Payments]client_accountnumber=Num(client_id);*)
End if
QUERY([Payments]; & ;[Payments]mode_of_payment="Paid by Debit or Credit Card")
JSON Set Number (jsonobject;"DebitCredit";Sum([Payments]amount_received))

QUERY([Payments];[Payments]date_received=sdate;*)
If (client_id#"")
QUERY([Payments]; & ;[Payments]client_accountnumber=Num(client_id);*)
End if
QUERY([Payments]; & ;[Payments]mode_of_payment="Cash")
JSON Set Number (jsonobject;"Cash";Sum([Payments]amount_received))

QUERY([Payments];[Payments]date_received=sdate;*)
If (client_id#"")
QUERY([Payments]; & ;[Payments]client_accountnumber=Num(client_id);*)
End if
QUERY([Payments]; & ;[Payments]mode_of_payment="Cheque")
JSON Set Number (jsonobject;"Cheque";Sum([Payments]amount_received))

QUERY([Payments];[Payments]date_received=sdate;*)
If (client_id#"")
QUERY([Payments]; & ;[Payments]client_accountnumber=Num(client_id);*)
End if
QUERY([Payments]; & ;[Payments]mode_of_payment="PayPal")
JSON Set Number (jsonobject;"PayPal";Sum([Payments]amount_received))

JSON Set Object (result;"";jsonobject)


SET BLOB SIZE(Web_ResponseDataBLOB;0)
Web_ResponseDataBLOB:=JSON Save As Blob (result)
JSON Release (result)

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->