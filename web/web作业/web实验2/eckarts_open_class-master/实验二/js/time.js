var timer = setTimeout(time, 1000); //開始运行
function time() {
  clearTimeout(timer); //清除定时器
  dt = new Date();
  var y = dt.getFullYear();
  var mt = dt.getMonth() + 1;
  mt=mt<10?'0'+mt:mt;
  var day = dt.getDate();
  day=day<10?'0'+day:day;
  var h = dt.getHours(); //获取时
  h=h<10?'0'+h:h;
  var m = dt.getMinutes(); //获取分
  m=m<10?'0'+m:m;
  var s = dt.getSeconds(); //获取秒
  s=s<10?'0'+s:s;
  $(".showTime").html(
    "当前时间：" +
      y +
      "年" +
      mt +
      "月" +
      day +
      "-" +
      h +
      "时" +
      m +
      "分" +
      s +
      "秒"
  );
  timer = setTimeout(time, 1000); //设定定时器，循环运行
}
