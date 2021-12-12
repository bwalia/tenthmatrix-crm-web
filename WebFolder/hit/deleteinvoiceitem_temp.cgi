<!--HIT_EXECUTE
READ WRITE([Invoice_Items])
QUERY([Invoices];[Invoices]uuid="BEFD2593-966D-48ED-968E-F7121BFA4202")

QUERY([Invoice_Items];[Invoice_Items]inv_id=[Invoices]inv_id)

DELETE SELECTION([Invoice_Items])
READ ONLY([Invoice_Items])

C_LONGINT(mOBJECTResult)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)

mOBJECTResult:=JSON New Object 
If (Records in selection([Invoice_Items])=0)
JSON Set Text (mOBJECTResult;"Sucess";"Related Invoice Item has been deleted.")
Else 
JSON Set Text (mOBJECTResult;"Error";"Error in saving records.")
End if 

Web_ResponseDataBLOB:=JSON Save As Blob (mOBJECTResult)
JSON Release (mOBJECTResult)
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->