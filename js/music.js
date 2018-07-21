   // 设置$ 方便dom的操作
   function $(select) {
    return document.querySelector(select)
}
var musiclist = []
var currentIndex = 0
var audio = new Audio()
audio.autoplay = true
gerMusiclist(function(list){
    musiclist = list
    loadMusic(musiclist[currentIndex])
    // generateList(list)
})
audio.ontimeupdate = function() {
    $('.jinDu .jinDu-now').style.width = (this.currentTime / this.duration)*100 + '%'
    var min = Math.floor(this.duration/60)
    var sec = Math.floor(this.duration)%60+''
    sec = sec.length === 2? sec: '0'+ sec 
    $('.time .zongTime').innerText = min + ':' + sec
    var mina = Math.floor(this.currentTime/60)
    var seca = Math.floor(this.currentTime)%60+''
    seca = seca.length === 2? seca: '0'+ seca
    $('.time .newTime').innerText = mina + ':' + seca
}
//播放时间 每秒刷新一次
// audio.onplay = function() {
//     clock = setInterval(function() {
//         var min = Math.floor(this.currentTime/60)
//         var sec = Math.floor(this.currentTime)%60+''
//         sec = sec.length === 2? sec: '0'+ sec
//         $('.time .newTime').innerText = min + ':' + sec
//     },1000)
// }
//音乐暂停的时候 时间停止，播放的时候再进行开始
// audio.onpause = function() {
//     clearInterval(clock)
// }
//结束后自动播放下一曲
audio.onended = function() {
    currentIndex = (++currentIndex)%musiclist.length
    loadMusic(musiclist[currentIndex])
}

//点击事件
// 开始 暂停事件
$('.btn .play').onclick = function() {
    if(audio.paused) {
        audio.play()
        this.querySelector('.iconfont').classList.remove('icon-zanting')
        this.querySelector('.iconfont').classList.add('icon-bofang')
    }else{
        audio.pause()
        this.querySelector('.iconfont').classList.remove('icon-bofang')
        this.querySelector('.iconfont').classList.add('icon-zanting')
    }
}

// 下一首
$('.btn .icon-kuaijin').onclick = function() {
    currentIndex = (++currentIndex)%musiclist.length //自加1后余上歌曲的曲数，余下的数为歌曲数   
    loadMusic(musiclist[currentIndex])
}
//上一首
$('.btn .icon-kuaitui').onclick = function() {
    currentIndex = (musiclist.length + (--currentIndex))%musiclist.length 
    loadMusic(musiclist[currentIndex])
}
//点击进度条
$('.jinDu').onclick = function(e){
    var percent = e.offsetX / parseInt(getComputedStyle(this).width)
    audio.currentTime = audio.duration * percent;
}

function gerMusiclist(callback) {
     // ajax获取json数据
    var xhr = new XMLHttpRequest()
    xhr.open('GET','/music.json',true)
    xhr.onload = function() {
        if((xhr.status>=200 && xhr.status < 300) || xhr.status === 304) {
            callback(JSON.parse(this.responseText))
        }else {
            console.log('获取数据失败')
        }
    }
xhr.onerror = function() {
    console.log('网络异常')
}
xhr.send()
}

//播放音乐
function loadMusic(musicObj) {
    audio.src = musicObj.src
    $('.progressBar .xinXi .musicName').innerText = musicObj.title
    $('.progressBar .xinXi .musicGe').innerText = musicObj.auther
    $('.phs img').src = musicObj.img
}
// function generateList(list){
//     for(var i=0;i<=list.length;i++) {
//         var li = document.createElement("li")
//         li.innerHTML = list[i].title +'-'+ list[i].auther
//         var ul = $('.list')
//         ul.appendChild(li)
//           //使用事件委托方式
//     }  
   
// }
// //点击li播放音乐

// $('.list').onclick = function (ev) {
//     var ev = ev || window.event;
//     var target = ev.target || evsrcElement;
//     if(target.nodeName.toLowerCase() == 'li'){//nodeName的意思获得DOM元素的节点名称 //toLowerCase()的方法用以是，把获取到的节点名称转换为小写
    
//     }
// }  