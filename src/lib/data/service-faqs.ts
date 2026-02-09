import { COMPANY } from "@/lib/constants"

export interface FAQ {
  question: string
  answer: string
}

// FAQs for each service - 3-5 relevant questions per service
export const SERVICE_FAQS: Record<string, FAQ[]> = {
  "malerarbejde": [
    {
      question: "Hvad koster malerarbejde generelt?",
      answer: `Prisen på malerarbejde varierer afhængigt af opgavens omfang, overfladetype og ønsket finish. Vi tilbyder altid et gratis og uforpligtende tilbud, hvor vi vurderer din konkrete opgave. Ring til os på ${COMPANY.phone} for at høre mere.`
    },
    {
      question: "Hvor lang tid tager et typisk malerprojekt?",
      answer: "Tidsforbruget afhænger af projektets størrelse. En mindre lejlighed kan males på 2-3 dage, mens et helt hus kan tage op til en uge. Vi giver altid en realistisk tidsramme i vores tilbud."
    },
    {
      question: "Skal jeg selv flytte møbler før malerarbejdet?",
      answer: "Du behøver ikke bekymre dig om møblerne. Vores malere flytter og afdækker alle møbler, inden arbejdet påbegyndes. Vi efterlader altid lokalet rent og ryddet."
    },
    {
      question: "Bruger I miljøvenlige malinger?",
      answer: "Ja, vi arbejder med kvalitetsmalinger fra anerkendte producenter som Beck & Jørgensen. Vi kan tilbyde vandbaserede og lavemitterende malinger, der er skånsomme for både miljø og indeklima."
    },
  ],
  "maling-af-carport": [
    {
      question: "Hvad koster det at male en carport?",
      answer: `Prisen på maling af carport afhænger af størrelse, træværkets tilstand og den ønskede finish. En typisk carport koster mellem 8.000-15.000 kr. at male. Kontakt os på ${COMPANY.phone} for et præcist tilbud.`
    },
    {
      question: "Hvilken type maling bruger I til carporte?",
      answer: "Vi bruger vejrbestandig udendørs træmaling af høj kvalitet, der beskytter mod regn, sol og frost. Malingen giver lang holdbarhed og kræver minimal vedligeholdelse."
    },
    {
      question: "Skal carporten slibes før maling?",
      answer: "Ja, vi forbereder altid overfladen grundigt. Det inkluderer slibning, afrensning og eventuel spartling af skader. God forberedelse er nøglen til et holdbart resultat."
    },
    {
      question: "Hvornår er det bedst at male sin carport?",
      answer: "Udvendig maling udføres bedst i tørt vejr ved temperaturer mellem 10-25 grader. Forår og tidlig efterår er ideelle perioder. Vi rådgiver gerne om det bedste tidspunkt."
    },
  ],
  "maling-af-lejlighed": [
    {
      question: "Hvad koster det at male en lejlighed?",
      answer: `Prisen afhænger af lejlighedens størrelse og omfanget af arbejdet. En typisk 2-værelses lejlighed koster fra 15.000-25.000 kr. inkl. lofter og vægge. Få et gratis tilbud ved at kontakte os på ${COMPANY.phone}.`
    },
    {
      question: "Hvor lang tid tager det at male en lejlighed?",
      answer: "En standard lejlighed på 70-90 m² tager typisk 3-4 arbejdsdage at male fuldt ud. Større lejligheder eller specielle ønsker kan tage længere tid. Vi planlægger altid så det passer din hverdag."
    },
    {
      question: "Skal jeg flytte ud under malerarbejdet?",
      answer: "Nej, de fleste vælger at blive boende. Vi arbejder rum for rum og afdækker omhyggeligt, så du kan bruge resten af lejligheden. Ved større projekter kan det dog være mere praktisk at flytte ud midlertidigt."
    },
    {
      question: "Hvad er inkluderet i prisen for maling af lejlighed?",
      answer: "Vores tilbud inkluderer typisk vægge, lofter, og paneler. Vinduer, døre og radiatorer kan tilføjes efter ønske. Vi sørger for alle materialer, afdækning, og oprydning efter arbejdet."
    },
    {
      question: "Tilbyder I også maling ved fraflytning?",
      answer: "Ja, vi har stor erfaring med fraflytningsmalng. Vi kan hurtigt istandsætte lejligheden, så den overholder udlejers krav. Vi samarbejder gerne direkte med boligforeninger og udlejere."
    },
  ],
  "maling-af-sommerhus": [
    {
      question: "Hvad koster det at male et sommerhus?",
      answer: `Prisen varierer efter sommerhusets størrelse og tilstand. Udvendig maling af et standard sommerhus ligger typisk mellem 25.000-50.000 kr. Indvendig maling prissættes separat. Ring på ${COMPANY.phone} for et tilbud.`
    },
    {
      question: "Skal jeg være til stede under malerarbejdet?",
      answer: "Nej, det er ikke nødvendigt. Vi kan aftale nøgleoverdragelse og holder dig løbende opdateret med billeder af arbejdet. Mange kunder foretrækker at komme hjem til et nymalet sommerhus."
    },
    {
      question: "Hvornår er det bedst at male et sommerhus?",
      answer: "Udvendig maling udføres bedst i tørt vejr mellem april og oktober. Vi anbefaler at planlægge projektet i god tid, så arbejdet kan udføres under optimale vejrforhold."
    },
    {
      question: "Reparerer I også skader på træværket?",
      answer: "Ja, vi udbedrer mindre skader som råd, revner og huller som en del af forberedelsen. Ved større skader kan vi anbefale en tømrer, som vi samarbejder med."
    },
  ],
  "maling-flyttelejlighed": [
    {
      question: "Hvad koster fraflytningsmalng?",
      answer: `Prisen afhænger af lejlighedens størrelse og stand. Typisk ligger fraflytningsmalng mellem 12.000-20.000 kr. for en 2-værelses. Kontakt os for et hurtigt tilbud på ${COMPANY.phone}.`
    },
    {
      question: "Hvor hurtigt kan I male ved fraflytning?",
      answer: "Vi forstår, at tid ofte er afgørende ved fraflytning. Ved normale projekter kan vi ofte starte inden for en uge og færdiggøre arbejdet på få dage. Ved hasteopgaver gør vi vores bedste."
    },
    {
      question: "Opfylder I boligforeningens krav?",
      answer: "Ja, vi har stor erfaring med boligforeningers standardkrav. Vi sørger for, at arbejdet udføres efter normerne og leverer dokumentation, hvis det kræves."
    },
    {
      question: "Kan I også reparere huller og skader?",
      answer: "Ja, vi udbedrer huller efter billeder, skruer og andre skader som en del af istandsættelsen. Vægge spartles og slibes, så de fremstår som nye."
    },
  ],
  "maling-hus": [
    {
      question: "Hvad koster det at male et helt hus?",
      answer: `Prisen for husmaling afhænger af husets størrelse og om det er ind- og/eller udvendig maling. Et typisk parcelhus koster fra 40.000-80.000 kr. for komplet udvendig maling. Ring på ${COMPANY.phone} for et uforpligtende tilbud.`
    },
    {
      question: "Hvor lang tid tager det at male et hus?",
      answer: "Udvendig maling af et parcelhus tager typisk 5-7 arbejdsdage, afhængig af husets størrelse og vejret. Indvendig maling tager yderligere 5-10 dage. Vi giver en præcis tidsplan i vores tilbud."
    },
    {
      question: "Hvad omfatter husmaling?",
      answer: "Vores husmaling kan omfatte vægge, lofter, vinduer, døre, paneler, facader, udhæng og alle træværk. Vi tilpasser ydelsen efter dine behov og budget."
    },
    {
      question: "Skal facaden vaskes før maling?",
      answer: "Ja, vi renser altid facaden grundigt før maling. Det fjerner snavs, alger og løs maling og sikrer, at den nye maling hæfter optimalt og holder længere."
    },
  ],
  "maling-trappe": [
    {
      question: "Hvad koster det at male en trappe?",
      answer: `Prisen på trappemaling varierer efter trappens størrelse og type. En standard indendørs trappe koster typisk 5.000-12.000 kr. at male. Kontakt os på ${COMPANY.phone} for et præcist tilbud.`
    },
    {
      question: "Kan trappen bruges under malingen?",
      answer: "Vi maler trappen i etaper, så du altid har adgang. Typisk maler vi den ene side af trinene først, så du kan gå op ad den anden side. Efter tørring bytter vi om."
    },
    {
      question: "Hvilken maling bruger I til trapper?",
      answer: "Vi bruger specialmaling til trapper, der er ekstra slidstærk og modstandsdygtig over for trafik. Malingen findes i mange farver og kan tilpasses din bolig."
    },
    {
      question: "Hvor lang tid skal malingen tørre?",
      answer: "Moderne trappemalinger tørrer hurtigt. Typisk kan du gå forsigtigt på trinene efter 2-4 timer, men fuld hærdning tager op til en uge. Vi vejleder dig om brug under tørreperioden."
    },
  ],
  "tapetsering": [
    {
      question: "Hvad koster tapetsering per kvadratmeter?",
      answer: `Prisen på tapetsering afhænger af tapettype og væggens tilstand. Typisk ligger prisen mellem 150-350 kr. per m². Kontakt os på ${COMPANY.phone} for et skræddersyet tilbud til dit projekt.`
    },
    {
      question: "Kan I opsætte alle typer tapet?",
      answer: "Ja, vi arbejder med alle tapettyper — fra vinyltapet og fototapet til fibertapet og specialdesign. Vi rådgiver gerne om det bedste valg til dit rum og budget."
    },
    {
      question: "Fjerner I det gamle tapet først?",
      answer: "Ja, vi fjerner altid gammelt tapet og forbereder væggen grundigt. Væggen slibes, spartles og grundes, så det nye tapet sidder perfekt og holder i mange år."
    },
    {
      question: "Hvor lang tid tager tapetsering?",
      answer: "Et typisk rum tapetseres på 1-2 dage, afhængig af størrelse og tapettype. Forberedelse af væggene kan tage yderligere tid, hvis der er meget gammelt tapet eller skader."
    },
  ],
  "traemaling": [
    {
      question: "Hvad koster udvendig træmaling?",
      answer: `Prisen på træmaling varierer efter omfang og træværkets tilstand. Typisk ligger prisen mellem 100-250 kr. per m² inkl. forberedelse. Ring på ${COMPANY.phone} for et tilbud på dit projekt.`
    },
    {
      question: "Hvor ofte skal udvendigt træværk males?",
      answer: "Udvendigt træværk bør typisk males hvert 5-8 år, afhængig af vejrforhold og malingstype. Regelmæssig vedligeholdelse forlænger træværkets levetid betydeligt."
    },
    {
      question: "Kan I male træværk om vinteren?",
      answer: "Udvendig maling kræver typisk temperaturer over 5-10 grader og tørt vejr. Vinterhalvåret er derfor ikke ideelt, men vi kan planlægge projektet til foråret."
    },
    {
      question: "Reparerer I rådent træ?",
      answer: "Vi udbedrer mindre skader med træspartel og bundmaling. Ved større rådangreb anbefaler vi udskiftning af det beskadigede træværk, inden malingen påbegyndes."
    },
  ],
  "pcbforsegling": [
    {
      question: "Hvad er PCB-forsegling?",
      answer: "PCB-forsegling indkapsler PCB-holdige fuger og overflader, så de sundhedsskadelige stoffer ikke afgasser til indeklimaet. Det er en lovkrævet behandling i mange ældre bygninger."
    },
    {
      question: "Er PCB-forsegling lovpligtig?",
      answer: "Ja, bygninger opført mellem 1950-1977 kan indeholde PCB, og der gælder lovkrav om sanering eller forsegling. Vi udfører godkendt PCB-forsegling efter gældende regler."
    },
    {
      question: "Hvor lang tid holder PCB-forseglingen?",
      answer: "En korrekt udført PCB-forsegling holder typisk 10-15 år, hvorefter den skal efterses og eventuelt fornyes. Vi leverer dokumentation for det udførte arbejde."
    },
    {
      question: "Kan I teste for PCB først?",
      answer: "Vi kan hjælpe med at koordinere PCB-test gennem certificerede laboratorier. Testen afgør, om der er behov for forsegling, og vi vejleder dig gennem hele processen."
    },
  ],
  "metallisk-pu-gulv": [
    {
      question: "Hvad er et metallisk PU-gulv?",
      answer: "Et metallisk PU-gulv er en eksklusiv gulvtype med metalliske pigmenter, der giver en unik, skinnende overflade. Hvert gulv er unikt med sit eget mønster og dybde."
    },
    {
      question: "Hvor lang tid tager installation af metallisk PU-gulv?",
      answer: "Et metallisk PU-gulv installeres typisk over 3-5 dage, afhængig af rummets størrelse. Gulvet skal hærde i mindst 24 timer, før det kan bruges let, og fuld hærdning tager en uge."
    },
    {
      question: "Hvor holdbart er et metallisk PU-gulv?",
      answer: "Metalliske PU-gulve er ekstremt holdbare og modstandsdygtige over for slid, kemikalier og fugt. Med korrekt vedligeholdelse holder de i mange årtier."
    },
    {
      question: "Kan metallisk PU-gulv lægges på eksisterende gulv?",
      answer: "Ja, i de fleste tilfælde kan metallisk PU-gulv lægges på eksisterende betongulve eller fliser. Vi vurderer underlaget og sikrer korrekt forberedelse for det bedste resultat."
    },
  ],
  "billig-maler": [
    {
      question: "Hvordan kan I tilbyde billigt malerarbejde?",
      answer: "Vi holder priserne lave ved effektiv planlægning, erfarne malere og direkte indkøb af materialer. Billigt betyder ikke dårlig kvalitet — vi leverer altid et flot resultat."
    },
    {
      question: "Er der forskel på kvaliteten ved billigere priser?",
      answer: "Nej, vi bruger altid kvalitetsmalinger og professionelle metoder uanset pris. Vi kan dog tilbyde lavere priser på standard-projekter med mindre specialtilpasning."
    },
    {
      question: "Får jeg garanti på arbejdet?",
      answer: "Ja, vi giver garanti på alt vores arbejde uanset pris. Som medlem af Danske Malermestre står vi inde for kvaliteten og udbedrer eventuelle fejl eller mangler."
    },
    {
      question: "Hvad kan jeg gøre for at spare på malerarbejdet?",
      answer: "Du kan spare ved at flytte møbler selv, vælge standard farver, og have fleksible tidsrammer. Vi rådgiver gerne om, hvordan du får mest muligt for pengene."
    },
  ],
  "sprojtespartling": [
    {
      question: "Hvad er sprøjtespartling?",
      answer: "Sprøjtespartling er en hurtig og effektiv metode til at skabe glatte, ensartede overflader på vægge og lofter. Spartelmassen påføres med specialudstyr for et perfekt resultat."
    },
    {
      question: "Hvornår anbefales sprøjtespartling?",
      answer: "Sprøjtespartling er ideel til større overflader, nybyggeri, eller når gamle vægge skal renoveres. Det er hurtigere end traditionel spartling og giver et flot, ensartet resultat."
    },
    {
      question: "Hvor lang tid tager sprøjtespartling?",
      answer: "Sprøjtespartling er betydeligt hurtigere end håndspatlng. Et typisk rum kan sprøjtespartles på få timer, og hele lejligheder kan færdiggøres på 1-2 dage."
    },
    {
      question: "Kan sprøjtespartling bruges på alle overflader?",
      answer: "Sprøjtespartling egner sig til de fleste vægtyper, herunder gips, beton og eksisterende puds. Vi vurderer altid overfladen først og anbefaler den bedste løsning."
    },
  ],
  "sproejtmaling": [
    {
      question: "Hvad er sprøjtemaling?",
      answer: "Sprøjtemaling er en effektiv malingsmetode, hvor malingen påføres med spray for et ensartet, professionelt resultat. Det er ideelt til store flader og komplekse former."
    },
    {
      question: "Er sprøjtemaling bedre end penselmaling?",
      answer: "Sprøjtemaling giver en glattere finish og er hurtigere på store flader. Til detaljearbejde og mindre områder kan penselmaling dog være at foretrække. Vi vurderer den bedste metode til dit projekt."
    },
    {
      question: "Kræver sprøjtemaling mere afdækning?",
      answer: "Ja, sprøjtemaling kræver omhyggelig afdækning af omgivelserne. Vi sørger altid for professionel afdækning, så kun de ønskede overflader males."
    },
    {
      question: "Kan alle overflader sprøjtemales?",
      answer: "De fleste overflader kan sprøjtemales, herunder vægge, lofter, paneler og facader. Vi vælger den rigtige sprayteknik og maling til den specifikke overflade."
    },
  ],
  "microcement": [
    {
      question: "Hvad er microcement?",
      answer: "Microcement er en cementbaseret overfladebelægning, der skaber en fugesløs, moderne finish. Det kan anvendes på gulve, vægge og i vådrum og giver et eksklusivt, minimalistisk look."
    },
    {
      question: "Hvor lang tid tager microcement-installation?",
      answer: "En typisk microcement-installation tager 4-7 dage, afhængig af arealets størrelse. Processen omfatter flere lag og tørretid mellem hvert lag for at sikre det bedste resultat."
    },
    {
      question: "Er microcement vandtæt?",
      answer: "Ja, med den rette forsegling er microcement fuldstændig vandtæt og ideelt til badeværelser og vådrum. Vi påfører altid professionel forsegling for maksimal holdbarhed."
    },
    {
      question: "Hvor holdbart er microcement?",
      answer: "Microcement er meget slidstærkt og modstandsdygtigt over for dagligt brug. Med korrekt vedligeholdelse holder det i mange år. Vi giver grundig vejledning i pleje og vedligeholdelse."
    },
    {
      question: "Kan microcement lægges på eksisterende fliser?",
      answer: "Ja, microcement kan påføres direkte på eksisterende fliser, beton eller andre hårde overflader. Det sparer tid og udgifter til nedbrydning og bortskaffelse."
    },
  ],
  "pu-gulve": [
    {
      question: "Hvad er et PU-gulv?",
      answer: "Et PU-gulv (polyuretangulv) er et fugesløst, holdbart gulv, der er ideelt til køkkener, badeværelser, garager og erhvervslokaler. Det er slidstærkt og let at vedligeholde."
    },
    {
      question: "Hvor lang tid tager PU-gulv installation?",
      answer: "PU-gulve installeres typisk over 2-4 dage, afhængig af arealets størrelse og forberedelse. Gulvet skal hærde i mindst 24-48 timer før brug."
    },
    {
      question: "Er PU-gulve egnede til vådrum?",
      answer: "Ja, PU-gulve er vandtætte og perfekte til badeværelser, vaskerum og andre våde miljøer. De har ingen fuger, hvor vand kan trænge igennem."
    },
    {
      question: "Hvilke farver findes PU-gulve i?",
      answer: "PU-gulve fås i et bredt udvalg af farver og kan endda individualtilpasses. Vi hjælper dig med at vælge den perfekte farve til dit rum og stil."
    },
  ],
  "indvendig-maling": [
    {
      question: "Hvad koster indvendig maling per kvadratmeter?",
      answer: `Indvendig maling koster typisk 50-150 kr. per m², afhængig af overfladetype og antal lag. Få et præcist tilbud ved at kontakte os på ${COMPANY.phone}.`
    },
    {
      question: "Hvad omfatter indvendig maling?",
      answer: "Indvendig maling kan omfatte vægge, lofter, vinduer, døre, paneler, radiatorer og karme. Vi tilpasser ydelsen efter dine ønsker og budget."
    },
    {
      question: "Hvor lang tid tager det at male indvendigt?",
      answer: "Tidsforbruget afhænger af boligens størrelse. Et typisk rum tager 1-2 dage. En hel lejlighed kan males på 3-5 dage, og et helt hus tager typisk 1-2 uger."
    },
    {
      question: "Skal jeg flytte ud under malingen?",
      answer: "Nej, de fleste kunder bliver boende. Vi arbejder rum for rum og afdækker omhyggeligt. Ved større projekter kan det være mere praktisk at flytte ud midlertidigt."
    },
  ],
  "udvendig-maling": [
    {
      question: "Hvad koster udvendig husmaling?",
      answer: `Udvendig maling koster typisk 100-250 kr. per m², afhængig af overfladetype og forberedelse. Et standard parcelhus koster mellem 40.000-80.000 kr. Ring på ${COMPANY.phone} for et tilbud.`
    },
    {
      question: "Hvornår er det bedst at male udvendigt?",
      answer: "Udvendig maling udføres bedst i tørt vejr ved temperaturer mellem 10-25 grader. Forår og tidlig efterår er de ideelle perioder. Vi planlægger projektet efter vejrudsigten."
    },
    {
      question: "Hvor ofte skal huset males udvendigt?",
      answer: "Et velholdt hus bør typisk males udvendigt hvert 8-12 år, afhængig af vejrforhold og malingstype. Regelmæssig vedligeholdelse forlænger malingens holdbarhed."
    },
    {
      question: "Inkluderer prisen facadevask?",
      answer: "Ja, grundig rensning af facaden er altid inkluderet i vores tilbud. Vi fjerner snavs, alger og løs maling for at sikre, at den nye maling hæfter optimalt."
    },
  ],
  "maling-af-loft": [
    {
      question: "Hvad koster det at male et loft?",
      answer: `Prisen på loftmaling afhænger af rummets størrelse og loftets tilstand. Typisk ligger prisen mellem 40-100 kr. per m². Kontakt os på ${COMPANY.phone} for et tilbud.`
    },
    {
      question: "Kan I male alle typer lofter?",
      answer: "Ja, vi maler alle lofttyper — fra glatte gipslofter til akustiklofter og træbeklædte lofter. Vi vælger den rigtige maling og teknik til dit specifikke loft."
    },
    {
      question: "Skal jeg tømme rummet før loftmaling?",
      answer: "Nej, vi afdækker møbler og gulve omhyggeligt. Mindre møbler kan flyttes til midt i rummet, mens større møbler afdækkes på stedet."
    },
    {
      question: "Undgår I striber på loftet?",
      answer: "Ja, vi bruger professionelle teknikker og kvalitetsruller for at sikre et ensartet resultat uden striber. Ved behov bruger vi sprøjtmaling for den perfekte finish."
    },
  ],
  "maling-af-facade": [
    {
      question: "Hvad koster facademaling?",
      answer: `Prisen på facademaling afhænger af husets størrelse og facadens tilstand. Typisk ligger prisen mellem 150-300 kr. per m². Ring på ${COMPANY.phone} for et gratis tilbud.`
    },
    {
      question: "Hvilken type maling bruger I til facader?",
      answer: "Vi bruger specialdesignet facademaling, der er modstandsdygtig over for vejrpåvirkninger. Malingen tillader væggen at ånde, mens den beskytter mod fugt og UV-stråling."
    },
    {
      question: "Reparerer I revner i facaden?",
      answer: "Ja, vi udbedrer revner og skader som en del af forberedelsen. Facaden spartles, primes og klargøres, så malingen sidder optimalt og beskytter i mange år."
    },
    {
      question: "Hvor lang tid holder facademaling?",
      answer: "Med kvalitetsmaling og korrekt forberedelse holder facademaling typisk 10-15 år. Regelmæssig vedligeholdelse og rettidig opfriskning forlænger levetiden."
    },
  ],
  "maling-af-vinduer": [
    {
      question: "Hvad koster det at male vinduer?",
      answer: `Prisen per vindue varierer typisk mellem 800-2.500 kr., afhængig af vinduets størrelse og tilstand. Kontakt os på ${COMPANY.phone} for et tilbud på alle dine vinduer.`
    },
    {
      question: "Maler I både inden- og udendørs?",
      answer: "Ja, vi maler vinduer både indvendigt og udvendigt. Udvendig vinduesmaling kræver vejrbestandig maling, mens indvendig maling kan være vandbaseret for bedre indeklima."
    },
    {
      question: "Fjerner I gamle lag maling først?",
      answer: "Ja, ved behov afslliber vi gamle malingslag og fjerner skællende maling. Det sikrer, at den nye maling hæfter godt og giver et holdbart resultat."
    },
    {
      question: "Maler I også vinduer i dårligt vejr?",
      answer: "Indvendig vinduesmaling kan udføres året rundt. Udvendig maling kræver tørt vejr og temperaturer over 5-10 grader. Vi planlægger arbejdet efter vejrudsigten."
    },
  ],
  "maler-sjaelland": [
    {
      question: "Hvor på Sjælland servicerer I?",
      answer: "Vi dækker hele Sjælland — fra Slagelse til København og fra Nordsjælland til Sydsjælland. Uanset hvor du bor, kommer vi gerne ud til et gratis opmål."
    },
    {
      question: "Påvirker afstanden prisen?",
      answer: "Ved større projekter har afstanden minimal betydning for prisen. Vi planlægger arbejdet effektivt, og transportomkostninger indregnes transparent i tilbuddet."
    },
    {
      question: "Kan I arbejde flere dage i træk i Nordsjælland?",
      answer: "Ja, ved projekter i Nordsjælland eller København planlægger vi ofte sammenhængende arbejdsdage for at minimere transport og sikre et effektivt forløb."
    },
    {
      question: "Hvor hurtigt kan I komme forbi?",
      answer: `Vi kan typisk foretage et gratis opmål inden for en uge. Ved hastesager gør vi vores bedste for at komme hurtigere. Ring til os på ${COMPANY.phone} for at høre nærmere.`
    },
  ],
  "spartling": [
    {
      question: "Hvad koster spartling?",
      answer: `Prisen på spartling afhænger af omfanget og overfladens tilstand. Typisk ligger prisen mellem 50-150 kr. per m². Kontakt os på ${COMPANY.phone} for et præcist tilbud.`
    },
    {
      question: "Hvad er forskellen på spartling og sprøjtespartling?",
      answer: "Traditionel spartling udføres med hånden og er ideel til mindre områder og detaljer. Sprøjtespartling er hurtigere på store flader og giver en ensartet overflade."
    },
    {
      question: "Hvornår er spartling nødvendigt?",
      answer: "Spartling er nødvendigt, når vægge har revner, huller, ujævnheder eller gamle tapetskader. God spartling er fundamentet for et flot malerresultat."
    },
    {
      question: "Skal spartlen slibes bagefter?",
      answer: "Ja, efter tørring slibes spartelmassen, så overfladen bliver helt glat og klar til maling. Vi foretager altid den nødvendige slibning som en del af arbejdet."
    },
  ],
  "erhvervsmaling": [
    {
      question: "Udfører I malerarbejde for erhverv?",
      answer: "Ja, vi har stor erfaring med erhvervsmaling — fra kontorer og butikker til lagerhaller og institutioner. Vi tilpasser arbejdet efter jeres drift og tidsplan."
    },
    {
      question: "Kan I arbejde uden for normal arbejdstid?",
      answer: "Ja, vi tilbyder fleksible arbejdstider og kan udføre arbejdet i weekender, aftener eller om natten for at minimere forstyrrelsen af jeres daglige drift."
    },
    {
      question: "Tilbyder I vedligeholdelsesaftaler?",
      answer: "Ja, vi tilbyder løbende vedligeholdelsesaftaler til erhvervskunder. Det sikrer, at jeres lokaler altid fremstår præsentable med planlagt vedligeholdelse."
    },
    {
      question: "Kan I male under drift?",
      answer: "Ja, vi er vant til at arbejde i lokaler under drift. Vi afdækker omhyggeligt, minimerer støv og lugt, og oprydder løbende for at sikre et sikkert arbejdsmiljø."
    },
  ],
  "maling-af-radiator": [
    {
      question: "Hvad koster det at male en radiator?",
      answer: `Prisen per radiator ligger typisk mellem 400-800 kr., afhængig af størrelse og tilstand. Ved flere radiatorer giver vi mængderabat. Ring på ${COMPANY.phone} for et tilbud.`
    },
    {
      question: "Hvilken maling bruger I til radiatorer?",
      answer: "Vi bruger specialmaling til radiatorer, der tåler varme op til 90 grader. Malingen gulner ikke og bevarer sin glans selv efter mange års brug."
    },
    {
      question: "Skal radiatoren slukkes under malingen?",
      answer: "Ja, radiatoren skal være kold under malingen for at sikre, at malingen hæfter korrekt. Vi planlægger arbejdet, så det generer mindst muligt."
    },
    {
      question: "Fjerner I den gamle maling først?",
      answer: "Ved behov afsliber vi gammel, skællende maling. Radiatoren renses, slibes let og primes, så den nye maling sidder perfekt og holder i mange år."
    },
  ],
  "nybyg-maling": [
    {
      question: "Hvad omfatter maling af nybyg?",
      answer: "Nybyg-maling omfatter typisk spartling og maling af alle vægge og lofter, samt maling af vinduer, døre og paneler efter ønske. Vi tilpasser ydelsen efter byggestandard."
    },
    {
      question: "Hvornår i byggeprocessen skal I males?",
      answer: "Malerarbejdet udføres typisk efter el- og VVS-arbejde er færdigt og før gulvlægning. Vi koordinerer gerne med de øvrige håndværkere for et smidigt forløb."
    },
    {
      question: "Tilbyder I rabat ved nybyggeri?",
      answer: "Ved større nybyggeriprojekter giver vi ofte en samlet pakkeløsning til en favorabel pris. Kontakt os for et tilbud på dit byggeprojekt."
    },
    {
      question: "Kan I anbefale farver til nyt hus?",
      answer: "Ja, vi rådgiver gerne om farvevalg. Vi kan komme med forslag baseret på rummets størrelse, lysindfald og indretningsstil for at skabe den perfekte stemning."
    },
  ],

  "rengoering": [
    {
      question: "Hvad inkluderer jeres fraflytningsrengøring?",
      answer: `Vores fraflytningsrengøring dækker alt fra grundig rengøring af køkken og badeværelse til vinduespolering, aftørring af skabe, paneler og vindueskarme. Vi sørger for, at lejligheden lever op til udlejers krav. Ring ${COMPANY.phone} for et tilbud.`
    },
    {
      question: "Kan I kombinere rengøring med maling og gulvslibning?",
      answer: "Ja, det er netop vores styrke! Vi tilbyder en komplet fraflytnings- og renoveringspakke, hvor vi står for maling, gulvslibning og afsluttende rengøring. Én kontaktperson, ét samlet tilbud."
    },
    {
      question: "Hvor lang tid tager en fraflytningsrengøring?",
      answer: "Det afhænger af lejlighedens størrelse og stand. En typisk 2-3 værelsers lejlighed tager normalt en halv til en hel dag. Vi giver altid en tidsramme i vores tilbud."
    },
  ],

  "gulvslibning": [
    {
      question: "Hvad koster gulvslibning?",
      answer: `Prisen afhænger af gulvets areal, tilstand og den ønskede finish (lak, olie eller voks). Vi giver altid et gratis og uforpligtende tilbud. Ring ${COMPANY.phone} for at høre mere.`
    },
    {
      question: "Hvor lang tid tager gulvslibning?",
      answer: "En typisk lejlighed kan slibes og lakeres på 1-2 dage. Lakken skal dog tørre, så regn med at gulvet er klar til brug efter 2-3 dage. Vi planlægger det, så det passer med eventuelt malerarbejde."
    },
    {
      question: "Kan I slibe alle typer trægulve?",
      answer: "Vi sliber de fleste typer massive trægulve og lamelparketgulve. Laminatgulve kan ikke slibes. Vi vurderer altid gulvets tilstand inden vi starter og rådgiver om den bedste løsning."
    },
    {
      question: "Er gulvslibning inkluderet i fraflytningspakken?",
      answer: "Ja, gulvslibning kan inkluderes i vores komplette fraflytningspakke sammen med maling og rengøring. Det giver den bedste pris og det mest effektive forløb."
    },
  ],
}

// Helper function to get FAQs for a service slug
export function getServiceFAQs(slug: string): FAQ[] | null {
  return SERVICE_FAQS[slug] || null
}
