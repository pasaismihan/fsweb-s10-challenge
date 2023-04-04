import { toast } from "react-toastify";
import { NOT_EKLE, NOT_SIL } from "./actions";

const s10chLocalStorageKey = "s10ch";

const baslangicDegerleri = {
  notlar: [],
};

function localStorageStateYaz(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function localStorageStateOku(key) {
  return JSON.parse(localStorage.getItem(key));
}

function baslangicNotlariniGetir(key) {
  const eskiNotlar = localStorage.getItem(key);

  if (eskiNotlar) {
    return localStorageStateOku(key);
  } else {
    return baslangicDegerleri;
  }
}

export const reducer = (state = baslangicDegerleri, action) => {
  switch (action.type) {
    case NOT_EKLE:
      localStorageStateYaz(s10chLocalStorageKey, [
        action.payload,
        ...state.notlar,
      ]);
      return {
        ...state,
        notlar: [action.payload, ...state.notlar],
      };
    case NOT_SIL:
      localStorageStateYaz(
        s10chLocalStorageKey,
        state.notlar.filter((not) => not.id !== action.payload)
      );
      return {
        ...state,
        notlar: state.notlar.filter((not) => not.id !== action.payload),
      };
    default:
      return state;
  }
};
