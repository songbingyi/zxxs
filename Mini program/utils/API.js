/** @name 接口请求路径-测试环境 */
// const serve_url = 'http://218.244.158.175/lex_server/api_client/index.php';
const serve_url = 'https://easy-mock.com/mock/5b224b06fcfce63e92dc3e06/zxxs/';

/** @name 接口请求路径-生产环境 */
// const serve_url = '';

module.exports = {
  /** @name 会员-获取个人信息详情 */
  getMemberDetail: 'member/member/getMemberDetail',

  /** @name 获取信息数据 */
  getDataInfo: 'about/info/getDataInfo',

  /** @name 订单-获取菜品信息数据 */
  getOrderInfo: 'orderDatas',

  /**@name 用户-订单-以往订单信息 */
  getUserOrderList: 'userOrderList',

  /**@name 02会员-微信登录-获取token和会员id */
  loginWithWechat: 'member/thirdpart_wx/loginWithWechat',

  /**@name 03会员-获取会员认证信息 */
  getMemberAuthInfo: 'member/member/getMemberAuthInfo',

  /**@name 04会员-会员-记录登录状态 */
  loginWithToken: 'member/member/loginWithToken',



  serve_url: serve_url
}