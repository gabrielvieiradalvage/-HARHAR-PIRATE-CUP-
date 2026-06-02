gdjs.Menu_95PrincipalCode = {};
gdjs.Menu_95PrincipalCode.localVariables = [];
gdjs.Menu_95PrincipalCode.idToCallbackMap = new Map();
gdjs.Menu_95PrincipalCode.GDBotaoJogarObjects1= [];
gdjs.Menu_95PrincipalCode.GDBotaoJogarObjects2= [];
gdjs.Menu_95PrincipalCode.GDNewSpriteObjects1= [];
gdjs.Menu_95PrincipalCode.GDNewSpriteObjects2= [];
gdjs.Menu_95PrincipalCode.GDtituloObjects1= [];
gdjs.Menu_95PrincipalCode.GDtituloObjects2= [];
gdjs.Menu_95PrincipalCode.GDmarObjects1= [];
gdjs.Menu_95PrincipalCode.GDmarObjects2= [];
gdjs.Menu_95PrincipalCode.GDcreditosObjects1= [];
gdjs.Menu_95PrincipalCode.GDcreditosObjects2= [];
gdjs.Menu_95PrincipalCode.GDtutorialObjects1= [];
gdjs.Menu_95PrincipalCode.GDtutorialObjects2= [];


gdjs.Menu_95PrincipalCode.userFunc0xbaee60 = function GDJSInlineCode(runtimeScene) {
"use strict";
// ==========================================
// 1. CONFIGURAÇÃO DO HORIZONTE (CÉU OSCILANTE)
// ==========================================
const mar = runtimeScene.getObjects("mar")[0];

const larguraTela = runtimeScene.getGame().getGameResolutionWidth();
const alturaTela = runtimeScene.getGame().getGameResolutionHeight();

// Cria uma onda suave para o céu que varia de forma limpa entre 0 e 1
var tempoCeu = Date.now() / 2500; 
var fatorCeu = (Math.sin(tempoCeu) + 1) / 2; 

// Interpola dinamicamente entre Branco Puro (255,255,255) e um Azul Claro Suave (210,230,255)
var ceuR = Math.floor(255 - (fatorCeu * 45));
var ceuG = Math.floor(255 - (fatorCeu * 25));
var ceuB = 255;

// Aplica a cor calculada diretamente no fundo da cena
runtimeScene.setBackgroundColor(ceuR, ceuG, ceuB);

// ==========================================
// 2. CONFIGURAÇÃO E COR DO MAR (MANTIDO)
// ==========================================
if (mar) {
    // Garante que o mar cubra perfeitamente a metade inferior da tela
    mar.setX(0);
    mar.setY(alturaTela / 2);
    mar.setWidth(larguraTela);
    mar.setHeight(alturaTela / 2);

    // Pega o tempo do relógio para criar a oscilação das ondas do mar morto
    var tempo = Date.now() / 1800;
    var oscilacao = Math.sin(tempo) * 8;

    // Seus valores calibrados originais para o tom azul-acinzentado denso
    var tomVermelho = Math.floor(110 + oscilacao); 
    var tomVerde = Math.floor(130 + oscilacao);    
    var tomAzul = Math.floor(150 + oscilacao);     

    // Aplica o tom dinamicamente no objeto (formato "R;G;B" exigido pelo GDevelop 5)
    mar.setColor(tomVermelho + ";" + tomVerde + ";" + tomAzul);
}
};
gdjs.Menu_95PrincipalCode.eventsList0 = function(runtimeScene) {

{


gdjs.Menu_95PrincipalCode.userFunc0xbaee60(runtimeScene);

}


{

gdjs.copyArray(runtimeScene.getObjects("BotaoJogar"), gdjs.Menu_95PrincipalCode.GDBotaoJogarObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Menu_95PrincipalCode.GDBotaoJogarObjects1.length;i<l;++i) {
    if ( gdjs.Menu_95PrincipalCode.GDBotaoJogarObjects1[i].IsClicked(null) ) {
        isConditionTrue_0 = true;
        gdjs.Menu_95PrincipalCode.GDBotaoJogarObjects1[k] = gdjs.Menu_95PrincipalCode.GDBotaoJogarObjects1[i];
        ++k;
    }
}
gdjs.Menu_95PrincipalCode.GDBotaoJogarObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Seletor_Minigames", false);
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
{gdjs.evtTools.sound.playSoundOnChannel(runtimeScene, "WhatsApp Audio 2026-06-02 at 09.38.59 (online-audio-converter.com).mp3", 0, true, 100, 1);
}
{gdjs.evtTools.sound.playSoundOnChannel(runtimeScene, "Sea Waves - Sound Effect - Sound Effects (youtube).mp3", 0, true, 100, 1);
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("creditos"), gdjs.Menu_95PrincipalCode.GDcreditosObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Menu_95PrincipalCode.GDcreditosObjects1.length;i<l;++i) {
    if ( gdjs.Menu_95PrincipalCode.GDcreditosObjects1[i].IsClicked(null) ) {
        isConditionTrue_0 = true;
        gdjs.Menu_95PrincipalCode.GDcreditosObjects1[k] = gdjs.Menu_95PrincipalCode.GDcreditosObjects1[i];
        ++k;
    }
}
gdjs.Menu_95PrincipalCode.GDcreditosObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Crédito", false);
}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("tutorial"), gdjs.Menu_95PrincipalCode.GDtutorialObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Menu_95PrincipalCode.GDtutorialObjects1.length;i<l;++i) {
    if ( gdjs.Menu_95PrincipalCode.GDtutorialObjects1[i].IsClicked(null) ) {
        isConditionTrue_0 = true;
        gdjs.Menu_95PrincipalCode.GDtutorialObjects1[k] = gdjs.Menu_95PrincipalCode.GDtutorialObjects1[i];
        ++k;
    }
}
gdjs.Menu_95PrincipalCode.GDtutorialObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Tutorial", false);
}
}

}


};

