<!--HIT_EXECUTE

C_TEXT($0;$1;vSearch)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)
C_LONGINT(totalRecords)

ARRAY STRING(255;GroupsUUIDArrStr;0)
ARRAY STRING(255;GroupsNameArrStr;0)
ARRAY BOOLEAN(GroupsStatusArrStr;0)

READ WRITE([Groups])


start:=Num(_HIT_WebApp_GetField ("start"))
end:=Num(_HIT_WebApp_GetField ("end"))

vSearch:=_HIT_WebApp_GetField ("keyword")

Case of 
: (vSearch#"")
QUERY([Groups];[Groups]group_name="@"+vSearch+"@")
Else 
ALL RECORDS([Groups])
End case 

totalRecords:=Records in selection([Groups])
ORDER BY([Groups];[Groups]group_name;<)
Case of 
: (end<=totalRecords)
SELECTION RANGE TO ARRAY(start;end;[Groups]uuid;GroupsUUIDArrStr;[Groups]group_name;GroupsNameArrStr;[Groups]enabled;GroupsStatusArrStr)
: (start>totalRecords)
: (end>totalRecords)
end:=totalRecords
SELECTION RANGE TO ARRAY(start;end;[Groups]uuid;GroupsUUIDArrStr;[Groups]group_name;GroupsNameArrStr;[Groups]enabled;GroupsStatusArrStr)
End case 

REDUCE SELECTION([Groups];0)

If (totalRecords#0)
If (start>totalRecords)
Else 

mObjectResult:=JSON New Object 
JSON Set 4D Array (mObjectResult;"uuid";GroupsUUIDArrStr)
JSON Set 4D Array (mObjectResult;"name";GroupsNameArrStr)
JSON Set 4D Array (mObjectResult;"status";GroupsStatusArrStr)
End if 
End if 


If (JSON Is Valid Object (mObjectResult)=1)
Else 

mObjectResult:=JSON New Object 
JSON Set Text (mObjectResult;"Alert";"No Records found.")
End if 

Web_ResponseDataBLOB:=JSON Save As Blob (mObjectResult)
JSON Release (mObjectResult)

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->