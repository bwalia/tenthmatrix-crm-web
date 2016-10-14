<!--HIT_EXECUTE
 
READ WRITE([Projects])
ALL RECORDS([Projects])

For (Count;1;Records in selection([Projects]))

If ([Projects]proj_active)

[Projects]proj_active:=False
SAVE RECORD([Projects])
End if 

NEXT RECORD([Projects])

End for 
REDUCE SELECTION([Projects])
READ ONLY([Projects])

-->