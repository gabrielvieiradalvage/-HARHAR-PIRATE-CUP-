gdjs.luta_32de_32espadasCode = {};
gdjs.luta_32de_32espadasCode.localVariables = [];
gdjs.luta_32de_32espadasCode.idToCallbackMap = new Map();
gdjs.luta_32de_32espadasCode.GDmarObjects1= [];
gdjs.luta_32de_32espadasCode.GDmarObjects2= [];
gdjs.luta_32de_32espadasCode.GDarenaObjects1= [];
gdjs.luta_32de_32espadasCode.GDarenaObjects2= [];
gdjs.luta_32de_32espadasCode.GDplayerObjects1= [];
gdjs.luta_32de_32espadasCode.GDplayerObjects2= [];
gdjs.luta_32de_32espadasCode.GDDavyBonesObjects1= [];
gdjs.luta_32de_32espadasCode.GDDavyBonesObjects2= [];
gdjs.luta_32de_32espadasCode.GDespada_9595playerObjects1= [];
gdjs.luta_32de_32espadasCode.GDespada_9595playerObjects2= [];
gdjs.luta_32de_32espadasCode.GDespada_9595enemyObjects1= [];
gdjs.luta_32de_32espadasCode.GDespada_9595enemyObjects2= [];
gdjs.luta_32de_32espadasCode.GDcoracao_9595PlayerObjects1= [];
gdjs.luta_32de_32espadasCode.GDcoracao_9595PlayerObjects2= [];
gdjs.luta_32de_32espadasCode.GDcoracao_9595enemyObjects1= [];
gdjs.luta_32de_32espadasCode.GDcoracao_9595enemyObjects2= [];
gdjs.luta_32de_32espadasCode.GDbarreiraObjects1= [];
gdjs.luta_32de_32espadasCode.GDbarreiraObjects2= [];
gdjs.luta_32de_32espadasCode.GDpowerupObjects1= [];
gdjs.luta_32de_32espadasCode.GDpowerupObjects2= [];
gdjs.luta_32de_32espadasCode.GDJackAndorinhaObjects1= [];
gdjs.luta_32de_32espadasCode.GDJackAndorinhaObjects2= [];
gdjs.luta_32de_32espadasCode.GDLaffyObjects1= [];
gdjs.luta_32de_32espadasCode.GDLaffyObjects2= [];
gdjs.luta_32de_32espadasCode.GDrecomecoObjects1= [];
gdjs.luta_32de_32espadasCode.GDrecomecoObjects2= [];
gdjs.luta_32de_32espadasCode.GDsele_95231_95227oObjects1= [];
gdjs.luta_32de_32espadasCode.GDsele_95231_95227oObjects2= [];
gdjs.luta_32de_32espadasCode.GDbot_95227ojackObjects1= [];
gdjs.luta_32de_32espadasCode.GDbot_95227ojackObjects2= [];
gdjs.luta_32de_32espadasCode.GDbot_95227olaffyObjects1= [];
gdjs.luta_32de_32espadasCode.GDbot_95227olaffyObjects2= [];
gdjs.luta_32de_32espadasCode.GDbot_95227otortaObjects1= [];
gdjs.luta_32de_32espadasCode.GDbot_95227otortaObjects2= [];
gdjs.luta_32de_32espadasCode.GDbot_95227obonesObjects1= [];
gdjs.luta_32de_32espadasCode.GDbot_95227obonesObjects2= [];


