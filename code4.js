gdjs.Seletor_95MinigamesCode = {};
gdjs.Seletor_95MinigamesCode.localVariables = [];
gdjs.Seletor_95MinigamesCode.idToCallbackMap = new Map();
gdjs.Seletor_95MinigamesCode.GDCORRIDAObjects1= [];
gdjs.Seletor_95MinigamesCode.GDCORRIDAObjects2= [];
gdjs.Seletor_95MinigamesCode.GDguerra_9595de_9595espadasObjects1= [];
gdjs.Seletor_95MinigamesCode.GDguerra_9595de_9595espadasObjects2= [];
gdjs.Seletor_95MinigamesCode.GDfutebolObjects1= [];
gdjs.Seletor_95MinigamesCode.GDfutebolObjects2= [];
gdjs.Seletor_95MinigamesCode.GDordemObjects1= [];
gdjs.Seletor_95MinigamesCode.GDordemObjects2= [];
gdjs.Seletor_95MinigamesCode.GDceuObjects1= [];
gdjs.Seletor_95MinigamesCode.GDceuObjects2= [];
gdjs.Seletor_95MinigamesCode.GDcadeado1Objects1= [];
gdjs.Seletor_95MinigamesCode.GDcadeado1Objects2= [];
gdjs.Seletor_95MinigamesCode.GDcadeado2Objects1= [];
gdjs.Seletor_95MinigamesCode.GDcadeado2Objects2= [];
gdjs.Seletor_95MinigamesCode.GDimpedidor1Objects1= [];
gdjs.Seletor_95MinigamesCode.GDimpedidor1Objects2= [];
gdjs.Seletor_95MinigamesCode.GDimpedidor2Objects1= [];
gdjs.Seletor_95MinigamesCode.GDimpedidor2Objects2= [];


