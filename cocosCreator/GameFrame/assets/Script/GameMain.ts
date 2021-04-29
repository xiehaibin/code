import TimerManage from "./core/manage/TimerManage";
import UIManager from "./core/manage/UIManager";
import SystemUtils from "./core/utils/SystemUtils";
import GlobalData from "./frame/common/GlobalData";
import GameNavigator from "./frame/control/GameNavigator";
import { Student, Student1 } from "./frame/protobuff/proto";

const {ccclass, property} = cc._decorator;

/**
 * 游戏入口 
 * @author hayden
 * @date 2021/4/28 
 * vv
 */
@ccclass
export default class GameMain extends cc.Component 
{
    /** 场景层 */
    @property(cc.Node)
    sceneLayer:cc.Node = null;
    /** UI层 */
    @property(cc.Node)
    uiRoot:cc.Node = null;

    onLoad() 
    {
    }

    start() 
    {
        // 设置帧率
        let fps = (cc.sys.os == cc.sys.OS_IOS) ? GlobalData.gameFrameRate : GlobalData.gameFrameRate;
        cc.game.setFrameRate(fps);

        // 屏幕适配
        cc.view.enableAutoFullScreen(false);
        cc.view.setResizeCallback(()=>{this.resizeResolution();});
        this.resizeResolution();

        // 初始化UI管理器
        UIManager.Instance.init(this.uiRoot, this.sceneLayer);
        // 前往加载场景
        GameNavigator.doNavigator(GameNavigator.NavType.LoadingScene);
    }

    // 自适应分辨率
    public resizeResolution() 
    {
        let canvas = cc.find('Canvas').getComponent(cc.Canvas);
        let designResolutionSize:cc.Size = canvas.designResolution;
        let frameSize:cc.Size = cc.view.getFrameSize();
        let designResolutionScale = designResolutionSize.width/designResolutionSize.height;
        let frameSizeScale = frameSize.width/frameSize.height;
        if (designResolutionScale > frameSizeScale) cc.view.setDesignResolutionSize(designResolutionSize.width, designResolutionSize.height, cc.ResolutionPolicy.FIXED_WIDTH);
        else cc.view.setDesignResolutionSize(designResolutionSize.width, designResolutionSize.height, cc.ResolutionPolicy.FIXED_HEIGHT);
    }

    update(dt)
    {
        TimerManage.Instance.loop(dt);
    }

    /** 调用APP关闭游戏事件 */
    public onQuitGameEvent(): void 
    {
    }
}
/**
 // let student:Student = Student.create();
        // student.name  = "xiehaibin";
        // student.sex   = 1;
        // student.count = 100;
        // let uint8Array:Uint8Array = Student.encode(student).finish();

        // let student1:Student1 = Student1.create();
        // student1.hayden = 1000;
        // student1.plage  = 2000;
        // student1.xhb    = "hayden";
        // let uint8Array1:Uint8Array = Student1.encode(student1).finish();

        // let arrayBuff:ArrayBuffer = this.send(10000, uint8Array);
        // let arrayBuff1:ArrayBuffer = this.send(20000, uint8Array1);

        // let seveDataView:DataView = new DataView(arrayBuff);
        // let seveDataView1:DataView = new DataView(arrayBuff1);
        // let buff:DataView = new DataView(new ArrayBuffer(seveDataView.byteLength + seveDataView1.byteLength));

        // let index:number = 0;
        // for (let i = 0; i < seveDataView.byteLength; i++)
        // {
        //     buff.setUint8(index, seveDataView.getUint8(i));
        //     index++;
        // }
        // for (let i = 0; i < seveDataView1.byteLength; i++)
        // {
        //     buff.setUint8(index, seveDataView1.getUint8(i));
        //     index++;
        // }
        // this.onMessage(buff.buffer);
 public send(id:number, datas:Uint8Array):ArrayBuffer
    {
        let index:number = 0;
        let len:number = datas.length;
        let dataView:DataView = new DataView(new ArrayBuffer(len+4));
        dataView.setUint16(index, len); index += 2;
        dataView.setUint16(index, id);  index += 2;
        for (let i = 0; i < len; i++) 
        {
            dataView.setUint8(index, datas[i]); index++;
        }

        return dataView.buffer;
    }

    public onMessage(buffer:ArrayBuffer):void
    {
        let count:number = 0;
        let pos:number = 0;
        let bufferLen:number = buffer.byteLength;
        while((bufferLen - pos) > 4)
        {
            let seveDataView:DataView = new DataView(buffer.slice(pos, pos+4));
            let len:number = seveDataView.getUint16(0); pos += 2;
            let id:number =  seveDataView.getUint16(2); pos += 2;
            let datas:Uint8Array = new Uint8Array(buffer.slice(pos, pos+len));

            if (count == 0)
            {
                let code:Student = Student.decode(datas, datas.byteLength);
                pos += len;
                SystemUtils.log("解码1： ", code);
                console.log("解码1：",JSON.stringify(code))
            }
            else
            {
                let code:Student1 = Student1.decode(datas, datas.byteLength);
                pos += len;
                SystemUtils.log("解码2： ", code);
                console.log("解码2：",JSON.stringify(code))
            }
            count++;

            cc.log("pos: ", pos, buffer.byteLength);

        }
    }
 */
