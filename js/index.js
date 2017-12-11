/**
 * Created by 22682 on 2017/10/11.
 */
//首页酒店信息
$.ajax(
    {
        type:'get',
        url : 'json/getHotelInfo.json',
        dataType:'json',
        success:function(result){
            if(result.resultId==1){
                //酒店图片处理
                var swip1=result.data.hotel.picturePath;
                var swiparr1=swip1.split(",");
                var swiphtml1='';
                var len=swiparr1.length;
                for(var i=0;i<len;i++){
                    swiphtml1+='<div class="swiper-slide"><img src="';
                    swiphtml1+='img/';
                    swiphtml1+=swiparr1[i];
                    swiphtml1+='"';
                    swiphtml1+='></div>';
                }
                $(".hotel-pic-box .swiper-wrapper").html(swiphtml1);
                $(".pic-num>span").html(len);

                //酒店地址
                var addr=result.data.hotel.province+result.data.hotel.city+result.data.hotel.county+result.data.hotel.road;
                localStorage.setItem("province",result.data.hotel.province)
                $(".map-address").html(addr);
                //酒店名称
                $(".hotel-info-name").html(result.data.hotel.hotelName);
                $("title").html(result.data.hotel.hotelName);
                //酒店电话
                $(".phone-icon").attr("href","tel:"+result.data.hotel.hotelPhone);
                localStorage.setItem("hotelPhone",$(".phone-icon").attr("href"));
                //首页酒店描述
                $(".hotel-info-txt").html(result.data.hotel.detail);
            }
        }
    }
);




//点击调用地图
$(".map-icon").on("click",function(){
    localStorage.setItem('address',$(".map-address").html());
    location.href="map.html";
});





//酒店介绍详情页面
$(".hotel-info-btn").on("click",function(){
    location.href="hotel-introduce.html"
});

//房型介绍列表
$.ajax({
    type:'get',
    url : 'json/getRoomTypeList.json',
    dataType:'json',
    success:function(result){
        if(result.resultId==1){
            var roomtypeList=result.data.roomtypeList;//房型列表数组
            var roomtypehtml='';
            for(var i= 0,len=roomtypeList.length;i<len;i++){
                roomtypehtml+='<div class="room-type"><div class="room-type-info left"><img src="';
                roomtypehtml+='img/';
                roomtypehtml+=roomtypeList[i].thumbnail;
                roomtypehtml+='"><div><h3 class="room-type-name"><a id="';
                roomtypehtml+=roomtypeList[i].roomtypeId;
                roomtypehtml+='">';
                roomtypehtml+=roomtypeList[i].roomtypeName;
                roomtypehtml+='</a><span></span></h3><div class="breakfast">';
                if(roomtypeList[i].breakfast==0){
                    roomtypehtml+="无早";
                }else if(roomtypeList[i].breakfast==1){
                    roomtypehtml+="单早";
                }else if(roomtypeList[i].breakfast==2){
                    roomtypehtml+="双早";
                }
                roomtypehtml+='</div><ul class="room-serv1">';
                var service=roomtypeList[i].services;
                for(var r=0;r<service.length;r++){
                    roomtypehtml+='<li>';
                    roomtypehtml+=service[r].serviceName;
                    roomtypehtml+='</li>';
                }
                roomtypehtml+='</ul><ul class="room-serv2">';
                var params=roomtypeList[i].roomParams;
                for(var h=0;h<params.length;h++){
                    roomtypehtml+='<li>';
                    roomtypehtml+=params[h];
                    roomtypehtml+='</li>';
                }
                roomtypehtml+='</ul></div></div><div class="room-type-book right"><div class="room-price"><h3 class="room-price-now">￥';
                roomtypehtml+=roomtypeList[i].realPrice;
                roomtypehtml+='</h3><h5 class="room-price-prev">￥';
                roomtypehtml+=roomtypeList[i].price;
                roomtypehtml+='</h5></div>';
                if(roomtypeList[i].hasRoom==true){
                    roomtypehtml+='<button class="book-btn" type="button">预定</button></div></div>'
                }else{
                    roomtypehtml+='<button class="full-btn" type="button" disabled="disabled">已满房</button></div></div>'
                }
            }
            $(".room-type-box").append(roomtypehtml);
        }
    }
});

