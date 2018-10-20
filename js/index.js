let arrWinner = [];
let arr_aux = [];
let arrCount = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

// Counter of inputs
let count = 0;

$(document).ready(() => {
  $('#form').on('submit', function(e) {
    e.preventDefault();

    // console.log(arrCount[131]);
    // console.log(arr[131]);
    // console.log(mega[131]);

    count++;
    let value = parseInt($('#number').val());
    if (count <= 5) {
      if (search(value)) {
        $('#num' + count).text(value);
        coloring();
        switch (arrWinner[arrWinner.length - 1].color) {
          case 0:
            $('#num' + count).addClass('zero');
            break;
          case 1:
            $('#num' + count).addClass('one');
            break;
          case 2:
            $('#num' + count).addClass('two');
            break;
          case 3:
            $('#num' + count).addClass('three');
            break;
          case 4:
            $('#num' + count).addClass('four');
        }
      } else {
        $('#num' + count).addClass('black');
      }
    } else if (count === 6) {
      if (isMegaBall(value)) {
        $('#num6').addClass('six');
        $('#num6').text(value);
      } else {
        $('#num6').addClass('black');
      }
    }
    $('#number').val('');
  });
});

function search(value) {
  let found = false;
  for (const numbers of arr) {
    for (const number of numbers) {
      if (number === value) {
        arr_aux.push(numbers);
        found = true;
        break;
      }
    }
  }
  if (found) {
    arrWinner.push({ value });
    return true;
  }
  return false;
}

function coloring() {
  // let cont = 0;
  let flag = false;
  if (arrWinner.length === 1) {
    arrWinner[0].color = 0;
  } else {
    for (let index = 0; index < arrWinner.length - 1; index++) {
      for (const numbers of arr_aux) {
        for (const number of numbers) {
          if (number === arrWinner[index].value) {
            arrCount[arrWinner.length - 2][index]++;
            flag = true;
            break;
          }
        }
      }
    }
    // console.log(cont);
    // no sirve la condicion
    // if (cont === arrWinner.length - 1) {
    if (flag) {
      console.log(getColor());
      arrWinner[arrWinner.length - 1].color = arrWinner[getColor()].color;
    } else {
      arrWinner[arrWinner.length - 1].color = arrWinner.length - 1;
    }
    console.log('arr_aux', arr_aux);
    console.log('arrCount', arrCount);
  }
  console.log('arrWinner', arrWinner);
  arr_aux = [];
}

function getColor() {
  let arrCopy = [];
  for (let i = 0; i < arrWinner.length - 1; i++) {
    arrCopy[i] = arrCount[arrWinner.length - 2][i];
  }

  let mf = 1;
  let m = 0;
  let item;
  for (let i = 0; i < arrCopy.length; i++) {
    for (let j = i; j < arrCopy.length; j++) {
      if (arrCopy[i] == arrCopy[j]) m++;
      if (mf < m) {
        mf = m;
        item = arrCopy[i];
      }
    }
    m = 0;
  }
  if (item === 0 || item === undefined) {
    // return el index dnd esta el mayor
    return arrCopy.indexOf(Math.max.apply(null, arrCopy));
  }
  // return el index del q mas se repita
  return arrCopy.indexOf(item);
}

function isMegaBall(value) {
  for (i = 0; i < mega.length; i++) {
    if (mega[i] === value) {
      return true;
    }
  }
  return false;
}
