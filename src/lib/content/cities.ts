import { COMPANY, CITIES, SERVICES } from "@/lib/constants"

interface CityContent {
  name: string
  slug: string
  distance: number
  metaTitle: string
  metaDescription: string
  heroHeading: string
  heroSubheading: string
  intro: string
  aboutCity: string
  whyChooseUs: string
  services: string
  nearbyAreas: string[]
}

// Helper to generate unique city content
function generateCityContent(city: typeof CITIES[0]): CityContent {
  const isLocalArea = city.distance <= 30
  const isMediumDistance = city.distance > 30 && city.distance <= 60
  // const isFarDistance = city.distance > 60
  
  const nearbyCities = CITIES
    .filter(c => c.name !== city.name)
    .sort((a, b) => Math.abs(a.distance - city.distance) - Math.abs(b.distance - city.distance))
    .slice(0, 5)
    .map(c => c.name)

  // Unique intros per city type
  let intro: string
  let aboutCity: string
  
  if (city.name === "Slagelse") {
    intro = `Som lokalt malerfirma med base i Slagelse er vi stolte af at servicere vores hjemby med professionelt malerarbejde. ${COMPANY.name} har hjulpet hundredvis af private og erhvervskunder i Slagelse med alt fra indvendig maling til komplet udvendig renovering. Med vores ${COMPANY.trustpilotRating}/5 rating på Trustpilot er vi et af de bedst anmeldte malerfirmaer i området.`
    aboutCity = `Slagelse er vores hjemby, og vi kender byens boliger som ingen andre. Fra de ældre villaer i centrum til nybyggeri i forstæderne – vi ved, hvad der kræves for at give hvert hjem den perfekte finish. Som medlemmer af Danske Malermestre garanterer vi fagligt korrekt arbejde hver gang.`
  } else if (isLocalArea) {
    intro = `Søger du en pålidelig maler i ${city.name}? ${COMPANY.name} servicerer ${city.name} og omegn med professionelt malerarbejde. Med kun ${city.distance} km fra vores base i Slagelse, er vi hurtigt ude hos dig. Vores erfarne malere håndterer alt fra små istandsættelser til store renoveringsprojekter.`
    aboutCity = `${city.name} ligger tæt på Slagelse, og vi kender området godt fra mange projekter. Vi har malet alt fra hyggelige rækkehuse til store villaer i ${city.name}. Vores lokalkendskab betyder, at vi forstår de særlige udfordringer og muligheder ved boligerne i dit område.`
  } else if (isMediumDistance) {
    intro = `Bor du i ${city.name} og søger et pålideligt malerfirma? ${COMPANY.name} dækker hele Sjælland, inklusiv ${city.name}. Vi tilbyder professionelt malerarbejde med fokus på kvalitet, pålidelighed og konkurrencedygtige priser. Kontakt os for et gratis tilbud.`
    aboutCity = `Selvom vi har base i Slagelse, servicerer vi regelmæssigt kunder i ${city.name}. Med ${city.distance} km imellem os, planlægger vi vores projekter effektivt, så du får samme høje serviceniveau som vores lokale kunder. Vi har mange tilfredse kunder i ${city.name} og omegn.`
  } else {
    intro = `${COMPANY.name} tilbyder nu professionelt malerarbejde i ${city.name}. Trods afstanden fra vores base i Slagelse, leverer vi samme høje kvalitet og service til kunder i ${city.name}. Ved større projekter giver afstanden ikke mærkbare meromkostninger.`
    aboutCity = `Vi har udvidet vores serviceområde til også at dække ${city.name} og det øvrige Storkøbenhavn/Nordsjælland. Vores kunder i ${city.name} værdsætter vores kvalitetsbevidste tilgang og konkurrencedygtige priser. Kontakt os for at høre, hvordan vi kan hjælpe med dit projekt.`
  }

  // City-specific details
  const cityDescriptions: { [key: string]: string } = {
    "Sorø": "Sorø er kendt for sin smukke sø og historiske bygninger. Vi har stor erfaring med maling af ældre ejendomme og bevaringsværdige bygninger i Sorø.",
    "Ringsted": "Ringsted er en travl handelsby med mange boliger og erhvervsejendomme. Vi har malet alt fra centerbutikker til villaer i Ringsted.",
    "Roskilde": "Roskilde er en af Danmarks ældste byer med en unik blanding af historiske og moderne bygninger. Vi har ekspertise i at arbejde med alle typer ejendomme.",
    "Næstved": "Næstved er Sydsjællands største by, og vi har mange tilfredse kunder i området. Fra bymidten til forstæderne – vi dækker det hele.",
    "Kalundborg": "Kalundborg har en spændende bygningsmasse fra forskellige perioder. Vi har erfaring med alt fra vikingetidsinspireret arkitektur til moderne boliger.",
    "Køge": "Køge kombinerer en charmerende gammel bykerne med moderne boligområder. Vi har malet mange huse i både den historiske del og nyere kvarterer.",
    "Skælskør": "Skælskør er en hyggelig havneby med mange velholdte huse. Vi hjælper gerne med at vedligeholde byens smukke bygninger.",
    "Korsør": "Korsør ligger ved Storebælt og har mange boliger med havudsigt. Vi har erfaring med maling i det saltholdige kystklima.",
    "Holbæk": "Holbæk er en aktiv handelsby med en god blanding af ældre og nyere boliger. Vi servicerer regelmæssigt kunder i Holbæk.",
    "Vordingborg": "Vordingborg har en rig historie og mange fine ejendomme. Vi har malet både private hjem og erhvervsejendomme i byen.",
    "København": "Vi dækker nu også København og tilbyder professionelt malerarbejde i hovedstaden. Fra lejligheder på Vesterbro til villaer i Hellerup.",
    "Frederiksberg": "Frederiksberg har mange smukke ældre ejendomme, der kræver erfarne malere. Vi har ekspertise i renovering af klassiske lejligheder.",
    "Gentofte": "Gentofte er kendt for sine villaer og velholdte ejendomme. Vi tilbyder kvalitetsmaling, der matcher områdets høje standard.",
    "Lyngby": "Lyngby-Taarbæk har en attraktiv beliggenhed og mange fine boliger. Vi hjælper gerne med maling og vedligeholdelse.",
    "Hillerød": "Hillerød er en smuk by med Frederiksborg Slot som nabo. Vi har erfaring med både ældre og nyere boliger i området.",
    "Helsingør": "Helsingør ved Øresund har mange karakterfulde bygninger. Vi tilbyder maling tilpasset det maritime klima.",
    "Rødovre": "Rødovre har mange parcelhuse og lejlighedskomplekser. Vi har god erfaring med alle typer boliger i området.",
    "Hvidovre": "Hvidovre har en blanding af ældre villaer og moderne boliger. Vi dækker hele kommunen med vores malerydelser.",
    "Glostrup": "Glostrup er centralt beliggende med gode forbindelser. Vi servicerer mange kunder i området.",
    "Ballerup": "Ballerup har både erhvervsområder og attraktive boligkvarterer. Vi tilbyder maling til både private og erhverv.",
    "Valby": "Valby har mange lejligheder og rækkehuse. Vi har stor erfaring med maling af alle typer boliger i København.",
    "Østerbro": "Østerbro er et af Københavns mest attraktive kvarterer. Vi tilbyder professionelt malerarbejde til lejligheder og erhverv.",
    "Nordsjælland": "Nordsjælland omfatter mange smukke byer og områder. Vi dækker hele regionen med vores malerydelser.",
  }

  const customAboutCity = cityDescriptions[city.name] 
    ? cityDescriptions[city.name]
    : aboutCity

  return {
    name: city.name,
    slug: city.slug,
    distance: city.distance,
    metaTitle: `Maler ${city.name} | Professionelt malerarbejde`,
    metaDescription: `Søger du en maler i ${city.name}? ${COMPANY.name} tilbyder professionelt malerarbejde med ${COMPANY.trustpilotRating}/5 på Trustpilot. Gratis tilbud - Ring ${COMPANY.phone}`,
    heroHeading: `Maler i ${city.name}`,
    heroSubheading: `Professionelt malerarbejde til private og erhverv i ${city.name}`,
    intro,
    aboutCity: customAboutCity,
    whyChooseUs: `Når du vælger ${COMPANY.name} som din maler i ${city.name}, får du:
    
• **${COMPANY.trustpilotRating}/5 på Trustpilot** – Vi er et af de bedst anmeldte malerfirmaer i regionen
• **Erfarne malere** – Vores håndværkere har mange års erfaring
• **Medlem af Danske Malermestre** – Garanti for fagligt korrekt arbejde
• **Konkurrencedygtige priser** – Kvalitetsarbejde til fair priser
• **Gratis tilbud** – Vi kommer gerne forbi og giver et uforpligtende tilbud`,
    services: `I ${city.name} tilbyder vi samme brede vifte af malerydelser som i resten af vores serviceområde:

${SERVICES.slice(0, 8).map(s => `• **${s.name}** – ${s.description}`).join('\n')}

Uanset om du skal have malet din lejlighed, renoveret dit hus eller har brug for specialbehandlinger som sprøjtespartling eller microcement, står vi klar til at hjælpe dig i ${city.name}.`,
    nearbyAreas: nearbyCities,
  }
}

// Generate content for all cities
export const CITY_CONTENT: { [slug: string]: CityContent } = {}

CITIES.forEach(city => {
  CITY_CONTENT[city.slug] = generateCityContent(city)
})

export function getCityContent(slug: string): CityContent | null {
  return CITY_CONTENT[slug] || null
}

export function getCityBySlug(slug: string): typeof CITIES[0] | null {
  return CITIES.find(c => c.slug === slug) || null
}
