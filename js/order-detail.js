/**
 * Created by 22682 on 2017/10/11.
 */
/*$.ajax({
    type:"post",
    url:"json/getOrderById.json",
    data:{"orderNo":localStorage.getItem("orderNo")},
    dataType:"json",
    success:function(result){
        if(result.resultId==1){
            switch(result.data.order.status){
                case 1:
                    $(".order-status").html("预定成功");
                    break;
                case 2:
                    $(".order-status").html("订单已取消");
                    $(".order-status").addClass("order-canceled");
                    $(".money-back").show();
                    $(".cancel-order-btn").hide();
                    $(".again-order-btn").show();
                    break;
                case 3:
                    $(".order-status").html("订单已使用");
                    $(".order-status").addClass("order-used");
                    $(".cancel-order-btn").hide();
                    $(".again-order-btn").show();
                    break;
            }
            $(".order-price").html('￥'+result.data.order.price);
            $(".order-id").html(result.data.order.id);
            $(".order-room-name").html(result.data.order.roomTypeName);
            $(".order-live-time").html(result.data.order.checkinTime.slice(0,10));
            $(".order-leave-time").html(result.data.order.checkoutTime.slice(0,10));
            $(".book-guest-name").html(result.data.order.contactName);
            $(".order-phone").html(result.data.order.contactPhone);
            $(".order-remark").html(result.data.order.remark);
        }
    }
});*/


//联系酒店
$(".call-hotel-btn").attr("href",localStorage.getItem("hotelPhone"));


//取消订单按钮
$(".cancel-order-btn").on("click",function(){
    $(".cancel-order-box").show();
});
//取消取消酒店
$(".cancel-order-cancel").on("click",function(){
    $(".cancel-order-box").hide();
});
//确定取消
$(".cancel-order-sure").on("click",function(){
    $(".cancel-order-box").hide();
    $(".order-canceled-box").show();
    setTimeout(function(){
        $(".order-canceled-box").hide();
        $(".order-status").html("订单已取消").addClass("order-canceled");
        $('.money-back').show();
        $(".cancel-order-btn").hide();
        $(".again-order-btn").show();
    },2000)
});
//重新预定
$(".again-order-btn").on("click",function(){
    location.href="index.html";
});
