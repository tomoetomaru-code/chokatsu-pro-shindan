'use client'

import { useState } from 'react'

const LINE_URL = 'https://lin.ee/XXXXXXX'
const NOTE_URL = 'https://note.com/XXXXXXX'

const questions = [
  { id: 1, text: '便秘（3日以上排便がない）が週に1回以上ありますか？', cat: 'tamekoml' },
  { id: 2, text: '食後にお腹が張る・膨らむ感じがしますか？', cat: 'fukurami' },
  { id: 3, text: 'ストレスを感じるとお腹の調子が悪くなりますか？', cat: 'binkan' },
  { id: 4, text: '便秘と下痢を交互に繰り返すことがありますか？', cat: 'kimagure' },
  { id: 5, text: 'お腹にガスが溜まりやすいですか？', cat: 'fukurami' },
  { id: 6, text: '排便時に強くいきまないと出ないことがありますか？', cat: 'tamekoml' },
  { id: 7, text: '緊張したり不安になるとお腹が痛くなりますか？', cat: 'binkan' },
  { id: 8, text: '急に下痢になることがありますか？', cat: 'kimagure' },
  { id: 9, text: '食後30分〜2時間でお腹が張りますか？', cat: 'fukurami' },
  { id: 10, text: '便が硬くてコロコロしていることが多いですか？', cat: 'tamekoml' },
  { id: 11, text: '腸の動きを意識的に感じることがありますか？', cat: 'binkan' },
  { id: 12, text: '同じ食事でもお腹の状態が日によって全く違いますか？', cat: 'kimagure' },
  { id: 13, text: 'げっぷやおならが多い方ですか？', cat: 'fukurami' },
  { id: 14, text: '水分をたくさん摂っても便秘になりますか？', cat: 'tamekoml' },
  { id: 15, text: '食品の種類によって腸の反応が敏感に変わりますか？', cat: 'binkan' },
  { id: 16, text: '下痢と便秘のどちらが来るか予測できないことがありますか？', cat: 'kimagure' },
  { id: 17, text: '炭酸飲料や豆類を食べると特にお腹が張りますか？', cat: 'fukurami' },
  { id: 18, text: '排便した後もスッキリしない感じがありますか？', cat: 'tamekoml' },
  { id: 19, text: '睡眠不足や疲れがたまるとお腹の調子が崩れますか？', cat: 'binkan' },
  { id: 20, text: '旅行先や環境が変わると便の状態が変わりますか？', cat: 'kimagure' },
  { id: 21, text: 'お腹の張りで服が締め付けられると感じることがありますか？', cat: 'fukurami' },
  { id: 22, text: '週に3回未満しか排便がないことがありますか？', cat: 'tamekoml' },
  { id: 23, text: '特定の食べ物でお腹が過敏に反応しますか？', cat: 'binkan' },
  { id: 24, text: 'お腹の調子が良い日と悪い日の差が激しいですか？', cat: 'kimagure' },
  { id: 25, text: '腸内に空気が溜まっている感覚がありますか？', cat: 'fukurami' },
  { id: 26, text: '運動不足が続いても便秘になりやすいですか？', cat: 'tamekoml' },
  { id: 27, text: '精神的なプレッシャーでお腹が痛くなることがありますか？', cat: 'binkan' },
  { id: 28, text: '腸の不調が生活リズムによって変わると感じますか？', cat: 'kimagure' },
  { id: 29, text: '食事後すぐにお腹が不快になることがありますか？', cat: 'fukurami' },
  { id: 30, text: '腸の調子を改善しようと様々なことを試していますか？', cat: 'tamekoml' },
]

