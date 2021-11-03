"use strict";

const $ = (id) => {
  return document.getElementById(id);
};

// -------- Selecting all Necessary Elements --------
// Card Elements
const card = document.querySelector(".card-inner");
const cardFrontFace = document.querySelector(".card-face-front");
let cardTopNumber = $("topNumber");
let cardBottomNumber = $("bottomNumber");
let cardLogo = $("logo");

const flipBtn = document.getElementById("flipButton");
// Buttons
const hiBtn = $("highButton");
const loBtn = $("lowButton");
const redBtn = $("redButton");
const blackBtn = $("blackButton");
const numbersBtn = $("numbersButton");
const facesBtn = $("facesButton");
const kingAceBtn = $("kingAceButton");
const aceBtn = $("aceButton");
const jokerBtn = $("jokerButton");

const addBalanceBtn = $("addBalance");
// Bets placed on buttons
const hiBetPlaced = document.querySelector(".hi-bet-placed");
const loBetPlaced = document.querySelector(".lo-bet-placed");
const redBetPlaced = document.querySelector(".red-bet-placed");
const blackBetPlaced = document.querySelector(".black-bet-placed");
const numbersBetPlaced = document.querySelector(".numbers-bet-placed");
const facesBetPlaced = document.querySelector(".faces-bet-placed");
const kingAceBetPlaced = document.querySelector(".king-ace-bet-placed");
const aceBetPlaced = document.querySelector(".ace-bet-placed");
const jokerBetPlaced = document.querySelector(".joker-bet-placed");
// Hi Lo Button Ranges
const loLowNumber = document.querySelector(".lo-low-number");
const loHighNumber = document.querySelector(".lo-high-number");
const hiLowNumber = document.querySelector(".hi-low-number");
const hiHighNumber = document.querySelector(".hi-high-number");
const hiMultiplier = $("hiMultiplier");
const loMultiplier = $("loMultiplier");
// Other Elements to select
const betsPlacedTable = $("betsPlacedTable");
const statusMessage = $("status");
// Other Variables needed
const cardPossibilities = [
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  "J",
  "Q",
  "K",
  "A",
  "Joker",
];
let balance = Number($("balance").textContent);
let actualBet;
let optionsBetOn = 0;
let generatedCardColor;
let generatedCardValue;
let generatedCardIndex;
let previousGeneratedCardIndex;

let firstBetOption = true;
let betHi = false;
let betLo = false;
let betRed = false;
let betBlack = false;
let betNumbers = false;
let betFaces = false;
let betKA = false;
let betA = false;
let betJoker = false;

const workingStatusMessage = "Working.";
const errorStatusMessage = "Error. Invalid Bet or Insufficient Funds!";

// -------- Functions --------
// Add Balance button
addBalanceBtn.addEventListener("click", () => {
  let amountToAdd = Number(prompt("How much balance would you like to add?"));
  updateBalanceWinAmount(amountToAdd);
});

// Flip Button Function
flipBtn.addEventListener("click", () => {
  card.classList.toggle("is-flipped");
  flipBtn.disabled = true;
  disableAllButtons();

  setTimeout(resetAllValues, 4000);
  setTimeout(checkNumberOfOptionsBetOn, 1500);
});

// Reset All Values Function
const resetAllValues = () => {
  card.classList.toggle("is-flipped");
  enableAllButtons();
  clearBetsOnButtons();

  // Reset Bets Placed Table
  for (let i = numberOfBetsInTable; i >= 1; i--) {
    betsPlacedTable.deleteRow(i);
  }
  numberOfBetsInTable = 0;

  numberOfOptionsBetOn = 0;

  firstBetOption = true;
  displayPreviousCard();
  resetCardColor();
  sortHiLoRangesAndMultipliers();
  previousGeneratedCardIndex = generatedCardIndex;
  console.log("-----------------------------");
};

let betOption;
let numberOfOptionsBetOn = 0;

// Hi Button Function (betOption = 1)
hiBtn.addEventListener("click", () => {
  let bet = Number($("userBet").value);
  betOption = 1;
  numberOfOptionsBetOn++;
  betHi = true;
  if (isBetValid(bet)) {
    actualBet = bet;
    console.log("Bet: " + actualBet);
    flipBtn.disabled = false;
    updateBalanceBetAmount(actualBet);
    displayBetInTable(actualBet, betOption);
    hiBetPlaced.textContent = "€" + actualBet;
    if (firstBetOption) {
      firstBetOption = false;
      cardValueAndColorGenerator();
    }
  } else {
    console.log("Invalid Bet");
    invalidBetHandler();
  }
});

