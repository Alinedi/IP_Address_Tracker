$(document).ready(function(){
  $(".IPdetails").hide(); //Hide details box onload
  $("#search").click(function () {
    $("#mymap").text('');
    $("#mymap").removeAttr('style');
    var map=null;
    var ip=$("#IPadress").val();
    var api_key = config.SECRET_API_KEY;
    $(function () {
       $.ajax({
           url: "https://geo.ipify.org/api/v1",
           data: {apiKey: api_key, ipAddress: ip},
           success: function(data) {
               let lat = data.location.lat;
               let long = data.location.lng;
               $('#DisplayIP').text(data.ip);
               if(lat!='' && long!=''){
                 $('#DisplayLoca').text(data.location.region + ',' + data.location.city);
               }else{$('#DisplayLoca').text('No Data')};
               $('#DisplayTime').text('UTC' + data.location.timezone);
               $('#DisplayISP').text(data.isp);
               $(".IPdetails").show();
               // To reinitialize Map when chaging parameters
               if(lat!=''&& long!=''){
                 var container = L.DomUtil.get('mymap');
                 if(container != null){
                   container._leaflet_id = null;
                 }

                //Initialize map
                map = L.map('mymap').setView([lat, long], 11);
                console.log("second:"+map);

             L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                 attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
             }).addTo(map);

             var leafletIcon = L.icon ({
               iconUrl:'images/icon-location.svg',
               iconSize:[30,35],
               iconAnchor:[22,94],

             })

             L.marker([lat, long],{icon:leafletIcon}).addTo(map)
                 .openPopup();

             }else{ // This executes when there is no data to display map
               $('#mymap').text("Map can't be shown since no data");
               function reSize(){
                 if($(window).innerWidth() <= 375) {
                   $("#mymap").removeAttr('style');
                   $('#mymap').css({"font-size":"15px","justify-content":"center","padding-left":"110px","padding-top":"150px","font-weight":"700","background-color":"white"});
                 }else{
                   $("#mymap").removeAttr('style');
                   $('#mymap').css({"font-size":"25px","justify-content":"center","bottom":"-160px","font-weight":"700","background-color":"white"});
                 }
               }
               reSize(); // check the screen size when page loads
               $(window).on('resize', function () { // calls the function when screen resizes
                 reSize();
               })

               }

           }

       });
    });

  });
});
