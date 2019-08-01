/* open camera */
function openCam() {
    console.log(`open camera`);
    // 兼容性处理
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
    if (navigator.getUserMedia) {
        navigator.getUserMedia({audio: true, video: {width: 300, height: 300}},
            function (stream) {
                buffer = stream;
                // var src = window.URL && window.URL.createObjectURL(buffer) || stream;
                video.muted = true; // 设置视频静音
                // video.src = src;
                video.srcObject = stream;
                video.onloadedmetadata = function (e) {
                    video.play();
                };
            },
            function (err) {
                alert('哦哦……哪里错了呢？是不是没有摄像头啊？');
                console.log(`哦哦，发生了错误：${err.name}`);
            }
        );
    } else {
        console.log('getUserMedia not supported');
        alert('嗯哼，浏览器不支持 getUserMedia 呢，换最新版火狐浏览器试试！');
    }
}

/* close camera */
function closeCam() {
    console.log('close camera');
    buffer && buffer.getVideoTracks()[0].stop();
    buffer = null;
}