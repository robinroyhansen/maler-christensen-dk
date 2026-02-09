import { COMPANY } from "@/lib/constants"

interface ServiceContent {
  title: string
  metaTitle: string
  metaDescription: string
  heroHeading: string
  heroSubheading: string
  intro: string
  sections: {
    title: string
    content: string
  }[]
  benefits: string[]
  relatedServices: string[]
}

export const SERVICE_CONTENT: { [slug: string]: ServiceContent } = {
  "malerarbejde": {
    title: "Malerarbejde",
    metaTitle: `Malerarbejde — Indvendig & udvendig maling | ★ 4.9`,
    metaDescription: `Alt i malerarbejde til private og erhverv. Vægge, lofter, facade og træværk. Gratis tilbud inden 24 timer — ring ${COMPANY.phone}`,
    heroHeading: "Professionelt malerarbejde",
    heroSubheading: "Kvalitetsbevidst malerarbejde til private og erhverv i hele Sjælland",
    intro: `Hos ${COMPANY.name} tilbyder vi professionelt malerarbejde af højeste kvalitet. Vores erfarne malere håndterer alt fra små renoveringsprojekter til store erhvervsopgaver. Vi er stolte af at være medlemmer af Danske Malermestre, hvilket sikrer vores kunder fagligt korrekt arbejde hver gang.`,
    sections: [
      {
        title: "Indvendigt malerarbejde",
        content: "Vi udfører alt indvendigt malerarbejde, fra maling af vægge og lofter til træværk, døre og vinduer. Vores malere arbejder omhyggeligt og efterlader altid et flot og holdbart resultat. Vi bruger udelukkende kvalitetsmaling fra anerkendte mærker som Beck & Jørgensen."
      },
      {
        title: "Udvendigt malerarbejde",
        content: "Udvendig maling kræver særlig ekspertise og de rigtige produkter for at sikre et langtidsholdbart resultat. Vi maler alt fra facader og gavle til vinduer, døre og træværk. Vores malere har stor erfaring med alle typer overflader og ved præcis, hvordan man forbereder og behandler dem korrekt."
      },
      {
        title: "Erhvervsmalerarbejde",
        content: "Vi servicerer også erhvervskunder med alt fra kontormaling til butikslokaler og industribygninger. Vi tilpasser vores arbejdstider til jeres drift, så vi forstyrrer mindst muligt. Få et uforpligtende tilbud på jeres næste malerprojekt."
      }
    ],
    benefits: [
      "Gratis og uforpligtende tilbud",
      "Erfarne og certificerede malere",
      "Kvalitetsmaling fra kendte mærker",
      "Ryddeligt og professionelt arbejde",
      "Konkurrencedygtige priser",
      "Garanti på alt arbejde"
    ],
    relatedServices: ["maling-hus", "maling-af-lejlighed", "tapetsering", "sprojtespartling"]
  },

  "maling-af-carport": {
    title: "Maling af carport",
    metaTitle: `Maling af carport — Holdbar finish | Gratis tilbud`,
    metaDescription: `Professionel maling af carport og garage. Grundig forbehandling og vejrbestandig maling. Få et gratis tilbud — ring ${COMPANY.phone}`,
    heroHeading: "Maling af carport",
    heroSubheading: "Professionel maling og vedligeholdelse af din carport",
    intro: `En velvedligeholdt carport beskytter din bil og øger din boligs værdi. Hos ${COMPANY.name} har vi stor erfaring med maling og vedligeholdelse af carporte i alle materialer. Vi sikrer, at din carport får en flot og langtidsholdbar finish, der modstår vejr og vind.`,
    sections: [
      {
        title: "Hvorfor male din carport?",
        content: "En carport er konstant udsat for vejrlig påvirkning – regn, sol, frost og sne slider på overfladen. Regelmæssig maling beskytter træværket mod råd og svamp, forlænger levetiden markant og holder din carport flot år efter år. En nymaleet carport løfter også hele indtrykket af din ejendom."
      },
      {
        title: "Vores proces",
        content: "Vi starter altid med en grundig vurdering af carportens tilstand. Eventuelle rådskader udbedres, og alle overflader slibes og rengøres inden malingen. Vi bruger kvalitetsmaling specielt designet til udendørs brug, der giver optimal beskyttelse og holdbarhed."
      },
      {
        title: "Alle typer carporte",
        content: "Vi maler carporte i alle materialer – træ, metal og kombinationer. Hvad enten du har en klassisk trækonstruktion eller en moderne designcarport, har vi erfaringen og ekspertisen til at levere et flot resultat."
      }
    ],
    benefits: [
      "Forlænger carportens levetid",
      "Beskytter mod vejr og vind",
      "Øger ejendommens værdi",
      "Kvalitetsmaling med lang holdbarhed",
      "Reparation af eventuelle skader inkluderet"
    ],
    relatedServices: ["traemaling", "maling-hus", "malerarbejde"]
  },

  "maling-af-lejlighed": {
    title: "Maling af lejlighed",
    metaTitle: `Maling af lejlighed — Færdig på 1-2 dage, fra 69 kr/m²`,
    metaDescription: `Få hele lejligheden malet hurtigt og professionelt. Vægge, lofter, døre og vinduer. Fast pris, ingen overraskelser. Ring ${COMPANY.phone}`,
    heroHeading: "Maling af lejlighed",
    heroSubheading: "Professionel og effektiv maling af din lejlighed",
    intro: `Skal din lejlighed have en frisk omgang maling? ${COMPANY.name} tilbyder professionel maling af lejligheder til private og boligforeninger. Vi arbejder effektivt og grundigt, så du hurtigt kan nyde din nymalet lejlighed.`,
    sections: [
      {
        title: "Komplet lejlighedsmaling",
        content: "Vi tilbyder komplet maling af hele din lejlighed – vægge, lofter, døre, karme og paneler. Vores malere har stor erfaring med alle typer lejligheder, fra ældre ejendomme med høje lofter og stukkatur til moderne nybyggeri."
      },
      {
        title: "Fast pris garanti",
        content: "Vi tilbyder fast pris på maling af din lejlighed, så du ved præcis, hvad det kommer til at koste. Ingen ubehagelige overraskelser. Kontakt os for et gratis tilbud med fast pris."
      },
      {
        title: "Minimal forstyrrelse",
        content: "Vi ved, at det kan være omstændeligt at få malet, mens man bor i lejligheden. Derfor arbejder vi så effektivt som muligt og rydder grundigt op efter os hver dag. Vi kan også arbejde, mens du er på arbejde."
      }
    ],
    benefits: [
      "Fast pris uden overraskelser",
      "Hurtig og effektiv udførelse",
      "Erfaring med alle typer lejligheder",
      "Grundig oprydning efter os",
      "Kvalitetsmaling fra kendte mærker"
    ],
    relatedServices: ["maling-flyttelejlighed", "tapetsering", "sprojtespartling"]
  },

  "maling-af-sommerhus": {
    title: "Maling af sommerhus",
    metaTitle: `Maling af sommerhus — Ude & inde | Klar til sæsonen`,
    metaDescription: `Udvendig og indvendig maling af sommerhuse. Vejrbestandig maling der holder. Fleksibel planlægning. Gratis tilbud — ring ${COMPANY.phone}`,
    heroHeading: "Maling af sommerhus",
    heroSubheading: "Giv dit sommerhus den kærlighed det fortjener",
    intro: `Et sommerhus kræver særlig opmærksomhed når det kommer til vedligeholdelse. ${COMPANY.name} har stor erfaring med maling og behandling af sommerhuse i alle typer og størrelser. Vi sikrer, at dit sommerhus både ser fantastisk ud og er godt beskyttet mod elementerne.`,
    sections: [
      {
        title: "Udvendig sommershusmaling",
        content: "Den udvendige maling af dit sommerhus er afgørende for husets beskyttelse mod vejr og vind. Vi bruger specialmaling designet til danske forhold, der giver optimal beskyttelse mod fugt, UV-stråler og temperatursvingninger. Vi behandler alt træværk grundigt for at sikre lang holdbarhed."
      },
      {
        title: "Indvendig fornyelse",
        content: "Giv dit sommerhus en frisk start med en ny omgang indvendig maling. Loftspaneler, vægge og træværk får nyt liv med de rigtige farver. Vi rådgiver gerne om farvevalg, der passer til sommerhusatmosfæren."
      },
      {
        title: "Fleksibel planlægning",
        content: "Vi forstår, at dit sommerhus er dit fristed. Derfor planlægger vi arbejdet, så det passer til din ferieplanlægning. Vi kan udføre arbejdet, mens du ikke er der, og sørge for, at alt er klart til din næste ferie."
      }
    ],
    benefits: [
      "Specialiseret i sommerhusvedligeholdelse",
      "Produkter tilpasset danske forhold",
      "Fleksibel planlægning efter dine ønsker",
      "Både indvendig og udvendig maling",
      "Erfaring med alle typer sommerhuse"
    ],
    relatedServices: ["traemaling", "maling-hus", "malerarbejde"]
  },

  "maling-flyttelejlighed": {
    title: "Maling af flyttelejlighed",
    metaTitle: `Maling ved fraflytning — Spar dit depositum | ★ 4.9`,
    metaDescription: `Professionel fraflytningsmalerarbejde der sikrer dit depositum. Ofte færdig på 1-2 dage. Hurtig opstart. Ring ${COMPANY.phone}`,
    heroHeading: "Maling af flyttelejlighed",
    heroSubheading: "Professionel istandsættelse ved fraflytning",
    intro: `Skal du flytte og har brug for at få malet lejligheden? ${COMPANY.name} er eksperter i fraflytningsmalerarbejde. Vi sikrer, at din lejlighed fremstår i perfekt stand, så du får dit depositum tilbage uden problemer.`,
    sections: [
      {
        title: "Hurtig og effektiv service",
        content: "Vi ved, at tid er afgørende ved fraflytning. Derfor tilbyder vi hurtig og effektiv maling af flyttelejligheder. Vi kan ofte udføre arbejdet på 1-2 dage, afhængigt af lejlighedens størrelse."
      },
      {
        title: "Vi kender kravene",
        content: "Med mange års erfaring i fraflytningsmalerarbejde kender vi præcis de standarder, som boligforeninger og udlejere forventer. Vi sørger for, at alt arbejde lever op til disse krav, så du undgår diskussioner om depositum."
      },
      {
        title: "Alt-i-en løsning",
        content: "Vi tilbyder en komplet fraflytningsløsning, så du kun behøver én håndværker. Ud over professionel maling klarer vi også rengøring af hele lejligheden samt gulvslibning, så gulvene fremstår som nye. Dertil kommer reparation af mindre skader og spartling af huller. Vi sørger for, at lejligheden er 100% klar til overdragelse — du skal ikke bekymre dig om noget."
      }
    ],
    benefits: [
      "Hurtig levering - ofte 1-2 dage",
      "Sikrer dit depositum tilbage",
      "Kender alle standarder og krav",
      "Komplet løsning inkl. rengøring og gulvslibning",
      "Inkluderer småreperationer",
      "Grundig oprydning efter os"
    ],
    relatedServices: ["maling-af-lejlighed", "rengoering", "gulvslibning", "sprojtespartling"]
  },

  "maling-hus": {
    title: "Maling af hus",
    metaTitle: `Maling af hus — Inde & ude | 250+ tilfredse kunder`,
    metaDescription: `Komplet husmaling ude og inde. Kvalitetsmaling, erfarne malere og garanti på arbejdet. Gratis tilbud — ring ${COMPANY.phone}`,
    heroHeading: "Maling af hus",
    heroSubheading: "Komplet husmaling fra facade til fundament",
    intro: `Dit hus fortjener det bedste. ${COMPANY.name} tilbyder professionel maling af huse – både indvendigt og udvendigt. Vores erfarne malere sørger for et flot og langtidsholdbart resultat, der beskytter dit hus og øger dets værdi.`,
    sections: [
      {
        title: "Udvendig husmaling",
        content: "Den udvendige maling af dit hus er husets første forsvar mod vejr og vind. Vi forbereder alle overflader grundigt, reparerer eventuelle skader og påfører kvalitetsmaling, der holder i mange år. Vi maler facader, gavle, vinduer, døre og alt træværk."
      },
      {
        title: "Indvendig husmaling",
        content: "Giv dit hjem et frisk look med ny indvendig maling. Vi maler alle rum – stuer, soveværelser, køkken, badeværelse og meget mere. Vores malere arbejder omhyggeligt og efterlader altid et perfekt resultat."
      },
      {
        title: "Farverådgivning",
        content: "Er du i tvivl om farvevalg? Vores erfarne malere rådgiver gerne om farver, der passer til din bolig og dine ønsker. Vi kan lave farveprøver på stedet, så du kan se resultatet, inden du beslutter dig."
      }
    ],
    benefits: [
      "Komplet service ude og inde",
      "Erfarne og certificerede malere",
      "Kvalitetsmaling med lang holdbarhed",
      "Grundig forberedelse og efterbehandling",
      "Farverådgivning inkluderet"
    ],
    relatedServices: ["traemaling", "maling-af-sommerhus", "malerarbejde", "sprojtespartling"]
  },

  "maling-trappe": {
    title: "Maling af trappe",
    metaTitle: `Maling af trappe — Træ, metal & beton | Slidstærk finish`,
    metaDescription: `Professionel trappemaling med slidstærk finish. Alle typer trapper. Minimal gene i opgangen. Gratis tilbud — ring ${COMPANY.phone}`,
    heroHeading: "Maling af trappe",
    heroSubheading: "Giv din trappe nyt liv med professionel maling",
    intro: `En trappe bliver udsat for daglig slitage og fortjener derfor særlig opmærksomhed. ${COMPANY.name} specialiserer sig i trappemaling og sikrer et flot og slidstærkt resultat, der holder til hverdagens brug.`,
    sections: [
      {
        title: "Slidstærke løsninger",
        content: "Vi bruger specialmaling og -lakker designet til gulve og trapper, som kan modstå daglig gang og slitage. Resultatet er en flot finish, der holder i mange år uden at slide eller krakelere."
      },
      {
        title: "Alle materialer",
        content: "Vi maler trapper i alle materialer – træ, metal og beton. Hver materialetype kræver sin egen behandling og forberedelse, og vores erfarne malere ved præcis, hvordan man opnår det bedste resultat på hver overflade."
      },
      {
        title: "Minimal forstyrrelse",
        content: "Vi ved, at trappen er hjerteslaget i dit hjem. Derfor planlægger vi arbejdet, så du stadig kan bruge trappen under processen. Vi kan male hver anden trin, så der altid er adgang."
      }
    ],
    benefits: [
      "Slidstærk og holdbar finish",
      "Specialmaling til trapper",
      "Minimal forstyrrelse i hverdagen",
      "Alle materialer – træ, metal, beton",
      "Erfarne specialister"
    ],
    relatedServices: ["malerarbejde", "maling-af-lejlighed", "maling-hus"]
  },

  "tapetsering": {
    title: "Tapetsering",
    metaTitle: `Tapetsering — Vinyl, væv & designtapet | ★ 4.9`,
    metaDescription: `Professionel opsætning af alle typer tapet. Perfekt mønstermatch og holdbar finish. Gratis tilbud — ring ${COMPANY.phone}`,
    heroHeading: "Professionel tapetsering",
    heroSubheading: "Skab personlighed med professionelt opsat tapet",
    intro: `Tapet giver dit hjem karakter og personlighed. ${COMPANY.name} tilbyder professionel tapetsering af alle typer vægge. Vores erfarne tapetserere sikrer et perfekt resultat uden bobler, skæve mønstre eller synlige samlinger.`,
    sections: [
      {
        title: "Alle typer tapet",
        content: "Vi opsætter alle typer tapet – vinyltapet, vævtapet, fototapet, glasvæv og meget mere. Uanset om du ønsker et klassisk mønster, moderne design eller et storslået fototapet, har vi erfaringen til at levere et flot resultat."
      },
      {
        title: "Forberedelse er nøglen",
        content: "Før tapetseringen forbereder vi væggen grundigt. Vi sørger for, at overfladen er glat, ren og grundbehandlet. Eventuelle ujævnheder spartles, og gammel tapet fjernes professionelt. God forberedelse er afgørende for et perfekt resultat."
      },
      {
        title: "Perfekt mønstermatch",
        content: "Mønstertapet kræver præcision og erfaring. Vores tapetserere er eksperter i at matche mønstre, så samlingerne næsten er usynlige. Vi sørger for, at mønsteret flugter perfekt på tværs af vægge og omkring vinduer og døre."
      }
    ],
    benefits: [
      "Alle typer tapet håndteres",
      "Perfekt mønstermatch",
      "Grundig forberedelse af vægge",
      "Ingen bobler eller skæve samlinger",
      "Erfarne specialister"
    ],
    relatedServices: ["malerarbejde", "maling-af-lejlighed", "sprojtespartling"]
  },

  "traemaling": {
    title: "Træmaling",
    metaTitle: `Træmaling udvendig — Vinduer & døre | Gratis tilbud`,
    metaDescription: `Beskyt dit træværk med professionel udvendig maling. Vinduer, døre, facader og hegn. Holdbar finish. Ring ${COMPANY.phone}`,
    heroHeading: "Professionel træmaling",
    heroSubheading: "Beskyt og forskøn dit træværk med professionel maling",
    intro: `Træ kræver regelmæssig vedligeholdelse for at holde sig flot og beskytte mod vejr og vind. ${COMPANY.name} specialiserer sig i udvendig træmaling og sikrer, at dit træværk både ser fantastisk ud og er godt beskyttet i mange år frem.`,
    sections: [
      {
        title: "Vinduer og døre",
        content: "Vinduer og døre er særligt udsatte for vejrpåvirkning. Vi forbereder, sliver og maler dine vinduer og døre med kvalitetsmaling, der beskytter mod fugt og UV-stråler. Resultatet er et flot og langtidsholdbart finish."
      },
      {
        title: "Facadebeklædning",
        content: "Træbeklædte facader giver dit hus karakter, men kræver vedligeholdelse. Vi maler alle typer træfacader – fra klassiske fjælehuse til moderne træbeklædning. Vi bruger specialmaling, der åndbar og beskytter træet optimalt."
      },
      {
        title: "Hegn og udhuse",
        content: "Hegn, skure og udhuse får også glæde af professionel maling. Vi forbereder træet grundigt og påfører maling, der modstår både regn og sol. Forlæng levetiden på dit træværk med professionel vedligeholdelse."
      }
    ],
    benefits: [
      "Specialmaling til udendørs brug",
      "Grundig forberedelse af træet",
      "Beskytter mod vejr og UV",
      "Forlænger træets levetid markant",
      "Alle typer træværk håndteres"
    ],
    relatedServices: ["maling-af-carport", "maling-hus", "maling-af-sommerhus"]
  },

  "pcbforsegling": {
    title: "PCB-forsegling",
    metaTitle: `PCB-forsegling — Certificeret indkapsling | Sikker proces`,
    metaDescription: `Certificeret PCB-forsegling og indkapsling efter gældende regler. Sikker håndtering af sundhedsskadelige fuger. Ring ${COMPANY.phone}`,
    heroHeading: "PCB-forsegling",
    heroSubheading: "Sikker håndtering og indkapsling af PCB-holdige materialer",
    intro: `PCB-holdige fuger og materialer findes i mange bygninger fra 1950-1977 og udgør en sundhedsrisiko. ${COMPANY.name} tilbyder professionel PCB-forsegling og indkapsling efter alle gældende regler og standarder.`,
    sections: [
      {
        title: "Hvad er PCB?",
        content: "PCB (polychlorerede biphenyler) blev brugt i byggematerialer frem til 1977. Stoffet kan påvirke helbredet negativt og skal håndteres korrekt. Vi rådgiver om, hvordan PCB i din bygning bedst håndteres – om det kræver fjernelse eller kan indkapsles."
      },
      {
        title: "Professionel indkapsling",
        content: "Ved indkapsling forsegles PCB-holdige materialer, så de ikke afgiver dampe til indeklimaet. Vi bruger godkendte produkter og følger alle sikkerhedsprocedurer. Metoden er ofte mere skånsom og billigere end komplet fjernelse."
      },
      {
        title: "Dokumentation og sikkerhed",
        content: "Vi leverer fuld dokumentation for alt udført arbejde. Vores medarbejdere er uddannet i sikker håndtering af farlige stoffer, og vi følger alle lovkrav og anbefalinger fra Arbejdstilsynet."
      }
    ],
    benefits: [
      "Certificeret og godkendt arbejde",
      "Sikker håndtering efter alle regler",
      "Fuld dokumentation",
      "Uddannede specialister",
      "Rådgivning om bedste løsning"
    ],
    relatedServices: ["malerarbejde", "maling-af-lejlighed"]
  },

  "metallisk-pu-gulv": {
    title: "Metallisk PU-gulv",
    metaTitle: `Metallisk PU-gulv — Eksklusive designgulve | Se projekter`,
    metaDescription: `Unikke metalliske polyuretangulve til moderne hjem og erhverv. Eksklusiv finish, holdbart resultat. Gratis tilbud — ring ${COMPANY.phone}`,
    heroHeading: "Metallisk PU-gulv",
    heroSubheading: "Spektakulære designgulve med unik metallisk finish",
    intro: `Metalliske PU-gulve er det ultimative valg for dig, der ønsker et unikt og spektakulært gulv. ${COMPANY.name} specialiserer sig i disse eksklusive gulvløsninger, der kombinerer holdbarhed med fantastisk æstetik.`,
    sections: [
      {
        title: "Unik visual effekt",
        content: "Metalliske PU-gulve skaber en fantastisk 3D-effekt med dybde og glans. Lysets refleksion i gulvet giver et unikt look, der ændrer sig efter synsvinklen. Hvert gulv er helt unikt og kan tilpasses i farver og mønstre."
      },
      {
        title: "Holdbarhed og kvalitet",
        content: "Trods det spektakulære udseende er metalliske PU-gulve ekstremt holdbare og lette at vedligeholde. De er kemikalieresistente, slidstærke og kan bruges i både private hjem og erhvervslokaler."
      },
      {
        title: "Anvendelsesmuligheder",
        content: "Metalliske PU-gulve er populære i moderne boliger, showrooms, butikker, restauranter og kontorer. De skaber wow-effekt og giver rummet en eksklusiv atmosfære."
      }
    ],
    benefits: [
      "Unik 3D metallisk effekt",
      "Ekstremt holdbart og slidstærkt",
      "Kemikalieresistent",
      "Nemt at vedligeholde",
      "Uendeligt mange farvemuligheder"
    ],
    relatedServices: ["pu-gulve", "malerarbejde"]
  },

  "billig-maler": {
    title: "Billig maler",
    metaTitle: `Billig maler — Kvalitet til fair priser | ★ 4.9`,
    metaDescription: `Professionelt malerarbejde til konkurrencedygtige priser. Kvalitet behøver ikke koste en formue. Gratis tilbud — ring ${COMPANY.phone}`,
    heroHeading: "Kvalitetsmaling til fair priser",
    heroSubheading: "Professionelt malerarbejde uden at det koster det hvide ud af øjnene",
    intro: `Hos ${COMPANY.name} tror vi på, at alle fortjener professionelt malerarbejde til en fair pris. Vi holder omkostningerne nede uden at gå på kompromis med kvaliteten. Få et gratis tilbud og se selv, at vi kan levere kvalitet til fornuftige penge.`,
    sections: [
      {
        title: "Hvordan holder vi priserne nede?",
        content: "Vi er effektive i vores arbejde og har optimerede processer. Vi køber materialer i store mængder og får gode priser hos vores leverandører. Disse besparelser giver vi videre til vores kunder. Kvalitet og fair priser går hånd i hånd hos os."
      },
      {
        title: "Ingen skjulte omkostninger",
        content: "Når du får et tilbud fra os, er det en fast pris uden overraskelser. Vi gennemgår projektet grundigt inden start, så vi ved præcis, hvad der skal laves. Så slipper du for ubehagelige ekstraregninger."
      },
      {
        title: "Samme kvalitet, fair pris",
        content: "At vi tilbyder konkurrencedygtige priser betyder ikke, at vi går på kompromis. Vi bruger stadig kvalitetsmaling, erfarne malere og grundig forberedelse. Du får bare mere for pengene hos os."
      }
    ],
    benefits: [
      "Konkurrencedygtige priser",
      "Fast tilbud uden overraskelser",
      "Samme høje kvalitet som altid",
      "Effektiv og professionel service",
      "Gratis og uforpligtende tilbud"
    ],
    relatedServices: ["malerarbejde", "maling-af-lejlighed", "maling-flyttelejlighed"]
  },

  "sprojtespartling": {
    title: "Sprøjtespartling",
    metaTitle: `Sprøjtespartling — Hurtigere & jævnere end traditionel`,
    metaDescription: `Professionel sprøjtespartling af vægge og lofter. Hurtigere, jævnere og mere effektivt. Gratis tilbud — ring ${COMPANY.phone}`,
    heroHeading: "Sprøjtespartling",
    heroSubheading: "Hurtig og effektiv spartling med professionelt resultat",
    intro: `Sprøjtespartling er en effektiv metode til at skabe perfekt glatte vægge og lofter. ${COMPANY.name} tilbyder professionel sprøjtespartling, der giver et jævnt og holdbart underlag for maling eller tapet.`,
    sections: [
      {
        title: "Hvad er sprøjtespartling?",
        content: "Ved sprøjtespartling påføres et tyndt lag spartelmasse på vægge og lofter ved hjælp af specialudstyr. Metoden er hurtigere end traditionel spartling og giver et ensartet, glat resultat. Det er ideelt til renovering af ældre vægge med ujævnheder."
      },
      {
        title: "Fordele ved sprøjtespartling",
        content: "Sprøjtespartling er hurtigere end håndsparlting, giver et mere ensartet resultat og dækker effektivt smårevner og ujævnheder. Metoden er velegnet til store flader og er en populær løsning ved totalrenovering af boliger."
      },
      {
        title: "Perfekt underlag for maling",
        content: "Efter sprøjtespartlingen slibes overfladen let og er klar til maling. Resultatet er perfekt glatte vægge, der får malingen til at fremstå flot og professionel. Vi tilbyder naturligvis også efterfølgende maling."
      }
    ],
    benefits: [
      "Hurtigere end traditionel spartling",
      "Ensartet og glat overflade",
      "Dækker smårevner effektivt",
      "Ideelt til renovering",
      "Professionelt udstyr og erfaring"
    ],
    relatedServices: ["malerarbejde", "maling-af-lejlighed", "sproejtmaling"]
  },

  "sproejtmaling": {
    title: "Sprøjtemaling",
    metaTitle: `Sprøjtemaling — Jævn finish på store flader | ★ 4.9`,
    metaDescription: `Sprøjtemaling af vægge, lofter og facader. Hurtigere og jævnere end traditionel rulle. Gratis tilbud — ring ${COMPANY.phone}`,
    heroHeading: "Professionel sprøjtemaling",
    heroSubheading: "Hurtig og effektiv maling med professionelt udstyr",
    intro: `Sprøjtemaling er den mest effektive metode til maling af store flader. ${COMPANY.name} tilbyder professionel sprøjtemaling med moderne udstyr, der giver et flot og ensartet resultat på rekordtid.`,
    sections: [
      {
        title: "Hvornår bruger vi sprøjtemaling?",
        content: "Sprøjtemaling er ideelt til store, sammenhængende flader som vægge, lofter, facader og industribyggeri. Metoden er hurtigere end traditionel rulle- eller penselmaling og giver en helt jævn finish uden penselstrøg eller rullemærker."
      },
      {
        title: "Professionelt udstyr",
        content: "Vi bruger moderne airless sprøjteudstyr af høj kvalitet. Det sikrer en præcis og ensartet påføring af malingen. Vores malere er uddannet i korrekt brug af udstyret og ved, hvordan man opnår det bedste resultat."
      },
      {
        title: "Effektivt og hurtigt",
        content: "Sprøjtemaling kan typisk udføres på en brøkdel af den tid, traditionel maling tager. Det gør metoden økonomisk attraktiv, især ved større projekter. Du får et flot resultat hurtigere og til en konkurrencedygtig pris."
      }
    ],
    benefits: [
      "Hurtigere end traditionel maling",
      "Perfekt jævn finish",
      "Ideelt til store flader",
      "Moderne professionelt udstyr",
      "Omkostningseffektivt"
    ],
    relatedServices: ["sprojtespartling", "malerarbejde", "maling-hus"]
  },

  "microcement": {
    title: "Microcement",
    metaTitle: `Microcement badeværelse & køkken — Se 16+ projekter`,
    metaDescription: `Microcement til badeværelse, køkken og gulve. Fugesløs, vandtæt og stilren finish. Se vores projekter. Ring ${COMPANY.phone}`,
    heroHeading: "Microcement",
    heroSubheading: "Moderne, fugesløs vægbeklædning til badeværelser og køkkener",
    intro: `Microcement er populære alternativer til traditionelle fliser. ${COMPANY.name} har stor erfaring med disse moderne vægbeklædninger, der giver et smukt, fugesløst og vandtæt resultat.`,
    sections: [
      {
        title: "Hvad er microcement?",
        content: "Microcement er en håndværksmæssig overfladebehandling, der skaber en unik, silkeblød finish på vægge. Materialet påføres i flere lag og poleres til en glat overflade. Resultatet er en vandtæt, holdbar og æstetisk smuk vægbeklædning."
      },
      {
        title: "Perfekt til badeværelser",
        content: "Microcement er ideelt til badeværelser, da det er 100% vandtæt og modstandsdygtigt over for fugt. Den fugesløse overflade er nem at rengøre og giver ingen fuger, hvor skimmel kan sætte sig. Det giver et moderne og hygiejnisk badeværelse."
      },
      {
        title: "Unikke designmuligheder",
        content: "Microcement fås i utallige farver og kan tilpasses din stil. Vi kan skabe alt fra minimalistiske betonlook til varme, jordnære toner. Se vores galleri med 16+ færdige projekter for inspiration."
      }
    ],
    benefits: [
      "100% vandtæt og fugesløs",
      "Unik håndværksmæssig finish",
      "Nemt at rengøre og vedligeholde",
      "Utallige farvemuligheder",
      "Lang holdbarhed"
    ],
    relatedServices: ["malerarbejde", "pu-gulve", "maling-af-lejlighed"]
  },

  "pu-gulve": {
    title: "PU-gulve",
    metaTitle: `PU-gulve — Holdbare polyuretangulve | Alle formål`,
    metaDescription: `Professionelle PU-gulve til private og erhverv. Holdbare, kemikaliebestandige og nemme at vedligeholde. Ring ${COMPANY.phone}`,
    heroHeading: "Polyuretangulve (PU-gulve)",
    heroSubheading: "Holdbare og fleksible gulvløsninger til alle formål",
    intro: `PU-gulve (polyuretangulve) er en af de mest alsidige og holdbare gulvløsninger på markedet. ${COMPANY.name} tilbyder professionelle PU-gulve til private, erhverv og industri.`,
    sections: [
      {
        title: "Hvad er PU-gulve?",
        content: "PU-gulve er støbte gulve baseret på polyuretan – et materiale, der kombinerer styrke med fleksibilitet. Gulvene er sømløse, vandtætte og ekstremt holdbare. De kan tilpasses med farver, mønstre og finish efter dine ønsker."
      },
      {
        title: "Fordele ved PU-gulve",
        content: "PU-gulve er kemikalieresistente, slidstærke og lette at rengøre. De dæmper lyd, er behagelige at gå på og kan modstå tung trafik. Gulvene er hygiejniske og godkendt til fødevareindustri og sundhedssektor."
      },
      {
        title: "Anvendelsesmuligheder",
        content: "PU-gulve bruges i private hjem, kontorer, butikker, lagre, produktionsfaciliteter og meget mere. Vi tilpasser gulvet til dine specifikke behov – om det er et elegant stueligt eller et slidstærkt industrigulv."
      }
    ],
    benefits: [
      "Ekstremt holdbart og slidstærkt",
      "Kemikalieresistent og vandtæt",
      "Lyddæmpende og behageligt",
      "Hygiejnisk og nemt at rengøre",
      "Utallige designmuligheder"
    ],
    relatedServices: ["metallisk-pu-gulv", "malerarbejde"]
  },

  "indvendig-maling": {
    title: "Indvendig maling",
    metaTitle: `Indvendig maling — Vægge, lofter & træværk | ★ 4.9`,
    metaDescription: `Professionel indvendig maling af vægge, lofter, døre og paneler. Grundig forberedelse, perfekt resultat. Ring ${COMPANY.phone}`,
    heroHeading: "Professionel indvendig maling",
    heroSubheading: "Giv dit hjem en frisk start med professionel indvendig maling",
    intro: `Indvendig maling forvandler dit hjem og skaber en helt ny atmosfære. Hos ${COMPANY.name} har vi over mange år opbygget ekspertise i indvendig maling af alle typer boliger — fra moderne lejligheder til ældre villaer med stukkatur og paneler. Vores erfarne malere leverer altid et professionelt resultat, der holder i årevis. Vi er medlemmer af Danske Malermestre og har en Trustpilot-score på 4,9 baseret på over 250 anmeldelser fra tilfredse kunder i Slagelse og omegn.`,
    sections: [
      {
        title: "Vægmaling — fundamentet for et flot rum",
        content: "Væggene er det første, øjet falder på, når man træder ind i et rum. Derfor er professionel vægmaling afgørende for det samlede indtryk af dit hjem. Hos Schou & Christensen bruger vi udelukkende kvalitetsvægmaling fra anerkendte producenter som Beck & Jørgensen. Vi rådgiver om den rigtige glansgrad — mat, halvmat eller blank — afhængigt af rummets formål og lysforhold. Inden malingen starter, dækker vi omhyggeligt gulve og møbler af, så dit hjem forbliver rent under hele processen."
      },
      {
        title: "Loftmaling kræver præcision",
        content: "Lofter er ofte det mest oversete element ved indvendig maling, men et nymaletet loft løfter hele rummet markant. Vi anvender specialmaling til lofter, der minimerer risikoen for dryp og giver en ensartet, flot overflade. Vores malere har teknikken til at undgå synlige rullemærker og kanter — noget der kræver erfaring og de rigtige værktøjer. Ved større renoveringsprojekter kan vi tilbyde sprøjtemaling af lofter, som giver et endnu mere ensartet resultat."
      },
      {
        title: "Maling af døre, karme og paneler",
        content: "Træværk som døre, vindueskarme og paneler kræver særlig behandling. Vi starter med at slibe overfladen ned, fjerne gammel løs maling og grunde hvor nødvendigt. Derefter påfører vi kvalitetslak i den ønskede glansgrad. Resultatet er en holdbar og smuk finish, der modstår daglig slid og rengøring. Mange kunder vælger at kombinere hvide karme med farvede vægge — et klassisk look, der aldrig går af mode."
      },
      {
        title: "Forberedelse er halvdelen af arbejdet",
        content: "Et professionelt malerresultat starter længe før penslen rører væggen. Grundig forberedelse er nøglen til et holdbart resultat. Vores malere inspicerer alle overflader for revner, huller og skader. Vi udfører spartling af ujævnheder, grundbehandling af nye overflader og sikrer, at underlaget er rent og tørt. Denne omhyggelige forberedelse er det, der adskiller professionelt malerarbejde fra DIY — og det er derfor, vores arbejde holder i mange år."
      },
      {
        title: "Indvendig maling pris — hvad koster det?",
        content: "Prisen på indvendig maling afhænger af flere faktorer: rummets størrelse, overfladens tilstand, farvevalg og ønsket finish. Vi tilbyder altid et gratis og uforpligtende tilbud, hvor vi gennemgår projektet på stedet. Vores priser er konkurrencedygtige, og vi giver en fast pris uden skjulte omkostninger. Ring til os på 53 50 77 00 eller udfyld kontaktformularen, så vender vi tilbage med et tilbud inden for 24 timer."
      },
      {
        title: "Hvorfor vælge professionel indvendig maling?",
        content: "Mange overvejer at male selv for at spare penge, men professionel indvendig maling er ofte den bedste investering. Vores malere arbejder effektivt med professionelt udstyr og har øje for de små detaljer, der gør forskellen. Vi ved, hvordan man undgår striber, dryp og synlige kanter. Derudover rydder vi altid op efter os, så dit hjem er klar til brug umiddelbart efter malerarbejdet. Med Schou & Christensen får du et resultat, der holder — og en service, der gør processen nem og bekvem for dig."
      }
    ],
    benefits: [
      "Gratis og uforpligtende tilbud",
      "Erfarne malere med øje for detaljer",
      "Kvalitetsmaling fra Beck & Jørgensen",
      "Grundig forberedelse og spartling",
      "Rydder altid op efter os",
      "Konkurrencedygtige priser"
    ],
    relatedServices: ["maling-af-loft", "spartling", "maling-af-lejlighed", "maling-hus"]
  },

  "udvendig-maling": {
    title: "Udvendig maling",
    metaTitle: `Udvendig maling — Hold dit hus flot i årevis | ★ 4.9`,
    metaDescription: `Udvendig maling af hus, facade og træværk. Vejrbestandig kvalitetsmaling der holder. Gratis tilbud — ring ${COMPANY.phone}`,
    heroHeading: "Udvendig maling af hus",
    heroSubheading: "Beskyt og forskøn dit hus med professionel udvendig maling",
    intro: `Udvendig maling er husets første forsvar mod det danske vejr — regn, frost, sol og fugt. Hos ${COMPANY.name} har vi specialiseret os i udvendig maling af alle typer huse i Slagelse og på hele Sjælland. Vores erfarne malere ved præcis, hvilke produkter og teknikker der giver det bedste og mest holdbare resultat. Vi er stolte medlemmer af Danske Malermestre og har en Trustpilot-score på 4,9 fra over 250 tilfredse kunder.`,
    sections: [
      {
        title: "Facademaling — giv dit hus nyt liv",
        content: "Facaden er husets ansigt udadtil, og en flot vedligeholdt facade øger både husets værdi og din glæde ved at komme hjem. Vi maler alle typer facader — pudsede, murede, træbeklædte og betonflader. Inden malingen forbereder vi overfladen grundigt: vi renser facaden for alger, skidder og løs maling, udbedrer revner og skader, og grunder hvor nødvendigt. Vores kvalitetsfacademaling fra Beck & Jørgensen er udviklet til det danske klima og giver op til 10-15 års holdbarhed."
      },
      {
        title: "Træbeskyttelse og maling af træværk",
        content: "Udendørs træværk er særligt udsat for vejrpåvirkning og kræver specialbehandling. Vi behandler alt træværk — vinduer, døre, stern, udhæng og træbeklædning — med professionelle træbeskyttelsesprodukter, der forhindrer råd, svamp og nedbrydning. Vores proces inkluderer afrensning, slibning, grundbehandling og topcoat med vejrbestandig maling. Resultatet er træværk, der ser fantastisk ud og holder i mange år."
      },
      {
        title: "Vinduer og døre — detaljer der gør forskellen",
        content: "Vinduer og døre er husets smykker og fortjener særlig opmærksomhed. Vi maler både udvendige og indvendige vinduesrammer i samme arbejdsgang, hvis ønsket. Vores malere har teknikken til at opnå skarpe kanter og en jævn finish, selv på komplekst profileret træværk. Vi bruger kvalitetslak, der er modstandsdygtig over for UV-stråler og temperatursvingninger — de to største fjender for udvendig maling."
      },
      {
        title: "Vejrforhold og timing",
        content: "Udvendig maling kræver de rigtige vejrforhold. Den optimale sæson for udvendig maling i Danmark er fra april til oktober, når temperaturen er over 10 grader, og der ikke er risiko for frost eller regn. Vi planlægger altid vores projekter med vejrudsigten i tankerne og sikrer, at malingen får tid til at tørre ordentligt mellem lag. Kontakt os tidligt på sæsonen for at sikre en plads i kalenderen — de bedste måneder booker hurtigt op."
      },
      {
        title: "Stillads og sikkerhed",
        content: "Ved udvendig maling af højere bygninger sørger vi for opstilling af professionelt stillads, der sikrer vores maleres sikkerhed og giver adgang til alle overflader. Stilladset er inkluderet i vores tilbud, så du kender den fulde pris på forhånd. Vi overholder alle sikkerhedsregler og sørger for, at arbejdspladsen er sikker for både vores medarbejdere og beboere."
      },
      {
        title: "Udvendig maling pris — hvad skal du forvente?",
        content: "Prisen på udvendig maling afhænger af husets størrelse, overfladernes tilstand, valg af farve og produkter samt behovet for stillads. Vi tilbyder altid et gratis besøg, hvor vi vurderer opgaven og giver et fast tilbud uden overraskelser. Som tommelfingerregel kan udvendig maling af et typisk parcelhus ligge fra 30.000-80.000 kr. afhængigt af omfanget. Ring til os på 53 50 77 00 for at høre mere om priser og muligheder."
      }
    ],
    benefits: [
      "Specialiseret i danske vejrforhold",
      "Kvalitetsmaling med 10-15 års holdbarhed",
      "Stillads og sikkerhedsudstyr inkluderet",
      "Grundig forberedelse af alle overflader",
      "Gratis besøg og fast tilbud",
      "Over 250 tilfredse kunder på Trustpilot"
    ],
    relatedServices: ["maling-af-facade", "maling-af-vinduer", "traemaling", "maling-hus"]
  },

  "maling-af-loft": {
    title: "Maling af loft",
    metaTitle: `Maling af loft — Ingen striber eller mærker | ★ 4.9`,
    metaDescription: `Professionel loftmaling uden striber. Sprøjte- og rulleteknik for perfekt resultat i alle rum. Ring ${COMPANY.phone}`,
    heroHeading: "Professionel maling af loft",
    heroSubheading: "Få et perfekt malet loft uden striber og rullemærker",
    intro: `Loftet er ofte det mest krævende element at male — men også det element, der gør den største forskel i et rum. Hos ${COMPANY.name} har vores malere specialiseret sig i loftmaling og ved præcis, hvordan man opnår et perfekt resultat uden synlige rullemærker, striber eller skygger. Vi arbejder i hele Slagelse og på Sjælland, og med over 250 femstjernede anmeldelser på Trustpilot kan du være tryg ved at vælge os til dit næste loftprojekt.`,
    sections: [
      {
        title: "Hvorfor er loftmaling så udfordrende?",
        content: "Lofter er notorisk svære at male. Lyset falder skråt ind fra vinduer og lamper, hvilket afslører selv de mindste ujævnheder og rullemærker. Arbejdsstillingen er akavet, og malingen tørrer anderledes end på lodrette flader. Det er derfor, mange DIY-projekter ender med synlige striber og skuffende resultater. Vores professionelle malere har teknikken, værktøjerne og erfaringen til at levere et fejlfrit loft hver gang."
      },
      {
        title: "Vores teknik til perfekte lofter",
        content: "Vi bruger en kombination af de rigtige produkter og teknik. Først sikrer vi, at loftet er forberedt korrekt — eventuelle revner spartles, og overfladen slibes let. Vi arbejder systematisk i baner og holder altid en 'våd kant' for at undgå synlige overgange. Vores malere bruger professionelle ruller designet til lofter og kvalitetsloftmaling med det optimale tørretid. Ved større projekter kan vi anvende sprøjtemaling, der giver et endnu mere ensartet resultat."
      },
      {
        title: "Typiske loftproblemer vi løser",
        content: "Gulnede lofter, vandskader, revner og nikotinpletter er problemer, vi løser hver dag. Gulning skyldes ofte alderdom eller cigaretrøg og kræver en dækkende grunding inden maling. Vandskader fra utætte rør eller tag behandles med specialprodukter, der forhindrer gennemblødning. Revner i gipslofter spartles og slibes, så de bliver usynlige. Uanset hvad dit loft har været udsat for, har vi en løsning."
      },
      {
        title: "Farvevalg til lofter",
        content: "De fleste vælger hvidt til loftet — og med god grund. Et hvidt loft reflekterer lyset og får rummet til at føles større og lysere. Men loftsfarven behøver ikke være kedelig. Vi rådgiver om alle muligheder: en let nuance af vægfarven giver et sammenhængende look, mens en mørkere farve kan skabe drama i høje rum. Vi medbringer gerne farveprøver, så du kan se mulighederne i dit eget hjem."
      },
      {
        title: "Forberedelse og afdækning",
        content: "Inden loftmalingen starter, dækker vi gulve og møbler omhyggeligt af med presenninger og plastik. Lysarmaturer afmonteres eller dækkes til. Vi taper omhyggeligt langs loftskanter og i overgangen til vægge for at sikre skarpe kanter. Denne grundige forberedelse er en del af vores service og sikrer, at dit hjem forbliver rent under hele processen."
      },
      {
        title: "Pris på maling af loft",
        content: "Prisen på loftmaling afhænger af rummets størrelse, loftets tilstand og om der skal spartles først. Vi tilbyder altid et gratis tilbudsbesøg, hvor vi vurderer opgaven og giver en fast pris. Som udgangspunkt regner vi fra ca. 60-100 kr. pr. m² for loftmaling inkl. forberedelse og materialer. Ring til os på 53 50 77 00 eller udfyld kontaktformularen for et konkret tilbud på dit projekt."
      }
    ],
    benefits: [
      "Specialiseret i loftmaling",
      "Ingen synlige rullemærker eller striber",
      "Løser gulning, vandskader og revner",
      "Grundig afdækning af møbler og gulve",
      "Gratis tilbudsbesøg",
      "Fast pris uden overraskelser"
    ],
    relatedServices: ["indvendig-maling", "spartling", "sproejtmaling", "maling-af-lejlighed"]
  },

  "maling-af-facade": {
    title: "Facademaling",
    metaTitle: `Facademaling — Nyt liv til dit hus | 250+ tilfredse kunder`,
    metaDescription: `Facademaling og renovering af alle typer: puds, mursten, beton og træ. Vejrbestandig finish. Gratis tilbud — ring ${COMPANY.phone}`,
    heroHeading: "Professionel facademaling",
    heroSubheading: "Giv din facade nyt liv med holdbar kvalitetsmaling",
    intro: `Facaden er det første, man ser, når man nærmer sig dit hjem — og en velholdt facade gør hele forskellen for husets udtryk og værdi. Hos ${COMPANY.name} har vi mange års erfaring med facademaling af alle typer huse i Slagelse og på hele Sjælland. Vores fagligt dygtige malere behandler din facade med de bedste produkter på markedet og sikrer et resultat, der holder i 10-15 år. Med over 250 femstjernede anmeldelser på Trustpilot og medlemskab af Danske Malermestre er vi et trygt valg.`,
    sections: [
      {
        title: "Alle typer facader",
        content: "Vi maler alle facadetyper — pudsede facader, murstensfacader, betonfacader og træbeklædte facader. Hver facadetype kræver sin egen forberedelse og produktvalg. Pudsede facader skal ofte renses for alger og repareres for revner inden maling. Mursten kan males eller imprægneres afhængigt af ønsket look. Træfacader kræver specialprodukter, der beskytter mod fugt og UV-stråler. Vores malere har erfaringen til at vælge den rigtige løsning til netop dit hus."
      },
      {
        title: "Forberedelse er afgørende",
        content: "Et langtidsholdbart resultat starter med grundig forberedelse. Vi renser facaden for alger, mos og skidt med professionelt udstyr. Revner og skader udbedres med egnet spartelmasse og mørtel. Løs eller skallende maling fjernes. Vi grunder overfladen, hvor nødvendigt, for at sikre optimal vedhæftning af den nye maling. Denne forberedelse tager tid, men er afgørende for, at malingen holder i mange år."
      },
      {
        title: "Facadefarver og planlægning",
        content: "Valg af facadefarve er en stor beslutning — farven bliver en del af dit kvarters udtryk i mange år. Vi hjælper med farverådgivning baseret på husets arkitektur, omkringliggende bygninger og dine personlige præferencer. Vær opmærksom på, at der i nogle områder gælder lokalplaner eller bevaringsværdige hensyn, der begrænser farvevalget. Vi rådgiver gerne om regler og muligheder i dit område."
      },
      {
        title: "Vejrbestandige produkter",
        content: "Vi bruger udelukkende facademaling fra anerkendte producenter som Beck & Jørgensen, der er specifikt udviklet til det danske klima. Vores facademaling er diffusionsåben (åndbar), så fugt i murværket kan slippe ud, samtidig med at regn holdes ude. Den er UV-bestandig for at forhindre falmning og har tilsætningsstoffer, der hæmmer vækst af alger og mos. Resultatet er en facade, der ser flot ud år efter år."
      },
      {
        title: "Stillads og sikkerhed",
        content: "Facademaling kræver ofte adgang til højden via stillads eller lift. Vi sørger for professionelt stillads, der giver sikker adgang til alle dele af facaden. Stilladsomkostninger er inkluderet i vores faste tilbud, så du kender den fulde pris på forhånd. Vores medarbejdere er uddannet i sikkerhed på stillads, og vi overholder alle gældende arbejdsmiljøregler."
      },
      {
        title: "Facademaling pris",
        content: "Prisen på facademaling varierer afhængigt af husets størrelse, facadens tilstand, adgangsforhold og farvevalg. Et typisk parcelhus kan ligge fra 40.000-100.000 kr. for komplet facademaling inkl. stillads og forberedelse. Vi tilbyder altid et gratis besøg, hvor vi vurderer opgaven og giver et detaljeret, fast tilbud. Ring til os på 53 50 77 00 for at aftale et uforpligtende tilbudsbesøg."
      }
    ],
    benefits: [
      "Erfaring med alle facadetyper",
      "Vejrbestandig maling med 10-15 års holdbarhed",
      "Stillads inkluderet i prisen",
      "Grundig forberedelse og reparation",
      "Farverådgivning og hjælp med lokalplaner",
      "Fast tilbud uden skjulte omkostninger"
    ],
    relatedServices: ["udvendig-maling", "maling-hus", "traemaling", "maling-af-vinduer"]
  },

  "maling-af-vinduer": {
    title: "Maling af vinduer",
    metaTitle: `Maling af vinduer — Forlæng levetiden med 10+ år`,
    metaDescription: `Professionel vinduesmaling ude og inde. Grundig slibning, grunding og finish. Forlæng levetiden markant. Ring ${COMPANY.phone}`,
    heroHeading: "Professionel maling af vinduer",
    heroSubheading: "Forlæng dine vinduers levetid med professionel vinduesmaling",
    intro: `Vinduer er blandt de mest udsatte dele af dit hus — de skal modstå regn, sol, frost og kondens døgnet rundt. Regelmæssig maling af vinduer er den bedste investering, du kan gøre for at forlænge deres levetid og undgå dyre udskiftninger. Hos ${COMPANY.name} i Slagelse har vi specialiseret os i vinduesmaling med korrekt forbehandling og kvalitetsprodukter. Vores kunder på Sjælland giver os 4,9 ud af 5 stjerner på Trustpilot — et bevis på, at vi leverer kvalitet.`,
    sections: [
      {
        title: "Hvorfor er vinduesmaling så vigtig?",
        content: "Maling beskytter vinduets træværk mod fugt, råd og UV-stråler. Uden denne beskyttelse trænger vand ind i træet, som begynder at rådne indefra. Når råd først har sat ind, er udskiftning ofte eneste løsning — en udgift, der hurtigt løber op i mange tusinde kroner per vindue. Regelmæssig maling hvert 5-8 år er langt billigere og holder dine vinduer funktionelle i årtier."
      },
      {
        title: "Vores vinduesmalingsproces",
        content: "Vi starter med en grundig inspektion af hvert vindue. Løs og skallende maling fjernes med skraber og slibepapir. Eventuelt råd fjernes ned til sundt træ og repareres med epoxy eller træfyldstof. Alle overflader slibes og støves af. Vi grunder bart træ og overgange med kvalitetsgrundemaling. Til sidst påfører vi to lag topcoat med kvalitetslak eller træbeskyttelse, der giver optimal holdbarhed."
      },
      {
        title: "Indvendige og udvendige vinduer",
        content: "Vi maler både indvendige og udvendige vinduesrammer — og ofte giver det mening at gøre begge i samme omgang. Udvendigt bruger vi produkter med høj UV-bestandighed og vejrbeskyttelse. Indvendigt vælger vi maling, der er slidstærk og let at rengøre. Vi kan male vinduer i forskellige farver inde og ude, hvis ønsket — f.eks. hvide rammer indvendigt og en farve, der matcher facaden, udvendigt."
      },
      {
        title: "Træ versus metal- og plastikvinduer",
        content: "Vores speciale er trævinduesmaling, som kræver mest vedligeholdelse. Men vi maler også aluminiums- og metalvinduer med specialmaling designet til disse materialer. Plastikvinduer kan generelt ikke males, men trærammer omkring plast-ruder kan vedligeholdes. Vi rådgiver altid om den bedste løsning til netop dine vinduer ved tilbudsbesøget."
      },
      {
        title: "Typiske problemer ved vinduer",
        content: "Vi ser ofte de samme problemer: afskalning af maling på sydsiden (UV-skader), råd i bundstykker (vand-opsamling), kondensskader på indvendige rammer og mørnede hjørnesamlinger. Alle disse problemer kan vi udbedre som del af malerarbejdet, så længe skaden ikke er for fremskreden. Ved alvorlig råd kan vi anbefale snedkerreparation eller udskiftning af enkelte vinduespartier."
      },
      {
        title: "Pris på vinduesmaling",
        content: "Prisen på maling af vinduer afhænger af antallet af vinduer, deres størrelse, tilstand og om der skal arbejdes på flere etager. Som tommelfingerregel koster et standard vindue fra 400-1.000 kr. at male afhængigt af omfanget af forberedelse. Vi tilbyder altid et gratis tilbudsbesøg, hvor vi vurderer hvert vindue og giver en samlet fast pris. Ring til os på 53 50 77 00 for at aftale et besøg."
      }
    ],
    benefits: [
      "Forlænger vinduernes levetid markant",
      "Grundig forbehandling og reparation",
      "Kvalitetsprodukter med UV-beskyttelse",
      "Maling af både ind- og udsiden",
      "Erfarne specialister i vinduesmaling",
      "Gratis tilbudsbesøg"
    ],
    relatedServices: ["udvendig-maling", "traemaling", "maling-af-facade", "maling-hus"]
  },

  "maler-sjaelland": {
    title: "Maler Sjælland",
    metaTitle: `Maler Sjælland — Vi dækker hele øen | 15+ års erfaring`,
    metaDescription: `Professionelt malerfirma der dækker hele Sjælland. Fra Slagelse til København. 250+ tilfredse kunder. Ring ${COMPANY.phone}`,
    heroHeading: "Din maler på hele Sjælland",
    heroSubheading: "Fra vores base i Slagelse dækker vi alle områder på Sjælland",
    intro: `Leder du efter et pålideligt malerfirma på Sjælland? ${COMPANY.name} er baseret i Slagelse og servicerer kunder i hele regionen — fra København og Nordsjælland til Næstved og Kalundborg. Med 8 erfarne medarbejdere, over 250 femstjernede Trustpilot-anmeldelser og medlemskab af Danske Malermestre er vi et trygt valg uanset hvor på Sjælland, du bor. Ring til os på 53 50 77 00 og få et gratis tilbud i dag.`,
    sections: [
      {
        title: "Vi dækker hele Sjælland",
        content: "Fra vores hovedkontor på Ydunsvej 9 i Slagelse kører vores malerhold ud til kunder i hele Sjælland hver dag. Vi dækker alle større byer: København, Roskilde, Næstved, Køge, Holbæk, Kalundborg, Ringsted, Sorø, Vordingborg og alle mindre byer derimellem. Uanset om du bor i en storbylejlighed på Frederiksberg eller et sommerhus ved Nordsjællands kyst, kommer vi til dig med samme professionelle service."
      },
      {
        title: "Hvorfor vælge os som maler på Sjælland?",
        content: "Der findes mange malerfirmaer på Sjælland, men vi skiller os ud på flere måder. For det første er vi medlemmer af Danske Malermestre, som garanterer fagligt korrekt arbejde. For det andet har vi en Trustpilot-score på 4,9 baseret på over 250 anmeldelser — et bevis på, at vores kunder er tilfredse. For det tredje har vi 8 fastansatte malere, hvilket betyder, at vi kan håndtere både små og store projekter med kort varsel. Og endelig er vores ejere personligt involveret i alle projekter og sikrer, at kvaliteten er i top."
      },
      {
        title: "Alle typer malerarbejde",
        content: "Vi tilbyder det fulde spektrum af malerydelser på hele Sjælland: indvendig maling af boliger og erhverv, udvendig maling af huse og facader, vinduesmaling, træmaling, spartling, tapetsering, sprøjtemaling og specialløsninger som microcement og PU-gulve. Vi arbejder for både private husstande, boligforeninger, ejendomsadministratorer og erhvervskunder. Uanset opgavens størrelse leverer vi samme høje kvalitet."
      },
      {
        title: "Konkurrencedygtige priser på Sjælland",
        content: "Vi forstår, at prisen er vigtig. Derfor tilbyder vi konkurrencedygtige priser på alle vores ydelser — uden at gå på kompromis med kvaliteten. Vi køber materialer i store mængder og har effektive arbejdsprocesser, der holder omkostningerne nede. Vores tilbud er altid faste priser uden skjulte omkostninger, så du ved præcis, hvad malerarbejdet kommer til at koste."
      },
      {
        title: "Lokal ekspertise, regional rækkevidde",
        content: "Selvom vi dækker hele Sjælland, er vi stolte af vores lokale rødder i Slagelse. Vi kender områdets byggestil — fra klassiske bindingsværkshuse til moderne parcelhuse — og ved, hvilke udfordringer det sjællandske klima giver. Vores malere bor selv i regionen og har en personlig interesse i at levere arbejde, de kan være stolte af. Mange af vores kunder er gentagne kunder eller kommer via anbefalinger — den bedste kvalitetsmåling der findes."
      },
      {
        title: "Kontakt os for et gratis tilbud",
        content: "Uanset hvor på Sjælland du befinder dig, kommer vi gerne forbi og giver et gratis, uforpligtende tilbud. Ring til os på 53 50 77 00 eller udfyld kontaktformularen herunder. Vi svarer typisk inden for 24 timer og kan ofte komme forbi samme uge. Lad os vise dig, hvorfor over 250 kunder har givet os 5 stjerner på Trustpilot."
      }
    ],
    benefits: [
      "Dækker hele Sjælland fra Slagelse",
      "8 erfarne fastansatte malere",
      "4,9 på Trustpilot med 250+ anmeldelser",
      "Medlem af Danske Malermestre",
      "Alle typer malerarbejde",
      "Konkurrencedygtige faste priser"
    ],
    relatedServices: ["malerarbejde", "indvendig-maling", "udvendig-maling", "erhvervsmaling"]
  },

  "spartling": {
    title: "Spartling",
    metaTitle: `Spartling af vægge — Perfekt resultat | ★ 4.9`,
    metaDescription: `Professionel spartling af vægge og lofter. Plet-spartling, fuld spartling og filt. Perfekt underlag for maling. Ring ${COMPANY.phone}`,
    heroHeading: "Professionel spartling",
    heroSubheading: "Skab det perfekte underlag for maling med professionel spartling",
    intro: `Spartling er fundamentet for et flot malerresultat. Selv den bedste maling kan ikke skjule ujævne vægge, huller og revner — men professionel spartling kan. Hos ${COMPANY.name} tilbyder vi alle typer spartling, fra små reparationer til fuld vægspartling af hele rum. Vores erfarne malere i Slagelse og på Sjælland sikrer et glat og ensartet underlag, der får din maling til at se professionel ud. Med 4,9 på Trustpilot og over 250 anmeldelser er vi et trygt valg.`,
    sections: [
      {
        title: "Hvad er spartling?",
        content: "Spartling er processen med at påføre spartelmasse på vægge og lofter for at skabe en glat, ensartet overflade. Spartelmassen udfylder huller, revner og ujævnheder og slibes efterfølgende til en perfekt finish. Spartling er et håndværk, der kræver øvelse og tålmodighed — men resultatet er vægge, der er klar til at blive malet eller tapetseret med et flot slutresultat."
      },
      {
        title: "Plet-spartling vs. fuld spartling",
        content: "Plet-spartling (også kaldet spot-spartling) bruges til at reparere specifikke områder — huller fra søm og skruer, mindre revner eller lokale skader. Fuld spartling (eller fladespartling) dækker hele vægfladen med et tyndt lag spartelmasse og skaber en helt ensartet overflade. Fuld spartling anbefales ved renovering af ældre vægge med mange ujævnheder eller når du ønsker et perfekt resultat til f.eks. mat maling, der afslører selv små fejl."
      },
      {
        title: "Spartling vs. sprøjtespartling",
        content: "Traditionel spartling påføres i hånden med spartler og slibes manuelt. Sprøjtespartling er en hurtigere metode, hvor spartelmasse påføres med specialudstyr. Sprøjtespartling er ideel til store flader og giver et meget ensartet resultat, men kræver mere afdækning. Vi tilbyder begge metoder og rådgiver om, hvad der passer bedst til dit projekt. Se vores side om sprøjtespartling for mere information."
      },
      {
        title: "Fibervæv og filt + spartling",
        content: "Ved vægge med mange revner eller strukturelle problemer kan vi opsætte fibervæv (også kaldet glasvæv eller malervæv) eller spartlingsfilt inden spartling. Disse materialer skaber et stabilt underlag, der forhindrer revner i at komme tilbage. Derefter spartles og slibes overfladen til en glat finish. Denne løsning er populær ved renovering af ældre ejendomme med bevægelse i vægge og lofter."
      },
      {
        title: "Hvorfor spartling før maling er vigtigt",
        content: "Mange undervurderer betydningen af ordentlig spartling. Maling kan ikke skjule ujævnheder — den fremhæver dem faktisk, især i strejflys. En væg, der ser acceptabel ud inden maling, kan se skuffende ud efter maling, hvis underlaget ikke er forberedt korrekt. Professionel spartling er investeringen værd: du får et resultat, der ser professionelt ud og holder i årevis uden at revner dukker op igen."
      },
      {
        title: "Pris på spartling",
        content: "Prisen på spartling afhænger af omfanget: plet-spartling af huller og skader er billigere end fuld spartling af alle vægge. Væggenes tilstand spiller også ind — vægge med mange revner og ujævnheder kræver mere arbejde. Vi tilbyder altid et gratis tilbudsbesøg, hvor vi vurderer opgaven og giver en fast pris. Ring til os på 53 50 77 00 for at høre mere."
      }
    ],
    benefits: [
      "Skaber perfekt underlag for maling",
      "Plet-spartling og fuld spartling",
      "Erfaring med fibervæv og filt",
      "Grundig slibning for glat finish",
      "Forhindrer revner i at komme tilbage",
      "Gratis tilbudsbesøg"
    ],
    relatedServices: ["sprojtespartling", "indvendig-maling", "maling-af-loft", "maling-af-lejlighed"]
  },

  "erhvervsmaling": {
    title: "Erhvervsmaling",
    metaTitle: `Erhvervsmaling — Weekend & aftenarbejde | Minimal gene`,
    metaDescription: `Maling af erhvervslokaler med minimal forstyrrelse. Kontorer, butikker og lagre. Weekend- og aftenarbejde. Ring ${COMPANY.phone}`,
    heroHeading: "Professionel erhvervsmaling",
    heroSubheading: "Maling af erhvervslokaler med minimal forstyrrelse af din drift",
    intro: `Erhvervslokaler har særlige krav til malerarbejde — det skal være effektivt, professionelt og forstyrre driften mindst muligt. Hos ${COMPANY.name} har vi mange års erfaring med erhvervsmaling af kontorer, butikker, restauranter, lagerhaller og produktionsfaciliteter i Slagelse og på hele Sjælland. Vores hold på 8 erfarne malere kan håndtere projekter i alle størrelser, og vi tilbyder fleksible arbejdstider inkl. aften og weekend. Ring til os på 53 50 77 00 for et gratis tilbud.`,
    sections: [
      {
        title: "Kontormaling uden driftsforstyrrelser",
        content: "Et nymalet kontor øger medarbejdernes trivsel og giver et professionelt indtryk på kunder og samarbejdspartnere. Vi forstår, at kontorer er arbejdspladser, og planlægger malerarbejdet, så det forstyrrer mindst muligt. Vi kan arbejde om aftenen, i weekender eller i ferieperioder, så jeres medarbejdere kan arbejde uforstyrret. Ved større projekter maler vi en afdeling ad gangen, så aktiviteterne kan fortsætte andetsteds."
      },
      {
        title: "Butikker og showrooms",
        content: "I detailhandlen er førsteindtrykket afgørende. En flot malet butik inviterer kunder indenfor og præsenterer dine produkter bedst muligt. Vi har erfaring med maling af butikker, showrooms og udstillingslokaler, hvor æstetik og finish er i højsædet. Vi arbejder hurtigt og effektivt, så din butik kan genåbne hurtigst muligt — ofte kan vi udføre arbejdet i løbet af en enkelt weekend."
      },
      {
        title: "Lagerhaller og produktion",
        content: "Lager- og produktionsfaciliteter kræver holdbar maling, der kan modstå hårdt slid og industrielle forhold. Vi tilbyder specialbelægninger til gulve, vægge og lofter, der er modstandsdygtige over for kemikalier, slid og stød. Vores erhvervsmaling overholder alle sikkerhedsstandarder og kan udføres med minimal påvirkning af produktionen. Vi koordinerer med jeres driftsplanlægning for at finde det bedste tidspunkt."
      },
      {
        title: "Restauranter og caféer",
        content: "I hotel- og restaurationsbranchen er atmosfæren en del af oplevelsen. Vi har malet adskillige restauranter, caféer og hoteller på Sjælland og forstår betydningen af det rette farvevalg og finish. Vi arbejder hurtigt, så I kan åbne for gæster igen hurtigst muligt, og vi sørger selvfølgelig for, at der ikke er malerlugt, når gæsterne kommer."
      },
      {
        title: "Sundhed og sikkerhed",
        content: "Ved erhvervsmaling overholder vi alle gældende arbejdsmiljøregler. Vi bruger lavemitterende maling med minimalt indhold af opløsningsmidler, hvor det er muligt. Vores medarbejdere bærer det nødvendige sikkerhedsudstyr, og vi afdækker og beskytter inventar, maskiner og gulve omhyggeligt. Efter endt arbejde rydder vi op og efterlader lokalerne klar til brug."
      },
      {
        title: "Tilbud på erhvervsmaling",
        content: "Vi tilbyder gratis tilbudsbesøg, hvor vi gennemgår jeres behov og giver et fast tilbud uden skjulte omkostninger. Prisen afhænger af areal, overfladernes tilstand, ønsket finish og arbejdstidspunkter. Ring til os på 53 50 77 00 eller udfyld kontaktformularen. Vi har erfaring med alt fra små kontorer til store produktionshaller og finder en løsning, der passer til jeres budget og tidsplan."
      }
    ],
    benefits: [
      "Fleksible arbejdstider — aften og weekend",
      "Minimal forstyrrelse af driften",
      "8 erfarne malere til store projekter",
      "Specialbelægninger til industri",
      "Overholder alle sikkerhedsstandarder",
      "Fast tilbud uden skjulte omkostninger"
    ],
    relatedServices: ["malerarbejde", "sproejtmaling", "pu-gulve", "indvendig-maling"]
  },

  "maling-af-radiator": {
    title: "Maling af radiator",
    metaTitle: `Maling af radiator — Varmebestandig, flot finish | ★ 4.9`,
    metaDescription: `Professionel radiatormaling med varmebestandig maling. Spray og pensel for perfekt finish. Gratis tilbud — ring ${COMPANY.phone}`,
    heroHeading: "Professionel maling af radiator",
    heroSubheading: "Giv dine radiatorer nyt liv med varmebestandig maling",
    intro: `Radiatorer er en ofte overset del af hjemmet, men en gammel, gulnet eller rusten radiator kan ødelægge indtryk af et ellers nymaletet rum. Hos ${COMPANY.name} tilbyder vi professionel radiatormaling med specialmaling, der tåler høje temperaturer. Vores erfarne malere i Slagelse og på Sjælland sikrer en flot og holdbar finish, der matcher dine vægge. Med 4,9 på Trustpilot og over 250 anmeldelser kan du stole på vores kvalitet.`,
    sections: [
      {
        title: "Hvorfor male radiatoren?",
        content: "Radiatorer gulner og falmer over tid, især hvide radiatorer. Rust kan begynde at vise sig, og gammel maling kan krakelere. En nymaletet radiator frisker op i hele rummet og giver et sammenhængende look med nymalede vægge. Derudover beskytter maling mod rust og forlænger radiatorens levetid. Det er en lille investering med stor visuel effekt."
      },
      {
        title: "Varmebestandig maling er afgørende",
        content: "Radiatorer bliver varme — op til 70-80 grader — og almindelig maling kan ikke klare det. Den vil gulne, krakelere og afgive lugt. Vi bruger specialmaling designet til radiatorer, der tåler temperaturer op til 120 grader og bevarer farven år efter år. Denne maling er lidt dyrere, men forskellen i holdbarhed er enorm. Vores radiatormaling er også lugtfri, når den er tørret."
      },
      {
        title: "Vores teknik: spray vs. pensel",
        content: "Vi tilbyder både spray- og penselmaling af radiatorer. Sprøjtemaling giver det mest ensartede resultat og når ind i alle kroge og rilleblade. Det er ideelt, når radiatoren er demonteret eller når hele rummet males. Penselmaling er velegnet til enkelte radiatorer eller touch-up arbejde. Begge metoder giver et professionelt resultat, når man bruger de rigtige produkter og teknikker."
      },
      {
        title: "Forberedelse er nøglen",
        content: "Før maling slettes og slibes radiatoren grundigt. Rust behandles med rustprimer. Gammel løs maling fjernes. Vi affedter overfladen for at sikre optimal vedhæftning. Derefter grunder vi med en egnet primer til metal. Denne forberedelse er tidskrævende, men afgørende for et holdbart resultat. Springer man forberedelsen over, vil den nye maling hurtigt skifte eller skalle af."
      },
      {
        title: "Hvornår skal radiatoren males?",
        content: "Den bedste tid at male radiatorer er om sommeren, når varmen er slukket. Radiatoren skal være kold under maling og i tørretiden — typisk 24-48 timer. Vi anbefaler derfor at planlægge radiatormaling i forbindelse med sommerferie eller i overgangssæsonen, hvor varmen er slukket. Skal radiatoren males om vinteren, lukker vi for den pågældende radiator i maletiden."
      },
      {
        title: "Pris på radiatormaling",
        content: "Prisen på maling af en radiator afhænger af radiatorens størrelse, type og tilstand. En standard panelradiator koster typisk 400-800 kr. at male, mens ældre ribberadiatorer med mange elementer er mere arbejdskrævende. Vi tilbyder gerne radiatormaling som del af et større maleroprojekt til fordelagtige priser. Ring til os på 53 50 77 00 for et konkret tilbud."
      }
    ],
    benefits: [
      "Varmebestandig specialmaling",
      "Spray- og penselteknik",
      "Grundig forberedelse og rustbehandling",
      "Farvematch med dine vægge",
      "Lugtfri efter tørring",
      "Del af samlet maleropgave"
    ],
    relatedServices: ["indvendig-maling", "maling-af-lejlighed", "maling-hus", "malerarbejde"]
  },

  "nybyg-maling": {
    title: "Nybyg maling",
    metaTitle: `Nybyg maling — Komplet pakke til nye huse | Gratis tilbud`,
    metaDescription: `Maling af nybyggeri. Komplet pakke med vægge, lofter, træværk og specialfinish. Samarbejde med bygherrer. Ring ${COMPANY.phone}`,
    heroHeading: "Maling af nybyggeri",
    heroSubheading: "Din professionelle partner til maling af nye huse og byggeprojekter",
    intro: `Bygger du nyt hus eller er du entreprenør med et nybyggeri-projekt? ${COMPANY.name} er din erfarne partner til maling af nybyggeri i Slagelse og på hele Sjælland. Vi samarbejder med bygherrer, arkitekter og entreprenører om at levere professionel maling af nye boliger — fra første spartling til den sidste penselstrøg. Med 8 erfarne medarbejdere kan vi håndtere projekter i alle størrelser og overholde stramme tidsplaner.`,
    sections: [
      {
        title: "Komplet malerløsning til nybyggeri",
        content: "Når du bygger nyt, er der mange ting at koordinere. Vi gør malerdelen nem ved at tilbyde en komplet pakke: spartling af alle vægge og lofter, grundmaling, slutmaling af vægge og lofter, maling af døre, karme, fodlister og paneler. Vi tager os af alt malerarbejde, så du kun har én leverandør at forholde dig til. Det sparer tid, forenkler koordineringen og sikrer et ensartet kvalitetsniveau."
      },
      {
        title: "Samarbejde med entreprenører og bygherrer",
        content: "Vi har lang erfaring med at arbejde på aktive byggepladser og forstår byggeriets dynamik. Vi koordinerer med andre håndværkere, overholder tidsplaner og tilpasser os byggepladsens forhold. Vores tilbud er detaljerede og gennemsigtige, så der ikke er overraskelser undervejs. Vi kan indgå rammeaftaler med entreprenører, der bygger flere boliger, med fordelagtige priser og prioriteret kapacitet."
      },
      {
        title: "Effektspartling og specialfinish",
        content: "Til nybyggeri kan vi tilbyde effektspartling (også kaldet design-spartling eller textur-spartling), der giver vægge og lofter en helt speciel finish. Vi arbejder også med andre specialteknikker som microcement, metalliske effekter og strukturmalinger, der kan give dit nye hjem et unikt udtryk. Tal med os om dine ønsker — vi kan sandsynligvis hjælpe, uanset hvor kreativ visionen er."
      },
      {
        title: "Timing og projektplanlægning",
        content: "I nybyggeri er timing alt. Vi planlægger malerarbejdet i tæt koordinering med projektets overordnede tidsplan. Spartling og grundbehandling udføres, når gipsplader er opsat og fuger er færdige. Slutmaling sker, når støvende arbejde er afsluttet, men før gulve og inventar monteres. Vi sørger for, at vores arbejde ikke forsinker projektet — og vi kan ofte rykke hurtigt ind, når vi får grønt lys."
      },
      {
        title: "Maling af hele huse til konkurrencedygtige priser",
        content: "Ved maling af hele nye huse tilbyder vi fordelagtige m²-priser, der gør professionel maling overkommelig. Vores effektive arbejdsprocesser og erfarne malere betyder, at vi kan holde omkostningerne nede uden at gå på kompromis med kvaliteten. Ring til os på 53 50 77 00 for at høre om priser på nybyggeri-projekter — vi udarbejder gerne et uforpligtende tilbud baseret på tegninger eller et besøg på byggepladsen."
      },
      {
        title: "Hvorfor vælge os til nybyggeri?",
        content: "Med over 250 femstjernede anmeldelser på Trustpilot og medlemskab af Danske Malermestre er vi et trygt valg til dit nybyggeri-projekt. Vi leverer kvalitet til tiden og kommunikerer klart undervejs. Vores 8 fastansatte malere har erfaringen til at håndtere selv de største projekter, og ejerne er personligt involveret i alle opgaver. Kontakt os i dag og lad os blive en del af dit byggeprojekt."
      }
    ],
    benefits: [
      "Komplet malerløsning til nybyggeri",
      "Erfaring med entreprenør-samarbejde",
      "Effektspartling og specialfinish",
      "Fleksibel timing efter byggeplan",
      "Konkurrencedygtige m²-priser",
      "8 erfarne fastansatte malere"
    ],
    relatedServices: ["indvendig-maling", "spartling", "sprojtespartling", "maling-hus"]
  },

  "rengoering": {
    title: "Rengøring",
    metaTitle: `Rengøring ved fraflytning & renovering — Professionelt & grundigt`,
    metaDescription: `Professionel rengøring ved fraflytning, renovering og nybyg. Grundig slutrengøring der lever op til alle krav. Ring ${COMPANY.phone} for tilbud.`,
    heroHeading: "Professionel rengøring",
    heroSubheading: "Grundig rengøring ved fraflytning, renovering og nybyggeri",
    intro: `Hos ${COMPANY.name} tilbyder vi professionel rengøring som en naturlig del af vores totalløsning. Uanset om du fraflytter en lejlighed, har fået renoveret dit hjem eller afslutter et nybyggeri, sørger vi for en grundig og omhyggelig rengøring, så alt står klar til overdragelse eller indflytning.`,
    sections: [
      {
        title: "Fraflytningsrengøring",
        content: "Ved fraflytning er grundig rengøring ofte et krav for at få dit depositum tilbage. Vi kender standarderne og sørger for, at lejligheden rengøres til perfektion — fra vindueskarme og skabe til badeværelse og køkken. Kombineret med vores malerservice får du en komplet fraflytningsløsning med kun én kontaktperson."
      },
      {
        title: "Rengøring efter renovering",
        content: "Renovering efterlader støv, snavs og malingrester overalt. Vores professionelle rengøring efter renovering fjerner alt byggestøv grundigt — også de steder, man nemt overser. Vi sikrer, at dit nyistandsatte hjem er skinnet rent og klar til at nyde fra dag ét."
      },
      {
        title: "Komplet totalløsning",
        content: "Når vi allerede er i gang med malerarbejde, spartling eller gulvslibning, giver det perfekt mening at vi også står for den afsluttende rengøring. Det sparer dig for at koordinere med endnu en leverandør, og vi sikrer en smidig overgang fra håndværkerarbejde til et rent og færdigt resultat."
      }
    ],
    benefits: [
      "Grundig fraflytningsrengøring efter alle krav",
      "Professionel rengøring efter renovering",
      "Én kontaktperson for maling, gulve og rengøring",
      "Spar tid og koordinering",
      "Erfaring med boligforeningers standarder",
      "Hurtig og effektiv service"
    ],
    relatedServices: ["maling-flyttelejlighed", "gulvslibning", "maling-af-lejlighed", "malerarbejde"]
  },

  "gulvslibning": {
    title: "Gulvslibning",
    metaTitle: `Gulvslibning — Professionel slibning & lakering af trægulve`,
    metaDescription: `Professionel gulvslibning og lakering af trægulve. Giv dine gulve nyt liv. Indgår i vores totalløsning ved fraflytning og renovering. Ring ${COMPANY.phone}`,
    heroHeading: "Professionel gulvslibning",
    heroSubheading: "Giv dine trægulve nyt liv med professionel slibning og behandling",
    intro: `${COMPANY.name} tilbyder professionel gulvslibning som en del af vores totalløsning. Slidte, ridsede eller misfarvede trægulve kan forvandles fuldstændigt med korrekt slibning og efterbehandling. Vi sørger for, at dine gulve fremstår som nye — uanset om det er ved fraflytning, renovering eller bare en opfriskning.`,
    sections: [
      {
        title: "Gulvslibning ved fraflytning",
        content: "Mange boligforeninger og udlejere kræver, at trægulve slibes ved fraflytning. Vi har stor erfaring med at leve op til disse krav og sikrer, at gulvene er i perfekt stand til overdragelse. Kombineret med vores maler- og rengøringsservice får du en komplet fraflytningspakke, der sikrer dit depositum."
      },
      {
        title: "Slibning og lakering",
        content: "Vi sliber gulvene i flere trin for at opnå en helt glat og ensartet overflade. Derefter påføres lak, olie eller anden behandling efter dine ønsker. Vi rådgiver gerne om den bedste behandling til netop dine gulve — hvad enten du foretrækker en mat, silkemat eller blank finish."
      },
      {
        title: "Del af vores totalløsning",
        content: "Gulvslibning passer perfekt ind i vores totalløsning ved renovering og fraflytning. Når vi allerede står for maling og rengøring, kan vi koordinere gulvslibningen, så arbejdet udføres i den rigtige rækkefølge — først maling, så gulvslibning, og til sidst rengøring. Det giver det bedste resultat og sparer dig tid."
      }
    ],
    benefits: [
      "Professionel slibning i flere trin",
      "Lakering, oliering eller voksbehandling",
      "Indgår i komplet fraflytningspakke",
      "Erfaring med boligforeningers krav",
      "Koordineret med maling og rengøring",
      "Hurtig og støvfri slibning"
    ],
    relatedServices: ["maling-flyttelejlighed", "rengoering", "maling-af-lejlighed", "malerarbejde"]
  }
}

export function getServiceContent(slug: string): ServiceContent | null {
  return SERVICE_CONTENT[slug] || null
}
