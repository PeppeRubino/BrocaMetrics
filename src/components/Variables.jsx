// src/constants/variables.jsx
// Contiene costanti riutilizzabili per i lobi, sezioni e mappature parti.

export const LOBES_MODEL_1 = [
  { id: 'frontale', label: 'Lobo Frontale', partName: 'LoboFrontale', color: 0xffff00 },
  { id: 'parietale', label: 'Lobo Parietale', partName: 'LoboParietale', color: 0x00ff00 },
  { id: 'temporale', label: 'Lobo Temporale', partName: 'LoboTemporale', color: 0xff0000 },
  { id: 'occipitale', label: 'Lobo Occipitale', partName: 'LoboOccipitale', color: 0x0000ff },
  { id: 'cervelletto', label: 'Cervelletto', partName: 'Cervelletto', color: 0xffa500 },
  { id: 'tronco', label: 'Tronco Encefalico', partName: 'Tronco', color: 0xff00fb },
  { id: 'pineale', label: 'Ghiandola Pineale', partName: 'Pineale', color: 0x54aedb },
];

export const LOBES_MODEL_2 = [
  { id: 'putamen', label: 'Putamen', partName: 'Putamen', color: 0xd8b4fe },
  { id: 'nucleoCaudato', label: 'Nucleo Caudato', partName: 'NucleoCaudato', color: 0xa7f3d0 },
  { id: 'talamo', label: 'Talamo', partName: 'Talamo', color: 0xfca5a5 },
  { id: 'capsulaInterna', label: 'Capsula Interna', partName: 'CapsulaInterna', color: 0xffe082 },
  { id: 'midolloAllungato', label: 'Midollo Allungato', partName: 'MidolloAllungato', color: 0xbfe9ff },
  { id: 'ponteVarolio', label: 'Ponte di Varolio', partName: 'PonteVarolio', color: 0xfde68a },
  { id: 'peduncoloSuperiore', label: 'Peduncolo Superiore', partName: 'PeduncoloSuperiore', color: 0xc4b5fd },
];

export const LOBES_MODEL_3 = [
  { id: 'corpoCalloso', label: 'Corpo Calloso', partName: 'CorpoCalloso', color: 0x9aa6ff },
  { id: 'chiasmaOttico', label: 'Chiasma Ottico', partName: 'ChiasmaOttico', color: 0xffbcbc },
  { id: 'ippocampo', label: 'Ippocampo', partName: 'Ippocampo', color: 0xa7f3d0 },
  { id: 'amigdala', label: 'Amigdala', partName: 'Amigdala', color: 0xfbcfe8 },
  { id: 'ventricoloLaterale', label: 'Ventricolo Laterale', partName: 'VentricoloLaterale', color: 0xbfe9ff },
  { id: 'septalNuclei', label: 'Septal nuclei', partName: 'SeptalNuclei', color: 0xfde68a },
  { id: 'collicoloSuperiore', label: 'Collicolo Superiore', partName: 'CollicoloSuperiore', color: 0xc7f9cc },
  { id: 'collicoloInferiore', label: 'Collicolo Inferiore', partName: 'CollicoloInferiore', color: 0xffd6a5 },
];

export const SECTION_PLANES = [
  { id: 'sagittale', label: 'Sagittale' },
  { id: 'orizzontale', label: 'Orizzontale' },
  { id: 'verticale', label: 'Verticale' },
  { id: 'trasversale', label: 'Trasversale' },
];

export const SECTION_TO_PART_MAP = {
  frontale: 'frontal_01 - Default_0',
  parietale: 'pariet_01 - Default_0',
  temporale: 'temp_01 - Default_0',
  occipitale: 'occipit_01 - Default_0',
  cervelletto: 'cereb_01 - Default_0',
  tronco: 'stem_01 - Default_0',
  pineale: 'pitua_01 - Default_0',
  putamen: 'Putamen.r.002_Putamen.r.001',
  nucleoCaudato: 'Caudate_nucleus.r.002_Caudate_nucleus.r.001',
  talamo: 'Thalamus.r.002_Thalamus.r.001',
  chiasmoOttico: 'Optical_chiasm.l.001',
  capsulaInterna: 'Internal_capsule.r.002_Internal_capsule.r.001',
  ippocampo: 'Hippocampus.r.002_Hippocampus.r.001',
  amigdala: 'Amygdaloid_body.r.002_Amygdaloid_body.r.001',
  corpoCalloso: 'Corpus_callosum',
  ventricoloLaterale: 'Lateral_ventricle.r.001',
  septalNuclei: 'Septal_nuclei',
  collicoloSuperiore: 'Superior_colliculus.r.002_Superior_colliculus.r.001',
  collicoloInferiore: 'Inferior_colliculus.r.002_Inferior_colliculus.r.001',
  midolloAllungato: 'Medulla_oblongata.r.002_Medulla_oblongata.r.001',
  ponteVarolio: 'Pons.r.002_Pons.r.001',
  peduncoloSuperiore: 'Superior_cerebellar_peduncle.r.002_Superior_cerebellar_peduncle.r.001',
};