gdjs.luta_32de_32espadasCode.userFunc0x994e78 = function GDJSInlineCode(runtimeScene) {
"use strict";
// ==========================================================================
// 1. CAPTURA DE OBJETOS DA SCENE E DO MENU
// ==========================================================================
const almaTortaObj = runtimeScene.getObjects("player")[0]; 
const davyBonesObj = runtimeScene.getObjects("DavyBones")[0];
const jackAndorinhaObj = runtimeScene.getObjects("JackAndorinha")[0];
const laffyEsticadoObj = runtimeScene.getObjects("Laffy")[0];

// Objetos do Menu de Seleção In-Game
const fundoSelecao = runtimeScene.getObjects("seleção")[0];
const btnJack = runtimeScene.getObjects("botãojack")[0];
const btnLaffy = runtimeScene.getObjects("botãolaffy")[0];
const btnTorta = runtimeScene.getObjects("botãotorta")[0];
const btnBones = runtimeScene.getObjects("botãobones")[0];

const espadasPlayer = runtimeScene.getObjects("espada_player");
const espadasEnemy = runtimeScene.getObjects("espada_enemy");
const powerups = runtimeScene.getObjects("powerup");
const textoRecomeco = runtimeScene.getObjects("recomeco")[0]; 
const textoContagem = runtimeScene.getObjects("Contagem")[0]; 

// --- SISTEMA AUTOMÁTICO DE INTERFACE (5 CORAÇÕES) ---
let qtdCoraçoesPlayer = runtimeScene.getObjects("coracao_Player").length;
for (let i = qtdCoraçoesPlayer; i < 5; i++) { runtimeScene.createObject("coracao_Player"); }

let qtdCoraçoesEnemy = runtimeScene.getObjects("coracao_enemy").length;
for (let i = qtdCoraçoesEnemy; i < 5; i++) { runtimeScene.createObject("coracao_enemy"); }

const coracoesPlayer = runtimeScene.getObjects("coracao_Player");
const coracoesEnemy = runtimeScene.getObjects("coracao_enemy");

const teclado = runtimeScene.getGame().getInputManager();
const dt = runtimeScene.getTimeManager().getElapsedTime() / 1000; 

const camada = runtimeScene.getLayer("");
const cameraX = camada.getCameraX();
const cameraY = camada.getCameraY();
const larguraTela = runtimeScene.getGame().getGameResolutionWidth();
const alturaTela = runtimeScene.getGame().getGameResolutionHeight();

// Configurações Globais de Movimento
const velocidadePlayer = 280;       
const velocidadeNPCBase = 145;      

// FUNÇÃO AUXILIAR: Teleporte Físico Seguro
const posicionarObjeto = (obj, x, y) => {
    if (!obj) return;
    obj.setX(x);
    obj.setY(y);
    const phys = obj.getBehavior("Physics2");
    if (phys) {
        phys.setLinearVelocityX(0); phys.setLinearVelocityY(0); phys.setAngularVelocity(0);
    }
};

// ==========================================================================
// 2. INICIALIZAÇÃO E STATUS ÚNICOS DOS PERSONAGENS
// ==========================================================================
const inicializarPersonagem = (char, tipo) => {
    if (char && char.hp === undefined) {
        char.hp = 5; 
        char.tipoPersonagem = tipo;
        char.impulsoX = 0; char.impulsoY = 0;
        char.imuneTimer = 0; char.powerupTimer = 0; 
        char.espadaAngulo = 0; char.espadaSentido = 1;
        char.timerHabilidade = 0;
        
        // --- ATRIBUTOS ÚNICOS DE CADA PIRATA ---
        if (tipo === "DavyBones") {
            char.velGiroBase = 160;  
            char.raioBase = 90;      
            char.escalaEspada = 1.6; 
        } else if (tipo === "JackAndorinha") {
            char.velGiroBase = 650;  
            char.raioBase = 45;      
            char.escalaEspada = 0.8; 
        } else if (tipo === "Laffy") {
            char.velGiroBase = 350;  
            char.raioBase = 55;      
            char.escalaEspada = 1.0; 
            char.sentidoLaffy = 1;   
        } else { // Alma Torta
            char.velGiroBase = 320;  
            char.raioBase = 60;      
            char.escalaEspada = 1.0; 
        }

        const phys = char.getBehavior("Physics2");
        if (phys) { phys.setGravityScale(0); phys.setLinearVelocityX(0); phys.setLinearVelocityY(0); }

        char.clashCooldown = 0; char.aiTimer = 0; char.aiEstado = "perseguir";
        char.direcaoGiroFlanco = Math.random() < 0.5 ? 1 : -1;
        char.cooldownDash = 2.0; char.duracaoDash = 0;
    }
};

inicializarPersonagem(almaTortaObj, "AlmaTorta");
inicializarPersonagem(davyBonesObj, "DavyBones");
inicializarPersonagem(jackAndorinhaObj, "JackAndorinha");
inicializarPersonagem(laffyEsticadoObj, "Laffy");

// --- CONTROLE DE ESTADO DO JOGO (0 = Menu de Seleção, 1 = Luta) ---
if (runtimeScene.getVariables().get("EstadoJogo").getAsNumber() === 0 && runtimeScene.getVariables().get("ContagemIniciada").getAsNumber() === 1) {
    runtimeScene.getVariables().get("EstadoJogo").setNumber(1);
}
let estadoJogo = runtimeScene.getVariables().get("EstadoJogo").getAsNumber();

// ==========================================================================
// FASE A: INTERFACE DO MENU DE SELEÇÃO
// ==========================================================================
if (estadoJogo === 0) {
    const cx = larguraTela / 2;
    const cy = alturaTela / 2;
    camada.setCameraX(cx); camada.setCameraY(cy);

    espadasPlayer.forEach(e => e.hide(true));
    espadasEnemy.forEach(e => e.hide(true));
    coracoesPlayer.forEach(c => c.hide(true));
    coracoesEnemy.forEach(c => c.hide(true));
    if (textoRecomeco) textoRecomeco.setString("");

    if (textoContagem) {
        textoContagem.setString("ESCOLHA SEU LUTADOR");
        textoContagem.setScale(0.6); 
        textoContagem.setX(cx - (textoContagem.getWidth() / 2));
        textoContagem.setY(cy - 190); 
    }

    if (runtimeScene.getVariables().get("MenuAlinhado").getAsNumber() === 0) {
        if (fundoSelecao) posicionarObjeto(fundoSelecao, cx - fundoSelecao.getWidth() / 2, cy - fundoSelecao.getHeight() / 2);

        const slotsSelecao = [
            { pirata: almaTortaObj, botao: btnTorta },
            { pirata: davyBonesObj, botao: btnBones },
            { pirata: jackAndorinhaObj, botao: btnJack },
            { pirata: laffyEsticadoObj, botao: btnLaffy }
        ].filter(s => s.pirata !== undefined);

        const espacamentoX = 250; 
        const larguraTotalMenu = (slotsSelecao.length - 1) * espacamentoX;
        const startX = cx - (larguraTotalMenu / 2);

        slotsSelecao.forEach((slot, idx) => {
            let slotCenterX = startX + (idx * espacamentoX);
            posicionarObjeto(slot.pirata, slotCenterX - (slot.pirata.getWidth() / 2), cy - 40 - (slot.pirata.getHeight() / 2));
            if (slot.botao) posicionarObjeto(slot.botao, slotCenterX - (slot.botao.getWidth() / 2), cy + 120 - (slot.botao.getHeight() / 2));
        });
        runtimeScene.getVariables().get("MenuAlinhado").setNumber(1);
    }

    if (teclado.isMouseButtonPressed(0)) {
        const mX = camada.convertCoords(teclado.getMouseX(), teclado.getMouseY())[0];
        const mY = camada.convertCoords(teclado.getMouseX(), teclado.getMouseY())[1];

        let cliqueDetectado = "";
        const checarClique = (btn) => btn && mX >= btn.getX() && mX <= btn.getX() + btn.getWidth() && mY >= btn.getY() && mY <= btn.getY() + btn.getHeight();

        if (checarClique(btnTorta)) cliqueDetectado = "AlmaTorta";
        if (checarClique(btnBones)) cliqueDetectado = "DavyBones";
        if (checarClique(btnJack)) cliqueDetectado = "JackAndorinha";
        if (checarClique(btnLaffy)) cliqueDetectado = "Laffy";

        if (cliqueDetectado !== "") {
            runtimeScene.getGame().getVariables().get("PersonagemEscolhido").setString(cliqueDetectado);
            [fundoSelecao, btnJack, btnLaffy, btnTorta, btnBones].forEach(c => { if(c) { c.setX(-9000); c.setY(-9000); } });
            if (textoContagem) textoContagem.setString("");

            // ============================================================
            // CORREÇÃO: INICIA A CONTAGEM E A PREPARAÇÃO IMEDIATAMENTE
            // ============================================================
            runtimeScene.getVariables().get("EstadoJogo").setNumber(1);
            runtimeScene.getVariables().get("RodadaLuta").setNumber(1);
            runtimeScene.getVariables().get("Seguranca").setNumber(1); // Liga a barreira de preparação
            runtimeScene.getVariables().get("ContagemRecomeco").setNumber(4.0); // Tempo de "3, 2, 1..."
            runtimeScene.getVariables().get("VencedorLuta").setString("");
        }
    }
} 

// ==========================================================================
// FASE B: SISTEMA DE LUTA (COMBAT LOOP)
// ==========================================================================
else {
    let escolha = runtimeScene.getGame().getVariables().get("PersonagemEscolhido").getAsString();
    if (!escolha) escolha = "AlmaTorta"; 

    let playerChar, npcs;
    if (escolha === "Laffy") {
        playerChar = laffyEsticadoObj; npcs = [almaTortaObj, davyBonesObj, jackAndorinhaObj].filter(Boolean);
    } else if (escolha === "JackAndorinha") {
        playerChar = jackAndorinhaObj; npcs = [almaTortaObj, davyBonesObj, laffyEsticadoObj].filter(Boolean);
    } else if (escolha === "DavyBones") {
        playerChar = davyBonesObj; npcs = [almaTortaObj, jackAndorinhaObj, laffyEsticadoObj].filter(Boolean);
    } else {
        playerChar = almaTortaObj; npcs = [davyBonesObj, jackAndorinhaObj, laffyEsticadoObj].filter(Boolean);
    }

    if (runtimeScene.getVariables().get("RodadaLuta").getAsNumber() === 0) {
        runtimeScene.getVariables().get("RodadaLuta").setNumber(1); 
        runtimeScene.getVariables().get("ContagemRecomeco").setNumber(4.0); 
        runtimeScene.getVariables().get("VencedorLuta").setString(""); 
        runtimeScene.getVariables().get("Seguranca").setNumber(1); 
    }

    let rodadaAtual = runtimeScene.getVariables().get("RodadaLuta").getAsNumber();
    let tempoRecomeco = runtimeScene.getVariables().get("ContagemRecomeco").getAsNumber();
    let seguranca = runtimeScene.getVariables().get("Seguranca").getAsNumber();
    runtimeScene.getVariables().get("ultimaluta").setNumber(rodadaAtual === 3 ? 1 : 0);

    let npcChar = npcs[0];
    if (rodadaAtual === 2) npcChar = npcs[1];
    if (rodadaAtual === 3) npcChar = npcs[2];

    npcs.forEach(n => { if (n && n !== npcChar) posicionarObjeto(n, -5000, -5000); });

    if (playerChar && npcChar) {
        playerChar.setAngle(0); npcChar.setAngle(0);

        // --- SISTEMA BLINDADO DE TRANSIÇÃO E RECOMEÇO ---
        if (seguranca === 1) {
            tempoRecomeco -= dt;
            runtimeScene.getVariables().get("ContagemRecomeco").setNumber(tempoRecomeco);

            const pPhys = playerChar.getBehavior("Physics2"); const nPhys = npcChar.getBehavior("Physics2");
            if (pPhys) { pPhys.setLinearVelocityX(0); pPhys.setLinearVelocityY(0); }
            if (nPhys) { nPhys.setLinearVelocityX(0); nPhys.setLinearVelocityY(0); }

            espadasPlayer.forEach(e => e.hide(true)); espadasEnemy.forEach(e => e.hide(true));

            let vencedorSalvo = runtimeScene.getVariables().get("VencedorLuta").getAsString();

            if (vencedorSalvo === "campeao") {
                npcChar.hide(true); playerChar.hide(false);
                posicionarObjeto(playerChar, 275, 354);
                if (textoRecomeco) textoRecomeco.setString("VOCÊ VENCEU O TORNEIO!");
            } else if (tempoRecomeco > 2.5) {
                if (vencedorSalvo === "npc") {
                    playerChar.hide(true); npcChar.hide(false);
                    if (textoRecomeco) textoRecomeco.setString("O RIVAL VENCEU A RODADA!");
                } else if (vencedorSalvo === "player") {
                    npcChar.hide(true); playerChar.hide(false);
                    if (textoRecomeco) textoRecomeco.setString("VOCÊ VENCEU A RODADA!");
                } else {
                    playerChar.hide(true); npcChar.hide(true);
                    if (textoRecomeco) textoRecomeco.setString("PREPARAR...");
                }
            } else {
                // ============================================================
                // CORREÇÃO: DEIXA ELES VISÍVEIS DE FRENTE UM PRO OUTRO AQUI
                // ============================================================
                playerChar.hide(false); npcChar.hide(false);
                posicionarObjeto(playerChar, 275, 354); posicionarObjeto(npcChar, 1095, 364);
                playerChar.flipX(false); npcChar.flipX(true);

                if (textoRecomeco) {
                    if (tempoRecomeco > 1.6) textoRecomeco.setString("3");
                    else if (tempoRecomeco > 0.8) textoRecomeco.setString("2");
                    else textoRecomeco.setString("1");
                }
            }

            if (textoRecomeco) {
                textoRecomeco.setLayer("");
                textoRecomeco.setX(cameraX - (textoRecomeco.getWidth() / 2)); textoRecomeco.setY(cameraY - (textoRecomeco.getHeight() / 2));
            }

            if (tempoRecomeco <= 0) {
                if (vencedorSalvo === "campeao") {
                    runtimeScene.getGame().getVariables().get("Espadasconcluido").setNumber(1); 
                    runtimeScene.getVariables().get("RodadaLuta").setNumber(0);
                    runtimeScene.getVariables().get("Seguranca").setNumber(0);
                    runtimeScene.getVariables().get("EstadoJogo").setNumber(0);
                    runtimeScene.getGame().getSceneStack().replace("Seletor_Minigames", true);
                    return;
                }

                if (textoRecomeco) textoRecomeco.setString("");
                if (vencedorSalvo === "player") {
                    rodadaAtual += 1; runtimeScene.getVariables().get("RodadaLuta").setNumber(rodadaAtual);
                    npcChar = npcs[rodadaAtual - 1]; // Atualiza o rival
                }

                playerChar.hp = 5; playerChar.powerupTimer = 0; 
                posicionarObjeto(playerChar, 275, 354); playerChar.espadaAngulo = 0; playerChar.flipX(false); playerChar.hide(false);

                if (npcChar) {
                    npcChar.hp = 5; npcChar.powerupTimer = 0; 
                    posicionarObjeto(npcChar, 1095, 364); npcChar.espadaAngulo = 180; npcChar.flipX(true); npcChar.hide(false);
                }

                runtimeScene.getVariables().get("VencedorLuta").setString("");
                runtimeScene.getVariables().get("Seguranca").setNumber(0); 
            }
            return; 
        }

        // ==========================================
        // FLUXO NORMAL DA LUTA
        // ==========================================
        playerChar.imuneTimer -= dt; npcChar.imuneTimer -= dt;
        npcChar.clashCooldown -= dt; npcChar.cooldownDash -= dt; npcChar.duracaoDash -= dt; npcChar.aiTimer += dt;

        if (playerChar.powerupTimer > 0) {
            playerChar.powerupTimer -= dt;
            if (playerChar.powerupTimer <= 0) { while (espadasPlayer.length > 1) { let e = espadasPlayer.pop(); if (e) e.deleteFromScene(); } }
        }

        if (npcChar.powerupTimer > 0) {
            npcChar.powerupTimer -= dt;
            if (npcChar.powerupTimer <= 0) { while (espadasEnemy.length > 1) { let e = espadasEnemy.pop(); if (e) e.deleteFromScene(); } }
        }

        let playerCx = playerChar.getCenterXInScene(); let playerCy = playerChar.getCenterYInScene();
        let npcCx = npcChar.getCenterXInScene(); let npcCy = npcChar.getCenterYInScene();

        // --- UI DOS CORAÇÕES ---
        let topoY = cameraY - (alturaTela / 2) + 30;
        coracoesPlayer.forEach((c, i) => { if (c) { c.setLayer(""); c.setX(cameraX - (larguraTela / 2) + 30 + (i * 45)); c.setY(topoY); c.setZOrder(100); c.hide(i >= playerChar.hp); } });
        coracoesEnemy.forEach((c, i) => { if (c) { c.setLayer(""); c.setX(cameraX + (larguraTela / 2) - 60 - (i * 45)); c.setY(topoY); c.setZOrder(100); c.hide(i >= npcChar.hp); } });

        // ==========================================
        // MOTOR DE HABILIDADES ÚNICAS DAS ESPADAS
        // ==========================================
        const processarHabilidades = (char) => {
            char.timerHabilidade += dt;
            let raioAtual = char.raioBase;
            let velGiroAtual = char.velGiroBase;

            if (char.tipoPersonagem === "Laffy") {
                if (char.timerHabilidade > 1.2) {
                    char.sentidoLaffy *= -1;
                    char.espadaSentido = char.sentidoLaffy;
                    char.timerHabilidade = 0;
                }
                if (char.timerHabilidade > 0.8 && char.timerHabilidade < 1.0) {
                    raioAtual += 55;
                }
            } else if (char.tipoPersonagem === "AlmaTorta") {
                raioAtual += Math.sin(char.timerHabilidade * 5) * 25;
            }
            return { raio: raioAtual, velGiro: velGiroAtual };
        };

        let habPlayer = processarHabilidades(playerChar);
        let habNPC = processarHabilidades(npcChar);

        // ==========================================
        // SPAWN E COLISÃO DO POWER-UP
        // ==========================================
        if (runtimeScene.meuCronometroPowerup === undefined) runtimeScene.meuCronometroPowerup = 0;
        runtimeScene.meuCronometroPowerup += dt;
        
        if (runtimeScene.meuCronometroPowerup > 6 && powerups.length < 1) {
            let novoPowerup = runtimeScene.createObject("powerup");
            if (novoPowerup) {
                novoPowerup.setX(cameraX - (larguraTela / 2) + 160 + Math.random() * (larguraTela - 320));
                novoPowerup.setY(cameraY - (alturaTela / 2) + 160 + Math.random() * (alturaTela - 320));
                novoPowerup.setLayer(playerChar.getLayer()); novoPowerup.setZOrder(Math.max(1, playerChar.getZOrder() - 1));
            }
            runtimeScene.meuCronometroPowerup = 0; 
        }

        powerups.forEach(pw => {
            if (!pw) return;
            let pwRadius = Math.max(pw.getWidth(), pw.getHeight(), 32) / 2;
            let pwCx = pw.getCenterXInScene(); let pwCy = pw.getCenterYInScene();

            if (Math.hypot(pwCx - playerCx, pwCy - playerCy) < (pwRadius + 25)) {
                playerChar.powerupTimer = 3.0; 
                runtimeScene.getSoundManager().playSound("powerup_effect.mp3", false, 75, 1);
                if (espadasPlayer.length < 3) {
                    let e1 = runtimeScene.createObject("espada_player"); let e2 = runtimeScene.createObject("espada_player");
                    if (e1 && e2) { e1.setX(playerCx); e1.setY(playerCy); e2.setX(playerCx); e2.setY(playerCy); espadasPlayer.push(e1, e2); }
                }
                pw.deleteFromScene();
            } 
            else if (Math.hypot(pwCx - npcCx, pwCy - npcCy) < (pwRadius + 25)) {
                npcChar.powerupTimer = 3.0; 
                runtimeScene.getSoundManager().playSound("powerup_effect.mp3", false, 75, 1);
                if (espadasEnemy.length < 3) {
                    let e1 = runtimeScene.createObject("espada_enemy"); let e2 = runtimeScene.createObject("espada_enemy");
                    if (e1 && e2) { e1.setX(npcCx); e1.setY(npcCy); e2.setX(npcCx); e2.setY(npcCy); espadasEnemy.push(e1, e2); }
                }
                pw.deleteFromScene();
            }
        });

        // ==========================================
        // CONTROLADORES DE MOVIMENTO (PLAYER & NPC)
        // ==========================================
        let moveX = 0; let moveY = 0;
        if (teclado.isKeyPressed(37)) moveX = -1; if (teclado.isKeyPressed(39)) moveX = 1;  
        if (teclado.isKeyPressed(38)) moveY = -1; if (teclado.isKeyPressed(40)) moveY = 1;  

        if (moveX !== 0 || moveY !== 0) {
            let tam = Math.hypot(moveX, moveY); moveX /= tam; moveY /= tam;
            if (moveX < 0) playerChar.flipX(true); if (moveX > 0) playerChar.flipX(false);
        }

        playerChar.impulsoX *= 0.85; playerChar.impulsoY *= 0.85; 
        if (Math.abs(playerChar.impulsoX) < 1) playerChar.impulsoX = 0;
        if (Math.abs(playerChar.impulsoY) < 1) playerChar.impulsoY = 0;

        let velFinalX = (moveX * velocidadePlayer) + playerChar.impulsoX;
        let velFinalY = (moveY * velocidadePlayer) + playerChar.impulsoY;

        const playerPhys = playerChar.getBehavior("Physics2");
        if (playerPhys) { playerPhys.setLinearVelocityX(velFinalX); playerPhys.setLinearVelocityY(velFinalY); } 
        else { playerChar.setX(playerChar.getX() + (velFinalX * dt)); playerChar.setY(playerChar.getY() + (velFinalY * dt)); }

        // Movimento NPC (IA)
        if (npcChar.aiTimer > 0.8) {
            npcChar.aiTimer = 0;
            if (powerups.length > 0 && espadasEnemy.length < 3) { npcChar.aiEstado = "buscar_item"; } 
            else {
                let dist = Math.hypot(playerCx - npcCx, playerCy - npcCy);
                npcChar.aiEstado = (dist < 180 && Math.random() < 0.65) ? "flanquear" : "perseguir";
            }
            npcChar.direcaoGiroFlanco = Math.random() < 0.5 ? 1 : -1;
        }

        let npcMoveX = 0; let npcMoveY = 0;
        if (npcChar.aiEstado === "buscar_item" && powerups[0]) {
            npcMoveX = powerups[0].getCenterXInScene() - npcCx; npcMoveY = powerups[0].getCenterYInScene() - npcCy;
        } else {
            let dxParaPlayer = playerCx - npcCx; let dyParaPlayer = playerCy - npcCy;
            let dist = Math.hypot(dxParaPlayer, dyParaPlayer);

            if (npcChar.aiEstado === "flanquear" && dist > 50) {
                let aproxX = dxParaPlayer / dist; let aproxY = dyParaPlayer / dist;
                npcMoveX = (aproxX * 0.6) + (-aproxY * npcChar.direcaoGiroFlanco * 0.4);
                npcMoveY = (aproxY * 0.6) + (aproxX * npcChar.direcaoGiroFlanco * 0.4);
            } else { npcMoveX = dxParaPlayer; npcMoveY = dyParaPlayer; }

            if (dist < 220 && dist > 70 && npcChar.cooldownDash <= 0 && npcChar.impulsoX === 0 && npcChar.impulsoY === 0) {
                npcChar.duracaoDash = 0.35; npcChar.cooldownDash = 3.5;    
            }
        }

        let magnitudeNpc = Math.hypot(npcMoveX, npcMoveY);
        if (magnitudeNpc > 0) {
            npcMoveX /= magnitudeNpc; npcMoveY /= magnitudeNpc;
            if (npcMoveX < 0) npcChar.flipX(true); if (npcMoveX > 0) npcChar.flipX(false);
        }

        let velCalculadaNPC = npcChar.duracaoDash > 0 ? velocidadeNPCBase * 2.1 : velocidadeNPCBase;
        npcChar.impulsoX *= 0.85; npcChar.impulsoY *= 0.85;
        if (Math.abs(npcChar.impulsoX) < 1) npcChar.impulsoX = 0; if (Math.abs(npcChar.impulsoY) < 1) npcChar.impulsoY = 0;

        let npcVelFinalX = (npcMoveX * velCalculadaNPC) + npcChar.impulsoX;
        let npcVelFinalY = (npcMoveY * velCalculadaNPC) + npcChar.impulsoY;

        const npcPhys = npcChar.getBehavior("Physics2");
        if (npcPhys) { npcPhys.setLinearVelocityX(npcVelFinalX); npcPhys.setLinearVelocityY(npcVelFinalY); } 
        else { npcChar.setX(npcChar.getX() + (npcVelFinalX * dt)); npcChar.setY(npcChar.getY() + (npcVelFinalY * dt)); }

        // ==========================================
        // APLICAÇÃO DAS LÂMINAS E ESCALAS
        // ==========================================
        playerCx = playerChar.getCenterXInScene(); playerCy = playerChar.getCenterYInScene();
        npcCx = npcChar.getCenterXInScene(); npcCy = npcChar.getCenterYInScene();

        playerChar.espadaAngulo += habPlayer.velGiro * playerChar.espadaSentido * dt;
        let totEspP = espadasPlayer.length || 1; 
        let raioAtualP = habPlayer.raio + (totEspP > 1 ? 25 : 0);
        
        espadasPlayer.forEach((espada, i) => {
            if (!espada) return;
            espada.hide(false); espada.setLayer(playerChar.getLayer()); espada.setZOrder(playerChar.getZOrder() + 3);
            espada.setScale(playerChar.escalaEspada); 

            let rad = (playerChar.espadaAngulo + ((360 / totEspP) * i)) * Math.PI / 180;
            espada.setX(playerCx + Math.cos(rad) * raioAtualP); espada.setY(playerCy + Math.sin(rad) * raioAtualP);
            espada.setAngle((playerChar.espadaAngulo + ((360 / totEspP) * i)) + 90);
        });

        npcChar.espadaAngulo += habNPC.velGiro * npcChar.espadaSentido * dt;
        let totEspE = espadasEnemy.length || 1; 
        let raioAtualE = habNPC.raio + (totEspE > 1 ? 25 : 0);

        espadasEnemy.forEach((espada, i) => {
            if (!espada) return;
            espada.hide(false); espada.setLayer(npcChar.getLayer()); espada.setZOrder(npcChar.getZOrder() + 3);
            espada.setScale(npcChar.escalaEspada); 

            let rad = (npcChar.espadaAngulo + ((360 / totEspE) * i)) * Math.PI / 180;
            espada.setX(npcCx + Math.cos(rad) * raioAtualE); espada.setY(npcCy + Math.sin(rad) * raioAtualE);
            espada.setAngle((npcChar.espadaAngulo + ((360 / totEspE) * i)) + 90);
        });

        // ==========================================
        // SISTEMA DE COMBATE, CHOQUE E DANOS
        // ==========================================
        playerChar.hide(playerChar.imuneTimer > 0 && Math.floor(Date.now() / 80) % 2 === 0);
        npcChar.hide(npcChar.imuneTimer > 0 && Math.floor(Date.now() / 80) % 2 === 0);

        let distChoqueReal = 46 * ((playerChar.escalaEspada + npcChar.escalaEspada) / 2);

        if (npcChar.clashCooldown <= 0 && espadasPlayer.length > 0 && espadasEnemy.length > 0) {
            let choque = false;
            for (let eP of espadasPlayer) {
                for (let eE of espadasEnemy) {
                    if (eP && eE && Math.hypot(eP.getX() - eE.getX(), eP.getY() - eE.getY()) < distChoqueReal) { choque = true; break; }
                }
                if (choque) break;
            }
            if (choque) {
                playerChar.espadaSentido *= -1; npcChar.espadaSentido *= -1;    
                npcChar.clashCooldown = 0.25;   
                runtimeScene.getSoundManager().playSound("colisão_espada.mp3", false, 75, 1);
            }
        }

        if (npcChar.imuneTimer <= 0) {
            for (let eP of espadasPlayer) {
                if (eP && Math.hypot(eP.getX() - npcCx, eP.getY() - npcCy) < (38 * playerChar.escalaEspada)) {
                    npcChar.hp--;
                    runtimeScene.getSoundManager().playSound("snd_hit.mp3", false, 75, 1);
                    npcChar.imuneTimer = 0.8; 
                    let angleHit = Math.atan2(npcCy - playerCy, npcCx - playerCx);
                    npcChar.impulsoX = Math.cos(angleHit) * 500; npcChar.impulsoY = Math.sin(angleHit) * 500; 
                    break; 
                }
            }
        }

        if (playerChar.imuneTimer <= 0) {
            for (let eE of espadasEnemy) {
                if (eE && Math.hypot(eE.getX() - playerCx, eE.getY() - playerCy) < (38 * npcChar.escalaEspada)) {
                    playerChar.hp--;
                    runtimeScene.getSoundManager().playSound("snd_hit.mp3", false, 75, 1);
                    playerChar.imuneTimer = 0.8; 
                    let angleHit = Math.atan2(playerCy - npcCy, playerCx - npcCx);
                    playerChar.impulsoX = Math.cos(angleHit) * 500; playerChar.impulsoY = Math.sin(angleHit) * 500; 
                    break; 
                }
            }
        }

        // ==========================================
        // FINAL DA RODADA
        // ==========================================
        if (playerChar.hp <= 0 || npcChar.hp <= 0) {
            runtimeScene.getVariables().get("Seguranca").setNumber(1);
            runtimeScene.getVariables().get("ContagemRecomeco").setNumber(4.0);

            if (playerChar.hp <= 0) {
                runtimeScene.getVariables().get("VencedorLuta").setString("npc");
            } else {
                if (runtimeScene.getVariables().get("ultimaluta").getAsNumber() === 1) {
                    runtimeScene.getVariables().get("VencedorLuta").setString("campeao");
                } else {
                    runtimeScene.getVariables().get("VencedorLuta").setString("player");
                }
            }

            while(espadasPlayer.length > 1) { let e = espadasPlayer.pop(); if(e) e.deleteFromScene(); }
            while(espadasEnemy.length > 1) { let e = espadasEnemy.pop(); if(e) e.deleteFromScene(); }
        }
    }
}
};
gdjs.luta_32de_32espadasCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{
}

}


