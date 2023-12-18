import { numberColumns, tableSize  } from '../constants.js'

export const getLocalStorage = (nombreItem, parse) => {
  const itemLocalStorage = window.localStorage.getItem(nombreItem);
  return parse ? JSON.parse(itemLocalStorage) : itemLocalStorage;
}

export const checkEndGame = (boardToCheck) => {
  return boardToCheck.every((square) => square != null)
}

export const checkWinnerFrom = (boardToCheck) => {
  let columnasCount = 0;
  let columna = 0;

  for (let i = 0; i < tableSize; i += numberColumns) {
    columna = i - columnasCount; 
    columnasCount += 2;

    // Filas
    if (boardToCheck[i] == boardToCheck[i+1] && boardToCheck[i] == boardToCheck[i+2]) {
          if (boardToCheck[i] != null) return boardToCheck[i]
    }
    // Columnas
    if (boardToCheck[columna] == boardToCheck[columna+3] && boardToCheck[columna] == boardToCheck[columna+6]) {
      if (boardToCheck[columna] != null) return boardToCheck[columna]
    }

    // Diagonales
    if (i % 2) continue;

    if (boardToCheck[i] == boardToCheck[4] && boardToCheck[i] == boardToCheck[8-i] ){
      return boardToCheck[i]
    }
  }
}