// Lo Button Function (betOption = 2)
loBtn.addEventListener("click", () => {
  let bet = Number($("userBet").value);
  betOption = 2;
  numberOfOptionsBetOn++;
  betLo = true;
  if (isBetValid(bet)) {
    actualBet = bet;
    console.log("Bet: " + actualBet);
    flipBtn.disabled = false;
    updateBalanceBetAmount(actualBet);
    displayBetInTable(actualBet, betOption);
    loBetPlaced.textContent = "€" + actualBet;
    if (firstBetOption) {
      firstBetOption = false;
      cardValueAndColorGenerator();
    }
  } else {
    console.log("Invalid Bet");
    invalidBetHandler();
  }
});

// Red Button Function (betOption = 3)
redBtn.addEventListener("click", () => {
  let bet = Number($("userBet").value);
  betOption = 3;
  numberOfOptionsBetOn++;
  betRed = true;
  if (isBetValid(bet)) {
    actualBet = bet;
    console.log("Bet: " + actualBet);
    flipBtn.disabled = false;
    updateBalanceBetAmount(actualBet);
    displayBetInTable(actualBet, betOption);
    redBetPlaced.textContent = "€" + actualBet;
    if (firstBetOption) {
      firstBetOption = false;
      cardValueAndColorGenerator();
    }
  } else {
    console.log("Invalid Bet");
    invalidBetHandler();
  }
});

// Black Button Function (betOption = 4)
blackBtn.addEventListener("click", () => {
  let bet = Number($("userBet").value);
  betOption = 4;
  numberOfOptionsBetOn++;
  betBlack = true;
  if (isBetValid(bet)) {
    actualBet = bet;
    console.log("Bet: " + actualBet);
    flipBtn.disabled = false;
    updateBalanceBetAmount(actualBet);
    displayBetInTable(actualBet, betOption);
    blackBetPlaced.textContent = "€" + actualBet;
    if (firstBetOption) {
      firstBetOption = false;
      cardValueAndColorGenerator();
    }
  } else {
    console.log("Invalid Bet");
    invalidBetHandler();
  }
});

// 2 - 10 Button Function (betOption = 5)
numbersBtn.addEventListener("click", () => {
  let bet = Number($("userBet").value);
  betOption = 5;
  numberOfOptionsBetOn++;
  betNumbers = true;
  if (isBetValid(bet)) {
    actualBet = bet;
    console.log("Bet: " + actualBet);
    flipBtn.disabled = false;
    updateBalanceBetAmount(actualBet);
    displayBetInTable(actualBet, betOption);
    numbersBetPlaced.textContent = "€" + actualBet;
    if (firstBetOption) {
      firstBetOption = false;
      cardValueAndColorGenerator();
    }
  } else {
    console.log("Invalid Bet");
    invalidBetHandler();
  }
});

// J, Q, K, A Button Function (betOption = 6)
facesBtn.addEventListener("click", () => {
  let bet = Number($("userBet").value);
  betOption = 6;
  numberOfOptionsBetOn++;
  betFaces = true;
  if (isBetValid(bet)) {
    actualBet = bet;
    console.log("Bet: " + actualBet);
    flipBtn.disabled = false;
    updateBalanceBetAmount(actualBet);
    displayBetInTable(actualBet, betOption);
    facesBetPlaced.textContent = "€" + actualBet;
    if (firstBetOption) {
      firstBetOption = false;
      cardValueAndColorGenerator();
    }
  } else {
    console.log("Invalid Bet");
    invalidBetHandler();
  }
});

// K, A Button Function (betOption = 7)
kingAceBtn.addEventListener("click", () => {
  let bet = Number($("userBet").value);
  betOption = 7;
  numberOfOptionsBetOn++;
  betKA = true;
  if (isBetValid(bet)) {
    actualBet = bet;
    console.log("Bet: " + actualBet);
    flipBtn.disabled = false;
    updateBalanceBetAmount(actualBet);
    displayBetInTable(actualBet, betOption);
    kingAceBetPlaced.textContent = "€" + actualBet;
    if (firstBetOption) {
      firstBetOption = false;
      cardValueAndColorGenerator();
    }
  } else {
    console.log("Invalid Bet");
    invalidBetHandler();
  }
});

