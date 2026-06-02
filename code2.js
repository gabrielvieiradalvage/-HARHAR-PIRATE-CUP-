gdjs.futebolCode = {};
gdjs.futebolCode.localVariables = [];
gdjs.futebolCode.idToCallbackMap = new Map();
gdjs.futebolCode.GDbolaObjects1= [];
gdjs.futebolCode.GDbolaObjects2= [];
gdjs.futebolCode.GDGolObjects1= [];
gdjs.futebolCode.GDGolObjects2= [];
gdjs.futebolCode.GDzonaObjects1= [];
gdjs.futebolCode.GDzonaObjects2= [];
gdjs.futebolCode.GDTextoPlacarObjects1= [];
gdjs.futebolCode.GDTextoPlacarObjects2= [];
gdjs.futebolCode.GDzona2Objects1= [];
gdjs.futebolCode.GDzona2Objects2= [];
gdjs.futebolCode.GDCronometroObjects1= [];
gdjs.futebolCode.GDCronometroObjects2= [];
gdjs.futebolCode.GDContagemObjects1= [];
gdjs.futebolCode.GDContagemObjects2= [];
gdjs.futebolCode.GDJogadorObjects1= [];
gdjs.futebolCode.GDJogadorObjects2= [];
gdjs.futebolCode.GDLaffyObjects1= [];
gdjs.futebolCode.GDLaffyObjects2= [];
gdjs.futebolCode.GDJackAndorinhaObjects1= [];
gdjs.futebolCode.GDJackAndorinhaObjects2= [];
gdjs.futebolCode.GDDavyBonesObjects1= [];
gdjs.futebolCode.GDDavyBonesObjects2= [];
gdjs.futebolCode.GDareiaObjects1= [];
gdjs.futebolCode.GDareiaObjects2= [];
gdjs.futebolCode.GDblocoObjects1= [];
gdjs.futebolCode.GDblocoObjects2= [];
gdjs.futebolCode.GDagua_9595verdeObjects1= [];
gdjs.futebolCode.GDagua_9595verdeObjects2= [];
gdjs.futebolCode.GDNewTiledSpriteObjects1= [];
gdjs.futebolCode.GDNewTiledSpriteObjects2= [];
gdjs.futebolCode.GDlinhaObjects1= [];
gdjs.futebolCode.GDlinhaObjects2= [];
gdjs.futebolCode.GDbot_95227ojackObjects1= [];
gdjs.futebolCode.GDbot_95227ojackObjects2= [];
gdjs.futebolCode.GDsele_95231_95227oObjects1= [];
gdjs.futebolCode.GDsele_95231_95227oObjects2= [];
gdjs.futebolCode.GDbot_95227olaffyObjects1= [];
gdjs.futebolCode.GDbot_95227olaffyObjects2= [];
gdjs.futebolCode.GDbot_95227otortaObjects1= [];
gdjs.futebolCode.GDbot_95227otortaObjects2= [];
gdjs.futebolCode.GDbot_95227obonesObjects1= [];
gdjs.futebolCode.GDbot_95227obonesObjects2= [];
gdjs.futebolCode.GDbolhaObjects1= [];
gdjs.futebolCode.GDbolhaObjects2= [];
gdjs.futebolCode.GDbolhasObjects1= [];
gdjs.futebolCode.GDbolhasObjects2= [];
gdjs.futebolCode.GDalga_9595verdeObjects1= [];
gdjs.futebolCode.GDalga_9595verdeObjects2= [];


