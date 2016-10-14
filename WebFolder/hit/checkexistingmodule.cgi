<!--HIT_EXECUTE

C_TEXT(_HIT_HTMLTXT)
C_TEXT(mNameStr)
mNameStr:=_HIT_WebApp_GetField ("name")

READ WRITE([Module])
QUERY([Module];[Module]name=mNameStr)
If (Records in selection([Module])>0)
	If([Module]group_name = mNameStr)
		_HIT_HTMLTXT:="false"
	Else
		_HIT_HTMLTXT:="true"
	End If
Else 
	_HIT_HTMLTXT:="true"
End if 
READ ONLY([Module])

-->