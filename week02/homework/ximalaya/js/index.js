// 实现头部左边三个导航下划线的动画效果
const left_nav_top = document.querySelectorAll(".head-left-nav>div");

const bottom_positon = ["24px","92px","165px"];
for(let i = 0; i < left_nav_top.length - 1; i++){
    left_nav_top[i].addEventListener("mouseenter",function(event){
        left_nav_top[3].style.left = bottom_positon[i];
    })
}

// 解决点击输入框，弹出搜索热门并将选中的关键词填入输入框中
const search_input = document.querySelector("form>input");
const search_slide_text = document.querySelector(".search-slide-text");
const search_hot_list = document.querySelectorAll(".search-hot-list a");

search_input.addEventListener("focus",function(event){
    search_slide_text.style.display = "block";
    search_slide_text.style.opacity = 1;
    search_slide_text.style.zIndex = 999;
});

search_input.addEventListener("blur",function(event){
    search_slide_text.style.opacity = 0;
});

for(let i = 0; i < search_hot_list.length; i++) {
    search_hot_list[i].addEventListener('click', function(event) {
        if (event.target.tagName.toLowerCase() === 'a') {
            search_input.value = event.target.textContent;
            search_slide_text.style.display = "none";
        }
    });
}

// 点击上传，客户端和登录弹出效果
const rightNavDivs = document.querySelectorAll('.head-right-nav > div');
const overlays = [
  { element: document.querySelector('.upload-fix'), index: 0 },
  { element: document.querySelector('.client-fix'), index: 3 },
  { element: document.querySelector('.login-fix'), index: 4 }
];

overlays.forEach(overlay => {
  const overlayElement = overlay.element;
  const targetIndex = overlay.index;

  rightNavDivs[targetIndex].addEventListener('mouseenter', () => {
    overlayElement.style.opacity = '1';
  });

  rightNavDivs[targetIndex].addEventListener('mouseleave', () => {
    overlayElement.style.opacity = '0';
  });
});


// 实现轮播图效果
const data = [
    {url:"../images/carousel1.png",title:"熄灯别讲鬼故事" },
    {url:"../images/carousel2.png",title:"郭德纲"},
    {url:"../images/carousel3.png",title:"玫瑰的故事"},
    {url:"../images/carousel4.png",title:"庆余年" },
    {url:"../images/carousel5.png",title:"看不见影子的少年" },
]

window.onload = function() {
    let timer = setInterval(get_pre, 1500);
    let arr = new Array();
    let ul = document.querySelector(".picture-carousel ul");
    let pre_btn = document.querySelector(".pic-left-button")
    let next_btn = document.querySelector(".pic-right-button")

    pre_btn.addEventListener("click",function (){
        clearInterval(timer);
        get_pre();
        timer = setInterval(get_pre, 1500)
    });

    next_btn.addEventListener("click", function(){
        clearInterval(timer);
        get_next();
        timer = setInterval(get_pre,1500)
    });

    for(let i = 1; i <= data.length; i++){
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = data[i - 1].url;
        img.title = data[i - 1].title
        img.style.width = "750px";
        img.style.height = "300px"; 
        li.appendChild(img);
        ul.appendChild(li);
        arr.push(li);
        arr[arr.length - 1].style.left = "165px";
    }

    let len = arr.length - 1;
    arr[len -2].style.left = "0";
    arr[len -1].style.zIndex = 10;
    arr[len -1].style.left = "165px";
    arr[len -1].style.transform = "scale(1.1)";
    arr[len].style.left = "331px";

    function get_next() {
        let give_up = arr[len];
        arr.pop();
        arr.unshift(give_up);
        for(let i = 0; i < arr.length; i++){
            arr[i].style.zIndex = i;
            arr[i].style.transform = "scale(1)";
        }
        arr[len -2].style.left = "0";
        arr[len -1].style.zIndex = 10;
        arr[len -1].style.left = "165px";
        arr[len -1].style.transform = "scale(1.1)";
        arr[len -1].style.opacity = 1;
        arr[len].style.left = "331px";
    }

    function get_pre() {
        let give_up = arr[0];
        arr.shift();
        arr.push(give_up);
        for(let i = 0; i < arr.length; i++){
            arr[i].style.zIndex = i;
            arr[i].style.transform = "scale(1)";
        }
        arr[len -2].style.left = "0";
        arr[len -1].style.zIndex = 10;
        arr[len -1].style.left = "165px";
        arr[len -1].style.transform = "scale(1.1)";
        arr[len -1].style.opacity = 1;
        arr[len].style.left = "331px";
    }
}


