'use client'

import { useState } from 'react'

const LINE_URL = 'https://lin.ee/XXXXXXX'
const NOTE_URL = 'https://note.com/XXXXXXX'

type QuestionType = {
  id: number
  text: string
  category: string
}

const questions = [
  { id: 1, text: '便秘（3日以上排便がない）が週に1回以上ありますか？', category: 'tamekoml' },
  { id: 2, text: '食後にお腹が張る・膨らむ感じがしますか？', category: 'fukurami' },
  { id: 3, text: 'ストレスを感じるとお腹の調子が悪くなりますか？', category: 'binkan' },
  { id: 4, text: '便秘と下痢を交互に繰り返すことがありますか？', category: 'kimagure' },
  { id: 5, text: 'お腹にガスが溜まりやすいですか？', category: 'fukurami' },
  { id: 6, text: '排便時に強くいきまないと出ないことがありますか？', category: 'tamekoml' },
  { id: 7, text: '緊張したり不安になるとお腹が痛くなりますか？', category: 'binkan' },
  { id: 8, text: '急に下痢になることがありますか？', category: 'kimagure' },
  { id: 9, text: '食後30分〜2時間でお腹が張りますか？', category: 'fukurami' },
  { id: 10, text: '便が硬くてコロコロしていることが多いですか？', category: 'tamekoml' },
  { id: 11, text: '腸の動きを意識的に感じることがありますか？', category: 'binkan' },
  { id: 12, text: '同じ食事でもお腹の状態が日によって全く違いますか？', category: 'kimagure' },
  { id: 13, text: 'げっぷやおならが多い方ですか？', category: 'fukurami' },
  { id: 14, text: '水分をたくさん摂っても便秘になりますか？', category: 'tamekoml' },
  { id: 15, text: '食品の種類によって腸の反応が敏感に変わりますか？', category: 'binkan' },
  { id: 16, text: '下痢と便秘のどちらが来るか予測できないことがありますか？', category: 'kimagure' },
  { id: 17, text: '炭酸飲料や豆類を食べると特にお腹が張りますか？', category: 'fukurami' },
  { id: 18, text: '排便した後もスッキリしない感じがありますか？', category: 'tamekoml' },
  { id: 19, text: '睡眠不足や疲れがたまるとお腹の調子が崩れますか？', category: 'binkan' },
  { id: 20, text: '旅行先や環境が変わると便の状態が変わりますか？', category: 'kimagure' },
  { id: 21, text: 'お腹の張りで服が締め付けられると感じることがありますか？', category: 'fukurami' },
  { id: 22, text: '週に3回未満しか排便がないことがありますか？', category: 'tamekoml' },
  { id: 23, text: '特定の食べ物でお腹が過敏に反応しますか？', category: 'binkan' },
  { id: 24, text: 'お腹の調子が良い日と悪い日の差が激しいですか？', category: 'kimagure' },
  { id: 25, text: '腸内に空気が溜まっている感覚がありますか？', category: 'fukurami' },
  { id: 26, text: '運動不足が続いても便秘になりやすいですか？', category: 'tamekoml' },
  { id: 27, text: '精神的なプレッシャーでお腹が痛くなることがありますか？', category: 'binkan' },
  { id: 28, text: '腸の不調が生活リズムによって変わると感じますか？', category: 'kimagure' },
  { id: 29, text: '食事後すぐにお腹が不快になることがありますか？', category: 'fukurami' },
  { id: 30, text: '腸の調子を改善しようと様々なことを試していますか？', category: 'tamekoml' },
]
const typeInfo = {
  fukurami: {
    name: '膨らみ型', emoji: '🎈',
    description: '食後にお腹が張る・ガスが溜まりやすいタイプです。',
    mechanism: '腸内での発酵・ガス産生が過剰になっています。食物繊維の摂り方や食べる速度が影響します。',
    symptoms: ['食後のお腹の張り', 'げっぷ・おなら過多', '腹部膨満感', '服が締め付けられる感覚'],
    goodFoods: ['生姜', 'フェンネル', 'ペパーミントティー', '消化酵素が豊富な食品'],
    badFoods: ['豆類', '炭酸飲料', 'キャベツ・ブロッコリー', 'りんご・梨'],
    steps: ['食事はゆっくりよく噛む（1口20回以上）', '食後15分のウォーキングを習慣に', '腸活ヨガで腸のガス排出を促す'],
    color: 'orange',
  },
  tamekoml: {
    name: 'ためこみ型', emoji: '🪨',
    description: '便秘・排便困難が続くタイプです。腸の動きが全体的に遅くなっています。',
    mechanism: '大腸の蠕動運動が低下しており、便が長時間腸内に留まることで水分が過剰に吸収されます。',
    symptoms: ['3日以上の便秘', '硬いコロコロ便', '排便時のいきみ', '残便感'],
    goodFoods: ['プルーン・干しいも', '水溶性食物繊維（オートミール）', 'オリーブオイル', '発酵食品'],
    badFoods: ['精製炭水化物（白米・白いパン）', 'チーズ・バナナ（過剰摂取）', 'カフェイン過多', '加工食品'],
    steps: ['毎朝コップ1杯の白湯を飲む', '1日8000歩以上歩く', '腸マッサージ（の字マッサージ）を毎晩行う'],
    color: 'stone',
  },
  binkan: {
    name: '敏感型', emoji: '⚡',
    description: 'ストレスや緊張でお腹が過敏になるタイプです。',
    mechanism: '脳腸相関が過剰に反応しており、ストレスホルモンが腸の動きに直接影響を与えています。',
    symptoms: ['ストレスでの腹痛', '食べ物への過敏反応', '緊張時の下痢', '腸の動きを感じやすい'],
    goodFoods: ['バナナ・大豆（トリプトファン）', 'ナッツ類（マグネシウム）', '発酵食品', 'ハーブティー'],
    badFoods: ['カフェイン・アルコール', '辛い食べ物', '脂っこい食事', '食品添加物を多く含む加工食品'],
    steps: ['腹式呼吸を1日3回（5分ずつ）実践する', '就寝前のリラックスルーティンを作る', 'FODMAP食事法を試してみる'],
    color: 'blue',
  },
  kimagure: {
    name: '気まぐれ型', emoji: '🎭',
    description: '便秘と下痢を繰り返す、腸の状態が安定しないタイプです。',
    mechanism: '腸の蠕動運動のリズムが乱れており、過剰な動きと不足が交互に起こります。',
    symptoms: ['便秘と下痢の交互', '症状の予測困難', '環境変化での悪化', '日による大きな差'],
    goodFoods: ['白米（消化に優しい）', 'バナナ', '豆腐・白身魚', '温かいスープ類'],
    badFoods: ['生野菜・生果物の大量摂取', '冷たい飲み物', '脂っこい食事', 'アルコール'],
    steps: ['毎日同じ時間に食事・起床・就寝する', '腸のリズムを記録する', '体を冷やさないようにする（腹巻き・温め）'],
    color: 'purple',
  },
}
export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [started, setStarted] = useState(false)

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value }
    setAnswers(newAnswers)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const calculateResult = () => {
    const scores = { fukurami: 0, tamekoml: 0, binkan: 0, kimagure: 0 }
    questions.forEach(q => {
      const answer = answers[q.id] || 0
      scores[q.category] += answer
    })
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
    return { main: sorted[0][0], sub: sorted[1][0], scores }
  }

  const getLevel = (score, max) => {
    const ratio = score / max
    if (ratio >= 0.7) return { level: '重度', color: '#dc2626', width: '90%' }
    if (ratio >= 0.4) return { level: '中度', color: '#d97706', width: '60%' }
    return { level: '軽度', color: '#16a34a', width: '30%' }
  }

  const colorMap = {
    orange: { bg: '#fff7ed', border: '#fb923c', text: '#c2410c', grad: 'linear-gradient(135deg, #fb923c, #fbbf24)' },
    stone:  { bg: '#fafaf9', border: '#a8a29e', text: '#57534e', grad: 'linear-gradient(135deg, #78716c, #d97706)' },
    blue:   { bg: '#eff6ff', border: '#60a5fa', text: '#1d4ed8', grad: 'linear-gradient(135deg, #60a5fa, #67e8f9)' },
    purple: { bg: '#faf5ff', border: '#c084fc', text: '#7e22ce', grad: 'linear-gradient(135deg, #c084fc, #f9a8d4)' },
  }

  const gradMain = 'linear-gradient(135deg, #14b8a6, #10b981)'

  if (!started) {
    return React.createElement('main', {
      style: { minHeight: '100vh', background: 'linear-gradient(to bottom, #ecfdf5, #ccfbf1)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }
    }, React.createElement('div', {
      style: { background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '32px', maxWidth: '400px', width: '100%', textAlign: 'center' }
    },
      React.createElement('div', { style: { fontSize: '64px', marginBottom: '16px' } }, '🌿'),
      React.createElement('h1', { style: { fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' } }, '腸内タイプ本格診断'),
      React.createElement('p', { style: { color: '#0d9488', fontWeight: '600', marginBottom: '16px' } }, 'くるみ｜腸からやせる研究所'),
      React.createElement('div', { style: { background: '#f0fdfa', borderRadius: '16px', padding: '16px', marginBottom: '24px', textAlign: 'left' } },
        ['✅ 30問・約8分で完了', '✅ Rome IV基準をベースに設計', '✅ 4タイプ＋重症度で詳しく判定', '✅ あなた専用の改善プランをお届け'].map((t, i) =>
          React.createElement('p', { key: i, style: { fontSize: '14px', color: '#374151', marginBottom: '8px' } }, t)
        )
      ),
      React.createElement('button', {
        onClick: () => setStarted(true),
        style: { width: '100%', background: gradMain, color: 'white', fontWeight: 'bold', padding: '16px', borderRadius: '16px', fontSize: '18px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(20,184,166,0.4)' }
      }, '診断をはじめる →')
    ))
  }

  if (showResult) {
    const result = calculateResult()
    const mainType = typeInfo[result.main]
    const subType = typeInfo[result.sub]
    const colors = colorMap[mainType.color]
    const questionsForType = questions.filter(q => q.category === result.main).length
    const mainScore = result.scores[result.main]
    const levelInfo = getLevel(mainScore, questionsForType * 2)

    return React.createElement('main', {
      style: { minHeight: '100vh', background: 'linear-gradient(to bottom, #ecfdf5, #ccfbf1)', padding: '16px' }
    }, React.createElement('div', { style: { maxWidth: '400px', margin: '0 auto', paddingTop: '32px', paddingBottom: '32px' } },
      React.createElement('div', {
        style: { background: colors.grad, borderRadius: '24px', padding: '24px', color: 'white', textAlign: 'center', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', marginBottom: '16px' }
      },
        React.createElement('div', { style: { fontSize: '56px', marginBottom: '8px' } }, mainType.emoji),
        React.createElement('p', { style: { fontSize: '14px', opacity: 0.9, marginBottom: '4px' } }, 'あなたの腸内タイプは'),
        React.createElement('h2', { style: { fontSize: '32px', fontWeight: 'bold', margin: '0' } }, mainType.name),
        React.createElement('p', { style: { fontSize: '13px', opacity: 0.8, marginTop: '8px' } }, 'サブタイプ：' + subType.name + ' ' + subType.emoji)
      ),
      React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' } },
        React.createElement('h3', { style: { fontWeight: 'bold', color: '#374151', marginBottom: '12px', marginTop: 0 } }, '重症度'),
        React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
          React.createElement('div', { style: { flex: 1, background: '#f3f4f6', borderRadius: '9999px', height: '12px' } },
            React.createElement('div', { style: { background: 'linear-gradient(to right, #4ade80, #ef4444)', height: '12px', borderRadius: '9999px', width: levelInfo.width } })
          ),
          React.createElement('span', { style: { fontWeight: 'bold', color: levelInfo.color } }, levelInfo.level)
        )
      ),
      React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px', borderLeft: '4px solid ' + colors.border, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' } },
        React.createElement('h3', { style: { fontWeight: 'bold', color: '#374151', marginBottom: '8px', marginTop: 0 } }, 'あなたのタイプについて'),
        React.createElement('p', { style: { color: '#4b5563', fontSize: '14px', marginBottom: '12px' } }, mainType.description),
        React.createElement('p', { style: { color: '#6b7280', fontSize: '13px', margin: 0 } }, mainType.mechanism)
      ),
      React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' } },
        React.createElement('h3', { style: { fontWeight: 'bold', color: '#374151', marginBottom: '12px', marginTop: 0 } }, '主な症状チェック'),
        mainType.symptoms.map((s, i) =>
          React.createElement('div', { key: i, style: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '14px', color: '#4b5563' } },
            React.createElement('span', { style: { color: '#14b8a6' } }, '✓'), s
          )
        )
      ),
      React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' } },
        React.createElement('h3', { style: { fontWeight: 'bold', color: '#374151', marginBottom: '12px', marginTop: 0 } }, '🚀 今すぐできる改善3ステップ'),
        mainType.steps.map((step, i) =>
          React.createElement('div', { key: i, style: { display: 'flex', gap: '12px', marginBottom: '12px', fontSize: '14px', color: '#4b5563' } },
            React.createElement('span', { style: { background: '#ccfbf1', color: '#0d9488', fontWeight: 'bold', borderRadius: '9999px', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '12px' } }, i + 1),
            step
          )
        )
      ),
      React.createElement('div', { style: { background: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' } },
        React.createElement('h3', { style: { fontWeight: 'bold', color: '#374151', marginBottom: '12px', marginTop: 0 } }, '🥗 食品ガイド'),
        React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' } },
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: '12px', fontWeight: 'bold', color: '#16a34a', marginBottom: '8px', marginTop: 0 } }, '✅ 積極的に食べたい'),
            mainType.goodFoods.map((f, i) => React.createElement('p', { key: i, style: { fontSize: '12px', color: '#4b5563', padding: '4px 0', borderBottom: '1px solid #f9fafb', margin: 0 } }, f))
          ),
          React.createElement('div', null,
            React.createElement('p', { style: { fontSize: '12px', fontWeight: 'bold', color: '#dc2626', marginBottom: '8px', marginTop: 0 } }, '⚠️ 控えたい食品'),
            mainType.badFoods.map((f, i) => React.createElement('p', { key: i, style: { fontSize: '12px', color: '#4b5563', padding: '4px 0', borderBottom: '1px solid #f9fafb', margin: 0 } }, f))
          )
        )
      ),
      React.createElement('a', {
        href: LINE_URL,
        style: { display: 'block', background: 'linear-gradient(135deg, #4ade80, #14b8a6)', borderRadius: '16px', padding: '20px', marginBottom: '12px', textAlign: 'center', textDecoration: 'none', color: 'white' }
      },
        React.createElement('p', { style: { fontWeight: 'bold', marginBottom: '4px', marginTop: 0 } }, '📄 詳しい結果をPDFで受け取る'),
        React.createElement('p', { style: { fontSize: '13px', opacity: 0.9, marginBottom: '12px', marginTop: 0 } }, 'LINE友だち追加で無料プレゼント！'),
        React.createElement('span', { style: { background: 'white', color: '#0d9488', fontWeight: 'bold', padding: '12px 24px', borderRadius: '12px', display: 'inline-block' } }, 'LINEで受け取る')
      ),
      React.createElement('a', {
        href: NOTE_URL,
        style: { display: 'block', background: 'linear-gradient(135deg, #c084fc, #f9a8d4)', borderRadius: '16px', padding: '20px', marginBottom: '12px', textAlign: 'center', textDecoration: 'none', color: 'white' }
      },
        React.createElement('p', { style: { fontWeight: 'bold', marginBottom: '4px', marginTop: 0 } }, '📖 腸内環境改善プログラム'),
        React.createElement('p', { style: { fontSize: '13px', opacity: 0.9, marginBottom: '12px', marginTop: 0 } }, 'noteで詳しい改善法を公開中'),
        React.createElement('span', { style: { background: 'white', color: '#7e22ce', fontWeight: 'bold', padding: '12px 24px', borderRadius: '12px', display: 'inline-block' } }, 'noteを見る')
      ),
      React.createElement('button', {
        onClick: () => { setStarted(false); setAnswers({}); setCurrentQuestion(0); setShowResult(false) },
        style: { width: '100%', background: '#f3f4f6', color: '#374151', fontWeight: '500', padding: '12px', borderRadius: '16px', border: 'none', cursor: 'pointer' }
      }, 'もう一度診断する')
    ))
  }

  const progress = (currentQuestion / questions.length) * 100
  const options = [
    { label: 'よくある（週3回以上）', value: 2 },
    { label: 'ときどきある（週1〜2回）', value: 1 },
    { label: 'あまりない・ない', value: 0 },
  ]

  return React.createElement('main', {
    style: { minHeight: '100vh', background: 'linear-gradient(to bottom, #ecfdf5, #ccfbf1)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }
  }, React.createElement('div', {
    style: { background: 'white', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)', padding: '24px', maxWidth: '400px', width: '100%' }
  },
    React.createElement('div', { style: { marginBottom: '24px' } },
      React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6b7280', marginBottom: '8px' } },
        React.createElement('span', null, '質問 ' + (currentQuestion + 1) + ' / ' + questions.length),
        React.createElement('span', null, Math.round(progress) + '%')
      ),
      React.createElement('div', { style: { background: '#f3f4f6', borderRadius: '9999px', height: '8px' } },
        React.createElement('div', { style: { background: gradMain, height: '8px', borderRadius: '9999px', width: progress + '%', transition: 'width 0.3s' } })
      )
    ),
    React.createElement('h2', { style: { fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px', lineHeight: 1.6 } },
      questions[currentQuestion].text
    ),
    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '12px' } },
      options.map(option =>
        React.createElement('button', {
          key: option.value,
          onClick: () => handleAnswer(option.value),
          style: { textAlign: 'left', background: '#f9fafb', border: '2px solid #e5e7eb', borderRadius: '16px', padding: '16px', color: '#374151', fontWeight: '500', cursor: 'pointer', fontSize: '15px', transition: 'all 0.2s' }
        }, option.label)
      )
    )
  ))
}
