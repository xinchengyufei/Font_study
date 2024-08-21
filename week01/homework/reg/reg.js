// 页面加载出来后日历自动加载可选日历
const dateType={
  year:'年',
  month:'月',
  day:'日'
}

function populateDates(type,number) {
    const Select = document.getElementsByClassName(type)[0];
    for (let i = (type==='year'?number-150:1); i <= number;i++ ) {
      let option = document.createElement("option");
      option.text = i+dateType[type];
      option.value = i;
      Select.add(option)
    }
}

window.onload = function() {
  const year = new Date().getFullYear();
  const month = 12;
  const day = 30;
  populateDates("year",year);
  populateDates("month",month);
  populateDates("day",day);
};

// 完成业务：输入信息的校验
// 逻辑:表单添加上监听和提交事件
// 当点击注册时,校验前三排输入框是否为空,弹出警告信息
// 性别当点击到自定义就弹出输入框并将输入内容作为性别的值
// 表单监听器当有内容变化时,判断输入内容是否为空与有效,有效就去掉警告信息
const form = document.querySelector("form");
const input = document.querySelectorAll('input');

const checkFields = {
  "last_name": /^.+/,
  "first_name": /^.+/,
  "phone":/^\d{11}$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  "pwd": /^(?=.*[A-Za-z])(?=.*\d)(?=.*[_]).{6,16}$/,
};

function valid(field) {
  const inputs = document.querySelector("." + field + ">input" );
  const bottomdiv = document.querySelector("." + field + ">div");
  let value =  inputs.value;
  let regex = checkFields[field];
  inputs.classList.add("input_null");

  if (!regex.test(value)) {   
    inputs.className = "input_null"
    bottomdiv.style.display = "block";
    return false;
  }
  inputs.classList.remove("input_null");
  bottomdiv.style.display = "none";
  return true;
}

for(let i = 0; i < 4; i++){
  let fields = ["last_name", "first_name", "phone", "pwd"];
  input[i].addEventListener("input",function(event){
    valid(fields[i])
  })
}


form.addEventListener("submit",function(event){
  let fields = ["last_name", "first_name", "phone", "pwd"];
  for(let i = 0; i < fields.length; i++){
    if(!valid(fields[i])){
      event.preventDefault();
    }
  }
})

document.addEventListener("DOMContentLoaded", function() {
  let radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach(function(radio) {
      radio.addEventListener('change', function() {
          if(radio.value==='define') {
            input[7].style.display = 'block';
            input[7].focus(); // 输入框获得焦点
          }else{
            input[7].style.display = 'none';
            input[7].value = ''; // 清空输入框
          }
      });
  });
});