gdjs.Seletor_95MinigamesCode.userFunc0xcb8c20 = function GDJSInlineCode(runtimeScene) {
"use strict";
// ==========================================
// 3. POSICIONAMENTO E DESBLOQUEIO: FUTEBOL (CADEADO 1 / IMPEDIDOR 1)
// ==========================================
var botoesFutebol = runtimeScene.getObjects("futebol");
var cadeados1 = runtimeScene.getObjects("cadeado1");
var impedidores1 = runtimeScene.getObjects("impedidor1");

// Checa se a variável global indica vitória na corrida
var corridaVencida = runtimeScene.getGame().getVariables().get("Minigameconcluido").getAsNumber() === 1;

if (botoesFutebol.length > 0) {
    var btnFutebol = botoesFutebol[0];
    
    if (corridaVencida) {
        // Se venceu a corrida, remove o cadeado 1 e o impedidor 1
        cadeados1.forEach(c => { c.setX(-9000); c.setY(-9000); });
        impedidores1.forEach(i => { i.setX(-9000); i.setY(-9000); });
    } else {
        // Se não venceu, mantém trancado no centro do botão
        if (cadeados1.length > 0) {
            var cad1 = cadeados1[0];
            cad1.setX(btnFutebol.getX() + (btnFutebol.getWidth() - cad1.getWidth()) / 2);
            cad1.setY(btnFutebol.getY() + (btnFutebol.getHeight() - cad1.getHeight()) / 2);
        }
        
        if (impedidores1.length > 0) {
            var imp1 = impedidores1[0];
            imp1.setX(btnFutebol.getX() + (btnFutebol.getWidth() - imp1.getWidth()) / 2);
            imp1.setY(btnFutebol.getY() + (btnFutebol.getHeight() - imp1.getHeight()) / 2);
            imp1.hide(); 
        }
    }
} 

// ==========================================
// 4. POSICIONAMENTO E DESBLOQUEIO: GUERRA DE ESPADAS (CADEADO 2 / IMPEDIDOR 2)
// ==========================================
var botoesGuerra = runtimeScene.getObjects("guerra_de_espadas");
var cadeados2 = runtimeScene.getObjects("cadeado2");
var impedidores2 = runtimeScene.getObjects("impedidor2");

// Checa se a variável global indica vitória no futebol
var futebolVencido = runtimeScene.getGame().getVariables().get("Futebolconcluido").getAsNumber() === 1;

if (botoesGuerra.length > 0) {
    var btnGuerra = botoesGuerra[0];
    
    if (futebolVencido) {
        // Se venceu o futebol, remove o cadeado 2 e o impedidor 2 (Libera a Guerra de Espadas!)
        cadeados2.forEach(c => { c.setX(-9000); c.setY(-9000); });
        impedidores2.forEach(i => { i.setX(-9000); i.setY(-9000); });
    } else {
        // Se não venceu o futebol, mantém a Guerra de Espadas trancada
        if (cadeados2.length > 0) {
            var cad2 = cadeados2[0];
            cad2.setX(btnGuerra.getX() + (btnGuerra.getWidth() - cad2.getWidth()) / 2);
            cad2.setY(btnGuerra.getY() + (btnGuerra.getHeight() - cad2.getHeight()) / 2);
        }
        
        if (impedidores2.length > 0) {
            var imp2 = impedidores2[0];
            imp2.setX(btnGuerra.getX() + (btnGuerra.getWidth() - imp2.getWidth()) / 2);
            imp2.setY(btnGuerra.getY() + (btnGuerra.getHeight() - imp2.getHeight()) / 2);
            imp2.hide(); 
        }
    }
}
};
gdjs.Seletor_95MinigamesCode.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("CORRIDA"), gdjs.Seletor_95MinigamesCode.GDCORRIDAObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Seletor_95MinigamesCode.GDCORRIDAObjects1.length;i<l;++i) {
    if ( gdjs.Seletor_95MinigamesCode.GDCORRIDAObjects1[i].IsClicked(null) ) {
        isConditionTrue_0 = true;
        gdjs.Seletor_95MinigamesCode.GDCORRIDAObjects1[k] = gdjs.Seletor_95MinigamesCode.GDCORRIDAObjects1[i];
        ++k;
    }
}
gdjs.Seletor_95MinigamesCode.GDCORRIDAObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "corrida", false);
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("futebol"), gdjs.Seletor_95MinigamesCode.GDfutebolObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Seletor_95MinigamesCode.GDfutebolObjects1.length;i<l;++i) {
    if ( gdjs.Seletor_95MinigamesCode.GDfutebolObjects1[i].IsClicked(null) ) {
        isConditionTrue_0 = true;
        gdjs.Seletor_95MinigamesCode.GDfutebolObjects1[k] = gdjs.Seletor_95MinigamesCode.GDfutebolObjects1[i];
        ++k;
    }
}
gdjs.Seletor_95MinigamesCode.GDfutebolObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "futebol", false);
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("guerra_de_espadas"), gdjs.Seletor_95MinigamesCode.GDguerra_9595de_9595espadasObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Seletor_95MinigamesCode.GDguerra_9595de_9595espadasObjects1.length;i<l;++i) {
    if ( gdjs.Seletor_95MinigamesCode.GDguerra_9595de_9595espadasObjects1[i].IsClicked(null) ) {
        isConditionTrue_0 = true;
        gdjs.Seletor_95MinigamesCode.GDguerra_9595de_9595espadasObjects1[k] = gdjs.Seletor_95MinigamesCode.GDguerra_9595de_9595espadasObjects1[i];
        ++k;
    }
}
gdjs.Seletor_95MinigamesCode.GDguerra_9595de_9595espadasObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "luta de espadas", false);
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
{gdjs.evtTools.sound.playSoundOnChannel(runtimeScene, "baia.mp3", 7, true, 100, 1);
}
}

}


{


gdjs.Seletor_95MinigamesCode.userFunc0xcb8c20(runtimeScene);

}


};

gdjs.Seletor_95MinigamesCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Seletor_95MinigamesCode.GDCORRIDAObjects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDCORRIDAObjects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDguerra_9595de_9595espadasObjects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDguerra_9595de_9595espadasObjects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDfutebolObjects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDfutebolObjects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDordemObjects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDordemObjects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDceuObjects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDceuObjects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDcadeado1Objects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDcadeado1Objects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDcadeado2Objects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDcadeado2Objects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDimpedidor1Objects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDimpedidor1Objects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDimpedidor2Objects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDimpedidor2Objects2.length = 0;

gdjs.Seletor_95MinigamesCode.eventsList0(runtimeScene);
gdjs.Seletor_95MinigamesCode.GDCORRIDAObjects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDCORRIDAObjects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDguerra_9595de_9595espadasObjects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDguerra_9595de_9595espadasObjects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDfutebolObjects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDfutebolObjects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDordemObjects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDordemObjects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDceuObjects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDceuObjects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDcadeado1Objects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDcadeado1Objects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDcadeado2Objects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDcadeado2Objects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDimpedidor1Objects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDimpedidor1Objects2.length = 0;
gdjs.Seletor_95MinigamesCode.GDimpedidor2Objects1.length = 0;
gdjs.Seletor_95MinigamesCode.GDimpedidor2Objects2.length = 0;


return;

}

gdjs['Seletor_95MinigamesCode'] = gdjs.Seletor_95MinigamesCode;
