<!--HIT_EXECUTE
C_LONGINT(mResultNum;count;JsonObject;JsonObjectPayment;JsonObjectcontact;JsonObjectProject;JsonObjectInvoice)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)

//mResultNum:=JSON New Array 
Search:=_HIT_WebApp_GetField ("uuid")

JsonObject:=JSON New Object 

QUERY([Companies];[Companies]uuid=Search)
  //QUERY([Companies];[Companies]account_Number=44)
If (Records in selection([Companies])=1)

JSON Set Text (JsonObject;"uuid";[Companies]uuid)
JSON Set Number (JsonObject;"account_Number";[Companies]account_Number)
JSON Set Text (JsonObject;"company_Name";[Companies]company_Name)
JSON Set Text (JsonObject;"address_line_1";[Companies]address_line_1)
JSON Set Text (JsonObject;"address_line_2";[Companies]address_line_2)
JSON Set Text (JsonObject;"city_or_town";[Companies]city_or_town)
JSON Set Text (JsonObject;"county_or_state";[Companies]county_or_state)
JSON Set Text (JsonObject;"post_zip_code";[Companies]post_zip_code)
JSON Set Text (JsonObject;"telephone";[Companies]telephone)
JSON Set Text (JsonObject;"country";[Companies]country)
JSON Set Text (JsonObject;"referred_by";[Companies]referred_by)

RELATE MANY SELECTION([Contacts]client_id)
mContactResult:=JSON New Array
If (Records in selection([Contacts])#0)
For (count;1;Records in selection([Contacts]))
JsonObjectcontact:=JSON New Object 
JSON Set Number (JsonObjectcontact;"contact_client_id";[Contacts]client_id)
JSON Set Text (JsonObjectcontact;"contact_first_name";[Contacts]First name)
JSON Set Text (JsonObjectcontact;"contact_surname";[Contacts]Surname)
JSON Set Text (JsonObjectcontact;"contact_title";[Contacts]Title)
JSON Set Text (JsonObjectcontact;"contact_email";[Contacts]Email)
JSON Set Text (JsonObjectcontact;"contact_uuid";[Contacts]uuid)
JSON Set Text (JsonObjectcontact;"contact_mobile";[Contacts]Mobile)

JSON Set Object (mContactResult;"";JsonObjectcontact)
NEXT RECORD([Contacts])
End for 
JSON Set Array (JsonObject;"Contacts";mContactResult)
//JSON Release (mResult)
End if 

//Projects
RELATE MANY SELECTION([Projects]client_id)
mProjectResult:=JSON New Array 

For (count;1;Records in selection([Projects]))
JsonObjectProject:=JSON New Object 
JSON Set Number (JsonObjectProject;"project_id";[Projects]proj_id)
JSON Set Text (JsonObjectProject;"project_name";[Projects]proj_name)
JSON Set Text (JsonObjectProject;"uuid";[Projects]uuid)

JSON Set Object (mProjectResult;"";JsonObjectProject)
NEXT RECORD([Projects])
End for 
JSON Set Array (JsonObject;"Projects";mProjectResult)
 
  //Invoices
RELATE MANY SELECTION([Invoices]client_id)
mInvoiceResult:=JSON New Array 

For (count;1;Records in selection([Invoices]))
JsonObjectInvoice:=JSON New Object 
JSON Set Number (JsonObjectInvoice;"inv_number";[Invoices]inv_number)
JSON Set Text (JsonObjectInvoice;"inv_status";[Invoices]invoice_status)
JSON Set Text (JsonObjectInvoice;"balance_due";[Invoices]balance_due)

JSON Set Object (mInvoiceResult;"";JsonObjectInvoice)
NEXT RECORD([Invoices])
End for 
JSON Set Array (JsonObject;"Invoices";mInvoiceResult)

  //Payments
RELATE MANY SELECTION([Payments]client_accountnumber)
mPayementResult:=JSON New Array 

For (count;1;Records in selection([Payments]))
JsonObjectPayment:=JSON New Object 
JSON Set Number (JsonObjectPayment;"payment_uuid";[Payments]uuid)
JSON Set Text (JsonObjectPayment;"amount_received";[Payments]amount_received)
JSON Set Text (JsonObjectPayment;"payment_received";[Payments]date_received)
JSON Set Text (JsonObjectPayment;"mode_of_payment";[Payments]mode_of_payment)

JSON Set Object (mPayementResult;"";JsonObjectInvoice)
NEXT RECORD([Payments])
End for 
JSON Set Array (JsonObject;"Payments";mPayementResult)


End if 

//JSON Set Object (mResultNum;"";JsonObject)
Web_ResponseDataBLOB:=JSON Save As Blob (JsonObject)

If (JSON Is Valid Object (JsonObject)=1)
JSON Release (JsonObject)
End if 

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)
-->