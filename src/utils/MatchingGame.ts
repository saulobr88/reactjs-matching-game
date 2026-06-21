import type Input from '@/interfaces/Input'
import type Result from '@/interfaces/Result'

export function calculateDifferenceInDays(dt1: Date|string, dt2: Date|string): number {
    let date1: Date;
    let date2: Date;

    if (typeof dt1 === 'string') { date1 = new Date(dt1) } else { date1 = dt1 }
    if (typeof dt2 === 'string') { date2 = new Date(dt2) } else { date2 = dt2 }
    
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}

// Ref.: https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/string/levenshtein-distance
export function calculateLevenshteinDistance(a: string, b: string): number {
    const distanceMatrix = Array(b.length + 1).fill(null).map(() => Array(a.length + 1).fill(null));
  
    for (let i = 0; i <= a.length; i += 1) {
      distanceMatrix[0][i] = i;
    }
  
    for (let j = 0; j <= b.length; j += 1) {
      distanceMatrix[j][0] = j;
    }
  
    for (let j = 1; j <= b.length; j += 1) {
      for (let i = 1; i <= a.length; i += 1) {
        const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
        distanceMatrix[j][i] = Math.min(
          distanceMatrix[j][i - 1] + 1, // deletion
          distanceMatrix[j - 1][i] + 1, // insertion
          distanceMatrix[j - 1][i - 1] + indicator, // substitution
        );
      }
    }
  
    return distanceMatrix[b.length][a.length];
}


// JS solution
/*
export function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}
*/

// TS Solution
export function round(num: number, fractionDigits: number): number {
    return Number(num.toFixed(fractionDigits));
}

export function calculateScore(diffD: number, levenshtein: number): number {
    let sum;
    let divisor;

    if (diffD > levenshtein) {
        sum = diffD;
        if (levenshtein === 0) {
            divisor = 1;
        } else {
            divisor = levenshtein;
        }
    } else {
        sum = levenshtein;
        if (diffD === 0) {
            divisor = 1;
        } else {
            divisor = diffD;
        }
    }

    const divisao = sum / divisor;
    let score = divisao;

    while (score > 100) {
        if (divisor < 2) {
          divisor = 2;
        }
        score = score / divisor;
    }
    // FINAL SCORE
    score = round(score, 2);
    const porcent = 100.00 - score;

    return porcent;
}

export default function MatchingGame (input: Input): Result {
  const { firstFullName, firstBirthDate, secondFullName, secondBirthDate } = input;

  const levenstainDistance = calculateLevenshteinDistance(firstFullName, secondFullName);
  const diferenceInDays = calculateDifferenceInDays(firstBirthDate, secondBirthDate);
  const scoreGlobal = calculateScore(diferenceInDays, levenstainDistance);

  return {
    scoreGlobal,
    levenstainDistance,
    diferenceInDays,
    loading: false,
    hasResult: true
  };
}