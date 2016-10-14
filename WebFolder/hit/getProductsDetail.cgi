<!--HIT_EXECUTE
C_LONGINT(;JsonObject)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)

QUERY([Products];[Products]uuid=_HIT_WebApp_GetField ("id"))
//QUERY([Products];[Products]ProductID=Num(_HIT_WebApp_GetField ("id")))

JsonObject:=JSON New Object 
JSON Set Number (JsonObject;"id";[Products]ProductID)
JSON Set Text (JsonObject;"uuid";[Products]uuid)
JSON Set Text (JsonObject;"name";[Products]ProductName)
JSON Set Number (JsonObject;"Unit_Price";[Products]Unit_Price)
 
Web_ResponseDataBLOB:=JSON Save As Blob (JsonObject)

If (JSON Is Valid Object (JsonObject)=1)
JSON Release (JsonObject)
End if 
_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)
-->