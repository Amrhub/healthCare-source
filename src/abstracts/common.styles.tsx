// flex flex-direction  justify-content align-items

// flex direction row
const dfCenterCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const dfCenterUnset = {
  display: 'flex',
  justifyContent: 'center',
};

const dfUnsetCenter = {
  display: 'flex',
  alignItems: 'center',
};

const dfSpaceBetween = {
  display: 'flex',
  justifyContent: 'space-between',
};

// flex direction column
const dfColCenterCenter = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const dfColCenterUnset = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const dfColUnsetCenter = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const dfColSpaceBetween = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

export {
  dfCenterCenter,
  dfCenterUnset,
  dfUnsetCenter,
  dfSpaceBetween,
  dfColCenterCenter,
  dfColCenterUnset,
  dfColUnsetCenter,
  dfColSpaceBetween,
};