// A Button Function (betOption = 8)
aceBtn.addEventListener("click", () => {
  let bet = Number($("userBet").value);
  betOption = 8;
  numberOfOptionsBetOn++;
  betA = true;
  if (isBetValid(bet)) {
    actualBet = bet;
    console.log("Bet: " + actualBet);
    flipBtn.disabled = false;
    updateBalanceBetAmount(actualBet);
    displayBetInTable(actualBet, betOption);
    aceBetPlaced.textContent = "€" + actualBet;
    if (firstBetOption) {
      firstBetOption = false;
      cardValueAndColorGenerator();
    }
  } else {
    console.log("Invalid Bet");
    invalidBetHandler();
  }
});

// Joker Button Function (betOption = 9)
jokerBtn.addEventListener("click", () => {
  let bet = Number($("userBet").value);
  betOption = 9;
  numberOfOptionsBetOn++;
  betJoker = true;
  if (isBetValid(bet)) {
    actualBet = bet;
    console.log("Bet: " + actualBet);
    flipBtn.disabled = false;
    updateBalanceBetAmount(actualBet);
    displayBetInTable(actualBet, betOption);
    jokerBetPlaced.textContent = "€" + actualBet;
    if (firstBetOption) {
      firstBetOption = false;
      cardValueAndColorGenerator();
    }
  } else {
    console.log("Invalid Bet");
    invalidBetHandler();
  }
});

// Update the bets placed table once the totalWin has been calculated
const updateBetsInTable = (actualBet, totalWin, betOption) => {
  // Remove Rows already in table
  if (numberOfBetsInTable === 1) {
    for (let i = numberOfBetsInTable; i >= 1; i--) {
      betsPlacedTable.deleteRow(i);
    }
  } else if (numberOfBetsInTable === 2) {
    for (let i = numberOfBetsInTable - 1; i >= 1; i--) {
      betsPlacedTable.deleteRow(i);
    }
  } else if (numberOfBetsInTable === 3) {
    for (let i = numberOfBetsInTable - 2; i >= 1; i--) {
      betsPlacedTable.deleteRow(i);
    }
  } else if (numberOfBetsInTable === 4) {
    for (let i = numberOfBetsInTable - 3; i >= 1; i--) {
      betsPlacedTable.deleteRow(i);
    }
  }
  let betCell, amountCell, outcomeCell;
  if (totalWin === 0) {
    outcomeCell = '<td class="red">-€' + actualBet + "</td>";
  } else {
    outcomeCell = '<td class="green">+€' + totalWin + "</td>";
  }

  amountCell = "<td>" + actualBet + "</td>";
  switch (betOption) {
    case 1:
      betCell = "<td>Hi</td>";
      break;
    case 2:
      betCell = "<td>Lo</td>";
      break;
    case 3:
      betCell = "<td>Red</td>";
      break;
    case 4:
      betCell = "<td>Black</td>";
      break;
    case 5:
      betCell = "<td>2 - 10</td>";
      break;
    case 6:
      betCell = "<td>J, Q, K, A</td>";
      break;
    case 7:
      betCell = "<td>K, A</td>";
      break;
    case 8:
      betCell = "<td>A</td>";
      break;
    case 9:
      betCell = "<td>Joker</td>";
      break;
  }
  betsPlacedTable.innerHTML +=
    "<tr>" + betCell + amountCell + outcomeCell + "</tr>";
};

