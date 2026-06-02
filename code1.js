gdjs.corridaCode = {};
gdjs.corridaCode.localVariables = [];
gdjs.corridaCode.idToCallbackMap = new Map();
gdjs.corridaCode.GDplayerObjects1= [];
gdjs.corridaCode.GDplayerObjects2= [];
gdjs.corridaCode.GDDavyBonesObjects1= [];
gdjs.corridaCode.GDDavyBonesObjects2= [];
gdjs.corridaCode.GDobstaculoObjects1= [];
gdjs.corridaCode.GDobstaculoObjects2= [];
gdjs.corridaCode.GDaceleradorObjects1= [];
gdjs.corridaCode.GDaceleradorObjects2= [];
gdjs.corridaCode.GDdesaceleradorObjects1= [];
gdjs.corridaCode.GDdesaceleradorObjects2= [];
gdjs.corridaCode.GDJackAndorinhaObjects1= [];
gdjs.corridaCode.GDJackAndorinhaObjects2= [];
gdjs.corridaCode.GDLaffyObjects1= [];
gdjs.corridaCode.GDLaffyObjects2= [];
gdjs.corridaCode.GDfinalObjects1= [];
gdjs.corridaCode.GDfinalObjects2= [];
gdjs.corridaCode.GDTextoDistanciaObjects1= [];
gdjs.corridaCode.GDTextoDistanciaObjects2= [];
gdjs.corridaCode.GDposicaoObjects1= [];
gdjs.corridaCode.GDposicaoObjects2= [];
gdjs.corridaCode.GDNewTiledSpriteObjects1= [];
gdjs.corridaCode.GDNewTiledSpriteObjects2= [];
gdjs.corridaCode.GDContagemObjects1= [];
gdjs.corridaCode.GDContagemObjects2= [];
gdjs.corridaCode.GDganhador2Objects1= [];
gdjs.corridaCode.GDganhador2Objects2= [];
gdjs.corridaCode.GDpisoObjects1= [];
gdjs.corridaCode.GDpisoObjects2= [];
gdjs.corridaCode.GDalga_9595azuladaObjects1= [];
gdjs.corridaCode.GDalga_9595azuladaObjects2= [];
gdjs.corridaCode.GDsele_95231_95227oObjects1= [];
gdjs.corridaCode.GDsele_95231_95227oObjects2= [];
gdjs.corridaCode.GDbot_95227ojackObjects1= [];
gdjs.corridaCode.GDbot_95227ojackObjects2= [];
gdjs.corridaCode.GDbot_95227olaffyObjects1= [];
gdjs.corridaCode.GDbot_95227olaffyObjects2= [];
gdjs.corridaCode.GDbot_95227otortaObjects1= [];
gdjs.corridaCode.GDbot_95227otortaObjects2= [];
gdjs.corridaCode.GDbot_95227obonesObjects1= [];
gdjs.corridaCode.GDbot_95227obonesObjects2= [];
gdjs.corridaCode.GDNewSpriteObjects1= [];
gdjs.corridaCode.GDNewSpriteObjects2= [];
gdjs.corridaCode.GDNewSprite2Objects1= [];
gdjs.corridaCode.GDNewSprite2Objects2= [];
gdjs.corridaCode.GDalga_9595verdeObjects1= [];
gdjs.corridaCode.GDalga_9595verdeObjects2= [];
gdjs.corridaCode.GDbolhaObjects1= [];
gdjs.corridaCode.GDbolhaObjects2= [];
gdjs.corridaCode.GDbolhasObjects1= [];
gdjs.corridaCode.GDbolhasObjects2= [];


