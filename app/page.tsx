'use client'

import { useState } from 'react'

const LINE_URL = 'https://lin.ee/TzDjpAxf'
const NOTE_URL = 'https://note.com/XXXXXXX'

type CatKey = 'fukurami' | 'tamekoml' | 'binkan' | 'kimagure'
type QCat = 'ben' | 'suimin' | 'seikatsu' | 'shokuji'

interface Question {
  id: number
  text: string
  cat: CatKey
  qcat: QCat
}

interface TypeInfo {
  label: string
  desc: string
  color: string
  bg: string
}

interface CategoryAdvice {
  ben: string[]
  suimin: string[]
  seikatsu: string[]
  shokuji: string[]
}

const questions: Question[] = [
  // 便に関する質問 (10問)
  { id: 1,  text: '便秘（3日以上排便がない）が週に1回以上ありますか？', cat: 'tamekoml', qcat: 'ben' },
  { id: 2,  text: '食後にお腹が張る・膨らむ感じがしますか？',          cat: 'fukurami', qcat: 'ben' },
  { id: 3,  text: 'ストレスを感じるとお腹の調子が悪くなりますか？',    cat: 'binkan',   qcat: 'ben' },
  { id: 4,  text: '便秘と下痢を交互に繰り返すことがありますか？',       cat: 'kimagure', qcat: 'ben' },
  { id: 5,  text: '便がコロコロと硬い・または兎のような形ですか？',     cat: 'tamekoml', qcat: 'ben' },
  { id: 6,  text: '排便後もすっきりしない残便感がありますか？',         cat: 'tamekoml', qcat: 'ben' },
  { id: 7,  text: 'おなかにガスがたまりやすいですか？',                cat: 'fukurami', qcat: 'ben' },
  { id: 8,  text: '急に下痢になることがありますか？',                   cat: 'kimagure', qcat: 'ben' },
  { id: 9,  text: '緊張や不安でトイレに行きたくなりますか？',           cat: 'binkan',   qcat: 'ben' },
  { id: 10, text: '1日の排便回数が3回以上になることがありますか？',      cat: 'fukurami', qcat: 'ben' },
  // 睡眠に関する質問 (8問)
  { id: 11, text: '寝つきが悪く、床についても30分以上眠れないことがよくありますか？', cat: 'binkan',   qcat: 'suimin' },
  { id: 12, text: '夜中に何度も目が覚めることがありますか？',                         cat: 'kimagure', qcat: 'suimin' },
  { id: 13, text: '朝スッキリ起きられず、日中に眠気を感じますか？',                   cat: 'tamekoml', qcat: 'suimin' },
  { id: 14, text: '就寝前にスマホやPCを1時間以上使うことが多いですか？',              cat: 'binkan',   qcat: 'suimin' },
  { id: 15, text: '睡眠時間が6時間未満のことが週3日以上ありますか？',                 cat: 'tamekoml', qcat: 'suimin' },
  { id: 16, text: '眠りが浅く、少しの物音で目が覚めますか？',                         cat: 'binkan',   qcat: 'suimin' },
  { id: 17, text: '休日と平日で起床時間が2時間以上ズレますか？',                      cat: 'kimagure', qcat: 'suimin' },
  { id: 18, text: '夜になると頭が冴えてしまって眠れないことがありますか？',            cat: 'fukurami', qcat: 'suimin' },
  // 生活習慣に関する質問 (6問)
  { id: 19, text: '1日の歩数が5000歩以下のことが多いですか？',               cat: 'tamekoml', qcat: 'seikatsu' },
  { id: 20, text: 'デスクワークなど、座っている時間が8時間以上ありますか？', cat: 'tamekoml', qcat: 'seikatsu' },
  { id: 21, text: '週に1回以上の運動（20分以上）をしていませんか？',         cat: 'fukurami', qcat: 'seikatsu' },
  { id: 22, text: 'ストレスを感じても解消する方法がわからないですか？',      cat: 'binkan',   qcat: 'seikatsu' },
  { id: 23, text: '入浴をシャワーだけで済ませることが多いですか？',           cat: 'kimagure', qcat: 'seikatsu' },
  { id: 24, text: '水分をあまり飲まない（1日1L未満）ですか？',               cat: 'tamekoml', qcat: 'seikatsu' },
  // 食生活に関する質問 (6問)
  { id: 25, text: '野菜を1日に小鉢3皿分以上食べられていないですか？',              cat: 'tamekoml', qcat: 'shokuji' },
  { id: 26, text: '発酵食品（ヨーグルト・味噌・納豆など）をほとんど食べない日が多いですか？', cat: 'fukurami', qcat: 'shokuji' },
  { id: 27, text: '揚げ物や脂っこい食事が週4回以上ありますか？',                   cat: 'kimagure', qcat: 'shokuji' },
  { id: 28, text: '食事を抜くことが週2回以上ありますか？',                          cat: 'kimagure', qcat: 'shokuji' },
  { id: 29, text: '甘いもの（お菓子・ジュース）を毎日摂取しますか？',               cat: 'binkan',   qcat: 'shokuji' },
  { id: 30, text: '食事の時間が不規則で毎日バラバラですか？',                        cat: 'kimagure', qcat: 'shokuji' },
]