let numberOfBetsInTable = 0;
// Display the bets in the bets placed table - ONLY THE BET AND AMOUNT IS DISPLAYED AT FIRST
const displayBetInTable = (actualBet, betOption) => {
  let betCell, amountCell, outcomeCell;
  numberOfBetsInTable++;
  amountCell = "<td>" + actualBet + "</td>";
  outcomeCell = "<td></td>";
  switch (betOption) {
    case 1:
      betCell = "<td>Hi</td>";
      break;
    case 2:
      betCell = "<td>Lo</td>";
      break;
    case 3:
      betCell = "<td>Red</td>";
      break;
    case 4:
      betCell = "<td>Black</td>";
      break;
    case 5:
      betCell = "<td>2 - 10</td>";
      break;
    case 6:
      betCell = "<td>J, Q, K, A</td>";
      break;
    case 7:
      betCell = "<td>K, A</td>";
      break;
    case 8:
      betCell = "<td>A</td>";
      break;
    case 9:
      betCell = "<td>Joker</td>";
      break;
  }
  betsPlacedTable.innerHTML +=
    "<tr>" + betCell + amountCell + outcomeCell + "</tr>";
};

let totalWin;
// Checks whether the player has won or lost
const checkWin = (actualBet, optionNumber) => {
  switch (optionNumber) {
    // Hi
    case 1:
      if (generatedCardIndex > previousGeneratedCardIndex) {
        totalWin = actualBet * hiMultiplierValue;
        console.log(
          `Hi Total Win: ${totalWin}. (${actualBet} * ${hiMultiplierValue})`
        );
        updateBalanceWinAmount(totalWin);
        updateBetsInTable(actualBet, totalWin, 1);
      } else {
        totalWin = 0;
        console.log(`Hi Total Loss: ${actualBet}`);
        updateBetsInTable(actualBet, totalWin, 1);
      }
      break;
    // Lo
    case 2:
      if (generatedCardIndex < previousGeneratedCardIndex) {
        totalWin = actualBet * loMultiplierValue;
        console.log(
          `Lo Total Win: ${totalWin}, (${actualBet} * ${loMultiplierValue})`
        );
        updateBalanceWinAmount(totalWin);
        updateBetsInTable(actualBet, totalWin, 2);
      } else {
        totalWin = 0;
        console.log(`Lo Total Loss: ${actualBet}`);
        updateBetsInTable(actualBet, totalWin, 2);
      }
      break;
    // Red
    case 3:
      if (generatedCardColor === 0 && generatedCardIndex !== 13) {
        totalWin = actualBet * 2;
        console.log("Red Total Win: " + totalWin + ". (" + actualBet + " * 2)");
        updateBalanceWinAmount(totalWin);
        updateBetsInTable(actualBet, totalWin, 3);
      } else {
        totalWin = 0;
        console.log("Red Total Loss: " + actualBet);
        updateBetsInTable(actualBet, totalWin, 3);
      }
      break;
    // Black
    case 4:
      if (generatedCardColor === 1 && generatedCardIndex !== 13) {
        totalWin = actualBet * 2;
        console.log(`Black Total Win: ${totalWin}. (${actualBet} * 2)`);
        updateBalanceWinAmount(totalWin);
        updateBetsInTable(actualBet, totalWin, 4);
      } else {
        totalWin = 0;
        console.log(`Black Total Loss: ${actualBet}`);
        updateBetsInTable(actualBet, totalWin, 4);
      }
      break;
    // 2 - 10
    case 5:
      for (let i = 0; i <= 8; i++) {
        if (cardPossibilities[i] === generatedCardValue) {
          totalWin = actualBet * 1.5;
          console.log(`2 - 10 Total Win: ${totalWin}. (${actualBet} * 1.5)`);
          updateBalanceWinAmount(totalWin);
          updateBetsInTable(actualBet, totalWin, 5);
          break;
        } else {
          if (i === 8) {
            totalWin = 0;
            console.log(`2 - 10 Total Loss: ${actualBet}`);
            updateBetsInTable(actualBet, totalWin, 5);
          }
        }
      }
      break;
    // J, Q, K, A
    case 6:
      for (let i = 9; i <= 12; i++) {
        if (cardPossibilities[i] === generatedCardValue) {
          totalWin = actualBet * 3;
          console.log(`J, Q, K, A Total Win: ${totalWin}. (${actualBet} * 3)`);
          updateBalanceWinAmount(totalWin);
          updateBetsInTable(actualBet, totalWin, 6);
          break;
        } else {
          if (i === 12) {
            totalWin = 0;
            console.log(`J, Q, K, A Total Loss: ${actualBet}`);
            updateBetsInTable(actualBet, totalWin, 6);
          }
        }
      }
      break;
    // K, A
    case 7:
      if (generatedCardValue === "K" || generatedCardValue === "A") {
        totalWin = actualBet * 6;
        console.log(`K, A Total Win: ${totalWin}. (${actualBet} * 6)`);
        updateBalanceWinAmount(totalWin);
        updateBetsInTable(actualBet, totalWin, 7);
      } else {
        totalWin = 0;
        console.log(`K, A Total Loss: ${actualBet}`);
        updateBetsInTable(actualBet, totalWin, 7);
      }
      break;
    // A
    case 8:
      if (generatedCardValue === "A") {
        totalWin = actualBet * 12;
        console.log(`A Total Win: ${totalWin}. (${actualBet} * 12)`);
        updateBalanceWinAmount(totalWin);
        updateBetsInTable(actualBet, totalWin, 8);
      } else {
        totalWin = 0;
        console.log(`A Total Loss: ${actualBet}`);
        updateBetsInTable(actualBet, totalWin, 8);
      }
      break;
    // Joker
    case 9:
      if (generatedCardValue === "Joker") {
        totalWin = actualBet * 24;
        console.log(`Joker Total Win: ${totalWin}. (${actualBet} * 24)`);
        updateBalanceWinAmount(totalWin);
        updateBetsInTable(actualBet, totalWin, 9);
      } else {
        totalWin = 0;
        console.log(`Joker Total Loss: ${actualBet}`);
        updateBetsInTable(actualBet, totalWin, 9);
      }
      break;
  }
};

