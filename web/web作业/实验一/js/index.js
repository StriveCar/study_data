var checkall = document.getElementsByName('allChecked')
var allinput = document.getElementsByName('shopB')
var shopC = document.querySelectorAll('.shopC')
var count = document.querySelector('.total-amount')
var shop = document.querySelector('.shop').children
var allperie=document.querySelector('.account-price')
var shopcon = document.querySelectorAll('.shop-content')
var showperie=document.querySelectorAll('.shop-account')

function inputcheck(a) {
    allinput.forEach((input,index) => {
        input.checked = a
        if(a)   
        {
            shopC[index].style.backgroundColor='#FFF4E8'
            shopcon[index].style.backgroundColor='#FFF4E8'
        }
        else 
        {
            shopC[index].style.backgroundColor='#FFFFFF'
            shopcon[index].style.backgroundColor='#FFFFFF'
        }
    })
}
function addperie(checked){
    if (checked)
    {
        allinput.forEach((bool,index)=>{
            if (!bool.checked){
                allperie.innerHTML=parseInt(allperie.innerHTML.replace('￥',''))+parseInt(showperie[index].innerHTML)
            }
        })
    }
    else{
        allperie.innerHTML='0.00'
    }
}

checkall[0].addEventListener('click', function () {
    addperie(checkall[0].checked)
    inputcheck(this.checked)
    if(checkall[0].checked) count.innerHTML=shop.length
    else count.innerHTML=0
    checkall[1].checked = !checkall[1].checked
})
checkall[1].addEventListener('click', function () {
    addperie(checkall[1].checked)
    inputcheck(this.checked)
    if(checkall[1].checked) count.innerHTML=shop.length
    else count.innerHTML=0
    checkall[0].checked = !checkall[0].checked
})
allinput.forEach((input,index) => {
    input.addEventListener('change', function(){
        var n = 0
        allinput.forEach((input) => {
            if (input.checked === true) n++
        })
        if (input.checked === false) {
            allperie.innerHTML=parseInt(allperie.innerHTML.replace('￥',''))-parseInt(showperie[index].innerHTML)+'.00'
            checkall[0].checked = false
            checkall[1].checked = false
            shopcon[index].style.backgroundColor='#FFFFFF'
            shopC[index].style.backgroundColor='#FFFFFF'
            
        }
        else{
            allperie.innerHTML=parseInt(allperie.innerHTML.replace('￥',''))+parseInt(showperie[index].innerHTML)+'.00'
            shopcon[index].style.backgroundColor='#FFF4E8'
            shopC[index].style.backgroundColor='#FFF4E8'
        }
        count.innerHTML = n
    })
})

var deletes=document.querySelectorAll('.shopDel')

deletes.forEach((deletebtn,index)=>{
    deletebtn.addEventListener('click',()=>{
        shopcon[index].style.display='none'
    })
})

function alperies(add,num,bool,sign,index){
    var perie=add.parentNode.parentNode.previousElementSibling.innerHTML.replace('￥','')
    showperie[index].innerHTML=parseInt(num)*parseFloat(perie)+'.00'
    if(bool){
        if(sign==1) allperie.innerHTML=parseInt(allperie.innerHTML.replace('￥',''))+parseInt(perie)
        if(sign==2) allperie.innerHTML=parseInt(allperie.innerHTML.replace('￥',''))-parseInt(perie)
    }
}
var adds=document.querySelectorAll('.add')
var reduces=document.querySelectorAll('.reduce')
adds.forEach((add,index)=>{
    add.addEventListener('click',()=>{
        var num=add.previousElementSibling.querySelector('input')
        num.value=parseInt(num.value)+1;
        alperies(add,num.value,allinput[index].checked,1,index)
    })
})
reduces.forEach((reduce,index)=>{
    reduce.addEventListener('click',()=>{
        var num=reduce.nextElementSibling.querySelector('input')
        if(parseInt(num.value)==1) return
        num.value=parseInt(num.value)-1;
        alperies(reduce,num.value,allinput[index].checked,2,index)
    })
})