const types = {
  fukurami: { name: '膨らみ型', emoji: '🎈', color: '#f97316',
    desc: '食後にお腹が張る・ガスが溜まりやすいタイプです。腸内での発酵・ガス産生が過剰になっています。',
    symptoms: ['食後のお腹の張り', 'げっぷ・おなら過多', '腹部膨満感'],
    good: ['生姜・フェンネル', 'ペパーミントティー', '消化酵素が豊富な食品'],
    bad: ['豆類・炭酸飲料', 'キャベツ・ブロッコリー', 'りんご・梨'],
    steps: ['食事はゆっくりよく噛む（1口20回以上）', '食後15分のウォーキングを習慣に', '腸活ヨガで腸のガス排出を促す'],
  },
  tamekoml: { name: 'ためこみ型', emoji: '🪨', color: '#78716c',
    desc: '便秘・排便困難が続くタイプです。大腸の蠕動運動が低下しており、水分が過剰に吸収されています。',
    symptoms: ['3日以上の便秘', '硬いコロコロ便', '残便感'],
    good: ['プルーン・干しいも', 'オートミール', 'オリーブオイル・発酵食品'],
    bad: ['精製炭水化物', 'チーズの過剰摂取', 'カフェイン過多・加工食品'],
    steps: ['毎朝コップ1杯の白湯を飲む', '1日8000歩以上歩く', '腸マッサージ（の字マッサージ）を毎晩行う'],
  },
  binkan: { name: '敏感型', emoji: '⚡', color: '#3b82f6',
    desc: 'ストレスや緊張でお腹が過敏になるタイプです。脳腸相関が過剰に反応しています。',
    symptoms: ['ストレスでの腹痛', '食べ物への過敏反応', '緊張時の下痢'],
    good: ['バナナ・大豆（トリプトファン）', 'ナッツ類（マグネシウム）', '発酵食品・ハーブティー'],
    bad: ['カフェイン・アルコール', '辛い食べ物・脂っこい食事', '食品添加物を多く含む加工食品'],
    steps: ['腹式呼吸を1日3回（5分ずつ）実践する', '就寝前のリラックスルーティンを作る', 'FODMAP食事法を試してみる'],
  },
  kimagure: { name: '気まぐれ型', emoji: '🎭', color: '#a855f7',
    desc: '便秘と下痢を繰り返す不安定なタイプです。腸の蠕動運動のリズムが乱れています。',
    symptoms: ['便秘と下痢の交互', '症状の予測困難', '環境変化での悪化'],
    good: ['白米・バナナ', '豆腐・白身魚', '温かいスープ類'],
    bad: ['生野菜・生果物の大量摂取', '冷たい飲み物・脂っこい食事', 'アルコール'],
    steps: ['毎日同じ時間に食事・起床・就寝する', '腸のリズムを記録する', '体を冷やさないようにする（腹巻き・温め）'],
  },
}