// File: src/components/Variables.jsx
// Brodmann areas data: positions (pos) e descrizioni sintetiche.
// Le descrizioni sono riassunte da fonti pubbliche (Wikipedia, Kenhub, SimplyPsychology, Britannica).
// Se vuoi più dettaglio su una specifica area (bibliografia, riferimenti primari), te la fornisco.

export const BROADMANN_POINTS = [
  { id: 1,  label: 'Area 1',  pos: [6, 10, 1.5],  description: 'Corteccia somatosensoriale primaria — ricezione e prima elaborazione di stimoli tattili e propriocettivi dal corpo contralaterale; rappresenta in modo topografico il corpo (mappa somatotopica):contentReference[oaicite:0]{index=0}:contentReference[oaicite:1]{index=1}.' },
  { id: 2,  label: 'Area 2',  pos: [7, 9, 1.7],   description: 'Corteccia associativa somatosensoriale — integra informazioni tattili, di posizione e forma degli oggetti, contribuendo alla percezione spaziale e al riconoscimento tattile (collabora con aree 1 e 3):contentReference[oaicite:2]{index=2}:contentReference[oaicite:3]{index=3}.' },
  { id: 3,  label: 'Area 3',  pos: [5, 11, 1.2],  description: 'Corteccia somatosensoriale primaria (aree 3a/3b) — riceve proiezioni talamiche dai recettori somatosensoriali; area 3a elabora segnali propriocettivi (muscoli), 3b segnali cutanei; cura l’elaborazione sensoriale iniziale per l’identificazione di stimoli tattili e posizione corporea:contentReference[oaicite:4]{index=4}:contentReference[oaicite:5]{index=5}.' },
  { id: 4,  label: 'Area 4',  pos: [5, 11, 3.5],  description: 'Corteccia motoria primaria (M1) — esecutrice dei movimenti volontari; contiene motoneuroni giganti (cellule di Betz) i cui assoni formano la via corticospinale; mappa in modo somatotopico i muscoli del corpo, orchestrando contrazioni muscolari coordinate:contentReference[oaicite:6]{index=6}.' },
  { id: 5,  label: 'Area 5',  pos: [3, 12, -0.8], description: 'Corteccia associativa somatosensoriale (area 5) — situata nel lobo parietale superiore, integra informazioni somestesiche e visuo-spaziali per pianificare e coordinare movimenti; supporta stereopsi, attenzione spaziale e apprendimento della posizione corporea:contentReference[oaicite:7]{index=7}.' },
  { id: 6,  label: 'Area 6',  pos: [5, 11, 4],    description: 'Corteccia premotoria e area motoria supplementare (area 6) — coinvolte nella preparazione e coordinazione di movimenti complessi; selezionano programmi motori in base a stimoli esterni e interni, e partecipano a compiti cognitivi (linguaggio, memoria di lavoro):contentReference[oaicite:8]{index=8}.' },
  { id: 7,  label: 'Area 7',  pos: [5, 10.5, -1.5], description: 'Corteccia associativa parietale (area 7) — collega informazioni visive e propriocettive per l’orientamento spaziale e la guida dei movimenti; permette di localizzare oggetti nello spazio e di controllare raggiungimento e presa mediante la convergenza di dati visivi e corpomotori:contentReference[oaicite:9]{index=9}:contentReference[oaicite:10]{index=10}.' },
  { id: 8,  label: 'Area 8',  pos: [3, 12, 6],    description: 'Campi oculari frontali (area 8) — regioni nel lobo frontale responsabili del controllo volontario degli spostamenti oculari (saccadi) e dell’attenzione visiva; integrano informazioni visive per dirigere lo sguardo verso punti di interesse:contentReference[oaicite:11]{index=11}:contentReference[oaicite:12]{index=12}.' },
  { id: 9,  label: 'Area 9',  pos: [2, 11, 11],   description: 'Corteccia prefrontale dorsolaterale (area 9) — estesa nella parte superiore del lobo frontale, è chiave nelle funzioni esecutive: memoria di lavoro, attenzione sostenuta, pianificazione, regolazione delle risposte comportamentali e integrazione di informazioni sensoriali e mnestiche:contentReference[oaicite:13]{index=13}.' },
  { id: 10, label: 'Area 10', pos: [1.3, 7, 14],  description: 'Corteccia frontale polare (area 10) — regione più anteriore del lobo frontale; supporta processi astratti e strategici: pianificazione del futuro, multitasking e memoria prospettica (p.es. ricordare di eseguire azioni basate su eventi futuri), integrando informazioni complesse:contentReference[oaicite:14]{index=14}.' },
  { id: 11, label: 'Area 11', pos: [1.7, 3, 14],  description: 'Corteccia orbito-frontale (area 11) — coinvolta nella valutazione del valore e nella codifica delle ricompense/emozioni; integra segnali affettivi per prendere decisioni sociali e adattive, modulando il comportamento in base al valore emotivo di stimoli e azioni:contentReference[oaicite:15]{index=15}.' },
  { id: 12, label: 'Area 12', pos: [1.3, 3, 11],  description: 'Parte dell’orbito-frontale (area 12) — regione ventromediale frammentata nell’uomo e sovrapposta con l’area 11; implicata anch’essa in elaborazione di valore emozionale e integrazione multisensoriale nei processi decisionali:contentReference[oaicite:16]{index=16}.' },
  { id: 13, label: 'Area 13', pos: [0, 0, 0],     description: 'Insula posteriore/orbito-frontale (area 13) — parte posteriore dell’orbito-frontale e dell’insula; integra segnali interocettivi (stati viscerali) e affettivi; partecipa alla consapevolezza delle sensazioni corporee interne e alle risposte emotive viscerali:contentReference[oaicite:17]{index=17}.' },
  { id: 14, label: 'Area 14', pos: [0, 0, 0],     description: 'Insula mediale (area 14) — regione ventromediale del lobo frontale; nei primati è associata alla percezione viscerale e olfattiva; partecipa all’elaborazione di segnali interni (p.es. gustativi, autonomici) e all’integrazione di informazioni emotive profonde:contentReference[oaicite:18]{index=18}.' },
  { id: 15, label: 'Area 15', pos: [0, 0, 0],     description: 'Zona agranulare insulare (area 15) — identificata in primati, non chiaramente distinta nell’uomo; in animali riceve afferenze dai barocettori carotidi (pressione sanguigna) via i nervi di Hering; si pensa abbia un ruolo nella trasmissione di segnali autonomici viscerali:contentReference[oaicite:19]{index=19}.' },
  { id: 16, label: 'Area 16', pos: [0, 0, 0],     description: 'Insula anteriore agranulare (area 16) — regione anteriore dell’insula (sovrapponibile in parte a aree olfattive paleocorticali) coinvolta nelle funzioni interocettive; integra stimoli viscerali con aspetti emotivi e motivazionali:contentReference[oaicite:20]{index=20}.' },
  { id: 17, label: 'Area 17', pos: [2.2, -1, -10], description: 'Corteccia visiva primaria (V1, area striata) — riceve input visivi primari dalla retina attraverso il talamo; mappa retinotopicamente lo spazio visivo; elabora caratteristiche fondamentali (linee, orientamento, contrasti) e inizia la catena elaborativa visiva:contentReference[oaicite:21]{index=21}.' },
  { id: 18, label: 'Area 18', pos: [2.2, 3, -10], description: 'Corteccia visiva secondaria (V2) — si trova intorno alla V1; elabora informazioni visive elaborate provenienti dalla prima corteccia visiva (estrazione di caratteristiche); partecipa alla codifica iniziale di contorni, forme semplici e relazioni spaziali retinotopiche:contentReference[oaicite:22]{index=22}.' },
  { id: 19, label: 'Area 19', pos: [2.2, 6, -9],  description: 'Corteccia visiva associativa (aree V3–V6) — nucleo extrastriato nel lobo occipitale; integra aspetti complessi della visione (forma, colore, movimento) e connette i flussi visivi dorsale/ventrale; contiene aree specializzate (V3, V4, V5/MT, V6) per riconoscimento di forme e movimento:contentReference[oaicite:23]{index=23}:contentReference[oaicite:24]{index=24}.' },
  { id: 20, label: 'Area 20', pos: [9, 0, 4],     description: 'Giro temporale inferiore (area 20) — corteccia temporale ventrale; partecipa al riconoscimento di oggetti e categorie visive; supporta la memoria visiva e la categorizzazione di stimoli complessi, contribuendo alla percezione di volti e scene familiari:contentReference[oaicite:25]{index=25}.' },
  { id: 21, label: 'Area 21', pos: [10, 1, 2],    description: 'Giro temporale medio (area 21) — coinvolto nell’elaborazione semantica e nella comprensione del linguaggio; integra informazioni uditive e visive con la memoria semantica, contribuendo alla comprensione di suoni, parole e significati; partecipa anche al processing del linguaggio e alla memoria verbale:contentReference[oaicite:26]{index=26}.' },
  { id: 22, label: 'Area 22', pos: [10, 2, 4],    description: 'Giro temporale superiore (area 22, comprensivo di Wernicke nell’emisfero dominante) — nucleo di elaborazione uditiva complessa e linguistica; essenziale per la comprensione del linguaggio, l’analisi del segnale uditivo verbale (prosodia, fonemi) e l’integrazione semantica del parlato:contentReference[oaicite:27]{index=27}.' },
  { id: 23, label: 'Area 23', pos: [1, 6, -2.2],  description: 'Corteccia cingolata posteriore ventrale (area 23) — regione limbica posteriore; nodo della default mode network; partecipa alla memoria autobiografica, all’elaborazione interna di scenari e all’autoreferenzialità, integrando contenuti emotivi e contestuali del ricordo:contentReference[oaicite:28]{index=28}.' },
  { id: 24, label: 'Area 24', pos: [1.7, 5, 6],   description: 'Corteccia cingolata anteriore ventrale (area 24) — riveste la porzione anteriore del cingolo; regola le emozioni e l’attività autonoma; integra affetti con risposte viscerali e motivationali, contribuendo a collegare stati emotivi interni al comportamento adattivo:contentReference[oaicite:29]{index=29}.' },
  { id: 25, label: 'Area 25', pos: [0, 0, 0],     description: 'Corteccia cingolata subgenuale (area 25) — situata sotto il ginocchio del corpo calloso; coinvolta nella regolazione dell’umore e delle emozioni; connessa al sistema limbico, è studiata in relazione a depressione e modulazione affettiva:contentReference[oaicite:30]{index=30}.' },
  { id: 26, label: 'Area 26', pos: [1, 4.7, -3.2], description: 'Area ectospleniale/retrospleniale (area 26) — parte della regione retrospleniale; coinvolta in memoria spaziale e navigazione; riceve proiezioni dall’ippocampo e collega strutture limbiche, supportando l’integrazione di informazioni contestuali spaziali:contentReference[oaicite:31]{index=31}:contentReference[oaicite:32]{index=32}.' },
  { id: 27, label: 'Area 27', pos: [1, 3.8, -2.6], description: 'Corteccia piriforme (area 27) — nucleo primario dell’olfatto; riceve direttamente input dall’epitelio olfattivo tramite il bulbo; essenziale per la percezione degli odori e il loro abbinamento a valenze emotive e mnemoniche; fondamentale per l’integrazione olfattiva con limbico e memoria:contentReference[oaicite:33]{index=33}.' },
  { id: 28, label: 'Area 28', pos: [1, 3.5, -2],   description: 'Corteccia entorinale posteriore (area 28) — nodo di passaggio tra neocorteccia e ippocampo; componente chiave del sistema della memoria nel lobo temporale mediale; elabora informazioni contestuali per la formazione di memorie episodiche e spaziali:contentReference[oaicite:34]{index=34}.' },
  { id: 29, label: 'Area 29', pos: [0, 0, 0],     description: 'Corteccia retrospleniale (area 29) — parte della sottoregione posteriore del cingolo; cruciale per memoria episodica e orientamento spaziale; integra segnali dal sistema limbico e visivo per la navigazione e il richiamo di scene, formando parte della rete per la costruzione di scenari mentali:contentReference[oaicite:35]{index=35}.' },
  { id: 30, label: 'Area 30', pos: [1, 4.5, -3.5], description: 'Corteccia retrospleniale (area 30) — contigua all’area 29; partecipa anch’essa alla memoria spaziale e all’orientamento; coinvolta nella codifica e recupero di informazioni ambientali e nell’integrazione multimodale di input contestuali:contentReference[oaicite:36]{index=36}.' },
  { id: 31, label: 'Area 31', pos: [1, 7, -2.4],  description: 'Corteccia cingolata posteriore dorsale (area 31) — nucleo dorsale del cingolo posteriore; attivo nella rete di default e nell’elaborazione auto-riferita; coinvolto nel confronto di scenari interni, nell’attenzione sostenuta e nel recupero mnestico, supportando i processi di consapevolezza spaziale e visuo-memoria:contentReference[oaicite:37]{index=37}.' },
  { id: 32, label: 'Area 32', pos: [1.3, 4.5, 10], description: 'Corteccia cingolata anteriore dorsale (area 32) — porzione dorsale del cingolo anteriore; critica nel controllo cognitivo: monitoraggio dell’errore, rilevazione del conflitto, processo decisionale e regolazione delle risposte in base alle regole; funge da interfaccia tra processi esecutivi e affettivi:contentReference[oaicite:38]{index=38}.' },
  { id: 33, label: 'Area 33', pos: [0, 0, 0],     description: 'Parte del cingolo anteriore (area 33) — zona limbica anteriore; implicata nell’integrazione emotiva e somatica, con forte connettività con altre strutture limbiche; contribuisce alla valutazione degli stati viscerali e alla consapevolezza emotiva.' },
  { id: 34, label: 'Area 34', pos: [1, 4, -2.6],   description: 'Corteccia entorinale anteriore (area 34) — componente dorsale dell’ippocampo, sede di elaborazione della memoria a lungo termine; nodo integrativo tra neocorteccia e ippocampo, essenziale per la memorizzazione di eventi ed esperienze; considerata allocorticale, è centrale nei processi mnestici:contentReference[oaicite:39]{index=39}.' },
  { id: 35, label: 'Area 35', pos: [1, 3.6, -2.6], description: 'Corteccia peririnale (area 35) — situata nell’ippocampo mediale; coinvolta nel riconoscimento degli oggetti e nella memoria episodica associativa; integra segnali visivi e situazionali per discriminare elementi noti da nuovi e assicura la codifica contestuale dei ricordi:contentReference[oaicite:40]{index=40}.' },
  { id: 36, label: 'Area 36', pos: [1, 3, -2],     description: 'Corteccia paraippocampale (area 36) — parte mediale del lobo temporale; concorre al supporto della memoria e al riconoscimento contestuale; fornisce informazioni di sfondo che arricchiscono il significato degli stimoli (p.es. ambientazione di scene):contentReference[oaicite:41]{index=41}.' },
  { id: 37, label: 'Area 37', pos: [10, 2, -3],    description: 'Giro fusiforme/inferotemporale (area 37) — corteccia associativa inferiore occipitale-temporale; specializzata nell’elaborazione visiva avanzata (riconoscimento facciale, categorie di oggetti, lettura); integra forma, colore e dettagli per il riconoscimento visivo di alto livello:contentReference[oaicite:42]{index=42}.' },
  { id: 38, label: 'Area 38', pos: [8, 2, 8],      description: 'Area temporopolare (area 38) — polo anteriore del lobo temporale; eteromodale e paralimbica; integra input sensoriali con contesto emozionale e sociale; cruciale per memoria semantica, inclusi significati caricati di emotività, e per funzioni socio-emotive (riconoscimento di volti emotivi, empatia):contentReference[oaicite:43]{index=43}:contentReference[oaicite:44]{index=44}.' },
  { id: 39, label: 'Area 39', pos: [10, 4, -2.2],  description: 'Giro angolare (area 39) — porzione posteriore del lobo parietale inferiore; hub multimodale: integra informazioni visive, uditive e linguistiche; fondamentale per linguaggio scritto (lettura), calcolo mentale, elaborazione semantica e orientamento dell’attenzione; partecipa alla rete di default e alla cognizione sociale:contentReference[oaicite:45]{index=45}:contentReference[oaicite:46]{index=46}.' },
  { id: 40, label: 'Area 40', pos: [10, 5.4, -1.2], description: 'Giro sovramarginale (area 40) — lobo parietale inferiore anteriore; supporta la fonologia, l’integrazione sensomotoria nel linguaggio (es. articolazione e comprensione della parola), l’empatia e la simulazione motoria; contribuisce al controllo dei suoni e alla rappresentazione del corpo nelle attività comunicative:contentReference[oaicite:47]{index=47}.' },
  { id: 41, label: 'Area 41', pos: [10, 3.3, 1],   description: 'Corteccia uditiva primaria (Heschl, area 41) — prima stazione corticale per l’input uditivo; riceve segnali dal corpo genicolato mediale del talamo; codifica parametri acustici fondamentali (frequenza, intensità, durata):contentReference[oaicite:48]{index=48}.' },
  { id: 42, label: 'Area 42', pos: [10, 3.8, 1.3], description: 'Corteccia uditiva secondaria (area 42) — estesa accanto ad area 41; elabora complessi aspetti del segnale uditivo (riconoscimento timbrico, linguaggio); contribuisce all’integrazione uditiva superiore e alla percezione musicale e parlata:contentReference[oaicite:49]{index=49}.' },
  { id: 43, label: 'Area 43', pos: [10, 4.6, -1.2], description: 'Corteccia gustativa primaria (area 43) — porzione subcentrale dell’insula; riceve input dai recettori del gusto via talamo; fondamentale nella percezione dei sapori e nell’integrazione di segnali gustativi con input tattile/orale:contentReference[oaicite:50]{index=50}.' },
  { id: 44, label: 'Area 44', pos: [8, 5.6, 10],   description: 'Pars opercolare (area 44, parte di Broca) — lobo frontale inferiore; coinvolta nella produzione del linguaggio e nella programmazione motoria della parola; partecipa all’articolazione del linguaggio parlato e a compiti sintattici complessi:contentReference[oaicite:51]{index=51}.' },
  { id: 45, label: 'Area 45', pos: [7, 5, 12],     description: 'Pars triangolare (area 45, Broca) — lobo frontale inferiore; partecipa alla semantica e alla rielaborazione del linguaggio; importante nella scelta lessicale, nella comprensione sintattica complessa e nell’integrazione del significato delle parole durante la produzione linguistica:contentReference[oaicite:52]{index=52}.' },
  { id: 46, label: 'Area 46', pos: [5, 6.5, 12],   description: 'Corteccia prefrontale dorsolaterale (area 46) — regione frontale laterale dorsale; chiave nei processi esecutivi (memoria di lavoro, controllo cognitivo, attenzione selettiva); integra e aggiorna informazioni nel breve termine per pianificare, inibire risposte inappropriate e modulare il comportamento secondo obiettivi:contentReference[oaicite:53]{index=53}.' },
  { id: 47, label: 'Area 47', pos: [7, 3, 12],     description: 'Pars orbitaris (area 47) — lobo frontale ventro-laterale; eteromodale; essenziale nell’elaborazione semantica del linguaggio, nell’integrazione con informazioni emotive e limbiche e nel controllo sociale del comportamento; contribuisce all’interpretazione di metafore e contesti complessi:contentReference[oaicite:54]{index=54}.' },
  { id: 48, label: 'Area 48', pos: [0, 0, 0],      description: 'Area retrosubicolare (area 48) — presubicolo, parte dell’ippocampo; implicata nell’orientamento spaziale, codifica direzionale (head-direction) e memoria contestuale; partecipa ai circuiti di navigazione e riconoscimento ambientale:contentReference[oaicite:55]{index=55}.' },
  { id: 49, label: 'Area 49', pos: [0, 0, 0],      description: 'Area parasubicolare (area 49) — definita in alcuni animali (parasubicolo); nell’uomo non chiaramente distinta; presumibilmente parte della corteccia limbica temporale coinvolta in circuiti di memoria spaziale e navigazione.' },
  { id: 50, label: 'Area 50', pos: [0, 0, 0],      description: 'Area 50 — (non sempre mappata nel cervello umano moderno) menzionata in studi comparativi; definizione e funzione non ben stabilite nell’uomo.' },
  { id: 51, label: 'Area 51', pos: [0, 0, 0],      description: 'Area 51 — in primati associata a zone viscerali/olfattive; omologo umano parziale; coinvolta nell’integrazione di segnali olfattivi e viscerali nell’elaborazione limbica.' },
  { id: 52, label: 'Area 52', pos: [9, 3, 7],      description: 'Area parainsulare (area 52) — presso la giunzione temporale-insulare anteriore; coinvolta nell’integrazione sensoriale multimodale e nella percezione interocettiva, connessa a funzioni sia uditive che viscerali/affettive:contentReference[oaicite:56]{index=56}.' }
];




export default {
  LOBES_MODEL_1,
  LOBES_MODEL_2,
  LOBES_MODEL_3,
  SECTION_PLANES,
  SECTION_TO_PART_MAP,
  BROADMANN_POINTS
};


