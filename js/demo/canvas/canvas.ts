const canvas = document.querySelector<HTMLCanvasElement>("#my-canvas");
const context = canvas?.getContext("2d");
const icons: Record<string, HTMLImageElement | null> = {
  close: null,
  scale: null,
};
const dpr = window.devicePixelRatio;
if (canvas) {
  canvas.width = canvas.width * dpr;
  canvas.height = canvas.height * dpr;
  context?.scale(dpr, dpr);
}

function loadIcon(src: string, key: keyof typeof icons) {
  const img = new Image();
  img.src = src;
  img.onload = function () {
    icons[key] = img;
  };
}
loadIcon("../../../assets/images/close.png", "close");
loadIcon("../../../assets/images/scale.png", "scale");

const userImageUploadButton =
  document.querySelector<HTMLInputElement>("#user-image");
userImageUploadButton?.addEventListener("change", function () {
  const img = userImageUploadButton?.files![0];
  loadImage(img);
});

interface ImageObject {
  img: CanvasImageSource;
  x: number;
  y: number;
  w: number;
  h: number;
  selected: boolean;
  rotate: number;
  centerY: number;
  centerX: number;
  place: TTouchPlace | null;
}

const imageList: ImageObject[] = [];
function loadImage(img: File) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const userImage = new Image();
    userImage.src = <string>e.target?.result!;
    userImage.onload = function () {
      const len = imageList.length;
      if (len) {
        imageList[len - 1].selected = false;
      }
      const { width, height } = userImage;
      let userIamgeObj: ImageObject = {
        img: userImage,
        x: 30,
        y: 30,
        w: userImage.width,
        h: userImage.height,
        selected: true,
        rotate: 0,
        centerY: 30 + height / 2,
        centerX: 30 + width / 2,
        place: null,
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
  imageList.forEach((iamgeObj) => {
    const { img, x, y, w, h, selected, centerX, centerY, rotate } = iamgeObj;
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
      context.drawImage(icons.close!, x - 12, y - 12, 24, 24);
      context.drawImage(icons.scale!, x + w - 12, y + h - 12, 24, 24);
    }
    context.restore();
  });
}

function isInPicture(offsetX: number, offsetY: number) {
  const len = imageList.length;
  for (let i = len - 1; i >= 0; i--) {
    const current = imageList[i];
    const { selected } = current;
    const place = inWhere(offsetX, offsetY, current);
    if (selected && place === TOUCH_TYPE.DELETE) {
      imageList.splice(i, 1);
      draw();
      return false;
    } else if (place) {
      imageList[imageList.length - 1].selected = false;
      const [current] = imageList.splice(i, 1);
      Object.assign(current, { selected: true, place });
      imageList.push(current);
      draw();
      return true;
    }
  }
  imageList[imageList.length - 1].selected = false;
  draw();
  return false;
}
function getTransform(
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  rotate: number
): { x: number; y: number } {
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
    y: centerY + a - 12,
  };
}
function inWhere(
  offsetX: number,
  offsetY: number,
  image: ImageObject
): TTouchPlace | null {
  const { x, y, w, h, centerY, centerX, rotate } = image;
  // 变换区域左上角的坐标和区域的高度宽度
  let transformW = 24;
  let transformH = 24;
  let transformX = x + w;
  let transformY = y + h;
  let transformAngle =
    (Math.atan2(transformY - centerY, transformX - centerX) / Math.PI) * 180 +
    rotate;
  let transformXY = getTransform(
    transformX,
    transformY,
    centerX,
    centerY,
    transformAngle
  );
  transformX = transformXY.x;
  transformY = transformXY.y;
  // 删除区域左上角的坐标和区域的高度宽度
  let delW = 24;
  let delH = 24;
  let delX = x;
  let delY = y;
  let delAngle =
    (Math.atan2(delY - centerY, delX - centerX) / Math.PI) * 180 + rotate;
  let delXY = getTransform(delX, delY, centerX, centerY, delAngle);
  delX = delXY.x;
  delY = delXY.y;
  //移动区域的坐标
  let moveX = x;
  let moveY = y;
  if (
    offsetX - transformX >= 0 &&
    offsetY - transformY >= 0 &&
    transformX + transformW - offsetX >= 0 &&
    transformY + transformH - offsetY >= 0
  ) {
    // 缩放区域
    return TOUCH_TYPE.TRANSFORM;
  } else if (
    offsetX - delX >= 0 &&
    offsetY - delY >= 0 &&
    delX + delW - offsetX >= 0 &&
    delY + delH - offsetY >= 0
  ) {
    // 删除区域
    return TOUCH_TYPE.DELETE;
  } else if (
    offsetX - moveX >= 0 &&
    offsetY - moveY >= 0 &&
    moveX + w - offsetX >= 0 &&
    moveY + h - offsetY >= 0
  ) {
    // 移动区域
    return TOUCH_TYPE.MOVE;
  }

  return null;
}

