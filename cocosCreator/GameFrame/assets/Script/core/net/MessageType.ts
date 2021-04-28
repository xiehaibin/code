/**
 * 通讯协议号
 * @author hayden
 */
export enum Sys
{
	// 数据封装
	DATA_WRAPPER = 1,
	// 秘钥交换
	KEY_EXCHANGE = 2,
	// 心跳通知
	HEART_BEAT = 3,
	// 错误码提示
	ERROR_CODE = 4,
	// 充值请求
	RECHARGE_REQUEST = 5,
	// 充值请求生成订单响应
	RECHARGE_RESPONSE = 6,
}

export enum Code
{
	/** 背包数据列表 */
	BAG_DATA_LIST = 10000,
}
