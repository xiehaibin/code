import BasePanel from "../../../core/ui/BasePanel";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestPanel extends BasePanel 
{
    onLoad () 
    {
        this.panelId = 1;
        this.isTweenOpen = false;
    }

    onEnable()
    {
        super.onEnable();
        cc.log("TestPanel  -   onEnable");
    }

    onDisable()
    {
        super.onDisable();
        cc.log("TestPanel  -   onDisable");
    }

    start ()
    {
    }

    onDestroy()
    {
        cc.log("TestPanel  -   onDestroy");
    }
}
