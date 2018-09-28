$(function () {
    //1.获取当前城市的天气信息
    let tianqi
    $.ajax({
        type:'GET',
        url:'https://www.toutiao.com/stream/widget/local_weather/data/?city=太原',
        dataType:'jsonp',
        success:function (obj) {
            tianqi=obj.data;
            console.log(tianqi);
            updata(tianqi)
        }

    })
    //获取天气数据的函数
    function updata(tianqi) {
        //获取当前的城市
        $('.city').html(tianqi.city)
        //获取当前城市的天气情况
       $('.kongqi').html(tianqi.weather.quality_level)
        //获取当前温度
        $('header h2').html(tianqi.weather.current_temperature+'°')
        //获取当前天气状况
        $('header h3').html(tianqi.weather.current_condition)

        //今天的天气
        $('.today-h').html(tianqi.weather.dat_high_temperature)
        $('.today-l').html(tianqi.weather.dat_low_temperature+'℃')
        $('.today-w').html(tianqi.weather.dat_condition)
        $('.today-p').attr('src',"img/"+Number(tianqi.weather.dat_weather_icon_id)+".png")
        //明天的天气
        $('.tomorrow-h').html(tianqi.weather.tomorrow_high_temperature)
        $('.tomorrow-l').html(tianqi.weather.tomorrow_low_temperature+'℃')
        $('.tomorrow-w').html(tianqi.weather.tomorrow_condition)
        $('.tomorrow-p').attr('src',"img/"+Number(tianqi.weather.tomorrow_weather_icon_id)+".png")

        //每小时天气变化
        $('.box2').html('')
        let hours=tianqi.weather.hourly_forecast
        // console.log(hours)
        hours.forEach((val)=>{
            let str=`<li class="box2-inner">
        <p><span>${val.hour}</span>:00</p>
         <img src="img/${val.weather_icon_id}.png" alt="">
        <p>${val.temperature+'°'}</p>
        </li>`
            $('.box2').append(str)
        })

        //每天天气变化
        $('.box3').html('')
        let days=tianqi.weather.forecast_list
        // console.log(days);
        days.forEach((val)=>{
          let str=`
          <li >
        <div class="top">
         <span>日期</span>
         <span>${val.date}</span>
         <span>${val.condition}</span>
         <img src="img/${val.weather_icon_id}.png" alt="">
         <span>${val.high_temperature+'°'}</span>
     </div>
      <div class="floor">
          <span>${val.low_temperature+'°'}</span>
          <img src="img/${val.weather_icon_id}.png" alt="">
          <span>${val.condition}</span>
          <span>${val.wind_direction}</span>
          <span><span>${val.wind_level}</span>级</span>
      </div>
    </li>`
            $('.box3').append(str)
        })

    }

    $('.city').click(function () {
        console.log($('.city'));
        $('.hidden').animate({'top':0})
        $('.box3').css('display','none')
        $('footer').css('display','none')
        $('.break-up').css('display','none')
    })
    $('.hidden-top span').click(function () {

        $('.hidden').animate({'top':'-13.34rem'})
        $('.box3').css('display','flex')
        $('footer').css('display','block')
        $('.break-up').css('display','block')
    })

//获取城市
    let city
    $.ajax({
        type:'GET',
        url:'https://www.toutiao.com/stream/widget/local_weather/city/',
        dataType:'jsonp',
        success:function (obj) {
            city=obj.data
            // console.log(city);
            updataCity(city)
        }
    })
    //获取每个城市信息
    //[[a,d,t],[1,2,3],[]]
    function updataCity(city) {
        let k=0
        for(let i in city){
            // console.log(i);
            console.log(city[i]);
            let str=` <section>
            <div class="stop">
            <h2>${i}</h2>
            <i class="iconfont icon-lajitong"></i>
            </div>
            <div class="some">
            </div>
            </section>`;
            $('.hidden').append(str)
            for(let j in city[i] ){
                console.log(j)
                let str1=`<p>${j}</p>`
             $('.some').eq(k).append(str1)
            }
            k++
        }
    }

//点击每个城市,获取当前城市的天气信息
    window.onload=function () {

        $('.some p').click(function () {
            $('.hidden').animate({'top':'-13.34rem'})
            $('.box3').css('display','flex')
            $('footer').css('display','block')
            $('.break-up').css('display','block')
            let con=$(this).html()
            console.log(con);
            ajaxs(con)
        })
    //获取某个城市的天气信息
        function ajaxs(str) {
            let url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`
            $.ajax({
               type:'GET',
               url:url1,
                dataType:'jsonp',
                success:function (obj) {
                    let tianqi2=obj.data
                    updata(tianqi2)
                }

            })
        }
        $('.some p').click(function () {
            console.log($('.some p'));
            /*$('.hidden').animate({'top':'-13.34rem'})
            $('.box3').css('display','flex')
            $('footer').css('display','block')
            $('.break-up').css('display','block')*/
            let con=$(this).html()
            ajaxs(con)
        })
        //在搜索框内输入内容,可以搜索
        $('.hidden-top input').focus(function () {
            $('.hidden-top span').html('搜索')
        })
        $('.hidden-top input').blur(function () {
            $('.hidden-top span').html('取消')
        })

        $('.hidden-top span').click(function () {
            $('.hidden').animate({'top':'-13.34rem'})
            $('.box3').css('display','flex')
            $('footer').css('display','block')
            $('.break-up').css('display','block')
            let text=$('.hidden-top input').val()
            //ajaxs(text)
            for(let i in city){
                for(let j in city[i]){
                    if(text==j){
                        ajaxs(text);
                    }
                }

            }
            //alert("该城市不存在");
        })
    }

})
//1.获取默认城市的天气信息
//2.获取所有城市的信息
//3.点击每个城市可以获取当前城市的天气信息
//4.在搜索框内输入要搜索的城市,点击搜索按钮可以进行搜索
