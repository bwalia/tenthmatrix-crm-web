<!--HIT_EXECUTE

C_LONGINT(iCounter;jsonobject;result)
If (_HIT_AuthenticateSession ="Session-Authenticated-OK")
sdate:=Date(_HIT_WebApp_GetField ("s_date"))
eDate:=Date(_HIT_WebApp_GetField ("e_date"))

eeDate:=Add to date(eDate;0;0;1)
QUERY([Payments];[Payments]date_received>=sdate;*)
QUERY([Payments]; & ;[Payments]date_received<=eDate)

result:=JSON New Array 
For (iCounter;1;Records in selection([Payments]))
jsonobject:=JSON New Object 
JSON Set Number (jsonobject;"inv_num";[Payments]invoice_number)

JSON Set Text (jsonobject;"Start_date";String([Payments]date_received))
JSON Set Text (jsonobject;"uuid";[Payments]uuid)

QUERY([Companies];[Companies]account_Number=[Payments]client_accountnumber)
payMentDetails:=[Companies]company_Name+"("+string([Payments]invoice_number)+"): "+char(Carriage return)+"Amount Received:"+String([Payments]amount_received)+char(Carriage return)+"Mode:"+[Payments]mode_of_payment
JSON Set Text (jsonobject;"Payment_details";payMentDetails)
JSON Set Number (jsonobject;"amount";[Payments]amount_received)
JSON Set Object (result;"";jsonobject)
NEXT RECORD([Payments])
End for 

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