/*
* dtmFRM v 1.0.0 
* MIT 
* (c) 2014 Mina Gabriel 

+--------+--------------------------------------------+
| d      | day of month 1 through 31.  				       
+--------+--------------------------------------------+
| dd     | day of month 01 through 31. 				        
+--------+--------------------------------------------+
| ddd    | abbreviated name of the day of the week.   
+--------+--------------------------------------------+
| dddd   | name of the day of the week.				        
+--------+--------------------------------------------+
| h      | hours 1 through 12.       				          
+--------+--------------------------------------------+
| hh     | hours 01 through 12.						            
+--------+--------------------------------------------+
| H      | hours 0 through 24.                        
+--------+--------------------------------------------+
| HH     | hours 00 through 24                        
+--------+--------------------------------------------+
| m      | minute from 0 through 59 				  
+--------+--------------------------------------------+
| mm     | minutes 00 through 59.					  
+--------+--------------------------------------------+
| M      | Month 1 through 12.						  
+--------+--------------------------------------------+
| MM     | Month 01 through 12.                       
+--------+--------------------------------------------+
| MMM    | abbreviated name of the month.             
+--------+--------------------------------------------+
| MMMM   | full name of the month.                    
+--------+--------------------------------------------+
| s      | seconds 0 through 59.                      
+--------+--------------------------------------------+
| ss     | seconds 00 through 59.                     
+--------+--------------------------------------------+
| ampm   | AM PM .									  
+--------+--------------------------------------------+
| y      | year last digit. 						  
+--------+--------------------------------------------+
| yy     | year last 2 digits. 						  
+--------+--------------------------------------------+
| yyyy   | year.									  
+--------+--------------------------------------------+

*/

var dtmFRM = function() {
  var Global_object = {},
    day_abbreviated = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    month_abbreviated = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

    format_Specifier = {
      unix: function() {
        return new Date(this.date);
      },
      d: function() {
        return this.unix().getDate();
      },
      dd: function() {
        return (this.unix().getDate() < 10 ? '0' : '') + (this.unix().getDate());
      },
      ddd: function() {
        return day_abbreviated[this.unix().getDay()];
      },
      dddd: function() {
        return day[this.unix().getDay()];
      },
      h: function() {
        return ((this.unix().getHours() + 11) % 12 + 1);
      },
      hh: function() {
        return (((this.unix().getHours() + 11) % 12 + 1) < 10 ? "0" : "") + ((this.unix().getHours() + 11) % 12 + 1);
      },
      H: function() {
        return this.unix().getHours();
      },
      HH: function() {
        return (this.unix().getHours() < 10 ? "0" : "") + this.unix().getHours();
      },
      m: function() {
        return this.unix().getMinutes();
      },
      mm: function() {
        return (this.unix().getMinutes() < 10 ? "0" : "") + this.unix().getMinutes();
      },
      M: function() {
        return this.unix().getMonth() + 1;
      },
      MM: function() {
        return (this.unix().getMonth() + 1 < 10 ? "0" : '') + (this.unix().getMonth() + 1);
      },
      MMM: function() {
        return month_abbreviated[this.unix().getMonth()];
      },
      MMMM: function() {
        return month[this.unix().getMonth()];
      },
      s: function() {
        return this.unix().getSeconds();
      },
      ss: function() {
        return (this.unix().getSeconds() < 10 ? "0" : "") + this.unix().getSeconds();
      },
      ampm: function() {
        return this.unix().getHours() >= 12 ? "PM" : "AM";
      },
      y: function() {
        return String(this.unix().getFullYear()).substr(3);
      },
      yy: function() {
        return String(this.unix().getFullYear()).substr(2);
      },
      yyyy: function() {
        return this.unix().getFullYear();
      }

    };

  this.ToString = function(datetime, format) {
    if (!isNaN(new Date(datetime).getTime())) {

      format_Specifier.date = datetime;
      var _FRM = format.replace(/(\b)dddd(\b)/g, format_Specifier.dddd())
        .replace(/(\b)ddd(\b)/g, format_Specifier.ddd())
        .replace(/(\b)dd(\b)/g, format_Specifier.dd())
        .replace(/(\b)d(\b)/g, format_Specifier.d())
        .replace(/(\b)hh(\b)/g, format_Specifier.hh())
        .replace(/(\b)HH(\b)/g, format_Specifier.HH())
        .replace(/(\b)h(\b)/g, format_Specifier.h())
        .replace(/(\b)MMMM(\b)/g, format_Specifier.MMMM())
        .replace(/(\b)MMM(\b)/g, format_Specifier.MMM())
        .replace(/(\b)MM(\b)/g, format_Specifier.MM())
        .replace(/(\b)mm(\b)/g, format_Specifier.mm())
        .replace(/(\b)m(\b)/g, format_Specifier.m())
        .replace(/(\b)M(\b)/g, format_Specifier.M())
        .replace(/(\b)ss(\b)/g, format_Specifier.ss())
        .replace(/(\b)ampm(\b)/g, format_Specifier.ampm())
        .replace(/(\b)s(\b)/g, format_Specifier.s())
        .replace(/(\b)yyyy(\b)/g, format_Specifier.yyyy())
        .replace(/(\b)yy(\b)/g, format_Specifier.yy())
        .replace(/(\b)y(\b)/g, format_Specifier.y());

      return _FRM;
    }
    return 'Not a valid date time or format';
  };
};