'use client';
import { useState } from 'react';

// ─── カテゴリ定義 ──────────────────────────
const SECTIONS = [
  "腸の基本状態","腸の基本状態","腸の基本状態","腸の基本状態","腸の基本状態",
  "食事・栄養習慣","食事・栄養習慣","食事・栄養習慣","食事・栄養習慣","食事・栄養習慣",
  "生活習慣・運動","生活習慣・運動","生活習慣・運動","生活習慣・運動","生活習慣・運動",
  "睡眠の質","睡眠の質","睡眠の質","睡眠の質","睡眠の質",
  "ストレス・メンタル","ストレス・メンタル","ストレス・メンタル","ストレス・メンタル","ストレス・メンタル",
  "体の反応・ダイエット","体の反応・ダイエット","体の反応・ダイエット","体の反応・ダイエット","体の反応・ダイエット",
];

type Scores = { gas: number; con: number; dia: number; mix: number; sev: number };

// ─── 30問（4択・科学的根拠ベース） ──────────────────────
const QUESTIONS: { q: string; choices: string[]; scores: Scores[] }[] = [

  // ═══ カテゴリ1: 腸の基本状態 (Q1〜5) ═══
  {
    q: "1週間の排便回数はどのくらいですか？",
    choices: ["週1〜2回（極端に少ない）","週3〜4回（やや少ない）","ほぼ毎日（週5〜7回）","1日に2〜3回以上（多め）"],
    scores: [{gas:0,con:4,dia:0,mix:2,sev:2},{gas:0,con:2,dia:0,mix:1,sev:1},{gas:0,con:0,dia:0,mix:0,sev:0},{gas:0,con:0,dia:2,mix:1,sev:1}],
  },
  {
    q: "便の形・硬さはどれに近いですか？",
    choices: ["硬くてコロコロ（うさぎのふんのよう）","普通のバナナ状・程よい硬さ","やわらかい・泥状のことが多い","日によって硬かったり水様だったりバラバラ"],
    scores: [{gas:0,con:4,dia:0,mix:1,sev:2},{gas:0,con:0,dia:0,mix:0,sev:0},{gas:0,con:0,dia:3,mix:1,sev:1},{gas:0,con:0,dia:1,mix:4,sev:2}],
  },
  {
    q: "食後にお腹が張る・膨らむ感覚はありますか？",
    choices: ["ほぼ毎食後に張る（強くある）","週3〜4回は張る","たまに張ることがある","ほとんど張らない"],
    scores: [{gas:4,con:0,dia:0,mix:1,sev:2},{gas:3,con:0,dia:0,mix:1,sev:1},{gas:1,con:0,dia:0,mix:0,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "お腹のガス（おなら・げっぷ）はどのくらい気になりますか？",
    choices: ["日常生活に影響するほど多い","かなり多くて気になる","少し多い気がする","特に気にならない"],
    scores: [{gas:4,con:0,dia:0,mix:1,sev:2},{gas:3,con:0,dia:0,mix:1,sev:1},{gas:1,con:0,dia:0,mix:0,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "お腹の痛み・不快感はどのくらいありますか？",
    choices: ["ほぼ毎日ある（強い）","週2〜3回ある","月数回ある","ほとんどない"],
    scores: [{gas:1,con:1,dia:3,mix:2,sev:3},{gas:1,con:1,dia:2,mix:2,sev:2},{gas:1,con:0,dia:1,mix:1,sev:1},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },

  // ═══ カテゴリ2: 食事・栄養習慣 (Q6〜10) ═══
  {
    q: "野菜・海藻・きのこ類（食物繊維）をどのくらい食べていますか？",
    choices: ["ほとんど食べない（週1回以下）","週2〜3回程度","週4〜5回は食べる","毎日意識して食べている"],
    scores: [{gas:0,con:4,dia:1,mix:3,sev:2},{gas:0,con:3,dia:0,mix:2,sev:1},{gas:0,con:1,dia:0,mix:1,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "発酵食品（納豆・味噌・ぬか漬け・キムチ・甘酒）をどのくらい食べていますか？",
    choices: ["ほとんど食べない","週1〜2回程度食べる","週3〜4回は食べる","毎日1品以上食べている"],
    scores: [{gas:0,con:3,dia:2,mix:3,sev:2},{gas:0,con:2,dia:1,mix:2,sev:1},{gas:0,con:1,dia:0,mix:1,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "小麦・パン・麺類・甘いものをどのくらい食べていますか？",
    choices: ["ほぼ毎日食べる（1日1回以上）","週4〜5回は食べる","週2〜3回程度","あまり食べない"],
    scores: [{gas:3,con:2,dia:0,mix:2,sev:2},{gas:2,con:2,dia:0,mix:1,sev:1},{gas:1,con:1,dia:0,mix:1,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "乳製品（牛乳・ヨーグルト・チーズ）を摂った後、お腹の調子が悪くなりますか？",
    choices: ["必ずお腹が張ったり下痢になる","よくなる（半分以上の確率）","たまになる","全くならない"],
    scores: [{gas:4,con:0,dia:2,mix:1,sev:2},{gas:3,con:0,dia:1,mix:1,sev:1},{gas:1,con:0,dia:0,mix:0,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "1日の水分摂取量はどのくらいですか？（水・お茶）",
    choices: ["500ml以下（ほとんど飲まない）","500ml〜1L程度","1〜1.5L程度","1.5L以上しっかり飲んでいる"],
    scores: [{gas:0,con:4,dia:0,mix:2,sev:2},{gas:0,con:3,dia:0,mix:1,sev:1},{gas:0,con:1,dia:0,mix:0,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },

  // ═══ カテゴリ3: 生活習慣・運動 (Q11〜15) ═══
  {
    q: "1日の座っている時間はどのくらいですか？",
    choices: ["ほぼ1日中座っている（8時間以上）","6〜8時間程度","4〜6時間程度","3時間以下（よく動いている）"],
    scores: [{gas:0,con:3,dia:1,mix:2,sev:2},{gas:0,con:2,dia:0,mix:1,sev:1},{gas:0,con:1,dia:0,mix:0,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "運動習慣はありますか？",
    choices: ["ほとんどしない（月数回以下）","週1回程度","週2〜3回している","週4回以上定期的にしている"],
    scores: [{gas:0,con:3,dia:1,mix:2,sev:2},{gas:0,con:2,dia:0,mix:1,sev:1},{gas:0,con:1,dia:0,mix:0,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "食事の時間は規則正しいですか？",
    choices: ["毎日バラバラ・食事を抜くことも多い","不規則なことが多い","だいたい決まった時間に食べる","毎日ほぼ同じ時間に規則正しく食べている"],
    scores: [{gas:1,con:2,dia:2,mix:4,sev:2},{gas:1,con:1,dia:1,mix:3,sev:1},{gas:0,con:0,dia:0,mix:1,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "朝食を食べていますか？",
    choices: ["ほとんど食べない","週2〜3回食べる","週4〜5回食べる","毎日食べている"],
    scores: [{gas:0,con:3,dia:1,mix:2,sev:1},{gas:0,con:2,dia:0,mix:1,sev:1},{gas:0,con:1,dia:0,mix:0,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "食後、すぐに横になったり座り続けることが多いですか？",
    choices: ["食後すぐ横になることが多い（週4回以上）","食後しばらく座ったまま（週3〜4回）","たまにある（週1〜2回）","食後は歩くなど動くようにしている"],
    scores: [{gas:2,con:2,dia:0,mix:1,sev:1},{gas:1,con:1,dia:0,mix:1,sev:1},{gas:0,con:1,dia:0,mix:0,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },

  // ═══ カテゴリ4: 睡眠の質 (Q16〜20) ═══
  {
    q: "1日の睡眠時間はどのくらいですか？",
    choices: ["5時間以下（かなり短い）","5〜6時間（やや短い）","6〜7時間程度","7〜9時間（十分に寝ている）"],
    scores: [{gas:0,con:1,dia:3,mix:3,sev:3},{gas:0,con:1,dia:2,mix:2,sev:2},{gas:0,con:0,dia:1,mix:1,sev:1},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "寝つきはどうですか？",
    choices: ["布団に入っても30分以上眠れないことが多い","なかなか眠れることが多い（15〜30分）","だいたい15分以内に眠れる","布団に入るとすぐ眠れる"],
    scores: [{gas:0,con:0,dia:3,mix:2,sev:2},{gas:0,con:0,dia:2,mix:1,sev:1},{gas:0,con:0,dia:1,mix:0,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "睡眠の途中で目が覚めることはありますか？",
    choices: ["ほぼ毎晩目が覚める","週3〜4回目が覚める","たまに目が覚める（週1〜2回）","朝まで眠れていることが多い"],
    scores: [{gas:0,con:0,dia:3,mix:2,sev:2},{gas:0,con:0,dia:2,mix:2,sev:2},{gas:0,con:0,dia:1,mix:1,sev:1},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "朝起きたとき、疲れが取れていると感じますか？",
    choices: ["毎朝疲れが残っていてだるい","疲れが取れていないことが多い","まあまあ回復していることが多い","すっきり目覚めることが多い"],
    scores: [{gas:1,con:1,dia:3,mix:2,sev:2},{gas:0,con:1,dia:2,mix:2,sev:1},{gas:0,con:0,dia:1,mix:1,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "就寝前のスマートフォン・PC使用はどのくらいですか？",
    choices: ["就寝直前まで使っている（1時間以内）","就寝30分〜1時間前まで使う","就寝1〜2時間前には使わないようにしている","就寝2時間以上前からデジタルを控えている"],
    scores: [{gas:0,con:0,dia:2,mix:2,sev:2},{gas:0,con:0,dia:1,mix:1,sev:1},{gas:0,con:0,dia:0,mix:0,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },

  // ═══ カテゴリ5: ストレス・メンタル (Q21〜25) ═══
  {
    q: "日常的なストレスレベルはどのくらいですか？",
    choices: ["常に強いストレスを感じている","ストレスが多い","ほどほどのストレスがある","あまりストレスを感じない"],
    scores: [{gas:0,con:0,dia:4,mix:3,sev:3},{gas:0,con:0,dia:3,mix:2,sev:2},{gas:0,con:0,dia:1,mix:1,sev:1},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "ストレスを感じるとお腹の調子はどうなりますか？",
    choices: ["即座にお腹が痛くなる・下痢になる","よくお腹が張ったり不快になる","たまに影響する","特に変化しない"],
    scores: [{gas:0,con:0,dia:4,mix:2,sev:3},{gas:1,con:0,dia:2,mix:2,sev:2},{gas:0,con:0,dia:1,mix:1,sev:1},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "ストレスを感じたとき、食欲はどう変化しますか？",
    choices: ["甘いもの・高カロリーなものを強く食べたくなる","食欲がなくなる","食欲が増えることも減ることもある","あまり変化しない"],
    scores: [{gas:0,con:1,dia:3,mix:1,sev:2},{gas:0,con:0,dia:2,mix:1,sev:1},{gas:0,con:0,dia:1,mix:2,sev:1},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "気分の浮き沈み・不安感はどのくらいありますか？",
    choices: ["毎日のように気分が不安定","週3〜4回は気分が落ち込む","たまにある","ほとんどない"],
    scores: [{gas:0,con:0,dia:4,mix:2,sev:2},{gas:0,con:0,dia:3,mix:2,sev:2},{gas:0,con:0,dia:1,mix:1,sev:1},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "午後になると疲れやすい・眠くなることはありますか？",
    choices: ["ほぼ毎日強い眠気・疲れがある","週3〜4回ある","週1〜2回たまにある","あまりない"],
    scores: [{gas:2,con:2,dia:2,mix:2,sev:2},{gas:1,con:1,dia:1,mix:1,sev:1},{gas:1,con:0,dia:0,mix:0,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },

  // ═══ カテゴリ6: 体の反応・ダイエット (Q26〜30) ═══
  {
    q: "食べる量を減らしても体重が落ちにくいと感じますか？",
    choices: ["強くそう思う（全然落ちない）","少しそう思う","あまり感じない","感じない"],
    scores: [{gas:2,con:3,dia:1,mix:3,sev:2},{gas:1,con:2,dia:1,mix:2,sev:1},{gas:0,con:1,dia:0,mix:1,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "朝起きたとき、顔や体のむくみが気になりますか？",
    choices: ["毎朝ひどいむくみがある","よくむくんでいる","たまにむくんでいる","ほとんどない"],
    scores: [{gas:3,con:2,dia:0,mix:2,sev:2},{gas:2,con:1,dia:0,mix:1,sev:1},{gas:1,con:0,dia:0,mix:0,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "肌荒れ・吹き出もの・くすみはどのくらいありますか？",
    choices: ["常にひどい肌荒れがある","よく肌荒れする","たまに肌荒れする","ほとんどない"],
    scores: [{gas:2,con:3,dia:2,mix:2,sev:2},{gas:1,con:2,dia:1,mix:1,sev:1},{gas:0,con:1,dia:0,mix:0,sev:0},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "これまでのダイエット経験はどれに最も近いですか？",
    choices: ["何度やってもリバウンドを繰り返している","一時的に効果が出たが続かなかった","カロリーを減らしても全然変わらなかった","特にダイエットで困ったことはない"],
    scores: [{gas:0,con:1,dia:0,mix:4,sev:2},{gas:0,con:1,dia:1,mix:2,sev:1},{gas:1,con:3,dia:1,mix:2,sev:2},{gas:0,con:0,dia:0,mix:0,sev:0}],
  },
  {
    q: "現在、最も強く感じている悩みは何ですか？",
    choices: ["食後の張り・ガスがひどく体重が落ちない","便秘がちで体が重くむくみやすい","ストレスで食欲が乱れ体重管理が難しい","体調・体重が安定せず何をしても効果が続かない"],
    scores: [{gas:4,con:0,dia:0,mix:0,sev:1},{gas:0,con:4,dia:0,mix:0,sev:1},{gas:0,con:0,dia:4,mix:0,sev:1},{gas:0,con:0,dia:0,mix:4,sev:1}],
  },
];

type ResultType = 'gas' | 'con' | 'dia' | 'mix';
type Severity = 'light' | 'medium' | 'heavy';

interface ResultData {
  icon: string; name: string; badge: string; color: string;
  sub: string; mechanism: string;
  severityDesc: Record<Severity, string>;
  weekPlan: string[];
  goodFoods: string[];
  badFoods: string[];
  demerits: {title:string;detail:string}[];
  improvements: {title:string;detail:string}[];
}

const RESULTS: Record<ResultType, ResultData> = {
  gas: {
    icon: "🫧", name: "膨らみ型", badge: "食後のガス・むくみが痩せにくさの原因",
    color: "#7C3AED",
    sub: "食後にお腹が張りやすく、ガスやむくみが気になるタイプ。\nFODMAPを多く含む食品が腸内でガスを発生させ、代謝を下げています。",
    mechanism: "腸内細菌がFODMAP（発酵性の糖質：小麦・豆類・乳製品・玉ねぎなど）を分解する際に大量のガスが発生し、お腹の張りとむくみの原因になっています。このガスの過剰産生は腸内のメタン産生菌の増加とも関連しており、腸の動きを遅くしてカロリーの過剰吸収を引き起こします。つまり「少し食べただけなのに太る」という悪循環の根本原因はここにあります。消化酵素の不足・空気の飲み込み・腸内フローラのバランス崩壊が重なって起きている状態です。",
    severityDesc: {
      light: "食後のガスや張りはあるものの、生活への影響は限定的です。食品の種類を少し見直すだけで改善が見込めます。",
      medium: "食後のガス・張りが頻繁にあり、代謝の低下が始まっています。FODMAP食品の見直しと腸内環境の改善を並行して取り組む必要があります。",
      heavy: "お腹の張り・ガス・むくみが慢性化しており、腸内フローラのバランスが大きく崩れています。段階的なアプローチが必要です。"
    },
    weekPlan: [
      "月：朝に白湯1杯＋大根おろしを昼食に追加（消化酵素補給）",
      "火：小麦製品（パン・麺類）をお米に置き換えてみる",
      "水：食後15分だけ外を歩く（腸のガスを動かすケア）",
      "木：乳製品を豆乳または無糖ライスミルクに変えてみる",
      "金：昆布・わかめ入りの味噌汁を毎食に追加する",
      "土：食事中の水分を控え（食前後30分）よく噛んで食べる",
      "日：就寝前に時計回りの腸マッサージ（5分）を実践する",
    ],
    goodFoods: ["大根おろし・生姜（消化酵素）","昆布・わかめ（水溶性食物繊維）","キウイ・パパイヤ（消化促進）","米・もち麦（低FODMAP主食）","鶏むね肉・豆腐（消化しやすいタンパク）"],
    badFoods: ["玉ねぎ・にんにく（高FODMAP）","小麦（パン・うどん・パスタ）","牛乳・ヨーグルト（乳糖）","豆類（大量摂取）","炭酸飲料・人工甘味料"],
    demerits: [
      {title:"FODMAPへの過敏反応が慢性化・悪化する", detail:"FODMAP食品への腸の過敏反応は放置すると感受性が高まり続けます。今は特定の食品でのみ張りが起きていても、次第に反応する食品の種類が増えていく傾向があります。長期化すると過敏性腸症候群（IBS）に進展するリスクが高まることが消化器系の研究で示されています。"},
      {title:"メタン産生菌の増殖で脂肪燃焼効率が著しく低下する", detail:"膨らみ型の方に特徴的なメタン産生菌（Methanobrevibacter smithii）の増加は、腸の蠕動運動を遅らせます。腸内でのカロリー吸収時間が延長し、同じ食事でも他の人より多くのカロリーが吸収されることが研究で示されています。ダイエットをしているのに痩せにくい状態が慢性化します。"},
      {title:"リーキーガット（腸漏れ）により全身性炎症が起きる", detail:"腸内での過剰なガス産生は腸壁を慢性的に刺激し「リーキーガット」の状態を引き起こします。腸壁のバリアが弱くなると毒素や未消化物が血流に流れ込み、全身性の慢性炎症・肌荒れ・疲労感・免疫機能の低下として現れます。この炎症は脂肪を溜め込む方向に体を傾けることがわかっています。"},
      {title:"コルチゾール増加による内臓脂肪の蓄積が加速する", detail:"お腹の不快感・張り・痛みが続くことで身体はストレス状態を認識し、コルチゾール（ストレスホルモン）が慢性的に分泌されます。コルチゾールは特に腹部の内臓脂肪蓄積と直接関連しており、「お腹周りが気になる」という症状を悪化させます。"},
      {title:"セロトニン不足による食欲コントロール障害が起きる", detail:"腸内環境の悪化はセロトニン（幸福ホルモン）の産生低下を招きます。セロトニンの約90%は腸で作られており、産生が低下すると脳が糖質・脂質を強く求めるようになります。「甘いものが止められない」「食後にもまた食べたくなる」というサイクルがセロトニン不足によって強化されます。"},
    ],
    improvements: [
      {title:"2週間のFODMAPリセット食から始める", detail:"高FODMAP食品（小麦・乳製品・豆類・玉ねぎ・にんにく）を2週間一時的に控えます。腸内の過剰なガス産生が落ち着き、張りと不快感が改善してきます。「禁止」ではなく「腸をリセットする短期間」として取り組みましょう。2週間後に少しずつ戻しながら自分の反応を確認することが重要です。"},
      {title:"食前に消化酵素を補充する食べ方を習慣化する", detail:"大根おろし・生姜・キウイ・パパイヤには天然の消化酵素が豊富です。食事の前後に少量摂ることで消化力が高まりガス産生が減ります。また一口30回咀嚼することで唾液に含まれるアミラーゼが活性化し、腸への負担が大幅に減ります。"},
      {title:"水溶性食物繊維を毎食取り入れて腸内フローラを整える", detail:"オクラ・昆布・わかめ・もち麦・りんご（少量）などの水溶性食物繊維は、ガス産生が少ない善玉菌のエサになります。ガスが多い不溶性食物繊維より水溶性から先に取り組むことがこのタイプの鉄則です。善玉菌が増えることで腸内環境が改善し、代謝も上がっていきます。"},
      {title:"食後15分だけ外を歩いて腸のガスを自然に排出する", detail:"食後すぐ座り続けると食べ物が腸内に滞留してガスが増えます。食後15分ほど外を歩くと腸の蠕動運動が促され、ガスが自然に排出されます。これは「ダイエットのための運動」ではなく「腸のガスを動かすケア」です。激しい動きは不要で、ゆっくり歩くだけで十分な効果があります。"},
      {title:"就寝前の腸マッサージでガスと老廃物を排出する", detail:"仰向けに寝てひざを立て、おへそを中心に時計回りに手のひらで優しく押さえるマッサージを5分間行います。腸内に溜まったガスが動き出し、翌朝の排便がスムーズになります。継続することで腸の蠕動リズムが改善し、食後の張りが減っていきます。"},
    ],
  },

  con: {
    icon: "🪨", name: "ためこみ型", badge: "老廃物のためこみが痩せにくさの原因",
    color: "#B45309",
    sub: "腸の動きが遅く、老廃物や余分な脂質をためこみやすいタイプ。\n短鎖脂肪酸が不足して脂肪燃焼のスイッチが入りにくい状態です。",
    mechanism: "腸の蠕動運動が低下し、便が腸内に長時間滞留している状態です。食物繊維と水分の不足、運動不足、座り時間の長さが重なって腸の動きを著しく鈍らせています。腸内に便が留まる時間が長くなると、本来排出されるはずの毒素や老廃物が再吸収されます。さらに、腸内の善玉菌が食物繊維を発酵させて作る「短鎖脂肪酸（酪酸・酢酸・プロピオン酸）」が不足することで、脂肪細胞への脂肪蓄積を抑制するシグナルが届かなくなります。この状態が「食べていないのに痩せない」という体の根本原因です。",
    severityDesc: {
      light: "腸の動きが少しゆっくりな状態です。水分・食物繊維の増量と軽い運動習慣で改善が見込めます。",
      medium: "腸の蠕動運動が低下しており、代謝への影響が出始めています。食事・運動・水分の3点を同時に改善する必要があります。",
      heavy: "腸の機能が大幅に低下しており、毒素の再吸収・代謝低下が慢性化しています。段階的かつ継続的なアプローチが必要です。"
    },
    weekPlan: [
      "月：起床直後に常温水200mlを飲む（胃結腸反射で排便を促す）",
      "火：昼食に水溶性食物繊維（わかめ・オクラ・昆布）を1品追加",
      "水：食後10分だけ外を歩く（腸の蠕動運動を促すケア）",
      "木：納豆か味噌汁を朝食に追加（善玉菌補充）",
      "金：1日1.5Lの水分を意識してこまめに摂る",
      "土：ごぼう・ブロッコリー・玄米など不溶性食物繊維も取り入れる",
      "日：ヨガや軽いストレッチで腸を動かす（就寝前10分）",
    ],
    goodFoods: ["昆布・わかめ・オクラ（水溶性食物繊維）","ごぼう・ブロッコリー・玄米（不溶性食物繊維）","納豆・味噌・ぬか漬け（植物性発酵食品）","バナナ・りんご（食物繊維＋水分）","ナッツ・豆腐（マグネシウム源）"],
    badFoods: ["白米・白パン（精製炭水化物）","加工食品・インスタント食品","揚げ物・脂質の多い食品","カフェインの過剰摂取","アルコール（腸粘膜を刺激）"],
    demerits: [
      {title:"有害物質が腸内で再吸収され全身に広がる", detail:"便が腸内に長時間留まると、本来排出されるはずの毒素・老廃物・腸内細菌の代謝産物（フェノール・インドールなど）が腸壁から再吸収されます。「腸肝循環」と呼ばれるこの現象は肝臓の負担を増やし、慢性疲労・肌荒れ・体臭・集中力の低下として現れます。"},
      {title:"短鎖脂肪酸の不足で脂肪が燃えにくい体になる", detail:"善玉菌が食物繊維を発酵させて作る短鎖脂肪酸（酪酸・酢酸・プロピオン酸）は、脂肪細胞への脂肪蓄積を抑制し脂肪燃焼を促すシグナルを全身に送ります。ためこみ型の方はこの短鎖脂肪酸が極端に不足しているため、どれだけ食事を减らしても脂肪が燃焼しにくい体質になっています。"},
      {title:"腸内フローラの多様性が失われ代謝が低下する", detail:"便秘が続くと悪玉菌が優位になり腸内細菌の多様性が失われます。腸内フローラの多様性が低い人ほど肥満・糖尿病リスクが高いことが大規模研究で示されています。多様性の低下は基礎代謝の低下にも直結し、「昔より太りやすくなった」という感覚の科学的な原因です。"},
      {title:"全身性の慢性炎症が脂肪燃焼を妨げる", detail:"悪玉菌が産生するLPS（リポポリサッカライド）が腸壁から血中に入り込むと全身性の慢性炎症が起きます。この炎症はインスリン感受性を低下させ、血糖値のコントロールを難しくします。慢性炎症状態では脂肪が燃えにくくなることが免疫学的研究で明らかになっています。"},
      {title:"食欲ホルモンの乱れで過食が止まらなくなる", detail:"腸内環境の悪化は食欲を抑えるレプチンの働きを弱め、食欲を高めるグレリンを過剰に分泌させます。「食べても満足できない」「食事の量が減らせない」という悩みの根本原因が腸内環境の悪化にある場合が多く、腸を整えることで自然と食欲が安定していきます。"},
    ],
    improvements: [
      {title:"朝起きてすぐのコップ1杯の水（白湯）から始める", detail:"起床直後の空腹状態で200〜250mlの常温水または白湯を飲むことで「胃結腸反射」が起き、腸の蠕動運動が始まります。これだけで朝の排便リズムが整い始めます。コーヒーや炭酸水ではなく、シンプルな水から始めることが最も効果的です。まず1週間続けることで変化を実感できます。"},
      {title:"水溶性と不溶性の食物繊維を1:2の比率で摂る", detail:"水溶性食物繊維（昆布・わかめ・オクラ・もち麦）は善玉菌のエサになり短鎖脂肪酸を産生します。不溶性食物繊維（ごぼう・玄米・ブロッコリー）は腸壁を刺激して蠕動運動を促します。この2種類を1:2の比率で摂ることが腸機能回復に最も効果的とされています。ただし水分不足のまま不溶性だけ増やすと逆効果になるため、水分補給を必ずセットで行います。"},
      {title:"植物性発酵食品で善玉菌を毎日補充する", detail:"納豆・味噌・ぬか漬けなどの植物性乳酸菌は腸への定着率が高く、腸内フローラの改善に継続的に貢献します。動物性の乳酸菌（ヨーグルト）は定着率が低いため、和の発酵食品を優先しましょう。毎日1品を取り入れることで2〜4週間後に腸内環境の変化を感じ始めます。"},
      {title:"1日1.5L以上の水分を意識的に補給する", detail:"水分不足は便を硬くし腸の動きを鈍らせる直接的な原因です。1日を通じてこまめに水を飲む習慣（一度に大量ではなく、200ml×7〜8回）を作ることが効果的です。特に起床後・食前・入浴後は意識的に飲む習慣をつけましょう。"},
      {title:"食後10分だけ歩いて腸の蠕動運動を促す", detail:"食後すぐ横になったり座り続けると腸の動きが止まります。食後10分ほど外を歩くだけで腸の蠕動運動が促進されます。これは「ダイエットのための運動」ではなく「腸を動かすためのケア」です。エレベーターを使わず階段を使う・買い物のついでに少し歩くなど、日常の中に「腸を動かす機会」を自然に取り入れるだけで十分です。"},
    ],
  },

  dia: {
    icon: "🌊", name: "敏感型", badge: "ストレスと腸の過敏が痩せにくさの原因",
    color: "#0369A1",
    sub: "ストレスが腸に直撃しやすく、腸脳軸が過敏になっているタイプ。\nセロトニン不足と慢性的なコルチゾール過剰が代謝を乱しています。",
    mechanism: "腸と脳は「腸脳軸（Gut-Brain Axis）」という神経・ホルモン・免疫のネットワークで密接につながっています。敏感型の方はこの腸脳軸が慢性的に過敏になっており、精神的なストレスが即座に腸の動きを乱します。ストレスによって自律神経（交感神経）が優位になると腸の動きが過剰になり下痢が引き起こされます。同時に腸内環境の悪化がセロトニン（腸で約90%産生）の産生を低下させ、これがさらに不安感・食欲の増加・睡眠の乱れを引き起こす悪循環を形成しています。コルチゾールの慢性的な過剰分泌が内臓脂肪を蓄積させている状態です。",
    severityDesc: {
      light: "ストレスの影響が腸に出やすい状態です。ストレスケアと食事の改善を組み合わせることで比較的早く改善が期待できます。",
      medium: "腸脳軸の過敏が進んでいます。食事改善より先にストレスケアに取り組むことが回復への近道です。",
      heavy: "腸脳軸の過敏が慢性化しており、セロトニン産生の大幅な低下が起きている可能性があります。生活習慣全体の見直しが必要です。"
    },
    weekPlan: [
      "月：4秒吸って8秒吐く深呼吸を就寝前に5分間実践する",
      "火：朝食に発酵食品（味噌汁＋納豆）を追加する",
      "水：40℃のぬるめの湯船に20分つかる（副交感神経を活性化）",
      "木：食事時間を毎日同じ時間に固定する（腸のリズム安定）",
      "金：鶏むね肉・卵・キャベツ（グルタミン源）を意識して食べる",
      "土：SNS・スマホを就寝1時間前から使わない習慣を始める",
      "日：軽いヨガ・ストレッチで副交感神経を整える（20分）",
    ],
    goodFoods: ["鶏むね肉・卵・キャベツ（グルタミン：腸粘膜修復）","味噌・納豆・ぬか漬け（少量から・植物性発酵食品）","バナナ・アボカド（トリプトファン：セロトニン前駆体）","オートミール・玄米（腸の安定に適した炭水化物）","ほうれん草・ブロッコリー（マグネシウム：神経安定）"],
    badFoods: ["カフェイン（コーヒー・エナジードリンク：腸を刺激）","アルコール（腸粘膜を損傷）","揚げ物・高脂質食（消化に負担）","冷たい飲み物・食べ物（腸の動きを乱す）","人工甘味料・添加物の多い食品"],
    demerits: [
      {title:"腸脳軸の過敏が慢性化し、あらゆるストレスに反応するようになる", detail:"腸脳軸の過敏反応は、放置すると感受性が高まり続けます。最初は強いストレス時だけ反応していたものが、軽い緊張や不安、さらには食事の刺激だけでも腸が反応するようになっていきます。この状態が進むと過敏性腸症候群（IBS）として診断されるレベルに達することがあります。"},
      {title:"セロトニン不足が食欲暴走と精神的不安定を招く", detail:"腸内環境の悪化はセロトニン産生の低下を招きます。セロトニンが不足すると脳は糖質・脂質を強く求めるようになり、「甘いものが止められない」「食後もすぐ空腹になる」という状態になります。さらにセロトニン不足は精神的な不安定・不眠・PMSの悪化にも直結します。"},
      {title:"コルチゾールの慢性的な過剰分泌で内臓脂肪が蓄積し続ける", detail:"敏感型の方はストレスに対する反応が強く、コルチゾール（ストレスホルモン）が慢性的に高い状態になりやすいです。コルチゾールは特に腹部への内臓脂肪蓄積を促進することが科学的に証明されています。「ストレスで太る」「お腹周りが気になる」という状態はこのコルチゾール過剰が原因です。"},
      {title:"腸粘膜のバリア機能が低下してリーキーガットが進行する", detail:"慢性的なストレスと腸の過敏反応は腸粘膜のバリア機能を低下させ「リーキーガット」状態を引き起こします。腸壁のバリアが破れると未消化物・毒素・細菌が血流に入り込み、全身性の炎症・アレルギー・自己免疫反応が起きやすくなります。"},
      {title:"睡眠の質が低下し腸の修復と代謝回復が妨げられる", detail:"腸脳軸の過敏とセロトニン不足は睡眠の質を著しく低下させます。腸は睡眠中に修復・再生を行いますが、睡眠が浅くなることでこの修復が不十分になります。睡眠不足はさらにコルチゾールを増加させ、腸の過敏を悪化させるという悪循環が起きます。"},
    ],
    improvements: [
      {title:"ストレスケアを食事改善より先に取り組む（副交感神経の活性化）", detail:"敏感型の場合、食事をどれだけ改善してもストレスが続く限り腸は改善しません。深呼吸法（4秒吸って8秒吐く）・40℃のぬるめの入浴・軽いヨガ・瞑想など、副交感神経を優位にする習慣を毎日1つ取り入れることが最優先です。これだけで腸脳軸の過敏反応が和らぎ始めます。"},
      {title:"グルタミン豊富な食品で傷ついた腸粘膜を修復する", detail:"グルタミンは腸粘膜の主要なエネルギー源で、損傷した腸壁の修復に不可欠なアミノ酸です。鶏むね肉・卵・キャベツ・大豆製品・白身魚に豊富に含まれています。毎日の食事に意識的に取り入れることで、腸粘膜のバリア機能が段階的に回復していきます。"},
      {title:"食事時間を毎日固定して腸のリズムを作る", detail:"敏感型の腸は予測可能なリズムが最も得意です。毎日同じ時間に食事を摂ることで腸の動きが規則化し、過敏な反応が減っていきます。特に朝食の時間を固定することで腸の一日のリズムが整います。食事時間の乱れは自律神経を乱し腸脳軸の過敏を悪化させます。"},
      {title:"セロトニンの材料（トリプトファン）を意識して摂る", detail:"セロトニンの前駆体であるトリプトファンを含む食品（バナナ・アボカド・卵・大豆・鶏肉）を朝食に取り入れることで、日中のセロトニン産生が促進されます。これにより食欲の安定・気分の向上・睡眠の質改善が期待できます。発酵食品も腸内でのセロトニン産生をサポートします。"},
      {title:"睡眠の質を改善して腸の夜間修復を最大化する", detail:"腸は主に睡眠中に修復・再生を行います。就寝1時間前のスマホ・PCをやめる・22〜23時就寝を目標にする・就寝前のカフェインとアルコールを控えるという3つの習慣から始めましょう。睡眠の質が上がることでコルチゾールが低下し、腸の過敏も徐々に落ち着いていきます。"},
    ],
  },

  mix: {
    icon: "🎲", name: "気まぐれ型", badge: "腸内フローラの多様性低下が痩せにくさの原因",
    color: "#047857",
    sub: "便秘と下痢を繰り返し、体重・体調が日によってバラつきやすいタイプ。\n腸内フローラの多様性が低下し、代謝が安定しない状態が続いています。",
    mechanism: "腸内細菌の種類（多様性）が著しく低下した状態です。腸内フローラの多様性が低下すると、食事への反応が不安定になり便秘と下痢を繰り返すようになります。この状態では腸の吸収率が日によって変動するため、同じ食事をしても体重が増えたり減ったりという不規則な変動が起きます。さらに多様性の低下は短鎖脂肪酸の産生を不安定にし、女性ホルモンの代謝にも関わる腸内細菌（エストロボロームと呼ばれる）の機能を損ないます。これがPMSの悪化・体重の周期的な変動の原因にもなっています。生活リズムの乱れ・食事の多様性不足・長期的なストレスが重なって起きている複合的な状態です。",
    severityDesc: {
      light: "腸内フローラの多様性がやや低下している状態です。食品の多様性を増やし生活リズムを整えることで比較的早期に改善が見込めます。",
      medium: "腸内フローラの多様性が中程度に低下しており、代謝の不安定さが出ています。複数のアプローチを同時に行う必要があります。",
      heavy: "腸内フローラの多様性が著しく低下しており、便秘と下痢の繰り返しが慢性化しています。腸内環境の根本的なリセットが必要です。"
    },
    weekPlan: [
      "月：朝に白湯1杯＋味噌汁を毎日の習慣にする",
      "火：主食をもち麦入りご飯に変える（水溶性・不溶性食物繊維を同時摂取）",
      "水：起床・食事・就寝時間を毎日同じ時間に固定する",
      "木：納豆・ぬか漬け・キムチなど複数の発酵食品をローテーションする",
      "金：温かいスープ・鍋など腸に優しい温かい食事を取り入れる",
      "土：週20種類以上の食材を食べることを意識する（多様性UP）",
      "日：食後15分だけ外を歩く（腸を動かすケアとして）",
    ],
    goodFoods: ["もち麦・大麦（水溶性＋不溶性食物繊維をバランスよく含む）","多様な発酵食品（納豆・味噌・ぬか漬け・キムチ・甘酒のローテーション）","多種類の野菜・海藻・きのこ（腸内細菌の多様性UP）","温かいスープ・鍋料理（腸への負担が少ない）","オリーブオイル（腸内フローラに良い脂質）"],
    badFoods: ["同じ食品の繰り返し摂取（多様性を下げる）","冷たい食べ物・飲み物（腸の動きを乱す）","加工食品・添加物の多い食品","不規則な食事時間","アルコールの過剰摂取"],
    demerits: [
      {title:"腸内フローラの多様性が失われ続け、代謝が更に不安定になる", detail:"腸内細菌の種類が減ると腸の機能が不安定になる一方です。腸内フローラの多様性が低い人ほど肥満・2型糖尿病・心疾患のリスクが高いことが大規模な疫学研究で示されています。多様性の低下は加速度的に進む傾向があるため、早期の対応が重要です。"},
      {title:"便秘と下痢の繰り返しが腸粘膜に慢性的なダメージを与える", detail:"便秘時のいきみは腸壁に物理的な圧力をかけ、下痢時の急激な腸収縮は腸粘膜を傷つけます。この繰り返しによって腸粘膜の修復が追いつかなくなり、リーキーガット状態が慢性化します。どんなに良い食事をしても栄養の吸収が不安定になります。"},
      {title:"栄養吸収の変動で体重管理が全くできなくなる", detail:"腸の状態が日によって違うため、同じ食事でも吸収されるカロリーや栄養素が大きく変動します。「昨日は食べていないのに今日は体重が増えた」という体重の不規則な変動は、この腸の吸収率の変動が原因です。食事量を管理しても体重が読めない状態が続きます。"},
      {title:"女性ホルモン代謝の乱れでPMSや体重変動が悪化する", detail:"腸内細菌の一群（エストロボローム）は女性ホルモン（エストロゲン）の代謝に直接関与しています。気まぐれ型の方はこのエストロボロームが乱れやすく、PMS症状の悪化・月経周期に連動した体重の大幅な変動・更年期症状の悪化が起きやすくなります。"},
      {title:"免疫機能の誤作動で慢性炎症が続き脂肪が燃えにくくなる", detail:"腸内フローラの多様性低下は免疫システムの誤作動を引き起こし、慢性的な低レベル炎症が全身で起きます。この慢性炎症はインスリン感受性を下げ「脂肪が燃えにくい体」を作ります。風邪を引きやすい・アレルギーが出やすいという症状もこの炎症の現れです。"},
    ],
    improvements: [
      {title:"多様な発酵食品をローテーションで毎日摂る", detail:"腸内フローラの多様性を取り戻すには、食品の多様性が最重要です。納豆・味噌・ぬか漬け・キムチ・甘酒・豆乳ヨーグルトなど、異なる種類の発酵食品を毎日ローテーションで取り入れます。同じ発酵食品だけを続けるより、様々な種類を少量ずつ摂ることで腸内細菌の種類が増えます。"},
      {title:"週20種類以上の食材を食べる「多様性ルール」を実践する", detail:"欧米の研究では週に20種類以上の食材を食べる人は腸内フローラの多様性が高く、肥満リスクが低いことが示されています。特別な食材は不要で、毎日の食事で使う野菜・主食・タンパク質の種類をなるべく変えるだけです。「週の食材リスト」を作って意識するだけで多様性が上がります。"},
      {title:"起床・食事・就寝の時間を毎日固定して腸のリズムを作る", detail:"気まぐれ型の腸の不安定さの大きな原因の一つが生活リズムの乱れです。腸は体内時計と密接に連動しており、リズムが乱れると便秘と下痢を交互に繰り返す状態が続きます。まず「起床時間を毎日同じにする」だけから始め、段階的に食事・就寝時間も固定していきます。"},
      {title:"もち麦・大麦を主食にして両方の食物繊維を同時摂取する", detail:"もち麦や大麦は水溶性食物繊維（β-グルカン：善玉菌のエサ）と不溶性食物繊維（腸の動きを促す）を同時に含む優秀な食材です。白米に少量混ぜるだけで、腸内フローラの改善と蠕動運動の促進が同時に期待できます。気まぐれ型には特に効果的な食材です。"},
      {title:"体を縦に動かすだけで腸内フローラの多様性が上がる", detail:"腸内細菌は体が動くことで刺激を受けます。激しい運動は不要で、食後に10〜15分外を歩くだけで腸の蠕動運動が活発になり、腸内細菌の多様性が高まることが研究で示されています。「運動のため」ではなく「腸を動かすケア」として、食後の散歩を生活に取り入れてみてください。"},
    ],
  },
};

// ─── スコア計算 ───────────────────────────────────
function calcResult(answers: number[]): { type: ResultType; severity: Severity; scores: Record<ResultType,number>; sevScore: number } {
  const s = { gas:0, con:0, dia:0, mix:0, sev:0 };
  QUESTIONS.forEach((q, qi) => {
    const ai = answers[qi];
    if (ai >= 0) {
      s.gas += q.scores[ai].gas;
      s.con += q.scores[ai].con;
      s.dia += q.scores[ai].dia;
      s.mix += q.scores[ai].mix;
      s.sev += q.scores[ai].sev;
    }
  });
  const mx = Math.max(s.gas, s.con, s.dia, s.mix);
  let type: ResultType = 'mix';
  if (s.gas === mx) type = 'gas';
  else if (s.con === mx) type = 'con';
  else if (s.dia === mx) type = 'dia';

  const maxSev = QUESTIONS.length * 3; // 30問 × max3
  const sevRatio = s.sev / maxSev;
  const severity: Severity = sevRatio >= 0.45 ? 'heavy' : sevRatio >= 0.22 ? 'medium' : 'light';

  return { type, severity, scores: { gas:s.gas, con:s.con, dia:s.dia, mix:s.mix }, sevScore: s.sev };
}

// ─── UI定数 ──────────────────────────────────────
type Screen = 'start' | 'question' | 'loading' | 'result';
const GREEN = '#2D6A4F';
const GREEN_MID = '#52B788';
const GREEN_LIGHT = '#B7E4C7';
const CREAM = '#F9F5EF';

const SEV_LABEL: Record<Severity,string> = { light:'軽度', medium:'中度', heavy:'重度' };
const SEV_COLOR: Record<Severity,string> = { light:'#059669', medium:'#D97706', heavy:'#DC2626' };
const SEV_BG: Record<Severity,string> = { light:'#D1FAE5', medium:'#FEF3C7', heavy:'#FEE2E2' };

const WalnutSVG = ({size=28}:{size?:number}) => (
  <svg width={size} height={size} viewBox="0 0 72 72" fill="none">
    <ellipse cx="36" cy="42" rx="24" ry="21" fill="#C8955A"/>
    <path d="M36 21C36 21 24 24 21 33C18 42 21 54 27 58" stroke="#8B5E3C" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M36 21C36 21 48 24 51 33C54 42 51 54 45 58" stroke="#8B5E3C" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    <path d="M36 21L36 58" stroke="#8B5E3C" strokeWidth="3" strokeLinecap="round"/>
    <path d="M22 38C27 35.5 33 37 36 39C39 37 45 35.5 50 38" stroke="#8B5E3C" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <ellipse cx="36" cy="19" rx="5" ry="3" fill="#7AB648"/>
    <ellipse cx="39" cy="17" rx="3" ry="2" fill="#5C8A3C"/>
  </svg>
);

// ─── メインコンポーネント ─────────────────────────
export default function Home() {
  const [screen, setScreen] = useState<Screen>('start');
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(30).fill(-1));
  const [resultData, setResultData] = useState<ReturnType<typeof calcResult> | null>(null);

  const pct = Math.round(((current + 1) / 30) * 100);

  function selectChoice(i: number) {
    const next = [...answers]; next[current] = i; setAnswers(next);
  }

  function goNext() {
    if (answers[current] === -1) return;
    if (current < 29) {
      setCurrent(c => c + 1);
      window.scrollTo({top:0,behavior:'smooth'});
    } else {
      setScreen('loading');
      const r = calcResult(answers);
      setResultData(r);
      setTimeout(() => { setScreen('result'); window.scrollTo({top:0}); }, 2200);
    }
  }

  // ═══ スタート画面 ═══
  if (screen === 'start') return (
    <div style={{minHeight:'100vh',background:CREAM,fontFamily:"'Noto Sans JP',sans-serif"}}>
      <div style={{background:GREEN,padding:'14px 16px',display:'flex',alignItems:'center',gap:12}}>
        <WalnutSVG size={32}/>
        <div><div style={{color:'white',fontWeight:700,fontSize:15}}>本格！腸内タイプ診断</div><div style={{color:'rgba(255,255,255,0.75)',fontSize:12}}>くるみの腸活ラボ</div></div>
      </div>
      <div style={{maxWidth:520,margin:'0 auto',padding:'32px 20px 60px'}}>
        <div style={{textAlign:'center',marginBottom:28}}>
          <div style={{marginBottom:16}}><WalnutSVG size={80}/></div>
          <div style={{display:'inline-block',background:'#FEF3C7',color:'#92400E',fontSize:12,fontWeight:700,padding:'4px 14px',borderRadius:99,marginBottom:12}}>プチ診断の上位版・より詳しく分析</div>
          <h1 style={{fontSize:25,fontWeight:800,color:GREEN,lineHeight:1.4,marginBottom:12}}>本格！腸内タイプ診断<br/><span style={{fontSize:18,fontWeight:600}}>〜あなたの生活習慣に合わせた改善プラン〜</span></h1>
          <p style={{fontSize:14,color:'#555',lineHeight:1.9}}>腸の状態・食事・生活習慣・睡眠・ストレスを<br/>総合的に分析し、あなた専用の改善プランをご提案します。<br/>食事制限も無理な運動も不要。<br/>腸のタイプに合った方法で自然に痩せる体質へ。</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginBottom:20}}>
          {[['📝','30問','質問数'],['⏱','約8分','所要時間'],['🔬','4タイプ×3段階','詳細判定']].map(([icon,val,label])=>(
            <div key={label} style={{background:'white',borderRadius:16,padding:'14px 8px',textAlign:'center',boxShadow:'0 2px 12px rgba(0,0,0,0.06)'}}>
              <div style={{fontSize:22,marginBottom:4}}>{icon}</div>
              <div style={{fontWeight:700,fontSize:13,color:GREEN,lineHeight:1.3}}>{val}</div>
              <div style={{fontSize:11,color:'#888',marginTop:2}}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{background:'white',borderRadius:14,padding:'14px 16px',marginBottom:16,boxShadow:'0 2px 8px rgba(0,0,0,0.05)'}}>
          <div style={{fontSize:12,fontWeight:700,color:GREEN,marginBottom:8}}>この診断でわかること</div>
          {['腸のタイプ（膨らみ・ためこみ・敏感・気まぐれ）＋重症度','あなたの生活習慣の中にある痩せにくさの根本原因','このまま続けると起こりうること（科学的根拠付き）','1週間の具体的な改善プラン','食べてよいもの・控えるべきもの一覧'].map(t=>(
            <div key={t} style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:13,color:'#333',marginBottom:6}}>
              <span style={{width:18,height:18,background:GREEN,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,color:'white',flexShrink:0,marginTop:1}}>✓</span>{t}
            </div>
          ))}
        </div>
        <div style={{background:'#FFF8E7',border:'1px solid #E9C46A',borderRadius:12,padding:'12px 16px',fontSize:13,color:'#7A5C00',lineHeight:1.7,marginBottom:24}}>
          ⚠️ この診断は医療診断ではありません。症状が重い・長引く場合は必ず医療機関にご相談ください。
        </div>
        <button onClick={()=>{setScreen('question');setCurrent(0);}} style={{width:'100%',padding:'18px',background:GREEN,color:'white',border:'none',borderRadius:14,fontSize:18,fontWeight:700,cursor:'pointer',boxShadow:'0 4px 16px rgba(44,106,79,0.35)'}}>
          本格診断をはじめる →
        </button>
      </div>
    </div>
  );

  // ═══ 質問画面 ═══
  if (screen === 'question') return (
    <div style={{minHeight:'100vh',background:CREAM,fontFamily:"'Noto Sans JP',sans-serif"}}>
      <div style={{background:'white',boxShadow:'0 1px 0 #B7E4C7',position:'sticky',top:0,zIndex:50}}>
        <div style={{background:GREEN,padding:'12px 16px',display:'flex',alignItems:'center',gap:12}}>
          <WalnutSVG size={26}/><div style={{color:'white',fontWeight:700,fontSize:14}}>本格！腸内タイプ診断</div>
        </div>
        <div style={{padding:'10px 16px 12px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#666',marginBottom:6}}>
            <span style={{fontWeight:600}}>{current+1} / 30問</span><span>{pct}%</span>
          </div>
          <div style={{height:8,background:GREEN_LIGHT,borderRadius:99,overflow:'hidden'}}>
            <div style={{height:'100%',background:GREEN,borderRadius:99,width:`${pct}%`,transition:'width 0.4s ease'}}/>
          </div>
        </div>
      </div>
      <div key={current} style={{maxWidth:520,margin:'0 auto',padding:'24px 16px 110px'}}>
        <div style={{fontSize:11,fontWeight:700,color:GREEN_MID,letterSpacing:'0.08em',marginBottom:8}}>第{current+1}問 ／ {SECTIONS[current]}</div>
        <p style={{fontSize:17,fontWeight:700,color:'#222',lineHeight:1.6,marginBottom:22}}>{QUESTIONS[current].q}</p>
        <div style={{display:'flex',flexDirection:'column',gap:11,marginBottom:20}}>
          {QUESTIONS[current].choices.map((c,i)=>{
            const sel = answers[current]===i;
            return (
              <button key={i} onClick={()=>selectChoice(i)} style={{display:'flex',alignItems:'center',gap:14,textAlign:'left',width:'100%',background:sel?'#E8F5EE':'white',border:`2px solid ${sel?GREEN:GREEN_LIGHT}`,borderRadius:14,padding:'15px 16px',fontSize:14,color:sel?GREEN:'#333',fontWeight:sel?600:400,cursor:'pointer',boxShadow:sel?`0 0 0 1px ${GREEN}`:'0 2px 8px rgba(0,0,0,0.04)',transition:'all 0.15s',minHeight:56}}>
                <span style={{width:24,height:24,borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,background:sel?GREEN:'transparent',border:`2px solid ${sel?GREEN:GREEN_LIGHT}`,color:sel?'white':'transparent'}}>✓</span>
                <span style={{lineHeight:1.5}}>{c}</span>
              </button>
            );
          })}
        </div>
        <div style={{display:'flex',gap:10,position:'fixed',bottom:0,left:0,right:0,padding:'12px 16px 20px',background:'white',boxShadow:'0 -2px 12px rgba(0,0,0,0.08)',maxWidth:520,margin:'0 auto'}}>
          <button onClick={()=>{ if(current>0){setCurrent(c=>c-1);window.scrollTo({top:0});}}} disabled={current===0} style={{flex:1,padding:'14px 0',background:'white',border:`2px solid ${current===0?'#E0E0E0':GREEN_LIGHT}`,borderRadius:12,fontSize:14,fontWeight:600,color:current===0?'#CCC':'#555',cursor:current===0?'not-allowed':'pointer'}}>← 戻る</button>
          <button onClick={goNext} disabled={answers[current]===-1} style={{flex:2,padding:'14px 0',background:answers[current]!==-1?GREEN:GREEN_LIGHT,border:'none',borderRadius:12,fontSize:14,fontWeight:700,color:'white',cursor:answers[current]!==-1?'pointer':'not-allowed'}}>
            {current===29?'結果を見る ✓':'次へ →'}
          </button>
        </div>
      </div>
    </div>
  );

  // ═══ ローディング ═══
  if (screen === 'loading') return (
    <div style={{minHeight:'100vh',background:CREAM,fontFamily:"'Noto Sans JP',sans-serif",display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{textAlign:'center'}}>
        <div style={{width:56,height:56,border:`5px solid ${GREEN_LIGHT}`,borderTopColor:GREEN,borderRadius:'50%',margin:'0 auto 16px',animation:'spin 0.8s linear infinite'}}/>
        <p style={{color:'#555',fontSize:15,fontWeight:600,marginBottom:6}}>30問の回答を分析中...</p>
        <p style={{color:'#888',fontSize:13}}>腸の状態・食事・睡眠・ストレスを総合評価しています</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );

  // ═══ 結果画面 ═══
  if (screen === 'result' && resultData) {
    const { type, severity, scores } = resultData;
    const r = RESULTS[type];
    const total = Object.values(scores).reduce((a,b)=>a+b,0)||1;
    const pcts = { gas:Math.round(scores.gas/total*100), con:Math.round(scores.con/total*100), dia:Math.round(scores.dia/total*100), mix:Math.round(scores.mix/total*100) };
    const maxPct = Math.max(...Object.values(pcts));
    const bars: [string,string,number,ResultType][] = [['🫧','膨らみ型',pcts.gas,'gas'],['🪨','ためこみ型',pcts.con,'con'],['🌊','敏感型',pcts.dia,'dia'],['🎲','気まぐれ型',pcts.mix,'mix']];
    const typeKeys: ResultType[] = ['gas','con','dia','mix'];
    const ranked = typeKeys.sort((a,b)=>scores[b]-scores[a]);
    const subType = ranked[1];
    const showSub = scores[subType] > 0 && (scores[type] - scores[subType]) < scores[type] * 0.4;

    return (
      <div style={{minHeight:'100vh',background:CREAM,fontFamily:"'Noto Sans JP',sans-serif"}}>
        <div style={{background:GREEN,padding:'14px 16px',display:'flex',alignItems:'center',gap:12}}>
          <WalnutSVG size={28}/><div style={{color:'white',fontWeight:700,fontSize:14}}>本格！腸内タイプ診断 結果</div>
        </div>
        <div style={{maxWidth:520,margin:'0 auto',padding:'20px 16px 60px'}}>

          {/* ── タイプ結果 ── */}
          <div style={{background:'white',borderRadius:20,overflow:'hidden',boxShadow:'0 4px 20px rgba(44,106,79,0.1)',marginBottom:14}}>
            <div style={{background:`linear-gradient(135deg,${GREEN} 0%,#1A4D35 100%)`,padding:'28px 20px',textAlign:'center'}}>
              <div style={{display:'inline-block',background:'rgba(255,255,255,0.2)',borderRadius:99,padding:'4px 14px',fontSize:11,fontWeight:700,color:'white',marginBottom:10}}>{r.badge}</div>
              <div style={{fontSize:58,marginBottom:10}}>{r.icon}</div>
              <h2 style={{fontSize:24,fontWeight:800,color:'white',marginBottom:8}}>あなたは「{r.name}」</h2>
              <div style={{display:'inline-flex',alignItems:'center',gap:8,marginBottom:10}}>
                <span style={{background:SEV_BG[severity],color:SEV_COLOR[severity],fontSize:13,fontWeight:800,padding:'4px 14px',borderRadius:99}}>重症度：{SEV_LABEL[severity]}</span>
                {showSub&&<span style={{background:'rgba(255,255,255,0.2)',color:'white',fontSize:12,fontWeight:700,padding:'4px 12px',borderRadius:99}}>＋{RESULTS[subType].name}傾向</span>}
              </div>
              <p style={{fontSize:13,color:'rgba(255,255,255,0.85)',lineHeight:1.7}}>{r.sub.split('\n').map((l,i)=><span key={i}>{l}<br/></span>)}</p>
            </div>
            <div style={{padding:'18px'}}>
              {/* 重症度説明 */}
              <div style={{background:SEV_BG[severity],borderRadius:12,padding:'12px 14px',marginBottom:16,borderLeft:`4px solid ${SEV_COLOR[severity]}`}}>
                <div style={{fontSize:12,fontWeight:700,color:SEV_COLOR[severity],marginBottom:4}}>{SEV_LABEL[severity]}レベルの状態</div>
                <p style={{fontSize:13,color:'#333',lineHeight:1.7,margin:0}}>{r.severityDesc[severity]}</p>
              </div>
              {/* メカニズム */}
              <div style={{fontSize:12,fontWeight:700,color:GREEN,letterSpacing:'0.06em',borderBottom:`2px solid ${GREEN_LIGHT}`,paddingBottom:8,marginBottom:12}}>なぜ痩せにくいのか｜科学的メカニズム</div>
              <p style={{fontSize:13,lineHeight:1.9,color:'#333',marginBottom:16}}>{r.mechanism}</p>
              {/* スコアバー */}
              <div style={{fontSize:12,fontWeight:700,color:GREEN,letterSpacing:'0.06em',borderBottom:`2px solid ${GREEN_LIGHT}`,paddingBottom:8,marginBottom:12}}>腸内タイプスコア</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:4}}>
                {bars.map(([icon,label,val,key])=>(
                  <div key={label} style={{display:'flex',alignItems:'center',gap:10}}>
                    <span style={{width:86,fontSize:12,flexShrink:0,fontWeight:key===type?700:400,color:key===type?GREEN:'#555'}}>{icon} {label}</span>
                    <div style={{flex:1,height:10,background:'#E8F5EE',borderRadius:99,overflow:'hidden'}}>
                      <div style={{height:'100%',background:key===type?GREEN:(showSub&&key===subType?GREEN_MID:GREEN_LIGHT),borderRadius:99,width:`${Math.round(val/maxPct*100)}%`,transition:'width 1s ease'}}/>
                    </div>
                    <span style={{fontSize:12,width:32,textAlign:'right',flexShrink:0,fontWeight:key===type?700:400,color:key===type?GREEN:'#888'}}>{val}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── デメリット5つ ── */}
          <div style={{background:'white',borderRadius:20,overflow:'hidden',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',marginBottom:14}}>
            <div style={{background:'#DC2626',padding:'14px 18px'}}>
              <div style={{fontWeight:700,fontSize:14,color:'white'}}>⚠️ このままの生活を続けると起こりうること</div>
            </div>
            <div style={{padding:'18px'}}>
              {r.demerits.map((d,i)=>(
                <div key={i}>
                  <div style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:8}}>
                    <span style={{width:24,height:24,background:'#DC2626',color:'white',borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,marginTop:1}}>{i+1}</span>
                    <span style={{fontSize:13,fontWeight:700,color:'#991B1B',lineHeight:1.5}}>{d.title}</span>
                  </div>
                  <p style={{fontSize:12,lineHeight:1.8,color:'#555',marginLeft:34,marginBottom:0}}>{d.detail}</p>
                  {i<r.demerits.length-1&&<div style={{borderTop:'1px solid #FEE2E2',margin:'14px 0'}}/>}
                </div>
              ))}
            </div>
          </div>

          {/* ── 改善方法5つ ── */}
          <div style={{background:'white',borderRadius:20,overflow:'hidden',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',marginBottom:14}}>
            <div style={{background:GREEN,padding:'14px 18px'}}>
              <div style={{fontWeight:700,fontSize:14,color:'white'}}>✅ 今の状態を改善し、痩せやすい身体を作る方法5つ</div>
            </div>
            <div style={{padding:'18px'}}>
              {r.improvements.map((imp,i)=>(
                <div key={i}>
                  <div style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:8}}>
                    <span style={{width:24,height:24,background:GREEN,color:'white',borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,marginTop:1}}>{i+1}</span>
                    <span style={{fontSize:13,fontWeight:700,color:GREEN,lineHeight:1.5}}>{imp.title}</span>
                  </div>
                  <p style={{fontSize:12,lineHeight:1.8,color:'#555',marginLeft:34,marginBottom:0}}>{imp.detail}</p>
                  {i<r.improvements.length-1&&<div style={{borderTop:`1px solid ${GREEN_LIGHT}`,margin:'14px 0'}}/>}
                </div>
              ))}
            </div>
          </div>

          {/* ── 食品ガイド ── */}
          <div style={{background:'white',borderRadius:20,overflow:'hidden',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',marginBottom:14}}>
            <div style={{background:'#0369A1',padding:'14px 18px'}}>
              <div style={{fontWeight:700,fontSize:14,color:'white'}}>🥗 {r.name}のための食品ガイド</div>
            </div>
            <div style={{padding:'18px'}}>
              <div style={{marginBottom:16}}>
                <div style={{fontSize:12,fontWeight:700,color:'#059669',marginBottom:8}}>✅ 積極的に食べたい食品</div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {r.goodFoods.map(f=>(
                    <div key={f} style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:13,color:'#333'}}>
                      <span style={{width:18,height:18,background:'#D1FAE5',color:'#059669',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,flexShrink:0,marginTop:1}}>◎</span>{f}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{borderTop:`1px solid ${GREEN_LIGHT}`,paddingTop:14}}>
                <div style={{fontSize:12,fontWeight:700,color:'#DC2626',marginBottom:8}}>❌ 当面控えたほうがよい食品</div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {r.badFoods.map(f=>(
                    <div key={f} style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:13,color:'#333'}}>
                      <span style={{width:18,height:18,background:'#FEE2E2',color:'#DC2626',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,flexShrink:0,marginTop:1}}>✕</span>{f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── 1週間プラン ── */}
          <div style={{background:'white',borderRadius:20,overflow:'hidden',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',marginBottom:14}}>
            <div style={{background:'#7C3AED',padding:'14px 18px'}}>
              <div style={{fontWeight:700,fontSize:14,color:'white'}}>📅 最初の1週間 行動プラン</div>
            </div>
            <div style={{padding:'18px'}}>
              <p style={{fontSize:12,color:'#888',marginBottom:12}}>まず1週間だけ試してみてください。腸は2〜4週間で変わり始めます。</p>
              {r.weekPlan.map((plan,i)=>(
                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:i<6?12:0}}>
                  <span style={{width:24,height:24,background:'#EDE9FE',color:'#7C3AED',borderRadius:8,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700}}>{plan.split('：')[0]}</span>
                  <span style={{fontSize:13,color:'#333',lineHeight:1.6}}>{plan.split('：')[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{textAlign:'center',marginBottom:24}}>
            <button onClick={()=>{setScreen('start');setCurrent(0);setAnswers(new Array(30).fill(-1));setResultData(null);}} style={{background:'none',border:'none',fontSize:13,color:'#999',textDecoration:'underline',cursor:'pointer'}}>
              もう一度診断する
            </button>
          </div>
          <p style={{fontSize:12,textAlign:'center',color:'#888',lineHeight:1.7}}>※ この診断は医療診断ではありません。<br/>症状が重い・長引く場合は医療機関にご相談ください。</p>
        </div>
      </div>
    );
  }
  return null;
}
