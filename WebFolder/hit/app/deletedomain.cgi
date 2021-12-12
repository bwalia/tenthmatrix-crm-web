<!--HIT_EXECUTE

C_TEXT(pDomainUUIDsTxt)
C_LONGINT(mObjectResult)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)
ARRAY TEXT(pDomainUUIDArrStr;0)

pDomainUUIDsTxt:=_HIT_WebApp_GetField ("domain_uuids")
API Text To Array (pDomainUUIDsTxt;",";pDomainUUIDArrStr)
READ WRITE([domains])

If (Size of array(pDomainUUIDArrStr)>0)
QUERY WITH ARRAY([domains]uuid;pDomainUUIDArrStr)
If (Records in selection([domains])>0)
DELETE SELECTION([domains])
If (Records in selection([domains])=0)
mObjectResult:=JSON New Object 
JSON Set Text (mObjectResult;"Success";"Deletion Successfull.")
End if 
End if 
End if 

READ ONLY([domains])

If (JSON Is Valid Object (mObjectResult)=1)
Else 
mObjectResult:=JSON New Object 
JSON Set Text (mObjectResult;"error";"Sorry, Record not deleted !!")
End if 

Web_ResponseDataBLOB:=JSON Save As Blob (mObjectResult)
JSON Release (mObjectResult)

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)
-->