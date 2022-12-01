let ticTacToeArray = [];
for (let i = 1; i < 4; i++) {
  ticTacToeArray[i] = [];
  for (let j = 1; j < 4; j++) {
    ticTacToeArray[i][j] = 0;
  }
}
let playerTurn = 1;
let gameOver = false;
let spotOpen = false;

toastr.options = {
  newestOnTop: false,
  positionClass: "toast-bottom-right",
  preventDuplicates: true
};

function reset() {
  $("#1-1").html("&nbsp;");
  $("#1-2").html("&nbsp;");
  $("#1-3").html("&nbsp;");
  $("#2-1").html("&nbsp;");
  $("#2-2").html("&nbsp;");
  $("#2-3").html("&nbsp;");
  $("#3-1").html("&nbsp;");
  $("#3-2").html("&nbsp;");
  $("#3-3").html("&nbsp;");
  gameOver = false;
  spotOpen = false;
  playerTurn = 1;
  for (let i = 1; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      ticTacToeArray[i][j] = 0;
    }
  }
  if ($('input[name="playerCount"]:checked').val() == "multiplayer") {
    $("#whichPlayer").html("Player " + playerTurn + "'s Turn");
  }
}

function changeTurn() {
  if (playerTurn == 1) {
    playerTurn = 2;
  } else {
    playerTurn = 1;
  }
  if ($('input[name="playerCount"]:checked').val() == "multiplayer") {
    $("#whichPlayer").html("Player " + playerTurn + "'s Turn");
  }
}

function winMessage() {
  gameOver = true;
  if ($('input[name="playerCount"]:checked').val() == "multiplayer") {
    $("#dialogText").html("Player " + playerTurn + " Won!");
  } else if ($('input[name="playerCount"]:checked').val() == "singleplayer") {
    if (playerTurn == 1) {
      $("#dialogText").html("You Win!");
    } else {
      $("#dialogText").html("You Lose...");
    }
  }
  $("#dialog").modal("show");
  spotOpen = true;
}

function winConditions() {
  if (
    ticTacToeArray[1][1] == playerTurn &&
    ticTacToeArray[2][1] == playerTurn &&
    ticTacToeArray[3][1] == playerTurn
  ) {
    winMessage();
  } else if (
    ticTacToeArray[1][2] == playerTurn &&
    ticTacToeArray[2][2] == playerTurn &&
    ticTacToeArray[3][2] == playerTurn
  ) {
    winMessage();
  } else if (
    ticTacToeArray[1][3] == playerTurn &&
    ticTacToeArray[2][3] == playerTurn &&
    ticTacToeArray[3][3] == playerTurn
  ) {
    winMessage();
  } else if (
    ticTacToeArray[1][1] == playerTurn &&
    ticTacToeArray[1][2] == playerTurn &&
    ticTacToeArray[1][3] == playerTurn
  ) {
    winMessage();
  } else if (
    ticTacToeArray[2][1] == playerTurn &&
    ticTacToeArray[2][2] == playerTurn &&
    ticTacToeArray[2][3] == playerTurn
  ) {
    winMessage();
  } else if (
    ticTacToeArray[3][1] == playerTurn &&
    ticTacToeArray[3][2] == playerTurn &&
    ticTacToeArray[3][3] == playerTurn
  ) {
    winMessage();
  } else if (
    ticTacToeArray[1][1] == playerTurn &&
    ticTacToeArray[2][2] == playerTurn &&
    ticTacToeArray[3][3] == playerTurn
  ) {
    winMessage();
  } else if (
    ticTacToeArray[1][3] == playerTurn &&
    ticTacToeArray[2][2] == playerTurn &&
    ticTacToeArray[3][1] == playerTurn
  ) {
    winMessage();
  } else {
    changeTurn();
  }
}

function squareFilled(id, row, column) {
  spotOpen = false;
  if (gameOver == false) {
    if (ticTacToeArray[row][column] == 0) {
      ticTacToeArray[row][column] = playerTurn;
      if (playerTurn == 1) {
        $(id).html("X");
      } else {
        $(id).html("O");
      }
      winConditions();
      for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
          if (ticTacToeArray[i][j] == 0) {
            spotOpen = true;
          }
        }
      }
      if (spotOpen == false) {
        $("#dialogText").html("You Tied!");
        $("#dialog").modal("show");
        gameOver = true;
      }
      if (
        $('input[name="playerCount"]:checked').val() == "singleplayer" &&
        playerTurn == 2
      ) {
        computerMove();
      }
    } else {
      toastr.error("This Spot is Taken!");
    }
  }
}