gdjs.futebolCode.userFunc0xa357b8 = function GDJSInlineCode(runtimeScene) {
"use strict";
const almaTortaObj = runtimeScene.getObjects("Jogador")[0]; 
const davyBonesObj = runtimeScene.getObjects("DavyBones")[0];
const jackAndorinhaObj = runtimeScene.getObjects("JackAndorinha")[0];
const laffyEsticadoObj = runtimeScene.getObjects("Laffy")[0];

const fundoSelecao = runtimeScene.getObjects("seleção")[0];
const btnJack = runtimeScene.getObjects("botãojack")[0];
const btnLaffy = runtimeScene.getObjects("botãolaffy")[0];
const btnTorta = runtimeScene.getObjects("botãotorta")[0];
const btnBones = runtimeScene.getObjects("botãobones")[0];

const bola = runtimeScene.getObjects("bola")[0];
const zonaDireita = runtimeScene.getObjects("zona")[0];  
const zonaEsquerda = runtimeScene.getObjects("zona2")[0]; 
const textoCronometro = runtimeScene.getObjects("Cronometro")[0]; 
const textoContagem = runtimeScene.getObjects("Contagem")[0]; 
const blocos = runtimeScene.getObjects("bloco"); 

const teclado = runtimeScene.getGame().getInputManager();
const dt = runtimeScene.getTimeManager().getElapsedTime() / 1000; 

const camada = runtimeScene.getLayer("");
const larguraTela = runtimeScene.getGame().getGameResolutionWidth();
const alturaTela = runtimeScene.getGame().getGameResolutionHeight();

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

    if (bola) bola.hide(true);
    if (textoCronometro) textoCronometro.setString("");

    if (textoContagem) {
        textoContagem.setString("ESCOLHA SEU JOGADOR");
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
            if (bola) bola.hide(false);

            runtimeScene.getVariables().get("EstadoJogo").setNumber(1);
            runtimeScene.getVariables().get("RodadaFutebol").setNumber(1);
            runtimeScene.getVariables().get("WinsPlayer").setNumber(0);
            runtimeScene.getVariables().get("TempoFimRodada").setNumber(0);
            runtimeScene.getVariables().get("TimerIniciado").setNumber(0);
            
            runtimeScene.getVariables().get("GolTravado").setNumber(1);
            runtimeScene.getVariables().get("TempoReinicio").setNumber(2.0);
            runtimeScene.getVariables().get("MensagemTopo").setString("PREPARAR...");
        }
    }
} 

