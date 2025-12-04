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
  { id: 1,  label: 'Area 1',  pos: [6, 10, 1.5],  description: 'Primary somatosensory cortex — ricezione tattile e propriocettiva (parte del complesso 1–3).' },
  { id: 2,  label: 'Area 2',  pos: [7, 9, 1.7],   description: 'Somatosensory association — integrazione di informazioni tattile e posizione del corpo.' },
  { id: 3,  label: 'Area 3',  pos: [5, 11, 1.2],  description: 'Primary somatosensory (3a/3b) — elaborazione sensoriale primaria da vie somatosensoriali.' },
  { id: 4,  label: 'Area 4',  pos: [5, 11, 3.5],  description: 'Primary motor cortex (M1) — esecuzione dei movimenti volontari.' },
  { id: 5,  label: 'Area 5',  pos: [3, 12, -0.8], description: 'Somatosensory association cortex — integrazione sensoriale superiore e apprendimento spazio-posturale.' },
  { id: 6,  label: 'Area 6',  pos: [5, 11, 4],    description: 'Premotor cortex e Supplementary Motor Area — pianificazione e coordinazione motoria.' },
  { id: 7,  label: 'Area 7',  pos: [5, 10.5, -1.5], description: 'Somatosensory association / visuomotor integration — orientamento spaziale e coordinazione di azioni guidate dalla vista.' },
  { id: 8,  label: 'Area 8',  pos: [3, 12, 6],    description: 'Frontal eye fields — controllo dei movimenti oculari volontari e orientamento visivo.' },
  { id: 9,  label: 'Area 9',  pos: [2, 11, 11],   description: 'Dorsolateral prefrontal cortex — funzioni esecutive, memoria di lavoro e pianificazione.' },
  { id: 10, label: 'Area 10', pos: [1.3, 7, 14],  description: 'Frontopolar cortex — processi di alto livello come pianificazione astratta, integrazione di informazioni complesse.' },
  { id: 11, label: 'Area 11', pos: [1.7, 3, 14],  description: 'Orbitofrontal cortex — valutazione di valore, decision making integrato con emozione.' },
  { id: 12, label: 'Area 12', pos: [1.3, 3, 11],  description: 'Parte dell\'orbitofrontale — associata a processi di valore e integrazione multisensoriale (sovrapposta con BA11 in mappe moderne).' },
  { id: 13, label: 'Area 13', pos: [0, 0, 0],     description: 'Porzione della corteccia dell\'insula / orbitofrontale posteriore — coinvolta in processi viscerali, emotivi e integrazione sensoriale interocettiva.' },
  { id: 14, label: 'Area 14', pos: [0, 0, 0],     description: 'Identificata principalmente in primati; omologo ventromediale prefrontale umano — associata a elaborazione viscerale/olfattiva e integrazione autonoma.' },
  { id: 15, label: 'Area 15', pos: [0, 0, 0],     description: 'Area descritta in primati; non sempre distinta in umani — implicata in input autonomici (es. segnali carotidi) in animali.' },
  { id: 16, label: 'Area 16', pos: [0, 0, 0],     description: 'Parti insulari/anteromediali — associate a funzioni interocettive e integrazione viscerale.' },
  { id: 17, label: 'Area 17', pos: [2.2, -1, -10], description: 'Primary visual cortex (V1, striate cortex) — elaborazione visiva primaria.' },
  { id: 18, label: 'Area 18', pos: [2.2, 3, -10], description: 'Secondary visual cortex (V2) — processamento visivo di livello successivo.' },
  { id: 19, label: 'Area 19', pos: [2.2, 6, -9],  description: 'Associative visual cortex (V3/V4 ecc.) — integrazione visiva complessa e riconoscimento di forme/movimento.' },
  { id: 20, label: 'Area 20', pos: [9, 0, 4],     description: 'Inferior temporal gyrus — coinvolta nel riconoscimento visivo di oggetti e categorie (memoria visiva).' },
  { id: 21, label: 'Area 21', pos: [10, 1, 2],    description: 'Middle temporal gyrus — processi semantici e integrazione uditivo-visiva, ruolo nel linguaggio e memoria.' },
  { id: 22, label: 'Area 22', pos: [10, 2, 4],    description: 'Superior temporal gyrus (incl. Wernicke in emisfera dominante) — comprensione del linguaggio e processamento uditivo complesso.' },
  { id: 23, label: 'Area 23', pos: [1, 6, -2.2],  description: 'Ventral posterior cingulate — parte del circuito cingolato posteriore, coinvolta in memoria e rete di default.' },
  { id: 24, label: 'Area 24', pos: [1.7, 5, 6],   description: 'Ventral anterior cingulate — regolazione emotiva, integrazione affettiva e controllo autonomico.' },
  { id: 25, label: 'Area 25', pos: [0, 0, 0],     description: 'Subgenual cingulate / ventromedial PFC — implicata nel tono dell\'umore e nella regolazione emotiva (spesso studiata in depressione).' },
  { id: 26, label: 'Area 26', pos: [1, 4.7, -3.2], description: 'Ectosplenial / retrospenial portion — coinvolta in memoria spaziale e navigazione (parte della regione retrospleniale).' },
  { id: 27, label: 'Area 27', pos: [1, 3.8, -2.6], description: 'Piriform cortex — corteccia olfattiva primaria/associativa.' },
  { id: 28, label: 'Area 28', pos: [1, 3.5, -2],   description: 'Posterior entorhinal cortex — nodo chiave per memoria ed elaborazione spaziale (porta verso l\'ippocampo).' },
  { id: 29, label: 'Area 29', pos: [0, 0, 0],     description: 'Retrosplenial cortex (part) — memoria episodica e navigazione, connessa con midline networks.' },
  { id: 30, label: 'Area 30', pos: [1, 4.5, -3.5], description: 'Parte del cingulate/retrospleniale — correlata a memoria e orientamento spaziale.' },
  { id: 31, label: 'Area 31', pos: [1, 7, -2.4],  description: 'Dorsal posterior cingulate — attentional / default-mode hub, memoria e confronto di scenari.' },
  { id: 32, label: 'Area 32', pos: [1.3, 4.5, 10], description: 'Dorsal anterior cingulate — controllo cognitivo, conflitto e monitoraggio dell\'errore.' },
  { id: 33, label: 'Area 33', pos: [0, 0, 0],     description: 'Parte dell\'anterior cingulate — implicata in integrazione emotiva e somatica.' },
  { id: 34, label: 'Area 34', pos: [1, 4, -2.6],   description: 'Anterior entorhinal cortex (parahippocampal) — memoria e funzioni mnestiche.' },
  { id: 35, label: 'Area 35', pos: [1, 3.6, -2.6], description: 'Perirhinal cortex — coinvolta in riconoscimento e memoria episodica.' },
  { id: 36, label: 'Area 36', pos: [1, 3, -2],     description: 'Parahippocampal region — supporto alla memoria e al riconoscimento contestuale.' },
  { id: 37, label: 'Area 37', pos: [10, 2, -3],    description: 'Fusiform / inferotemporal (fusiform gyrus) — riconoscimento facciale, visione ad alto livello.' },
  { id: 38, label: 'Area 38', pos: [8, 2, 8],      description: 'Temporopolar area — integrazione semantica, memoria sociale ed emozionale.' },
  { id: 39, label: 'Area 39', pos: [10, 4, -2.2],  description: 'Angular gyrus — lettura, calcolo, integrazione multimodale, attenzione semantica.' },
  { id: 40, label: 'Area 40', pos: [10, 5.4, -1.2], description: 'Supramarginal gyrus — fonologia, integrazione sensomotoria nel linguaggio e empatia/simulazione.' },
  { id: 41, label: 'Area 41', pos: [10, 3.3, 1],   description: 'Primary auditory cortex (Heschl) — elaborazione uditiva primaria.' },
  { id: 42, label: 'Area 42', pos: [10, 3.8, 1.3], description: 'Secondary auditory cortex — integrazione e processi uditivi complessi.' },
  { id: 43, label: 'Area 43', pos: [10, 4.6, -1.2], description: 'Area gustativa / subcentral — rappresentazione del gusto e integrazione orale.' },
  { id: 44, label: 'Area 44', pos: [8, 5.6, 10],   description: 'Pars opercularis (Broca area part) — produzione del linguaggio e programmazione motoria del linguaggio.' },
  { id: 45, label: 'Area 45', pos: [7, 5, 12],     description: 'Pars triangularis (Broca area) — processo semantico e produzione linguistica elaborata.' },
  { id: 46, label: 'Area 46', pos: [5, 6.5, 12],   description: 'Dorsolateral prefrontal cortex — memoria di lavoro, controllo esecutivo e regolazione cognitiva.' },
  { id: 47, label: 'Area 47', pos: [7, 3, 12],     description: 'Parte orbitofrontale/inferior frontal — elaborazione semantica, integrazione limbica e linguaggio.' },
  { id: 48, label: 'Area 48', pos: [0, 0, 0],      description: 'Retrosubicular area — piccole porzioni della superficie mediale temporale; descrizione/ruolo variabile.' },
  { id: 49, label: 'Area 49', pos: [0, 0, 0],      description: 'Parasubicular area — definita in alcuni animali; in umani non sempre distinta (uso limitato).' },
  { id: 50, label: 'Area 50', pos: [0, 0, 0],      description: 'Non sempre identificata in mappature moderne umane; menzionata in letteratura comparativa.' },
  { id: 51, label: 'Area 51', pos: [0, 0, 0],      description: 'Spesso associata a regioni viscerali/olfattive in primati; omologia umana parziale.' },
  { id: 52, label: 'Area 52', pos: [9, 3, 7],      description: 'Parainsular area (temporinsulare) — giunzione fra lobo temporale e insula, funzioni sensoriali/associative.' }
];



export default {
  LOBES_MODEL_1,
  LOBES_MODEL_2,
  LOBES_MODEL_3,
  SECTION_PLANES,
  SECTION_TO_PART_MAP,
  BROADMANN_POINTS
};


