var socket = io("http://localhost:6060");

// Slider light

// var slider = document.getElementById("myRange");
// var slider1 = document.getElementById("myRange1");


// if(slider) {
//     slider.oninput = function() {
//         var value = this.value;
//         console.log(value) ;
//         socket.emit('lightBrightness',JSON.stringify({"3":value}))
//     }
// }

// if(slider1) {
//     slider1.oninput = function() {
//         console.log(this.value) ;
//     }
// }


const $= document.querySelector.bind(document)


socket.on("sendData", function(data){
  var new_data = JSON.parse(data)
  // Ánh sáng
  $("#currentLight").innerHTML = `${new_data.Light.toFixed(2)} Lux`;
  //Độ ẩm
  $("#currentHumidity").innerHTML = `${new_data.Humidity.toFixed(2)}%`;
  // //Nhiệt độ
  $("#currentTemperature").innerHTML = `${new_data.Temperature.toFixed(2)}°C`;
  // Bụi
  $("#currentDust").innerHTML = `${new_data.Dust.toFixed(2)} mg/m³`;
   // Ga
  

  //messengerLight
  if (new_data.Light <= 80 ) {
    $("#messengerLight").innerHTML = 'Ánh sáng yếu';
  }
  else if(new_data.Light > 80 && new_data.Light <=200) {
    $("#messengerLight").innerHTML = 'Ánh sáng vừa phải, không nên đọc sách';
  }
  else if (new_data.Light > 200 && new_data.Light <=300) {
    $("#messengerLight").innerHTML = 'Ánh sáng phù hợp cho ăn uống';
  }
  else if (new_data.Light > 300 && new_data.Light <=500) {
    $("#messengerLight").innerHTML = 'Ánh sáng phù hợp cho nhiều hoạt động thể dục';
  }
  //messegerTem
  if (new_data.Temperature <= 20 ) {
    $("#messengerTemperature").innerHTML = 'Bật máy sưởi';
  }
  else if(new_data.Temperature > 20 && new_data.Temperature <=25) {
    $("#messengerTemperature").innerHTML = 'Khoác thêm áo';
  }
  else if (new_data.Temperature > 25) {
    $("#messengerTemperature").innerHTML = 'Bật quạt, điều hòa';
  }
  //messegerDust
  if (new_data.Dust >= 0 && new_data.Dust <= 12 ) {
    $("#messengerDust").innerHTML = 'Không khí tốt';
  }
  else if(new_data.Dust > 12 && new_data.Dust <= 34.5) {
    $("#messengerDust").innerHTML = 'Không khí trung bình';
  }
  else if (new_data.Dust > 34.5 && new_data.Dust <= 55.4) {
    $("#messengerDust").innerHTML = 'Không khí nguy hiểm cho người nhạy cảm';
  }
  else if (new_data.Dust > 55.4 && new_data.Dust <= 150.4) {
    $("#messengerDust").innerHTML = 'Không khí nguy hiểm';
  }
  else if (new_data.Dust > 150.4 && new_data.Dust <= 250.4) {
    $("#messengerDust").innerHTML = 'Không khí rất nguy hiểm';
  }
  else if (new_data.Dust > 250.4) {
    $("#messengerDust").innerHTML = 'Không khí độc hại';
  }
  //
  console.log('data socket sent:',new_data);

})

socket.on("sendDataesp", function(data){
  let new_data = JSON.parse(data)
  $("#currentGa").innerHTML = `${new_data.gas.toFixed(2)}`;
  if (new_data.gas == 1 ) {
    $("#messengergas").innerHTML = 'Cảnh báo có khí gas'; }
  else {
    $("#messengergas").innerHTML = 'Khu vực bếp an toàn'; }
})

// socket.on("sendDataesp", function(data){
//   var dataJson = JSON.parse(data)
//   if(dataJson.TB1 == 1){
//     var checkboxes = document.getElementsByName('Den1');
//     for (var checkbox of checkboxes) {
//       checkbox.checked = true;
//     }   
//   }
//   else{
//     var checkboxes = document.getElementsByName('Den1');
//     for (var checkbox of checkboxes) {
//       checkbox.checked = false;
//     }  
//   }

//   if(dataJson.TB2 == 1){
//     var checkboxes = document.getElementsByName('Maybom1');
//     for (var checkbox of checkboxes) {
//       checkbox.checked = true;
//     }   
//   }
//   else {
//     var checkboxes = document.getElementsByName('Maybom1');
//     for (var checkbox of checkboxes) {
//       checkbox.checked = false;
//     }  
//   }