// ==========================================================================
// FASE B: SISTEMA DE JOGO (FUTEBOL LOOP)
// ==========================================================================
else {
    let escolha = runtimeScene.getGame().getVariables().get("PersonagemEscolhido").getAsString();
    if (!escolha) escolha = "AlmaTorta"; 

    let playerAtual, npcs;
    let nomePlayerUI = "Capitão Alma-Torta";

    if (escolha === "Laffy") {
        playerAtual = laffyEsticadoObj; nomePlayerUI = "Laffy, o Esticado";
        npcs = [almaTortaObj, davyBonesObj, jackAndorinhaObj].filter(Boolean);
    } else if (escolha === "JackAndorinha") {
        playerAtual = jackAndorinhaObj; nomePlayerUI = "Jack Andorinha";
        npcs = [almaTortaObj, davyBonesObj, laffyEsticadoObj].filter(Boolean);
    } else if (escolha === "DavyBones") {
        playerAtual = davyBonesObj; nomePlayerUI = "Davy Bones";
        npcs = [almaTortaObj, jackAndorinhaObj, laffyEsticadoObj].filter(Boolean);
    } else {
        playerAtual = almaTortaObj; 
        npcs = [davyBonesObj, jackAndorinhaObj, laffyEsticadoObj].filter(Boolean);
    }

    let rodadaAtual = runtimeScene.getVariables().get("RodadaFutebol").getAsNumber();
    if (rodadaAtual === 0) rodadaAtual = 1;
    let tempoFimRodada = runtimeScene.getVariables().get("TempoFimRodada").getAsNumber();

    let npcAtual = npcs[0];
    if (rodadaAtual === 2 && npcs.length > 1) npcAtual = npcs[1];
    if (rodadaAtual === 3 && npcs.length > 2) npcAtual = npcs[2];

    let nomeRivalUI = "Rival";
    let velocidadCorrida = 300; 
    let bonusAlcanceChute = 0;  
    let tempoJogo = runtimeScene.getVariables().get("TempoRestanteFutebol").getAsNumber();

    if (npcAtual === davyBonesObj) {
        nomeRivalUI = "Davy Bones"; velocidadCorrida = 330; bonusAlcanceChute = 0;
    } else if (npcAtual === jackAndorinhaObj) {
        nomeRivalUI = "Jack Andorinha"; velocidadCorrida = 250 + Math.sin(tempoJogo * 6) * 110; bonusAlcanceChute = 0;
    } else if (npcAtual === laffyEsticadoObj) {
        nomeRivalUI = "Laffy, o Esticado"; velocidadCorrida = 340; bonusAlcanceChute = 40;
    } else if (npcAtual === almaTortaObj) {
        nomeRivalUI = "Capitão Alma-Torta"; velocidadCorrida = 335; bonusAlcanceChute = 10;
    }

    npcs.forEach(n => { if (n && n !== npcAtual) posicionarObjeto(n, -5000, -5000); });

    let cooldownChute = runtimeScene.getVariables().get("CooldownChute").getAsNumber();
    if (cooldownChute > 0) { cooldownChute -= dt; runtimeScene.getVariables().get("CooldownChute").setNumber(cooldownChute); }

    // ==========================================
    // 2. SISTEMA DE CÂMERA DINÂMICA
    // ==========================================
    if (playerAtual) {
        const layer = runtimeScene.getLayer("");
        const cameraSpeed = 0.1; 
        const alturaOffset = 200;  
        const zoom = 0.5;         
        const limiteChaoY = 200;   
        layer.setCameraZoom(zoom);

        const targetX = playerAtual.getCenterXInScene();
        let targetY = playerAtual.getCenterYInScene() - alturaOffset;
        if (targetY > limiteChaoY) targetY = limiteChaoY;

        layer.setCameraX(layer.getCameraX() + (targetX - layer.getCameraX()) * cameraSpeed);
        layer.setCameraY(layer.getCameraY() + (targetY - layer.getCameraY()) * cameraSpeed);
    }

    let golTravado = runtimeScene.getVariables().get("GolTravado").getAsNumber();

    // ==========================================
    // 3. FASE DE PREPARAÇÃO E FIM DE RODADA
    // ==========================================
    if (tempoFimRodada > 0) {
        tempoFimRodada -= dt;
        runtimeScene.getVariables().get("TempoFimRodada").setNumber(tempoFimRodada);

        if (bola) posicionarObjeto(bola, 731, 200);
        if (playerAtual) { posicionarObjeto(playerAtual, 300, 200); playerAtual.flipX(false); }
        if (npcAtual) { posicionarObjeto(npcAtual, 1160, 200); npcAtual.flipX(true); }

        if (textoContagem) textoContagem.setString(runtimeScene.getVariables().get("TextoVencedorRodada").getAsString());

        if (tempoFimRodada <= 0) {
            if (textoContagem) textoContagem.setString("");
            if (rodadaAtual < 3) {
                runtimeScene.getVariables().get("RodadaFutebol").setNumber(rodadaAtual + 1);
                runtimeScene.getVariables().get("TempoRestanteFutebol").setNumber(30); 
                runtimeScene.getVariables().get("PlacarPlayer").setNumber(0);
                runtimeScene.getVariables().get("PlacarNPC").setNumber(0);
                runtimeScene.getVariables().get("TimerIniciado").setNumber(0); 
                
                runtimeScene.getVariables().get("TempoReinicio").setNumber(2.0);
                runtimeScene.getVariables().get("GolTravado").setNumber(1);
                runtimeScene.getVariables().get("MensagemTopo").setString("PREPARAR...");
            } else {
                let wPlayer = runtimeScene.getVariables().get("WinsPlayer").getAsNumber();
                if (wPlayer >= 2) {
                    runtimeScene.getGame().getVariables().get("ResultadoFutebol").setString(nomePlayerUI + " Venceu o Torneio!");
                    runtimeScene.getGame().getVariables().get("Futebolconcluido").setNumber(1);
                } else {
                    runtimeScene.getGame().getVariables().get("ResultadoFutebol").setString("Os Rivais Venceram o Torneio!");
                }
                runtimeScene.getVariables().get("RodadaFutebol").setNumber(0); 
                runtimeScene.getVariables().get("EstadoJogo").setNumber(0);
                
                runtimeScene.getGame().getSceneStack().replace("Seletor_Minigames", true);
                return;
            }
        }
    } 
    
    let tempoReinicio = runtimeScene.getVariables().get("TempoReinicio").getAsNumber();
    if (tempoReinicio > 0 && tempoFimRodada <= 0) {
        tempoReinicio -= dt;
        runtimeScene.getVariables().get("TempoReinicio").setNumber(tempoReinicio);

        if (bola) posicionarObjeto(bola, 731, 200);
        if (playerAtual) { posicionarObjeto(playerAtual, 300, 200); playerAtual.flipX(false); }
        if (npcAtual) { posicionarObjeto(npcAtual, 1160, 200); npcAtual.flipX(true); }

        if (textoContagem) {
            let msgTopo = runtimeScene.getVariables().get("MensagemTopo").getAsString();
            if (tempoReinicio > 1.5) textoContagem.setString(msgTopo);
            else if (tempoReinicio > 1.0) textoContagem.setString("3");
            else if (tempoReinicio > 0.5) textoContagem.setString("2");
            else if (tempoReinicio > 0.0) textoContagem.setString("1");
        }
    }
    else if (golTravado === 1 && tempoFimRodada <= 0) {
        runtimeScene.getVariables().get("GolTravado").setNumber(0);
        if (textoContagem) textoContagem.setString("JÁ!");
        runtimeScene.getVariables().get("TempoJa").setNumber(0.8); 
    }

    let tempoJa = runtimeScene.getVariables().get("TempoJa").getAsNumber();
    if (tempoJa > 0) {
        tempoJa -= dt;
        runtimeScene.getVariables().get("TempoJa").setNumber(tempoJa);
        if (tempoJa <= 0 && textoContagem && runtimeScene.getVariables().get("GolTravado").getAsNumber() === 0) {
            textoContagem.setString("");
        }
    }

    if (tempoFimRodada <= 0) {

        // ==========================================
        // 4. MOVIMENTO DO JOGADOR VIA CÓDIGO (FIXED)
        // ==========================================
        if (playerAtual) {
            const playerPhys = playerAtual.getBehavior("Physics2");
            if (playerPhys) {
                playerPhys.setSleepingAllowed(false);
                let vX = playerPhys.getLinearVelocityX();
                let vY = playerPhys.getLinearVelocityY();
                let noChaoPlayer = Math.abs(vY) < 15; 
                let velocidadePlayer = 380; 

                if (golTravado === 0) {
                    if (teclado.isKeyPressed(37)) { 
                        playerPhys.setLinearVelocityX(-velocidadePlayer);
                        playerAtual.flipX(true); 
                    } else if (teclado.isKeyPressed(39)) { 
                        playerPhys.setLinearVelocityX(velocidadePlayer);
                        playerAtual.flipX(false); 
                    } else {
                        playerPhys.setLinearVelocityX(vX * 0.85); 
                    }

                    if (teclado.isKeyPressed(38) && noChaoPlayer) { 
                        playerPhys.setLinearVelocityY(-650); 
                        runtimeScene.getSoundManager().playSound("som de pulo.mp3", false, 50, 1);
                    }
                } else {
                    playerPhys.setLinearVelocityX(vX * 0.85); 
                }
            }
        }

        // ==========================================
        // 5. INTELIGÊNCIA ARTIFICIAL DOS RIVAIS
        // ==========================================
        if (npcAtual && bola) {
            const forcaPulo = -620; 
            const tempoDeEspera = 0.8; 
            const npcPhys = npcAtual.getBehavior("Physics2");
            const bolaPhys = bola.getBehavior("Physics2"); 
            
            if (npcPhys && bolaPhys) {
                npcPhys.setSleepingAllowed(false);
                const npcX = npcAtual.getCenterXInScene();
                const npcY = npcAtual.getCenterYInScene();
                const bolaX = bola.getCenterXInScene();
                const bolaY = bola.getCenterYInScene();
                const vX = npcPhys.getLinearVelocityX();
                const vY = npcPhys.getLinearVelocityY();
                
                if (runtimeScene.getVariables().get("NpcTimerPuloIniciado").getAsNumber() === 0) {
                    runtimeScene.getVariables().get("NpcTimerPulo").setNumber(0);
                    runtimeScene.getVariables().get("NpcTimerPuloIniciado").setNumber(1);
                }

                let npcTimerPulo = runtimeScene.getVariables().get("NpcTimerPulo").getAsNumber();
                npcTimerPulo += dt;
                runtimeScene.getVariables().get("NpcTimerPulo").setNumber(npcTimerPulo);
                
                if (golTravado === 0) {
                    if (bolaX > npcX + 20) { 
                        npcPhys.setLinearVelocityX(velocidadCorrida); 
                        npcAtual.flipX(false); 
                    } else if (bolaX < npcX - 20) { 
                        npcPhys.setLinearVelocityX(-velocidadCorrida); 
                        npcAtual.flipX(true); 
                    } else { 
                        npcPhys.setLinearVelocityX(vX * 0.3); 
                    } 
                }

                const noChao = Math.abs(vY) < 12; 
                let executouPulo = false;
                let bolaAlinhadaX = (Math.abs(bolaX - npcX) < 40); 
                let bolaPertoDaCabecaY = (bolaY > npcY - 130 && bolaY < npcY - 40);

                if (bolaAlinhadaX && bolaPertoDaCabecaY && noChao && npcTimerPulo >= tempoDeEspera && golTravado === 0) {
                    npcPhys.setLinearVelocityY(forcaPulo);
                    runtimeScene.getVariables().get("NpcTimerPulo").setNumber(0); 
                    executouPulo = true;
                }

                if (!executouPulo && noChao && npcTimerPulo >= tempoDeEspera && golTravado === 0) {
                    blocos.forEach(bloco => {
                        let dX = bloco.getCenterXInScene() - npcX;
                        let indoDireita = (vX > 0 && dX > 40 && dX < 150);
                        let indoEsquerda = (vX < 0 && dX < -40 && dX > -150);

                        if (indoDireita || indoEsquerda) {
                            if (Math.abs(bloco.getY() - npcY) < 120) {
                                npcPhys.setLinearVelocityY(forcaPulo);
                                runtimeScene.getVariables().get("NpcTimerPulo").setNumber(0);
                            }
                        }
                    });
                }
                if (!noChao && vY > -50) npcPhys.setLinearVelocityY(vY + 20);
            }
        }

        // ==========================================
        // 6. SISTEMA DE GOL, PLACAR E RESET
        // ==========================================
        if (bola && zonaDireita && zonaEsquerda && playerAtual && npcAtual) {
            const zDireitaPhys = zonaDireita.getBehavior("Physics2");
            const zEsquerdaPhys = zonaEsquerda.getBehavior("Physics2");
            if (zDireitaPhys && typeof zDireitaPhys.setSensor === "function") zDireitaPhys.setSensor(true);
            if (zEsquerdaPhys && typeof zEsquerdaPhys.setSensor === "function") zEsquerdaPhys.setSensor(true);

            const golNoLadoDireito = gdjs.RuntimeObject.collisionTest(bola, zonaDireita);
            const golNoLadoEsquerdo = gdjs.RuntimeObject.collisionTest(bola, zonaEsquerda);

            if ((golNoLadoDireito || golNoLadoEsquerdo) && golTravado === 0) {
                runtimeScene.getVariables().get("GolTravado").setNumber(1); 
                runtimeScene.getSoundManager().playSoundOnChannel("gol.mp3", 2, false, 85, 1);

                if (golNoLadoDireito) { runtimeScene.getVariables().get("PlacarPlayer").add(1); } 
                else { runtimeScene.getVariables().get("PlacarNPC").add(1); }
                
                runtimeScene.getVariables().get("TempoReinicio").setNumber(2.0);
                runtimeScene.getVariables().get("MensagemTopo").setString("GOL!");
            }
        }

        // ==========================================
        // 7. CHUTE E COLISÃO DA BOLA
        // ==========================================
        if (bola && golTravado === 0) {
            const bolaPhys = bola.getBehavior("Physics2");
            if (bolaPhys) {
                bolaPhys.setRestitution(0.8); 
                let bolaCx = bola.getCenterXInScene();
                let bolaCy = bola.getCenterYInScene();

                if (playerAtual && gdjs.RuntimeObject.collisionTest(bola, playerAtual)) {
                    const playerPhys = playerAtual.getBehavior("Physics2");
                    if (playerPhys) {
                        let dx = bolaCx - playerAtual.getCenterXInScene();
                        let dy = bolaCy - playerAtual.getCenterYInScene();
                        let dist = Math.hypot(dx, dy) || 1;
                        let pBonus = (playerAtual === laffyEsticadoObj) ? 40 : 0;

                        if (dist < 45 + pBonus) {
                            bolaPhys.setLinearVelocityX(((dx / dist) * 380) + (playerPhys.getLinearVelocityX() * 0.4));
                            bolaPhys.setLinearVelocityY(((dy / dist) * 250) - 180);
                            bolaPhys.setAngularVelocity(playerPhys.getLinearVelocityX() * 0.6);

                            if (cooldownChute <= 0) {
                                runtimeScene.getSoundManager().playSoundOnChannel("chute.mp3", 3, false, 70, 1);
                                runtimeScene.getVariables().get("CooldownChute").setNumber(0.4); 
                            }
                        }
                    }
                }

                if (npcAtual && gdjs.RuntimeObject.collisionTest(bola, npcAtual)) {
                    const npcPhys = npcAtual.getBehavior("Physics2");
                    if (npcPhys) {
                        let dx = bolaCx - npcAtual.getCenterXInScene();
                        let dy = bolaCy - npcAtual.getCenterYInScene();
                        let dist = Math.hypot(dx, dy) || 1;

                        if (dist < 45 + bonusAlcanceChute) {
                            bolaPhys.setLinearVelocityX(((dx / dist) * 380) + (npcPhys.getLinearVelocityX() * 0.4));
                            bolaPhys.setLinearVelocityY(((dy / dist) * 250) - 180);
                            bolaPhys.setAngularVelocity(npcPhys.getLinearVelocityX() * 0.6);

                            if (cooldownChute <= 0) {
                                runtimeScene.getSoundManager().playSoundOnChannel("chute.mp3", 3, false, 70, 1);
                                runtimeScene.getVariables().get("CooldownChute").setNumber(0.4); 
                            }
                        }
                    }
                }
            }
        }
    }

    // ==========================================
    // 8. CRONÔMETRO DA RODADA
    // ==========================================
    if (playerAtual) {
        if (runtimeScene.getVariables().get("TimerIniciado").getAsNumber() === 0) {
            runtimeScene.getVariables().get("TempoRestanteFutebol").setNumber(30); 
            runtimeScene.getVariables().get("TimerIniciado").setNumber(1);
        }

        let tempoRestante = runtimeScene.getVariables().get("TempoRestanteFutebol").getAsNumber();

        if (tempoRestante > 0 && golTravado === 0 && tempoFimRodada <= 0) {
            tempoRestante -= dt;
            runtimeScene.getVariables().get("TempoRestanteFutebol").setNumber(tempoRestante);
        }

        if (textoCronometro) {
            let tempoArredondado = Math.ceil(tempoRestante);
            let minutos = Math.floor(tempoArredondado / 60);
            let segundos = tempoArredondado % 60;
            if (segundos < 10) segundos = "0" + segundos; 
            
            textoCronometro.setString("Tempo: " + minutos + ":" + segundos + " | Vs: " + nomeRivalUI);
            textoCronometro.setX(camada.getCameraX() - (textoCronometro.getWidth() / 2));
            textoCronometro.setY(40);
        }

        if (tempoRestante <= 0 && tempoFimRodada <= 0) {
            let ptsPlayer = runtimeScene.getVariables().get("PlacarPlayer").getAsNumber();
            let ptsNPC = runtimeScene.getVariables().get("PlacarNPC").getAsNumber();
            let txtRodada = "";

            if (ptsPlayer > ptsNPC) {
                runtimeScene.getVariables().get("WinsPlayer").add(1);
                txtRodada = nomePlayerUI + " Venceu a Rodada!";
            } else if (ptsNPC > ptsPlayer) {
                txtRodada = nomeRivalUI + " Venceu a Rodada!";
            } else {
                txtRodada = "Empate nesta Rodada!";
            }

            runtimeScene.getVariables().get("TextoVencedorRodada").setString(txtRodada);
            runtimeScene.getVariables().get("TempoFimRodada").setNumber(3.0);
            runtimeScene.getVariables().get("GolTravado").setNumber(1); 
        }
    }
}

