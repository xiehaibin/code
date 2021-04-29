const {ccclass, property} = cc._decorator;

@ccclass
export default class ConveyorBelt extends cc.Component 
{
    @property(Number)
    tangentSpeed:number = 5;

    onLoad () {}
    start () {}

    onPreSolve(contact):void
    {
        cc.log(">>>>>>>>>>", this.tangentSpeed);
        contact.setTangentSpeed( this.tangentSpeed );
    }
}
