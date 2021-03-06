function onBodyLoad()
{       
    //マップの高さ調整へ
    mapHeightAdjust();
    
    //設定済みの位置情報XML読み込みへ
    getSetPlace();
}

$(window).resize(function() {
    mapHeightAdjust();
});

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
    
    //地図作成へ
    createMap();
}

// -------------------------------------------------
// Google Maps 
// ------------------------------------------------- 

var markerArr = [];
var infowindowArr = [];

//地図の高さ調整
function mapHeightAdjust()
{
    var setH = $(window).height()-50;
    $('#mapCanvas').css( "height", setH+"px" );
}

// Google Mapsで現在地の地図を描画
function createMap() {
    
    // 地図オプションの指定
    var myOptions = {
            zoom: 16,
            center: new google.maps.LatLng( 35.681004, 139.766543 ),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    // 地図を取得
    var map = new google.maps.Map( $('#mapCanvas')[0], myOptions );
    
    for( var i=0; i<pointArr.length; i++ )
    {   
        var latlng = new google.maps.LatLng( $(pointArr[i]).find('lat').text(), $(pointArr[i]).find('lng').text() );
        var marker = new google.maps.Marker( { position:latlng, map:map } );
        markerArr.push( marker );
        
        infowindowArr.push( new google.maps.InfoWindow({ content: $(pointArr[i]).find('name').text(), position:latlng }) );
        
        attachMessage(marker);
    }
}

var activeWindow;
var activeWindowMarker;
var activeWindowNum;

function attachMessage(marker)
{
    var i;
    
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

















