/* Study content for the app.
   Everything here is original (nothing is copied from the textbooks).
   Feel free to edit: add words, topics, questions. */

window.CONTENT = {

  /* Sources you can pick when adding your own words */
  sources: [
    "Vocabulary in Use Upper-Int",
    "Vocabulary in Use Advanced",
    "Phrasal Verbs in Use Advanced",
    "Outcomes Upper-Int",
    "Murphy Grammar in Use",
    "Murphy Supplementary",
    "Drozdova",
    "British Council",
    "IELTS tasks",
    "Other"
  ],

  /* Starter set: academic vocabulary and phrasal verbs (translations into Russian) */
  starterWords: [
    { en: "significant", ru: "значительный, существенный", ex: "There has been a significant rise in the number of people working from home." },
    { en: "to decline", ru: "снижаться, сокращаться", ex: "The birth rate declined steadily between 1990 and 2010." },
    { en: "to fluctuate", ru: "колебаться", ex: "Sales fluctuated throughout the year before settling at 2 million." },
    { en: "approximately", ru: "приблизительно", ex: "Approximately a third of respondents preferred public transport." },
    { en: "whereas", ru: "тогда как, в то время как", ex: "Younger users preferred video calls, whereas older users chose phone calls." },
    { en: "consequently", ru: "следовательно, в результате", ex: "Rents rose sharply; consequently, many students moved to the suburbs." },
    { en: "to tackle a problem", ru: "решать проблему, браться за проблему", ex: "Governments must tackle the problem of air pollution in big cities." },
    { en: "to raise awareness of", ru: "повышать осведомлённость о", ex: "Social media campaigns can raise awareness of mental health." },
    { en: "a detrimental effect on", ru: "пагубное влияние на", ex: "Lack of sleep has a detrimental effect on concentration." },
    { en: "beneficial", ru: "полезный, благоприятный", ex: "Learning a second language is beneficial for children's development." },
    { en: "to contribute to", ru: "способствовать, вносить вклад в", ex: "Tourism contributes significantly to the local economy." },
    { en: "widespread", ru: "широко распространённый", ex: "Smartphone use is now widespread among teenagers." },
    { en: "inevitable", ru: "неизбежный", ex: "Some job losses are inevitable as technology develops." },
    { en: "to alleviate", ru: "облегчать, смягчать", ex: "New bus routes could alleviate traffic congestion." },
    { en: "congestion", ru: "заторы, перегруженность", ex: "Traffic congestion is a major issue in many capital cities." },
    { en: "sustainable", ru: "устойчивый, экологичный", ex: "Cities need more sustainable forms of transport." },
    { en: "to outweigh", ru: "перевешивать", ex: "In my view, the advantages of remote work outweigh the drawbacks." },
    { en: "a drawback", ru: "недостаток, минус", ex: "The main drawback of online courses is the lack of face-to-face contact." },
    { en: "crucial", ru: "крайне важный, решающий", ex: "Regular practice is crucial for improving your speaking." },
    { en: "to be in favour of", ru: "выступать за, поддерживать", ex: "Many parents are in favour of shorter school holidays." },
    { en: "a growing number of", ru: "всё большее число", ex: "A growing number of people are choosing to live alone." },
    { en: "to undergo", ru: "претерпевать, проходить через", ex: "The city centre has undergone major changes over the past decade." },
    { en: "affordable", ru: "доступный по цене", ex: "Affordable housing is a priority for young families." },
    { en: "to rely on", ru: "полагаться на, зависеть от", ex: "Many elderly people rely on their families for support." },
    { en: "to address an issue", ru: "решать вопрос, заниматься проблемой", ex: "This essay will address both sides of the debate." },
    { en: "a wide range of", ru: "широкий спектр, большой выбор", ex: "The museum offers a wide range of activities for visitors." },
    { en: "to account for", ru: "составлять (долю); объяснять", ex: "Tourism accounts for 15% of the region's income." },
    { en: "to peak", ru: "достигать пика", ex: "Online sales peaked in December at 40,000 units." },
    { en: "to remain stable", ru: "оставаться стабильным", ex: "The unemployment rate remained stable at around 5%." },
    { en: "a sharp increase", ru: "резкий рост", ex: "There was a sharp increase in energy prices in the final quarter." },
    { en: "it is widely believed that", ru: "широко распространено мнение, что", ex: "It is widely believed that technology makes life easier." },
    { en: "to some extent", ru: "в некоторой степени", ex: "I agree with this view to some extent." },
    { en: "look into", ru: "изучать, разбираться в", ex: "The council promised to look into the complaints." },
    { en: "cut down on", ru: "сокращать (потребление)", ex: "I'm trying to cut down on sugar." },
    { en: "come up with", ru: "придумать, предложить (идею)", ex: "She came up with a brilliant solution." },
    { en: "put off", ru: "откладывать", ex: "Don't put off revision until the last week." },
    { en: "carry out", ru: "проводить, выполнять", ex: "Researchers carried out a survey of 500 students." },
    { en: "take up", ru: "начать заниматься (хобби, спортом)", ex: "I took up running last year." },
    { en: "bring about", ru: "вызывать, приводить к", ex: "The internet has brought about huge changes in how we work." },
    { en: "keep up with", ru: "не отставать от, быть в курсе", ex: "It's hard to keep up with all the new apps." }
  ],

  /* Grammar topics for IELTS, grouped (see grammarGroups and grammarOrder) */
  grammar: [
    {
      id: "pp-ps",
      group: "tenses",
      title: "Present Perfect vs Past Simple",
      rule: "Past Simple is for a finished action at a known time in the past: yesterday, in 2019, two years ago, last year. Present Perfect connects the past to now — a result now, or a period that is still going on: this year, so far, since, for, ever, never, already, yet.",
      ielts: "In Task 1, past years need the Past Simple. In Speaking, use the Present Perfect for life experience.",
      quiz: [
        { q: "I ___ in Lyon for two years, but now I live in Moscow.", o: ["have lived", "lived", "have been living", "was living"], a: 1, why: "The period is over (now I live in Moscow), so Past Simple." },
        { q: "The number of visitors ___ steadily since 2015.", o: ["rose", "has risen", "was rising", "had risen"], a: 1, why: "Since + a point in the past, and the trend continues: Present Perfect." },
        { q: "In 2010, the factory ___ 3,000 tonnes of steel.", o: ["produced", "has produced", "has been producing", "had been producing"], a: 0, why: "A specific past year: Past Simple. A very common Task 1 mistake." },
        { q: "___ you ever ___ a presentation in English?", o: ["Did … give", "Have … given", "Have … gave", "Do … give"], a: 1, why: "Ever = experience up to now: Present Perfect." },
        { q: "I ___ my homework yet, so I can't go out.", o: ["didn't finish", "haven't finished", "don't finish", "hadn't finished"], a: 1, why: "Yet in a negative: Present Perfect (British usage)." }
      ]
    },
    {
      id: "ppc",
      group: "tenses",
      title: "Present Perfect Continuous",
      rule: "Have/has been + -ing: an action that started in the past and is still going on (or has just stopped), when the duration matters: How long…? for…, since…. State verbs (know, believe, own, understand) only take the Present Perfect Simple.",
      ielts: "Useful in Speaking Part 1: I've been learning English for…, I've been living here since…",
      quiz: [
        { q: "I ___ English for three months, and I can already see progress.", o: ["have been studying", "am studying", "studied", "had studied"], a: 0, why: "Duration up to now, and the action continues." },
        { q: "She ___ him since they were at school.", o: ["has been knowing", "has known", "knows", "is knowing"], a: 1, why: "Know is a state verb, so no continuous form." },
        { q: "You look tired. ___ you ___ all night?", o: ["Have … been working", "Did … work", "Are … working", "Had … been working"], a: 0, why: "We can see the result of a recent long activity." },
        { q: "I ___ three essays this week.", o: ["have been writing", "have written", "write", "had written"], a: 1, why: "A number of finished results (three essays): Present Perfect Simple." },
        { q: "How long ___ for the bus? — About twenty minutes.", o: ["have you been waiting", "did you wait", "are you waiting", "do you wait"], a: 0, why: "How long + an action still in progress: Present Perfect Continuous." }
      ]
    },
    {
      id: "narrative",
      group: "tenses",
      title: "Narrative tenses",
      rule: "Past Continuous (was/were + -ing) sets the background — an action in progress at a past moment. Past Perfect (had + past participle) is for something that happened before another past action.",
      ielts: "Using a range of past tenses in Speaking Part 2 shows grammatical range.",
      quiz: [
        { q: "When I arrived at the station, the train ___.", o: ["already left", "had already left", "has already left", "was already leaving"], a: 1, why: "The train left before I arrived: Past Perfect." },
        { q: "I ___ dinner when my friend called.", o: ["cooked", "was cooking", "had cooked", "have cooked"], a: 1, why: "An action in progress interrupted by another: Past Continuous." },
        { q: "By 2020, the company ___ offices in five countries.", o: ["opened", "has opened", "had opened", "was opening"], a: 2, why: "By + a past point in time: Past Perfect." },
        { q: "She was nervous because she ___ in public before.", o: ["never spoke", "had never spoken", "has never spoken", "was never speaking"], a: 1, why: "Experience up to a moment in the past: Past Perfect." },
        { q: "While we ___ through the old town, it started to rain.", o: ["walked", "were walking", "had walked", "have walked"], a: 1, why: "While + a background action in progress: Past Continuous." }
      ]
    },
    {
      id: "future",
      group: "tenses",
      title: "Future forms",
      rule: "Will: a decision made at the moment of speaking, or a prediction based on opinion (I think…). Be going to: a plan, or a prediction based on present evidence. Present Continuous: a fixed arrangement (a meeting, a booked ticket). Future Perfect (will have + past participle): completed by a point in the future.",
      ielts: "In Task 2, hedge your predictions: is likely to, will probably, may well.",
      quiz: [
        { q: "Look at those clouds! It ___ rain.", o: ["will", "is going to", "rains", "is raining"], a: 1, why: "A prediction based on visible evidence: be going to." },
        { q: "I ___ my tutor at 5 pm tomorrow — we booked the lesson last week.", o: ["will meet", "am meeting", "meet", "will have met"], a: 1, why: "A fixed arrangement: Present Continuous." },
        { q: "The phone's ringing. — OK, I ___ it.", o: ["am going to answer", "will answer", "answer", "am answering"], a: 1, why: "A decision made at the moment of speaking: will." },
        { q: "Experts predict that the population ___ by 2050.", o: ["is doubling", "will have doubled", "has doubled", "doubles"], a: 1, why: "By + a future point: Future Perfect." },
        { q: "In the future, more people ___ likely to work remotely.", o: ["will", "are", "are going", "have"], a: 1, why: "The fixed phrase be likely to + verb." }
      ]
    },
    {
      id: "conditionals",
      group: "cond",
      title: "Conditionals",
      rule: "Zero: If + present, present (facts). First: If + present, will (a real future). Second: If + past, would (unreal present). Third: If + past perfect, would have + past participle (unreal past). Mixed: If + past perfect, would + verb (a past cause with a present result).",
      ielts: "In Task 2, the second conditional is great for suggesting solutions: If governments invested more…, fewer people would…",
      quiz: [
        { q: "If water reaches 100°C, it ___.", o: ["boils", "will boil", "would boil", "boiled"], a: 0, why: "A scientific fact: zero conditional." },
        { q: "If I ___ more time, I would read more books in English.", o: ["have", "had", "would have", "will have"], a: 1, why: "Unreal present: second conditional, If + past." },
        { q: "If she had prepared better, she ___ the exam.", o: ["would pass", "would have passed", "will pass", "passed"], a: 1, why: "Unreal past: third conditional." },
        { q: "If governments ___ public transport cheaper, fewer people would drive.", o: ["make", "made", "will make", "had made"], a: 1, why: "Second conditional: If + past, would + verb." },
        { q: "If I had taken that job in London, I ___ in the UK now.", o: ["would live", "would have lived", "will live", "lived"], a: 0, why: "Mixed conditional: a past decision, a result now." }
      ]
    },
    {
      id: "passive",
      group: "passive",
      title: "The passive",
      rule: "Be + past participle. Use it when the process or the result matters more than who did it. The tense is carried by be: is made, was made, has been made, will be made.",
      ielts: "Essential for Task 1 process diagrams, and it makes writing sound more academic: It is believed that…, …is expected to…",
      quiz: [
        { q: "First, the grapes ___ by hand and then taken to the winery.", o: ["pick", "are picked", "are picking", "have picked"], a: 1, why: "Describing a process: Present Simple passive." },
        { q: "The new bridge ___ next year.", o: ["will build", "will be built", "is building", "builds"], a: 1, why: "The bridge doesn't build itself: future passive, will be built." },
        { q: "It ___ that the city's population will continue to grow.", o: ["expects", "is expected", "has expected", "expected"], a: 1, why: "The impersonal structure It is expected that…" },
        { q: "The museum ___ since March because of repairs.", o: ["has closed", "has been closed", "is closed", "was closing"], a: 1, why: "Since + a state that continues: Present Perfect passive." },
        { q: "Over 2 million tickets ___ so far this year.", o: ["have bought", "have been bought", "were bought", "are bought"], a: 1, why: "So far: Present Perfect; people buy tickets, so passive." }
      ]
    },
    {
      id: "relative",
      group: "clauses",
      title: "Relative clauses",
      rule: "Who for people, which for things, that for both (only without commas), whose for possession, where for places, when for times. With commas (extra information), use only who or which — never that.",
      ielts: "Complex sentences with which and who raise your Grammatical Range score.",
      quiz: [
        { q: "The woman ___ taught me French now lives in Canada.", o: ["which", "who", "whose", "where"], a: 1, why: "A person: who." },
        { q: "Paris, ___ is the capital of France, attracts millions of tourists.", o: ["that", "which", "where", "what"], a: 1, why: "After a comma you can't use that — only which." },
        { q: "That's the café ___ we first met.", o: ["which", "where", "when", "that"], a: 1, why: "A place where something happened: where." },
        { q: "I have a friend ___ brother works at the British Council.", o: ["who", "whose", "which", "that"], a: 1, why: "Possession (her brother): whose." },
        { q: "The book ___ you recommended was really useful.", o: ["what", "who", "that", "where"], a: 2, why: "A thing, no commas: that or which. What is impossible here." }
      ]
    },
    {
      id: "articles",
      group: "nouns",
      title: "Articles",
      rule: "A/an: one of many, mentioned for the first time. The: a specific or already known thing, something unique (the government, the internet), and with superlatives. No article: general statements with plurals and uncountable nouns (Children need education).",
      ielts: "Article mistakes are the most common reason Russian speakers lose marks.",
      quiz: [
        { q: "___ unemployment is a serious problem in many countries.", o: ["The", "A", "An", "— (no article)"], a: 3, why: "An uncountable noun in a general sense: no article." },
        { q: "She is ___ honest person.", o: ["a", "an", "the", "— (no article)"], a: 1, why: "Honest starts with a vowel sound (the h is silent): an." },
        { q: "___ government should invest more in education.", o: ["A", "The", "— (no article)", "An"], a: 1, why: "The government of your country is unique: the." },
        { q: "This is ___ most expensive city I have ever visited.", o: ["a", "the", "— (no article)", "an"], a: 1, why: "A superlative: the." },
        { q: "I bought ___ book yesterday. ___ book is about climate change.", o: ["a … The", "the … A", "a … A", "— … The"], a: 0, why: "First mention: a; second mention (now known): the." }
      ]
    },
    {
      id: "comparisons",
      group: "describe",
      title: "Comparisons for Task 1",
      rule: "More/less … than, the highest/lowest, twice as many as, the same as. Intensifiers with comparatives: much, far, considerably, slightly (much higher, slightly lower).",
      ielts: "You need comparisons in every Task 1 — without them, Task Achievement suffers.",
      quiz: [
        { q: "Rents in the capital are ___ than in other cities.", o: ["much higher", "more higher", "much high", "highest"], a: 0, why: "Comparative + the intensifier much. More higher is a double comparative — a mistake." },
        { q: "Twice ___ people used the metro in 2025 as in 2015.", o: ["more", "as many", "as much", "many"], a: 1, why: "Twice as many + countable nouns (people)." },
        { q: "Laptop sales were ___ in December.", o: ["the highest", "the most high", "higher", "highest than"], a: 0, why: "Superlative of a short adjective: the highest." },
        { q: "The figure for women was ___ lower than for men.", o: ["slightly", "slight", "more slightly", "slightest"], a: 0, why: "Before an adjective you need an adverb: slightly lower." },
        { q: "Spending on transport was the same ___ spending on food.", o: ["than", "as", "like", "that"], a: 1, why: "The same as is a fixed structure." }
      ]
    },
    {
      id: "modals",
      group: "modals",
      title: "Modal verbs",
      rule: "Obligation: must, have to, need to. No obligation: don't have to, needn't. Advice: should, ought to. Probability: must (certain), might/may/could (possible), can't (impossible). About the past: must have, can't have, should have + past participle.",
      ielts: "Should and might help you soften claims in Task 2 — examiners value this academic style.",
      quiz: [
        { q: "You ___ pay to visit the museum — it's free on Sundays.", o: ["mustn't", "don't have to", "shouldn't", "can't"], a: 1, why: "No obligation: don't have to. Mustn't means it's forbidden." },
        { q: "She's not answering. She ___ be in a meeting.", o: ["must", "mustn't", "has to", "needn't"], a: 0, why: "A confident logical conclusion: must." },
        { q: "He ___ have seen my message — his phone was switched off all day.", o: ["can't", "must", "should", "has to"], a: 0, why: "Impossible in the past: can't have + past participle." },
        { q: "I think the government ___ ban cars from city centres.", o: ["should", "must have", "would have", "can't"], a: 0, why: "Opinion or advice: should." },
        { q: "I ___ have studied more. Now I regret it.", o: ["must", "should", "can", "would"], a: 1, why: "Regret about the past: should have + past participle." }
      ]
    },
    {
      id: "gerund",
      group: "clauses",
      title: "Gerund or infinitive",
      rule: "After enjoy, avoid, consider, suggest, mind, finish, keep, look forward to: -ing. After decide, plan, hope, agree, refuse, manage, want, afford: to + verb. After prepositions, always -ing: interested in learning.",
      ielts: "Examiners notice these mistakes in both Writing and Speaking.",
      quiz: [
        { q: "I'm interested in ___ abroad.", o: ["study", "to study", "studying", "studied"], a: 2, why: "After a preposition (in): -ing." },
        { q: "She decided ___ for a master's degree in the UK.", o: ["applying", "to apply", "apply", "applied"], a: 1, why: "Decide + to + verb." },
        { q: "I look forward to ___ from you.", o: ["hear", "to hear", "hearing", "heard"], a: 2, why: "In look forward to, to is a preposition, so -ing." },
        { q: "Many people avoid ___ public transport at rush hour.", o: ["using", "to use", "use", "used"], a: 0, why: "Avoid + -ing." },
        { q: "We can't afford ___ a car right now.", o: ["buying", "to buy", "buy", "bought"], a: 1, why: "Afford + to + verb." }
      ]
    },
    {
      id: "linking",
      group: "linking",
      title: "Linking words",
      rule: "Contrast: however, although + clause, despite/in spite of + noun or -ing, whereas. Reason: because, due to + noun, since. Result: therefore, consequently, as a result. Addition: moreover, in addition, furthermore.",
      ielts: "Coherence and Cohesion is a quarter of your Writing score. But don't overload your text with linkers.",
      quiz: [
        { q: "___ the high cost, many students choose to study abroad.", o: ["Although", "Despite", "However", "Because"], a: 1, why: "A noun follows (the high cost): despite. Although needs a full clause." },
        { q: "Public transport is cheap. ___, it is often overcrowded.", o: ["Although", "Despite", "However", "Whereas"], a: 2, why: "Contrast between two sentences, after a full stop: However, with a comma." },
        { q: "The flight was cancelled ___ bad weather.", o: ["because", "due to", "therefore", "although"], a: 1, why: "Reason + noun: due to. Because needs a clause (because the weather was bad)." },
        { q: "Prices rose sharply. ___, demand fell.", o: ["As a result", "Despite", "Although", "Whereas"], a: 0, why: "A consequence: As a result." },
        { q: "City life offers many jobs. ___, it provides better access to healthcare.", o: ["However", "Moreover", "Whereas", "Despite"], a: 1, why: "Adding another advantage: Moreover." }
      ]
    },
    {
      id: "pres-simple-cont",
      group: "tenses",
      title: "Present Simple vs Continuous",
      rule: "Present Simple: habits, routines, facts and permanent situations (I work from home; water boils at 100°C). Present Continuous: actions happening now or around now, temporary situations and changing trends (I'm reading a great book this week; prices are rising). State verbs — know, like, want, believe, belong, seem, understand — normally don't take the continuous.",
      ielts: "Speaking Part 1 is full of habits (I usually…) and current situations (At the moment I'm working on…). In Task 2, the Present Continuous describes trends: More people are choosing to…",
      quiz: [
        { q: "I usually ___ to work, but this week I ___ the bus because my bike is broken.", o: ["cycle … am taking", "am cycling … take", "cycle … take", "am cycling … am taking"], a: 0, why: "Usually = a habit (Present Simple); this week = a temporary situation (Present Continuous)." },
        { q: "Look! It ___ outside.", o: ["snows", "is snowing", "snowed", "has snowed"], a: 1, why: "Happening right now: Present Continuous." },
        { q: "I ___ what you mean.", o: ["understand", "am understanding", "was understanding", "have understood"], a: 0, why: "Understand is a state verb, so no continuous form." },
        { q: "The Earth ___ around the Sun.", o: ["goes", "is going", "went", "has gone"], a: 0, why: "A permanent fact: Present Simple." },
        { q: "Can you call back later? I ___ dinner right now.", o: ["cook", "am cooking", "cooked", "have cooked"], a: 1, why: "Right now: Present Continuous." }
      ]
    },
    {
      id: "future-perf",
      group: "tenses",
      title: "Future Continuous & Future Perfect",
      rule: "Future Continuous (will be + -ing): an action in progress at a moment in the future (This time next week I'll be lying on a beach). Future Perfect (will have + past participle): an action completed before a point in the future, often with by (By 2030, the city will have built a new metro line).",
      ielts: "Task 1 charts with projections (2030, 2040): By 2040 the figure will have reached… In Speaking Part 3: In twenty years, people will be working…",
      quiz: [
        { q: "This time tomorrow I ___ my IELTS Speaking test.", o: ["will take", "will be taking", "would take", "take"], a: 1, why: "In progress at a future moment (this time tomorrow): Future Continuous." },
        { q: "By the end of the year, I ___ all the units in this book.", o: ["finished", "will be finishing", "will have finished", "finish"], a: 2, why: "Completed before a future point (by the end of the year): Future Perfect." },
        { q: "By 2040, the number of electric cars ___ to 50 million.", o: ["rose", "will have risen", "is rising", "has risen"], a: 1, why: "By + a future year: Future Perfect. Typical for Task 1 projections." },
        { q: "Don't call at 8 — we ___ dinner then.", o: ["will have", "will be having", "will have had", "had"], a: 1, why: "An action in progress at 8 o'clock: Future Continuous." },
        { q: "___ you ___ the report by Friday?", o: ["Will … have finished", "Will … be finish", "Have … finished", "Do … finish"], a: 0, why: "Completed by a future deadline: Future Perfect." }
      ]
    },
    {
      id: "used-to",
      group: "tenses",
      title: "Used to, would, be used to",
      rule: "Used to + verb: a past habit or state that is no longer true (I used to live in France). Would + verb: repeated past actions only, not states (Every summer we would go to the sea). Be / get used to + -ing or a noun: be / become accustomed to something (I'm used to getting up early).",
      ielts: "Speaking Part 1 and 2 often ask how things have changed: I used to…, but now… Don't confuse it with I'm used to…",
      quiz: [
        { q: "I ___ coffee, but now I drink it every day.", o: ["didn't use to like", "wasn't used to like", "wouldn't like", "am not used to liking"], a: 0, why: "A past state that has changed: didn't use to + verb. Would doesn't work with states like like." },
        { q: "Living in Moscow, I'm used to ___ in the cold.", o: ["walk", "walking", "walked", "be walking"], a: 1, why: "Be used to + -ing = be accustomed to." },
        { q: "When I was a child, my grandmother ___ tell me stories every evening.", o: ["would", "was used to", "is used to", "use to"], a: 0, why: "A repeated past action: would (used to is also possible, but use to without -d is wrong)." },
        { q: "There ___ a cinema here, but it closed in 2015.", o: ["would be", "used to be", "was used to be", "is used to"], a: 1, why: "A past state: used to. Would is only for repeated actions." },
        { q: "It took me a while to ___ driving on the left.", o: ["use to", "get used to", "used to", "would"], a: 1, why: "Get used to + -ing = gradually become accustomed." }
      ]
    },
    {
      id: "deduction",
      group: "modals",
      title: "Modals of deduction",
      rule: "How sure are you? Present: must (I'm sure it's true), might / may / could (perhaps), can't (I'm sure it isn't true). Past: must have / might have / can't have / couldn't have + past participle. Mustn't is NOT the opposite of must here — use can't.",
      ielts: "Speaking Part 3 rewards speculation about causes and the future: It might have been because…, People may well…",
      quiz: [
        { q: "You've been travelling all day — you ___ be exhausted.", o: ["must", "can't", "mustn't", "should"], a: 0, why: "A confident conclusion: must." },
        { q: "That ___ be Anna at the door — she's in Paris this week.", o: ["mustn't", "can't", "must", "might"], a: 1, why: "Sure it's impossible: can't. Mustn't means 'it's forbidden'." },
        { q: "I'm not sure where my keys are. I ___ have left them at the office.", o: ["might", "can't", "mustn't", "shouldn't"], a: 0, why: "A past possibility: might have + past participle." },
        { q: "He ___ have finished the essay already — he only started ten minutes ago.", o: ["must", "can't", "should", "might"], a: 1, why: "Impossible in the past: can't have + past participle." },
        { q: "The streets are wet. It ___ rained in the night.", o: ["must have", "can't have", "should have", "must"], a: 0, why: "A confident conclusion about the past: must have + past participle." }
      ]
    },
    {
      id: "obligation",
      group: "modals",
      title: "Obligation and advice",
      rule: "Must: obligation the speaker feels, or written rules. Have to: obligation from outside (I have to wear a uniform). Mustn't: it's forbidden. Don't have to / needn't: it isn't necessary. Should / ought to: advice. Had better: strong advice for a specific situation. Needn't have done: you did it, but it wasn't necessary.",
      ielts: "In Task 2 solutions: Governments should…, Schools ought to…, Parents need to… Varying these is better than repeating should.",
      quiz: [
        { q: "You ___ smoke inside the building — it's against the law.", o: ["don't have to", "mustn't", "needn't", "shouldn't have"], a: 1, why: "It's forbidden: mustn't." },
        { q: "I ___ get up early tomorrow — it's Saturday!", o: ["mustn't", "don't have to", "have to", "must"], a: 1, why: "It isn't necessary: don't have to." },
        { q: "It's late. We ___ leave now or we'll miss the last train.", o: ["had better", "would rather", "needn't", "don't have to"], a: 0, why: "Strong advice with a warning (or…): had better." },
        { q: "I ___ have bought so much food — only three people came.", o: ["mustn't", "needn't", "couldn't", "can't"], a: 1, why: "Needn't have + past participle: I did it, but it wasn't necessary." },
        { q: "In my country, all children ___ go to school until the age of 16.", o: ["have to", "had better", "needn't", "ought"], a: 0, why: "An external rule (the law): have to. Ought needs to." }
      ]
    },
    {
      id: "cond-mixed",
      group: "cond",
      title: "Third and mixed conditionals",
      rule: "Third: If + past perfect, would have + past participle — an imagined past (If I had known, I would have come). Mixed (past → present): If + past perfect, would + verb (If I had studied medicine, I would be a doctor now). Mixed (present → past): If + past simple, would have + past participle (If I spoke Spanish, I would have got that job). Could have / might have show possibility.",
      ielts: "Band 7 Grammatical Range needs complex structures. A mixed conditional in Speaking Part 2 or 3 stands out.",
      quiz: [
        { q: "If I ___ about the traffic, I would have left earlier.", o: ["knew", "had known", "would know", "have known"], a: 1, why: "An imagined past: If + past perfect." },
        { q: "If she hadn't missed the train, she ___ here now.", o: ["would be", "would have been", "will be", "is"], a: 0, why: "Past cause, present result (now): mixed conditional, would + verb." },
        { q: "We ___ lost if we had taken a map.", o: ["wouldn't have got", "wouldn't get", "didn't get", "won't get"], a: 0, why: "Third conditional: would have + past participle." },
        { q: "If I hadn't moved to France, I ___ French so well today.", o: ["wouldn't speak", "wouldn't have spoken", "won't speak", "didn't speak"], a: 0, why: "Past cause, present result (today): would + verb." },
        { q: "If you had asked me, I ___ have helped you.", o: ["could", "can", "will", "would be"], a: 0, why: "Could have + past participle = a past possibility." }
      ]
    },
    {
      id: "wish",
      group: "cond",
      title: "Wish and if only",
      rule: "Wish + past simple: a wish about the present (I wish I lived by the sea). Wish + past perfect: a regret about the past (I wish I had started earlier). Wish + would: annoyance, or wanting someone else to change (I wish the neighbours would stop making noise). If only is a stronger version. In formal style, were is used for all persons (I wish I were…).",
      ielts: "Speaking Part 2 cue cards about regrets, goals and changes: I wish I had… / If only I could…",
      quiz: [
        { q: "I wish I ___ more free time — I'm always busy.", o: ["have", "had", "would have", "had had"], a: 1, why: "A wish about the present: wish + past simple." },
        { q: "I wish I ___ harder at school. Now it's too late.", o: ["studied", "had studied", "would study", "study"], a: 1, why: "A regret about the past: wish + past perfect." },
        { q: "I wish you ___ interrupting me!", o: ["stop", "stopped", "would stop", "had stopped"], a: 2, why: "Annoyance at someone's behaviour: wish + would." },
        { q: "If only I ___ how to drive — I could get to work much faster.", o: ["know", "knew", "had known", "would know"], a: 1, why: "An unreal present: if only + past simple." },
        { q: "She wishes she ___ that job offer last year.", o: ["accepted", "had accepted", "would accept", "accepts"], a: 1, why: "Last year = the past: wish + past perfect." }
      ]
    },
    {
      id: "unless",
      group: "cond",
      title: "Unless, as long as, in case",
      rule: "Unless = if … not (I won't go unless you come). As long as / provided (that) / providing = only if (You can borrow it as long as you return it). In case = as a precaution, because something might happen (Take an umbrella in case it rains) — it isn't the same as if. After all of these, and after when / before / until, use a present tense for the future.",
      ielts: "These add precision to Task 2 arguments: Remote work is effective provided that employees are well organised.",
      quiz: [
        { q: "You won't improve ___ you practise every day.", o: ["unless", "if", "in case", "provided"], a: 0, why: "Unless = if you don't practise." },
        { q: "Take some cash ___ the card machine doesn't work.", o: ["unless", "in case", "as long as", "provided"], a: 1, why: "A precaution against something that might happen: in case." },
        { q: "You can use my laptop ___ you're careful with it.", o: ["unless", "in case", "as long as", "even if"], a: 2, why: "A condition (only if): as long as." },
        { q: "I'll call you when I ___ at the airport.", o: ["will arrive", "arrive", "arrived", "would arrive"], a: 1, why: "After when, use the present for the future." },
        { q: "Tourism benefits local communities ___ it is properly managed.", o: ["unless", "provided that", "in case", "whereas"], a: 1, why: "Only on this condition: provided that." }
      ]
    },
    {
      id: "causative",
      group: "passive",
      title: "Have something done & reporting passive",
      rule: "Have / get + object + past participle: someone else does a service for you (I had my hair cut; we're getting the flat painted). It also describes bad experiences: She had her phone stolen. The reporting passive: It is said that… / He is said to be… / They are believed to have left… (to have + past participle for an earlier action).",
      ielts: "The reporting passive (is thought to, is believed to) makes Task 2 sound objective and academic.",
      quiz: [
        { q: "I ___ my eyes tested last week.", o: ["had", "made", "did", "was"], a: 0, why: "A service done for you: have + object + past participle." },
        { q: "We're having the kitchen ___ next month.", o: ["redecorate", "redecorated", "redecorating", "to redecorate"], a: 1, why: "Have + object + past participle." },
        { q: "He ___ his wallet stolen on the metro.", o: ["had", "made", "was", "got to"], a: 0, why: "A bad experience: had + object + past participle." },
        { q: "The castle ___ to be over 800 years old.", o: ["says", "is said", "said", "is saying"], a: 1, why: "Reporting passive: is said to + verb." },
        { q: "The thieves are believed ___ the country.", o: ["to leave", "to have left", "leaving", "have left"], a: 1, why: "An earlier action: to have + past participle." }
      ]
    },
    {
      id: "reported",
      group: "passive",
      title: "Reported speech",
      rule: "When the reporting verb is in the past, tenses usually move back: am → was, will → would, have done / did → had done. Time and place words change: tomorrow → the next day, here → there. Reported questions use statement word order: She asked where I lived (not where did I live). Commands: told me to… / told me not to… Use precise verbs: suggest, admit, deny, warn, explain.",
      ielts: "Reporting verbs (claim, argue, suggest) are essential in Task 2: Some people argue that…",
      quiz: [
        { q: "She said she ___ tired.", o: ["is being", "was", "has been being", "be"], a: 1, why: "Am → was after a past reporting verb." },
        { q: "He asked me where ___.", o: ["do I live", "I lived", "did I live", "lived I"], a: 1, why: "Reported questions use statement word order, no did." },
        { q: "Tom said he ___ call me the next day.", o: ["will", "would", "shall", "can't to"], a: 1, why: "Will → would." },
        { q: "The teacher told us ___ late again.", o: ["not to be", "don't be", "to not being", "not be"], a: 0, why: "A reported command: told + object + (not) to + verb." },
        { q: "She ___ that she had made a mistake.", o: ["admitted", "told", "said me", "asked"], a: 0, why: "Admit + that. Told needs an object (told me that); said me is wrong." }
      ]
    },
    {
      id: "questions",
      group: "passive",
      title: "Indirect questions and question tags",
      rule: "Indirect questions sound more polite: Could you tell me where the station is? After the opening phrase, use statement word order and no do / does / did. Yes / no questions use if or whether: Do you know if the shop is open? Question tags repeat the auxiliary with the opposite polarity: It's cold, isn't it? You didn't call, did you?",
      ielts: "Useful in Speaking when you need clarification: Could you tell me what … means?",
      quiz: [
        { q: "Could you tell me what time ___?", o: ["does the library open", "the library opens", "opens the library", "did the library open"], a: 1, why: "Indirect question: statement word order, no does." },
        { q: "Do you know ___ the exam is on Saturday?", o: ["does", "if", "what", "is"], a: 1, why: "A yes / no indirect question: if or whether." },
        { q: "You're from Moscow, ___?", o: ["isn't it", "aren't you", "don't you", "weren't you"], a: 1, why: "Positive sentence with are → negative tag aren't you." },
        { q: "She didn't pass the test, ___?", o: ["didn't she", "did she", "does she", "wasn't she"], a: 1, why: "Negative sentence → positive tag did she." },
        { q: "I wonder why ___ so expensive.", o: ["is London", "London is", "does London", "London does be"], a: 1, why: "Statement word order after I wonder why." }
      ]
    },
    {
      id: "quantifiers",
      group: "nouns",
      title: "Countable, uncountable, quantifiers",
      rule: "Uncountable nouns have no plural and no a / an: information, advice, research, evidence, equipment, accommodation, news, traffic, knowledge. Many / (a) few / fewer + countable; much / (a) little / less + uncountable; a lot of, some, any, most + both. A few / a little = some; few / little = not enough.",
      ielts: "Research, advice, information and evidence are very common in Task 2 — and very often written with -s by mistake. In Task 1: fewer people, less money.",
      quiz: [
        { q: "Can you give me some ___ about the visa process?", o: ["advices", "advice", "an advice", "advise"], a: 1, why: "Advice is uncountable: no -s, no an. Advise is the verb." },
        { q: "There were ___ cars on the road than last year.", o: ["less", "fewer", "little", "much"], a: 1, why: "Cars are countable: fewer." },
        { q: "Recent ___ shows that exercise improves memory.", o: ["researches", "research", "a research", "many research"], a: 1, why: "Research is uncountable and takes a singular verb (shows)." },
        { q: "I have ___ time, so let's have a quick coffee.", o: ["a little", "a few", "few", "many"], a: 0, why: "Time (uncountable) + some = a little." },
        { q: "How ___ luggage do you have?", o: ["many", "much", "few", "lots"], a: 1, why: "Luggage is uncountable: how much." }
      ]
    },
    {
      id: "agreement",
      group: "nouns",
      title: "Subject–verb agreement",
      rule: "The verb agrees with the main noun of the subject, not the nearest noun: The number of students has risen (the number = singular), but A number of students have complained (= several, plural). Everyone, each, every, nobody take a singular verb. Uncountable nouns are singular: The news is good. Two subjects joined by and are plural.",
      ielts: "Task 1 is full of the number of, the proportion of, the percentage of — all singular.",
      quiz: [
        { q: "The number of tourists ___ doubled since 2010.", o: ["have", "has", "are", "were"], a: 1, why: "The number (singular) is the subject: has." },
        { q: "A number of residents ___ about the noise.", o: ["has complained", "have complained", "complains", "is complaining"], a: 1, why: "A number of = several: plural verb." },
        { q: "Everyone in my family ___ English.", o: ["speak", "speaks", "are speaking", "have spoken"], a: 1, why: "Everyone takes a singular verb." },
        { q: "The proportion of women in senior roles ___ increasing.", o: ["is", "are", "were", "have"], a: 0, why: "The proportion (singular) is the subject, not women." },
        { q: "The information on these websites ___ not always reliable.", o: ["are", "is", "were", "have been"], a: 1, why: "Information is uncountable: singular verb." }
      ]
    },
    {
      id: "participle",
      group: "clauses",
      title: "Participle clauses",
      rule: "Participle clauses make sentences shorter and more formal. -ing = active, or at the same time (Feeling tired, I went to bed). Past participle = passive (Built in 1890, the bridge is a landmark). Having + past participle = an earlier action (Having finished the test, she left). Reduced relative clauses: the people living here = who live here; the goods produced = which are produced.",
      ielts: "Great for Task 1 processes and maps: The grapes, picked by hand, are then…; Located in the north, the park…",
      quiz: [
        { q: "___ in 1889, the Eiffel Tower is now a symbol of Paris.", o: ["Building", "Built", "Having built", "To build"], a: 1, why: "The tower was built (passive): past participle." },
        { q: "___ her homework, she went out with friends.", o: ["Having finished", "Finished", "Being finished", "To finish"], a: 0, why: "An earlier action: having + past participle." },
        { q: "Most of the people ___ in the survey were under 30.", o: ["interviewing", "interviewed", "who interviewed", "interview"], a: 1, why: "The people were interviewed (passive): interviewed = who were interviewed." },
        { q: "___ along the river, we saw an old castle.", o: ["Walked", "Walking", "Walk", "To be walking"], a: 1, why: "At the same time, active: -ing." },
        { q: "Students ___ to study abroad should apply early.", o: ["wishing", "wished", "who wishing", "wish"], a: 0, why: "Wishing = who wish (active)." }
      ]
    },
    {
      id: "contrast",
      group: "linking",
      title: "Contrast: although, despite, whereas",
      rule: "Although / even though / though + clause. Despite / in spite of + noun or -ing (despite the rain, despite being tired). Despite the fact that + clause. However, nevertheless and on the other hand start a new sentence. Whereas / while compare two facts (Men preferred football, whereas women…). Even though is stronger than although.",
      ielts: "Task 1 comparisons and Task 2 balanced arguments both depend on contrast — and on the right grammar after each linker.",
      quiz: [
        { q: "___ being the cheapest option, the bus was the least popular.", o: ["Although", "Despite", "Even though", "However"], a: 1, why: "-ing follows: despite. Although needs a full clause." },
        { q: "___ the fact that prices rose, sales continued to grow.", o: ["Although", "Despite", "In spite", "Whereas"], a: 1, why: "Despite the fact that + clause. In spite needs of." },
        { q: "In 2000, 60% of households had a landline, ___ only 10% had one in 2020.", o: ["despite", "whereas", "however", "in spite of"], a: 1, why: "Comparing two facts in one sentence: whereas." },
        { q: "The plan was expensive. ___, the council approved it.", o: ["Nevertheless", "Although", "Despite", "Whereas"], a: 0, why: "Contrast with the previous sentence: Nevertheless + comma." },
        { q: "___ he had lived in London for years, he had never been to the British Museum.", o: ["Even though", "Despite", "In spite of", "However"], a: 0, why: "A full clause follows: even though." }
      ]
    },
    {
      id: "so-such",
      group: "describe",
      title: "So, such, too, enough",
      rule: "So + adjective / adverb (so expensive, so quickly); such (a / an) + (adjective) + noun (such a long day, such expensive flats). Too + adjective = more than needed, often with a negative result (too small to live in). Adjective + enough; enough + noun (old enough, enough money).",
      ielts: "Speaking Part 2: It was such an amazing experience that… — a natural way to add emphasis.",
      quiz: [
        { q: "It was ___ interesting lecture that nobody left early.", o: ["so", "such an", "such", "so an"], a: 1, why: "Such + a / an + adjective + noun." },
        { q: "The coffee was ___ hot to drink.", o: ["so", "too", "enough", "such"], a: 1, why: "More than is good, with to + verb: too." },
        { q: "He isn't old ___ to vote.", o: ["too", "enough", "so", "such"], a: 1, why: "Adjective + enough." },
        { q: "The flats were ___ expensive that we couldn't afford one.", o: ["such", "so", "too", "enough"], a: 1, why: "So + adjective + that." },
        { q: "We don't have ___ to buy a house yet.", o: ["money enough", "enough money", "too money", "so money"], a: 1, why: "Enough comes before a noun." }
      ]
    },
    {
      id: "trends",
      group: "describe",
      title: "Describing trends and numbers",
      rule: "Verb + adverb: rose sharply, fell slightly, increased steadily, fluctuated wildly. Adjective + noun: a sharp rise, a slight fall, a steady increase. Prepositions: rose by 10% (the difference), rose to 50% (the final figure), from 20% to 50%, peaked at 30% (a point), a rise of 10% (noun + of). Approximation: approximately, roughly, just over, nearly, well below.",
      ielts: "Band 7 in Task 1 needs accurate trend language and variety — mix the verb pattern and the noun pattern.",
      quiz: [
        { q: "Sales rose ___ 15% in 2019, reaching 2 million units.", o: ["to", "by", "at", "of"], a: 1, why: "The size of the change: by." },
        { q: "Unemployment fell ___ 8% to 5%.", o: ["since", "from", "at", "of"], a: 1, why: "From … to … shows the start and the end." },
        { q: "There was a ___ increase in prices in the final quarter.", o: ["sharply", "sharp", "sharpness", "sharpen"], a: 1, why: "Before a noun (increase), use an adjective." },
        { q: "The price of oil peaked ___ $120 a barrel.", o: ["by", "at", "on", "to"], a: 1, why: "A point on the graph: peaked at." },
        { q: "The number of visitors ___ dramatically over the decade.", o: ["increased", "was increase", "rise", "has rose"], a: 0, why: "Verb + adverb: increased dramatically. The number is singular, so rise is wrong." }
      ]
    },
    {
      id: "prep-time-place",
      group: "linking",
      title: "Prepositions of time and place",
      rule: "Time: at + clock times and holidays (at 5 pm, at the weekend — British), on + days and dates (on Monday, on 3 October), in + months, years, seasons and parts of the day (in 2020, in the morning). Place: at a point (at the station), on a surface or line (on the wall, on the coast), in an enclosed space or area (in the room, in Paris). During + noun, for + a period, by = not later than, until = up to.",
      ielts: "Task 1 maps and Speaking Part 1 (Where do you live?) need accurate prepositions of place.",
      quiz: [
        { q: "The exam is ___ 23 January.", o: ["in", "on", "at", "by"], a: 1, why: "A date: on." },
        { q: "I was born ___ 1999.", o: ["on", "at", "in", "by"], a: 2, why: "A year: in." },
        { q: "The new hospital was built ___ the north of the city.", o: ["at", "on", "in", "into"], a: 2, why: "An area inside the city: in the north of." },
        { q: "Please send me the essay ___ Friday at the latest.", o: ["until", "by", "during", "in"], a: 1, why: "A deadline (not later than): by." },
        { q: "I fell asleep ___ the film.", o: ["while", "during", "for", "since"], a: 1, why: "During + noun. While needs a clause (while I was watching…)." }
      ]
    },
    {
      id: "dep-prep",
      group: "linking",
      title: "Dependent prepositions",
      rule: "Many nouns, adjectives and verbs need a fixed preposition — learn them as chunks: interested in, responsible for, aware of, similar to, different from, good at; depend on, rely on, contribute to, focus on, consist of, suffer from; a reason for, an increase in, the cause of, access to, an impact on, demand for.",
      ielts: "Task 2 uses these constantly: an impact on, access to, responsible for. Wrong prepositions are a typical B1–B2 error.",
      quiz: [
        { q: "Social media has a huge impact ___ young people.", o: ["in", "on", "to", "for"], a: 1, why: "An impact on." },
        { q: "There has been a sharp increase ___ house prices.", o: ["of", "in", "on", "at"], a: 1, why: "An increase in + the thing that grows (an increase of + the amount: of 10%)." },
        { q: "Many students depend ___ their parents for money.", o: ["of", "from", "on", "to"], a: 2, why: "Depend on." },
        { q: "Everyone should have access ___ clean water.", o: ["for", "to", "at", "of"], a: 1, why: "Access to." },
        { q: "Who is responsible ___ this project?", o: ["of", "to", "for", "about"], a: 2, why: "Responsible for." }
      ]
    },
    {
      id: "inversion",
      group: "academic",
      title: "Inversion for emphasis",
      rule: "After a negative or limiting expression at the start of a sentence, use question word order: Never have I seen… / Not only does it save time, but it also… / Rarely do people… / Only then did I realise… / Under no circumstances should… Formal conditionals also invert: Had I known… (= If I had known), Should you need help… (= If you need help).",
      ielts: "One or two inversions in Task 2 or Speaking Part 3 show Band 7+ range — don't overuse them.",
      quiz: [
        { q: "Not only ___ cheaper, but it is also faster.", o: ["the train is", "is the train", "does the train", "the train be"], a: 1, why: "Not only at the start: question word order (is the train)." },
        { q: "Never ___ such a beautiful sunset.", o: ["I have seen", "have I seen", "I saw", "did I saw"], a: 1, why: "Never at the start: have I seen." },
        { q: "Rarely ___ people admit their mistakes.", o: ["do", "are", "have", "does"], a: 0, why: "Present Simple → do + subject + verb (people = plural)." },
        { q: "___ I known about the strike, I would have taken a taxi.", o: ["If", "Had", "Have", "Should"], a: 1, why: "Had I known = If I had known (third conditional)." },
        { q: "Only after the results came out ___ how well she had done.", o: ["she realised", "did she realise", "she did realise", "realised she"], a: 1, why: "Only after … : inversion with did." }
      ]
    },
    {
      id: "cleft",
      group: "academic",
      title: "Cleft sentences",
      rule: "Cleft sentences put the focus on one part of the sentence. It + be + focus + that / who: It was my teacher who encouraged me (not my parents). What + clause + be: What I enjoy most is travelling. What surprised me was the price. Also: All I want is…, The reason why… is that…, The thing that…",
      ielts: "Very natural in Speaking: What I like most about my city is… — an easy way to show range.",
      quiz: [
        { q: "___ I love about Paris is the architecture.", o: ["That", "What", "Which", "It"], a: 1, why: "What + clause + be." },
        { q: "It was the price ___ surprised me most.", o: ["what", "that", "where", "when"], a: 1, why: "It was … that." },
        { q: "What I need ___ a good night's sleep.", o: ["are", "is", "being", "to be"], a: 1, why: "A what-clause is singular: is." },
        { q: "___ was only when I moved abroad that I understood my parents.", o: ["What", "It", "This", "There"], a: 1, why: "It was only when … that …" },
        { q: "The reason ___ I chose this course is that it includes an internship.", o: ["why", "because", "what", "for"], a: 0, why: "The reason why … is that …" }
      ]
    },
    {
      id: "nominal",
      group: "academic",
      title: "Nominalisation (academic style)",
      rule: "Academic writing often turns verbs and adjectives into nouns: increase → an increase, develop → the development of, fail → failure, able → the ability to, important → the importance of. Instead of 'Prices increased quickly, and this worried people', write 'The rapid increase in prices caused concern'. Adjectives then describe the noun: a rapid increase, a significant decline.",
      ielts: "Nominalisation makes Task 2 sound academic and helps you avoid repetition. Use it in moderation — clarity comes first.",
      quiz: [
        { q: "The ___ of new technology has changed the way we work.", o: ["introduce", "introduction", "introducing of", "introduced"], a: 1, why: "After the, you need a noun: introduction." },
        { q: "There has been a significant ___ in the crime rate.", o: ["reduce", "reduction", "reducing", "reduced"], a: 1, why: "A + adjective + noun: a significant reduction." },
        { q: "The government's ___ to act has been widely criticised.", o: ["fail", "fails", "failure", "failed"], a: 2, why: "Possessive + noun: the government's failure." },
        { q: "Many people underestimate the ___ of sleep.", o: ["important", "importance", "importantly", "import"], a: 1, why: "The + noun + of: the importance of." },
        { q: "Which sentence sounds most academic?", o: ["Lots of people moved to cities, so cities grew fast.", "The mass migration to cities led to rapid urban growth.", "Cities got really big because people moved there.", "People moved, and cities grew."], a: 1, why: "Nouns (migration, growth) and precise adjectives make the style academic." }
      ]
    },
    {
      id: "hedging",
      group: "academic",
      title: "Hedging and cautious language",
      rule: "Academic writers avoid absolute claims. Use modal verbs (may, might, could), adverbs (possibly, probably, arguably, generally), verbs (tend to, appear to, seem to, suggest) and phrases (It could be argued that…, There is some evidence that…, To some extent…). Avoid always, never and everyone unless you are sure.",
      ielts: "Hedging shows a mature, balanced position in Task 2, and it helps in Speaking Part 3 when you aren't sure.",
      quiz: [
        { q: "Which is the most cautious claim?", o: ["Social media destroys teenagers' mental health.", "Social media may have a negative effect on some teenagers.", "Social media always harms teenagers.", "Everyone agrees that social media is bad."], a: 1, why: "May + some = a careful, academic claim." },
        { q: "Young people ___ to spend more time online than older generations.", o: ["tend", "are tend", "tends", "tending"], a: 0, why: "Tend to + verb (young people = plural)." },
        { q: "It could be ___ that online learning is less effective for young children.", o: ["argue", "argued", "arguing", "to argue"], a: 1, why: "It could be argued that… (passive)." },
        { q: "The results ___ that the new method is effective.", o: ["are suggest", "suggest", "suggesting", "suggests to"], a: 1, why: "Suggest that… is a cautious reporting verb." },
        { q: "This is ___ the most important problem facing cities today.", o: ["arguable", "arguably", "argue", "argued"], a: 1, why: "An adverb before the superlative: arguably." }
      ]
    }
  ],

  /* Writing Task 2 — 40 minutes, at least 250 words */
  task2: [
    { id: "t2-uni", type: "discuss", text: "Some people believe that university education should be free for everyone, while others think that students should pay for their own studies. Discuss both views and give your own opinion." },
    { id: "t2-home", type: "advdis", text: "In many countries, an increasing number of people are working from home rather than in an office. Do the advantages of this trend outweigh the disadvantages?" },
    { id: "t2-tourism", type: "problem", text: "Tourism brings many benefits to a country, but it can also cause problems for local people and the environment. What are these problems, and how can they be reduced?" },
    { id: "t2-screens", type: "positive", text: "Children today spend several hours a day using smartphones and computers. Is this a positive or a negative development?" },
    { id: "t2-transport", type: "opinion", text: "Governments should spend money on improving public transport rather than building new roads. To what extent do you agree or disagree?" },
    { id: "t2-languages", type: "opinion", text: "Some people say that learning a foreign language at school is becoming unnecessary because translation technology is improving so quickly. To what extent do you agree or disagree?" },
    { id: "t2-cities", type: "twopart", text: "More and more people are leaving the countryside to live and work in big cities. Why is this happening? What problems does it cause?" },
    { id: "t2-museums", type: "discuss", text: "Some people think that museums and art galleries should be free for all visitors, while others believe that visitors should pay for entry. Discuss both views and give your own opinion." },
    { id: "t2-clothes", type: "twopart", text: "Many people buy cheap clothes and wear them only a few times before throwing them away. Why do people do this? What effect does it have on the environment?" },
    { id: "t2-online", type: "opinion", text: "Online learning will soon replace traditional classrooms. To what extent do you agree or disagree?" }
  ],

  /* Essay structure by task type */
  task2Types: {
    discuss: { name: "Discuss both views", plan: ["Introduction: paraphrase the topic and state your position straight away.", "Body 1: the first view — a reason and an example.", "Body 2: the second view — a reason and an example; show which side you agree with and why.", "Conclusion: briefly restate both sides and your opinion."] },
    opinion: { name: "Agree or disagree", plan: ["Introduction: paraphrase the statement and say clearly how far you agree.", "Body 1: your main argument + an example.", "Body 2: a second argument (or acknowledge the other side and explain why it is weaker).", "Conclusion: restate your position in different words."] },
    advdis: { name: "Advantages vs disadvantages", plan: ["Introduction: paraphrase and answer straight away which side outweighs.", "Body 1: the side you think is weaker.", "Body 2: the side that outweighs, with stronger examples.", "Conclusion: answer the question again."] },
    problem: { name: "Problems and solutions", plan: ["Introduction: paraphrase the topic and say what you will cover.", "Body 1: two main problems, explained.", "Body 2: a solution for each problem (who should do what).", "Conclusion: briefly sum up."] },
    positive: { name: "Positive or negative", plan: ["Introduction: paraphrase and give your verdict straight away: mostly positive or mostly negative.", "Body 1: the other side's arguments (briefly).", "Body 2: your main arguments with examples.", "Conclusion: restate your verdict."] },
    twopart: { name: "Two-part question", plan: ["Introduction: paraphrase the topic and mention both questions.", "Body 1: answer the first question (two reasons).", "Body 2: answer the second question (two effects or opinions).", "Conclusion: briefly answer both questions."] }
  },

  task2Phrases: [
    "It is often argued that…",
    "In my view, … / I firmly believe that…",
    "One reason for this is that…",
    "For example, … / A good illustration of this is…",
    "On the other hand, …",
    "This means that… / As a result, …",
    "Admittedly, … However, …",
    "In conclusion, …"
  ],

  /* Writing Task 1 (Academic) — 20 minutes, at least 150 words. Sample data. */
  task1: [
    {
      id: "t1-water",
      text: "The graph below shows the average amount of water used per person per day in a city between 2000 and 2025, by purpose. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      chart: {
        type: "line", unit: "litres per person per day",
        categories: ["2000", "2005", "2010", "2015", "2020", "2025"],
        series: [
          { name: "Showering", values: [45, 50, 55, 58, 62, 60] },
          { name: "Laundry", values: [30, 28, 25, 22, 20, 18] },
          { name: "Garden", values: [15, 18, 20, 20, 16, 14] },
          { name: "Drinking and cooking", values: [10, 10, 11, 11, 12, 12] }
        ]
      }
    },
    {
      id: "t1-museums",
      text: "The chart below shows the number of visitors to three museums in a city from January to June. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      chart: {
        type: "bar", unit: "visitors, thousands",
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        series: [
          { name: "History Museum", values: [40, 35, 45, 50, 60, 75] },
          { name: "Science Centre", values: [55, 60, 50, 45, 40, 38] },
          { name: "Art Gallery", values: [20, 22, 30, 35, 33, 40] }
        ]
      }
    },
    {
      id: "t1-internet",
      text: "The table below shows the percentage of households with internet access in four countries in 2005, 2015 and 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      chart: {
        type: "table", unit: "% of households", rowHead: "Country",
        categories: ["2005", "2015", "2025"],
        rows: [
          { name: "Country A", values: [45, 78, 96] },
          { name: "Country B", values: [20, 55, 88] },
          { name: "Country C", values: [60, 85, 97] },
          { name: "Country D", values: [8, 30, 71] }
        ]
      }
    },
    {
      id: "t1-leisure",
      text: "The table below shows the average number of hours per week that people in different age groups spent on four leisure activities in 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      chart: {
        type: "table", unit: "hours per week", rowHead: "Age group",
        categories: ["Watching TV", "Social media", "Sport", "Reading"],
        rows: [
          { name: "16–24", values: [8, 18, 5, 3] },
          { name: "25–44", values: [10, 12, 4, 4] },
          { name: "45–64", values: [14, 7, 3, 5] },
          { name: "65+", values: [21, 3, 2, 8] }
        ]
      }
    }
  ],

  task1Plan: [
    "Introduction: one sentence — paraphrase what the chart shows.",
    "Overview: two main trends with no numbers (what rose, what fell, what is biggest). Without an overview you can't get above 5 for Task Achievement.",
    "Body 1: group similar data and give the key figures.",
    "Body 2: the rest of the data and comparisons. No personal opinion."
  ],

  task1Phrases: [
    "The graph illustrates… / The table compares…",
    "Overall, it is clear that…",
    "…rose sharply from X to Y",
    "…fell gradually to…",
    "…remained stable at around…",
    "…peaked at… in…",
    "…accounted for the largest share…",
    "By contrast, … / Similarly, …"
  ],

  /* Self-check against the four Writing criteria */
  checklist: {
    t2: [
      { crit: "Task Response", items: ["I answered every part of the question", "My position is clear in the introduction and conclusion", "Each argument is explained and supported with an example", "At least 250 words"] },
      { crit: "Coherence & Cohesion", items: ["One main idea per paragraph", "Varied linking words, not however every time", "Pronouns and synonyms instead of repetition"] },
      { crit: "Lexical Resource", items: ["I paraphrased the task instead of copying it", "I used 3+ new words or collocations", "I checked my spelling"] },
      { crit: "Grammatical Range & Accuracy", items: ["Complex sentences (although, which, if…)", "Tenses and agreement checked", "Articles checked"] }
    ],
    t1: [
      { crit: "Task Achievement", items: ["There is an overview of the main trends", "Key figures selected, not every number", "No personal opinion", "At least 150 words"] },
      { crit: "Coherence & Cohesion", items: ["Data grouped logically", "Comparison linkers: whereas, by contrast, similarly"] },
      { crit: "Lexical Resource", items: ["Varied trend verbs (rise, fall, fluctuate, peak)", "No repeated words"] },
      { crit: "Grammatical Range & Accuracy", items: ["Correct tenses (past years: Past Simple)", "Comparative structures used", "Articles and prepositions checked (from… to…, by…)"] }
    ]
  },

  /* Speaking Part 1 */
  part1: [
    { topic: "Home", q: ["Do you live in a house or a flat?", "What do you like most about your home?", "Is there anything you would like to change about it?", "Do you plan to live there for a long time?"] },
    { topic: "Work or studies", q: ["Do you work or are you a student?", "Why did you choose this job or subject?", "What do you find most interesting about it?", "What would you like to do in the future?"] },
    { topic: "Free time", q: ["What do you like to do in your free time?", "Have your hobbies changed since you were a child?", "Do you prefer indoor or outdoor activities?", "Is there a hobby you would like to try?"] },
    { topic: "Food", q: ["What kind of food do you like?", "Do you often cook at home?", "Is there any food you didn't like as a child but like now?", "Do you prefer eating at home or eating out?"] },
    { topic: "Languages", q: ["How many languages can you speak?", "Why are you learning English?", "What is the most difficult thing about learning a language?", "Should children start learning foreign languages early?"] },
    { topic: "Travel", q: ["Do you like travelling?", "Where did you go on your last trip?", "Do you prefer travelling alone or with other people?", "Where would you like to go next?"] },
    { topic: "Technology", q: ["How often do you use your phone?", "Which apps do you use most?", "Do you think you spend too much time online?", "How has technology changed the way you study?"] },
    { topic: "Weather", q: ["What's the weather like where you live?", "Which season do you like best?", "Does the weather affect your mood?", "Has the weather in your country changed in recent years?"] },
    { topic: "Reading", q: ["Do you like reading?", "What kind of books do you usually read?", "Do you prefer paper books or e-books?", "Did you read a lot when you were a child?"] },
    { topic: "Friends", q: ["Do you have many close friends?", "How do you usually spend time with your friends?", "Is it easy to make new friends as an adult?", "What makes someone a good friend?"] }
  ],

  /* Speaking Part 2 (cue cards) and Part 3 (follow-up questions) */
  part2: [
    { id: "s-skill", title: "Describe a skill that took you a long time to learn.", say: ["what the skill is", "when and how you learned it", "why it took so long"], explain: "how you feel about this skill now", p3: ["Which skills are most important for young people today?", "Is it better to learn a skill from a teacher or on your own?", "Will machines replace skilled workers in the future?"] },
    { id: "s-place", title: "Describe a place you visited that you would like to go back to.", say: ["where it is", "when you went there", "what you did there"], explain: "why you would like to return", p3: ["Why do some people visit the same places again and again?", "How has tourism changed in your country?", "Should popular places limit the number of tourists?"] },
    { id: "s-person", title: "Describe a person who has had an important influence on your life.", say: ["who this person is", "how you know them", "what they have done"], explain: "why they influenced you", p3: ["Who has more influence on children: parents or teachers?", "Can famous people be good role models?", "Do young people today have different role models from in the past?"] },
    { id: "s-book", title: "Describe a book you read that you found useful.", say: ["what the book was", "when you read it", "what it was about"], explain: "why it was useful for you", p3: ["Do people read less than they did in the past?", "Should schools make children read particular books?", "Will printed books disappear?"] },
    { id: "s-help", title: "Describe a time when you helped someone.", say: ["who you helped", "when and where it happened", "how you helped"], explain: "how you felt about it", p3: ["Why do some people do volunteer work?", "Should helping others be taught at school?", "Are people less helpful in big cities?"] },
    { id: "s-tech", title: "Describe a piece of technology that you find very useful.", say: ["what it is", "when you started using it", "how you use it"], explain: "why it is useful for you", p3: ["Do older people find it hard to use new technology?", "Has technology made people less sociable?", "What technology will change our lives in the next 20 years?"] },
    { id: "s-event", title: "Describe an event that you helped to organise.", say: ["what the event was", "who was involved", "what you did"], explain: "how successful the event was", p3: ["What makes an event successful?", "Are public celebrations important for a community?", "Should local governments pay for cultural events?"] },
    { id: "s-decision", title: "Describe an important decision you made.", say: ["what the decision was", "when you made it", "how you made it"], explain: "why it was important", p3: ["Do young people make decisions differently from older people?", "Should parents make important decisions for teenagers?", "Is it better to decide quickly or to take your time?"] },
    { id: "s-celebration", title: "Describe a traditional celebration in your country.", say: ["what it is", "when it takes place", "what people do"], explain: "why it is important", p3: ["Are traditional celebrations losing their importance?", "How do festivals bring people together?", "Should children learn about other countries' traditions?"] },
    { id: "s-language", title: "Describe a time when you had to speak a foreign language.", say: ["where you were", "who you were speaking to", "what happened"], explain: "how you felt about it", p3: ["Why is English so widely used around the world?", "What is the best age to start learning a language?", "Will people still learn languages when translation apps are perfect?"] },
    { id: "s-goal", title: "Describe a goal you would like to achieve in the next few years.", say: ["what the goal is", "why you chose it", "what you are doing to achieve it"], explain: "how you will feel when you achieve it", p3: ["Is it important to set goals in life?", "Do people today feel more pressure to succeed?", "Should schools teach students how to plan their future?"] },
    { id: "s-conversation", title: "Describe an interesting conversation you had with someone you didn't know.", say: ["who the person was", "where you met", "what you talked about"], explain: "why the conversation was interesting", p3: ["Is it easy to talk to strangers in your country?", "Has social media changed the way people communicate?", "What topics should people avoid with someone they've just met?"] }
  ],

  speakingChecklist: ["I spoke for the full 2 minutes", "I covered every point on the card", "I used past tenses", "I used 2–3 new words or phrases", "No long pauses"],

  /* Where each grammar topic is in your books: Murphy (units), Supplementary (exercises), Drozdova (pages) */
  grammarRefs: {
    "pp-ps":        { egu: [7, 8, 13, 14], supp: "29–30 (p. 18), 37–42 (pp. 23–26)", drz: "sections 8.1–8.2, pp. 58–67" },
    "ppc":          { egu: [9, 10, 11, 12], supp: "23–28 (pp. 14–17), 31–36 (pp. 19–22)", drz: "sections 9.1–9.4, pp. 76–82" },
    "narrative":    { egu: [5, 6, 15, 16, 18], supp: "11–17 (pp. 7–10), 43–51 (pp. 27–32)", drz: "6.3–6.4, pp. 42–46; 8.3, pp. 68–72; 9.5–9.6, pp. 83–85" },
    "future":       { egu: [19, 20, 21, 22, 23, 24, 25], supp: "54–64 (pp. 34–40)", drz: "Talking about the Future, pp. 50–57; 8.4, p. 73" },
    "conditionals": { egu: [38, 39, 40, 41], supp: "88–102 (pp. 53–62)", drz: "The Subjunctive Mood, pp. 165–180" },
    "passive":      { egu: [42, 43, 44, 45, 46], supp: "103–115 (pp. 63–71)", drz: "The Passive Voice, pp. 126–139" },
    "relative":     { egu: [92, 93, 94, 95, 96, 97], supp: "160–163 (pp. 100–102)", drz: "2.4 Attributive Clauses, pp. 381–388" },
    "articles":     { egu: [69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81], supp: "144–154 (pp. 92–96)", drz: "The Article, pp. 196–222" },
    "comparisons":  { egu: [105, 106, 107, 108], supp: "166–168 (pp. 104–105)", drz: "The Adjective, section 3, pp. 253–260" },
    "modals":       { egu: [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37], supp: "65–87 (pp. 41–52)", drz: "Modal Verbs, pp. 95–125" },
    "gerund":       { egu: [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68], supp: "132–143 (pp. 82–91)", drz: "The Gerund, pp. 283–301; The Infinitive, pp. 302–333" },
    "linking":      { egu: [113, 114, 115, 116, 117, 118, 119, 120], supp: "", drz: "2.5 Adverbial Clauses, pp. 389–398", extra: "Vocabulary in Use Upper-Int, units 61–68 (linking words)" },
    "pres-simple-cont": { egu: [1, 2, 3, 4], supp: "1–10 (pp. 2–6)", drz: "5.1, p. 23; 6.1–6.2, pp. 36–41" },
    "future-perf":  { egu: [24, 25], supp: "64 (p. 40)", drz: "6.5 Future Continuous, p. 47; 8.4 Future Perfect, p. 73" },
    "used-to":      { egu: [18, 36, 61], supp: "47–51 (pp. 30–32), 141 (p. 87)" },
    "deduction":    { egu: [27, 28, 29, 30], supp: "67–72 (pp. 42–44)", drz: "Can 2.1, p. 99; May 3.1, p. 103; Must 4.1, p. 109" },
    "obligation":   { egu: [31, 32, 33, 34, 35], supp: "73–85 (pp. 45–51)", drz: "Must, p. 106; Should and Ought to, p. 114; Need, p. 117" },
    "cond-mixed":   { egu: [38, 40], supp: "94–99 (pp. 56–59)", drz: "Conditional Sentences, pp. 165–175" },
    "wish":         { egu: [39, 41], supp: "100–102 (pp. 60–62)", drz: "Making a Wish, pp. 175–180" },
    "unless":       { egu: [25, 114, 115], drz: "2.5 Adverbial Clauses, pp. 389–398" },
    "causative":    { egu: [45, 46], supp: "114–115 (p. 71)", drz: "Have Something Done, p. 345; Complex Subject, p. 314" },
    "reported":     { egu: [47, 48, 50], supp: "121–131 (pp. 75–81)", drz: "Sequence of Tenses, pp. 146–152; Indirect Speech, pp. 153–161" },
    "questions":    { egu: [49, 50, 51, 52], supp: "116–120 (pp. 72–74)", drz: "Questions and Negatives, p. 140; Indirect Questions, p. 156" },
    "quantifiers":  { egu: [69, 70, 71, 85, 86, 87, 88], supp: "144–148 (pp. 92–93), 155–159 (pp. 97–99)", drz: "Much/Many, Little/Few, p. 243", extra: "Vocabulary in Use Upper-Int, units 83, 85, 86 (uncountable nouns)" },
    "agreement":    { egu: [79, 88, 91], drz: "The Category of Number, p. 187" },
    "participle":   { egu: [68, 97], supp: "160–163 (pp. 100–102)", drz: "Functions of the Participle, p. 336" },
    "contrast":     { egu: [113], drz: "2.5 Adverbial Clauses, pp. 389–398", extra: "Vocabulary in Use Upper-Int, unit 64 (concession and contrast)" },
    "so-such":      { egu: [102, 103], drz: "Adverbs of Degree, p. 273" },
    "trends":       { extra: "Vocabulary in Use Upper-Int, unit 51; Vocabulary in Use Advanced, unit 71 (statistics)" },
    "prep-time-place": { egu: [119, 120, 121, 122, 123, 124, 125, 126], supp: "173–177 (pp. 108–110)", drz: "Prepositions of Place, p. 351; of Time, p. 364" },
    "dep-prep":     { egu: [129, 130, 131, 132, 133, 134, 135, 136], supp: "178–182 (pp. 111–112)", drz: "Prepositions in Set Expressions, p. 374" },
    "inversion":    { note: "Not in Murphy’s intermediate book — it’s a Band 7+ structure. Use the British Council link below." },
    "cleft":        { drz: "Emphasis: It is … that, p. 402; It is not until … that, p. 403" },
    "nominal":      { drz: "Formation of Nouns, p. 181", extra: "Vocabulary in Use Upper-Int, units 70, 73; Advanced, unit 87" },
    "hedging":      { egu: [29, 30, 45], extra: "Vocabulary in Use Advanced, units 79–80 (academic writing)" }
  },

  /* How the Grammar tab groups the topics, and their order */
  grammarGroups: [
    { id: "tenses", title: "Tenses" },
    { id: "modals", title: "Modal verbs" },
    { id: "cond", title: "Conditionals and wishes" },
    { id: "passive", title: "Passive and reporting" },
    { id: "clauses", title: "Verb patterns and clauses" },
    { id: "nouns", title: "Nouns and quantity" },
    { id: "describe", title: "Describing and comparing" },
    { id: "linking", title: "Linking and prepositions" },
    { id: "academic", title: "Band 7+ academic style" }
  ],
  grammarOrder: ["pres-simple-cont", "pp-ps", "ppc", "narrative", "used-to", "future", "future-perf",
    "modals", "obligation", "deduction",
    "conditionals", "cond-mixed", "wish", "unless",
    "passive", "causative", "reported", "questions",
    "gerund", "relative", "participle",
    "articles", "quantifiers", "agreement",
    "comparisons", "so-such", "trends",
    "linking", "contrast", "prep-time-place", "dep-prep",
    "hedging", "nominal", "cleft", "inversion"],

  /* Engnovate: tests and checkers (some features are paid) */
  engnovate: [
    { t: "Listening tests", u: "https://engnovate.com/ielts-listening-tests/" },
    { t: "Reading tests", u: "https://engnovate.com/ielts-reading-tests/" },
    { t: "Writing sample answers", u: "https://engnovate.com/ielts-writing-samples/" },
    { t: "Task 1 checker (Academic)", u: "https://engnovate.com/ielts-academic-writing-task-1-report-checker/" },
    { t: "Task 2 essay checker", u: "https://engnovate.com/ielts-writing-task-2-essay-checker/" },
    { t: "Speaking sample answers", u: "https://engnovate.com/ielts-speaking-samples/" },
    { t: "Speaking Part 1 answer checker", u: "https://engnovate.com/ielts-speaking-part-1-answer-checker/" },
    { t: "Flashcards", u: "https://engnovate.com/flashcards/" }
  ],

  testSources: ["Engnovate", "Cambridge IELTS", "IELTS.org", "British Council", "Other"],

  /* External resources (checked October 2026) */
  links: [
    { group: "Listening", items: [
      { t: "LearnEnglish — Listening B1", u: "https://learnenglish.britishcouncil.org/free-resources/listening/b1" },
      { t: "LearnEnglish — Listening B2", u: "https://learnenglish.britishcouncil.org/free-resources/listening/b2" } ] },
    { group: "Reading", items: [
      { t: "LearnEnglish — Reading B1", u: "https://learnenglish.britishcouncil.org/free-resources/reading/b1" },
      { t: "LearnEnglish — Reading B2", u: "https://learnenglish.britishcouncil.org/free-resources/reading/b2" } ] },
    { group: "Writing", items: [
      { t: "LearnEnglish — Writing B1", u: "https://learnenglish.britishcouncil.org/free-resources/writing/b1" },
      { t: "LearnEnglish — Writing B2", u: "https://learnenglish.britishcouncil.org/free-resources/writing/b2" } ] },
    { group: "Speaking", items: [
      { t: "LearnEnglish — Speaking B1", u: "https://learnenglish.britishcouncil.org/free-resources/speaking/b1" },
      { t: "LearnEnglish — Speaking B2", u: "https://learnenglish.britishcouncil.org/free-resources/speaking/b2" } ] },
    { group: "Grammar & vocabulary", items: [
      { t: "LearnEnglish — Grammar B1–B2", u: "https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2" },
      { t: "English grammar reference", u: "https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference" },
      { t: "LearnEnglish — Vocabulary B1–B2", u: "https://learnenglish.britishcouncil.org/free-resources/vocabulary/b1-b2" } ] },
    { group: "IELTS", items: [
      { t: "Official Academic sample questions", u: "https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test" },
      { t: "British Council — IELTS preparation", u: "https://learnenglish.britishcouncil.org/ielts-preparation" } ] }
  ]
};