function randomSpace() {
  let randomMove = Math.floor(Math.random() * 8) + 1;
  if (randomMove == 1 && ticTacToeArray[1][2] == 0) {
    squareFilled("#1-2", 1, 2);
  } else if (randomMove == 2 && ticTacToeArray[1][3] == 0) {
    squareFilled("#1-3", 1, 3);
  } else if (randomMove == 3 && ticTacToeArray[2][3] == 0) {
    squareFilled("#2-3", 2, 3);
  } else if (randomMove == 4 && ticTacToeArray[3][3] == 0) {
    squareFilled("#3-3", 3, 3);
  } else if (randomMove == 5 && ticTacToeArray[3][2] == 0) {
    squareFilled("#3-2", 3, 2);
  } else if (randomMove == 6 && ticTacToeArray[3][1] == 0) {
    squareFilled("#3-1", 3, 1);
  } else if (randomMove == 7 && ticTacToeArray[2][1] == 0) {
    squareFilled("#2-1", 2, 1);
  } else if (randomMove == 8 && ticTacToeArray[1][1] == 0) {
    squareFilled("#1-1", 1, 1);
  } else {
    randomSpace();
  }
}

function computerMove() {
  if (ticTacToeArray[2][2] == 0) {
    squareFilled("#2-2", 2, 2);
  } else if (
    ticTacToeArray[1][1] == 1 &&
    ticTacToeArray[1][3] == 1 &&
    ticTacToeArray[1][2] == 0
  ) {
    squareFilled("#1-2", 1, 2);
  } else if (
    ticTacToeArray[1][1] == 1 &&
    ticTacToeArray[1][2] == 1 &&
    ticTacToeArray[1][3] == 0
  ) {
    squareFilled("#1-3", 1, 3);
  } else if (
    ticTacToeArray[1][2] == 1 &&
    ticTacToeArray[1][3] == 1 &&
    ticTacToeArray[1][1] == 0
  ) {
    squareFilled("#1-1", 1, 1);
  } else if (
    ticTacToeArray[2][1] == 1 &&
    ticTacToeArray[2][3] == 1 &&
    ticTacToeArray[2][2] == 0
  ) {
    squareFilled("#2-2", 2, 2);
  } else if (
    ticTacToeArray[2][1] == 1 &&
    ticTacToeArray[2][2] == 1 &&
    ticTacToeArray[2][3] == 0
  ) {
    squareFilled("#2-3", 2, 3);
  } else if (
    ticTacToeArray[2][2] == 1 &&
    ticTacToeArray[2][3] == 1 &&
    ticTacToeArray[2][1] == 0
  ) {
    squareFilled("#2-1", 2, 1);
  } else if (
    ticTacToeArray[3][1] == 1 &&
    ticTacToeArray[3][3] == 1 &&
    ticTacToeArray[3][2] == 0
  ) {
    squareFilled("#3-2", 3, 2);
  } else if (
    ticTacToeArray[3][1] == 1 &&
    ticTacToeArray[3][2] == 1 &&
    ticTacToeArray[3][3] == 0
  ) {
    squareFilled("#3-3", 3, 3);
  } else if (
    ticTacToeArray[3][2] == 1 &&
    ticTacToeArray[3][3] == 1 &&
    ticTacToeArray[3][1] == 0
  ) {
    squareFilled("#3-1", 3, 1);
  } else if (
    ticTacToeArray[1][1] == 1 &&
    ticTacToeArray[2][1] == 1 &&
    ticTacToeArray[3][1] == 0
  ) {
    squareFilled("#3-1", 3, 1);
  } else if (
    ticTacToeArray[1][1] == 1 &&
    ticTacToeArray[3][1] == 1 &&
    ticTacToeArray[2][1] == 0
  ) {
    squareFilled("#2-1", 2, 1);
  } else if (
    ticTacToeArray[3][1] == 1 &&
    ticTacToeArray[2][1] == 1 &&
    ticTacToeArray[1][1] == 0
  ) {
    squareFilled("#1-1", 1, 1);
  } else if (
    ticTacToeArray[1][2] == 1 &&
    ticTacToeArray[2][2] == 1 &&
    ticTacToeArray[3][2] == 0
  ) {
    squareFilled("#3-2", 3, 2);
  } else if (
    ticTacToeArray[1][2] == 1 &&
    ticTacToeArray[3][2] == 1 &&
    ticTacToeArray[2][2] == 0
  ) {
    squareFilled("#2-2", 2, 2);
  } else if (
    ticTacToeArray[3][2] == 1 &&
    ticTacToeArray[2][2] == 1 &&
    ticTacToeArray[1][2] == 0
  ) {
    squareFilled("#1-2", 1, 2);
  } else if (
    ticTacToeArray[1][3] == 1 &&
    ticTacToeArray[2][3] == 1 &&
    ticTacToeArray[3][3] == 0
  ) {
    squareFilled("#3-3", 3, 3);
  } else if (
    ticTacToeArray[1][3] == 1 &&
    ticTacToeArray[3][3] == 1 &&
    ticTacToeArray[2][3] == 0
  ) {
    squareFilled("#2-3", 2, 3);
  } else if (
    ticTacToeArray[3][3] == 1 &&
    ticTacToeArray[2][3] == 1 &&
    ticTacToeArray[1][3] == 0
  ) {
    squareFilled("#1-3", 1, 3);
  } else if (
    ticTacToeArray[3][3] == 1 &&
    ticTacToeArray[1][1] == 1 &&
    ticTacToeArray[2][2] == 0
  ) {
    squareFilled("#2-2", 2, 2);
  } else if (
    ticTacToeArray[3][3] == 1 &&
    ticTacToeArray[2][2] == 1 &&
    ticTacToeArray[1][1] == 0
  ) {
    squareFilled("#1-1", 1, 1);
  } else if (
    ticTacToeArray[2][2] == 1 &&
    ticTacToeArray[1][1] == 1 &&
    ticTacToeArray[3][3] == 0
  ) {
    squareFilled("#3-3", 3, 3);
  } else if (
    ticTacToeArray[1][3] == 1 &&
    ticTacToeArray[2][2] == 1 &&
    ticTacToeArray[3][1] == 0
  ) {
    squareFilled("#3-1", 3, 1);
  } else if (
    ticTacToeArray[1][3] == 1 &&
    ticTacToeArray[3][1] == 1 &&
    ticTacToeArray[2][2] == 0
  ) {
    squareFilled("#2-2", 2, 2);
  } else if (
    ticTacToeArray[2][2] == 1 &&
    ticTacToeArray[3][1] == 1 &&
    ticTacToeArray[1][3] == 0
  ) {
    squareFilled("#1-3", 1, 3);
  } else if (
    ticTacToeArray[2][1] == 1 &&
    ticTacToeArray[1][2] == 1 &&
    ticTacToeArray[1][1] == 0
  ) {
    squareFilled("#1-1", 1, 1);
  } else if (
    ticTacToeArray[2][1] == 1 &&
    ticTacToeArray[3][2] == 1 &&
    ticTacToeArray[3][1] == 0
  ) {
    squareFilled("#3-1", 3, 1);
  } else if (
    ticTacToeArray[2][3] == 1 &&
    ticTacToeArray[1][2] == 1 &&
    ticTacToeArray[1][3] == 0
  ) {
    squareFilled("#1-3", 1, 3);
  } else if (
    ticTacToeArray[2][3] == 1 &&
    ticTacToeArray[3][2] == 1 &&
    ticTacToeArray[3][3] == 0
  ) {
    squareFilled("#3-3", 3, 3);
  } else {
    randomSpace();
  }
}

