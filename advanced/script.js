 /**
 * Title: GG Auto Roulette Script - Advanced Version
 * Author:    Aveneid
 * Website: http://aveneid.esy.es/
 * Created:   23.05.2017
 *
 * (c) Copyright by Aveneid.
 **/
var flag = false, collectData = false, spinner, state, states = ['idle', 'rotating', 'hide', 'd-none'], curState
var spinnerButton = $('.btn-spin-the-roulette input'), spinnerAgainButton = $('.btn-spin-again input'), spinCounter = -1, pCounter = 0, timeoutCheck;
var collectedData = [], rawData = []; /* collectData: number, name, yo, city, avatar */ 
var htmlMenu = "<div class='menuMain'><span class='menuOpen'>Menu</span><div id='menuDrop' style='display:none;'><span class='menuBackground'><ul><li>Losowanie <span class='menuButton menuButtonGreen' id='trigScript'>Włącz</span></li><li>Logi <span class='menuButton menuButtonGreen' id='collectData'>Włącz</span></li><hr><li id='spinCounterText'>&nbsp;</li><br><li id='pCounterText'>&nbsp;</li></ul></span><span style='width:auto;' class='menuButton menuButtonBlue' id='showData'>Pokaż dane</span></div></div>";
var tHeader = "<th>Numer</th><th>Nazwa</th><th>Wiek</th><th>Miasto</th><th>Avatar</th>";
$(document).ready(function () {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'style.css';
    link.media = 'all';
    head.appendChild(link);
    $("body").append(htmlMenu);
    $('.menuOpen').click(function () {
        $('#menuDrop').slideToggle("fast");
    });
    $('#collectData').click(function () {
        collectData = !collectData;
        if (collectData) {
            $('#collectData').attr('class', 'menuButton menuButtonRed');
            $('#collectData').html('Wyłącz');
        } else {
            $('#collectData').attr('class', 'menuButton menuButtonGreen');
            $('#collectData').html('Włącz');
        }
    });
    $('#trigScript').click(function () {
        flag = !flag;
        if (flag) {
            timeoutCheck = setInterval(startRoulette, 2000);
            spinnerAgainButton = $('.btn-spin-again input');
            spinnerButton = $('.btn-spin-the-roulette input');
        } else
            clearInterval(timeoutCheck);
        if (flag) {
            $('#trigScript').attr('class', 'menuButton menuButtonRed');
            $('#trigScript').html('Wyłącz');
        } else {
            $('#trigScript').attr('class', 'menuButton menuButtonGreen');
            $('#trigScript').html('Włącz');
        }
    });
    var press = jQuery.Event("keypress");
    press.which = 16;
    $('#showData').click(function () {
        collectedData = "";
        for (var x = 0; x < rawData.length; x++)
            collectedData += rawData[x].join(" ");
        var w = window.open("about:blank", "Logi", "location=yes,height=640,width=480,scrollbars=yes,status=yes");
        w.moveTo(0, 0);
        w.document.write("<style>th, td { border-bottom: 1px solid #ddd;}</style><table style='width:100%;'>" + tHeader + collectedData + "</table>");
        return false;
    }).trigger(press);
}); /* collectData: number, name, yo, city, avatar */ function startCollectData() {
    var number = $('.roulette-user-avatar').attr('src').split(",")[1].split("/")[0];
    var name = $('p a').text();
    var yo = ($('p.aditionalInfo').html().split("<br>")[0].split(",")[1] != undefined) ? $('p.aditionalInfo').html().split("<br>")[0].split(",")[1] : 'n/A';
    var city = $('p.aditionalInfo').html().split("<br>")[1];
    var avatar = $('.roulette-user-avatar').attr('src');
    rawData.push(['<tr><td><a href="gg:' + number + '">' + number + '</a></td>', '<td>' + name + '</td>', '<td>' + yo + '</td>', '<td>' + city + '</td>', '<td><img src="' + avatar + '"></td>', '</tr>']);
}
function startRoulette() {
    spinner = $('.roulette-spinner-2');
    state = spinner.attr('class');
    curState = state.split(" ")[1];
    if (curState == states[3])
        if (collectData)
            startCollectData();
    switch (curState) {
    case states[0]:
        spinnerButton.click();
        spinCounter++;
        break;
    case states[3]:
        spinnerAgainButton.click();
        spinCounter++;
        pCounter++;
        break;
    default:
        break;
    }
    $('#spinCounterText').html('Kręceń: ' + spinCounter);
    $('#pCounterText').html('Wylosowanych osób: ' + pCounter);
}