let canMove = false;
const TOUCH_TYPE: Record<TTouchPlace, TTouchPlace> = {
  MOVE: "MOVE",
  DELETE: "DELETE",
  TRANSFORM: "TRANSFORM",
};
type TTouchPlace = "MOVE" | "DELETE" | "TRANSFORM";
const startTouchPosition = { startX: 0, startY: 0 };
const initialStatus = {
  initialX: 0,
  initialY: 0,
  initialH: 0,
  initialW: 0,
  initialRotate: 0,
};
canvas?.addEventListener("mousedown", function (e: MouseEvent) {
  const { offsetX, offsetY } = e;
  if (!isInPicture(offsetX, offsetY)) {
    return;
  }
  const lastImage = imageList[imageList.length - 1];
  Object.assign(startTouchPosition, { startX: offsetX, startY: offsetY });
  const { x, y, w, h, rotate } = lastImage;
  Object.assign(initialStatus, {
    initialX: x,
    initialY: y,
    initialH: h,
    initialW: w,
    initialRotate: rotate,
  });
  canMove = true;
});
canvas?.addEventListener("mousemove", function (e: MouseEvent) {
  if (!canMove) {
    return;
  }
  const { offsetX, offsetY } = e;
  const { startX, startY } = startTouchPosition;
  const { initialX, initialY } = initialStatus;
  const lastImage = imageList[imageList.length - 1];
  let { x, y, place } = lastImage;
  if (place === TOUCH_TYPE.MOVE) {
    const { w, h } = lastImage;
    //算出移动后的xy坐标与点击时xy坐标的差（即平移量）与图片对象的初始坐标相加即可
    x = initialX + (offsetX - startX);
    y = initialY + (offsetY - startY);
    const centerX = x + w / 2;
    const centerY = y + h / 2;

    Object.assign(lastImage, { x, y, centerX, centerY });
  } else if (place === TOUCH_TYPE.TRANSFORM) {
    const { centerX, centerY } = lastImage;
    //旋转部分
    const { initialRotate } = initialStatus;
    const angleBefore =
      (Math.atan2(startY - centerY, startX - centerX) / Math.PI) * 180;
    const angleAfter =
      (Math.atan2(offsetY - centerY, offsetX - centerX) / Math.PI) * 180;
    // 旋转的角度
    const rotate = initialRotate + angleAfter - angleBefore;
    //缩放部分
    const { initialH, initialW } = initialStatus;
    //用勾股定理算出距离
    let lineA = Math.sqrt(
      Math.pow(centerX - startX, 2) + Math.pow(centerY - startY, 2)
    );
    let lineB = Math.sqrt(
      Math.pow(centerX - offsetX, 2) + Math.pow(centerY - offsetY, 2)
    );
    console.log(lineA, lineB);
    let w = initialW + (lineB - lineA);
    //由于是等比缩放，所以乘一个宽高比例。
    let h = initialH + (lineB - lineA) * (initialH / initialW);
    //定义最小宽高
    w = w <= 5 ? 5 : w;
    h = h <= 5 ? 5 : h;

    console.log(w, h, offsetX, offsetY);
    Object.assign(lastImage, { rotate, w, h });
    if (w > 5 && h > 5) {
      // 放大 或 缩小
      // lastImage.x = initialX - (lineB - lineA) / 2;
      // lastImage.y = initialY - (lineB - lineA) / 2;
      const x = initialX - (lineB - lineA) / 2;
      const y = initialY - (lineB - lineA) / 2;
      Object.assign(lastImage, { x, y });
    }
  }
  draw();
});
canvas?.addEventListener("mouseup", function (e: MouseEvent) {
  canMove = false;
});
