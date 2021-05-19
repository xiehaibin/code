
export default class ShaderTools
{
    /**
     * 置灰
     * 包括子节点也同时会置灰
     * @param node 置灰的节点
     * @param useGray 是否需要置灰,true:需要置灰,false:还原色彩
     */
    public static gray(node:cc.Node,useGray:boolean):void
    {
        let sps = node.getComponentsInChildren(cc.Sprite);
        
        if(sps && sps.length)
        {
            for (let i = 0; i < sps.length; i++) {
                const sp = sps[i];
                //let material = useGray ? cc.Material.getInstantiatedBuiltinMaterial('2d-gray-sprite',sp) : cc.Material.getInstantiatedBuiltinMaterial("2d-sprite", sp);
                //sp.setMaterial(0,material);
            }
        }
    }
    /**
     * 渐变置灰(只适应2.1.x版本)
     * 包括子节点也同时会置灰
     * @param node 置灰的节点
     * @param useGray 是否需要置灰,true:需要置灰,false:还原色彩
     */
    public static grayGradient(node:cc.Node,useGray:boolean):void
    {
        // let resId = "shader_gray";
        // let mt = AssetsManager.instance.getAsset(resId);
        // if(mt) setMaterial(node,useGray);
        // else{
		// 	Mediator.loadResourceByIds(this,()=>{
		// 		setMaterial(node,useGray);
		// 	},LoadPanelType.NONE,0,resId);
		// }
        // function setMaterial(node:cc.Node,useGray:boolean):void
        // {
        //     let sps = node.getComponentsInChildren(cc.Sprite);
        //     let grayMt = AssetsManager.instance.getAsset(resId);
        //     if(sps && sps.length)
        //     {
        //         for (let i = 0; i < sps.length; i++) {
        //             const sp = sps[i];
        //             let material = useGray ? grayMt : cc.Material.getInstantiatedBuiltinMaterial("2d-sprite", sp);
        //             sp.setMaterial(0,material);
        //         }
        //     }
        // }
    }

    /**
     * 添加材质,子集的所有sprite都会添加相同的材质
     * @param node 
     * @param materialName 
     */
    public static addMaterialToChildren(node:cc.Node,resId:string,cbFun:(materials:cc.Material[])=>void,self:any):void
    {
        // let mt = AssetsManager.instance.getAsset(resId);
        // if(mt) setMaterial(node,mt,cbFun,self);
		// else 
		// {
		// 	Mediator.loadResourceByIds(this,()=>{
		// 		let mt = AssetsManager.instance.getAsset(resId);
		// 		setMaterial(node,mt,cbFun,self);
		// 	},LoadPanelType.NONE,0,resId);
		// }

        // function setMaterial(node:cc.Node,mt:any,cbFun:Function,self:any):void
        // {
        //     let sps = node.getComponentsInChildren(cc.Sprite);
        //     let mts:cc.Material[] = [];
        //     if(sps && sps.length)
        //     {
        //         for (let i = 0; i < sps.length; i++) {
        //             const sp = sps[i];
        //             let material = mt ? mt : cc.Material.getInstantiatedBuiltinMaterial("2d-sprite", sp);
        //             mts.push(material);
        //             sp.setMaterial(0,material);
        //         }
        //     }
        //     if(cbFun) cbFun.apply(self,[mts]);
        // }
    }

    /**
     * 添加材质，只会添加当前节点的sprite材质
     * @param node 
     * @param materialName 
     */
    public static addMaterial(node:cc.Node,resId:string):void
    {
        // let mt = AssetsManager.instance.getAsset(resId);
        // if(mt) setMaterial(node,mt);
		// else 
		// {
		// 	Mediator.loadResourceByIds(this,()=>{
		// 		let mt = AssetsManager.instance.getAsset(resId);
		// 		setMaterial(node,mt);
		// 	},LoadPanelType.NONE,0,resId);
		// }
        // function setMaterial(node:cc.Node,mt:any):void
        // {
        //     let rander = node.getComponent(cc.RenderComponent);
        //     if(rander)
        //     {
        //         let material = mt ? mt : cc.Material.getInstantiatedBuiltinMaterial("2d-sprite", rander);
        //         rander.setMaterial(0,material);
        //     }
        // }
    }

	/**
	 * 对节点及所有子节点置暗(或恢复)
	 * @param isDark 是否置暗
	 * @param node 根节点
	 * @param color 恢复的颜色
	 */
	public static setDark(isDark:boolean, node:cc.Node, color:cc.Color = cc.Color.WHITE):void
	{
		let c = isDark ? cc.Color.GRAY : color;
		this.setColor(c, node);
	}

	/**
	 * 对节点及所有子节点设置颜色
	 * @param color 颜色
	 * @param node 根节点
	 */
	public static setColor(color:cc.Color, node:cc.Node):void
	{
		let sprite = node.getComponent(cc.Sprite);
		let label = node.getComponent(cc.Label);
		if (sprite) sprite.node.color = color;
		else if (label) label.node.color = color;
		for (let i = 0; i < node.children.length; i++)
		{
			this.setColor(color, node.children[i]);
		}
	}

	/**
	 * 对节点及所有子节点置暗(或恢复)
	 * @param isDark 是否置暗
	 * @param node 根节点
	 * @param color 恢复的颜色
	 */
	public static setDarkOnlySprite(isDark:boolean, node:cc.Node, color:cc.Color = cc.Color.WHITE):void
	{
		let c = isDark ? cc.Color.GRAY : color;
		this.setColorOnlySprite(c, node);
	}

	/**
	 * 对节点及所有子节点设置颜色
	 * @param color 颜色
	 * @param node 根节点
	 */
	public static setColorOnlySprite(color:cc.Color, node:cc.Node):void
	{
		let sprite = node.getComponent(cc.Sprite);
		if (sprite) sprite.node.color = color;
		for (let i = 0; i < node.children.length; i++)
		{
			this.setColorOnlySprite(color, node.children[i]);
		}
	}
}