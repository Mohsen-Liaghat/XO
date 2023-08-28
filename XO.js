const winnerColor = "green" ;

function toArray(arr) {
  res = [];
  for (i of arr) {
    res.push(i);
  }
  return res;
}

const cells = toArray(document.getElementsByTagName("th"));

let player = "X"

function isEmpty(element) {
  return element.innerText === '';
}

function fill(cell, x) {
  if (isEmpty(cell)) {
    cell.innerText = x;
  }
}

function play(cell) {
  fill(cell, player)
}

function turn() {
  switch (player) {
    case 'X':
      player = 'O';
      break;
    case 'O':
      player = 'X';
      break;
    default:
      alert("Error!")
  }
}

function sametext(arr) {
  return arr.every((cell, i, arri) => { return arri[0].innerText === cell.innerText; })
}

function row_win(i) {
  const rown = Math.floor(i / 3);
  let row = [];
  for (let j = 0; j < 9; j++) {
    if (Math.floor(j / 3) === rown) {
      row.push(cells[j])
    }
  }
  if (sametext(row)) {
    row.forEach(cell => { cell.style.backgroundColor = winnerColor });
    return true;
  }
}

function col_win(i) {
  const rown = i % 3;
  let row = [];
  for (let j = 0; j < 9; j++) {
    if (j % 3 === rown) {
      row.push(cells[j])
    }
  }
  if (sametext(row)) {
    row.forEach(cell => { cell.style.backgroundColor = winnerColor });
    return true;
  }
}

function cross_win(i) {
  let row = [];
  if (i === 0 | i === 8) {
    row = [cells[0], cells[4], cells[8]]
  } else if (i === 2 | i === 6) {
    row = [cells[2], cells[4], cells[6]]
  } else if (i === 4) {
    return cross_win(0) | cross_win(2)
  } else {
    return false
  }
  if (sametext(row)) {
    row.forEach(cell => { cell.style.backgroundColor = "green" });
    return true;
  }
  return false 
}

function win_check(i) {
  let res = row_win(i) ;
  res = col_win(i) || res 
  res = cross_win(i) || res 
  return res ;
}
let counter = 0;
for (let i = 0; i < 9; i++) {
  cells[i].addEventListener("click", () => {
    play(cells[i]);
    if (win_check(i)) {
      window.alert(cells[i].innerText + " is the winner.\npress F5 to play again.")
    }
    else if (counter === 8 ) {
      window.alert("It was an equal game.\npress F5 to play again.");
    }
    turn();
    counter++;
  })
}