gdjs.Menu_95PrincipalCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Menu_95PrincipalCode.GDBotaoJogarObjects1.length = 0;
gdjs.Menu_95PrincipalCode.GDBotaoJogarObjects2.length = 0;
gdjs.Menu_95PrincipalCode.GDNewSpriteObjects1.length = 0;
gdjs.Menu_95PrincipalCode.GDNewSpriteObjects2.length = 0;
gdjs.Menu_95PrincipalCode.GDtituloObjects1.length = 0;
gdjs.Menu_95PrincipalCode.GDtituloObjects2.length = 0;
gdjs.Menu_95PrincipalCode.GDmarObjects1.length = 0;
gdjs.Menu_95PrincipalCode.GDmarObjects2.length = 0;
gdjs.Menu_95PrincipalCode.GDcreditosObjects1.length = 0;
gdjs.Menu_95PrincipalCode.GDcreditosObjects2.length = 0;
gdjs.Menu_95PrincipalCode.GDtutorialObjects1.length = 0;
gdjs.Menu_95PrincipalCode.GDtutorialObjects2.length = 0;

gdjs.Menu_95PrincipalCode.eventsList0(runtimeScene);
gdjs.Menu_95PrincipalCode.GDBotaoJogarObjects1.length = 0;
gdjs.Menu_95PrincipalCode.GDBotaoJogarObjects2.length = 0;
gdjs.Menu_95PrincipalCode.GDNewSpriteObjects1.length = 0;
gdjs.Menu_95PrincipalCode.GDNewSpriteObjects2.length = 0;
gdjs.Menu_95PrincipalCode.GDtituloObjects1.length = 0;
gdjs.Menu_95PrincipalCode.GDtituloObjects2.length = 0;
gdjs.Menu_95PrincipalCode.GDmarObjects1.length = 0;
gdjs.Menu_95PrincipalCode.GDmarObjects2.length = 0;
gdjs.Menu_95PrincipalCode.GDcreditosObjects1.length = 0;
gdjs.Menu_95PrincipalCode.GDcreditosObjects2.length = 0;
gdjs.Menu_95PrincipalCode.GDtutorialObjects1.length = 0;
gdjs.Menu_95PrincipalCode.GDtutorialObjects2.length = 0;


return;

}

gdjs['Menu_95PrincipalCode'] = gdjs.Menu_95PrincipalCode;
