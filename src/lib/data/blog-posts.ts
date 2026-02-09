export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  category: "Tips" | "Priser" | "Inspiration" | "Vedligeholdelse"
  date: string
  author: string
  image: string | null
  readingTime: number // in minutes
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "hvornaar-skal-du-male-dit-hus",
    title: "Hvornår skal du male dit hus? — Guide til udvendig maling",
    excerpt: "Lær de vigtigste tegn på, at dit hus trænger til en omgang maling, og hvornår på året det er bedst at male.",
    content: `
# Hvornår er det tid til at male dit hus?

At holde sit hus velholdt er ikke bare et spørgsmål om æstetik — det handler også om at beskytte din investering. Et af de vigtigste vedligeholdelsesarbejder er udvendig maling, men hvornår ved du, at det er tid?

## Tegn på, at dit hus trænger til maling

### 1. Malingen skaller eller krakelerer
Når malingen begynder at skalle af eller der dannes fine revner (krakeleringer), er det et tydeligt tegn på, at malingen har mistet sin beskyttende funktion. Fugt kan nu trænge ind i træværket og forårsage skader.

### 2. Farven er falmet
Hvis dit hus har mistet sin oprindelige farve og ser udvasket ud, er det tid at overveje en opfriskning. UV-stråler fra solen nedbryder gradvist malingens pigmenter.

### 3. Træværket suger vand
Tag en simpel test: sprøjt lidt vand på træværket. Hvis vandet suges ind i stedet for at perle af, er malingens imprægnering brugt op.

### 4. Synlige skader på træet
Hvis du kan se råd, revner eller andre skader på træværket under malingen, er det ikke bare tid til maling — det er også tid til reparationer.

## Hvornår på året er bedst at male?

Udvendig maling kræver de rette vejrforhold:

**Forår (april-juni):** Ideelt tidspunkt. Temperaturen er mild, og træværket er tørt efter vinteren. Book tidligt — malerne er ofte travle i denne periode.

**Sommer (juli-august):** Godt, men pas på for høje temperaturer over 25 grader, som kan få malingen til at tørre for hurtigt.

**Efterår (september-oktober):** Stadig muligt, men hold øje med vejrudsigten. Undgå perioder med meget fugt eller regn.

**Vinter:** Generelt ikke anbefalet på grund af kulde og fugt. De fleste malinger kræver mindst 5-10 graders varme.

## Hvor ofte bør du male?

Som tommelfingerregel bør udvendigt træværk males hvert 5-8 år, afhængig af:

- Husets beliggenhed (kystnære huse slides hurtigere)
- Kvaliteten af tidligere malerarbejde
- Den type maling, der er brugt
- Hvor meget direkte sollys facaden får

## Få en professionel vurdering

Er du i tvivl om, hvornår dit hus skal males? Vi tilbyder gratis og uforpligtende tilsyn, hvor vi vurderer husets tilstand og giver dig et ærligt svar. Ring til os på 53 50 77 00 eller udfyld vores kontaktformular.
    `.trim(),
    category: "Tips",
    date: "2026-02-01",
    author: "Schou & Christensen",
    image: null,
    readingTime: 5,
  },
  {
    slug: "indvendig-vs-udvendig-maling-pris",
    title: "Indvendig vs udvendig maling — Hvad koster det i 2026?",
    excerpt: "Få et overblik over priserne for indvendig og udvendig maling i Danmark i 2026, og forstå hvad der påvirker prisen.",
    content: `
# Hvad koster malerarbejde i 2026?

Priserne på malerarbejde varierer meget afhængigt af opgavens art, boligens størrelse og den ønskede kvalitet. I denne guide giver vi dig et realistisk overblik over, hvad du kan forvente at betale for professionelt malerarbejde i 2026.

## Priser på indvendig maling

### Priser per kvadratmeter
- **Vægge (standard):** 50-100 kr./m²
- **Lofter:** 60-120 kr./m²
- **Paneler og fodlister:** 80-150 kr./løbende meter
- **Vinduer (per stk.):** 800-2.500 kr.
- **Døre (per stk.):** 600-1.500 kr.

### Typiske projekter
- **2-værelses lejlighed (60 m²):** 15.000-25.000 kr.
- **3-værelses lejlighed (80 m²):** 22.000-35.000 kr.
- **Parcelhus, indvendig (150 m²):** 40.000-70.000 kr.

## Priser på udvendig maling

### Priser per kvadratmeter
- **Facademaling:** 150-300 kr./m²
- **Træværk (vindsked, udhæng):** 100-200 kr./m²
- **Vinduer udvendig:** 600-1.500 kr./stk.

### Typiske projekter
- **Sommerhus, udvendig:** 25.000-50.000 kr.
- **Parcelhus, udvendig:** 40.000-80.000 kr.
- **Villa, udvendig:** 60.000-120.000 kr.

## Hvad påvirker prisen?

### 1. Forberedelse
Hvis vægge skal spartles, gamle tapetlag fjernes, eller træværk skal repareres, øger det prisen. God forberedelse er dog afgørende for et holdbart resultat.

### 2. Antal lag
Standard er 2 lag maling, men mørkere farver eller særlige effekter kan kræve flere lag.

### 3. Malingskvalitet
Vi bruger altid kvalitetsmalinger fra Beck & Jørgensen. Billigere malinger holder ikke lige så længe og kan ende med at koste mere på lang sigt.

### 4. Adgangsforhold
Svært tilgængelige områder, stilladser eller særligt høje lofter påvirker prisen.

### 5. Tidsramme
Hasteopgaver kan koste mere. Fleksibilitet med tidspunkt kan give besparelser.

## Sådan sparer du på malerarbejdet

1. **Book i god tid:** Malere er ofte billigere i lavsæsonen (vinter for indvendig maling)
2. **Gør selv noget af arbejdet:** Flyt møbler, fjern gardiner og afdæk selv
3. **Saml projekterne:** Male flere rum på én gang giver mængderabat
4. **Vælg standard farver:** Specialfarver koster ekstra

## Få et gratis tilbud

Priserne ovenfor er vejledende. For et præcist tilbud på dit projekt, kontakt os. Vi giver altid gratis og uforpligtende tilbud, og du ved præcis, hvad det kommer til at koste, før vi starter.
    `.trim(),
    category: "Priser",
    date: "2026-01-20",
    author: "Schou & Christensen",
    image: null,
    readingTime: 6,
  },
  {
    slug: "saadan-vaelger-du-maling",
    title: "Sådan vælger du den rigtige maling til dit hjem",
    excerpt: "Guide til de forskellige typer maling og hvornår du skal bruge dem. Lær forskellen på glans, typer og kvalitet.",
    content: `
# Sådan vælger du den rigtige maling

At vælge den rigtige maling kan føles overvældende med alle de valgmuligheder, der findes. I denne guide guider vi dig gennem de vigtigste overvejelser, så du træffer det rigtige valg til dit projekt.

## Glansgrader — hvad betyder de?

### Mat (glans 5-7)
- Skjuler ujævnheder godt
- Giver en blød, behagelig overflade
- Bedst til lofter og vægge med mindre slid
- Sværere at rengøre

### Halvmat/Silkemat (glans 10-20)
- Den mest populære til vægge
- God balance mellem holdbarhed og udseende
- Kan tørres af med en fugtig klud
- Anbefales til stuer, soveværelser og gange

### Halvblank (glans 25-35)
- Mere slidstærk
- God til køkkener og badeværelser
- Let at rengøre
- Viser ujævnheder tydeligere

### Blank/Højblank (glans 40+)
- Meget slidstærk
- Bruges typisk til paneler, døre og vinduer
- Perfekt til områder med højt slid
- Kræver god forberedelse — fejl synes tydeligt

## Hvilken type maling til hvilket rum?

### Stue og soveværelser
- Vægge: Halvmat i glans 7-10
- Lofter: Mat i glans 5
- Paneler: Halvblank eller blank

### Køkken
- Vægge: Halvmat til halvblank (glans 10-25)
- Vælg en der tåler aftørring
- Overvej specialmaling ved komfuret

### Badeværelse
- Vådrumsbehandling er et krav
- Vægge: Halvblank vådrumsmalin
- Undgå mat maling pga. fugt

### Børneværelse
- Halvmat, slidstærk vægmaling
- Overvej tavlemaling på en enkelt væg
- Allergivenlige malinger anbefales

### Udvendigt træværk
- Altid udendørs træmaling
- Oliebaseret eller vandbaseret
- Grunding er vigtig på nyt træ

## Kvalitet betaler sig

Vi anbefaler altid at vælge kvalitetsmalinger fra mærker som Beck & Jørgensen. De koster lidt mere, men:

- Dækker bedre (færre lag = mindre arbejde)
- Holder farven længere
- Er mere slidstærke
- Har bedre indeklima-egenskaber

## Farvevag — tips og tricks

1. **Test altid farven:** Køb en prøve og mal et større område. Se det i dagslys og kunstlys.

2. **Tænk på lyset:** Nordvendte rum opfattes koldere og kan tåle varmere farver. Sydvendte rum kan blive overvældende med varme nuancer.

3. **Overvej sammenhængen:** Farver bør harmonere fra rum til rum, især i åbne planløsninger.

4. **Hvid er ikke bare hvid:** Der findes hundredvis af hvide nuancer. En varm hvid føles hyggelig, en kold hvid føles mere moderne.

## Få professionel rådgivning

Er du i tvivl om valg af maling eller farve? Vi hjælper gerne. Vores erfarne malere kan rådgive dig om det rigtige valg til netop dit projekt. Kontakt os for et gratis tilbud og en uforpligtende snak.
    `.trim(),
    category: "Tips",
    date: "2026-01-10",
    author: "Schou & Christensen",
    image: null,
    readingTime: 5,
  },
]

// Get all categories
export const BLOG_CATEGORIES = ["Tips", "Priser", "Inspiration", "Vedligeholdelse"] as const

// Get blog post by slug
export function getBlogPost(slug: string): BlogPost | null {
  return BLOG_POSTS.find(post => post.slug === slug) || null
}

// Get related posts (same category, excluding current)
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPost(currentSlug)
  if (!currentPost) return BLOG_POSTS.slice(0, limit)
  
  return BLOG_POSTS
    .filter(post => post.slug !== currentSlug && post.category === currentPost.category)
    .slice(0, limit)
}

// Get latest posts
export function getLatestPosts(limit: number = 3): BlogPost[] {
  return [...BLOG_POSTS]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

// Get posts by category
export function getPostsByCategory(category: string): BlogPost[] {
  return BLOG_POSTS.filter(post => post.category === category)
}
