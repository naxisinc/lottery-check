let objWinner = [];
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
        for (let i = 1; i <= objWinner.length; i++) {
          switch (objWinner[i - 1].color) {
            case 0:
              $('#num' + i).addClass('zero');
              break;
            case 1:
              $('#num' + i).addClass('one');
              break;
            case 2:
              $('#num' + i).addClass('two');
              break;
            case 3:
              $('#num' + i).addClass('three');
              break;
            case 4:
              $('#num' + i).addClass('four');
          }
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
        found = true;
        break;
      }
    }
  }
  if (found) {
    objWinner.push({ value });
    return true;
  }
  return false;
}

function ObjectToArray() {
  let arr_winner = [];
  for (let i = 0; i < objWinner.length; i++) {
    arr_winner[i] = objWinner[i].value;
  }
  return arr_winner;
}

function isIncluded() {
  let arr_winner = ObjectToArray();
  for (const sub_arr of arr) {
    if (_.intersection(sub_arr, arr_winner).length === arr_winner.length) {
      return true;
    }
  }
  return false;
}

function coloring() {
  if (objWinner.length === 1) {
    objWinner[0].color = 0;
  } else {
    let currentPosition = objWinner.length - 1;
    if (!isIncluded()) {
      let cont = 0;
      let maxInt = []; // Almacena el mayor length de intersections
      let arr_winner = ObjectToArray();
      for (let i = 0; i < arr.length; i++) {
        let res = _.intersection(arr[i], arr_winner);
        if (res.length > cont) {
          maxInt = res;
          cont = res.length;
        }
      }
      console.log(maxInt);
      for (let i = 0; i <= currentPosition; i++) {
        if (_.includes(maxInt, objWinner[i].value)) {
          console.log('entre');
          objWinner[i].color = currentPosition;
        }
      }
    } else {
      // same color for everyone
      objWinner[currentPosition].color = 0;
    }
  }
  console.log(objWinner);
}

function isMegaBall(value) {
  for (i = 0; i < mega.length; i++) {
    if (mega[i] === value) {
      return true;
    }
  }
  return false;
}
