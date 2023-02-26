// Module require
console.log("Server Start - Nodejs - 123");

const { log } = require("console");
var express = require("express");
var mqtt = require('mqtt');
var app = express();
var mysql = require('mysql2')    
var server = require("http").Server(app)
var exportCharts = require('./chart.js')

var io = require("socket.io").listen(server);
app.use(express.static('public'));


app.set("view engine","ejs");

app.set("views","./views"); 
app.get('/', function (req, res) {
    res.render('web.ejs');
})

app.get('/history', function (req, res) {
    res.render('history.ejs')
})



var myport = 6060;

server.listen(myport, function () {
    console.log('Server listening at port ', myport);
});


// Initialize the MQTT client
var client = mqtt.connect('mqtt://broker.hivemq.com:1883', { clientId: "namnam" });

// Declare topics
// var topic1 = "systemgarden1DEN";
// var topic2 = "systemgarden1PUMP";
// var topic3 = "systemgarden1ONTIMERDEN";
// var topic4 = "sytemgarden1OFFTIMERDEN";
// var topic5 = "systemgarden1ONTIMERPUMP";
// var topic6 = "systemgarden1OFFTIMERPUMP";

var topic_list = ["nam/sensors/temperature-humidity"];
var topic7 = "nam/sensors/temperature-humidity";
var topic8 = "nam/state/led-pump";
var topic9 = "systemGardenlightBrightness";

// // Subscribe topic
// client.subscribe(topic7);
// client.subscribe(topic8);

// SQL--------Temporarily use PHPMyAdmin------------------------------
// var con = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '123456789',
//     database: 'huydatabase'
// });


//---------------------------------------------CREATE TABLE-------------------------------------------------
// con.connect(function (err) {
//     if (err) throw err;
//     console.log("mysql connected");
//     var sql = "CREATE TABLE IF NOT EXISTS SmartGarden(ID int(10) not null primary key auto_increment, Time datetime not null, Temperature int(3) not null, Humidity int(3) not null, Light int(5) not null )"
//     con.query(sql, function (err) {
//         if (err)
//             throw err;
//         console.log("Table created");
//     });
// })

// var m_time
// var newTemp
// var newHumi
// var newLight

//  //---------------------------------Push data to Database-----------------------------------
// var cnt_check = 0;
// client.on('message', function (topic, message, packet) {
//     const objData = JSON.parse(message)
//     if (topic == topic_list[0]) {
//         cnt_check = cnt_check + 1
//         newTemp  = objData.Temperature;
//         newHumi  = objData.Humidity;
//         newLight = objData.Light;
//     }

//     if (cnt_check == 1) {
//         cnt_check = 0

//         console.log("ready to save")
//         var n = new Date()
//         var month = n.getMonth() + 1
//         var Date_and_Time = n.getFullYear() + "-" + month + "-" + n.getDate() + " " + n.getHours() + ":" + n.getMinutes() + ":" + n.getSeconds();

//          var sql = "INSERT INTO SmartGarden (Time, Temperature, Humidity, Light) VALUES ('" + Date_and_Time.toString() + "', '" + newTemp + "', '" + newHumi + "', '" + newLight + "')"
//         con.query(sql, function (err, result) {
//             if (err) throw err;
//             console.log("Table inserted");
//             console.log(Date_and_Time + " " + newTemp + " " + newHumi + " " + newLight)
//         });
//         exportCharts(con, io)
//     }
// })



client.on("connect", function () {
    console.log("connected mqtt " + client.connected);
});

client.on("error", function (error) {
    console.log("Can't connect" + error);
    process.exit(1)
});
client.on("connect", () => {
    client.subscribe(topic7)
    client.subscribe(topic8)
    // client.subscribe(topic5)
    // client.subscribe(topic3)
});

//-------MQTT-----
client.on('message', function(topic, message) {
    
   var datasub = message.toString();
   var DataJson = JSON.parse(datasub);
   console.log(DataJson);
   if(topic == topic7){
       io.emit("sendData", datasub);
   }
   else if(topic == topic8){
       io.emit("sendDataesp", datasub);
   }
//    else if(topic == topic5){
//        io.emit("timeSetesp", datasub);
//    }
//    else if(topic == topic3){
//     io.emit("timeSetespLight", datasub);
//    }
});


