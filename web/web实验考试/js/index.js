var start=document.querySelector('.start')
var sec=document.querySelector('.second')
var timeul=document.querySelector('.time')
var sign=0
var timer=null
start.addEventListener('click',()=>{
    var date=new Date()
    var hour=date.getHours()
    var minute=date.getMinutes()
    var second=date.getSeconds()
    if(sign%3==0){
        timer=setInterval(function(){
            date=new Date()
            var second_se=date.getSeconds()
            var hour_se=date.getHours()
            var minute_se=date.getMinutes()
            sec.innerHTML=second_se-second+60*(minute_se-minute)+3600*(hour_se-hour)
        },1000)
    }
    else if(sign%3==1){
        console.log(timer);
        clearInterval(timer)
        var li=document.createElement('li')
        var kkx=date.getSeconds()
        kkx=kkx<10? `0${kkx}`: kkx
        li.innerHTML=`${parseInt(sign/3)+1}.   ${date.getHours()}:${date.getMinutes()}:${kkx}`
        timeul.appendChild(li)
    }
    else if(sign%3==2) {
        clearInterval(timer)
        sec.innerHTML='0'
    }
    sign++
})
