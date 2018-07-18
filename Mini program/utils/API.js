/** @name 接口请求路径-测试环境 */
const serve_url = 'http://218.244.158.175/zxxs_server/api_client/index.php/';
//const serve_url = 'https://easy-mock.com/mock/5b224b06fcfce63e92dc3e06/zxxs/';

/** @name 接口请求路径-生产环境 */
// const serve_url = '';

module.exports = {
    serve_url: serve_url,


  /**@name 测试后端测试环境 */
  testBack: 'base/client_config/getClientig',
  
  /** @name 会员-获取个人信息详情 */
  getMemberDetail: 'member/member/getMemberDetail',

  /**@name 02会员-微信登录-获取token和会员id */
  loginWithWechat: 'member/thirdpart_wx/loginWithWechat',

  /**@name 03会员-获取会员认证信息 */
  getMemberAuthInfo: 'member/member/getMemberAuthInfo',

  /**@name 04会员-记录登录状态 */
  loginWithToken: 'member/member/loginWithToken',

  /**@name 05会员-获取会员详情- */
  getMemberDetail: 'member/member/getMemberDetail',

  /**@name 06会员-申请免密支付权限 ##### */
  submitDeductContract: 'member/member_deduct_contract/submitDeductContract',

  /**@name 07货柜-获取货柜详情 */
  getContainerDetail: 'container/container/getContainerDetail',

  /**@name 08货柜-获取订单（扫码开柜） */
  addProductOrder: 'order/product_order/addProductOrder',

  /**@name 09基本-获取仓库分类列表 */
  getWarehouseCategoryList: 'base/warehouse_category/getWarehouseCategoryList',

  /**@name 10基本-获取支付方式列表*/
  getPaymentCodeList: 'base/payment_code/getPaymentCodeList',

  /**@name 11订单-获取仓库商品列表- */
  getWareHouseProductList: 'order/warehouse/getWareHouseProductList',

  /**@name 12订单-订单结算 */
  checkoutProductOrder: 'order/product_order/checkoutProductOrder',

  /**@name 13订单-支付订单（免密支付）##### */
  payProductOrderUseDeductContract: 'order/product_order/payProductOrderUseDeductContract',

  /**@name 15基本-获取订单状态列表 */
  getProductOrderStatusList:'base/product_order_status/getProductOrderStatusList',

  /**@name 16订单-历史订单记录 */
  getProductOrderList: 'order/product_order/getProductOrderList',

  /**@name 18会员-向后台发送电话号码加密信息 */
  setPhoneNumber: 'member/thirdpart_wx/setPhoneNumber',

  /**@name 19会员-向后台发送电话号码加密信息 */
  setWechatMiniProgramMemberInfo: 'member/thirdpart_wx/setWechatMiniProgramMemberInfo',

  /**@name 20订单-支付订单 */
  payProductOrder: 'order/product_order/payProductOrder'

}