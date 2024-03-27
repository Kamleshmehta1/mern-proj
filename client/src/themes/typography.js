import { pxToRem } from '../utils/pxToRem';

const FONT_FAMILY = 'Poppins,sans-serif !important';

const typography = {
  fontFamily: FONT_FAMILY,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  h2: {
    fontWeight: 600,
    lineHeight: 64 / 48,
    fontSize: pxToRem(32),
  },
  h4: {
    fontWeight: 600,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
  },
  subtitle1: {
    fontWeight: 500,
    lineHeight: 1.5,
    fontSize: pxToRem(14),
  },
};

export default typography;
