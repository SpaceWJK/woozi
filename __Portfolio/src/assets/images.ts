const base = import.meta.env.BASE_URL;

export const IMAGES = {
  BRUTALIST_DESIGN_SAMPLE_20260128_124200_6: `${base}images/brutalist_design_sample_20260128_124200.png`,
  CYBERPUNK_DESIGN_SAMPLE_20260128_124148_3: `${base}images/cyberpunk_design_sample_20260128_124148.png`,
  GLASSMORPHISM_DESIGN_SAMPLE_20260128_124148_2: `${base}images/glassmorphism_design_sample_20260128_124148.png`,
  GRADIENT_DESIGN_SAMPLE_20260128_124147_4: `${base}images/gradient_design_sample_20260128_124147.png`,
  IMG_3240_9: `${base}images/스크린샷3240.png`,
  IMG_5216_7: `${base}images/스크린샷5216.png`,
  IMG_6272_8: `${base}images/스크린샷6272.png`,
  NEUMORPHISM_DESIGN_SAMPLE_20260128_124147_5: `${base}images/neumorphism_design_sample_20260128_124147.png`,
  WJKPS_1: `${base}images/WJKPS.png`,
} as const;

export type ImageKey = keyof typeof IMAGES;
