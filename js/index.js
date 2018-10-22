let objWinner = [];
let count = 0;

$(document).ready(() => {
  $('#form').on('submit', function(e) {
    e.preventDefault();

    count++;
    let value = parseInt($('#number').val());
    if (count <= 5) {
      if (search(value)) {
        $('#num' + (count - 1)).text(value);
        setColor();
        for (let i = 0; i < objWinner.length; i++) {
          coloring(objWinner[i].color, i);
        }
      } else {
        $('#num' + (count - 1)).addClass('black');
      }
    } else if (count === 6) {
      let res = isMegaBall(value);
      if (res !== -1) {
        $('#num5').text(value);
        if (res === 999) {
          coloring(objWinner[0].color, 5);
        } else {
          coloring(res, 5);
          // for (let i = 0; i < objWinner.length; i++) {
          //   coloring(objWinner[i].color, i);
          // }
        }
      } else {
        $('#num5').addClass('black');
      }
    }
    $('#number').val('');
  });
});

function coloring(color, id) {
  if (color === 0) {
    $('#num' + id).addClass('zero');
  } else if (color === 1) {
    $('#num' + id).addClass('one');
  } else if (color === 2) {
    $('#num' + id).addClass('two');
  } else if (color === 3) {
    $('#num' + id).addClass('three');
  } else if (color === 4) {
    $('#num' + id).addClass('four');
  } else if (color === 5) {
    $('#num' + id).addClass('five');
  }
}

function search(value) {
  for (const numbers of arr) {
    if (_.includes(numbers, value)) {
      objWinner.push({ value });
      return true;
    }
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

function setColor() {
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

      if (_.includes(maxInt, objWinner[currentPosition].value)) {
        for (let i = 0; i <= currentPosition; i++) {
          if (_.includes(maxInt, objWinner[i].value)) {
            objWinner[i].color = currentPosition;
          }
        }
      } else {
        objWinner[currentPosition].color = currentPosition;
      }
    } else {
      objWinner[currentPosition].color = 0;
    }
  }
  console.log(objWinner);
}

function isMegaBall(value) {
  if (_.includes(mega, value)) {
    let arr_aux = [];
    let pos = 0;
    for (let i = 0; i < mega.length; i++) {
      if (mega[i] === value) {
        arr_aux[pos++] = i;
      }
    }
    console.log('arr_aux', arr_aux);

    let arr_winner = ObjectToArray();
    for (let i = 0; i < arr_aux.length; i++) {
      if (_.difference(arr[arr_aux[i]], arr_winner).length === 0) {
        return 999; // Bingo!!!
      }
    }

    let maxInt = []; // Almacena el mayor length de intersections
    let length = 0;
    console.log('arr_winner', arr_winner);
    for (let i = 0; i < arr_aux.length; i++) {
      console.log('arr[arr_aux[i]]', arr[arr_aux[i]]);
      let res = _.intersection(arr[arr_aux[i]], arr_winner);
      console.log('res', res);
      if (res.length > length) {
        maxInt = res;
        length = res.length;
      }
    }

    console.log('maxInt', maxInt);

    if (maxInt.length > 0) {
      console.log('objWinner', objWinner);
      console.log('color = ', getColorByValue(maxInt[0]));
    }

    return 5; // Color de Mega por default
  }
  return -1; // No esta
}

function getColorByValue(value) {
  for (let i = 0; i < objWinner.length; i++) {
    if (objWinner[i].value === value) {
      return objWinner[i].color;
    }
  }
}
