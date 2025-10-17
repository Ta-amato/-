'use strict';

// HTMLの要素をJavaScriptで操作できるようにする
const form = document.getElementById('mood-form');
const userNameInput = document.getElementById('user-name');
const resultDivision = document.getElementById('result-area');
const lineDivision = document.getElementById('line-share-area');

// 機嫌の候補
const moods = [
  '最高にハッピー！',
  'ちょっと眠いかも……',
  'やる気120％！',
  '今日は穏やかな気分。',
  'ツンツン気味。',
  'ちょっぴりブルー。',
  '落ち着いて行動できそう。',
  '誰かに優しくできる日。',
  '集中力が上がる日！',
  '笑顔があふれる一日。'
];

// アドバイスの候補
const adviceList = [
  '深呼吸をして心を整えよう。',
  '友達に感謝を伝えてみよう。',
  '好きな音楽で気分転換を！',
  '寝る前にストレッチをしてみて。',
  '甘いものを少しだけ楽しもう。',
  '新しいことに挑戦してみよう。',
  'のんびり過ごすのも悪くない。',
  '人に優しく、自分にも優しく。'
];

/* 機嫌の決定ロジック（機嫌を一つ返す関数を作成）
例: userName = "たろう", date = 2025年10月12日

date.toISOString()
→ "2025-10-12T00:00:00.000Z" (国際標準形式)

.split('T')[0]
→ "2025-10-12" (日付部分だけ取り出す)

userName + "2025-10-12"
→ "たろう2025-10-12"

base.charCodeAt(i): i番目の文字の数値コード

%10
→必ず0〜9の範囲に収まる
→ 配列の範囲内(0〜9)の番号が得られる
 */

function getMood(userName, date) {
  const base = userName + date.toISOString().split('T')[0]; // 名前＋日付
  let sum = 0;
  for (let i = 0; i < base.length; i++) {
    sum += base.charCodeAt(i);
  }
  const index = sum % moods.length;
  return moods[index];
}

// アドバイスの決定ロジック（アドバイスを一つ返す関数を作成）
function getAdvice(userName, date) {
  const base = userName + 'advice' + date.toISOString().split('T')[0];
  let sum = 0;
  for (let i = 0; i < base.length; i++) {
    sum += base.charCodeAt(i) * (i + 1);  //　計算方法機嫌の時とは変えて、ランダム性を加える
  }
  const index = sum % adviceList.length;
  return adviceList[index];
}

// イベント処理
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const userName = userNameInput.value.trim();

  // 入力チェック（0-20文字にしないとアラートを出す）
  if (userName.length === 0) {
    alert('名前を入力してください。');
    return;
  }
  if (userName.length > 20) {
    alert('名前は20文字以内で入力してください。');
    return;
  }

  const today = new Date();
  const mood = getMood(userName, today);
  const advice = getAdvice(userName, today);

  // 結果表示エリアの初期化
  resultDivision.innerText = '';
  resultDivision.setAttribute('class', 'card mt-3 shadow-sm');

  // header
  const headerDivision = document.createElement('div');
  headerDivision.setAttribute('class', 'card-header bg-info text-white fw-bold');
  headerDivision.innerText = `${userName}さんの今日の結果`;

  // body
  const bodyDivision = document.createElement('div');
  bodyDivision.setAttribute('class', 'card-body');
  const moodP = document.createElement('p');
  moodP.setAttribute('class', 'card-text fs-5');
  moodP.innerText = `🌤 機嫌：${mood}`;
  const adviceP = document.createElement('p');
  adviceP.setAttribute('class', 'card-text mt-2');
  adviceP.innerText = `💡 アドバイス：${advice}`;

  bodyDivision.appendChild(moodP);
  bodyDivision.appendChild(adviceP);

  resultDivision.appendChild(headerDivision);
  resultDivision.appendChild(bodyDivision);

  // LINE共有ボタン
  lineDivision.innerText = '';
  const lineBtn = document.createElement('a');
  const lineURL = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent('https://example.com')}&text=${encodeURIComponent(`${userName}さんの今日の機嫌は「${mood}」。アドバイス：「${advice}」`)}`;
  lineBtn.setAttribute('href', lineURL);
  lineBtn.setAttribute('class', 'btn btn-success mt-3');
  lineBtn.setAttribute('target', '_blank');
  lineBtn.innerText = 'LINEでシェアする';
  lineDivision.appendChild(lineBtn);
});
