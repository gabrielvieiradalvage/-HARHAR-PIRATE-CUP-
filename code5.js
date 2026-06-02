gdjs.Cr_233ditoCode = {};
gdjs.Cr_233ditoCode.localVariables = [];
gdjs.Cr_233ditoCode.idToCallbackMap = new Map();
gdjs.Cr_233ditoCode.GDNewTextObjects1= [];
gdjs.Cr_233ditoCode.GDNewTextObjects2= [];
gdjs.Cr_233ditoCode.GDcreditosObjects1= [];
gdjs.Cr_233ditoCode.GDcreditosObjects2= [];


gdjs.Cr_233ditoCode.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("creditos"), gdjs.Cr_233ditoCode.GDcreditosObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Cr_233ditoCode.GDcreditosObjects1.length;i<l;++i) {
    if ( gdjs.Cr_233ditoCode.GDcreditosObjects1[i].IsClicked(null) ) {
        isConditionTrue_0 = true;
        gdjs.Cr_233ditoCode.GDcreditosObjects1[k] = gdjs.Cr_233ditoCode.GDcreditosObjects1[i];
        ++k;
    }
}
gdjs.Cr_233ditoCode.GDcreditosObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Menu_Principal", false);
}
}

}


};

gdjs.Cr_233ditoCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Cr_233ditoCode.GDNewTextObjects1.length = 0;
gdjs.Cr_233ditoCode.GDNewTextObjects2.length = 0;
gdjs.Cr_233ditoCode.GDcreditosObjects1.length = 0;
gdjs.Cr_233ditoCode.GDcreditosObjects2.length = 0;

gdjs.Cr_233ditoCode.eventsList0(runtimeScene);
gdjs.Cr_233ditoCode.GDNewTextObjects1.length = 0;
gdjs.Cr_233ditoCode.GDNewTextObjects2.length = 0;
gdjs.Cr_233ditoCode.GDcreditosObjects1.length = 0;
gdjs.Cr_233ditoCode.GDcreditosObjects2.length = 0;


return;

}

gdjs['Cr_233ditoCode'] = gdjs.Cr_233ditoCode;