const types: Record<CatKey, TypeInfo> = {
  fukurami: {
    label: '膨らみ型',
    desc: 'ガスがたまりやすく腸内環境が乱れがちです。発酵食品・食物繊維を意識しましょう。',
    color: 'text-green-700',
    bg: 'bg-green-50 border-green-300',
  },
  tamekoml: {
    label: '溜め込み型',
    desc: '腸の動きが弱く便秘になりやすい体質です。水分補給・運動で腸を動かしましょう。',
    color: 'text-yellow-700',
    bg: 'bg-yellow-50 border-yellow-300',
  },
  binkan: {
    label: '敏感型',
    desc: 'ストレスが腸に影響しやすいタイプです。自律神経を整えるリラックス習慣が鍵です。',
    color: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-300',
  },
  kimagure: {
    label: 'きまぐれ型',
    desc: '便秘と下痢が繰り返す不安定な腸です。規則正しい食事・生活リズムが改善の近道です。',
    color: 'text-purple-700',
    bg: 'bg-purple-50 border-purple-300',
  },
}

const categoryAdvice: Record<QCat, Record<CatKey, string[]>> = {
  ben: {
    fukurami: [
      '食後すぐに横にならず、少し歩くと腸内ガスが排出されやすくなります。',
      '炭酸飲料・豆類の摂り過ぎに注意し、善玉菌を増やす食品を積極的に摂りましょう。',
    ],
    tamekoml: [
      '朝起きたら白湯を1杯飲む習慣をつけ、腸を刺激しましょう。',
      '食物繊維（ごぼう・こんにゃく・海藻）を毎食意識して取り入れましょう。',
    ],
    binkan: [
      '排便の時間を毎朝決め、腸に「出すタイミング」を覚えさせましょう。',
      'ストレスを感じたら腹式呼吸で副交感神経を優位にしましょう。',
    ],
    kimagure: [
      '食事の時間を一定にし、腸のリズムを整えることが最優先です。',
      '刺激の強い食べ物（辛いもの・冷たいもの）は一時的に控えましょう。',
    ],
  },
  suimin: {
    fukurami: [
      '就寝2時間前までに夕食を終わらせ、消化が睡眠を妨げないようにしましょう。',
      'カモミールティーなどハーブティーが腸とリラックスの両方に効果的です。',
    ],
    tamekoml: [
      '毎日同じ時間に起床し、体内時計を正しくリセットすることが大切です。',
      '日中に15〜30分の軽い運動を入れると夜の睡眠の質が上がります。',
    ],
    binkan: [
      '就寝前のスマホを控え、ブルーライトをカットして自律神経を落ち着けましょう。',
      '寝る1時間前に39〜40℃のぬるめのお風呂に入ると深部体温が下がり眠りやすくなります。',
    ],
    kimagure: [
      '休日でも起床時間を平日と1時間以内にそろえ、睡眠リズムのズレを防ぎましょう。',
      '寝室の温度・湿度を整え（室温18〜22℃）、睡眠環境を一定にしましょう。',
    ],
  },
  seikatsu: {
    fukurami: [
      '食後10分程度のウォーキングを習慣にすると腸の動きが活発になります。',
      'お腹を時計回りにやさしくマッサージして腸内ガスを促しましょう。',
    ],
    tamekoml: [
      '1時間に1回は立ち上がって軽くストレッチし、腸への刺激を与えましょう。',
      '1日の水分量を1.5〜2Lに増やし、腸の潤滑を保ちましょう。',
    ],
    binkan: [
      'ヨガや瞑想など副交感神経を高める活動を週3回以上取り入れましょう。',
      '入浴は湯船に浸かり、自律神経を整えることを意識しましょう。',
    ],
    kimagure: [
      '起床・食事・就寝の時間を固定し、生活リズムを腸に覚えさせましょう。',
      '週2〜3回の有酸素運動（ウォーキング・スクワット）で腸を定期的に動かしましょう。',
    ],
  },
  shokuji: {
    fukurami: [
      'ヨーグルト・キムチ・みそ汁などの発酵食品を毎日1品は摂りましょう。',
      '食物繊維を摂る際は水溶性（オクラ・なめこ）と不溶性（ごぼう）を両方意識しましょう。',
    ],
    tamekoml: [
      '朝食を必ず摂り、胃腸の「目覚め」を促しましょう。野菜スープが効果的です。',
      '水分は食間にこまめに摂り、食事中の水分の摂り過ぎは消化液を薄めるので注意。',
    ],
    binkan: [
      'カフェイン・アルコール・辛いものは腸を刺激するため、量と頻度を控えめにしましょう。',
      'よく噛んで食べることで副交感神経が働き、腸への負担が減ります（目安30回）。',
    ],
    kimagure: [
      '3食を決まった時間に摂る習慣をつけ、腸のリズムを食事から整えましょう。',
      '揚げ物・加工食品を週2回以下に減らし、腸に負担のない食事を心がけましょう。',
    ],
  },
}

