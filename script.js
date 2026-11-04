const turn_label = document.getElementById("turn");
const dif_menu = document.getElementById("menu_dif");
const dif_bt = document.getElementById("bt_dif")

const params = new URLSearchParams(location.search);

let single = params.get("single") == "true";
let dif = params.get("dif") || "none";

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

random_p();
let ini_winAseri_bung = false;
update_ui()

function update() 
{
  if (single)
  {
    med_move()
    ran_move()
  }
}
setInterval(update, 16)
function ran_move()
{
  if (dif != "ran" || turn != "X")
  {
    console.log("p")
    return
  }
  console.log( single,dif);
  let kosong = [];

  for (let y = 0; y < 3; y++)
  {
    for (let x = 0; x < 3; x++)
    {
      if (board[y][x] == " ")
      {
        kosong.push([y,x]);
      }
    }
  }
    
  if (kosong.length == 0) return;

  let pilih = kosong[
    Math.floor(Math.random() * kosong.length)
  ];

  pick(pilih[0], pilih[1]);
}

function med_move()
{
  if (dif != "med" || turn != "X") return;

  let langkah = cari_win("X");

  if (langkah == null)
  {
    langkah = cari_win("O");
  }

  if (langkah == null)
  {
    langkah = cari_fork("X");
  }

  if (langkah == null)
  {
    if (board[1][1] == " ")
    {
      langkah = [1,1];
    }
  }
  if (langkah == null)
  {
    let pojok = [
      [0,0], [0,2],
      [2,0], [2,2]
    ];
  
    let kosong = pojok.filter(
      ([y,x]) => board[y][x] == " "
    );
  
    if (kosong.length > 0)
    {
      langkah = kosong[
        Math.floor(Math.random() * kosong.length)
      ];
    }
  }
  
  if (langkah == null)
  {
    let sisi = [
      [0,1], [1,0],
      [1,2], [2,1]
    ];
  
    let kosong = sisi.filter(
      ([y,x]) => board[y][x] == " "
    );
  
    if (kosong.length > 0)
    {
      langkah = kosong[
        Math.floor(Math.random() * kosong.length)
      ];
    }
  }

  if (langkah != null)
  {
    pick(langkah[0], langkah[1]);
  }
}

function ganti_page(data)
{
  if (data == "game_2")
  {
    location.href = "game.html?single=false&dif=none";
  }
  else if (data =="ran")
  {
    location.href = "game.html?single=true&dif=ran";
  }
  else if (data == "med")
  {
    location.href = "game.html?single=true&dif=med";
  }
  else if (data == "balik")
  {
    location.href = "index.html";
  }
}
function open_dif()
{
  dif_menu.style.display = "block";
  bt_dif.style.display = "none";
}
function random_p()
{
  
  turn = p[Math.floor(
    Math.random() * p.length
  )]
  
}

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
function cari_fork(p)
{
  for (let y = 0; y < 3; y++)
  {
    for (let x = 0; x < 3; x++)
    {
      if (board[y][x] != " ") continue;

      board[y][x] = p;

      let ancaman = 0;

      for (let a = 0; a < 3; a++)
      {
        for (let b = 0; b < 3; b++)
        {
          if (board[a][b] != " ") continue;

          board[a][b] = p;

          if (cek_win(board, p))
          {
            ancaman++;
          }

          board[a][b] = " ";
        }
      }

      board[y][x] = " ";

      if (ancaman >= 2) return [y, x];
    }
  }

  return null;
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

function cek_win(b, p)
{
  for (let i = 0; i < 3; i++)
  {
    if (b[i][0] == p && b[i][1] == p && b[i][2] == p) return true;
    if (b[0][i] == p && b[1][i] == p && b[2][i] == p) return true;
  }

  if (b[0][0] == p && b[1][1] == p && b[2][2] == p) return true;
  if (b[0][2] == p && b[1][1] == p && b[2][0] == p) return true;

  return false;
}

function cari_win(p)
{
  for (let y = 0; y < 3; y++)
  {
    for (let x = 0; x < 3; x++)
    {
      if (board[y][x] != " ") continue;

      board[y][x] = p;

      let menang = cek_win(board, p);

      board[y][x] = " ";

      if (menang) return [y, x];
    }
  }

  return null;
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
    bt_win("02","12","22");
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
  random_p();
  update_ui();
  ini_winAseri_bung = false
}