{


gdjs.luta_32de_32espadasCode.userFunc0x994e78(runtimeScene);

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
{gdjs.evtTools.sound.playSoundOnChannel(runtimeScene, "piratas caribe.mp3", 0, true, 100, 1);
}
{gdjs.evtTools.sound.preloadMusic(runtimeScene, "colisão_espada.mp3");
}
{gdjs.evtTools.sound.preloadMusic(runtimeScene, "snd_hit.mp3");
}
{gdjs.evtTools.sound.preloadMusic(runtimeScene, "powerup_effect.mp3");
}
}

}


};

gdjs.luta_32de_32espadasCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.luta_32de_32espadasCode.GDmarObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDmarObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDarenaObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDarenaObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDplayerObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDplayerObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDDavyBonesObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDDavyBonesObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDespada_9595playerObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDespada_9595playerObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDespada_9595enemyObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDespada_9595enemyObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDcoracao_9595PlayerObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDcoracao_9595PlayerObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDcoracao_9595enemyObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDcoracao_9595enemyObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDbarreiraObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDbarreiraObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDpowerupObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDpowerupObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDJackAndorinhaObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDJackAndorinhaObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDLaffyObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDLaffyObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDrecomecoObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDrecomecoObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDsele_95231_95227oObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDsele_95231_95227oObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227ojackObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227ojackObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227olaffyObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227olaffyObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227otortaObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227otortaObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227obonesObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227obonesObjects2.length = 0;

gdjs.luta_32de_32espadasCode.eventsList0(runtimeScene);
gdjs.luta_32de_32espadasCode.GDmarObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDmarObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDarenaObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDarenaObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDplayerObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDplayerObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDDavyBonesObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDDavyBonesObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDespada_9595playerObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDespada_9595playerObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDespada_9595enemyObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDespada_9595enemyObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDcoracao_9595PlayerObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDcoracao_9595PlayerObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDcoracao_9595enemyObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDcoracao_9595enemyObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDbarreiraObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDbarreiraObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDpowerupObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDpowerupObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDJackAndorinhaObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDJackAndorinhaObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDLaffyObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDLaffyObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDrecomecoObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDrecomecoObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDsele_95231_95227oObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDsele_95231_95227oObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227ojackObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227ojackObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227olaffyObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227olaffyObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227otortaObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227otortaObjects2.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227obonesObjects1.length = 0;
gdjs.luta_32de_32espadasCode.GDbot_95227obonesObjects2.length = 0;


return;

}

gdjs['luta_32de_32espadasCode'] = gdjs.luta_32de_32espadasCode;
