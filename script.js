var pageloaded = 0;

document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector("#container").style.opacity = 0;
        document.querySelector("#loader").style.visibility = "visible";
    } else {
        setTimeout(() => {
            document.querySelector("#loader").classList.add('hidden');
            document.querySelector("#loader").style.zIndex = 0;
            pageloaded = 1;
            //document.querySelector("container").style.visibility = "visible";
        }, 500);
    }
};

function movement(event) {

    if (pageloaded == 1) {
        if (event.key == "Enter") {
            if (menuworker == 0) {
                if (playedbefore == 0) {
                    menu();
                    intro();
                    idle();
                }
            }
            if (deadbefore == 1) {
                restartgame();
                deadbefore = 0;
            }
        }
    }
    if (isdead == 0) {
        if (event.key == "d") {
            if (scoreworker != 0) {
                if (runfworker == 0) {
                    if (runbworker == 0) {
                        if (jumpworker == 0) {
                            clearInterval(idleworker);
                            clearInterval(runbworker);
                            clearInterval(downworker);
                            runsound.play();
                            runforward();
                        }
                    }
                }
            }
        }

        if (event.key == "a") {
            if (scoreworker != 0) {
                if (runbworker == 0) {
                    if (runfworker == 0) {
                        if (jumpworker == 0) {
                            clearInterval(idleworker);
                            clearInterval(runfworker);
                            clearInterval(downworker);
                            runsound.play();
                            runbackward();
                        }
                    }
                }
            }
        }

        if (event.key == "w") {
            if (scoreworker != 0) {
                if (jumpworker == 0) {
                    if (intervalworker == 0) {
                        runsound.pause();
                        runsound.currentTime = 0;
                        clearInterval(idleworker);
                        clearInterval(runfworker);
                        clearInterval(runbworker);
                        clearInterval(downworker);
                        jump();
                        jumpsound.play();
                    }
                }
            }
        }

        if (event.key == "s") {
            if (scoreworker != 0) {
                if (jumpworker == 0) {
                    if (runfworker == 0) {
                        if (runbworker == 0) {
                            if (downworker == 0) {
                                clearInterval(idleworker);
                                down();
                                downsound.play();
                            }

                        }
                    }
                }
            }
        }
    }

    if (event.key == "r") {
        //if(introworker==0){
        //updatescore();
        //enemymarginleft.forEach(createenemy);
        //createobject();
        //intro();    
        //menu();    
        //idle();
        //dead();
        window.location.reload();
    }

    if (event.key == "Escape") {
        if (introworker != 0) {
            escape1 = 1;
        }
    }
}

//----------------------------------------------------------------------------------------------------------------------------

function clickstart() {
    if (menuworker == 0) {
        if (playedbefore == 0) {
            menu();
            intro();
            idle();
        }
    }
    if (deadbefore == 1) {
        restartgame();
        deadbefore = 0;
    }
}


//menu gif animation here------------------------------------------------------------------------------------------------------

var menuworker = 0;
var opacity1 = 100;
let a = document.getElementById("theme");

function menu() {

    menuworker = setInterval(() => {
        opacity1 = opacity1 - 2;

        document.getElementById("menudiv").style.visibility = "hidden";

        if (opacity1 < 0) {
            opacity1 = 0;
            clearInterval(menuworker);
            menuworker = 1;
            document.getElementById("menu").src = "#";
            document.getElementById("landpage").style.zIndex = 0;
        }

        document.getElementById("menu").style.opacity = opacity1 + "%";
    }, 10);
}

//intro here--------------------------------------------------------------------------------------------------------------------

var escape1 = 0;
var startsound = new Audio("resources/audio/hereigo.mp3");
var introworker = 0;
var introcount = 0;
var opacity2 = 100;