// 处理接口，接收返回值
function getData(tag) {
    const url ='http://localhost:3000/api?tag=' + tag
    return new Promise(function(resolve){
        fetch(url)
      .then(response => response.json()) // 将响应体转换为JSON
      .then(res => {
        resolve(res);
      })
      .catch(error => console.error('Error fetching data:', error));
    })
}

// 封装接口数据到页面的功能
const tagtypes = ["toutuoyuan", "doupocangqiong", "xinghancanlan", "santi"];

function create_html(data, tag, list, start, end) {

    for (let i = start; i < end; i++) {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const like_pic = document.createElement('div');
        const imgs = document.createElement('img');
        const divmask = document.createElement('div');
        const divmaskplayer = document.createElement('div');
        const atitle = document.createElement('a');
        const aauthor = document.createElement('a');
        
        divmaskplayer.classList.add("mask-xm-player");
        divmask.classList.add("mask");
        like_pic.classList.add("like-pic");
        atitle.classList.add("like-book-title");
        aauthor.classList.add("author");

        imgs.src = data[i].img;
        aauthor.innerHTML = data[i].author;

        if(tag === "audiobook"){
            atitle.innerHTML = data[i].text;
        }else{  
            atitle.innerHTML = data[i].title;
        }

        like_pic.appendChild(imgs);
        like_pic.appendChild(divmask);
        like_pic.appendChild(divmaskplayer);

        div.appendChild(like_pic);
        div.appendChild(atitle);
        div.appendChild(aauthor);

        li.appendChild(div);
        list.appendChild(li);
    }
}

function getData_to_Html(tag, ul, start, end, tagtype){
    getData(tag).then(function(res){
        const list = document.querySelector("." + ul);
        list.innerHTML = '';
        let data=[]
        if(tag === "audiobook"){
            const {data:{[tagtype]:resData}} = res
            data=resData
        }else{
            const {data:resData}= res
            data=resData
        }
        create_html(data, tag, list, start, end);
    })
}

// 主内容页面部分
// 从后端接收数据并将其展示到页面上，当点击换一批时后续的数据补进去
document.addEventListener('DOMContentLoaded',  function() {
    getData_to_Html("audiobook","audio-content>ul",0,10,tagtypes[0]);
    getData_to_Html("guesslike","like-content>ul",0,5);
});

let flag = 0;
const update_one = document.querySelector(".guess-icon>span");
update_one.addEventListener("click",function(){
    if(flag === 0){
        getData_to_Html("guesslike","like-content>ul", 5 , 10);
        flag = 1;
    }else{
        getData_to_Html("guesslike","like-content>ul",0,5);
        flag = 0;
    }
});

// 有声书，默认第一个为高亮，当鼠标当点击其他分类，第一个取消默认样式
// 并展示该分类下的数据
const audio_head_navs = document.querySelectorAll(".audio-head-nav>a");
for(let i = 0; i < audio_head_navs.length; i++){
    audio_head_navs[i].addEventListener("click",function(event){
        event.preventDefault();
        // 所有的先删除高亮样式
        audio_head_navs.forEach(function(nav){
            nav.classList.remove("active");
        });
        // 再给点击的元素添加高亮
        audio_head_navs[i].classList.add("active");

        //并且主页面刷新出该部分的数据
        getData_to_Html("audiobook","audio-content>ul",0,10,tagtypes[i]);
    });
}

