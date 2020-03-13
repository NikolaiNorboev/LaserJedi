const router = require('express').Router();
const BinPacking2D = require('binpackingjs').BP2D;
const { Bin, Box, Packer } = BinPacking2D;
const { createCanvas, loadImage, Image } = require('canvas');
const color = ['red', 'orange', 'yellow', 'green', 'blue', 'darkblue', 'purple']
var bin;
var boxes = [];
let parametr = [];

router.post('/decide', (req, res) => {
  const { width, height } = req.body;
  bin = new Bin(Number(width), Number(height));
  const canvas = createCanvas(bin.width, bin.height)
  const ctx = canvas.getContext('2d');
  boxes.splice(0);
  parametr.splice(0);
  res.json({ img_src: canvas.toDataURL('image/jpeg', 0.1) })
});


router.post('/decide2', function (req, res) {
  const valueFilds = { width: req.body.width, height: req.body.height }
  boxes.push(new Box(Number(req.body.width), Number(req.body.height)))
  parametr.push(valueFilds);
  boxes.sort(compare({ width: 1, height: 1 }));
  let packer = new Packer([bin]);
  let packed_boxes = packer.pack(boxes);
  
    
  const canvas = createCanvas(bin.width, bin.height)
  const ctx = canvas.getContext('2d')
  for (let index = 0; index < bin.boxes.length; index++) {
    console.log(bin.boxes[index]);    
    ctx.fillStyle = color[index % 7];
    ctx.fillRect(bin.boxes[index].x, bin.boxes[index].y, bin.boxes[index].width, bin.boxes[index].height);
  }

  res.json({ parametr: parametr, img_src: canvas.toDataURL('image/jpeg', 0.1) })
})

router.post('/clear', (req, res) => {
  parametr.splice(0);
  res.json(parametr);
});


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


