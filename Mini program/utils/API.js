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
  serve_url: serve_url
}