$(document).ready(function () {
  $('input[name="playerCount"]').change(function () {
    reset();
    if ($('input[name="playerCount"]:checked').val() == "multiplayer") {
      $("#whichPlayer").html("Player " + playerTurn + "'s Turn");
    }
    if ($('input[name="playerCount"]:checked').val() == "singleplayer") {
      $("#whichPlayer").html("");
    }
  });
});

$(document).ready(function () {
  $("#dialogClose").click(function () {
    $("#dialog").modal("hide");
  });
});
$(document).ready(function () {
  $("#resetButton").click(function () {
    reset();
  });
});
$(document).ready(function () {
  $("#1-1").click(function () {
    squareFilled("#1-1", 1, 1);
  });
});
$(document).ready(function () {
  $("#2-1").click(function () {
    squareFilled("#2-1", 2, 1);
  });
});
$(document).ready(function () {
  $("#3-1").click(function () {
    squareFilled("#3-1", 3, 1);
  });
});
$(document).ready(function () {
  $("#1-2").click(function () {
    squareFilled("#1-2", 1, 2);
  });
});
$(document).ready(function () {
  $("#2-2").click(function () {
    squareFilled("#2-2", 2, 2);
  });
});
$(document).ready(function () {
  $("#3-2").click(function () {
    squareFilled("#3-2", 3, 2);
  });
});
$(document).ready(function () {
  $("#1-3").click(function () {
    squareFilled("#1-3", 1, 3);
  });
});
$(document).ready(function () {
  $("#2-3").click(function () {
    squareFilled("#2-3", 2, 3);
  });
});
$(document).ready(function () {
  $("#3-3").click(function () {
    squareFilled("#3-3", 3, 3);
  });
});
