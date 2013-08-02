function onBodyLoad()
{       
    document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady()
{
    //設定済みの位置情報XML読み込みへ
    getSetPlace();
    
    //getGeolocation();
}

// -------------------------------------------------  
// XMLデータを取得  
// -------------------------------------------------  

// 設定済み位置情報の取得
function getSetPlace()
{
    $.ajax({  
        url:'point.xml',
        type:'get',
        dataType:'xml',
        timeout:1000,
        success:parse_xml
    });
}

function parse_xml(xml,status){  
    if(status!='success')return;
    //$(xml).find('point').each(disp);
    
    //デバイス情報取得へ
    getGeolocation();
}

// -------------------------------------------------  
// DEVICE情報  
// ------------------------------------------------- 

// 位置情報の取得
function getGeolocation() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// 位置情報の取得成功時のコールバック関数
function onSuccess(position) {
    createMap(position);
}

// エラー時のコールバック関数
function onError(error) {
    alert('コード: '        + error.code    + '\n' +
          'メッセージ: '    + error.message + '\n');
}

// -------------------------------------------------  
// Google Maps 
// ------------------------------------------------- 

// Google Mapsで現在地の地図を描画
function createMap(position) {
    // 緯度経度を取得
    var latlng = new google.maps.LatLng(position.coords.latitude, 
                                        position.coords.longitude);
    // 地図オプションの指定
    var myOptions = {
            zoom: 14,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    // 地図を取得
    var map = new google.maps.Map(document.getElementById("mapCanvas"),
                                  myOptions);
    // マーカーを設定
    var marker = new google.maps.Marker({
            position: latlng, 
            map: map
        });
    
    //XML情報からのマーカー追加
    var dt = "";
    $(xml).find('point').each(function(i){
        dt += $(this).find('lat').text()+":"+$(this).find('lng').text()+"////";
        //$("#debugText").text( dt );
        
        var latlng = new google.maps.LatLng( $(this).find('lat').text(), $(this).find('lng').text() );
        var marker = new google.maps.Marker( { position:latlng, map:map } );
    });
    alert( dt );
    $("#debugText").text( "abs..." );
}



















