function onBodyLoad()
{       
    document.addEventListener("deviceready", onDeviceReady, false);
}
function onDeviceReady()
{
    getGeolocation();
}

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
}