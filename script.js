const turn_label = document.getElementById("turn")


let board = 
[
  [" "," "," "],
  [" "," "," "],
  [" "," "," "]
];

let turn = "O";
let p =
[
  "X",
  "O"
];

let ini_winAseri_bung = false;
update_ui()

function update() 
{
  
}
setInterval(update, 16)

function pick(ky,kx)
{
  if (ini_winAseri_bung)
  {
    return;
  }

  let id = "k" + ky + kx
  let object = document.getElementById(id)
  if (turn == "O" && board[ky][kx] == " ")
  {
    board[ky][kx] = "O"
    object.style.background = "var(--O)"
    turn = "X"
  }
  else if (turn == "X" && board[ky][kx] == " ")
  {
    board[ky][kx] = "X"
    object.style.background = "var(--X)"
    turn = "O"
  }
  update_ui()
  win_ceker()
}
function update_ui()
{
  turn_label.innerText = "turn: "+turn
  for (let object = 0; object < 9; object++)
  {
    let y = Math.floor(object / 3);
    let x = object % 3;
    let id = "k" + y + x;
    document.getElementById(id).innerText = board[y][x];
  }
}
function win_ceker()
{
  if (
    board[0][0] == "O" && 
    board[0][1] == "O" &&
    board[0][2] == "O"
  )
  {
    win("O");
    bt_win("00","01","02");
  }
  else if (
    board[1][0] == "O" &&
    board[1][1] == "O" && 
    board[1][2] == "O"
  )
    {
      win("O");
      bt_win(10,11,12);
    }
  else if (
    board[2][0] == "O" &&
    board[2][1] == "O" &&
    board[2][2] == "O"
  )
  {
    win("O");
    bt_win(20,21,22);
  }
  else if (
    board[0][0] == "O" &&
    board[1][0] == "O" &&
    board[2][0] == "O"
  )
  {
    win("O");
    bt_win("00","10","20");
  }
  else if (
    board[0][1] == "O" &&
    board[1][1] == "O" &&
    board[2][1] == "O"
  )
  {
    win("O");
    bt_win("01","11","21");
  }
  else if (
    board[0][2] == "O" &&
    board[1][2] == "O" &&
    board[2][2] == "O"
  )
  {
    win("O");
    bt_win("02","11","20");
  }
  else if (
    board[0][0] == "O" &&
    board[1][1] == "O" &&
    board[2][2] == "O"
  )
  {
    win("O");
    bt_win("00",11,22);
  }
  else if (
    board[0][2] == "O" &&
    board[1][1] == "O" &&
    board[2][0] == "O"
  )
  {
    win("O");
    bt_win("02",11,20);
  }
  else if (
    board[0][0] == "X" && 
    board[0][1] == "X" &&
    board[0][2] == "X"
  )
  {
    win("X");
    bt_win("00","01","02");
  }
  else if (
    board[1][0] == "X" &&
    board[1][1] == "X" && 
    board[1][2] == "X"
  )
    {
      win("X");
      bt_win(10,11,12);
    }
  else if (
    board[2][0] == "X" &&
    board[2][1] == "X" &&
    board[2][2] == "X"
  )
  {
    win("X");
    bt_win(20,21,22);
  }
  else if (
    board[0][0] == "X" &&
    board[1][0] == "X" &&
    board[2][0] == "X"
  )
  {
    win("X");
    bt_win("00","10","20");
  }
  else if (
    board[0][1] == "X" &&
    board[1][1] == "X" &&
    board[2][1] == "X"
  )
  {
    win("X");
    bt_win("01","11","21");
  }
  else if (
    board[0][2] == "X" &&
    board[1][2] == "X" &&
    board[2][2] == "X"
  )
  {
    win("X");
    bt_win("02","12","22");
  }
  else if (
    board[0][0] == "X" &&
    board[1][1] == "X" &&
    board[2][2] == "X"
  )
  {
    win("X");
    bt_win("00",11,22);
  }
  else if (
    board[0][2] == "X" &&
    board[1][1] == "X" &&
    board[2][0] == "X"
  )
  {
    win("X");
    bt_win("02",11,20);
  }
  else if (
    board[0][0] != " " && 
    board[0][1] != " " &&
    board[0][2] != " " &&
    board[1][0] != " " &&
    board[1][1] != " " && 
    board[1][2] != " " &&
    board[2][0] != " " &&
    board[2][1] != " " && 
    board[2][2] != " "
  )
  {
    alert("broo epic battle");
    ini_winAseri_bung = true;
  }
}
function win(p)
{
  alert(p + ` winnn`);
  ini_winAseri_bung = true;
}
function bt_win(q,w,e)
  
{
  document.getElementById("k" + q).style.background = "var(--win)";
  document.getElementById("k" + w).style.background = "var(--win)";
  document.getElementById("k" + e).style.background = "var(--win)";
}
function riset()
{
  board = 
  [
    [" "," "," "],
    [" "," "," "],
    [" "," "," "]
  ];
  for (let object = 0; object < 9; object++)
  {
    let y = Math.floor(object / 3);
    let x = object % 3;
    let id = "k" + y + x;
    document.getElementById(id).style.background = "var(--none)";
  }
  update_ui();
  ini_winAseri_bung = false
}