// //----------------------------------Dong bo slider----------------------------------
//   if(dataJson.LightBrightness == 'Pump' && dataJson.StatusOn == 0){
//     var valueSlider = document.getElementsByName('sliderrange');
//     for (var checkbox of checkboxes1) {
//       checkbox.checked = false;
//     } 
//   }

// console.log(dataJson);
// })

// //------------------------------------Hen gio may bom------------------------------------------------
// socket.on("timeSetesp", function(data){
//   var dataTimeset = JSON.parse(data)
//   //----------------------------------Dong bo bat hen gio may bom 1----------------------------------
//   if(dataTimeset.Device == 'Pump' && dataTimeset.StatusOn == '1'){
//     console.log("123123");
//     var checkboxes1 = document.getElementsByName('Hengiobatmaybomvuon1');
//     for (var checkbox of checkboxes1) {
//       checkbox.checked = true;
//     }   
//   }
//   else if(dataTimeset.Device == 'devicePumpOn' && dataTimeset.StatusOn == 1){
//     var checkboxes = document.getElementsByName('Maybom1');
//     var checkboxes1 = document.getElementsByName('Hengiobatmaybomvuon1');
//     for (var checkbox of checkboxes) {
//       checkbox.checked = true;
//     }  
//     for (var checkbox of checkboxes1) {
//       checkbox.checked = false;
//     } 
//   }

//   else if(dataTimeset.Device == 'Pump' && dataTimeset.StatusOn == 0){
//     var checkboxes = document.getElementsByName('Maybom1');
//     var checkboxes1 = document.getElementsByName('Hengiobatmaybomvuon1');
//     for (var checkbox of checkboxes1) {
//       checkbox.checked = false;
//     } 
//   }
// // ----------------------------------Dong bo tat hen gio may bom 1----------------------------------
//     if(dataTimeset.Device == 'Pump' && dataTimeset.StatusOfff == "1"){
//       var checkboxes2 = document.getElementsByName('Hengiotatmaybomvuon1');
//       for (var checkboxx of checkboxes2) {
//         checkboxx.checked = true;
//       }   
//     }
//     if(dataTimeset.Device == 'devicePumpOff' && dataTimeset.StatusOfff == 1){
//       var checkboxes = document.getElementsByName('Maybom1');
//       var checkboxes1 = document.getElementsByName('Hengiotatmaybomvuon1');
//       for (var checkbox of checkboxes1) {
//         checkbox.checked = false;
//       }
//       for (var checkbox of checkboxes) {
//         checkbox.checked = false;
//       }   
//     }
  
//     if(dataTimeset.Device == 'Pump' && dataTimeset.StatusOfff == 0){
//       var checkboxes1 = document.getElementsByName('Hengiotatmaybomvuon1');
//       for (var checkbox of checkboxes1) {
//         checkbox.checked = false;
//       } 
//     }
// })

// //------------------------------------Hen gio den---------------------------------
// socket.on("timeSetespLight", function(data){
//   var dataTimeset = JSON.parse(data)
//   //----------------------------------Dong bo bat hen gio den 1----------------------------------
//   if(dataTimeset.Device == 'Light' && dataTimeset.statusOn == 1){
//     var checkboxes = document.getElementsByName('Den1');
//     var checkboxes1 = document.getElementsByName('Hengiobatdenvuon1');
//     for (var checkbox of checkboxes1) {
//       checkbox.checked = true;
//     }   
//   }
//   else if(dataTimeset.Device == 'devicePumpOn' && dataTimeset.StatusOn == 1){
//     var checkboxes = document.getElementsByName('Den1');
//     var checkboxes1 = document.getElementsByName('Hengiobatdenvuon1');
//     for (var checkbox of checkboxes) {
//       checkbox.checked = true;
//     }  
//     for (var checkbox of checkboxes1) {
//       checkbox.checked = false;
//     } 
//   }