let optionNumber;
// Handles multiple bets being placed on different buttons
const checkNumberOfOptionsBetOn = () => {
  for (let i = 0; i < numberOfOptionsBetOn; i++) {
    if (betHi) {
      betHi = false;
      optionNumber = 1;
      checkWin(actualBet, optionNumber);
    } else if (betLo) {
      betLo = false;
      optionNumber = 2;
      checkWin(actualBet, optionNumber);
    } else if (betRed) {
      betRed = false;
      optionNumber = 3;
      checkWin(actualBet, optionNumber);
    } else if (betBlack) {
      betBlack = false;
      optionNumber = 4;
      checkWin(actualBet, optionNumber);
    } else if (betNumbers) {
      betNumbers = false;
      optionNumber = 5;
      checkWin(actualBet, optionNumber);
    } else if (betFaces) {
      betFaces = false;
      optionNumber = 6;
      checkWin(actualBet, optionNumber);
    } else if (betKA) {
      betKA = false;
      optionNumber = 7;
      checkWin(actualBet, optionNumber);
    } else if (betA) {
      betA = false;
      optionNumber = 8;
      checkWin(actualBet, optionNumber);
    } else if (betJoker) {
      betJoker = false;
      optionNumber = 9;
      checkWin(actualBet, optionNumber);
    }
  }
};

