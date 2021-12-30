var canvas = document.querySelector("#my-canvas");
var context = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
var icons = {
    close: null,
    scale: null
};
var dpr = window.devicePixelRatio;
if (canvas) {
    canvas.width = canvas.width * dpr;
    canvas.height = canvas.height * dpr;
    context === null || context === void 0 ? void 0 : context.scale(dpr, dpr);
}
function loadIcon(src, key) {
    var img = new Image();
    img.src = src;
    img.onload = function () {
        icons[key] = img;
    };
}
loadIcon("../../../assets/images/close.png", "close");
loadIcon("../../../assets/images/scale.png", "scale");
var userImageUploadButton = document.querySelector("#user-image");
userImageUploadButton === null || userImageUploadButton === void 0 ? void 0 : userImageUploadButton.addEventListener("change", function () {
    var img = userImageUploadButton === null || userImageUploadButton === void 0 ? void 0 : userImageUploadButton.files[0];
    loadImage(img);
});
var imageList = [];
function loadImage(img) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var _a;
        var userImage = new Image();
        userImage.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
        userImage.onload = function () {
            var len = imageList.length;
            if (len) {
                imageList[len - 1].selected = false;
            }
            var width = userImage.width, height = userImage.height;
            var userIamgeObj = {
                img: userImage,
                x: 30,
                y: 30,
                w: userImage.width,
                h: userImage.height,
                selected: true,
                rotate: 0,
                centerY: 30 + height / 2,
                centerX: 30 + width / 2,
                place: null
            };
            imageList.push(userIamgeObj);
            draw();
        };
    };
    reader.readAsDataURL(img);
}
function draw() {
    if (!context) {
        return;
    }
    context.clearRect(0, 0, 500, 500);
    // 旋转画布
    imageList.forEach(function (iamgeObj) {
        var img = iamgeObj.img, x = iamgeObj.x, y = iamgeObj.y, w = iamgeObj.w, h = iamgeObj.h, selected = iamgeObj.selected, centerX = iamgeObj.centerX, centerY = iamgeObj.centerY, rotate = iamgeObj.rotate;
        context.save();
        context.translate(centerX, centerY);
        context.rotate((rotate * Math.PI) / 180);
        context.translate(-centerX, -centerY);
        context.drawImage(img, x, y, w, h);
        if (selected) {
            // 画边框
            context.setLineDash([10, 10]);
            context.lineWidth = 2;
            context.strokeStyle = "red";
            context.lineDashOffset = 10;
            context.strokeRect(x, y, w, h);
            // 画按钮
            context.drawImage(icons.close, x - 12, y - 12, 24, 24);
            context.drawImage(icons.scale, x + w - 12, y + h - 12, 24, 24);
        }
        context.restore();
    });
}
function isInPicture(offsetX, offsetY) {
    var len = imageList.length;
    for (var i = len - 1; i >= 0; i--) {
        var current = imageList[i];
        var selected = current.selected;
        var place = inWhere(offsetX, offsetY, current);
        if (selected && place === TOUCH_TYPE.DELETE) {
            imageList.splice(i, 1);
            draw();
            return false;
        }
        else if (place) {
            imageList[imageList.length - 1].selected = false;
            var current_1 = imageList.splice(i, 1)[0];
            Object.assign(current_1, { selected: true, place: place });
            imageList.push(current_1);
            draw();
            return true;
        }
    }
    imageList[imageList.length - 1].selected = false;
    draw();
    return false;
}
function getTransform(x, y, centerX, centerY, rotate) {
    //将角度化为弧度
    var angle = (Math.PI / 180) * rotate;
    //初始坐标与中点形成的直线长度不管怎么旋转都是不会变的，用勾股定理求出然后将其作为斜边
    var r = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
    //斜边乘sin值等于即可求出y坐标
    var a = Math.sin(angle) * r;
    //斜边乘cos值等于即可求出x坐标
    var b = Math.cos(angle) * r;
    //目前的xy坐标是相对于图片中点为原点的坐标轴，而我们的主坐标轴是canvas的坐标轴，所以要加上中点的坐标值才是标准的canvas坐标
    return {
        x: centerX + b - 12,
        y: centerY + a - 12
    };
}
function inWhere(offsetX, offsetY, image) {
    var x = image.x, y = image.y, w = image.w, h = image.h, centerY = image.centerY, centerX = image.centerX, rotate = image.rotate;
    // 变换区域左上角的坐标和区域的高度宽度
    var transformW = 24;
    var transformH = 24;
    var transformX = x + w;
    var transformY = y + h;
    var transformAngle = (Math.atan2(transformY - centerY, transformX - centerX) / Math.PI) * 180 +
        rotate;
    var transformXY = getTransform(transformX, transformY, centerX, centerY, transformAngle);
    transformX = transformXY.x;
    transformY = transformXY.y;
    // 删除区域左上角的坐标和区域的高度宽度
    var delW = 24;
    var delH = 24;
    var delX = x;
    var delY = y;
    var delAngle = (Math.atan2(delY - centerY, delX - centerX) / Math.PI) * 180 + rotate;
    var delXY = getTransform(delX, delY, centerX, centerY, delAngle);
    delX = delXY.x;
    delY = delXY.y;
    //移动区域的坐标
    var moveX = x;
    var moveY = y;
    if (offsetX - transformX >= 0 &&
        offsetY - transformY >= 0 &&
        transformX + transformW - offsetX >= 0 &&
        transformY + transformH - offsetY >= 0) {
        // 缩放区域
        return TOUCH_TYPE.TRANSFORM;
    }
    else if (offsetX - delX >= 0 &&
        offsetY - delY >= 0 &&
        delX + delW - offsetX >= 0 &&
        delY + delH - offsetY >= 0) {
        // 删除区域
        return TOUCH_TYPE.DELETE;
    }
    else if (offsetX - moveX >= 0 &&
        offsetY - moveY >= 0 &&
        moveX + w - offsetX >= 0 &&
        moveY + h - offsetY >= 0) {
        // 移动区域
        return TOUCH_TYPE.MOVE;
    }
    return null;
}
var canMove = false;
var TOUCH_TYPE = {
    MOVE: "MOVE",
    DELETE: "DELETE",
    TRANSFORM: "TRANSFORM"
};
var startTouchPosition = { startX: 0, startY: 0 };
var initialStatus = {
    initialX: 0,
    initialY: 0,
    initialH: 0,
    initialW: 0,
    initialRotate: 0
};
canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("mousedown", function (e) {
    var offsetX = e.offsetX, offsetY = e.offsetY;
    if (!isInPicture(offsetX, offsetY)) {
        return;
    }
    var lastImage = imageList[imageList.length - 1];
    Object.assign(startTouchPosition, { startX: offsetX, startY: offsetY });
    var x = lastImage.x, y = lastImage.y, w = lastImage.w, h = lastImage.h, rotate = lastImage.rotate;
    Object.assign(initialStatus, {
        initialX: x,
        initialY: y,
        initialH: h,
        initialW: w,
        initialRotate: rotate
    });
    canMove = true;
});
canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("mousemove", function (e) {
    if (!canMove) {
        return;
    }
    var offsetX = e.offsetX, offsetY = e.offsetY;
    var startX = startTouchPosition.startX, startY = startTouchPosition.startY;
    var initialX = initialStatus.initialX, initialY = initialStatus.initialY;
    var lastImage = imageList[imageList.length - 1];
    var x = lastImage.x, y = lastImage.y, place = lastImage.place;
    if (place === TOUCH_TYPE.MOVE) {
        var w = lastImage.w, h = lastImage.h;
        //算出移动后的xy坐标与点击时xy坐标的差（即平移量）与图片对象的初始坐标相加即可
        x = initialX + (offsetX - startX);
        y = initialY + (offsetY - startY);
        var centerX = x + w / 2;
        var centerY = y + h / 2;
        Object.assign(lastImage, { x: x, y: y, centerX: centerX, centerY: centerY });
    }
    else if (place === TOUCH_TYPE.TRANSFORM) {
        var centerX = lastImage.centerX, centerY = lastImage.centerY;
        //旋转部分
        var initialRotate = initialStatus.initialRotate;
        var angleBefore = (Math.atan2(startY - centerY, startX - centerX) / Math.PI) * 180;
        var angleAfter = (Math.atan2(offsetY - centerY, offsetX - centerX) / Math.PI) * 180;
        // 旋转的角度
        var rotate = initialRotate + angleAfter - angleBefore;
        //缩放部分
        var initialH = initialStatus.initialH, initialW = initialStatus.initialW;
        //用勾股定理算出距离
        var lineA = Math.sqrt(Math.pow(centerX - startX, 2) + Math.pow(centerY - startY, 2));
        var lineB = Math.sqrt(Math.pow(centerX - offsetX, 2) + Math.pow(centerY - offsetY, 2));
        console.log(lineA, lineB);
        var w = initialW + (lineB - lineA);
        //由于是等比缩放，所以乘一个宽高比例。
        var h = initialH + (lineB - lineA) * (initialH / initialW);
        //定义最小宽高
        w = w <= 5 ? 5 : w;
        h = h <= 5 ? 5 : h;
        console.log(w, h, offsetX, offsetY);
        Object.assign(lastImage, { rotate: rotate, w: w, h: h });
        if (w > 5 && h > 5) {
            // 放大 或 缩小
            // lastImage.x = initialX - (lineB - lineA) / 2;
            // lastImage.y = initialY - (lineB - lineA) / 2;
            var x_1 = initialX - (lineB - lineA) / 2;
            var y_1 = initialY - (lineB - lineA) / 2;
            Object.assign(lastImage, { x: x_1, y: y_1 });
        }
    }
    draw();
});
canvas === null || canvas === void 0 ? void 0 : canvas.addEventListener("mouseup", function (e) {
    canMove = false;
});