export default function Home() {
  const [step, setStep] = useState('top')
  const [q, setQ] = useState(0)
  const [answers, setAnswers] = useState({})

  function handleAnswer(val) {
    const newAns = { ...answers, [q]: val }
    setAnswers(newAns)
    if (q < questions.length - 1) {
      setQ(q + 1)
    } else {
      setStep('result')
    }
  }

  function calcResult() {
    const s = { fukurami: 0, tamekoml: 0, binkan: 0, kimagure: 0 }
    questions.forEach((qs, i) => { s[qs.cat] = (s[qs.cat] || 0) + (answers[i] || 0) })
    const sorted = Object.entries(s).sort((a, b) => b[1] - a[1])
    return { main: sorted[0][0], sub: sorted[1][0], scores: s }
  }

  function reset() {
    setStep('top'); setQ(0); setAnswers({})
  }

  if (step === 'top') {
    return (
      <main style={{minHeight:'100vh',background:'linear-gradient(to bottom,#ecfdf5,#ccfbf1)',display:'flex',alignItems:'center',justifyContent:'center',padding:'16px'}}>
        <div style={{background:'white',borderRadius:'24px',boxShadow:'0 20px 60px rgba(0,0,0,0.1)',padding:'32px',maxWidth:'400px',width:'100%',textAlign:'center'}}>
          <div style={{fontSize:'64px',marginBottom:'16px'}}>🌿</div>
          <h1 style={{fontSize:'24px',fontWeight:'bold',color:'#1f2937',marginBottom:'8px'}}>腸内タイプ本格診断</h1>
          <p style={{color:'#0d9488',fontWeight:'600',marginBottom:'16px'}}>くるみ｜腸からやせる研究所</p>
          <div style={{background:'#f0fdfa',borderRadius:'16px',padding:'16px',marginBottom:'24px',textAlign:'left'}}>
            {['✅ 30問・約8分で完了','✅ Rome IV基準をベースに設計','✅ 4タイプ＋重症度で詳しく判定','✅ あなた専用の改善プランをお届け'].map((t,i) => (
              <p key={i} style={{fontSize:'14px',color:'#374151',marginBottom:'8px',marginTop:0}}>{t}</p>
            ))}
          </div>
          <button onClick={() => setStep('quiz')} style={{width:'100%',background:'linear-gradient(135deg,#14b8a6,#10b981)',color:'white',fontWeight:'bold',padding:'16px',borderRadius:'16px',fontSize:'18px',border:'none',cursor:'pointer'}}>
            診断をはじめる →
          </button>
        </div>
      </main>
    )
  }

  if (step === 'result') {
    const res = calcResult()
    const mt = types[res.main]
    const st = types[res.sub]
    const qCount = questions.filter(qs => qs.cat === res.main).length
    const score = res.scores[res.main]
    const ratio = score / (qCount * 2)
    const level = ratio >= 0.7 ? '重度' : ratio >= 0.4 ? '中度' : '軽度'
    const levelW = ratio >= 0.7 ? '90%' : ratio >= 0.4 ? '60%' : '30%'
    const levelC = ratio >= 0.7 ? '#dc2626' : ratio >= 0.4 ? '#d97706' : '#16a34a'
    return (
      <main style={{minHeight:'100vh',background:'linear-gradient(to bottom,#ecfdf5,#ccfbf1)',padding:'16px'}}>
        <div style={{maxWidth:'400px',margin:'0 auto',paddingTop:'32px',paddingBottom:'32px'}}>
          <div style={{background:'linear-gradient(135deg,' + mt.color + ',#10b981)',borderRadius:'24px',padding:'24px',color:'white',textAlign:'center',marginBottom:'16px'}}>
            <div style={{fontSize:'56px',marginBottom:'8px'}}>{mt.emoji}</div>
            <p style={{fontSize:'14px',opacity:0.9,marginBottom:'4px',marginTop:0}}>あなたの腸内タイプは</p>
            <h2 style={{fontSize:'32px',fontWeight:'bold',margin:0}}>{mt.name}</h2>
            <p style={{fontSize:'13px',opacity:0.8,marginTop:'8px',marginBottom:0}}>サブタイプ：{st.name} {st.emoji}</p>
          </div>
          <div style={{background:'white',borderRadius:'16px',padding:'20px',marginBottom:'16px',boxShadow:'0 2px 10px rgba(0,0,0,0.05)'}}>
            <h3 style={{fontWeight:'bold',color:'#374151',marginBottom:'12px',marginTop:0}}>重症度</h3>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <div style={{flex:1,background:'#f3f4f6',borderRadius:'9999px',height:'12px'}}>
                <div style={{background:'linear-gradient(to right,#4ade80,#ef4444)',height:'12px',borderRadius:'9999px',width:levelW}}></div>
              </div>
              <span style={{fontWeight:'bold',color:levelC}}>{level}</span>
            </div>
          </div>
          <div style={{background:'white',borderRadius:'16px',padding:'20px',marginBottom:'16px',borderLeft:'4px solid ' + mt.color,boxShadow:'0 2px 10px rgba(0,0,0,0.05)'}}>
            <h3 style={{fontWeight:'bold',color:'#374151',marginBottom:'8px',marginTop:0}}>あなたのタイプについて</h3>
            <p style={{color:'#4b5563',fontSize:'14px',margin:0}}>{mt.desc}</p>
          </div>
          <div style={{background:'white',borderRadius:'16px',padding:'20px',marginBottom:'16px',boxShadow:'0 2px 10px rgba(0,0,0,0.05)'}}>
            <h3 style={{fontWeight:'bold',color:'#374151',marginBottom:'12px',marginTop:0}}>主な症状チェック</h3>
            {mt.symptoms.map((s, i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px',fontSize:'14px',color:'#4b5563'}}>
                <span style={{color:'#14b8a6'}}>✓</span>{s}
              </div>
            ))}
          </div>
          <div style={{background:'white',borderRadius:'16px',padding:'20px',marginBottom:'16px',boxShadow:'0 2px 10px rgba(0,0,0,0.05)'}}>
            <h3 style={{fontWeight:'bold',color:'#374151',marginBottom:'12px',marginTop:0}}>🚀 今すぐできる改善3ステップ</h3>
            {mt.steps.map((s, i) => (
              <div key={i} style={{display:'flex',gap:'12px',marginBottom:'12px',fontSize:'14px',color:'#4b5563'}}>
                <span style={{background:'#ccfbf1',color:'#0d9488',fontWeight:'bold',borderRadius:'9999px',width:'24px',height:'24px',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:'12px'}}>{i+1}</span>
                {s}
              </div>
            ))}
          </div>
          <div style={{background:'white',borderRadius:'16px',padding:'20px',marginBottom:'16px',boxShadow:'0 2px 10px rgba(0,0,0,0.05)'}}>
            <h3 style={{fontWeight:'bold',color:'#374151',marginBottom:'12px',marginTop:0}}>🥗 食品ガイド</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              <div>
                <p style={{fontSize:'12px',fontWeight:'bold',color:'#16a34a',marginBottom:'8px',marginTop:0}}>✅ 積極的に食べたい</p>
                {mt.good.map((f,i) => <p key={i} style={{fontSize:'12px',color:'#4b5563',padding:'4px 0',borderBottom:'1px solid #f9fafb',margin:0}}>{f}</p>)}
              </div>
              <div>
                <p style={{fontSize:'12px',fontWeight:'bold',color:'#dc2626',marginBottom:'8px',marginTop:0}}>⚠️ 控えたい食品</p>
                {mt.bad.map((f,i) => <p key={i} style={{fontSize:'12px',color:'#4b5563',padding:'4px 0',borderBottom:'1px solid #f9fafb',margin:0}}>{f}</p>)}
              </div>
            </div>
          </div>
          <a href={LINE_URL} style={{display:'block',background:'linear-gradient(135deg,#4ade80,#14b8a6)',borderRadius:'16px',padding:'20px',marginBottom:'12px',textAlign:'center',textDecoration:'none',color:'white'}}>
            <p style={{fontWeight:'bold',marginBottom:'4px',marginTop:0}}>📄 詳しい結果をPDFで受け取る</p>
            <p style={{fontSize:'13px',opacity:0.9,marginBottom:'12px',marginTop:0}}>LINE友だち追加で無料プレゼント！</p>
            <span style={{background:'white',color:'#0d9488',fontWeight:'bold',padding:'12px 24px',borderRadius:'12px',display:'inline-block'}}>LINEで受け取る</span>
          </a>
          <a href={NOTE_URL} style={{display:'block',background:'linear-gradient(135deg,#c084fc,#f9a8d4)',borderRadius:'16px',padding:'20px',marginBottom:'12px',textAlign:'center',textDecoration:'none',color:'white'}}>
            <p style={{fontWeight:'bold',marginBottom:'4px',marginTop:0}}>📖 腸内環境改善プログラム</p>
            <p style={{fontSize:'13px',opacity:0.9,marginBottom:'12px',marginTop:0}}>noteで詳しい改善法を公開中</p>
            <span style={{background:'white',color:'#7e22ce',fontWeight:'bold',padding:'12px 24px',borderRadius:'12px',display:'inline-block'}}>noteを見る</span>
          </a>
          <button onClick={reset} style={{width:'100%',background:'#f3f4f6',color:'#374151',fontWeight:'500',padding:'12px',borderRadius:'16px',border:'none',cursor:'pointer'}}>もう一度診断する</button>
        </div>
      </main>
    )
  }

  const pct = Math.round((q / questions.length) * 100)
  const barW = (q / questions.length * 100) + '%'
  return (
    <main style={{minHeight:'100vh',background:'linear-gradient(to bottom,#ecfdf5,#ccfbf1)',display:'flex',alignItems:'center',justifyContent:'center',padding:'16px'}}>
      <div style={{background:'white',borderRadius:'24px',boxShadow:'0 20px 60px rgba(0,0,0,0.1)',padding:'24px',maxWidth:'400px',width:'100%'}}>
        <div style={{marginBottom:'24px'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'14px',color:'#6b7280',marginBottom:'8px'}}>
            <span>質問 {q + 1} / {questions.length}</span>
            <span>{pct}%</span>
          </div>
          <div style={{background:'#f3f4f6',borderRadius:'9999px',height:'8px'}}>
            <div style={{background:'linear-gradient(135deg,#14b8a6,#10b981)',height:'8px',borderRadius:'9999px',width:barW,transition:'width 0.3s'}}></div>
          </div>
        </div>
        <h2 style={{fontSize:'18px',fontWeight:'bold',color:'#1f2937',marginBottom:'24px',lineHeight:1.6}}>{questions[q].text}</h2>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {[
            { label: 'よくある（週3回以上）', val: 2 },
            { label: 'ときどきある（週1〜2回）', val: 1 },
            { label: 'あまりない・ない', val: 0 },
          ].map(opt => (
            <button key={opt.val} onClick={() => handleAnswer(opt.val)} style={{textAlign:'left',background:'#f9fafb',border:'2px solid #e5e7eb',borderRadius:'16px',padding:'16px',color:'#374151',fontWeight:'500',cursor:'pointer',fontSize:'15px'}}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
