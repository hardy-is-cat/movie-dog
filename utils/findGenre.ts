import { genreNameObj } from '@/pages/api/data';

export default function findGenre(genreNum: number[]) {
  const correctGenreArr: string[] = [];
  for (let i = 0; i < genreNum.length; i++) {
    correctGenreArr.push(genreNameObj[genreNum[i]]);
  }
  return correctGenreArr;
}