function intro() {

    var vid = document.createElement("video");
    vid.src = "resources/video/intro2.mp4";
    vid.className = "intro1";
    vid.id = "intro1";
    document.getElementById("background").appendChild(vid);

    introworker = setInterval(() => {

        a.muted = true;
        vid.play();
        introcount = introcount + 1;
        if (escape1 == 1) {
            document.getElementById("background").classList.add("loaded");  //---------------------------------
            document.getElementById("container").style.opacity = 1;  //---------------------------------
            opacity2 = opacity2 - 2;
            vid.pause();
            if (opacity2 == 0) {
                a.muted = false;
                a.currentTime = 0;
                document.getElementById("intro1").src = "#";
                document.getElementById("intro1").style.zIndex = 0;
                vid.currentTime = 0;
                clearInterval(introworker);
                introworker = 1;
                updatescore();
                createobject();
            }
        }
        if (introcount > 2000) {
            vid.pause();
            a.currentTime = 0;
            a.muted = false;
            document.getElementById("intro1").src = "#";
            document.getElementById("intro1").style.zIndex = 0;
            vid.currentTime = 0;
            clearInterval(introworker);
            introworker = 0;
            updatescore();
            createobject();
        }
        if (introcount > 1900) {
            document.getElementById("background").classList.add("loaded");   //---------------------------------
            document.getElementById("container").style.opacity = 1; //----------------------------------
            opacity2 = opacity2 - 1;
        }

        document.getElementById("intro1").style.opacity = opacity2 + "%";
    }, 10);
}

//interwal for jump animation here----------------------------------------------------------------------------------------------------

var intervalworker = 0;
var wait = 0;

function interval() {
    intervalworker = setInterval(() => {
        wait = wait + 1;

        if (jumpworker == 0) {
            if (wait > 2) {
                clearInterval(intervalworker);
                intervalworker = 0;
                wait = 0;
            }
        }
    }, 100);
}

//sprite idle animation here----------------------------------------------------------------------------------------------------------

var idleworker = 0;

function idle() {
    idleworker = setInterval(() => {
        document.getElementById("sprite").style.marginTop = 38 + "vh";
        document.getElementById("sprite").style.height = 70 + "vh";

        document.getElementById("sprite").src = "resources/sprites/Idle.gif";
        clearInterval(idleworker);
    }, 100);


}

//sprite running forward when presses "d" here----------------------------------------------------------------------------------------

var runsound = new Audio("resources/audio/running2.mp3");
var spritemarginleft = 0;
var marginlworker = 0;
var runfworker = 0;
var count = 0;
var countworker = 0;

function runforward() {
    marginlworker = setInterval(() => {
        if (spritemarginleft < 78) {
            spritemarginleft = spritemarginleft + 0.35714285714285715;
        }

        if (runfworker != 0) {
            document.getElementById("sprite").style.marginLeft = spritemarginleft + "vw";
        }
    }, 20);

    runfworker = setInterval(() => {

        document.getElementById("sprite").style.marginTop = 46 + "vh";
        document.getElementById("sprite").style.height = 65.3333 + "vh";



        document.getElementById("sprite").src = "resources/sprites/runforward.gif";
        clearInterval(runfworker);
    }, 100);

    countworker = setInterval(() => {
        count = count + 1;

        if (count == 8) {
            count = 0;
            clearInterval(runfworker);
            clearInterval(countworker);
            clearInterval(marginlworker);
            runfworker = 0;
            if (jumpworker == 0) {
                idle();
            }
            if (runfworker == 0) {
                runsound.pause();
            }

        }
    }, 100);
}

//sprite running backward when pressed "a" here--------------------------------------------------------------------------------------------------------

var marginrworker = 0;
var runbworker = 0;
var count2 = 0;
var countworker2 = 0;

function runbackward() {
    marginrworker = setInterval(() => {
        if (spritemarginleft > -13) {
            spritemarginleft = spritemarginleft - 0.35714285714285715;
        }

        if (runbworker != 0) {
            document.getElementById("sprite").style.marginLeft = spritemarginleft + "vw";
        }
    }, 20);

    runbworker = setInterval(() => {

        document.getElementById("sprite").style.marginTop = 46 + "vh";
        document.getElementById("sprite").style.height = 65.3333 + "vh";

        document.getElementById("sprite").src = "resources/sprites/runbackward.gif";
        clearInterval(runbworker);
    }, 100);

    countworker2 = setInterval(() => {
        count2 = count2 + 1;

        if (count2 == 8) {
            count2 = 0;
            clearInterval(runbworker);
            clearInterval(countworker2);
            clearInterval(marginrworker);
            runbworker = 0;
            if (jumpworker == 0) {
                idle();
            }
            if (runfworker == 0) {
                runsound.pause();
            }

        }
    }, 100);
}

