var mode='year', nav='prev';
			var diff=1, loop=30;
			var one_day=1000*60*60*24;
			var start_date=new Date();
			var end_date=new Date();
			end_date.setTime(start_date.getTime()+(one_day));	
			var curr_date=new Date(String(end_date.getMonth()+1)+'/'+String(end_date.getDate())+'/'+String(end_date.getFullYear()));
			
			
			function getMonthName(m) {
		if(m==1){ monthName= "Jan";}
		else if(m==2){ monthName= "Feb";}
		else if(m==3){ monthName= "Mar"; }
		else if(m==4){ monthName= "Apr"; }
		else if(m==5){ monthName= "May"; }
		else if(m==6){ monthName= "June"; }
		else if(m==7){ monthName= "July"; }
		else if(m==8){ monthName= "Aug"; }
		else if(m==9){ monthName= "Sep"; }
		else if(m==10){ monthName= "Oct"; }
		else if(m==11){ monthName= "Nov"; }
		else if(m==12){ monthName= "Dec"; }
		else{ monthName= "Null"; }
		return monthName;
     }
			
			function date_to_str(date){
				var day=date.getDate();
				var month=date.getMonth()+1;
				var year=date.getFullYear();
				return String(month)+'/'+String(day)+'/'+String(year);
			}
			
			
			function set_defaults() {
				nav='prev';
				start_date=new Date();
				end_date=new Date();
				end_date.setTime(start_date.getTime()+(one_day));
				diff=1;
				loop=30;
				$('#next').addClass('active');
				$('#next').attr('disabled', true);	
				$('#div_emp').show();		
			}
			
			function draw_year_chart(){

				if(nav=='prev') {
					var day=end_date.getDate();
					var month=end_date.getMonth()+1;
					var year=end_date.getFullYear();
					var s_date=String(month)+'/'+String(day)+'/'+String(year-1);
					var e_date=String(month)+'/'+String(day)+'/'+String(year);
				}
				else if(nav=='next') {
					var day=start_date.getDate();
					var month=start_date.getMonth()+1;
					var year=start_date.getFullYear();
					var s_date=String(month)+'/'+String(day)+'/'+String(year);
					var e_date=String(month)+'/'+String(day)+'/'+String(year+1);
				}
				mode='year';
				diff=1;
				loop=12;
				end_date=new Date(e_date);
				start_date=new Date(s_date);
				get_data(date_to_str(start_date),date_to_str(end_date));
				
				$('#yearly').addClass('active');
				$('#monthly').removeClass('active');
				$('#weekly').removeClass('active');
				$('#daily').removeClass('active');
				$('#yearly').attr('disabled', true);
				$('#monthly').attr('disabled', false);
				$('#weekly').attr('disabled', false);
				$('#daily').attr('disabled', false);
				title= String(start_date.getDate())+' '+getMonthName(start_date.getMonth()+1)+' '+String(start_date.getFullYear())+' - '+String(end_date.getDate())+' '+getMonthName(end_date.getMonth()+1)+' '+String(end_date.getFullYear());
				
			}
			
			function draw_month_chart(){
				if(nav=='prev') {
					var day=end_date.getDate();
					var month=end_date.getMonth()+1;
					var year=end_date.getFullYear();
					var last_month=month-1;
					var last_year=year;
					if(last_month==0){
						last_month=12;
						last_year=year-1;
					}
					var s_date=String(last_month)+'/'+String(day)+'/'+String(last_year);
					var e_date=String(month)+'/'+String(day)+'/'+String(year);
				}
				else if(nav=='next') {
					var day=start_date.getDate();
					var month=start_date.getMonth()+1;
					var year=start_date.getFullYear();
					var next_month=month+1;
					var next_year=year;
					if(next_month==13){
						next_month=1;
						next_year=year+1;
					}
					var s_date=String(month)+'/'+String(day)+'/'+String(year);
					var e_date=String(next_month)+'/'+String(day)+'/'+String(next_year);
				}
				
				
				mode='month';
				diff=1;
				end_date=new Date(e_date);
				start_date=new Date(s_date);
				
				var utc1 = Date.UTC(start_date.getFullYear(), start_date.getMonth(), start_date.getDate());
  				var utc2 = Date.UTC(end_date.getFullYear(), end_date.getMonth(), end_date.getDate());
  				loop= Math.floor((utc2 - utc1) / one_day);
				get_data(date_to_str(start_date),date_to_str(end_date));
				
				$('#yearly').removeClass('active');
				$('#monthly').addClass('active');
				$('#weekly').removeClass('active');
				$('#daily').removeClass('active');
				$('#yearly').attr('disabled', false);
				$('#monthly').attr('disabled', true);
				$('#weekly').attr('disabled', false);
				$('#daily').attr('disabled', false);
				title= String(start_date.getDate())+' '+getMonthName(start_date.getMonth()+1)+' '+String(start_date.getFullYear())+' - '+String(end_date.getDate())+' '+getMonthName(end_date.getMonth()+1)+' '+String(end_date.getFullYear());
				
			}
			
			function draw_week_chart(){
				
				if(nav=='prev') {
					var day=end_date.getDate();
					var month=end_date.getMonth()+1;
					var year=end_date.getFullYear();
					var week_start=new Date();
					week_start.setTime(end_date.getTime()-(7*one_day));										
					var s_date = String(week_start.getMonth()+1)+'/'+week_start.getDate()+'/'+week_start.getFullYear();
					var e_date=String(month)+'/'+String(day)+'/'+String(year);
				}
				else if(nav=='next') {
					var day=start_date.getDate();
					var month=start_date.getMonth()+1;
					var year=start_date.getFullYear();
					var week_end=new Date();
					week_end.setTime(end_date.getTime()+(7*one_day));										
					var s_date = String(month)+'/'+String(day)+'/'+String(year);
					var e_date=String(week_end.getMonth()+1)+'/'+week_end.getDate()+'/'+week_end.getFullYear();
				}
				
				mode='week';
				diff=1;
				loop=7;
				end_date=new Date(e_date);
				start_date=new Date(s_date);
				get_data(date_to_str(start_date),date_to_str(end_date));
				
				$('#yearly').removeClass('active');
				$('#monthly').removeClass('active');
				$('#weekly').addClass('active');
				$('#daily').removeClass('active');
				$('#yearly').attr('disabled', false);
				$('#monthly').attr('disabled', false);
				$('#weekly').attr('disabled', true);
				$('#daily').attr('disabled', false);
				title= String(start_date.getDate())+' '+getMonthName(start_date.getMonth()+1)+' '+String(start_date.getFullYear())+' - '+String(end_date.getDate())+' '+getMonthName(end_date.getMonth()+1)+' '+String(end_date.getFullYear());
				
			}
			
			function draw_day_chart(){
				
				if(nav=='prev') {
					var day=end_date.getDate();
					var month=end_date.getMonth()+1;
					var year=end_date.getFullYear();
					var day_start=new Date();
					day_start.setTime(end_date.getTime()-(one_day));										
					var s_date = String(day_start.getMonth()+1)+'/'+day_start.getDate()+'/'+day_start.getFullYear();
					var e_date=String(month)+'/'+String(day)+'/'+String(year);
				}
				else if(nav=='next') {
					var day=start_date.getDate();
					var month=start_date.getMonth()+1;
					var year=start_date.getFullYear();
					var day_end=new Date();
					day_end.setTime(end_date.getTime()+(one_day));										
					var s_date = String(month)+'/'+String(day)+'/'+String(year);
					var e_date=String(day_end.getMonth()+1)+'/'+day_end.getDate()+'/'+day_end.getFullYear();
				}
				
				mode='day';
				diff=1;
				
				end_date=new Date(e_date);
				start_date=new Date(s_date);
				get_day_data(date_to_str(start_date),date_to_str(end_date));
				
				
				$('#yearly').removeClass('active');
				$('#monthly').removeClass('active');
				$('#weekly').removeClass('active');
				$('#daily').addClass('active');
				$('#yearly').attr('disabled', false);
				$('#monthly').attr('disabled', false);
				$('#weekly').attr('disabled', false);
				$('#daily').attr('disabled', true);
				title= String(start_date.getDate())+' '+getMonthName(start_date.getMonth()+1)+' '+String(start_date.getFullYear());
				
			}
			
			
			function draw_prev_chart(){
				nav='prev';
				end_date.setTime(start_date.getTime());
				if(mode=='year'){
					draw_year_chart();
				}
				if(mode=='month'){
					draw_month_chart();
				}
				if(mode=='week'){
					draw_week_chart();
				}
				if(mode=='day'){
					draw_day_chart();
				}
				$('#next').removeClass('active');
				$('#next').attr('disabled', false);
			}
			function draw_next_chart(){
				nav='next';
				start_date.setTime(end_date.getTime());
				if(mode=='year'){
					draw_year_chart();
				}
				if(mode=='month'){
					draw_month_chart();
				}
				if(mode=='week'){
					draw_week_chart();
				}
				if(mode=='day'){
					draw_day_chart();
				}
				if(end_date>=curr_date) {
					$('#next').removeClass('active');
					$('#next').addClass('active');
					$('#next').attr('disabled', true);
				}
			}