// 診断結果のパターンのデータが取得できる
// 名前を入力すると診断結果が出力される関数
// 入力が同じ名前なら、同じ診断結果を出力する処理
// 診断結果の文章のうち名前の部分を、入力された名前に置き換える処理

'use strict'; //宣言後の記述ミスをエラーとして表示してくれる機能を呼び出すための記述
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

// 無名関数
assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if(userName.length === 0){
    // 名前が空の時は処理を終了する=>ガード句
    return;
  }
  console.log(userName);
  // 診断結果表示エリアの作成
  resultDivision.innerText='';
  const headerDivision = document.createElement('div');
  headerDivision.setAttribute('class', 'card-header text-bg-primary');
  headerDivision.innerText = '診断結果';

  // bodyDivisionの作成
  const bodyDivision = document.createElement('div');
  bodyDivision.setAttribute('class', 'card-body');

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'card-text');
  const result = assessment(userName);
  paragraph.innerText = result;
  bodyDivision.appendChild(paragraph);

  // resultDivisionにBootstrapのスタイルを適用する
  resultDivision.setAttribute('class', 'card');

  // headerDivisionとbodyDivisionをresultDivisionに差し込む
  resultDivision.appendChild(headerDivision);
  resultDivision.appendChild(bodyDivision);
  
  // ツイートエリアの作成
  tweetDivision.innerText = '';
  const anchor = document.createElement('a');
  const hrefValue =
  'https://twitter.com/intent/tweet?button_hashtag='+
  encodeURIComponent('あなたのいいところ') +
  '&ref_src=twsrc%5Etfw';

  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #あなたのいいところ';

  tweetDivision.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivision.appendChild(script);
};

userNameInput.onkeydown = event => {
  if(event.key === 'Enter'){
    assessmentButton.onclick();
  }
};

const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはその全てです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];



// インターフェース（関数の内部の処理と、外部からの入力や外部への出力（ここでは引数と戻り値）を定義している「内外の境界」のこと）
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

// ロジック（ソフトウェアの動きを決める処理）
// １．名前の全ての文字のコード番号の整数値を足す
// ２．足した結果を、診断結果のパターンの数で割った余りを取得する
// ３．余りを診断結果の配列の添え字として、診断結果の文字列を取得する

function assessment(userName){
  // 全文字のコード番号を取得して、足し合わせる
  let sumOfCharCode = 0;
  for ( let i = 0; i < userName.length; i++){
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('###userName###', userName);
  return result;
}

// テストコード
console.assert (
  assessment('太郎')===
  '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
  '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);


// 解説

// const => 一度代入すると再代入できません（変数の値を後から変更できません）。これを定数といいます。
// et と const の使い分けはどのようにしていけばよいでしょうか？
// JavaScript の開発では、次の指針で変数宣言の方法を決めるのがよいでしょう！
// １．const の使用を検討します。
// ２．変数の値を変更する必要がある場合のみ、let を使用します。
// ※なお、特別な理由がない限り、var は使用しないようにしましょう。

// @param は関数の「引数」。 userName は「引数の名前」。 @return は関数の「戻り値」。

// replaceALL()関数
// '何かしらの文字列や文章'.replaceAll('置き換える前の文字列', '置き換えた後の文字列');
// のように使用し、第1引数の文字列を全て第2引数の文字列に変換します。

// 無名関数
// 無名関数 は名前を持たない関数の記述法
// assessmentButton.onclick = function(){};