//sprite jumps when pressed "w" here-----------------------------------------------------------------------------------------------------------------

var jumpsound = new Audio("resources/audio/huh.mp3")
var jumpworker = 0;
var spritemargintop = 38;
var margintopworker = 0;
var count3 = 0;
var countworker3 = 0;

function jump() {
    margintopworker = setInterval(() => {

        if (jumpworker != 0) {
            if (runbworker == 0) {
                if (spritemarginleft < 78) {
                    spritemarginleft = spritemarginleft + 0.35714285714285715;
                    document.getElementById("sprite").style.marginLeft = spritemarginleft + "vw";
                }
            }
            if (runbworker != 0) {
                if (spritemarginleft < -13) {
                    spritemarginleft = spritemarginleft - 0.35714285714285715;
                    document.getElementById("sprite").style.marginLeft = spritemarginleft + "vw";
                }
            }

            if (count3 < 4) {
                spritemargintop = spritemargintop - 0.9333;
            }

            if (count3 > 5) {
                spritemargintop = spritemargintop + 0.9333;
            }

            document.getElementById("sprite").style.marginTop = spritemargintop + "vh";

        }
    }, 30);

    jumpworker = setInterval(() => {

        document.getElementById("sprite").style.marginTop = 38 + "vh";
        document.getElementById("sprite").style.height = 74.6667 + "vh";

        document.getElementById("sprite").src = "resources/sprites/jumpV.gif";
        clearInterval(jumpworker);
    }, 100);

    countworker3 = setInterval(() => {
        count3 = count3 + 1;

        if (count3 == 10) {
            count3 = 0;
            clearInterval(jumpworker);
            clearInterval(countworker3);
            clearInterval(margintopworker);
            jumpsound.pause();
            jumpworker = 0;
            spritemargintop = 38;
            if (runfworker == 0) {
                if (runbworker == 0) {
                    interval();
                    idle();
                }
            }
        }
    }, 100);
}

//sprite down when pressed "s" special move here------------------------------------------------------------------------------------------------

var downsound = new Audio("")
downsound.loop = true;
var downworker = 0;
var countworker4 = 0;
var count4 = 0;

function down() {
    downworker = setInterval(() => {
        document.getElementById("sprite").style.marginTop = 45.8 + "vh";
        document.getElementById("sprite").style.height = 65.3333 + "vh";

        document.getElementById("sprite").src = "resources/sprites/down.gif";
        clearInterval(downworker);
    }, 100);

    countworker4 = setInterval(() => {
        count4 = count4 + 1;

        if (count4 == 6) {
            count4 = 0;
            clearInterval(downworker);
            clearInterval(countworker4);
            downsound.pause();
            downworker = 0;
            if (downworker == 0) {
                if (runfworker == 0) {
                    if (runbworker == 0) {
                        if (jumpworker == 0) {
                            idle();
                        }

                    }
                }
            }
        }
    }, 100);


}

//updating score function here-------------------------------------------------------------------------------------------------------------------------

var scoreworker = 0;
var score = 0;
var highscore = 0;

function updatescore() {
    scoreworker = setInterval(() => {
        if (score == 60) {
            startsound.play();
        }

        if (score > 1250) {
            document.getElementById("level").innerHTML = "Level 02";
            m = 0.3;
        }

        if (score > 2250) {
            document.getElementById("level").innerHTML = "Level 03";
            m = 0.4;
        }

        if (score < 1000) {
            document.getElementById("level").innerHTML = "Level 01";
        }

        score = score + 5;
        document.getElementById("score").innerHTML = score;
    }, 100);
}

//enemy sprite here----------------------------------------------------------------------------------------------------------------------------------------

var m = 0.2;
var isdead = 0;
var y2 = 131.6;
var z2 = 167.2;
var z = 164.4;
var y = 128.8;
var objectworker = 0;
var objectworker2 = 0;
var levelworker = 0;

