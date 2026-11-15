export type HiraganaRowId =
  | "vowels"
  | "k"
  | "s"
  | "t"
  | "n"
  | "h"
  | "m"
  | "y"
  | "r"
  | "w"
  | "nasal";

export type HiraganaCharacter = {
  readonly id: string;
  readonly kana: string;
  readonly romaji: string;
  readonly row: HiraganaRowId;
  readonly rowIndex: number;
  readonly columnIndex: number;
};

export const HIRAGANA_ROWS: readonly { readonly id: HiraganaRowId; readonly label: string }[] = [
  { id: "vowels", label: "Vowels" },
  { id: "k", label: "K row" },
  { id: "s", label: "S row" },
  { id: "t", label: "T row" },
  { id: "n", label: "N row" },
  { id: "h", label: "H row" },
  { id: "m", label: "M row" },
  { id: "y", label: "Y row" },
  { id: "r", label: "R row" },
  { id: "w", label: "W row" },
  { id: "nasal", label: "Nasal" }
];

export const HIRAGANA: readonly HiraganaCharacter[] = [
  { id: "hiragana-a", kana: "あ", romaji: "a", row: "vowels", rowIndex: 0, columnIndex: 0 },
  { id: "hiragana-i", kana: "い", romaji: "i", row: "vowels", rowIndex: 0, columnIndex: 1 },
  { id: "hiragana-u", kana: "う", romaji: "u", row: "vowels", rowIndex: 0, columnIndex: 2 },
  { id: "hiragana-e", kana: "え", romaji: "e", row: "vowels", rowIndex: 0, columnIndex: 3 },
  { id: "hiragana-o", kana: "お", romaji: "o", row: "vowels", rowIndex: 0, columnIndex: 4 },
  { id: "hiragana-ka", kana: "か", romaji: "ka", row: "k", rowIndex: 1, columnIndex: 0 },
  { id: "hiragana-ki", kana: "き", romaji: "ki", row: "k", rowIndex: 1, columnIndex: 1 },
  { id: "hiragana-ku", kana: "く", romaji: "ku", row: "k", rowIndex: 1, columnIndex: 2 },
  { id: "hiragana-ke", kana: "け", romaji: "ke", row: "k", rowIndex: 1, columnIndex: 3 },
  { id: "hiragana-ko", kana: "こ", romaji: "ko", row: "k", rowIndex: 1, columnIndex: 4 },
  { id: "hiragana-sa", kana: "さ", romaji: "sa", row: "s", rowIndex: 2, columnIndex: 0 },
  { id: "hiragana-shi", kana: "し", romaji: "shi", row: "s", rowIndex: 2, columnIndex: 1 },
  { id: "hiragana-su", kana: "す", romaji: "su", row: "s", rowIndex: 2, columnIndex: 2 },
  { id: "hiragana-se", kana: "せ", romaji: "se", row: "s", rowIndex: 2, columnIndex: 3 },
  { id: "hiragana-so", kana: "そ", romaji: "so", row: "s", rowIndex: 2, columnIndex: 4 },
  { id: "hiragana-ta", kana: "た", romaji: "ta", row: "t", rowIndex: 3, columnIndex: 0 },
  { id: "hiragana-chi", kana: "ち", romaji: "chi", row: "t", rowIndex: 3, columnIndex: 1 },
  { id: "hiragana-tsu", kana: "つ", romaji: "tsu", row: "t", rowIndex: 3, columnIndex: 2 },
  { id: "hiragana-te", kana: "て", romaji: "te", row: "t", rowIndex: 3, columnIndex: 3 },
  { id: "hiragana-to", kana: "と", romaji: "to", row: "t", rowIndex: 3, columnIndex: 4 },
  { id: "hiragana-na", kana: "な", romaji: "na", row: "n", rowIndex: 4, columnIndex: 0 },
  { id: "hiragana-ni", kana: "に", romaji: "ni", row: "n", rowIndex: 4, columnIndex: 1 },
  { id: "hiragana-nu", kana: "ぬ", romaji: "nu", row: "n", rowIndex: 4, columnIndex: 2 },
  { id: "hiragana-ne", kana: "ね", romaji: "ne", row: "n", rowIndex: 4, columnIndex: 3 },
  { id: "hiragana-no", kana: "の", romaji: "no", row: "n", rowIndex: 4, columnIndex: 4 },
  { id: "hiragana-ha", kana: "は", romaji: "ha", row: "h", rowIndex: 5, columnIndex: 0 },
  { id: "hiragana-hi", kana: "ひ", romaji: "hi", row: "h", rowIndex: 5, columnIndex: 1 },
  { id: "hiragana-fu", kana: "ふ", romaji: "fu", row: "h", rowIndex: 5, columnIndex: 2 },
  { id: "hiragana-he", kana: "へ", romaji: "he", row: "h", rowIndex: 5, columnIndex: 3 },
  { id: "hiragana-ho", kana: "ほ", romaji: "ho", row: "h", rowIndex: 5, columnIndex: 4 },
  { id: "hiragana-ma", kana: "ま", romaji: "ma", row: "m", rowIndex: 6, columnIndex: 0 },
  { id: "hiragana-mi", kana: "み", romaji: "mi", row: "m", rowIndex: 6, columnIndex: 1 },
  { id: "hiragana-mu", kana: "む", romaji: "mu", row: "m", rowIndex: 6, columnIndex: 2 },
  { id: "hiragana-me", kana: "め", romaji: "me", row: "m", rowIndex: 6, columnIndex: 3 },
  { id: "hiragana-mo", kana: "も", romaji: "mo", row: "m", rowIndex: 6, columnIndex: 4 },
  { id: "hiragana-ya", kana: "や", romaji: "ya", row: "y", rowIndex: 7, columnIndex: 0 },
  { id: "hiragana-yu", kana: "ゆ", romaji: "yu", row: "y", rowIndex: 7, columnIndex: 1 },
  { id: "hiragana-yo", kana: "よ", romaji: "yo", row: "y", rowIndex: 7, columnIndex: 2 },
  { id: "hiragana-ra", kana: "ら", romaji: "ra", row: "r", rowIndex: 8, columnIndex: 0 },
  { id: "hiragana-ri", kana: "り", romaji: "ri", row: "r", rowIndex: 8, columnIndex: 1 },
  { id: "hiragana-ru", kana: "る", romaji: "ru", row: "r", rowIndex: 8, columnIndex: 2 },
  { id: "hiragana-re", kana: "れ", romaji: "re", row: "r", rowIndex: 8, columnIndex: 3 },
  { id: "hiragana-ro", kana: "ろ", romaji: "ro", row: "r", rowIndex: 8, columnIndex: 4 },
  { id: "hiragana-wa", kana: "わ", romaji: "wa", row: "w", rowIndex: 9, columnIndex: 0 },
  { id: "hiragana-wo", kana: "を", romaji: "wo", row: "w", rowIndex: 9, columnIndex: 1 },
  { id: "hiragana-n", kana: "ん", romaji: "n", row: "nasal", rowIndex: 10, columnIndex: 0 }
] as const;
