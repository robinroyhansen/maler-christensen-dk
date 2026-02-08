export type ReviewSource = "trustpilot" | "anmeld-haandvaerker"

export interface Review {
  id: string
  author: string
  rating: number
  text: string
  source: ReviewSource
  date: string // YYYY-MM-DD
  pageSlugs: string[] // which pages this review should appear on
}

export const REVIEWS: Review[] = [
  {
    id: "r1",
    author: "Verificeret kunde",
    rating: 5,
    text: "Jeg kan på det varmeste anbefale malerfirmaet Christensen. Hele processen fra første kontakt til færdigt resultat har været professionel og tryg. Kommunikationen var klar og venlig, og de holdt aftalerne både med tid og pris. Har brugt dem af flere omgange. Til mit hus og mine forældres rygerlejlighed. Arbejdet blev udført på kun 2 dage. Selve malerarbejdet blev udført med stor omhu og præcision – resultatet er flot, ensartet og langt over mine forventninger. De efterlod også alt pænt og ryddeligt, så det var en fornøjelse at komme hjem til. Det er sjældent at opleve så høj kvalitet kombineret med god service, så jeg giver mine bedste anbefalinger til Malerfirmaet Christensen og vil helt sikkert bruge dem igen i fremtiden.",
    source: "trustpilot",
    date: "2025-09-24",
    pageSlugs: ["homepage", "maling-hus", "maling-af-lejlighed"]
  },
  {
    id: "r2",
    author: "Verificeret kunde",
    rating: 5,
    text: "Jeg bestilte maling af en hel lejlighed og fik et fint tilbud. De kom 3 malere på selve dagen, til tiden. Superflinke og effektive. Vi aftalte en ekstraopgave med nogle radiatorer i løbet af dagen, som ikke var et problem at lægge oveni arbejdsprogrammet. Det tog 2 dage i alt og lejligheden står superflot. Regningen gav ingen dårlige overraskelser. Tak for godt arbejde. Vi ses helt sikkert en anden gang.",
    source: "trustpilot",
    date: "2025-09-05",
    pageSlugs: ["maling-af-lejlighed", "maling-flyttelejlighed", "billig-maler"]
  },
  {
    id: "r3",
    author: "Verificeret kunde",
    rating: 5,
    text: "Vi havde en rigtig dårlig oplevelse med en maler, der ikke kunne løfte opgaven, og vores tidsplan for renovering og flytning skred. Derfor var det en stor glæde at finde Stephan og co., der påtog sig opgaven og leverede et flot arbejde på kun en uge. Tak til George for en super indsats.",
    source: "trustpilot",
    date: "2025-07-03",
    pageSlugs: ["maling-flyttelejlighed", "malerarbejde"]
  },
  {
    id: "r4",
    author: "Verificeret kunde",
    rating: 5,
    text: "Det har været en rigtig god oplevelse at bruge dette malerfirma i Slagelse. Vi fik snakket med Stefan og fik et skarpt tilbud på at male vores hus. Vi aftalte tid og opgaven blev fuldført ligesom vi ønskede det og til tiden. Vil helt klart anbefale dette firma til venner, familie og bekendte.",
    source: "trustpilot",
    date: "2024-05-17",
    pageSlugs: ["maling-hus", "maler-slagelse"]
  },
  {
    id: "r5",
    author: "Verificeret kunde",
    rating: 5,
    text: "This great team were true professionals from the get-go. From the prompt replies, to the commitment to the job and then just being completely delightful to work with. A few small hiccups were immediately rectified, despite having to travel for 2 hours for a 30 minute 'fix'. I would highly recommend and will do so with my friends who ask for a great painting recommendation. Thanks for your work. My renovation project looks so good :)",
    source: "trustpilot",
    date: "2024-04-26",
    pageSlugs: ["homepage", "malerarbejde", "billig-maler"]
  },
  {
    id: "r6",
    author: "Verificeret kunde",
    rating: 5,
    text: "En hel lejlighed, vægge, lofter, døre og vinduer, malet smukt og effektivt. De kunne starte hurtigt og så var maleren meget venlig og sympatisk. 😊 Kan kun anbefale!",
    source: "trustpilot",
    date: "2023-09-19",
    pageSlugs: ["maling-af-lejlighed", "maling-flyttelejlighed"]
  },
  {
    id: "r7",
    author: "Verificeret kunde",
    rating: 5,
    text: "God kommunikation, imødekommende, venlige og fleksibel. Flot udført malerarbejde og til aftalt tid og pris. Vi kan varmt anbefale Malerfirmaet Christensen til alle.",
    source: "trustpilot",
    date: "2023-09-14",
    pageSlugs: ["homepage", "malerarbejde"]
  },
  {
    id: "r8",
    author: "Verificeret kunde",
    rating: 5,
    text: "Top-professionel fra først til sidst. Fantastisk godt arbejde. Holder aftalerne, og viser stolthed over egen indsats. Vil helt sikkert bruge dem igen.",
    source: "trustpilot",
    date: "2023-07-24",
    pageSlugs: ["homepage", "malerarbejde"]
  },
  {
    id: "r9",
    author: "Angela Tusiime",
    rating: 5,
    text: "Fantastisk service! Mit hus blev færdig malet på kun en weekend. Jeg kan stort anbefale deres service til alle 🙂",
    source: "trustpilot",
    date: "2023-06-04",
    pageSlugs: ["maling-hus"]
  },
  {
    id: "r10",
    author: "Verificeret kunde",
    rating: 5,
    text: "Super professionel og hurtig service. Personalet er super imødekommende og venlige samt lyttende, med en evne til at forstå og opnå det ønskede resultat. Arbejdet er nøje og ned til mindste detalje og meget punktligt. Alt i alt en super god oplevelse. Firmaet kan varmt anbefales.",
    source: "trustpilot",
    date: "2023-06-02",
    pageSlugs: ["homepage", "malerarbejde"]
  },
  {
    id: "r11",
    author: "D.E.B.",
    rating: 5,
    text: "Malerfirmaet Christensen er uden tvivl det bedste malerfirma, jeg nogensinde har fået udført malerarbejde af. Deres faglighed og ekspertise er helt i top og jeg følte mig allerede tryg ved min første samtale med Jess. Firmaet har malet min lejlighed med stor omhu og opmærksomhed på særligt vigtige detaljer. Deres pålidelighed og tilgængelighed var også i en klasse for sig selv. De ankom til tiden og arbejdede effektivt og professionelt. Derudover var deres kommunikation og kundeservice helt fantastisk. De var altid tilgængelige for at besvare mine spørgsmål og jeg følte mig velinformeret gennem hele processen. Malerfirmaet Christensen er et firma som er villige til at gå den ekstra mil for at sikre 100% tilfredshed for deres kunder. Jeg vil helt sikkert benytte dem igen i fremtiden og anbefale dem til alle, der ønsker en maleroplevelse i verdensklasse.",
    source: "trustpilot",
    date: "2023-05-08",
    pageSlugs: ["maling-af-lejlighed", "homepage"]
  },
  {
    id: "r12",
    author: "Verificeret kunde",
    rating: 5,
    text: "Yderst tilfreds med malerarbejdet! God kommunikation med malermester selv, god service samt imødekommenhed på ønsker, farver etc. og der er ikke en finger at sætte på det udførte arbejde. Fleksibilitet var vigtigt for os, da vi ikke skulle være tilstede da der blev malet, det var intet problem - så det blev fikset i helligdage! Det kan man kalde service 🤞🏽",
    source: "trustpilot",
    date: "2023-04-06",
    pageSlugs: ["homepage", "malerarbejde"]
  },
  {
    id: "r13",
    author: "Verificeret kunde",
    rating: 5,
    text: "Vi har fået malet vores sommerhus udvendigt - total farveskift - og det er bare super flot lavet. Der er ikke et skimt af den gamle farve og der er ikke spilt en dråbe, hvor der ikke skulle være maling - bare flot arbejde. Arbejdet blev udført til aftalt tid og vi er meget tilfredse. Jess har allerede været på besøg for at give tilbud på den næste opgave!!",
    source: "trustpilot",
    date: "2021-11-01",
    pageSlugs: ["maling-af-sommerhus"]
  },
  {
    id: "r14",
    author: "Familien Lumholtz",
    rating: 5,
    text: "Vi fik malet vores hus indvendigt (187 kvm). Håndværket og servicen var så god, at vi besluttede efterfølgende at få malet carporten og vores trævinduer udvendigt. Kan kun varmt anbefale Jess og hans Team (stor tak til Nanna). Vi har helt sikkert fundet vores faste malerfirma fremover.",
    source: "trustpilot",
    date: "2021-10-02",
    pageSlugs: ["maling-hus", "maling-af-carport", "traemaling"]
  },
  {
    id: "r15",
    author: "Verificeret kunde",
    rating: 5,
    text: "Kan 100% anbefales. Malerfirmaet Christensen lavede alt malerarbejdet på vores nye gipsloft. De kom som aftalt og leverede et rigtig flot malerarbejde! Derudover kom de uden betaling, da vi opdagede at hullet til vores loftsemhætte var skåret for stort af gipsmontørerne. Næste gang jeg skal have lavet malerarbejde vil der være Malerfirmaet Christensen igen!",
    source: "trustpilot",
    date: "2021-10-14",
    pageSlugs: ["malerarbejde", "sprojtespartling"]
  },
  {
    id: "r16",
    author: "Verificeret kunde",
    rating: 5,
    text: "Projekt: Nedtagning af tapet, spartling, opsætning af filt og maling af hele huset. Efter at vi tog fat i Jess, kom han hurtigt ud og gav et rigtig fornuftigt tilbud med en god tidsramme også. Kommunikation med Jess er super god, man venter ikke mange minutter på et svar :) Vi fik besøg af Alex og Tobias, som har været hos os de sidste 3 ugers tid hver dag. To fantastiske gutter, der er vanvittig dygtige til deres arbejde. Der knokles igennem og de er super fleksible i deres tider. Det har været en fornøjelse at have så ihærdige, dygtige og super søde gutter gående - og SIKKE et resultat. Alt står knivskarpt og flot. Mine varmeste anbefalinger til Jess og hans firma.",
    source: "trustpilot",
    date: "2020-10-30",
    pageSlugs: ["maling-hus", "tapetsering", "sprojtespartling"]
  },
  {
    id: "r17",
    author: "Verificeret kunde",
    rating: 5,
    text: "Vi fik malet hele vores hus på 365 kvm indvendigt og er intet mindre end yderst tilfredse. Malerfirmaet Christensen leverede et sublimt stykke malerarbejde. De bruger kvalitetsmaling og går ikke på kompromis. Medarbejderne er meget dygtige og ekstremt kvalitetsbevidste. Vi havde brug for, at hele huset blev malet indvendigt indenfor 1 uge - Jess mødte op en søndag til gennemgang af arbejdsopgaven og mandag morgen gik 2 malere i gang. Arbejdet var færdigt fredag aften til aftalt tid. Jeg kan klart anbefale at bruge Malerfirmaet Christensen og I får vores TOP anbefaling her på Trustpilot - DET HAR I VIRKELIGT FORTJENT!",
    source: "trustpilot",
    date: "2020-02-25",
    pageSlugs: ["maling-hus", "billig-maler"]
  },
  {
    id: "r18",
    author: "Regin",
    rating: 5,
    text: "Altid kyndig og pålidelig. Altid veludført arbejde til tiden. Kun mine varmeste anbefalinger! Og så er Jess en virkelig rar mand, som står ved hans ord. Det er højt værdsat i en verden hvor folk ofte har så travlt, at de glemmer pli og kvalitet. Tak endnu engang!",
    source: "trustpilot",
    date: "2022-02-15",
    pageSlugs: ["homepage", "malerarbejde"]
  },
  {
    id: "r19",
    author: "Verificeret kunde",
    rating: 5,
    text: "Vi har fået malet hele vores nye hus med Maler Christensen. Dette indebar både en glimmervæg og spartelmaling. Vi er ovenud tilfredse med både forløbet, servicen og resultatet. De får vores varmeste anbefaling herfra.",
    source: "trustpilot",
    date: "2020-07-22",
    pageSlugs: ["maling-hus", "sprojtespartling"]
  },
  {
    id: "r20",
    author: "Søren",
    rating: 5,
    text: "Fantastisk service og rigtig flot arbejde! Vi er meget tilfredse og vil helt klart anbefale firmaet. De er meget fleksible og rykkede den aftalte opstart to dage frem, da vi overtog tidligere! Stor ros til maler Mirza.",
    source: "trustpilot",
    date: "2021-09-15",
    pageSlugs: ["maling-flyttelejlighed", "malerarbejde"]
  },
  {
    id: "r21",
    author: "Karoline Grøndal",
    rating: 5,
    text: "Vi har haft Stefan ude og male vores nye hus og han har også lavet nogle super flotte vægge med effektspartel. Dialogen har været super god og der har altid været overskud til at snakke med os om tingene, hvis vi ønskede det anderledes. Fint resultat og en god oplevelse. Kan varmt anbefales.",
    source: "anmeld-haandvaerker",
    date: "2020-11-25",
    pageSlugs: ["maling-hus", "sprojtespartling"]
  },
  {
    id: "r22",
    author: "Verificeret kunde",
    rating: 5,
    text: "Jeg har med fornøjelse benyttet firmaet Maler Christensen til at få malet hele min lejlighed. Maler Christensen har udført et fantastisk flot stykke malerarbejde. Jeg er så tilfreds over at have benyttet et så professionelt, dygtigt, imødekommende og helt igennem fantastisk firma. Jeg kan klart anbefale firmaet til andre.",
    source: "trustpilot",
    date: "2020-03-02",
    pageSlugs: ["maling-af-lejlighed"]
  },
  {
    id: "r23",
    author: "Verificeret kunde",
    rating: 5,
    text: "Altid sød og venlig dialog med ejer Jess. Kommer til aftalt tid og har faglig stolthed i særklasse. Vi er vilde med Stephans malerarbejde :)",
    source: "trustpilot",
    date: "2022-09-25",
    pageSlugs: ["homepage", "malerarbejde"]
  }
]

// Helper: get reviews for a specific page slug
// Falls back to homepage reviews if no specific reviews exist
export function getReviewsForPage(slug: string, limit = 6): Review[] {
  const matching = REVIEWS.filter(r => r.pageSlugs.includes(slug))
  if (matching.length >= 2) {
    return matching.slice(0, limit)
  }
  // Fallback: try "malerarbejde" (general service), then "homepage"
  const fallback = REVIEWS.filter(r => r.pageSlugs.includes("malerarbejde"))
  if (fallback.length >= 2) {
    return fallback.slice(0, limit)
  }
  return REVIEWS.filter(r => r.pageSlugs.includes("homepage")).slice(0, limit)
}
