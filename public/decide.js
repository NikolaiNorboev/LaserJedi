const formFirst = document.getElementById('formPaint1');
const div = document.getElementById("test");
const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');

formFirst.addEventListener('submit', async function (event) {
  event.preventDefault();
  let response = await fetch('/decide', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ width: input1.value, height: input2.value }),
  })
  let json = await response.json();
  let divImg = document.getElementById('img');
  let img = document.createElement('img');
  let.id
  img.src = json.img_src;
  divImg.append(img);

})

const formFirst2 = document.getElementById('formPaint2');
formFirst2.addEventListener('submit', async function (event) {
  event.preventDefault();
  let response = await fetch('/decide2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ width: event.target.width.value, height: event.target.height.value })
  })
  let list = await response.json();
  let divImg = document.getElementById('img');
  let img = document.createElement('img');
  img.src = list.img_src

  divImg.innerHTML = ''
  divImg.appendChild(img);


  const div = document.getElementById('divGrow');
  const ul = document.createElement('ul');
  for (let i = 0; i < list.parametr.length; i += 1) {
    const li = document.createElement('li');
    li.innerText = `${list.parametr[i].width} - ${list.parametr[i].height}`;
    ul.append(li);
  }
  div.innerHTML = ul.innerHTML

})

const clear = document.getElementById('clear');

clear.addEventListener('click', async ()=>{
    let response = await fetch('/clear', {
      method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  
    });
    let res = await response.json();
    
})




// const divGrow = document.getElementById('divGrow');
// const formFirst2 = document.getElementById('formPaint2');

// function seed() {for (let i = 0; i < 20; i++) {
//   //formFirst2.addEventListener('submit', async function (event) {
//     //event.preventDefault();

//     // form.innerText = `<input type="text" placeholder="width"><br><br>
//     // <input type="text" placeholder="hight"><br><br>
//     // <input type="submit" value="paint"><br><br> `;
//     let form = document.createElement('form');
//     form.id = i;
//     let input = document.createElement('input');
//     let inputSecond = document.createElement('input');
//     let button = document.createElement('button');
//     button.type = "submit";
//     form.appendChild(input);
//     form.appendChild(inputSecond);
//     form.appendChild(button);
//     div.appendChild(form);
//     form.addEventListener('submit', async function (event) {
//       event.preventDefault();
//       let response = await fetch('/decide2', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//               width: event.target.input.value, 
//               height: event.target.inputSecond.value})
//           })
//           console.log(i);
//     })
//     //divGrow.append(form);

//     //index += 1;


//   //})
// }}

// seed()


