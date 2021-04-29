const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component 
{
    // 速度
    @property(cc.Node)
    box1:cc.Node = null;

    onLoad()
    {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        cc.PhysicsManager.DrawBits.e_aabbBit
        cc.PhysicsManager.DrawBits.e_jointBit |
        cc.PhysicsManager.DrawBits.e_shapeBit;

        // var manager = cc.director.getPhysicsManager();
        // // 开启物理步长的设置
        // manager.enabledAccumulator = true;


        //this.node.on(cc.Node.EventType.TOUCH_START, this.velocity, this);
    }
    // 速度
    private velocity()
    {
        var node = cc.instantiate(this.box1);
        node.parent = this.node;
        node.active = true;
    }
}
