/**
 * Created by 22682 on 2017/10/11.
 */
$(".title").html(localStorage.getItem("hotelTitle"));

//初始化房型名称,id,price
var url=location.href;
var paraString=url.slice(url.indexOf("?")+1,url.length).split("&");
$(".book-room-type-name").html(decodeURI(paraString[0].slice(paraString[0].indexOf("=")+1,paraString[0].length)));
$(".book-room-type-name").attr("id",paraString[1].slice(paraString[1].indexOf("=")+1,paraString[1].length));


$(".night").html(localStorage.getItem("night"));//住几晚
var price0=decodeURI(paraString[2].slice(paraString[2].indexOf("=")+1,
paraString[2].length))//房间单价
var priceTotal=price0*localStorage.getItem("night");//房间总价格
$(".book-price").html("￥"+priceTotal);


//初始化预定时间
$("#entertime").html(localStorage.getItem("entertime"));
$(".input-enter").val(localStorage.getItem("entertime2"));
$("#leavetime").html(localStorage.getItem("leavetime"));
$(".input-leave").val(localStorage.getItem("leavetime2"));




//房间数提示框
$(".room-num").on("click",function(){
    $(".room-num-notes-box").show();
    $(".room-num-notes").on("click",function(){
        $(".room-num-notes-box").hide();
    })
});



//支付方式选择

/*$(".btn-apply").on("click",function(){
    $(this).toggleClass("apply-click");
    $(this).parent().siblings(".apply-way-list").find(".btn-apply").removeClass("apply-click");
});*/
//去支付

$(".go-apply").on("click",function(){
    var userName=$(".book-guset").val();
    var phone=$(".book-tel").val();
    if(!userName){
        $(".phone-note-box").show();
        $(".phone-note-box>div").html("入住人姓名不能为空");
        setTimeout(function(){
            $(".phone-note-box").hide();
            $(".book-guset").focus();
        },1500);
        return
    }
    if(!phone){
        $(".phone-note-box").show();
        $(".phone-note-box>div").html("手机号不能为空");
        setTimeout(function(){
            $(".phone-note-box").hide();
            $(".book-tel").focus();
        },1500);
        return
    }
    else{
        var reg=/^(0|86|17951)?(13[0-9]|15[0-35-9]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
        if(!(reg.test(phone))){
            $(".phone-note-box").show();
            $(".phone-note-box>div").html("请输入正确的手机号");
            setTimeout(function(){
                $(".phone-note-box").hide();
                $(".book-tel").focus();
            },2000)
        }else{
            if(!($(".btn-apply").hasClass("apply-click"))){
                $(".phone-note-box").show();
                $(".phone-note-box>div").html("请选择支付方式");
                setTimeout(function(){
                    $(".phone-note-box").hide();
                },1500);
                return
            }else{
               /* $.ajax({
                    type:"post",
                    url:"json/generatorOrder.json",
                    data:{
                        "roomType":$(".book-room-type-name").attr("id"),
                        "contactName":$(".book-guset").val(),
                        "contactPhone":$(".book-tel").val(),
                        "price":$(".book-price").html().slice(1),
                        "checkinTime":$(".input-enter").val().replace(/\//g,'-'),
                        "checkoutTime":$(".input-leave").val().replace(/\//g,'-'),
                        "remark":$(".book-remark").val(),
                        "channel":$(".apply-click").siblings(".apply-ways").find(".ap-way").attr("id")
                    },
                    dataType:"json",
                     success:function(data){

                        if(data.resultId==1){//未满房
                            //window.location.href='pay.html?orderNo='+data.data.orderNo;
                            window.location.href='book-suc.html';
                        }else{//已满房
                            $(".full-room-box").show();
                            $(".full-room-box>div").html(data.resultMsg);
                            setTimeout(function(){
                                $(".full-room-box").hide();
                            },2000)
                        }
                    }
                })*/
                window.location.href='book-suc.html';
            }
        }
    }
});



