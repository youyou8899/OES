$(function () {
    $('#wait-msg').hide();
    $('#err-msg').hide();
    $('#detail').hide();
    $("#openCamera").click(openCam);
    $("#closeCamera").click(closeCam);
    $("#submit").click(checkFace);
});

function checkFace() {
    hideAll();
    $('#wait-msg').show();
    compareFace();
}

function hideAll() {
    $('#wait-msg').hide();
    $('#err-msg').hide();
    $('#detail').hide();
    $('.btn-group').hide();
}

/* transform an image into base64 code */
function getBase64Image(img) {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);
    let ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    let dataURL = canvas.toDataURL("image/" + ext);
    return dataURL;
}

/* build params for face comparison API. */
function buildData(callback) {
    // get screen shot from video
    let video = document.getElementById("video");
    let canvas = document.getElementById("canvas");
    canvas.getContext('2d').drawImage(video, 0, 0, 300, 300);
    face1 = canvas.toDataURL("image/png");

    // get profile face
    let image = new Image();
    image.src = document.getElementById("avatar").src;
    let face2 = getBase64Image(image);

    // build ajax request API for compare face
    let url = 'https://api-cn.faceplusplus.com/facepp/v3/compare';
    let data = new FormData();
    data.append('api_key', "quF2Zb1OKhO7cVqAZhnE3inkdyvIkm77");
    data.append('api_secret', "lSgUJTMELj9nNNg1TFUO917peJtnEEes");
    data.append('image_base64_1', face1);
    data.append('image_base64_2', face2);

    callback(url, data)
}

/*comparison of face*/
function compareFace() {
    buildData(function (url,data) {
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success(data) {
                console.log(data);
                if (data.confidence > 70) {
                    $('#video-group').hide();
                    $('#wait-msg').hide();
                    $('.btn-group').hide();
                    $('#detail').show();
                }
                else {
                    $('#wait-msg').hide();
                    $('.btn-group').show();
                    $('#err-msg').show();
                }
            }
        })
    });
}