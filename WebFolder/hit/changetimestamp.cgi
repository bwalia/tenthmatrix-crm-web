<!--HIT_EXECUTE

C_LONGINT(StartTime;EndTime;SetTime)
ALL RECORDS([Tasks])

READ WRITE([Tasks])
For (count;1;Records in table([Tasks]))

StartTime:=[Tasks]Timestamp_start
EndTime:=[Tasks]Timestamp_end
If (StartTime=1357948800)
SetTime:=1385856000
[Tasks]Timestamp_start:=SetTime
End if 
If (EndTIme=1357948800)
SetTime:=1385856000
[Tasks]Timestamp_end:=SetTime
End if 
SAVE RECORD([Tasks])
NEXT RECORD([Tasks])
End for 
UNLOAD RECORD([Tasks])
_HIT_HTTPD_RedirectToURL ("task.shtml")
-->                                                                                                                     