// ==========================================================================
// 9. SISTEMA DE DECORAÇÃO: BOLHAS FLUTUANTES
// ==========================================================================
if (runtimeScene.timerBolhas === undefined) runtimeScene.timerBolhas = 0;
runtimeScene.timerBolhas += dt;

if (runtimeScene.timerBolhas > 0.25) {
    runtimeScene.timerBolhas = 0;

    let objetoEscolhido = Math.random() < 0.5 ? "bolha" : "bolhas";
    let bNova = runtimeScene.createObject(objetoEscolhido);

    if (bNova) {
        let zoomCâmera = 0.5;
        let largVisivel = larguraTela / zoomCâmera;
        let altVisivel = alturaTela / zoomCâmera;
        
        let camXAtal = camada.getCameraX();
        let camYAtual = camada.getCameraY();

        let minX = camXAtal - (largVisivel / 2) - 100;
        let maxX = camXAtal + (largVisivel / 2) + 100;
        let xSorteado = minX + Math.random() * (maxX - minX);

        let ySorteado = camYAtual + (altVisivel / 2) + 60;

        bNova.setX(xSorteado);
        bNova.setY(ySorteado);
        bNova.setZOrder(1); 

        bNova.setScale(0.3 + Math.random() * 0.25); 

        bNova.velSubida = 110 + Math.random() * 140; 
        bNova.timerOndulacao = Math.random() * 5;     
        bNova.forcaOndula = 0.5 + Math.random() * 0.8; 
    }
}

