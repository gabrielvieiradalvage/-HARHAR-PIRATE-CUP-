gdjs.TutorialCode = {};
gdjs.TutorialCode.localVariables = [];
gdjs.TutorialCode.idToCallbackMap = new Map();
gdjs.TutorialCode.GDtutorial_9595explica_95231_95227oObjects1= [];
gdjs.TutorialCode.GDtutorial_9595explica_95231_95227oObjects2= [];
gdjs.TutorialCode.GDtutorialObjects1= [];
gdjs.TutorialCode.GDtutorialObjects2= [];


gdjs.TutorialCode.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("tutorial"), gdjs.TutorialCode.GDtutorialObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.TutorialCode.GDtutorialObjects1.length;i<l;++i) {
    if ( gdjs.TutorialCode.GDtutorialObjects1[i].IsClicked(null) ) {
        isConditionTrue_0 = true;
        gdjs.TutorialCode.GDtutorialObjects1[k] = gdjs.TutorialCode.GDtutorialObjects1[i];
        ++k;
    }
}
gdjs.TutorialCode.GDtutorialObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Menu_Principal", false);
}
}

}


};

gdjs.TutorialCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.TutorialCode.GDtutorial_9595explica_95231_95227oObjects1.length = 0;
gdjs.TutorialCode.GDtutorial_9595explica_95231_95227oObjects2.length = 0;
gdjs.TutorialCode.GDtutorialObjects1.length = 0;
gdjs.TutorialCode.GDtutorialObjects2.length = 0;

gdjs.TutorialCode.eventsList0(runtimeScene);
gdjs.TutorialCode.GDtutorial_9595explica_95231_95227oObjects1.length = 0;
gdjs.TutorialCode.GDtutorial_9595explica_95231_95227oObjects2.length = 0;
gdjs.TutorialCode.GDtutorialObjects1.length = 0;
gdjs.TutorialCode.GDtutorialObjects2.length = 0;


return;

}

gdjs['TutorialCode'] = gdjs.TutorialCode;
