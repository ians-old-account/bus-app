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
        this.sunTimes = sunTimes
    }

    //getStops function that all Bus objects will get
    //this function loops over the 'route'Stops array and enters each stop name into an <li> tag, ready to be inserted in the DOM.
    getStops() {
        var stops = '<h3>';
        for (var i = 0; i < this.stops.length; i++) {
            //stops += "<li id="this.stops[i]">"+this.stops[i]+"</li>"
            stops += "<li class='busStop'>"+this.stops[i]+"</li>"
        }
        stops += '</h3>'
        return stops
    }

    //more functions for all objects go here

}

/*===========================
      CREATE BUS OBJECTS
============================*/

var awapuni = new Bus ("Awapuni",
                       awapuniStops,
                       colours[0],
                       awapuniTimesMonFri,
                       awapuniTimesFri,
                       awapuniTimesSat,
                       awapuniTimesSun);

var rugby = new Bus ("Rugby",
                    rugbyStops,
                    colours[1],
                    rugbyTimesMonFri,
                    rugbyTimesFri,
                    rugbyTimesSat,
                    rugbyTimesSun)

var highbury = new Bus ("Highbury",
                    highburyStops,
                    colours[2],
                    highburyTimesMonFri,
                    highburyTimesFri,
                    highburyTimesSat,
                    highburyTimesSun)

var takaro = new Bus ("Takaro",
                    takaroStops,
                    colours[3],
                    takaroTimesMonFri,
                    takaroTimesFri,
                    takaroTimesSat,
                    takaroTimesSun)

var cloverlea = new Bus ("Cloverlea",
                    cloverleaStops,
                    colours[4],
                    cloverleaTimesMonFri,
                    cloverleaTimesFri,
                    cloverleaTimesSat,
                    cloverleaTimesSun)

var milson = new Bus ("Milson",
                    milsonStops,
                    colours[5],
                    milsonTimesMonFri,
                    milsonTimesFri,
                    milsonTimesSat,
                    milsonTimesSun)

var rhodes = new Bus ("Rhodes",
                    rhodesStops,
                    colours[6],
                    rhodesTimesMonFri,
                    rhodesTimesFri,
                    rhodesTimesSat,
                    rhodesTimesSun)

var roslyn = new Bus ("Roslyn",
                    roslynStops,
                    colours[7],
                    roslynTimesMonFri,
                    roslynTimesFri,
                    roslynTimesSat,
                    roslynTimesSun)

var rangiora = new Bus ("Rangiora",
                    rangioraStops,
                    colours[8],
                    rangioraTimesMonFri,
                    rangioraTimesFri,
                    rangioraTimesSat,
                    rangioraTimesSun)

var brightwater = new Bus ("Brightwater",
                    brightwaterStops,
                    colours[9],
                    brightwaterTimesMonFri,
                    brightwaterTimesFri,
                    brightwaterTimesSat,
                    brightwaterTimesSun)

var fernlea = new Bus ("Fernlea",
                    fernleaStops,
                    colours[10],
                    fernleaTimesMonFri,
                    fernleaTimesFri,
                    fernleaTimesSat,
                    fernleaTimesSun)

var heights = new Bus ("Heights",
                    heightsStops,
                    colours[11],
                    heightsTimesMonFri,
                    heightsTimesFri,
                    heightsTimesSat,
                    heightsTimesSun)




// trying to create objects with a loop in an attempt to DRY up the above (but doesn't work)
/*
for (var i = 0; i < buses.length; i++ ) {

    //this replaces the array value; instead of using its value as the variables name
    buses[i] = new Bus  (buses[i],
                        eval(buses[i]+"Stops"),
                        colours[i],
                        eval(buses[i]+"TimesMonFri"),
                        eval(buses[i]+"TimesFri"),
                        eval(buses[i]+"TimesSat"),
                        eval(buses[i]+"TimesSun"))
}
*/



/*===========================
            JQUERY
============================*/
$(document).ready(function(){

    //SHOW BUS STOPS IN MENU, WHEN ROUTE CLICKED
    $(".stopsMenu").hide();
    $(".bus").click(function(){
        $("#"+this.id+"Stops").html( eval(this.id).getStops() );
        $("#"+this.id+"Stops").slideToggle();
    });

    //SHOW BUS INFORMATION, WHEN STOP CLICKED
    $(".busStop").click(function(){
       alert(this.Text)
    });

});