let bolhasSimples = runtimeScene.getObjects("bolha");
let bolhasGrupo = runtimeScene.getObjects("bolhas");
let todasInstanciasBolhas = [...bolhasSimples, ...bolhasGrupo];

todasInstanciasBolhas.forEach(b => {
    if (b.velSubida === undefined) b.velSubida = 160;
    if (b.timerOndulacao === undefined) b.timerOndulacao = 0;
    if (b.forcaOndula === undefined) b.forcaOndula = 0.6;

    b.timerOndulacao += dt * 3.5;

    b.setY(b.getY() - (b.velSubida * dt));
    b.setX(b.getX() + Math.sin(b.timerOndulacao) * b.forcaOndula);

    let topoCamera = camada.getCameraY() - (alturaTela / 0.5) / 2 - 120;
    if (b.getY() < topoCamera) {
        b.deleteFromScene();
    }
});
};
gdjs.futebolCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("TextoPlacar"), gdjs.futebolCode.GDTextoPlacarObjects1);
{for(var i = 0, len = gdjs.futebolCode.GDTextoPlacarObjects1.length ;i < len;++i) {
    gdjs.futebolCode.GDTextoPlacarObjects1[i].getBehavior("Text").setText(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().getFromIndex(1)) + " x " + gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().getFromIndex(2)));
}
}
}

}