function createobject() {

    var object = document.createElement("img");
    object.src = "resources/sprites/fireball.gif";
    object.className = "object";
    object.id = "object";
    object.style.marginLeft = y + "vw";
    document.getElementById("background").appendChild(object);

    objectworker = setInterval(() => {
        if (objectworker != 0) {
            if (isdead == 0) {
                y = y - m;
                y2 = y2 - m;
                object.style.marginLeft = y + "vw";
            }
        }

        if (y < -14.4) {
            y = 107.2;
        }
        if (y2 < -11.6) {
            y2 = 110;
        }

        if (y < spritemarginleft + 19.5) {
            if (y > spritemarginleft + 5.2) {
                if (jumpworker == 0) {
                    if (isdead == 0) {
                        //runsound.pause();
                        a.muted = true;
                        isdead = 1;
                        if (score > highscore) {
                            highscore = score;
                        }

                        clearInterval(runbworker);
                        clearInterval(runfworker);
                        clearInterval(scoreworker);
                        clearInterval(jumpworker);

                        //idle();
                        // clearInterval(objectworker2);
                        // clearInterval(objectworker);
                        // objectworker = 0;
                        // objectworker2 = 0;

                        dead();
                        deadsound.play();
                    }
                }
            }
        }
    }, 10);


    var object2 = document.createElement("img");
    object2.src = "resources/sprites/fireball.gif";
    object2.className = "object2";
    object2.id = "object2";
    object2.style.marginLeft = z + "vw";
    document.getElementById("background").appendChild(object2);



    objectworker2 = setInterval(() => {
        if (objectworker2 != 0) {
            if (isdead == 0) {
                z = z - m;
                z2 = z2 - m;
                object2.style.marginLeft = z + "vw";
            }
        }

        if (z < -14.4) {
            z = 142.8;
        }
        if (z2 < -11.6) {
            z2 = 145.6;
        }

        if (z < spritemarginleft + 19.5) {
            if (z > spritemarginleft + 5.2) {
                if (jumpworker == 0) {
                    if (isdead == 0) {
                        //runsound.pause();
                        a.muted = true;
                        isdead = 1;
                        if (score > highscore) {
                            highscore = score;
                        }

                        clearInterval(runbworker);
                        clearInterval(runfworker);
                        clearInterval(scoreworker);
                        clearInterval(jumpworker);

                        //idle();
                        // clearInterval(objectworker2);
                        // clearInterval(objectworker);
                        // objectworker = 0;
                        // objectworker2 = 0;

                        dead();
                        deadsound.play();
                    }
                }
            }
        }
    }, 10);
}

//dead function here---------------------------------------------------------------------------------------------------------------------------

var deadimage = 1;
var deadworker = 0;
var deadsound = new Audio("resources/audio/hit.mp3");
var oversound = new Audio("resources/audio/gameover2.mp3");

function dead() {
    deadworker = setInterval(() => {
        deadimage = deadimage + 1;

        if (deadimage == 3) {
            deadimage = 2;
            deadbefore = 1;
            a.muted = true;
            oversound.play();
            //alert("Game Over");
            // restartgame();
            clearInterval(deadworker);
            document.getElementById("highscore").innerHTML = "HIGHSCORE - " + highscore;
            document.getElementById('gameoverdiv').classList.add('loading');
        }

        document.getElementById("sprite").style.marginTop = 42.8 + "vh";
        document.getElementById("sprite").style.marginLeft = spritemarginleft + 1.7857142857142858 + "vw";
        document.getElementById("sprite").style.height = 70 + "vh";
        document.getElementById("sprite").src = "resources/sprites/dead" + deadimage + ".png";
    }, 100);
}

var deadbefore = 0;
var playedbefore = 0;

function restartgame() {
    score = 0;
    isdead = 0;
    spritemarginleft = 0;
    playedbefore = 1;
    y2 = 131.6;
    z2 = 167.2;
    z = 164.4;
    y = 128.8;
    m = 0.2;
    a.currentTime = 0;
    a.muted = false;

    document.getElementById('gameoverdiv').classList.remove('loading');
    document.getElementById("sprite").style.marginLeft = spritemarginleft + "vw";

    idle();
    updatescore();
}