let hiMultiplierValue;
let loMultiplierValue;
// Sort the ranges and multipliers of the hi and lo buttons depending on the previous card flipped
const sortHiLoRangesAndMultipliers = () => {
  // Hi and Lo Ranges
  // 2
  if (generatedCardIndex === 0) {
    hiLowNumber.textContent = cardPossibilities[generatedCardIndex + 1];
    hiHighNumber.textContent = cardPossibilities[cardPossibilities.length - 2];

    loBtn.disabled = true;
  }
  // A
  else if (generatedCardIndex === 12) {
    hiBtn.disabled = true;

    loLowNumber.textContent = cardPossibilities[1];
    loHighNumber.textContent = cardPossibilities[cardPossibilities.length - 2];
  }
  // Joker
  else if (generatedCardIndex === 13) {
    // hiLowNumber.textContent = cardPossibilities[5];
    // hiHighNumber.textContent = cardPossibilities[cardPossibilities.length - 2];
    hiBtn.disabled = true;

    // loLowNumber.textContent = cardPossibilities[0];
    // loHighNumber.textContent = cardPossibilities[generatedCardIndex - 1];
    loBtn.disabled = true;
  }
  // 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K
  else {
    // Hi Range
    hiLowNumber.textContent = cardPossibilities[generatedCardIndex + 1];
    hiHighNumber.textContent = cardPossibilities[cardPossibilities.length - 2];

    loLowNumber.textContent = cardPossibilities[0];
    loHighNumber.textContent = cardPossibilities[generatedCardIndex - 1];
  }

  // Hi and Lo Multipliers
  switch (generatedCardIndex) {
    case 0:
      loMultiplierValue = "-";
      hiMultiplierValue = 1.09;
      displayHiLoMultipliers(loMultiplierValue, hiMultiplierValue);
      break;
    case 1:
      loMultiplierValue = 12;
      hiMultiplierValue = 1.2;
      displayHiLoMultipliers(loMultiplierValue, hiMultiplierValue);
      break;
    case 2:
      loMultiplierValue = 6;
      hiMultiplierValue = 1.33;
      displayHiLoMultipliers(loMultiplierValue, hiMultiplierValue);
      break;
    case 3:
      loMultiplierValue = 4;
      hiMultiplierValue = 1.5;
      displayHiLoMultipliers(loMultiplierValue, hiMultiplierValue);
      break;
    case 4:
      loMultiplierValue = 3;
      hiMultiplierValue = 1.71;
      displayHiLoMultipliers(loMultiplierValue, hiMultiplierValue);
      break;
    case 5:
      loMultiplierValue = 2.4;
      hiMultiplierValue = 2;
      displayHiLoMultipliers(loMultiplierValue, hiMultiplierValue);
      break;
    case 6:
      loMultiplierValue = 2;
      hiMultiplierValue = 2.4;
      displayHiLoMultipliers(loMultiplierValue, hiMultiplierValue);
      break;
    case 7:
      loMultiplierValue = 1.71;
      hiMultiplierValue = 3;
      displayHiLoMultipliers(loMultiplierValue, hiMultiplierValue);
      break;
    case 8:
      loMultiplierValue = 1.71;
      hiMultiplierValue = 3;
      displayHiLoMultipliers(loMultiplierValue, hiMultiplierValue);
      break;
    case 9:
      loMultiplierValue = 1.5;
      hiMultiplierValue = 4;
      displayHiLoMultipliers(loMultiplierValue, hiMultiplierValue);
      break;
    case 10:
      loMultiplierValue = 1.33;
      hiMultiplierValue = 6;
      displayHiLoMultipliers(loMultiplierValue, hiMultiplierValue);
      break;
    case 11:
      loMultiplierValue = 1.2;
      hiMultiplierValue = 12;
      displayHiLoMultipliers(loMultiplierValue, hiMultiplierValue);
      break;
    case 12:
      loMultiplierValue = 1.09;
      hiMultiplierValue = "-";
      displayHiLoMultipliers(loMultiplierValue, hiMultiplierValue);
      break;
    // case 13:
    //   loMultiplierValue;
    //   hiMultiplierValue;
    //   displayHiLoMultipliers(loMultiplierValue, hiMultiplierValue);
    //   break;
  }
};
const displayHiLoMultipliers = (loMultiplierValue, hiMultiplierValue) => {
  loMultiplier.textContent = loMultiplierValue + "x";
  hiMultiplier.textContent = hiMultiplierValue + "x";
};

let numberOfCards = 0;
let previousCardContainer = document.querySelector(".previous-card-container");
// Display Previous Cards Function
const displayPreviousCard = () => {
  if (numberOfCards !== 10) {
    numberOfCards++;
  } else {
    previousCardContainer.lastElementChild.remove();
  }
  if (generatedCardValue === "Joker") {
    previousCardContainer.insertAdjacentHTML(
      "afterbegin",
      '<div class="card-container-joker"> <span class="card-value-joker">' +
        generatedCardValue +
        "</span></div>"
    );
  } else {
    if (generatedCardColor === 0) {
      previousCardContainer.insertAdjacentHTML(
        "afterbegin",
        '<div class="card-container-single"> <span class="card-value-single red-card">' +
          generatedCardValue +
          "</span></div>"
      );
    } else {
      previousCardContainer.insertAdjacentHTML(
        "afterbegin",
        '<div class="card-container-single"> <span class="card-value-single black-card">' +
          generatedCardValue +
          "</span></div>"
      );
    }
  }
};