{


gdjs.futebolCode.userFunc0xa357b8(runtimeScene);

}


{


let isConditionTrue_0 = false;
{
{gdjs.evtTools.sound.preloadMusic(runtimeScene, "chute.mp3");
}
{gdjs.evtTools.sound.preloadMusic(runtimeScene, "gol1.mp3");
}
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
{gdjs.evtTools.sound.playSoundOnChannel(runtimeScene, "piratas caribe.mp3", 5, true, 60, 1);
}
}

}


};

gdjs.futebolCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.futebolCode.GDbolaObjects1.length = 0;
gdjs.futebolCode.GDbolaObjects2.length = 0;
gdjs.futebolCode.GDGolObjects1.length = 0;
gdjs.futebolCode.GDGolObjects2.length = 0;
gdjs.futebolCode.GDzonaObjects1.length = 0;
gdjs.futebolCode.GDzonaObjects2.length = 0;
gdjs.futebolCode.GDTextoPlacarObjects1.length = 0;
gdjs.futebolCode.GDTextoPlacarObjects2.length = 0;
gdjs.futebolCode.GDzona2Objects1.length = 0;
gdjs.futebolCode.GDzona2Objects2.length = 0;
gdjs.futebolCode.GDCronometroObjects1.length = 0;
gdjs.futebolCode.GDCronometroObjects2.length = 0;
gdjs.futebolCode.GDContagemObjects1.length = 0;
gdjs.futebolCode.GDContagemObjects2.length = 0;
gdjs.futebolCode.GDJogadorObjects1.length = 0;
gdjs.futebolCode.GDJogadorObjects2.length = 0;
gdjs.futebolCode.GDLaffyObjects1.length = 0;
gdjs.futebolCode.GDLaffyObjects2.length = 0;
gdjs.futebolCode.GDJackAndorinhaObjects1.length = 0;
gdjs.futebolCode.GDJackAndorinhaObjects2.length = 0;
gdjs.futebolCode.GDDavyBonesObjects1.length = 0;
gdjs.futebolCode.GDDavyBonesObjects2.length = 0;
gdjs.futebolCode.GDareiaObjects1.length = 0;
gdjs.futebolCode.GDareiaObjects2.length = 0;
gdjs.futebolCode.GDblocoObjects1.length = 0;
gdjs.futebolCode.GDblocoObjects2.length = 0;
gdjs.futebolCode.GDagua_9595verdeObjects1.length = 0;
gdjs.futebolCode.GDagua_9595verdeObjects2.length = 0;
gdjs.futebolCode.GDNewTiledSpriteObjects1.length = 0;
gdjs.futebolCode.GDNewTiledSpriteObjects2.length = 0;
gdjs.futebolCode.GDlinhaObjects1.length = 0;
gdjs.futebolCode.GDlinhaObjects2.length = 0;
gdjs.futebolCode.GDbot_95227ojackObjects1.length = 0;
gdjs.futebolCode.GDbot_95227ojackObjects2.length = 0;
gdjs.futebolCode.GDsele_95231_95227oObjects1.length = 0;
gdjs.futebolCode.GDsele_95231_95227oObjects2.length = 0;
gdjs.futebolCode.GDbot_95227olaffyObjects1.length = 0;
gdjs.futebolCode.GDbot_95227olaffyObjects2.length = 0;
gdjs.futebolCode.GDbot_95227otortaObjects1.length = 0;
gdjs.futebolCode.GDbot_95227otortaObjects2.length = 0;
gdjs.futebolCode.GDbot_95227obonesObjects1.length = 0;
gdjs.futebolCode.GDbot_95227obonesObjects2.length = 0;
gdjs.futebolCode.GDbolhaObjects1.length = 0;
gdjs.futebolCode.GDbolhaObjects2.length = 0;
gdjs.futebolCode.GDbolhasObjects1.length = 0;
gdjs.futebolCode.GDbolhasObjects2.length = 0;
gdjs.futebolCode.GDalga_9595verdeObjects1.length = 0;
gdjs.futebolCode.GDalga_9595verdeObjects2.length = 0;