const TOTAL = questions.length

export default function Home() {
  const [step, setStep] = useState<'top' | 'quiz' | 'result'>('top')
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})

  function startQuiz() {
    setAnswers({})
    setCurrent(0)
    setStep('quiz')
  }

  function handleAnswer(score: number) {
    const next = { ...answers, [current]: score }
    setAnswers(next)
    if (current + 1 >= TOTAL) {
      setStep('result')
    } else {
      setCurrent(current + 1)
    }
  }

  function handleBack() {
    if (current === 0) {
      setStep('top')
    } else {
      setCurrent(current - 1)
    }
  }

  function calcResult() {
    const scores: Record<CatKey, number> = { fukurami: 0, tamekoml: 0, binkan: 0, kimagure: 0 }
    questions.forEach((q, i) => {
      scores[q.cat] += answers[i] ?? 0
    })
    const main = (Object.keys(scores) as CatKey[]).reduce((a, b) => scores[a] >= scores[b] ? a : b)
    return { scores, main }
  }

  function calcCategoryScores() {
    const cats: Record<QCat, number> = { ben: 0, suimin: 0, seikatsu: 0, shokuji: 0 }
    const totals: Record<QCat, number> = { ben: 0, suimin: 0, seikatsu: 0, shokuji: 0 }
    questions.forEach((q, i) => {
      totals[q.qcat] += 2
      cats[q.qcat] += answers[i] ?? 0
    })
    return { cats, totals }
  }

  if (step === 'top') {
    return (
      <main className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-orange-100 px-4 py-10'>
        <div className='max-w-md w-full bg-white rounded-3xl shadow-lg p-8 text-center'>
          <p className='text-sm text-orange-500 font-semibold tracking-widest mb-2'>くるみ｜腸からやせる研究所</p>
          <h1 className='text-2xl font-bold text-gray-800 mb-3'>腸内タイプ本格診断</h1>
          <p className='text-gray-500 text-sm mb-2'>便・睡眠・生活習慣・食生活の4カテゴリ</p>
          <p className='text-gray-500 text-sm mb-6'>全{TOTAL}問（約5分）で、あなたの腸内タイプと<br />カテゴリ別の注意点がわかります。</p>
          <button
            onClick={startQuiz}
            className='w-full bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 rounded-2xl text-lg transition'
          >
            診断をはじめる →
          </button>
        </div>
      </main>
    )
  }

  if (step === 'quiz') {
    const q = questions[current]
    const progress = Math.round(((current) / TOTAL) * 100)
    const catLabels: Record<QCat, string> = { ben: '便', suimin: '睡眠', seikatsu: '生活習慣', shokuji: '食生活' }
    return (
      <main className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-orange-100 px-4 py-10'>
        <div className='max-w-md w-full bg-white rounded-3xl shadow-lg p-6'>
          <div className='flex items-center justify-between mb-2'>
            <button
              onClick={handleBack}
              className='text-sm text-orange-500 font-semibold hover:underline flex items-center gap-1'
            >
              ← 戻る
            </button>
            <span className='text-sm text-gray-400'>{current + 1} / {TOTAL}</span>
          </div>
          <div className='w-full bg-gray-100 rounded-full h-2 mb-4'>
            <div
              className='bg-orange-400 h-2 rounded-full transition-all'
              style={{ width: progress + '%' }}
            />
          </div>
          <span className='inline-block text-xs bg-orange-100 text-orange-600 rounded-full px-3 py-1 mb-3 font-semibold'>
            {catLabels[q.qcat]}
          </span>
          <p className='text-gray-800 font-semibold text-base mb-6 leading-relaxed'>{q.text}</p>
          <div className='flex flex-col gap-3'>
            {[
              { label: 'はい（よくある）', score: 2 },
              { label: 'たまにある', score: 1 },
              { label: 'いいえ（ない）', score: 0 },
            ].map((opt) => (
              <button
                key={opt.label}
                onClick={() => handleAnswer(opt.score)}
                className='w-full border-2 border-orange-200 hover:border-orange-400 hover:bg-orange-50 text-gray-700 font-medium py-3 rounded-xl transition'
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    )
  }

  // result
  const { main } = calcResult()
  const t = types[main]
  const { cats, totals } = calcCategoryScores()
  const catLabelMap: Record<QCat, string> = { ben: '🚽 便', suimin: '😴 睡眠', seikatsu: '🏃 生活習慣', shokuji: '🥗 食生活' }

  return (
    <main className='min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 px-4 py-10'>
      <div className='max-w-md mx-auto flex flex-col gap-5'>
        {/* タイプ結果 */}
        <div className={'bg-white rounded-3xl shadow-lg p-6 border-2 ' + t.bg}>
          <p className='text-sm text-orange-500 font-semibold mb-1'>あなたの腸内タイプ</p>
          <h2 className={'text-3xl font-bold mb-2 ' + t.color}>{t.label}</h2>
          <p className='text-gray-600 text-sm leading-relaxed'>{t.desc}</p>
        </div>

        {/* カテゴリ別スコア */}
        <div className='bg-white rounded-3xl shadow-lg p-6'>
          <h3 className='font-bold text-gray-700 mb-4'>カテゴリ別チェック結果</h3>
          {(['ben', 'suimin', 'seikatsu', 'shokuji'] as QCat[]).map((qcat) => {
            const pct = totals[qcat] > 0 ? Math.round((cats[qcat] / totals[qcat]) * 100) : 0
            const color = pct >= 60 ? 'bg-red-400' : pct >= 30 ? 'bg-yellow-400' : 'bg-green-400'
            return (
              <div key={qcat} className='mb-3'>
                <div className='flex justify-between text-sm mb-1'>
                  <span className='font-semibold text-gray-700'>{catLabelMap[qcat]}</span>
                  <span className='text-gray-500'>{pct}%</span>
                </div>
                <div className='w-full bg-gray-100 rounded-full h-3'>
                  <div className={'h-3 rounded-full transition-all ' + color} style={{ width: pct + '%' }} />
                </div>
              </div>
            )
          })}
          <p className='text-xs text-gray-400 mt-2'>※ スコアが高いほど要注意です</p>
        </div>

        {/* カテゴリ別アドバイス */}
        {(['ben', 'suimin', 'seikatsu', 'shokuji'] as QCat[]).map((qcat) => {
          const pct = totals[qcat] > 0 ? Math.round((cats[qcat] / totals[qcat]) * 100) : 0
          const advices = categoryAdvice[qcat][main]
          const borderColor = pct >= 60 ? 'border-red-300' : pct >= 30 ? 'border-yellow-300' : 'border-green-300'
          return (
            <div key={qcat} className={'bg-white rounded-3xl shadow-lg p-6 border-l-4 ' + borderColor}>
              <h4 className='font-bold text-gray-700 mb-3'>{catLabelMap[qcat]}の注意点</h4>
              <ul className='list-none flex flex-col gap-2'>
                {advices.map((a, i) => (
                  <li key={i} className='text-sm text-gray-600 leading-relaxed flex gap-2'>
                    <span className='text-orange-400 font-bold mt-0.5'>✓</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}

        {/* LINE登録CTA */}
        <div className='bg-green-50 border-2 border-green-300 rounded-3xl shadow-lg p-6 text-center'>
          <p className='text-lg font-bold text-green-700 mb-2'>📄 無料PDFプレゼント中！</p>
          <p className='text-sm text-gray-600 mb-4 leading-relaxed'>
            LINE登録で「腸内タイプ別 完全改善ガイド」PDFを無料でお届けします。<br />
            あなたのタイプに合わせた詳しい食事・生活習慣のアドバイスが満載です。
          </p>
          <a
            href={LINE_URL}
            target='_blank'
            rel='noopener noreferrer'
            className='block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl text-base transition mb-3'
          >
            LINEで無料PDFを受け取る →
          </a>
          <p className='text-xs text-gray-400'>※ LINEアカウントをお持ちでない方はブラウザから閲覧できます</p>
        </div>

        {/* もう一度 */}
        <button
          onClick={startQuiz}
          className='w-full bg-white border-2 border-orange-300 text-orange-500 font-bold py-3 rounded-2xl hover:bg-orange-50 transition'
        >
          もう一度診断する
        </button>
      </div>
    </main>
  )
}
