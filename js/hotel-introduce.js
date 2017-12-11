/**
 * Created by 22682 on 2017/10/11.
 */
//酒店信息初始化
$.ajax(
    {
        type:'get',
        url : 'json/getHotelInfo.json',
        dataType:'json',
        success:function(result){
            if(result.resultId==1){
                //酒店名称
                $(".hotel-name").html(result.data.hotel.hotelName);
                $("title").html(result.data.hotel.hotelName);
                //开业时间
                var createTime=result.data.hotel.createTime.split("-").slice("0","2").join("年");
                createTime+="月";
                $(".hotel-open-date").html(createTime);

                //酒店地址
                var addr=result.data.hotel.province+result.data.hotel.city+result.data.hotel.county+result.data.hotel.road;
                $(".hotel-address").html(addr);

                //联系电话
                $(".hotel-phone").html(result.data.hotel.hotelPhone);

              //酒店提供服务项目初始化
              //通用设施
                var service2=result.data.services.service2;
                var serviceHtml='<h4>通用设施</h4><ul class="service2">';
                for(var i=0;i<service2.length;i++){
                    serviceHtml+='<li><span><img src="img/';
                    serviceHtml+=service2[i].icon;
                    serviceHtml+='.png"></span><p>';
                    serviceHtml+=service2[i].serviceName;
                    serviceHtml+='</p></li>';
                }
                serviceHtml+='</ul>';

              //活动设施
                var service3=result.data.services.service3;
                serviceHtml+='<h4>活动设施</h4><ul class="service3">';
                for(var r=0;r<service3.length;r++){
                    serviceHtml+='<li><span><img src="img/';
                    serviceHtml+=service3[r].icon;
                    serviceHtml+='.png"></span><p>';
                    serviceHtml+=service3[r].serviceName;
                    serviceHtml+='</p></li>';
                }
                serviceHtml+='</ul>';
              //服务项目
                var service4=result.data.services.service4;
                serviceHtml+='<h4>服务项目</h4><ul class="service4">';
                for(var l=0;l<service4.length;l++){
                    serviceHtml+='<li><span><img src="img/';
                    serviceHtml+=service4[l].icon;
                    serviceHtml+='.png"></span><p>';
                    serviceHtml+=service4[l].serviceName;
                    serviceHtml+='</p></li>';
                }
                serviceHtml+='</ul>';
              //客房设施
                var service5=result.data.services.service5;
                serviceHtml+='<h4>客房设施</h4><ul class="service5">';
                for(var y=0;y<service5.length;y++){
                    serviceHtml+='<li><span><img src="img/';
                    serviceHtml+=service5[y].icon;
                    serviceHtml+='.png"></span><p>';
                    serviceHtml+=service5[y].serviceName;
                    serviceHtml+='</p></li>';
                }
                serviceHtml+='</ul>';
                $(".hotel-service-lists").html(serviceHtml);




              //酒店政策
                if(result.data.policy){
                    var policyArr=result.data.policy;
                    var policyhtml='<h3>酒店政策</h3><table class="hotel-policy"><tbody>';
                    for(var i=0;i<policyArr.length;i++){
                        policyhtml+='<tr><td>';
                        policyhtml+=policyArr[i].name;
                        policyhtml+='：</td><td>';
                        policyhtml+=policyArr[i].content;
                        policyhtml+='</td></tr>';
                    }
                    policyhtml+='</tbody></table>';
                    $(".hotel-policy-box").append(policyhtml);
                }
                //酒店描述
                if(result.data.hotel.detail){
                    var descriphtml='<h3>酒店描述</h3><div class="hotel-description">'+result.data.hotel.detail+'</div>';
                    $(".hotel-policy-box").append(descriphtml);
                }

            }
        }
    }
);






