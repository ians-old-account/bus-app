var buses = [   "awapuni",
                "rugby",
                "highbury",
                "takaro",
                "cloverlea",
                "milson",
                "rhodes",
                "roslyn",
                "rangiora",
                "brightwater",
                "fernlea",
                "heights" ]
var colours = [ "#f69238",
                "#009e57",
                "#00aeef",
                "#ee1b2d",
                "#873c96",
                "#ef59a1",
                "#0153a0",
                "#c6870e",
                "#005040",
                "#fbb555",
                "#008b98",
                "#f0563b" ]

/*===========================
            CLASS
============================*/
class Bus {
    //the different properties that Bus objects should have
    constructor (name, stops, colour, monFriTimes, friTimes, satTimes, sunTimes) {
        this.name = name;
        this.stops = stops;
        this.colour = colour;
        this.monFriTimes = monFriTimes;
        this.satTimes = satTimes;
        this.sunTimes = sunTimes;
        this.nameDOM = document.getElementById("name");
        this.stopsDOM = document.getElementById("stops");
        this.timesDOM = document.getElementById("times");
        this.nextDOM = document.getElementById("next");
        this.etaDOM = document.getElementById("eta");
        this.next = 0;
				//this.etaTimer = setInterval(this.updateEta, 1000);
				this.countdown = '';
    }

    //this function loops over the {route}Stops array and enters each stop name into an <li onclick="showTimes()"> tag, ready to be inserted in the DOM.
    getStops() {
        var stops = '<h3>';
        for (var i = 0; i < this.stops.length; i++) {
            //onclick="awapuni.showTimes('awapuni', 1)
            stops += "<li class='busStop' onclick='eval(this.parentNode.parentNode.previousElementSibling.id).showTimes(eval(this.parentNode.parentNode.previousElementSibling).id,"+i+")'>"+this.stops[i]+"</li>"
        }
        stops += '</h3>'
        return stops

    }

    showTimes(route,index) {
        console.log(route,index)
        this.nameDOM.innerHTML = this.stops[index];
        this.stopsDOM.innerHTML = "On the " + this.name.toUpperCase() + " route";
        this.timesDOM.innerHTML = this.formatTimes(index);
        this.nextDOM.innerHTML = this.findClosest(index);
				//this.etaDOM.innerHTML = this.updateEta();
				this.createInterval(this.updateEta,this.next,1000)
		}

    //this function loops the times array and returns the times formatted into a table
    formatTimes(index) {
        //var times = '<table><tr>';
        var times = '';
        for (var i = 0; i < this.monFriTimes.length; i++) {                                     //loop all the times
            //times += '<td class="timesRow">' + this.monFriTimes[i][index].toFixed(2) + '</td>'
            times += '<li class="timesRow">' + this.monFriTimes[i][index].toFixed(2) + '</li>'  //insert the times that match the index into an <li> tag
        }
        //times += '</tr></table>'
        return times                                                                            //return the times, to be put into the DOM
    }

    // credit: https://stackoverflow.com/questions/18229022/how-to-show-current-time-in-javascript-in-the-format-hhmmss
    getTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        m = this.checkTime(m);
        var time = h + '.' + m;
        return time;
    }

    //this function takes the minutes and puts a 0 (zero) in front if less than 10. E.g. takes 7 mins and turns to 07 mins
    checkTime(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    //this function will take the current time (from getTime()) and find the next closest bus stop time.
    //https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
    findClosest(index) {
        var now = this.getTime();
        for (var i = 0; i < this.monFriTimes.length; i++) {
            //if the array time is < now, then nothing will happen, the loop will just increment. Once now is < an array time, we return it out, because it will be the next available time. if there is nothing to return then there are no more times, thus 'no more buses today'
            if (now < this.monFriTimes[i][index]) {
                this.next = this.monFriTimes[i][index].toFixed(2);
                console.log("next bus is at: " + this.next)
                return this.next;
            }
        }
        return "Sorry, No More Buses Today"
    }

    //this function updates the next buses ETA (estimated time of arrival). calculated by minusing the next avaible bus - the current time
    updateEta(x) {
        //get time now and put as a string, so to split to get the hour and min separately. e.g. 12.50 now is '12' & '50'
        //var nextAsString = this.next.toString();
        var nextAsString = x.toString();
        var nextSplit = nextAsString.split('.');
        var nextHour = Number(nextSplit[0]);
        var nextMin = Number(nextSplit[1]);
        // get time now
        var now = new Date();
        // get time for next busStop
        var later = new Date(now.getFullYear(),now.getMonth(),now.getDate(),nextHour,nextMin);
        //cover times to milliseconds
        now = now.getTime();
        later = later.getTime();
        //calculate differences
        var etaMillis = later - now;
        //convert to other time measurements
			  //https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
        //var etaSecs = etaMilliSecs/1000;
        //var etaMins = (etaSecs/60).toFixed(2);
        //var etaHours = etaMins/60;
        var etaMins = Math.floor(etaMillis / 60000);
  			var etaSecs = ((etaMillis % 60000) / 1000).toFixed(0);
        var content = etaMins + ' mins ' + etaSecs + ' secs '
				console.log(content)
        document.getElementById("eta").innerHTML = content;
    }

		//https://stackoverflow.com/questions/457826/pass-parameters-in-setinterval-function
		createInterval(f,dynamicParameter,interval) {

			//clear all Intervals: https://stackoverflow.com/questions/958433/how-can-i-clearinterval-for-all-setinterval
            for (var i = 1; i < 99999; i++) {
                window.clearInterval(i);
            }

            //set interval
			this.countdown = setInterval(function() {
				f(dynamicParameter);
			}, interval);

		}

	//this.createInterval(this.updateEta,this.next,1000)


}//END Bus Class



