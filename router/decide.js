const router = require('express').Router();
const BinPacking2D = require('binpackingjs').BP2D;
const { Bin, Box, Packer } = BinPacking2D;
const { createCanvas, loadImage, Image } = require('canvas');
const color = ['red', 'orange', 'yellow', 'green', 'blue', 'darkblue', 'purple']
var bin, sqr, fillSqr, freeSqr;
var boxes = [];
let parametr = [];



router.post('/decide', (req, res) => {
  const { width, height } = req.body;
  bin = new Bin(width * 1, height * 1);
  const canvas = createCanvas(bin.width, bin.height)
  const ctx = canvas.getContext('2d')
  var text = ctx.measureText('Awesome!')
  ctx.strokeStyle = 'rgba(0,0,0,0.5)'
  ctx.beginPath()
  ctx.lineTo(50, 102)
  ctx.lineTo(50 + text.width, 102)
  ctx.stroke()

  res.json({ img_src: canvas.toDataURL('image/jpeg', 0.1) })
});


router.post('/decide2', async function (req, res) {
  const valueFilds = await { width: req.body.width, height: req.body.height }
  boxes.push(new Box(req.body.width, req.body.height))
  console.log(boxes.length);
  console.log(bin);
  
  parametr.push(valueFilds);
  boxes.sort(compare({ width: 1, height: 1 }));
  let packer = new Packer([bin]);
  let packed_boxes = packer.pack(boxes);
  console.log(packed_boxes.length);
  
  const canvas = createCanvas(bin.width, bin.height)
  const ctx = canvas.getContext('2d')
  for (let index = 0; index < bin.boxes.length; index++) {
    ctx.fillStyle = color[index % 7];
    ctx.fillRect(bin.boxes[index].x, bin.boxes[index].y, bin.boxes[index].width, bin.boxes[index].height);
    fillSqr += bin.boxes[index].width * bin.boxes[index].height;
  }

  res.json({ parametr: parametr, img_src: canvas.toDataURL('image/jpeg', 0.1) })
})

router.post('/clear', (req, res) => {
  parametr.splice(0);
  res.json(parametr);
});

// function canvas(bin) {
//   const canvas = createCanvas(bin.width, bin.height);
//   const ctx = canvas.getContext('2d');
//   // const result = canvas.toBuffer('image/jpeg', { quality: 0.1 })
//   const img = new Image()
//   img.dataMode = Image.MODE_IMAGE
//   return img;
// }

// function packer(bin, boxes) {
//   boxes.sort(compare({ width: 1, height: 1 }));
//   let packer = new Packer([bin]);
//   let packed_boxes = packer.pack(boxes);
//   const canvas = createCanvas(bin.width, bin.height)
//   const ctx = canvas.getContext('2d')
//   const color = ['red', 'orange', 'yellow', 'green', 'blue', 'darkblue', 'purple']

//   for (let index = 0; index < bin.boxes.length; index++) {
//     ctx.fillStyle = color[index % 7];
//     ctx.fillRect(bin.boxes[index].x, bin.boxes[index].y, bin.boxes[index].width, bin.boxes[index].height);
//     fillSqr += bin.boxes[index].width * bin.boxes[index].height;
//   }
//   const result = canvas.toBuffer('image/jpeg', { quality: 0.1 })
//   return result;
// }

function compare(field, order) {
  let len = arguments.length;
  if (len === 0) {
    return (a, b) => (a < b && -1) || (a > b && 1) || 0;
  }
  if (len === 1) {
    switch (typeof field) {
      case 'number':
        return field < 0 ?
          ((a, b) => (a < b && 1) || (a > b && -1) || 0) :
          ((a, b) => (a < b && -1) || (a > b && 1) || 0);
      case 'string':
        return (a, b) => (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0;
    }
  }
  if (len === 2 && typeof order === 'number') {
    return order < 0 ?
      ((a, b) => (a[field] < b[field] && 1) || (a[field] > b[field] && -1) || 0) :
      ((a, b) => (a[field] < b[field] && -1) || (a[field] > b[field] && 1) || 0);
  }
  let fields, orders;
  if (typeof field === 'object') {
    fields = Object.getOwnPropertyNames(field);
    orders = fields.map(key => field[key]);
    len = fields.length;
  } else {
    fields = new Array(len);
    orders = new Array(len);
    for (let i = len; i--;) {
      fields[i] = arguments[i];
      orders[i] = 1;
    }
  }
  return (a, b) => {
    for (let i = 0; i < len; i++) {
      if (a[fields[i]] < b[fields[i]]) return orders[i];
      if (a[fields[i]] > b[fields[i]]) return -orders[i];
    }
    return 0;
  };
}

module.exports = router;