// Card Value & Color Generator
const cardValueAndColorGenerator = () => {
  generatedCardIndex = randomCardValueGenerator();
  generatedCardValue = cardPossibilities[generatedCardIndex];
  console.log("Card Index: " + generatedCardIndex);
  console.log("Card Value: " + generatedCardValue);

  // Joker
  if (generatedCardIndex === 13) {
    cardTopNumber.textContent = "";
    cardBottomNumber.textContent = "";
    cardLogo.classList.add("white-logo");
    cardLogo.textContent = "Joker";
    cardFrontFace.classList.add("joker-card");
  }
  // 2- 9
  else {
    cardTopNumber.textContent = generatedCardValue;
    cardBottomNumber.textContent = generatedCardValue;

    generatedCardColor = randomCardColorGenerator();
    if (generatedCardColor === 0) {
      cardTopNumber.classList.add("red-card");
      cardBottomNumber.classList.add("red-card");
      cardLogo.classList.add("red-card");
      console.log("Card Color: Red");
    } else {
      cardTopNumber.classList.add("black-card");
      cardBottomNumber.classList.add("black-card");
      cardLogo.classList.add("black-card");
      console.log("Card Color: Black");
    }
  }
};
// Bet Validator Functino
const isBetValid = (userBet) => {
  if (isNaN(userBet) || userBet <= 0 || balance <= 0 || balance < userBet) {
    return false;
  } else {
    return true;
  }
};
// Invalid Bet Handler Function
const invalidBetHandler = () => {
  statusMessage.classList.remove("status-message-normal");
  statusMessage.classList.add("status-message-error");
  statusMessage.textContent = errorStatusMessage;
  disableAllButtons();

  setTimeout(() => {
    statusMessage.classList.add("status-message-normal");
    statusMessage.classList.remove("status-message-error");
    statusMessage.textContent = workingStatusMessage;
    enableAllButtons();
    $("userBet").value = "";
  }, 3000);
};
// Disable All Buttons Function
const disableAllButtons = () => {
  hiBtn.disabled = true;
  loBtn.disabled = true;
  redBtn.disabled = true;
  blackBtn.disabled = true;
  numbersBtn.disabled = true;
  facesBtn.disabled = true;
  kingAceBtn.disabled = true;
  aceBtn.disabled = true;
  jokerBtn.disabled = true;
};
// Enable All Buttons Function
const enableAllButtons = () => {
  hiBtn.disabled = false;
  loBtn.disabled = false;
  redBtn.disabled = false;
  blackBtn.disabled = false;
  numbersBtn.disabled = false;
  facesBtn.disabled = false;
  kingAceBtn.disabled = false;
  aceBtn.disabled = false;
  jokerBtn.disabled = false;
};
// Update Balance Function. Subtract the bet placed from the balance
const updateBalanceBetAmount = (amount) => {
  balance -= amount;
  $("balance").textContent = balance;
};
// Update Balance Function. Add the total win to the balance
const updateBalanceWinAmount = (totalWin) => {
  balance += totalWin;
  $("balance").textContent = balance;
};
// Random Color Generator. Returns random number between 0 and 1 (0 => Red, 1 => Black)
const randomCardColorGenerator = () => {
  return Math.trunc(Math.random() * (1 - 0 + 1) + 0);
};
// Random Card Value Generator. Returns random number between 0 and cardPossibilities.length
const randomCardValueGenerator = () => {
  return Math.trunc(Math.random() * cardPossibilities.length);
  // return Math.trunc(Math.random() * (13 - 12 + 1) + 12);
};
// Remove the bets placed on the buttons
const clearBetsOnButtons = () => {
  hiBetPlaced.textContent = "";
  loBetPlaced.textContent = "";
  redBetPlaced.textContent = "";
  blackBetPlaced.textContent = "";
  numbersBetPlaced.textContent = "";
  facesBetPlaced.textContent = "";
  kingAceBetPlaced.textContent = "";
  aceBetPlaced.textContent = "";
  jokerBetPlaced.textContent = "";
};
// Reset the card color and value
const resetCardColor = () => {
  cardLogo.classList.remove("red-card");
  cardLogo.classList.remove("black-card");
  cardBottomNumber.classList.remove("red-card");
  cardBottomNumber.classList.remove("black-card");
  cardTopNumber.classList.remove("red-card");
  cardTopNumber.classList.remove("black-card");
  cardBottomNumber.textContent = "";
  cardTopNumber.textContent = "";
  cardLogo.textContent = "LR";
  cardLogo.classList.remove("white-logo");
  cardFrontFace.classList.remove("joker-card");
};
