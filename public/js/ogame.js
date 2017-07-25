// javascript:%20(function%20()%20{%20%20%20%20%20var%20element%20=%20document.getElementById('exu_ogame_scripts');%20%20%20%20%20if(element%20!=%20null)%20{%20%20%20%20%20%20%20%20%20element.parentNode.removeChild(element);%20%20%20%20%20}%20%20%20%20%20%20var%20jsCode%20=%20document.createElement('script');%20%20%20%20%20jsCode.setAttribute('id',%20'exu_ogame_scripts');%20%20%20%20%20jsCode.setAttribute('src',%20'http://kasia.in/js/ogame.js');%20%20%20%20%20document.body.appendChild(jsCode);%20%20}());

Handler = {
    run : function () {
        var page = location.href.match(/page=([a-z0-9]+)/);
        if(page != null && page[1]) {
            page = page[1];
            var controller = page + "Controller";
            console.log(controller, this[controller]);
            try {
                this[controller]();
            } catch (e) {
                console.log("Controller error: " + e.message)
            }
            return true;
        }

        console.log('Controller not found');
    },

    getNextPlanet : function (Planet) {
        var firstPlanet = $('#myPlanets .smallplanet:first').next();
        var nextPlanet = Planet.parent().next();

        if(nextPlanet.length == 0) {
            nextPlanet = $('#myPlanets .smallplanet:first').next();
        } else {
            var planetName = nextPlanet.find('.planet-name').text();
            if(planetName.match(/^M.*/) != null) {
                nextPlanet = nextPlanet.next();
            }
        }


        return nextPlanet;
    },

    movementController : function() {
        var nextPlanet = this.getNextPlanet($('#myPlanets .active'));
        location.href = nextPlanet.find('a').attr('href');
    },

    fleet1Controller : function() {
        $('#button203,#button202').find('a').click();
        $('#continue').click();
    },

    fleet2Controller : function() {
        var player = $('#playerName>span').text();

        if(player == 'vhredny') {
            var nextPlanet = this.getNextPlanet($('#myPlanets .active'));
            var coords = nextPlanet.find('.planet-koords').text().replace(/\[|\]/g, '').replace(/\:/g, '#');

            $('#slbox').find('option').each(function(){
                var o = $(this), t = this.value;
                if(t.indexOf(coords) === 0) {
                    o.attr('selected', 'selected');
                }
            });


        } else {
            $('#slbox').find('option').each(function(){
                var o = $(this), t = o.text();
                if(t.match(/^M.*/) != null) {
                    o.attr('selected', 'selected');
                }
            });
        }

        $('#slbox').change();
        $('#continue').click();

    },

    fleet3Controller : function() {
        var player = $('#playerName>span').text();

        maxDeuterium();
        maxCrystal();
        maxMetal();
        updateVariables();

        //$('#allresources').click();
        if(player == 'vhredny') {
            $('#missionButton4').click();
        } else {
            $('#missionButton3').click();
        }
        $('#start').click();
    }
};


Handler.run();
