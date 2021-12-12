<!--HIT_EXECUTE

C_TEXT($0;$1;vSearchStr)
C_BLOB(Web_ResponseDataBLOB)
SET BLOB SIZE(Web_ResponseDataBLOB;0)
C_LONGINT(totalRecords)

ARRAY STRING(255;WebContentUUIDArrStr;0)
ARRAY STRING(255;WebContentNameArrStr;0)
ARRAY STRING(255;WebContentTypeArrStr;0)
ARRAY LONGINT(WebContentIDArrlong;0)
ARRAY LONGINT(WebContentLastModArrlong;0)
ARRAY BOOLEAN(WebContentActiveArrBool;0)


READ WRITE([web_content])
If (_HIT_AuthenticateSession ="Session-Authenticated-OK")

vSearch:=_HIT_WebApp_GetField ("keyword")
start:=Num(_HIT_WebApp_GetField ("start"))
end:=Num(_HIT_WebApp_GetField ("end"))
Case of 
: (vSearch#"")

Case of 
: (isTextNumber (vSearch))
nNum:=Num(vSearch)

QUERY([web_content];[web_content]ID=nNum)

Else 

QUERY([web_content];[web_content]title="@"+vSearch+"@";*)  //QUERY BY FORMULA([Image];String([Image])=()))
QUERY([web_content]; | ;[web_content]code="@"+vSearch+"@";*)
QUERY([web_content]; | ;[web_content]meta_tag_keywords="@"+vSearch+"@";*)
QUERY([web_content]; | ;[web_content]meta_tag_description="@"+vSearch+"@";*)
QUERY([web_content]; | ;[web_content]body="@"+vSearch+"@")
CREATE SET([web_content];"$SetA")
USE SET("$SetA")
End case 

Else 
ALL RECORDS([web_content])
End case 

tabSrch:=_HIT_WebApp_GetField ("tab")
Case of 
: (tabSrch#"")
QUERY SELECTION([web_content];[web_content]type=tabSrch)
Else 
End case 

totalRecords:=Records in selection([web_content])
ORDER BY([web_content];[web_content]ID;<)
Case of 
: (end<=totalRecords)
SELECTION RANGE TO ARRAY(start;end;[web_content]uuid;WebContentUUIDArrStr;[web_content]ID;WebContentIDArrlong;[web_content]title;WebContentNameArrStr;[web_content]status;WebContentActiveArrBool;[web_content]type;WebContentTypeArrStr;[web_content]modified_timestamp;WebContentLastModArrlong)
: (start>totalRecords)
: (end>totalRecords)
end:=totalRecords
SELECTION RANGE TO ARRAY(start;end;[web_content]uuid;WebContentUUIDArrStr;[web_content]ID;WebContentIDArrlong;[web_content]title;WebContentNameArrStr;[web_content]status;WebContentActiveArrBool;[web_content]type;WebContentTypeArrStr;[web_content]modified_timestamp;WebContentLastModArrlong)
End case 

REDUCE SELECTION([web_content];0)

If (totalRecords#0)

If (start>totalRecords)
Else 

mObjectResult:=JSON New Object 
JSON Set 4D Array (mObjectResult;"uuid";WebContentUUIDArrStr)
JSON Set 4D Array (mObjectResult;"ID";WebContentIDArrlong)
JSON Set 4D Array (mObjectResult;"heading";WebContentNameArrStr)
JSON Set 4D Array (mObjectResult;"active";WebContentActiveArrBool)
JSON Set 4D Array (mObjectResult;"type";WebContentTypeArrStr)
JSON Set 4D Array (mObjectResult;"last_modified";WebContentLastModArrlong)
End if 

End if 

End if 

If (JSON Is Valid Object (mObjectResult)=1)
Else 
mJSONResult:=JSON New Array 
mObjectResult:=JSON New Object 
JSON Set Text (mObjectResult;"Alert";"No Records found.")
JSON Set Object (mJSONResult;"";mObjectResult)
End if 

Web_ResponseDataBLOB:=JSON Save As Blob (mObjectResult)
JSON Release (mObjectResult)

_HIT_HTTPD_SetHTTPHeader ("Content-Type";"application/json")
_HIT_HTTPD_AppendResponse (->Web_ResponseDataBLOB)

-->