var top0;
//房间信息详情查看
$(".room-type-box").on("click",".room-type-info",function(){
    var name0=$(this).children().children(".room-type-name").children("a").html();
    $(".room-detail-type-name").html(name0);
    $(".room-detail-box").show();
    $(".scroll").animate({"scrollTop": "0px"}, 5);
    //禁止页面滚动
    top0 = $(window).scrollTop();
    $("body").css("top",-top0+"px");
    $("body").css("position","fixed");
    //房间图片展示
    var swiper1 = new Swiper('.roomswip', {
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        observer:true,
        freeMode:false
    });
    //房型名称的滚动
    $(".scroll").scroll(function(){
        $(this).scrollTop()==0?$(".room-detail-type-name").hide():$(".room-detail-type-name").show();
    });
    //请求后台
    var roomtypeId=$(this).find(".room-type-name>a").attr("id");
   /* $.ajax({
        type:"post",
        url:"json/getRoomTypeById.json",
        data:{"roomtypeId":roomtypeId},
        dataType:"json",
        success:function(result){
            if(result.resultId==1){
                //房型名称
                $(".room-detail-type-name").html(result.data.roomType.roomtypeName);
                $(".room-detail-type-name").attr("id",result.data.roomType.roomtypeId);
                //房型价格
                $(".room-detail-price").html('￥'+result.data.roomType.realPrice);
                //房间图片展示
                var roomPic=result.data.roomType.picturePath.split(",");
                var roomswip="";
                for(var i=0;i<roomPic.length;i++){
                    roomswip+='<div class="swiper-slide"><img src="';
                    roomswip+='img/';
                    roomswip+=roomPic[i];
                    roomswip+='"';
                    roomswip+='></div>';
                }
                $(".roomswip .swiper-wrapper").html(roomswip);
                //房间信息列表
                var msghtml="";
                var msgarr=result.data.roomType.roomParams;
                for(var e=0;e<msgarr.length;e++){
                    msghtml+='<div>';
                    msghtml+=msgarr[e];
                    msghtml+='</div>';
                }
                $(".room-intro-row").html(msghtml);
                var msghtml2="";
                var msgarr2=result.data.roomType.services;
                for(var l=0;l<msgarr2.length;l++){
                    msghtml2+='<li>';
                    msghtml2+=msgarr2[l].serviceName;
                    msghtml2+='</li>';
                }
                $(".room-label").html(msghtml2);
                //房间描述
                $(".room-dscp-txt").html(result.data.roomType.detail);
                //取消规则
                $(".room-cancel-txt").html(result.data.roomType.cancelRule);
                //是否可预定
                if(result.data.roomType.hasRoom==false){
                    $(".room-detail-sure>button").html("已满房").css("background","#606060").attr("disabled","disabled");
                }else{
                    $(".room-detail-sure>button").html("预定").css("background","#2890E0").removeAttr("disabled");
                }
            }
        }
    });*/
});

//房间信息详情取消预定按钮
$(".room-detail-cancel>button").on("click",function(){
    $(".room-detail-box").hide();
    $("body").css("position","static");
    $(window).scrollTop(top0)
});






//保存酒店名称
localStorage.setItem('hotelTitle',$("title").html());
//房间信息详情确定预定按钮
$(".room-detail-sure>button").on("click",function(){
    //保存当前房型名称,id,价格
    var name=$(this).parents(".room-detail").children(".room-detail-type-name").html();
    var id=$(this).parents(".room-detail").children(".room-detail-type-name").attr("id");
    var price=$(this).parents(".room-detail").find(".room-detail-price").html().slice(1);
    //保存当前选取时间
    localStorage.setItem("entertime",$("#entertime").html());//页面显示入住时间
    localStorage.setItem("entertime2",$(".input-enter").val());//隐藏入住时间
    localStorage.setItem("leavetime",$("#leavetime").html());//页面显示离店时间
    localStorage.setItem("leavetime2",$(".input-leave").val());//隐藏离店时间
    var night0=$(".night").html();
    localStorage.setItem("night",night0.slice(1,night0.length-1));//隐藏离店时间
    console.log(localStorage.getItem("night"));
    //跳转到预定房间页面
    location.href="book-room.html?name="+name+'&id='+id+'&price='+price;
});

//首页预定按钮
$(".room-type-box").on("click",".book-btn",function(){
  //房型名称
    var name=$(this).parents(".room-type-book").siblings('.room-type-info').find(".room-type-name>a").html();
    var id=$(this).parents(".room-type-book").siblings('.room-type-info').find(".room-type-name>a").attr("id");
    var price=$(this).parent().find(".room-price-now").html().slice(1);
    //预定时间
    localStorage.setItem("entertime",$("#entertime").html());//页面显示入住时间
    localStorage.setItem("entertime2",$(".input-enter").val());//隐藏入住时间
    localStorage.setItem("leavetime",$("#leavetime").html());//页面显示离店时间
    localStorage.setItem("leavetime2",$(".input-leave").val());//隐藏离店时间
    var night0=$(".night").html();
    localStorage.setItem("night",night0.slice(1,night0.length-1));//隐藏离店时间
    console.log(localStorage.getItem("night"));

    location.href="book-room.html?name="+name+'&id='+id+'&price='+price;
});