/**
 * Created by 22682 on 2017/10/11.
 */
//待入住&全部切换
var tabs=$(".order-tab-head>div>p");
var contents=$(".order-tab-content>div");
function changeTab(index) {
    window.scrollTo(0,0);
    for(var i = 0, len = tabs.length; i < len; i++) {
        if(i === index) {
            tabs[i].className = 'selected';
            contents[i].className = 'show';
        }else{
            tabs[i].className = '';
            contents[i].className = '';
        }
    }
}

//查看订单详情
function  jumpDetail(a){
    localStorage.setItem("orderNo",$(a).find(".orderNo").html());
    location.href="order-detail.html";
}


var url=location.href;
var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
var paramPhone=paraString[0].slice(paraString[0].indexOf("=")+1,paraString[0].length);
var size=10;//每页请求个数
var beginNum=0;//待入住列表请求初始值
function stayOrderList(beginNum){
    /*$.ajax({
        type:"post",
        url:"json/getOrderList.json",
        data:{"phone":paramPhone,"status":1,"begin":beginNum},
        dataType:"json",

        success:function(result){
            if(result.resultId==1){
                var stayList=result.data.orderList;
                //处理数据
                var secOrderHtml='';
                for(var i=0;i<stayList.length;i++){
                    secOrderHtml+='<div class="order-list book-suc" onclick="jumpDetail(this)"><div><div class="book-suc-list"><span></span><p>预订成功</p></div></div><div><div class="order-list-info"><h4 class="orderNo">';
                    secOrderHtml+=stayList[i].id;
                    secOrderHtml+='</h4><div><span class="order-room-type">';
                    secOrderHtml+=stayList[i].roomTypeName;
                    secOrderHtml+=' x 1间<span class="order-room-price">￥';
                    secOrderHtml+=stayList[i].price;
                    secOrderHtml+='</span></div><div><span>';
                    secOrderHtml+=stayList[i].checkinTime.slice(0,10);
                    secOrderHtml+='</span>入住，<span>';
                    secOrderHtml+=stayList[i].checkoutTime.slice(0,10);
                    secOrderHtml+='</span>退房</div></div></div></div>'
                }
                if(stayList.length<size){
                    $("#stay-in-orders>div").append(secOrderHtml);
                    $(".stay-more").html("没有更多可加载了").attr("disabled","disabled");
                }else{
                    $("#stay-in-orders>div").append(secOrderHtml);
                    $(".stay-more").remove();
                    $("#stay-in-orders").append('<button class="stay-more" type="button">加载更多</button>');

                }

            }
        }
    });*/
}
stayOrderList(0);

//待入住列表加载更多
$("#stay-in-orders").on("click",".stay-more",function(){
    beginNum+=size;
    stayOrderList(beginNum);
});



var beginNum2=0;//全部列表请求初始值
function allOrderList(beginNum){
    /*$.ajax({
        type:"post",
        url:"json/getOrderList.json",
        data:{"phone": paramPhone,"begin":beginNum},
        dataType:"json",
        success:function(result){
            if(result.resultId==1){
                var allList=result.data.orderList;
                //处理数据
                var allOrderHtml='';
                for(var i=0;i<allList.length;i++){
                    switch(allList[i].status) {
                        case 1:
                            allOrderHtml+='<div class="order-list book-suc" onclick="jumpDetail(this)"><div><div class="book-suc-list"><span></span><p>预订成功</p></div></div><div><div class="order-list-info"><h4 class="orderNo">';
                            break;
                        case 2:
                            allOrderHtml+='<div class="order-list book-cal" onclick="jumpDetail(this)"><div><div class="book-cancel-list"><span></span><p>已取消</p></div></div><div><div class="order-list-info order-cancel-list"><h4 class="orderNo">';
                            break;
                        case 3:
                            allOrderHtml+='<div class="order-list book-used" onclick="jumpDetail(this)"><div><div class="book-used-list"><span></span></div></div><div><div class="order-list-info order-used-list"><h4 class="orderNo">';
                            break;
                        case 4:
                            allOrderHtml+='<div class="order-list book-used" onclick="jumpDetail(this)"><div><div class="book-used-list"><span></span></div></div><div><div class="order-list-info order-used-list"><h4 class="orderNo">';
                            break;
                    }
                    allOrderHtml+=allList[i].id;
                    allOrderHtml+='</h4><div><span class="order-room-type">';
                    allOrderHtml+=allList[i].roomTypeName;
                    allOrderHtml+=' x 1间<span class="order-room-price">￥';
                    allOrderHtml+=allList[i].price;
                    allOrderHtml+='</span></div><div><span>';
                    allOrderHtml+=allList[i].checkinTime.slice(0,10);
                    allOrderHtml+='</span>入住，<span>';
                    allOrderHtml+=allList[i].checkoutTime.slice(0,10);
                    allOrderHtml+='</span>退房</div></div></div></div>'
                }
                if(allList.length<size){
                    $("#total-orders>div").append(allOrderHtml);
                    $(".all-more").html("没有更多可加载了").attr("disabled","disabled");
                }else{
                    $("#total-orders>div").append(allOrderHtml);
                    $(".all-more").remove();
                    $("#total-orders").append('<button class="all-more" type="button">加载更多</button>');

                }

            }
        }
    });*/
}
//点击全部
$("#allorder").on("click",function(){
    if($("#total-orders").find(".orderNo").html()){
        return
    }else{
        allOrderList(0);
    }
});
//全部列表加载更多
$("#total-orders").on("click",".all-more",function(){
    beginNum2+=size;
    allOrderList(beginNum2);
});