//----Socket---------Control devices----------------------------
io.on("connection", function(socket) 
{
    console.log("Có người truy cập id:" + socket.id);
  
    socket.on("disconnect",function()
	{
		console.log(socket.id + " ngắt kết nối server!!!!");
	});

    // Receive data cotrol devices and publish to MQTT
    // socket.on('htmlclient', function(data) {
    //     var datasendtoEsp = JSON.parse(data);
    //     if (datasendtoEsp.TB1 != null){
    //         console.log("Đèn");
    //         console.log(data);
    //         client.publish(topic1,data);
    //     }

    //     if (datasendtoEsp.TB2 != null){
    //         console.log("Máy Bơm");
    //         console.log(data);
    //         client.publish(topic2,data);
    //     }
    //   });

      // Receive data timer light and publish to MQTT
    // socket.on('timerlight', function(data){
    //     var dataTime = JSON.parse(data);
    //     if (dataTime.device == 'Light' && dataTime.statusOn ==1){
    //         console.log("Bật hẹn giờ bật đèn");
    //         console.log(dataTime);
    //         client.publish(topic3,data);
    //     }

    //     if (dataTime.device == 'Light' && dataTime.statusOn ==0){
    //         console.log("Tắt hẹn giờ bật đèn");
    //         console.log(dataTime);
    //         client.publish(topic3,data);
    //     } 
        
    //     if (dataTime.device == 'Light' && dataTime.statusOff ==1){
    //         console.log("Bật hẹn giờ tắt đèn");
    //         console.log(dataTime);
    //         client.publish(topic4,data);
    //     }

    //     if (dataTime.device == 'Light' && dataTime.statusOff ==0){
    //         console.log("Tắt hẹn giờ tắt đèn");
    //         console.log(dataTime);
    //         client.publish(topic4,data);
    //     } 
        
    // })

    // Send data timer pump and publish to MQTT
    // socket.on('timerPump', function(data){
    //     var dataTime = JSON.parse(data);
    //     if (dataTime.device == 'Pump' && dataTime.statusOn ==1){
    //         console.log("Bật hẹn giờ bật máy bơm");
    //         console.log(dataTime);
    //         client.publish(topic5,data);
    //     }

    //     if (dataTime.device == 'Pump' && dataTime.statusOn==0){
    //         console.log("Tắt hẹn giờ bật máy bơm");
    //         console.log(dataTime);
    //         client.publish(topic5,data);
    //     }  

    //     if (dataTime.device == 'Pump' && dataTime.statusOfff ==1){
    //         console.log("Bật hẹn giờ tắt máy bơm");
    //         console.log(dataTime);
    //         client.publish(topic6,data);
    //     }

    //     if (dataTime.device == 'Pump' && dataTime.statusOfff ==0){
    //         console.log("Tắt hẹn giờ tắt máy bơm");
    //         console.log(dataTime);
    //         client.publish(topic6,data);
    //     }  
    // })

    // socket.on('lightBrightness', function(data){
    //     // var lightValue = JSON.parse(data);
    //     console.log("LightBrightness:");
    //     console.log(data);
    //     client.publish(topic9,data);
    // })
    
    // var sql1 = "SELECT * FROM huydatabase.SmartGarden ORDER BY ID desc limit 100"
    // con.query(sql1, function (err, result, fields) {
    //     if (err) throw err;
    //     console.log("Full Data selected");
    //     var fullData = []
    //     result.forEach(function (value) {
    //         var m_time = value.Time.toString().slice(4, 24);
    //         fullData.push({ id: value.ID, time: m_time, temp: value.Temperature, humi: value.Humidity, light: value.Light  })
    //     })
    //     io.sockets.emit('send-full', fullData)
    //     // console.log(fullData);
    // })

    // var sqlmax ="SELECT *FROM huydatabase.SmartGarden order by Temperature desc limit 1";

      
    //   con.query(sqlmax, function (err, results) {
    //       if (err) throw err;
    //       console.log(results);
    //       io.sockets.emit("dataMax", results)
    //     });
});



