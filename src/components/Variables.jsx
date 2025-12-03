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
  talamo: 'Thalamus.r.001',
  chiasmaOttico: 'Optical_chiasm.l.001',
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

export default {
  LOBES_MODEL_1,
  LOBES_MODEL_2,
  LOBES_MODEL_3,
  SECTION_PLANES,
  SECTION_TO_PART_MAP,
};