//   else if(dataTimeset.Device == 'Light' && dataTimeset.statusOn == 0){
//     var checkboxes = document.getElementsByName('Den1');
//     var checkboxes1 = document.getElementsByName('Hengiobatdenvuon1');
//     for (var checkbox of checkboxes1) {
//       checkbox.checked = false;
//     } 
//   }
// // ----------------------------------Dong bo tat hen gio den 1----------------------------------
//     if(dataTimeset.Device == 'Pump' && dataTimeset.StatusOfff == "1"){
//       var checkboxes2 = document.getElementsByName('Hengiotatdenvuon1');
//       for (var checkboxx of checkboxes2) {
//         checkboxx.checked = true;
//       }   
//     }
//     if(dataTimeset.Device == 'devicePumpOff' && dataTimeset.StatusOfff == 1){
//       var checkboxes = document.getElementsByName('Den1');
//       var checkboxes1 = document.getElementsByName('Hengiotatdenvuon1');
//       for (var checkbox of checkboxes1) {
//         checkbox.checked = false;
//       }
//       for (var checkbox of checkboxes) {
//         checkbox.checked = false;
//       }   
//     }
  
//     if(dataTimeset.Device == 'Pump' && dataTimeset.statusOfff == 0){
//       var checkboxes1 = document.getElementsByName('Hengiotatdenvuon1');
//       for (var checkbox of checkboxes1) {
//         checkbox.checked = false;
//       } 
//     }
// })
// Dieu khien thiet bi
// function dieuKhienthietbi1()
//  {
// 	 var checkBoxTB1 = document.getElementById("denvuon1");
	
	 
//         if (checkBoxTB1.checked == true)
//         {
         
//           console.log("Bật đèn !!!");
//           socket.emit('htmlclient',JSON.stringify({TB1:'1'}));
//           showSuccessToast('Bật đèn thành công!!');
//         } 
//         else  if (checkBoxTB1.checked == false)
//         {
//           console.log("Tắt  đèn !!!");
//           socket.emit('htmlclient',JSON.stringify({TB1:'0'}));
//           showSuccessToast('Tắt đèn thành công!!');
//         } 
//  }
//  function dieuKhienthietbi2()
//  {
// 	 var checkBoxTB2 = document.getElementById("maybomvuon1");
	 
	 
//         if (checkBoxTB2.checked == true)
//         {       
//           console.log("Bật máy bơm !!!");
//           socket.emit("htmlclient",JSON.stringify({TB2:"1"}));
//           showSuccessToast('Bật máy bơm thành công!!');
//         } 
//         else  if (checkBoxTB2.checked == false)
//         {
//           console.log("Tắt máy bơm  !!!");
//           socket.emit("htmlclient",JSON.stringify({"TB2":"0"}));
//           showSuccessToast('Tắt máy bơm thành công!!');
//         } 
//  }


//  function henGiobatden() {
//   var checkBoxlight = document.getElementById('bathengio1').onclick = function(e){
//     if (this.checked){
//       console.log("Bật hẹn giờ !!!");
//       var a = document.getElementById("hengiobat1"); 
//        var datagiobat = a.value;
//        console.log(datagiobat);
//        var time = datagiobat.split(":")
//        var hh = time[0];
//        var mm = time[1];
//        const myObj = {
//         device:'Light',
//         hour: hh,
//         minute: mm,
//         statusOn: '1',
//       };
//        socket.emit("timerlight",JSON.stringify(myObj));
//        showSuccessToast('Bật hẹn giờ bật đèn thành công!!');

//     }
//     else{
//          console.log("Tắt hẹn giờ đèn !!!");
//        socket.emit("timerlight",JSON.stringify({"device":"Light", "statusOn":"0"})); 
//        showSuccessToast('Tắt hẹn giờ bật đèn thành công!!'); 
//     }
//   };

//  }

//  function henGiotatden() {
//   document.getElementById('tathengio1').onclick = function(e){
//     if (this.checked){
//          console.log("Hẹn giờ tắt !!!");
//          var a = document.getElementById("hengiotat1"); 
//          var datagiotat = a.value;
//          console.log(datagiotat);
//          var time = datagiotat.split(":")
//          var hh = time[0];
//          var mm = time[1];
//          const myObj = {
//           device: 'Light',
//           hour: hh,
//           minute: mm,
//           statusOff: '1',
//         };
//          socket.emit("timerlight",JSON.stringify(myObj));
//          showSuccessToast('Bật hẹn giờ tắt đèn thành công!!'); 
//     }
//     else{
//          console.log("Tắt hẹn giờ đèn !!!");
//          socket.emit("htmlclient",JSON.stringify({"device":"Light", "statusOff":"0"})); 
//          showSuccessToast('Tắt hẹn giờ tắt đèn thành công!!'); 
//        }
//   };

