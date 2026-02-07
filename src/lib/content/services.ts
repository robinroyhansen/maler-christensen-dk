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
    metaTitle: `Malerarbejde | Professionel maler i ${COMPANY.city}`,
    metaDescription: `Få professionelt malerarbejde udført af erfarne malere. Indvendig og udvendig maling til private og erhverv. Gratis tilbud - Ring ${COMPANY.phone}`,
    heroHeading: "Professionelt malerarbejde",
    heroSubheading: "Kvalitetsbevidst malerarbejde til private og erhverv i hele Sjælland",
    intro: `Hos ${COMPANY.name} tilbyder vi professionelt malerarbejde af højeste kvalitet. Vores erfarne malere håndterer alt fra små renoveringsprojekter til store erhvervsopgaver. Vi er stolte af at være medlemmer af Danske Malermestre, hvilket sikrer vores kunder fagligt korrekt arbejde hver gang.`,
    sections: [
      {
        title: "Indvendigt malerarbejde",
        content: "Vi udfører alt indvendigt malerarbejde, fra maling af vægge og lofter til træværk, døre og vinduer. Vores malere arbejder omhyggeligt og efterlader altid et flot og holdbart resultat. Vi bruger udelukkende kvalitetsmaling fra anerkendte mærker som Flügger, Dyrup og Jotun."
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
    metaTitle: `Maling af carport | Professionel maling af carporte`,
    metaDescription: `Få din carport malet professionelt. Vi tilbyder maling af alle typer carporte og garager. Kvalitetsarbejde med garanti. Ring ${COMPANY.phone}`,
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
    metaTitle: `Maling af lejlighed | Professionel lejlighedsmaling`,
    metaDescription: `Få din lejlighed malet af professionelle. Hurtig, effektiv og kvalitetsbevidst maling af lejligheder. Fast pris og gratis tilbud. Ring ${COMPANY.phone}`,
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
    metaTitle: `Maling af sommerhus | Indvendig og udvendig sommershusmaling`,
    metaDescription: `Professionel maling af sommerhuse. Indvendig og udvendig maling med kvalitetsprodukter. Vi dækker hele Sjælland. Ring ${COMPANY.phone}`,
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
    metaTitle: `Maling af flyttelejlighed | Fraflytningsmalerarbejde`,
    metaDescription: `Professionel maling ved fraflytning. Vi sikrer at du får dit depositum tilbage. Hurtig service og konkurrencedygtige priser. Ring ${COMPANY.phone}`,
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
        content: "Ud over maling tilbyder vi også reparation af mindre skader, spartling af huller og rengøring efter malerarbejdet. Vi sørger for, at lejligheden er klar til overdragelse."
      }
    ],
    benefits: [
      "Hurtig levering - ofte 1-2 dage",
      "Sikrer dit depositum tilbage",
      "Kender alle standarder og krav",
      "Inkluderer småreperationer",
      "Grundig oprydning efter os"
    ],
    relatedServices: ["maling-af-lejlighed", "sprojtespartling", "malerarbejde"]
  },

  "maling-hus": {
    title: "Maling af hus",
    metaTitle: `Maling af hus | Professionel husmaling ude og inde`,
    metaDescription: `Komplet husmaling af erfarne malere. Indvendig og udvendig maling af dit hus. Kvalitetsarbejde med garanti. Gratis tilbud - Ring ${COMPANY.phone}`,
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
    metaTitle: `Maling af trappe | Professionel trappemaling`,
    metaDescription: `Få din trappe malet af professionelle. Vi maler trætrapper, metaltrapper og betontrapper. Holdbar finish med kvalitetsmaling. Ring ${COMPANY.phone}`,
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
    metaTitle: `Tapetsering | Professionel opsætning af tapet`,
    metaDescription: `Professionel tapetsering af erfarne malere. Alle typer tapet – vinyltapet, vævtapet, fototapet. Perfekt finish hver gang. Ring ${COMPANY.phone}`,
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
    metaTitle: `Træmaling | Udvendig maling og vedligeholdelse af træ`,
    metaDescription: `Professionel udvendig træmaling. Vinduer, døre, facader og hegn. Beskyt dit træværk mod vejr og vind. Gratis tilbud - Ring ${COMPANY.phone}`,
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
    metaTitle: `PCB-forsegling | Professionel indkapsling af PCB`,
    metaDescription: `Certificeret PCB-forsegling og indkapsling. Vi håndterer farlige fuger sikkert og efter alle regler. Kontakt os for rådgivning - Ring ${COMPANY.phone}`,
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
    metaTitle: `Metallisk PU-gulv | Eksklusive designgulve`,
    metaDescription: `Spektakulære metalliske PU-gulve med unik finish. Perfekt til moderne hjem og erhverv. Se vores galleri. Ring ${COMPANY.phone}`,
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
    metaTitle: `Billig maler | Kvalitetsmaling til fair priser`,
    metaDescription: `Professionelt malerarbejde til konkurrencedygtige priser. Kvalitet behøver ikke koste en formue. Gratis tilbud - Ring ${COMPANY.phone}`,
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
    metaTitle: `Sprøjtespartling | Hurtig og effektiv vægbehandling`,
    metaDescription: `Professionel sprøjtespartling af vægge og lofter. Hurtig, jævn og effektiv metode. Perfekt til renovering. Ring ${COMPANY.phone}`,
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
    metaTitle: `Sprøjtemaling | Professionel maling med sprøjte`,
    metaDescription: `Effektiv sprøjtemaling af vægge, lofter og store flader. Hurtig, jævn og professionel finish. Ring ${COMPANY.phone}`,
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
    metaTitle: `Microcement | Moderne vægbeklædning`,
    metaDescription: `Microcement til badeværelser og køkkener. Fugesløs og vandtæt finish. Se vores galleri med 16+ projekter. Ring ${COMPANY.phone}`,
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
    metaTitle: `PU-gulve | Polyuretangulve til alle formål`,
    metaDescription: `Professionelle PU-gulve til private og erhverv. Holdbare, kemikalieresistente og lette at vedligeholde. Ring ${COMPANY.phone}`,
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
  }
}

export function getServiceContent(slug: string): ServiceContent | null {
  return SERVICE_CONTENT[slug] || null
}
