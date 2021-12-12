<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
//_HIT_HTMLTXT:=_HIT_AuthenticateSession 

//If (_HIT_HTMLTXT="Session-Authenticated-OK")
C_TEXT(mUUIDStr)
mUUIDStr:=_HIT_WebApp_GetField ("mileage_uuid")
READ WRITE([Mileage])
QUERY([Mileage];[Mileage]uuid=mUUIDStr)

If (Records in selection([Mileage])=0)
CREATE RECORD([Mileage])
[Mileage]uuid:=mUUIDStr
End if

[Mileage]Client_Invoice_Number:=Num(_HIT_WebApp_GetField ("inv_no"))
[Mileage]uuid_client:=_HIT_WebApp_GetField ("client_id")
[Mileage]Vehicle_Start_Reading:=Num(_HIT_WebApp_GetField ("start_mile"))
[Mileage]Vehicle_End_Reading:=Num(_HIT_WebApp_GetField ("end_mile"))
[Mileage]Total_Distance_Travelled:=Num(_HIT_WebApp_GetField ("distance"))
[Mileage]PricePerMileKm:=Num(_HIT_WebApp_GetField ("price_per"))
[Mileage]Travel_Start_Timestamp:=timestamp_unix_Get( Date(_HIT_WebApp_GetField ("start_date")))
[Mileage]Travel_End_Timestamp:=timestamp_unix_Get( Date(_HIT_WebApp_GetField ("end_date")))
[Mileage]Start_PostZipCode:=_HIT_WebApp_GetField ("start_zip")
[Mileage]End_PostZipCode:=_HIT_WebApp_GetField ("end_zip")
[Mileage]Tax_Total_Amount:=Num(_HIT_WebApp_GetField ("tax_amount"))
[Mileage]Project_Code:=_HIT_WebApp_GetField ("project_code")
[Mileage]Total_Amount:=Num(_HIT_WebApp_GetField ("total_amount"))
[Mileage]Job_Description:=_HIT_WebApp_GetField ("job_desc")
[Mileage]Sfaff_Notes:=_HIT_WebApp_GetField ("notes")
[Mileage]Tax_Rate:=Num(_HIT_WebApp_GetField ("tax_rate"))
[Mileage]currency_code:=_HIT_WebApp_GetField ("currency_code")

If (_HIT_WebApp_GetField ("expenses_claimed")="True")
[Mileage]Expense_Claimed_by_Employee:=True
Else
[Mileage]Expense_Claimed_by_Employee:=False
End if
If (_HIT_WebApp_GetField ("veh_hired")="True")
[Mileage]Vechicle_Hired:=True
Else
[Mileage]Vechicle_Hired:=False
End if
If (_HIT_WebApp_GetField ("stay_charged")="True")
[Mileage]Accomodation_Charged:=True
Else
[Mileage]Accomodation_Charged:=False
End if


SAVE RECORD([Mileage])
UNLOAD RECORD([Mileage])
READ ONLY([Mileage])
ORDER BY([Mileage];[Mileage]proj_name;>)
_HIT_HTMLTXT:=_HIT_HTMLTXT+", Authenticated "+_HIT_HTMLTXT+", "
_HIT_HTTPD_RedirectToURL ("travel_expenses.shtml?"+"keyword="+_HIT_WebApp_GetField ("project_code"))
//Else
//_HIT_HTMLTXT:=_HIT_HTMLTXT+", NOT Authenticated, "+_HIT_HTMLTXT+", "
//_HIT_HTTPD_RedirectToURL ("sign-in.shtml")

//End if

-->