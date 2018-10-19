let arr = [
  [9, 54, 46, 26, 27],
  [49, 38, 19, 40, 17],
  [41, 32, 58, 13, 22],
  [42, 61, 11, 50, 8],
  [17, 69, 18, 9, 70],
  [1, 17, 40, 48, 28],
  [51, 27, 55, 70, 40],
  [28, 47, 53, 65, 40],
  [62, 28, 9, 35, 22],
  [47, 34, 5, 70, 4],
  [14, 68, 51, 56, 4]
];
let mega = [13, 10, 15, 11, 12, 25, 22, 24, 16, 1, 2];
let arrWinner = [];
let arr_aux = [];
let arrCount = [0, 0, 0, 0, 0];

// Counter of inputs
let count = 0;

$(document).ready(() => {
  $('#form').on('submit', function(e) {
    e.preventDefault();

    count++;
    let value = parseInt($('#number').val());
    if (count <= 5) {
      if (search(value)) {
        $('#num' + count).text(value);
        coloring();
        switch (arrWinner[arrWinner.length - 1].color) {
          case 0:
            $('#num' + count).addClass('one');
            break;
          case 1:
            $('#num' + count).addClass('two');
            break;
          case 2:
            $('#num' + count).addClass('three');
            break;
          case 3:
            $('#num' + count).addClass('four');
            break;
          case 4:
            $('#num' + count).addClass('five');
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
  let colored = false;
  if (arrWinner.length === 1) {
    arrWinner[0].color = 0;
  } else {
    for (let index = 0; index < arrWinner.length - 1; index++) {
      for (const numbers of arr_aux) {
        for (const number of numbers) {
          if (number === arrWinner[index].value) {
            colored = true;
            arrCount[index]++;
            break;
          }
        }
      }
    }
    if (colored) {
      let color = arrCount.indexOf(Math.max.apply(null, arrCount));
      arrWinner[arrWinner.length - 1].color = color;
    } else {
      arrWinner[arrWinner.length - 1].color = arrWinner.length - 1;
    }
  }
  arr_aux = [];
  arrCount = [0, 0, 0, 0, 0];
}

function isMegaBall(value) {
  for (i = 0; i < mega.length; i++) {
    if (mega[i] === value) {
      return true;
    }
  }
  return false;
}
