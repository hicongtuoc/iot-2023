var socket = io("http://localhost:6060")

socket.on("send-full", function (data) {


    // History page
    $("#time-content").html(data.time)
    $("#temp-content").html(data.temp)
    $("#humi-content").html(data.humi)
    $("#id-content").html(data.id)
    $("#light-content").html(data.light)
    console.log(data)
    
    data.forEach(function (item) {
        $("#time-content").append("<div class='h-para'>" + item.time + "</div>")
        $("#temp-content").append("<div class='h-para'>" + item.temp + "</div>")
        $("#humi-content").append("<div class='h-para'>" + item.humi + "</div>")
        $("#id-content").append("<div class='h-para'>" + item.id + "</div>")
        $("#light-content").append("<div class='h-para'>" + item.light + "</div>")
    })
    
})

// var datafromSQL;

// socket.on("dataMax", function(data){
//         datafromSQL = data;
//     })

// function searchMax(){
//     alert("Nhiệt độ lớn nhất: "+ datafromSQL[0].Temperature+ " tại thời gian lúc: "+ datafromSQL[0].Time.slice(0,10) + " " + datafromSQL[0].Time.slice(11,19));  
// }