//  }

//  function henGiobatmaybom() {
//   document.getElementById('bathengio2').onclick = function(e){
//     if (this.checked){
//       console.log("Bật hẹn giờ !!!");
//       var a = document.getElementById("hengiobat2"); 
//        var datagiobat = a.value;
//        console.log(datagiobat);
//        var time = datagiobat.split(":")
//        var hh = time[0];
//        var mm = time[1];
//        const myObj = {
//         device: 'Pump',
//         hour: hh,
//         minute: mm,
//         statusOn: '1',
//       };
//        socket.emit("timerPump",JSON.stringify(myObj));
//        showSuccessToast('Bật hẹn giờ bật máy bơm thành công!!'); 

//     }
//     else{
//        console.log("Tắt hẹn giờ máy bơm !!!");
//        socket.emit("timerPump",JSON.stringify({"device":"Pump","statusOn":"0"}));  
//        showSuccessToast('Tắt hẹn giờ bật máy bơm thành công!!'); 
//     }
//   };

//  }

//  function henGiotatmaybom() {
//   document.getElementById('tathengio2').onclick = function(e){
//     if (this.checked){
//       console.log("Bật hẹn giờ !!!");
//       var a = document.getElementById("hengiotat2"); 
//        var datagiobat = a.value;
//        console.log(datagiobat);
//        var time = datagiobat.split(":")
//        var hh = time[0];
//        var mm = time[1];
//        const myObj = {
//         device: 'Pump', 
//         hour: hh,
//         minute: mm,
//         statusOfff: '1',
//       };
//        socket.emit("timerPump",JSON.stringify(myObj));
//        showSuccessToast('Bật hẹn giờ tắt máy bơm thành công!!'); 

//     }
//     else{
//        console.log("Tắt hẹn giờ máy bơm !!!");
//        socket.emit("timerPump",JSON.stringify({"device":"Pump", "statusOfff":"0"})); 
//        showSuccessToast('Tắt hẹn giờ tắt máy bơm thành công!!');  
//     }
//   };

//  }

//  // Toast function
// function toast({ title = "", message = "", type = "", duration = "" }) {
//   const main = document.getElementById("toast");
//   if (main) {
//     const toast = document.createElement("div");

//     // Auto remove toast
//     const autoRemoveId = setTimeout(function () {
//       main.removeChild(toast);
//     }, duration + 1000);

//     // Remove toast when clicked
//     toast.onclick = function (e) {
//       if (e.target.closest(".toast__close")) {
//         main.removeChild(toast);
//         clearTimeout(autoRemoveId);
//       }
//     };

//     const icons = {
//       success: "fas fa-check-circle",
//       info: "fas fa-info-circle",
//       warning: "fas fa-exclamation-circle",
//       error: "fas fa-exclamation-circle"
//     };
//     const icon = icons[type];
//     const delay = (duration / 1000).toFixed(2);

//     toast.classList.add("toast", `toast--${type}`);
//     toast.style.animation = `slideInLeft ease 2s, fadeOut linear 1s ${delay}s forwards`;

//     toast.innerHTML = `
//                     <div class="toast__icon">
//                         <i class="${icon}"></i>
//                     </div>
//                     <div class="toast__body">
//                         <h3 class="toast__title">${title}</h3>
//                         <p class="toast__msg">${message}</p>
//                     </div>
//                     <div class="toast__close">
//                         <i class="fas fa-times"></i>
//                     </div>
//                 `;
//     main.appendChild(toast);
//   }
// }

// function showSuccessToast(Mes) {
//   toast({
//     title: "Thành công!",
//     message: Mes,
//     type: "success",
//     duration: 5000
//   });
// }

// function showErrorToast() {
//   toast({
//     title: "Thất bại!",
//     message: "Có lỗi xảy ra, vui lòng liên hệ quản trị viên.",
//     type: "error",
//     duration: 5000
//   });
// }


socket.on("server-send-humi_graph", function (data) {
  console.log(data);
  chart.series[0].setData(data);
});

socket.on("server-send-temp_graph", function (data) {
  console.log(data);
  chart.series[1].setData(data);
});

socket.on("server-send-date_graph", function (data) {
  console.log(data);
  chart.xAxis[0].setCategories(data);
});