gdjs.futebolCode.eventsList0(runtimeScene);
gdjs.futebolCode.GDbolaObjects1.length = 0;
gdjs.futebolCode.GDbolaObjects2.length = 0;
gdjs.futebolCode.GDGolObjects1.length = 0;
gdjs.futebolCode.GDGolObjects2.length = 0;
gdjs.futebolCode.GDzonaObjects1.length = 0;
gdjs.futebolCode.GDzonaObjects2.length = 0;
gdjs.futebolCode.GDTextoPlacarObjects1.length = 0;
gdjs.futebolCode.GDTextoPlacarObjects2.length = 0;
gdjs.futebolCode.GDzona2Objects1.length = 0;
gdjs.futebolCode.GDzona2Objects2.length = 0;
gdjs.futebolCode.GDCronometroObjects1.length = 0;
gdjs.futebolCode.GDCronometroObjects2.length = 0;
gdjs.futebolCode.GDContagemObjects1.length = 0;
gdjs.futebolCode.GDContagemObjects2.length = 0;
gdjs.futebolCode.GDJogadorObjects1.length = 0;
gdjs.futebolCode.GDJogadorObjects2.length = 0;
gdjs.futebolCode.GDLaffyObjects1.length = 0;
gdjs.futebolCode.GDLaffyObjects2.length = 0;
gdjs.futebolCode.GDJackAndorinhaObjects1.length = 0;
gdjs.futebolCode.GDJackAndorinhaObjects2.length = 0;
gdjs.futebolCode.GDDavyBonesObjects1.length = 0;
gdjs.futebolCode.GDDavyBonesObjects2.length = 0;
gdjs.futebolCode.GDareiaObjects1.length = 0;
gdjs.futebolCode.GDareiaObjects2.length = 0;
gdjs.futebolCode.GDblocoObjects1.length = 0;
gdjs.futebolCode.GDblocoObjects2.length = 0;
gdjs.futebolCode.GDagua_9595verdeObjects1.length = 0;
gdjs.futebolCode.GDagua_9595verdeObjects2.length = 0;
gdjs.futebolCode.GDNewTiledSpriteObjects1.length = 0;
gdjs.futebolCode.GDNewTiledSpriteObjects2.length = 0;
gdjs.futebolCode.GDlinhaObjects1.length = 0;
gdjs.futebolCode.GDlinhaObjects2.length = 0;
gdjs.futebolCode.GDbot_95227ojackObjects1.length = 0;
gdjs.futebolCode.GDbot_95227ojackObjects2.length = 0;
gdjs.futebolCode.GDsele_95231_95227oObjects1.length = 0;
gdjs.futebolCode.GDsele_95231_95227oObjects2.length = 0;
gdjs.futebolCode.GDbot_95227olaffyObjects1.length = 0;
gdjs.futebolCode.GDbot_95227olaffyObjects2.length = 0;
gdjs.futebolCode.GDbot_95227otortaObjects1.length = 0;
gdjs.futebolCode.GDbot_95227otortaObjects2.length = 0;
gdjs.futebolCode.GDbot_95227obonesObjects1.length = 0;
gdjs.futebolCode.GDbot_95227obonesObjects2.length = 0;
gdjs.futebolCode.GDbolhaObjects1.length = 0;
gdjs.futebolCode.GDbolhaObjects2.length = 0;
gdjs.futebolCode.GDbolhasObjects1.length = 0;
gdjs.futebolCode.GDbolhasObjects2.length = 0;
gdjs.futebolCode.GDalga_9595verdeObjects1.length = 0;
gdjs.futebolCode.GDalga_9595verdeObjects2.length = 0;


return;

}

gdjs['futebolCode'] = gdjs.futebolCode;
