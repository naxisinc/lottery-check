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

/* Esta function se encarga de asignar un valor (color) al
recien agregado valor al objeto de numeron ganadores */
function setColor() {
  if (objWinner.length === 1) {
    objWinner[0].color = 0; // el primer elemento siempre comenzara del color por default
  } else {
    let currentPosition = objWinner.length - 1;
    if (!isIncluded()) {
      // Si el arreglos de ganadores NO intersecta una misma fila del array de numeros
      let cont = 0;
      let maxInt = []; // Almacena el mayor length de intersections
      let arr_winner = ObjectToArray();
      // Busco la fila de numeros que mas intersections tenga con el array ganador
      for (let i = 0; i < arr.length; i++) {
        let res = _.intersection(arr[i], arr_winner);
        if (res.length > cont) {
          maxInt = res;
          cont = res.length;
        }
      }

      console.log('maxInt', maxInt);
      // Pregunto si el current value esta incluido dentro del resultado
      if (_.includes(maxInt, objWinner[currentPosition].value)) {
        for (let i = 0; i <= currentPosition; i++) {
          // Le cambio el color a todos los ganadores que hayan sido interseptados
          // con el array ganador y q a la vez current value esta incluido
          if (_.includes(maxInt, objWinner[i].value)) {
            objWinner[i].color = currentPosition;
          }
        }
      } else {
        // Busco si la diferencia esta en una
        // misma fila del arreglo de numeros
        let flag = false;
        let diff = _.difference(arr_winner, maxInt);
        console.log('diff', diff);
        // Si la difference > 1 es necesario el check
        if (diff.length > 1) {
          for (let i = 0; i < arr.length; i++) {
            let intDiff_length = _.intersection(arr[i], diff).length;
            if (intDiff_length === diff.length) {
              console.log('entre');
              flag = true;
              break;
            }
          }
          if (flag) {
            let color = getColorByValue(diff[0]);
            for (let i = 0; i < diff.length; i++) {
              for (let j = 0; j < objWinner.length; j++) {
                if (objWinner[j].value === diff[i]) {
                  objWinner[j].color = color;
                }
              }
            }
          } else {
            // Diffence puede ser mayor q 1 sin embargo no estar
            // las diferencias en una misma fila de numeros por lo
            // tanto recibe el color current position
            objWinner[currentPosition].color = currentPosition;
          }
        } else {
          // si el valor no esta incluido en el resultado de la interseption
          // solo coloreo al objeto actual con el color q le corresponde
          objWinner[currentPosition].color = currentPosition;
        }
      }
    } else {
      // si el arreglo ganador esta incluido en una misma fila
      // sigo coloreando del color por default
      objWinner[currentPosition].color = 0;
    }
  }
  console.log(objWinner);
}

function isMegaBall(value) {
  if (_.includes(mega, value)) {
    // Busco las posiciones en mega donde aparezca el mega-value
    let arr_aux = [];
    let pos = 0;
    for (let i = 0; i < mega.length; i++) {
      if (mega[i] === value) {
        arr_aux[pos++] = i;
      }
    }
    console.log('arr_aux', arr_aux);
    // Verifico si fue Bingo
    let arr_winner = ObjectToArray();
    for (let i = 0; i < arr_aux.length; i++) {
      if (_.difference(arr[arr_aux[i]], arr_winner).length === 0) {
        return 999; // Bingo!!!
      }
    }

    // Para cada uno de los resultados dnd aparecio mega-value en mega
    // uso la posicion para interseptar al array ganador con el array
    // de numeros en la posicion almacenada en el arr_aux
    let maxInt = []; // Almacena el mayor length de intersections
    let length = 0;
    console.log('arr_winner', arr_winner);
    for (let i = 0; i < arr_aux.length; i++) {
      console.log('arr[arr_aux[i]]', arr[arr_aux[i]]);
      let res = _.intersection(arr[arr_aux[i]], arr_winner);
      console.log('res', res);
      // me quedo con el array q mas intersepciones tenga
      if (res.length > length) {
        maxInt = res;
        length = res.length;
      }
    }

    console.log('maxInt', maxInt);

    // coloreo la bola mega del mismo color del primer elemento de maxInt
    // q supuestamente es el mismo de los otros valores q al igual que el
    // fueron interseptados
    if (maxInt.length > 0) {
      // console.log('objWinner', objWinner);
      // console.log('color = ', getColorByValue(maxInt[0]));
      // retorno el color del q mas intersepciones tuvo
      return getColorByValue(maxInt[0]);
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
