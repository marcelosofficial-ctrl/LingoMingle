import { KATAKANA, type KatakanaCharacter } from "./katakana";
import type { HiraganaRowId } from "./hiragana";
export type KatakanaQuestion={prompt:KatakanaCharacter;choices:readonly KatakanaCharacter[];correctRomaji:string;questionIndex:number;roundLength:number};
export type KatakanaAttempt={character:KatakanaCharacter;correct:boolean};
const same=(a:KatakanaCharacter,b:KatakanaCharacter)=>a.id===b.id&&a.kana===b.kana&&a.romaji===b.romaji&&a.row===b.row&&a.rowIndex===b.rowIndex&&a.columnIndex===b.columnIndex;
export function buildKatakanaQuestion(row:HiraganaRowId,index:number,characters:readonly KatakanaCharacter[]=KATAKANA,retry?:readonly KatakanaCharacter[]):KatakanaQuestion{
 const all=characters.filter(c=>c.row===row);if(all.length<2)throw Error("A practice row must contain at least two characters.");if(!Number.isInteger(index)||index<0)throw Error("Question index must be a non-negative integer.");
 const byId=new Map(all.map(c=>[c.id,c]));const pool=retry??all;if(!pool.length||new Set(pool.map(c=>c.id)).size!==pool.length)throw Error("Retry characters must be unique members of the selected row.");
 const prompts=pool.map(c=>{const canonical=byId.get(c.id);if(!canonical||!same(c,canonical))throw Error("Retry characters must match canonical members of the selected row.");return canonical;});
 const prompt=prompts[index%prompts.length]!,count=Math.min(4,all.length);let choices:KatakanaCharacter[];
 if(retry!==undefined&&prompts.length<all.length)choices=[prompt,...all.filter(c=>c.id!==prompt.id).slice(0,count-1)];
 else{const ordered=Array.from({length:count},(_,i)=>all[(index+i)%all.length]!);const r=index%count;choices=[...ordered.slice(r),...ordered.slice(0,r)];}
 return {prompt,choices,correctRomaji:prompt.romaji,questionIndex:index,roundLength:prompts.length};
}
export const isCorrectKatakanaAnswer=(q:KatakanaQuestion,a:string)=>a===q.correctRomaji;
export function getNextKatakanaQuestionIndex(i:number,n:number):number|null{if(!Number.isInteger(i)||!Number.isInteger(n)||i<0||n<1)throw Error("Round progress values must be valid non-negative integers.");return i+1<n?i+1:null;}
export function buildKatakanaPracticeResult(attempts:readonly KatakanaAttempt[]){const map=new Map(KATAKANA.map(c=>[c.id,c]));const missed=new Map<string,KatakanaCharacter>();let correct=0;for(const a of attempts){if(typeof a.correct!=="boolean")throw Error("Practice attempts must contain a boolean result.");const c=map.get(a.character.id);if(!c||!same(a.character,c))throw Error("Practice attempts must reference canonical katakana characters.");if(a.correct)correct++;else if(!missed.has(c.id))missed.set(c.id,c);}return {correct,total:attempts.length,missedCharacters:[...missed.values()]};}
export function getKatakanaRetryCharacters(missed:readonly KatakanaCharacter[],fresh:readonly KatakanaCharacter[]){const map=new Map(KATAKANA.map(c=>[c.id,c]));const unique=new Map<string,KatakanaCharacter>();for(const item of (missed.length?missed:fresh)){const c=map.get(item.id);if(!c||!same(item,c))throw Error("Retry selection must use canonical katakana characters.");if(!unique.has(c.id))unique.set(c.id,c);}return [...unique.values()];}
