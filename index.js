import express from 'express'
import fs from 'fs/promises'
import path from 'path'
const app = express()
const port = 3000

const affirmations = [
  { "lang": "filipino", "affirmation": "Ang puso ko ay parang kape—lagi kang nagpapasarap sa bawat umaga." },
  { "lang": "filipino", "affirmation": "Hindi man ako marunong magluto, ikaw pa rin ang pinaka-masarap na parte ng buhay ko." },
  { "lang": "filipino", "affirmation": "Parang signal lang ng WiFi, mas lumalakas ako kapag malapit ka." },
  { "lang": "filipino", "affirmation": "Ang mundo ko ay parang pelikula, at ikaw ang best plot twist." },
  { "lang": "filipino", "affirmation": "Kung exams ka, handa akong magpuyat para lang ipasa mo ako." },
  { "lang": "filipino", "affirmation": "Ikaw ang dahilan kung bakit lagi akong naka-full charge." },
  { "lang": "filipino", "affirmation": "Para kang ulan sa tag-init—laging inaabangan, laging masaya kapag dumadating." },
  { "lang": "filipino", "affirmation": "Hindi ako marunong mag-diet kasi ikaw ang paborito kong kainin ng tingin." },
  { "lang": "filipino", "affirmation": "Kahit walang load, sapat na ang boses mo para sumaya ako." },
  { "lang": "filipino", "affirmation": "Para kang alarm clock, hindi ako makabangon nang wala ka." },
  { "lang": "filipino", "affirmation": "Kahit traffic sa EDSA, basta ikaw ang katabi, smooth ride pa rin." },
  { "lang": "filipino", "affirmation": "Ikaw ang dahilan kung bakit laging trending ang puso ko." },
  { "lang": "filipino", "affirmation": "Walang cheat code sa’yo, pero willing akong maglaro habang buhay." },
  { "lang": "filipino", "affirmation": "Kung ikaw ay meme, ikaw ang pinaka-relatable at lovable." },
  { "lang": "filipino", "affirmation": "Hindi ako nagbabasa ng horoscope, kasi ikaw ang destiny ko." },
  { "lang": "filipino", "affirmation": "Kung meron mang forever, ikaw ‘yon." },
  { "lang": "filipino", "affirmation": "Para kang 13th month pay—lagi kong hinihintay." },
  { "lang": "filipino", "affirmation": "Ikaw ang playlist na hindi ko kayang i-skip." },
  { "lang": "filipino", "affirmation": "Para kang jeep, kahit puno, lagi akong sasabit." },
  { "lang": "filipino", "affirmation": "Ang puso ko, parang MRT—lagi kang priority seat." },
  { "lang": "filipino", "affirmation": "Kung may reset button ang buhay, ikaw pa rin ang pipiliin ko." },
  { "lang": "filipino", "affirmation": "Para kang deadline—lagi kang nasa isip ko." },
  { "lang": "filipino", "affirmation": "Kung puso ko ay bahay, ikaw ang permanent resident." },
  { "lang": "filipino", "affirmation": "Ikaw ang dahilan kung bakit naniniwala pa rin ako sa magic." },
  { "lang": "filipino", "affirmation": "Parang group chat, hindi kumpleto ang araw ko kapag wala ka." },
  { "lang": "filipino", "affirmation": "Kung may wishlist ang puso ko, ikaw ang top item." },
  { "lang": "filipino", "affirmation": "Ikaw ang pahinga ko sa magulong mundo." },
  { "lang": "filipino", "affirmation": "Parang update, mas gumaganda ang buhay ko dahil sa’yo." },
  { "lang": "filipino", "affirmation": "Ikaw ang reason kung bakit okay lang mapagod." },
  { "lang": "filipino", "affirmation": "Kung may safe place ako, ikaw ‘yon." },
  { "lang": "filipino", "affirmation": "Ikaw ang notification na hinihintay ko araw-araw." },
  { "lang": "filipino", "affirmation": "Para kang ulan—kahit traffic, okay lang." },
  { "lang": "filipino", "affirmation": "Kung may lifetime warranty ang love, ikaw ang coverage ko." },
  { "lang": "filipino", "affirmation": "Ikaw ang dahilan kung bakit ako ngumiti kahit walang dahilan." },
  { "lang": "filipino", "affirmation": "Parang playlist, ikaw ang naka-repeat sa puso ko." },
  { "lang": "filipino", "affirmation": "Kung may favorite moment ako, ikaw ‘yon palagi." },
  { "lang": "filipino", "affirmation": "Ikaw ang comfort zone na ayokong iwan." },
  { "lang": "filipino", "affirmation": "Parang exam answer, ikaw ang sigurado ako." },
  { "lang": "filipino", "affirmation": "Ikaw ang dahilan kung bakit naniniwala ako sa forever." },
  { "lang": "filipino", "affirmation": "Kung may top fan badge sa buhay ko, sa’yo mapupunta." },
  { "lang": "filipino", "affirmation": "Ikaw ang pahinga sa pagitan ng chaos." },
  { "lang": "filipino", "affirmation": "Parang home button, sa’yo ako bumabalik." },
  { "lang": "filipino", "affirmation": "Ikaw ang smile ko sa bad days." },
  { "lang": "filipino", "affirmation": "Kung may bookmark ang puso, ikaw ang naka-save." },
  { "lang": "filipino", "affirmation": "Ikaw ang pinaka-sweet kong desisyon." },

  { "lang": "bisaya", "affirmation": "Kung cellphone ko ikaw, dili gyud tika i-lowbat." },
  { "lang": "bisaya", "affirmation": "Murag kape, ikaw ang akong reason nga energized ko pirmi." },
  { "lang": "bisaya", "affirmation": "Bisan unsa ka busy, naa gihapon kay VIP seat sa akong kasingkasing." },
  { "lang": "bisaya", "affirmation": "Murag signal sa Globe, lisod pero worth it kaayo." },
  { "lang": "bisaya", "affirmation": "Ikaw ang akong favorite nga notification." },
  { "lang": "bisaya", "affirmation": "Murag suga sa brownout, ikaw akong paglaum." },
  { "lang": "bisaya", "affirmation": "Dili ko kabalo mag-budget, pero ikaw pirmi akong priority." },
  { "lang": "bisaya", "affirmation": "Murag TikTok, dili ko kapoyan tan-aw sa imo." },
  { "lang": "bisaya", "affirmation": "Ikaw ang akong unlimited rice." },
  { "lang": "bisaya", "affirmation": "Murag ulan sa May, unexpected pero refreshing." },
  { "lang": "bisaya", "affirmation": "Ikaw ang akong Google—naa kay tubag sa tanan." },
  { "lang": "bisaya", "affirmation": "Kung playlist ka, ikaw akong repeat all." },
  { "lang": "bisaya", "affirmation": "Murag jeep, bisan puno kaayo akong adlaw, ikaw gihapon akong sabitan." },
  { "lang": "bisaya", "affirmation": "Kung k-drama ka, dili gyud ko kapugong binge-watch." },
  { "lang": "bisaya", "affirmation": "Ikaw ang akong lucky charm, bisan way sweldo." },
  { "lang": "bisaya", "affirmation": "Murag milk tea, makabusog ug makalipay." },
  { "lang": "bisaya", "affirmation": "Dili ka man wifi, pero ikaw ang akong connection." },
  { "lang": "bisaya", "affirmation": "Kung subject ka, honor student ko tungod nimo." },
  { "lang": "bisaya", "affirmation": "Murag jeepney fare, barato lang pero priceless para nako." },
  { "lang": "bisaya", "affirmation": "Ikaw ang akong rason nganong dili ko gusto matulog." },
  { "lang": "bisaya", "affirmation": "Ikaw ang pahulay sa akong kapoy nga adlaw." },
  { "lang": "bisaya", "affirmation": "Murag home, safe ko basta naa ka." },
  { "lang": "bisaya", "affirmation": "Ikaw ang akong favorite nga thought before matulog." },
  { "lang": "bisaya", "affirmation": "Kung adlaw ka, ikaw ang hayag nga kahayag." },
  { "lang": "bisaya", "affirmation": "Ikaw ang akong kalipay bisag walay rason." },
  { "lang": "bisaya", "affirmation": "Murag playlist, permi tika gina-repeat." },
  { "lang": "bisaya", "affirmation": "Ikaw ang akong pahimakas sa stress." },
  { "lang": "bisaya", "affirmation": "Kung naay forever, ikaw ang akong gusto." },
  { "lang": "bisaya", "affirmation": "Ikaw ang highlight sa akong adlaw." },
  { "lang": "bisaya", "affirmation": "Murag comfort food, ikaw ang akong go-to." },
  { "lang": "bisaya", "affirmation": "Ikaw ang akong rason nganong okay ra ko mapoy." },
  { "lang": "bisaya", "affirmation": "Kung naa koy safe space, ikaw na." },
  { "lang": "bisaya", "affirmation": "Ikaw ang smile nga automatic mogawas." },
  { "lang": "bisaya", "affirmation": "Murag update, mas nindot akong life tungod nimo." },
  { "lang": "bisaya", "affirmation": "Ikaw ang akong pinaka-nindot nga desisyon." },
  { "lang": "bisaya", "affirmation": "Kung naay top priority, ikaw to." },
  { "lang": "bisaya", "affirmation": "Ikaw ang pahumot sa akong adlaw." },
  { "lang": "bisaya", "affirmation": "Murag adlaw sa bakasyon, kalma basta naa ka." },
  { "lang": "bisaya", "affirmation": "Ikaw ang akong favorite nga memory." },
  { "lang": "bisaya", "affirmation": "Kung naa koy wish, ikaw ang una." },
  { "lang": "bisaya", "affirmation": "Ikaw ang pahulay sa kasaba." },
  { "lang": "bisaya", "affirmation": "Murag coffee break, kinahanglan tika." },
  { "lang": "bisaya", "affirmation": "Ikaw ang akong daily reminder nga okay ra ang tanan." },
  { "lang": "bisaya", "affirmation": "Kung kalipay ka, sobra pa ka." },
  { "lang": "bisaya", "affirmation": "Ikaw ang akong paborito nga thought." },

  { "lang": "english", "affirmation": "You’re like my favorite app—I can’t go a day without opening you." },
  { "lang": "english", "affirmation": "You’re the WiFi my heart automatically connects to." },
  { "lang": "english", "affirmation": "If love were currency, you’d be my lifetime savings." },
  { "lang": "english", "affirmation": "You’re the playlist I never skip." },
  { "lang": "english", "affirmation": "If kisses were likes, you’d go viral instantly." },
  { "lang": "english", "affirmation": "You’re the reason my Mondays don’t feel like Mondays." },
  { "lang": "english", "affirmation": "If my heart had a notification bar, you’d always be pinned." },
  { "lang": "english", "affirmation": "You’re the charger my soul plugs into." },
  { "lang": "english", "affirmation": "If you were a meme, you’d be the one everyone relates to." },
  { "lang": "english", "affirmation": "You’re my favorite plot twist." },
  { "lang": "english", "affirmation": "If love were WiFi, you’d be the strongest signal." },
  { "lang": "english", "affirmation": "You’re the dream I don’t want to snooze." },
  { "lang": "english", "affirmation": "You’re like my morning coffee—without you, I can’t function." },
  { "lang": "english", "affirmation": "You’re the forever in my playlist." },
  { "lang": "english", "affirmation": "You’re my life’s trending topic." },
  { "lang": "english", "affirmation": "If love had a search bar, your name would be the top result." },
  { "lang": "english", "affirmation": "You’re the bug in my system I’ll never fix." },
  { "lang": "english", "affirmation": "If love was a game, you’d be my final boss and prize." },
  { "lang": "english", "affirmation": "You’re the best push notification ever." },
  { "lang": "english", "affirmation": "If happiness were downloadable, you’d be my favorite file." },

  { "lang": "ilonggo", "affirmation": "Indi ka man rice cooker, pero ikaw ang nagahatag init sang akon adlaw." },
  { "lang": "ilonggo", "affirmation": "Murag kape sa umaga, ikaw ang nagapukaw sang akon kalipay." },
  { "lang": "ilonggo", "affirmation": "Ikaw ang akon unlimited load sa gugma." },
  { "lang": "ilonggo", "affirmation": "Kung jeep ka, indi ko gid pagpalampason." },
  { "lang": "ilonggo", "affirmation": "Para ka softdrinks, sweet kag refreshing pirmi." },
  { "lang": "ilonggo", "affirmation": "Indi ka man WiFi, pero ikaw ang akon signal nga kusog." },
  { "lang": "ilonggo", "affirmation": "Kung series ka, binge-watchon ta ka adlaw-adlaw." },
  { "lang": "ilonggo", "affirmation": "Ikaw ang akon 13th month pay—pinaka-expected nga regalo." },
  { "lang": "ilonggo", "affirmation": "Kung foodpanda order ka, ikaw ang indi ko gusto ma-cancel." },
  { "lang": "ilonggo", "affirmation": "Indi ka man game, pero ikaw ang pinaka-addicting sa akon." },
  { "lang": "ilonggo", "affirmation": "Kung cellphone ka, ikaw ang akon favorite nga app." },
  { "lang": "ilonggo", "affirmation": "Ikaw ang bugal nga indi ko na kaya itago." },
  { "lang": "ilonggo", "affirmation": "Kung ulan ka, indi ko na gusto nga magpayong." },
  { "lang": "ilonggo", "affirmation": "Ikaw ang pinaka-sweet nga dessert sa akon life." },
  { "lang": "ilonggo", "affirmation": "Murag jeep nga puno, pero ikaw gid ya ang sabitan ko." },
  { "lang": "ilonggo", "affirmation": "Kung kanta ka, indi ko pag-skipon bisan isa ka bes." },
  { "lang": "ilonggo", "affirmation": "Indi ka man Netflix, pero ikaw ang akon binge favorite." },
  { "lang": "ilonggo", "affirmation": "Kung chat ka, ikaw ang always seen first." },
  { "lang": "ilonggo", "affirmation": "Ikaw ang emoji nga permi ko ginagamit sa akon kabuhi." },
  { "lang": "ilonggo", "affirmation": "Kung taxi ka, indi ko gid pagpa-‘meter off’." }
]

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(process.cwd(), "index.html"))
})

app.get('/api', (req, res) => {
  const { lang } = req.query
  let arr = affirmations
  
  if (lang) {
    arr = filterArr(affirmations, lang)
  }

  const randomIndex = returnRandomItem(arr)
  res.status(200).json(arr[randomIndex])
})

app.get('*', (req, res) => {
  res.status(404).json({'error': 'not found'})
})

app.listen(port, () => {
    console.log(`listening on port ${port}!`)
})

function returnRandomItem(arr) {
  const len = arr.length
  let randomIndex = Math.floor(Math.random() * len)
  return randomIndex
}

function filterArr(arr, lang) {
  let newArr = arr.filter(element => element.lang === lang)
  return newArr
}