gdjs.corridaCode.userFunc0x994e78 = function GDJSInlineCode(runtimeScene) {
"use strict";
// ==========================================
// 1. CARREGAMENTO DOS OBJETOS DA CENA
// ==========================================
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

const pisos = runtimeScene.getObjects("piso");
const obstaculos = runtimeScene.getObjects("obstaculo");
const aceleradores = runtimeScene.getObjects("acelerador");
const desaceleradores = runtimeScene.getObjects("desacelerador");
const objetoFinal = runtimeScene.getObjects("final")[0]; 

const textoDistancia = runtimeScene.getObjects("TextoDistancia")[0];
const textoPosicao = runtimeScene.getObjects("posicao")[0]; 
const textoContagem = runtimeScene.getObjects("Contagem")[0]; 
const textoGanhador = runtimeScene.getObjects("Ganhador")[0]; 
const textoGanhador2 = runtimeScene.getObjects("ganhador2")[0]; 

const teclado = runtimeScene.getGame().getInputManager();
const dt = runtimeScene.getTimeManager().getElapsedTime() / 1000; 
const larguraTela = runtimeScene.getGame().getGameResolutionWidth();
const alturaTela = runtimeScene.getGame().getGameResolutionHeight(); 
const camada = runtimeScene.getLayer("");

// --- CONTROLE DE ESTADO DO JOGO (0 = Menu de Seleção, 1 = Corrida Ativa) ---
if (runtimeScene.getVariables().get("EstadoJogo").getAsNumber() === 0 && 
    runtimeScene.getVariables().get("ContagemIniciada").getAsNumber() === 1) {
    runtimeScene.getVariables().get("EstadoJogo").setNumber(1);
}
let estadoJogo = runtimeScene.getVariables().get("EstadoJogo").getAsNumber();

// FUNÇÃO AUXILIAR DE TELEPORTE SEGURO
const posicionarObjeto = (obj, x, y) => {
    if (!obj) return;
    obj.setX(x);
    obj.setY(y);
    
    const phys = obj.getBehavior("Physics2");
    if (phys) {
        phys.setLinearVelocityX(0);
        phys.setLinearVelocityY(0);
        phys.setAngularVelocity(0);
    }
};

// ==========================================
// FASE A: INTERFACE DO MENU DE SELEÇÃO
// ==========================================
if (estadoJogo === 0) {
    const cx = larguraTela / 2;
    const cy = alturaTela / 2;

    // Fixa a câmera no centro inicial da tela de seleção
    camada.setCameraX(cx);
    camada.setCameraY(cy);

    // Oculta strings de corrida temporariamente
    if (textoDistancia) textoDistancia.setString("");
    if (textoPosicao) textoPosicao.setString("");
    
    // CORREÇÃO VISUAL: Ajusta escala e posicionamento temporário do título de seleção
    if (textoContagem) {
        textoContagem.setString("ESCOLHA SEU PIRATA");
        textoContagem.setScale(0.6); 
        textoContagem.setX(cx - (textoContagem.getWidth() / 2));
        textoContagem.setY(cy - 190); 
    }

    // Congela movimentos físicos dos personagens no menu
    const todosPiratas = [almaTortaObj, davyBonesObj, jackAndorinhaObj, laffyEsticadoObj].filter(Boolean);
    todosPiratas.forEach(p => {
        const phis = p.getBehavior("Physics2");
        if (phis) { phis.setLinearVelocityX(0); phis.setLinearVelocityY(0); }
    });

    // Alinhamento visual automático na tela (Executa apenas uma vez no início)
    if (runtimeScene.getVariables().get("MenuAlinhado").getAsNumber() === 0) {
        
        if (runtimeScene.textoContagemScaleOriginal === undefined && textoContagem) {
            runtimeScene.textoContagemScaleOriginal = textoContagem.getScale();
        }

        if (fundoSelecao) posicionarObjeto(fundoSelecao, cx - fundoSelecao.getWidth() / 2, cy - fundoSelecao.getHeight() / 2);

        // Estrutura de emparelhamento direto (Pirata + Seu respectivo Botão)
        const slotsSelecao = [
            { pirata: almaTortaObj, botao: btnTorta },
            { pirata: davyBonesObj, botao: btnBones },
            { pirata: jackAndorinhaObj, botao: btnJack },
            { pirata: laffyEsticadoObj, botao: btnLaffy }
        ].filter(slot => slot.pirata !== undefined);

        const espacamentoX = 250; 
        const larguraTotalMenu = (slotsSelecao.length - 1) * espacamentoX;
        const startX = cx - (larguraTotalMenu / 2);

        slotsSelecao.forEach((slot, idx) => {
            let slotCenterX = startX + (idx * espacamentoX);

            let pirataX = slotCenterX - (slot.pirata.getWidth() / 2);
            let pirataY = cy - 40 - (slot.pirata.getHeight() / 2);
            posicionarObjeto(slot.pirata, pirataX, pirataY);

            if (slot.botao) {
                let botaoX = slotCenterX - (slot.botao.getWidth() / 2);
                let botaoY = cy + 120 - (slot.botao.getHeight() / 2);
                posicionarObjeto(slot.botao, botaoX, botaoY);
            }
        });

        runtimeScene.getVariables().get("MenuAlinhado").setNumber(1);
    }

    // Identificação de Cliques / Toques nos Botões de Seleção
    if (teclado.isMouseButtonPressed(0)) {
        const sceneMouse = camada.convertCoords(teclado.getMouseX(), teclado.getMouseY());
        const mX = sceneMouse[0];
        const mY = sceneMouse[1];

        let cliqueDetectado = "";
        const checarClique = (btn) => {
            return btn && mX >= btn.getX() && mX <= btn.getX() + btn.getWidth() && mY >= btn.getY() && mY <= btn.getY() + btn.getHeight();
        };

        if (checarClique(btnTorta)) cliqueDetectado = "AlmaTorta";
        if (checarClique(btnBones)) cliqueDetectado = "DavyBones";
        if (checarClique(btnJack)) cliqueDetectado = "JackAndorinha";
        if (checarClique(btnLaffy)) cliqueDetectado = "Laffy";

        if (cliqueDetectado !== "") {
            runtimeScene.getGame().getVariables().get("PersonagemEscolhido").setString(cliqueDetectado);
            
            const componentesMenu = [fundoSelecao, btnJack, btnLaffy, btnTorta, btnBones];
            componentesMenu.forEach(c => { if(c) { c.setX(-9000); c.setY(-9000); } });

            if (textoContagem) {
                if (runtimeScene.textoContagemScaleOriginal !== undefined) {
                    textoContagem.setScale(runtimeScene.textoContagemScaleOriginal);
                } else {
                    textoContagem.setScale(1.0); 
                }
                textoContagem.setString("");
            }

            runtimeScene.getVariables().get("EstadoJogo").setNumber(1);
            runtimeScene.getVariables().get("ContagemIniciada").setNumber(0); 
        }
    }
} 

// ==========================================
// FASE B: SISTEMA DE CORRIDA ATIVA
// ==========================================
else {
    let escolha = runtimeScene.getGame().getVariables().get("PersonagemEscolhido").getAsString();
    if (!escolha) escolha = "AlmaTorta"; 

    let player;
    let npcs = [];

    if (escolha === "Laffy") {
        player = laffyEsticadoObj;
        npcs = [almaTortaObj, davyBonesObj, jackAndorinhaObj].filter(Boolean);
    } else if (escolha === "JackAndorinha") {
        player = jackAndorinhaObj;
        npcs = [almaTortaObj, davyBonesObj, laffyEsticadoObj].filter(Boolean);
    } else if (escolha === "DavyBones") {
        player = davyBonesObj;
        npcs = [almaTortaObj, jackAndorinhaObj, laffyEsticadoObj].filter(Boolean);
    } else {
        player = almaTortaObj;
        npcs = [davyBonesObj, jackAndorinhaObj, laffyEsticadoObj].filter(Boolean);
    }

    // ============================================================
    // AJUSTADO: 15000 pixels / 50 = Exatamente 300 metros de corrida
    // ============================================================
    const distanciaDaCorrida = 15000; 
    const velocidadBase = 400;       
    const forcaPulo = -750;           
    const tempoEsperaPulo = 0.6;      
    const alturaParkourObstaculo = 220; 
    const limiteQuedaY = 800; 

    if (player) {
        if (runtimeScene.alturaChaoOriginal === undefined && pisos.length > 0) {
            runtimeScene.alturaChaoOriginal = pisos[0].getY();
        }
        const chaoY = runtimeScene.alturaChaoOriginal !== undefined ? runtimeScene.alturaChaoOriginal : 400;

        if (objetoFinal) { 
            objetoFinal.setScale(0.3);
            posicionarObjeto(objetoFinal, distanciaDaCorrida, chaoY - objetoFinal.getHeight());
        }

        camada.setCameraX(player.getX() + 250);
        const cameraX = camada.getCameraX();
        const cameraY = camada.getCameraY();
        const limiteEsquerdo = cameraX - (larguraTela / 2) - 150;

        let competidores = [player, ...npcs].filter(c => c !== undefined);

        if (runtimeScene.getVariables().get("ContagemIniciada").getAsNumber() === 0) {
            runtimeScene.getVariables().get("TempoContagem").setNumber(4.0);
            runtimeScene.getVariables().get("ContagemIniciada").setNumber(1);
            runtimeScene.getGame().getVariables().get("ganhador").setString("");

            competidores.forEach((v, indice) => {
                posicionarObjeto(v, 100 + (indice * 150), chaoY - v.getHeight() - 10);
            });
        }
        
        let tempoContagem = runtimeScene.getVariables().get("TempoContagem").getAsNumber();
        if (tempoContagem > 0) {
            tempoContagem -= dt;
            runtimeScene.getVariables().get("TempoContagem").setNumber(tempoContagem);
        }

        if (runtimeScene.getVariables().get("CorridaFinalizada").getAsNumber() === 1) {
            let tempoFim = runtimeScene.getVariables().get("TempoFimCorrida").getAsNumber();
            tempoFim -= dt;
            runtimeScene.getVariables().get("TempoFimCorrida").setNumber(tempoFim);

            competidores.forEach(v => {
                const phis = v.getBehavior("Physics2");
                if (phis) { phis.setLinearVelocityX(0); phis.setLinearVelocityY(0); }
            });

            let nomeGanhador = runtimeScene.getGame().getVariables().get("ganhador").getAsString();

            if (textoGanhador) {
                textoGanhador.setString(nomeGanhador + " Venceu a Corrida!");
                textoGanhador.setX(cameraX - (textoGanhador.getWidth() / 2));
                textoGanhador.setY(cameraY - (textoGanhador.getHeight() / 2) - 30);
            }

            if (textoGanhador2) {
                textoGanhador2.setString("Fim de Jogo!");
                textoGanhador2.setX(cameraX - (textoGanhador2.getWidth() / 2));
                textoGanhador2.setY(cameraY - (textoGanhador2.getHeight() / 2) + 30);
            }

            if (tempoFim <= 0) {
                if (textoGanhador) textoGanhador.setString("");
                if (textoGanhador2) textoGanhador2.setString("");
                runtimeScene.getVariables().get("CorridaFinalizada").setNumber(0);
                runtimeScene.getVariables().get("EstadoJogo").setNumber(0); 
                runtimeScene.getVariables().get("MenuAlinhado").setNumber(0);
                runtimeScene.getGame().getSceneStack().replace("Seletor_Minigames", true);
            }
            return; 
        }
        
        let caidosNestaFrame = competidores.filter(c => c.getY() > limiteQuedaY);
        
        if (caidosNestaFrame.length === competidores.length && caidosNestaFrame.length > 0) {
            competidores.forEach((v, indice) => {
                posicionarObjeto(v, 100 + (indice * 150), chaoY - v.getHeight() - 10);
            });
        } else {
            caidosNestaFrame.forEach((v, indice) => {
                competidores.sort((a, b) => b.getX() - a.getX());
                const liderAtual = competidores[0];
                
                posicionarObjeto(v, liderAtual.getX() - 450 - (indice * 130), chaoY - v.getHeight() - 10);
                const phis = v.getBehavior("Physics2");
                if(phis) {
                    phis.setLinearVelocityX(velocidadBase);
                    phis.setLinearVelocityY(0);
                }
            });
        }

        competidores.sort((a, b) => b.getX() - a.getX());
        const lider = competidores[0];
        const lanterna = competidores[competidores.length - 1];

        competidores.forEach((v) => {
            const phis = v.getBehavior("Physics2");
            if (phis) {
                if (v.extraSpeed === undefined) v.extraSpeed = 0;
                if (v.reflexo === undefined) v.reflexo = Math.random() * 35;
                if (v.timerPulo === undefined) v.timerPulo = 100; 
                if (v.cooldownDashAudio === undefined) v.cooldownDashAudio = 0; 
                
                v.timerPulo += dt;
                if (v.cooldownDashAudio > 0) v.cooldownDashAudio -= dt; 

                if (tempoContagem > 0) {
                    phis.setLinearVelocityX(0); phis.setLinearVelocityY(0);
                    return; 
                }

                if (objetoFinal && v.getX() > objetoFinal.getX()) {
                    phis.setLinearVelocityX(0); 
                    runtimeScene.getVariables().get("CorridaFinalizada").setNumber(1);
                    runtimeScene.getVariables().get("TempoFimCorrida").setNumber(3.0); 

                    let nomePirata = "Capitão Alma-Torta";
                    if (v === davyBonesObj) nomePirata = "Davy Bones";
                    else if (v === jackAndorinhaObj) nomePirata = "Jack Andorinha";
                    else if (v === laffyEsticadoObj) nomePirata = "Laffy, o Esticado";

                    runtimeScene.getGame().getVariables().get("ganhador").setString(nomePirata);

                    if (v === player) {
                        runtimeScene.getGame().getVariables().get("Minigameconcluido").setNumber(1);
                    }
                    
                    return; 
                }

                let mult = (v === lider) ? 0.90 : (v === lanterna ? 1.15 : 1.0);
                v.extraSpeed *= 0.98; 
                
                let velocidadAtualX = (velocidadBase * mult) + v.extraSpeed;
                phis.setLinearVelocityX(velocidadAtualX);

                const vY = phis.getLinearVelocityY();
                const tocandoChao = Math.abs(vY) < 15;
                let corridaAtiva = tempoContagem <= 0 && runtimeScene.getVariables().get("CorridaFinalizada").getAsNumber() === 0;

                if (v === player) {
                    if (player.timerPassos === undefined) player.timerPassos = 0;
                    player.timerPassos += dt;
                    
                    if (tocandoChao && corridaAtiva && player.getX() < distanciaDaCorrida) {
                        if (player.timerPassos >= 0.35) { 
                            runtimeScene.getSoundManager().playSound("areia.mp3", false, 55, 1);
                            player.timerPassos = 0; 
                        }
                    }

                    if (teclado.isKeyPressed(32) && tocandoChao && v.timerPulo > 0.2) {
                        phis.setLinearVelocityY(forcaPulo);
                        v.timerPulo = 0; 
                        runtimeScene.getSoundManager().playSound("som de pulo.mp3", false, 65, 1);
                    }
                } 
                else if (tocandoChao) {
                    let executouPulo = false; 
                    
                    if (velocidadAtualX < (velocidadBase * 0.45) && v.timerPulo > 0.15) {
                        phis.setLinearVelocityY(forcaPulo);
                        v.timerPulo = 0;
                        executouPulo = true;
                        runtimeScene.getSoundManager().playSound("som de pulo.mp3", false, 45, 1);
                    }

                    if (!executouPulo && v.timerPulo > tempoEsperaPulo) {
                        let distanciaVisaoMax = Math.max(220, velocidadAtualX * 0.55);
                        let distanciaSeguraMin = 35;

                        obstaculos.forEach(obs => {
                            const dX = obs.getX() - v.getX();
                            let mesmoEixoVertical = Math.abs(obs.getY() - v.getY()) < (v.getHeight() * 1.6);
                            
                            if (mesmoEixoVertical && dX > distanciaSeguraMin && dX < (distanciaVisaoMax + v.reflexo) && !executouPulo) {
                                phis.setLinearVelocityY(forcaPulo);
                                v.timerPulo = 0; 
                                executouPulo = true;
                                runtimeScene.getSoundManager().playSound("som de pulo.mp3", false, 45, 1);
                            }
                        });
                    }
                }
                
                aceleradores.forEach(acc => {
                    if (gdjs.RuntimeObject.collisionTest(v, acc)) {
                        v.extraSpeed = 300;
                        if (v === player && v.cooldownDashAudio <= 0) { 
                            runtimeScene.getSoundManager().playSound("dash.mp3", false, 80, 1);
                            v.cooldownDashAudio = 0.7; 
                        }
                    }
                });
                
                desaceleradores.forEach(des => {
                    if (gdjs.RuntimeObject.collisionTest(v, des)) {
                        v.extraSpeed = -250;
                    }
                });
            }
        });

        let cantoSuperiorY = cameraY - (alturaTela / 2) + 30; 

        if (objetoFinal) {
            let dPixels = objetoFinal.getX() - player.getX();
            let dMetros = Math.max(0, Math.floor(dPixels / 50));
            
            runtimeScene.getVariables().get("DistanciaBandeira").setNumber(dMetros);
            
            if (textoDistancia) {
                textoDistancia.setString("Chegada em: " + dMetros + "m");
                let cantoEsquerdoX = cameraX - (larguraTela / 2) + 30; 
                textoDistancia.setX(cantoEsquerdoX);
                textoDistancia.setY(cantoSuperiorY);
            }
        }

        let posicaoNumero = competidores.indexOf(player) + 1; 
        runtimeScene.getVariables().get("colocacao").setNumber(posicaoNumero);

        if (textoPosicao) {
            textoPosicao.setString(posicaoNumero + "º Lugar");
            let cantoDireitoX = cameraX + (larguraTela / 2) - 180; 
            textoPosicao.setX(cantoDireitoX);
            textoPosicao.setY(cantoSuperiorY);
        }

        if (textoContagem) {
            if (tempoContagem > 0) {
                if (tempoContagem > 3) textoContagem.setString("3");
                else if (tempoContagem > 2) textoContagem.setString("2");
                else if (tempoContagem > 1) textoContagem.setString("1");
                else textoContagem.setString("JÁ!");
                
                let centroX = cameraX - (textoContagem.getWidth() / 2);
                let centroY = cameraY - (textoContagem.getHeight() / 2);
                textoContagem.setX(centroX);
                textoContagem.setY(centroY);
            } else {
                textoContagem.setString(""); 
            }
        }

        let retaFinal = objetoFinal && (player.getX() > objetoFinal.getX() - 2500);

        if (runtimeScene.proximoItemX === undefined) runtimeScene.proximoItemX = 1500;
        const bufferGeral = 550; 

        if (!retaFinal && (cameraX + larguraTela) > runtimeScene.proximoItemX) {
            
            let obsDisponiveis = obstaculos.filter(o => o.getX() + o.getWidth() < limiteEsquerdo);
            let accDisponiveis = aceleradores.filter(a => a.getX() + a.getWidth() < limiteEsquerdo);
            let desDisponiveis = desaceleradores.filter(d => d.getX() + d.getWidth() < limiteEsquerdo);

            let tipoEstrutura = Math.floor(Math.random() * 3);

            if (tipoEstrutura === 0 && obsDisponiveis.length >= 2 && accDisponiveis.length >= 1 && desDisponiveis.length >= 1) {
                let baseX = runtimeScene.proximoItemX + 150;

                accDisponiveis[0].setY(chaoY - accDisponiveis[0].getHeight());
                posicionarObjeto(accDisponiveis[0], baseX, accDisponiveis[0].getY());

                obsDisponiveis[0].setY(chaoY - obsDisponiveis[0].getHeight()); 
                posicionarObjeto(obsDisponiveis[0], baseX + 500, obsDisponiveis[0].getY());

                obsDisponiveis[1].setY(chaoY - obsDisponiveis[1].getHeight() - alturaParkourObstaculo);
                posicionarObjeto(obsDisponiveis[1], baseX + 1000, obsDisponiveis[1].getY());

                desDisponiveis[0].setY(chaoY - desDisponiveis[0].getHeight());
                posicionarObjeto(desDisponiveis[0], baseX + 1500, desDisponiveis[0].getY());

                runtimeScene.proximoItemX = baseX + 2000; 
            } 
            else if (tipoEstrutura === 1 && accDisponiveis.length >= 2 && obsDisponiveis.length >= 1) {
                let baseX = runtimeScene.proximoItemX + 200;

                accDisponiveis[0].setY(chaoY - accDisponiveis[0].getHeight());
                posicionarObjeto(accDisponiveis[0], baseX, accDisponiveis[0].getY());

                accDisponiveis[1].setY(chaoY - accDisponiveis[1].getHeight());
                posicionarObjeto(accDisponiveis[1], baseX + 600, accDisponiveis[1].getHeight());

                obsDisponiveis[0].setY(chaoY - obsDisponiveis[0].getHeight());
                posicionarObjeto(obsDisponiveis[0], baseX + 1100, obsDisponiveis[0].getY());

                runtimeScene.proximoItemX = baseX + 1700;
            }
            else {
                let alvoX = runtimeScene.proximoItemX + 180;
                let sorteioItem = Math.floor(Math.random() * 4); 

                if (sorteioItem === 0 && accDisponiveis.length >= 1) {
                    accDisponiveis[0].setY(chaoY - accDisponiveis[0].getHeight());
                    posicionarObjeto(accDisponiveis[0], alvoX, accDisponiveis[0].getY());
                    runtimeScene.proximoItemX = alvoX + bufferGeral;
                } else if (sorteioItem === 1 && desDisponiveis.length >= 1) {
                    desaceleradores[0].setY(chaoY - desaceleradores[0].getHeight());
                    posicionarObjeto(desaceleradores[0], alvoX, desaceleradores[0].getY());
                    runtimeScene.proximoItemX = alvoX + bufferGeral;
                } else if (sorteioItem === 2 && obsDisponiveis.length >= 2) {
                    obsDisponiveis[0].setY(chaoY - obsDisponiveis[0].getHeight());
                    posicionarObjeto(obsDisponiveis[0], alvoX, obsDisponiveis[0].getY());

                    obsDisponiveis[1].setY(chaoY - obsDisponiveis[1].getHeight());
                    posicionarObjeto(obsDisponiveis[1], alvoX + 500, obsDisponiveis[1].getY());
                    runtimeScene.proximoItemX = alvoX + 500 + bufferGeral;
                } else if (obsDisponiveis.length >= 1) {
                    let noAr = Math.random() < 0.5;
                    obsDisponiveis[0].setY(chaoY - obsDisponiveis[0].getHeight() - (noAr ? alturaParkourObstaculo : 0));
                    posicionarObjeto(obsDisponiveis[0], alvoX, obsDisponiveis[0].getY());
                    runtimeScene.proximoItemX = alvoX + bufferGeral;
                }
            }
        }
    }
}

// ==========================================================================
// 9. SISTEMA DE DECORAÇÃO: BOLHAS FLUTUANTES (TAMANHO PEQUENO)
// ==========================================================================
if (runtimeScene.timerBolhas === undefined) runtimeScene.timerBolhas = 0;
runtimeScene.timerBolhas += dt;

if (runtimeScene.timerBolhas > 0.25) {
    runtimeScene.timerBolhas = 0;

    let objetoEscolhido = Math.random() < 0.5 ? "bolha" : "bolhas";
    let bNova = runtimeScene.createObject(objetoEscolhido);

    if (bNova) {
        let camXAtual = camada.getCameraX();
        let camYAtual = camada.getCameraY();

        let minX = camXAtual - (larguraTela / 2) - 150;
        let maxX = camXAtual + (larguraTela / 2) + 350; 
        let xSorteado = minX + Math.random() * (maxX - minX);

        let ySorteado = camYAtual + (alturaTela / 2) + 60;

        bNova.setX(xSorteado);
        bNova.setY(ySorteado);
        bNova.setZOrder(1); 

        bNova.setScale(0.15 + Math.random() * 0.2); 

        bNova.velSubida = 120 + Math.random() * 150; 
        bNova.timerOndulacao = Math.random() * 5;     
        bNova.forcaOndula = 0.6 + Math.random() * 0.8; 
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

    let topoCamera = camada.getCameraY() - (alturaTela / 2) - 120;
    if (b.getY() < topoCamera) {
        b.deleteFromScene();
    }
});
};
gdjs.corridaCode.eventsList0 = function(runtimeScene) {

{


gdjs.corridaCode.userFunc0x994e78(runtimeScene);

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("TextoDistancia"), gdjs.corridaCode.GDTextoDistanciaObjects1);
gdjs.copyArray(runtimeScene.getObjects("posicao"), gdjs.corridaCode.GDposicaoObjects1);
{for(var i = 0, len = gdjs.corridaCode.GDTextoDistanciaObjects1.length ;i < len;++i) {
    gdjs.corridaCode.GDTextoDistanciaObjects1[i].getBehavior("Text").setText("Chegada em: " + gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("DistanciaBandeira")) + "m");
}
}
{for(var i = 0, len = gdjs.corridaCode.GDposicaoObjects1.length ;i < len;++i) {
    gdjs.corridaCode.GDposicaoObjects1[i].getBehavior("Text").setText(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("colocacao")) + "º Lugar");
}
}
{gdjs.evtTools.sound.preloadMusic(runtimeScene, "areia.mp3");
}
{gdjs.evtTools.sound.preloadMusic(runtimeScene, "som de pulo.mp3");
}
{gdjs.evtTools.sound.preloadSound(runtimeScene, "dash.mp3");
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

gdjs.corridaCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.corridaCode.GDplayerObjects1.length = 0;
gdjs.corridaCode.GDplayerObjects2.length = 0;
gdjs.corridaCode.GDDavyBonesObjects1.length = 0;
gdjs.corridaCode.GDDavyBonesObjects2.length = 0;
gdjs.corridaCode.GDobstaculoObjects1.length = 0;
gdjs.corridaCode.GDobstaculoObjects2.length = 0;
gdjs.corridaCode.GDaceleradorObjects1.length = 0;
gdjs.corridaCode.GDaceleradorObjects2.length = 0;
gdjs.corridaCode.GDdesaceleradorObjects1.length = 0;
gdjs.corridaCode.GDdesaceleradorObjects2.length = 0;
gdjs.corridaCode.GDJackAndorinhaObjects1.length = 0;
gdjs.corridaCode.GDJackAndorinhaObjects2.length = 0;
gdjs.corridaCode.GDLaffyObjects1.length = 0;
gdjs.corridaCode.GDLaffyObjects2.length = 0;
gdjs.corridaCode.GDfinalObjects1.length = 0;
gdjs.corridaCode.GDfinalObjects2.length = 0;
gdjs.corridaCode.GDTextoDistanciaObjects1.length = 0;
gdjs.corridaCode.GDTextoDistanciaObjects2.length = 0;
gdjs.corridaCode.GDposicaoObjects1.length = 0;
gdjs.corridaCode.GDposicaoObjects2.length = 0;
gdjs.corridaCode.GDNewTiledSpriteObjects1.length = 0;
gdjs.corridaCode.GDNewTiledSpriteObjects2.length = 0;
gdjs.corridaCode.GDContagemObjects1.length = 0;
gdjs.corridaCode.GDContagemObjects2.length = 0;
gdjs.corridaCode.GDganhador2Objects1.length = 0;
gdjs.corridaCode.GDganhador2Objects2.length = 0;
gdjs.corridaCode.GDpisoObjects1.length = 0;
gdjs.corridaCode.GDpisoObjects2.length = 0;
gdjs.corridaCode.GDalga_9595azuladaObjects1.length = 0;
gdjs.corridaCode.GDalga_9595azuladaObjects2.length = 0;
gdjs.corridaCode.GDsele_95231_95227oObjects1.length = 0;
gdjs.corridaCode.GDsele_95231_95227oObjects2.length = 0;
gdjs.corridaCode.GDbot_95227ojackObjects1.length = 0;
gdjs.corridaCode.GDbot_95227ojackObjects2.length = 0;
gdjs.corridaCode.GDbot_95227olaffyObjects1.length = 0;
gdjs.corridaCode.GDbot_95227olaffyObjects2.length = 0;
gdjs.corridaCode.GDbot_95227otortaObjects1.length = 0;
gdjs.corridaCode.GDbot_95227otortaObjects2.length = 0;
gdjs.corridaCode.GDbot_95227obonesObjects1.length = 0;
gdjs.corridaCode.GDbot_95227obonesObjects2.length = 0;
gdjs.corridaCode.GDNewSpriteObjects1.length = 0;
gdjs.corridaCode.GDNewSpriteObjects2.length = 0;
gdjs.corridaCode.GDNewSprite2Objects1.length = 0;
gdjs.corridaCode.GDNewSprite2Objects2.length = 0;
gdjs.corridaCode.GDalga_9595verdeObjects1.length = 0;
gdjs.corridaCode.GDalga_9595verdeObjects2.length = 0;
gdjs.corridaCode.GDbolhaObjects1.length = 0;
gdjs.corridaCode.GDbolhaObjects2.length = 0;
gdjs.corridaCode.GDbolhasObjects1.length = 0;
gdjs.corridaCode.GDbolhasObjects2.length = 0;

gdjs.corridaCode.eventsList0(runtimeScene);
gdjs.corridaCode.GDplayerObjects1.length = 0;
gdjs.corridaCode.GDplayerObjects2.length = 0;
gdjs.corridaCode.GDDavyBonesObjects1.length = 0;
gdjs.corridaCode.GDDavyBonesObjects2.length = 0;
gdjs.corridaCode.GDobstaculoObjects1.length = 0;
gdjs.corridaCode.GDobstaculoObjects2.length = 0;
gdjs.corridaCode.GDaceleradorObjects1.length = 0;
gdjs.corridaCode.GDaceleradorObjects2.length = 0;
gdjs.corridaCode.GDdesaceleradorObjects1.length = 0;
gdjs.corridaCode.GDdesaceleradorObjects2.length = 0;
gdjs.corridaCode.GDJackAndorinhaObjects1.length = 0;
gdjs.corridaCode.GDJackAndorinhaObjects2.length = 0;
gdjs.corridaCode.GDLaffyObjects1.length = 0;
gdjs.corridaCode.GDLaffyObjects2.length = 0;
gdjs.corridaCode.GDfinalObjects1.length = 0;
gdjs.corridaCode.GDfinalObjects2.length = 0;
gdjs.corridaCode.GDTextoDistanciaObjects1.length = 0;
gdjs.corridaCode.GDTextoDistanciaObjects2.length = 0;
gdjs.corridaCode.GDposicaoObjects1.length = 0;
gdjs.corridaCode.GDposicaoObjects2.length = 0;
gdjs.corridaCode.GDNewTiledSpriteObjects1.length = 0;
gdjs.corridaCode.GDNewTiledSpriteObjects2.length = 0;
gdjs.corridaCode.GDContagemObjects1.length = 0;
gdjs.corridaCode.GDContagemObjects2.length = 0;
gdjs.corridaCode.GDganhador2Objects1.length = 0;
gdjs.corridaCode.GDganhador2Objects2.length = 0;
gdjs.corridaCode.GDpisoObjects1.length = 0;
gdjs.corridaCode.GDpisoObjects2.length = 0;
gdjs.corridaCode.GDalga_9595azuladaObjects1.length = 0;
gdjs.corridaCode.GDalga_9595azuladaObjects2.length = 0;
gdjs.corridaCode.GDsele_95231_95227oObjects1.length = 0;
gdjs.corridaCode.GDsele_95231_95227oObjects2.length = 0;
gdjs.corridaCode.GDbot_95227ojackObjects1.length = 0;
gdjs.corridaCode.GDbot_95227ojackObjects2.length = 0;
gdjs.corridaCode.GDbot_95227olaffyObjects1.length = 0;
gdjs.corridaCode.GDbot_95227olaffyObjects2.length = 0;
gdjs.corridaCode.GDbot_95227otortaObjects1.length = 0;
gdjs.corridaCode.GDbot_95227otortaObjects2.length = 0;
gdjs.corridaCode.GDbot_95227obonesObjects1.length = 0;
gdjs.corridaCode.GDbot_95227obonesObjects2.length = 0;
gdjs.corridaCode.GDNewSpriteObjects1.length = 0;
gdjs.corridaCode.GDNewSpriteObjects2.length = 0;
gdjs.corridaCode.GDNewSprite2Objects1.length = 0;
gdjs.corridaCode.GDNewSprite2Objects2.length = 0;
gdjs.corridaCode.GDalga_9595verdeObjects1.length = 0;
gdjs.corridaCode.GDalga_9595verdeObjects2.length = 0;
gdjs.corridaCode.GDbolhaObjects1.length = 0;
gdjs.corridaCode.GDbolhaObjects2.length = 0;
gdjs.corridaCode.GDbolhasObjects1.length = 0;
gdjs.corridaCode.GDbolhasObjects2.length = 0;


return;

}

gdjs['corridaCode'] = gdjs.corridaCode;
