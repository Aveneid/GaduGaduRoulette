/**
 * Title: GG Auto Roulette Script - Basic Version
 * Author:    Aveneid
 * Website: http://aveneid.esy.es/
 * Created:   21.05.2017
 * 
 * (c) Copyright by Aveneid.
 **/
 var flag = false, spinner,state,states = ['idle','rotating','hide','d-none'],curState,spinnerButton = $('.btn-spin-the-roulette input'), spinnerAgainButton = $('.btn-spin-again input'),timeoutCheck; $(document).ready(function() { $("#sr-mainnav").append("<li id='ext-genButtonMain'><a href='javascript:trigScript();' class='roulette' id='genButtonA'> <strong id='ext-ButtonText'><font style='color: green;'>Włącz</font><em id='ext-ButtonEM'></em></a></li>"); });  function trigScript(){ flag = !flag; if(flag){ timeoutCheck = setInterval(startRoulette,2000); spinnerAgainButton = $('.btn-spin-again input'); spinnerButton = $('.btn-spin-the-roulette input'); } else clearInterval(timeoutCheck); $('#ext-ButtonText').html((flag?'<font style="color: red;">Wyłącz':'<font style="color: green;">Włącz') +"</font><em id='ext-ButtonEM'></em>"); } function startRoulette() { spinner = $('.roulette-spinner-2'); state = spinner.attr('class'); curState = state.split(" ")[1]; switch(curState){ case states[0]: spinnerButton.click();  break; case states[3]: spinnerAgainButton.click(); break; default:  break; } }