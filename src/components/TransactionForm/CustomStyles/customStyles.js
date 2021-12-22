const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected || state.isFocused ? '#FF6596' : '#000000',
    backgroundColor:
      state.isSelected || state.isFocused ? '#FFFFFF' : 'inherit',
    paddingLeft: 20,
    paddingTop: 10,
    height: 44,
    border: 'none',
    cursor: 'pointer',
  }),
  control: () => ({
    '@media screen and (min-width: 320px)': {
      width: '100%',
    },
    // '@media screen and (min-width: 768px)': {
    //   width: 542,
    // },
    height: 34,
  }),

  valueContainer: provided => ({
    ...provided,
    paddingTop: 0,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    height: 34,
  }),

  singleValue: provided => ({
    ...provided,
    margin: 0,
    height: 24,
    fontFamily: 'Circe, sans-serif',
    color: '#000000',
    fontSize: 18,
    lineHeight: 1.5,
  }),

  input: provided => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),

  indicatorsContainer: () => ({
    display: 'none',
  }),

  menu: provided => ({
    ...provided,
    backgroundColor: 'inherit',
    borderRadius: 20,
    boxShadow: 'none',
  }),

  placeholder: provided => ({
    ...provided,
    margin: 0,
    fontFamily: 'Circe, sans-serif',
    color: '#bdbdbd',
    fontSize: 18,
    lineHeight: 1.5,
    fontWeight: 400,
  }),

  menuList: provided => ({
    ...provided,
    '@media screen and (min-width: 320px)': {
      maxHeight: 352,
    },
    // '@media screen and (min-width: 768px)': {
    //   maxHeight: 411,
    // },
    padding: 0,
    backdropFilter: 'blur(50px)',
    borderRadius: 20,
    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
    fontSize: 18,
    lineHeight: 1.5,
    fontWeight: 400,

    '::-webkit-scrollbar': {
      height: '100%',
      width: 5,
      backgroundColor: 'transparent',
    },

    '::-webkit-scrollbar-track-piece:corner-present': {
      marginTop: 12,
    },
    '::-webkit-scrollbar-track-piece:start': {
      background: 'transparent',
      marginTop: 10,
      overflow: 'hidden',
    },

    '::-webkit-scrollbar-track-piece:end': {
      backgroundColor: 'transparent',
      marginBottom: 10,
    },
    '::-webkit-scrollbar-thumb': {
      borderRadius: 10,
      //   backgroundColor: '#FF6596',
      backgroundColor: '#24CCA7',
    },
    '::-webkit-scrollbar-track': {
      borderRadius: 20,
      backgroundColor: 'transparent',
    },
  }),

  container: provided => ({
    ...provided,
    borderBottom: '1px solid #E0E0E0',
    cursor: 'pointer',

    // '&:hover': {
    //   borderColor: '#24CCA7',
    // },
    // '&:focus': {
    //   borderColor: '#24CCA7',
    // },
  }),
};

export default customStyles;
