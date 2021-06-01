const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component 
{
    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    start () 
    {
        //this.glProgram

        cc.log("=====================", Math.pow(2,0.5));
        cc.log("=====================", (0.7 - (-0.8)) / (0.7 - (-0.8)) * (0.3 - 0.2) + 0.2);
    }
}
