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

var pointXML;
var pointArr;
function parse_xml(xml,status){  
    if(status!='success')return;
    
    pointXML = xml;
    pointArr = $(xml).find('point');
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
            center: new google.maps.LatLng( 35.681004, 139.766543 ),
            //center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    // 地図を取得
    var map = new google.maps.Map(document.getElementById("mapCanvas"),
                                  myOptions);
    // マーカーを設定
    /*
    var marker = new google.maps.Marker({
            position: latlng, 
            map: map
        });
    */
    
    //XML情報からのマーカー追加
    //var dt = "あらーと";
    
    for( var i=0; i<pointArr.length; i++ )
    {
    //$(pointXML).find('point').each(function(){
        //dt += $(this).find('lat').text()+":"+$(this).find('lng').text()+"////";
        //$("#debugText").text( dt );
        
        //alert();
        
        var latlng = new google.maps.LatLng( $(pointArr[i]).find('lat').text(), $(pointArr[i]).find('lng').text() );
        var marker = new google.maps.Marker( { position:latlng, map:map } );
        markerArr.push( marker );
        
        infowindowArr.push( new google.maps.InfoWindow({ content: $(pointArr[i]).find('name').text(), position:latlng }) );
        
        //attachMessage(marker);
        
    //});
    }
}

var activeWindow;
var activeWindowMarker;
var activeWindowNum;

function attachMessage(marker) {
    
    //if( activeWindow )activeWindow.close(activeWindowMarker.getMap(), activeWindowMarker);
    
    var i;
    
    //WINDOW CLOSE
    /*
    for( i=0; i<infowindowArr.length; i++ )
    {
        infowindowArr[i].close(markerArr[i].getMap(), markerArr[i]);
    }
    */
    
    activeWindowMarker = marker;
    google.maps.event.addListener(marker, 'click',  function(event) {
                                                        
                                                        for( i=0; i<markerArr.length; i++ )
                                                        {
                                                            if( marker == markerArr[i] )
                                                            {
                                                                activeWindowNum = i;
                                                            }
                                                        }
                                                        
                                                        //WINDOW OPEN
                                                        activeWindow = infowindowArr[activeWindowNum];
                                                        infowindowArr[activeWindowNum].open(markerArr[activeWindowNum].getMap(), markerArr[activeWindowNum]);
                                                    });
}

