/*===========================
      CREATE BUS OBJECTS
============================*/
var awapuni = new Bus ("Awapuni",awapuniStops,colours[0],awapuniTimesMonFri,awapuniTimesFri,awapuniTimesSat,awapuniTimesSun);
var rugby = new Bus ("Rugby",rugbyStops,colours[1],rugbyTimesMonFri,rugbyTimesFri,rugbyTimesSat,rugbyTimesSun)
var highbury = new Bus ("Highbury",highburyStops,colours[2],highburyTimesMonFri,highburyTimesFri,highburyTimesSat,highburyTimesSun)
var takaro = new Bus ("Takaro",takaroStops,colours[3],takaroTimesMonFri,takaroTimesFri,takaroTimesSat,takaroTimesSun)
var cloverlea = new Bus ("Cloverlea",cloverleaStops,colours[4],cloverleaTimesMonFri,cloverleaTimesFri,cloverleaTimesSat,cloverleaTimesSun)
var milson = new Bus ("Milson",milsonStops,colours[5],milsonTimesMonFri,milsonTimesFri,milsonTimesSat,milsonTimesSun)
var rhodes = new Bus ("Rhodes",rhodesStops,colours[6],rhodesTimesMonFri,rhodesTimesFri,rhodesTimesSat,rhodesTimesSun)
var roslyn = new Bus ("Roslyn",roslynStops,colours[7],roslynTimesMonFri,roslynTimesFri,roslynTimesSat,roslynTimesSun)
var rangiora = new Bus ("Rangiora",rangioraStops,colours[8],rangioraTimesMonFri,rangioraTimesFri,rangioraTimesSat,rangioraTimesSun)
var brightwater = new Bus ("Brightwater",brightwaterStops,colours[9],brightwaterTimesMonFri,brightwaterTimesFri,brightwaterTimesSat,brightwaterTimesSun)
var fernlea = new Bus ("Fernlea",fernleaStops,colours[10],fernleaTimesMonFri,fernleaTimesFri,fernleaTimesSat,fernleaTimesSun)
var heights = new Bus ("Heights",heightsStops,colours[11],heightsTimesMonFri,heightsTimesFri,heightsTimesSat,heightsTimesSun)
// trying to create objects with a loop in an attempt to DRY up the above (but doesn't work)
/*
for (var i = 0; i < buses.length; i++ ) {
    //this replaces the array value; instead of using its value as the variables name
    buses[i] = new Bus  (buses[i],eval(buses[i]+"Stops"),colours[i],eval(buses[i]+"TimesMonFri"),eval(buses[i]+"TimesFri"),eval(buses[i]+"TimesSat"),eval(buses[i]+"TimesSun"))
}*/




/*===========================
            JQUERY
============================*/
$(document).ready(function(){

    //SHOW BUS STOPS IN MENU, WHEN ROUTE CLICKED
    $(".stopsMenu").hide();
    $("main").hide();

    $(".bus h2").click(function(){
//        console.log(this.id)
        $("#"+this.id+"Stops").html( eval(this.id).getStops() );
        $("#"+this.id+"Stops").slideToggle();
    });


    //SHOW BUS INFORMATION, WHEN STOP CLICKED
    $(".stopsMenu").on("click", function(){
        $("main").fadeIn(1000);
//        $("main").fadeOut(300, function(){
//            $(this).fadeIn(300)
//        })
    });

});
