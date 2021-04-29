const {ccclass, property} = cc._decorator;

@ccclass
export default class LinearImpulse extends cc.Component 
{
    @property(cc.Vec2)
    impulse:cc.Vec2 = new cc.Vec2(0, 0);

    start () 
    {
        let body = this.node.getComponent(cc.RigidBody);
        if (!body) return;
        body.applyLinearImpulse(this.impulse, body.getWorldCenter(), true)
    }
}
