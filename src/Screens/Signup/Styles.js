import { StyleSheet } from 'react-native';
import { w, h, moderateScale } from '../../Dimenstions/Metrices.js';



const styles = StyleSheet.create({



  PasswordStrength: {
    marginTop: h(10),
    flexDirection: "column",
    alignItems: "center",
  },
  StrengthIndicator: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: w(260),
    marginTop: h(5),
  },
  StrengthText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  StrengthValid: {
    color: "green",
  },
  StrengthInvalid: {
    color: "red",
  },
  label: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',


  },


  value: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',


  },



  ProfilePic: {
    width: w(130),
    height: undefined,
    aspectRatio: 1,
    marginTop: h(10),
    resizeMode: "contain",
    alignSelf: 'center',
    borderRadius: h(70),
    borderWidth: 3,
    borderColor: 'black',

  },


  Alert: {

    backgroundColor: 'black',

  },



  Picker: {
    height: h(50),
    width: w(350),
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: h(10),

  },

  badgeStyles: {
    // height: h(45),
    width: w(350),
    alignSelf: 'center',
    backgroundColor: 'white',
    // marginTop: h(10),
    opacity: .8,

  },

  actionSheetContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Replace this with your desired background color
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },

  WelcomeCard: {
    // flexDirection: 'row',
    // backgroundColor: '#1c1105',
    borderRadius: 20,
    borderColor: 'white',
    marginTop: h(10),
    width: w(300),
    height: h(70),
    justifyContent: 'center',
    alignSelf: 'center',
    opacity: .8,

  },

  WelcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'gold',
    alignSelf: 'center',
    fontFamily: 'serif',
    fontStyle: 'italic',
    // textShadowColor: 'black',
    // textShadowRadius: 20,
    opacity: 1,


  },

  WelcomeName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'gold',
    // textShadowColor: 'black',
    // textShadowRadius: 20,
    alignSelf: 'center',
    fontFamily: 'serif',
    fontStyle: 'italic',
    // opacity: 1,
    marginBottom: 15,

  },


  Gif: {
    width: w(360),
    marginTop: h(10),
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    alignSelf: 'center',
    // marginBottom: h(5),
    borderRadius: h(50),
    alignContent: 'center',

  },



  GifSafe: {
    width: w(360),
    // marginTop: h(5),
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    alignSelf: 'center',
    // marginBottom: h(5),
    borderRadius: h(50),
    alignContent: 'center',

  },

  Logo: {
    width: w(160),
    height: undefined,
    aspectRatio: 2,
    resizeMode: "contain",
    marginTop: h(10),
    paddingBottom: h(10),
    marginBottom: h(20),
    // alignSelf: 'center',
    marginLeft: w(10),

  },


  LogoStartUp: {
    width: w(250),
    height: undefined,
    aspectRatio: 2,
    resizeMode: "contain",
    marginTop: h(10),
    alignSelf: 'center',
    marginLeft: w(10),
  },

  Mylogo: {
    marginTop: h(50),
    width: w(180),
    height: undefined,
    aspectRatio: 1,
    resizeMode: "center",
    // verticalAlign: 'flex-end',
    alignSelf: 'center',
    // alignItems: 'flex-start',
    // verticalAlign: 'top',
    // marginTop: h(10),
    // alignSelf: 'center',
    // marginLeft: w(10),
  },

  MylogoSignup: {
    // marginTop: h(50),
    width: w(120),
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    alignSelf: 'center',
    // alignItems: 'flex-start',
    // verticalAlign: 'top',
    // marginTop: h(10),
    // alignSelf: 'center',
    // marginLeft: w(10),
  },



  CompaniesLogos: {
    width: "90%",
    height: '30%',
    // aspectRatio: 1,
    resizeMode: "contain",
    alignSelf :'center'

  },

  TritonLogo: {
    width: w(100),
    marginTop: h(18),
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },

  MHDLogo: {
    width: w(80),
    height: undefined,
    aspectRatio: 0.8,
    resizeMode: "contain",
    marginLeft: w(28),

  },
  IntegraLogo: {
    width: w(110),
    // marginTop: h(18),
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    paddingLeft: w(20),
  },


  Header: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'serif',
    marginTop: h(10),
    color: 'gold',
    padding: h(0),
    fontSize: 25,
    fontStyle: 'italic',
    opacity: 1,
    width: w(300),
    textAlign: 'center',

  },
  HeaderStartUp: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily: 'serif',
    marginTop: h(10),
    color: 'white',
    borderRadius: 20,
    backgroundColor: '#1c1105',
    padding: h(10),
    fontSize: 18,
    fontStyle: 'italic',
    opacity: 1,
    width: w(300),
    textAlign: 'center',

  },

  TextInput: {
    alignSelf: 'center',
    height: h(45),
    // color: 'black',
    width: w(350),
    borderColor: 'white',
    backgroundColor: 'white',
    // borderWidth: 1.5,
    borderRadius: 10,
    marginTop: h(10),
    paddingHorizontal: w(10),
  },


  Text: {
    marginTop: h(30),
    backgroundColor: '#1c1105',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    borderColor: 'white',
    width: w(110),
    marginLeft: w(10),
    borderWidth: w(1),
    borderRadius: 10,
    marginTop: h(20),
    paddingHorizontal: w(20),
  },

  TextValue: {
    marginTop: h(20),
    backgroundColor: '#795809',
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    borderColor: 'white',
    width: w(110),
    marginLeft: w(10),
    borderWidth: w(1),
    borderRadius: 10,
    marginTop: h(10),
    // paddingHorizontal: w(10),
  },


  HeaderAlt: {
    paddingTop: h(40),
    alignSelf: 'center',
    color: 'gold',
    fontFamily: 'serif',
    fontWeight: 'bold',

  },

  Address: {
    alignSelf: 'center',
    color: 'black',
    width: w(350),
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: h(10),
    paddingHorizontal: w(10),
    textAlignVertical: 'top',
    height: h(70)
  },

  errorMes: {
    paddingTop: h(5),
    color: 'white',
    fontSize: 14,
    marginHorizontal: 10,
    textShadowColor: 'black',
    paddingHorizontal: w(10),
  },
  NamesView: {
    marginTop: h(20),
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: w(10)
  },
  Names: {
    alignSelf: 'flex-start',
    color: 'black',
    width: w(167),
    fontWeight: 'bold',
    borderColor: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: h(10),
    paddingHorizontal: w(10),
    marginHorizontal: w(8),

  },

  Check: {
    marginTop: h(10),
    flexDirection: 'row',
    marginHorizontal: w(12),
    paddingHorizontal: w(5),
    justifyContent: 'center',
    paddingRight: w(210),
    paddingLeft: w(10),
  },

  Background: {
    resizeMode: 'cover',
    flex: 1,


  },

  buttonLogin: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    paddingVertical: h(10),
    width: w(175),
    alignSelf: 'center',
    marginBottom: h(10),

  },

  buttonSignup: {
    backgroundColor: '#B8621B',
    borderRadius: 25,
    paddingVertical: h(10),
    width: w(150),
    alignSelf: 'center',
    marginBottom: h(10),

  },

  LoginSignup: {
    backgroundColor: '#ffd900',
    borderRadius: 25,
    paddingVertical: h(10),
    width: w(150),
    alignSelf: 'center',
    marginBottom: h(10),

  },



  buttonText: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold'


  },


  checkbox: {
    alignSelf: 'center',
  },



  Iconstyle: {
    // position: 'relative',
    color: 'black',
    height: h(45),
    backgroundColor: 'white',
    marginTop: h(10),
    borderBottomRightRadius: h(10),
    width: w(40),
    // marginRight: w(0),
    borderTopRightRadius: h(10),
    justifyContent: 'center',
    paddingTop: h(15),
    paddingLeft: w(10),





  },


  IconView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  scrollView: {
    marginHorizontal: .5,
  },
  inputIcon: {
    width: w(300),
    marginTop: 0
  },

  HomeButtons: {
    paddingTop: h(20),
    height: h(150),
    alignContent: 'space-between',
    marginTop: h(20),
    // flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  backgroundVideo: {
    paddingTop: h(20),
    height: h(600),
    width: w(350),
    borderWidth: 2,
    alignSelf: 'center',
    borderRadius: 10,
    paddingBottom: h(20),
    borderColor: 'white',
    alignItems: 'center',
  },

  Forgetpasswrod: {
    color: '#ff6f0f',
    fontSize: 15,
    alignSelf: 'center',
    marginTop: h(10),
    fontWeight: 'bold',
    marginBottom: h(10),

  },


  StartupButtons: {
    // paddingTop: h(20),
    height: h(40),
    width: w(300),
    borderWidth: 2,
    alignSelf: 'center',
    borderRadius: 10,
    // paddingBottom: h(20),
    // borderColor: 'white',
    alignItems: 'center',
    verticalAlign: 'center',
    backgroundColor: '#1c1105',
  },
  StartupButtonsText: {
    color: 'black',
    fontSize: 20,
    alignItems: 'center',
    backgroundColor: '#a57e1e',
    height: h(50),
    width: w(250),
    paddingTop: h(11),
    textAlign: 'center',
    alignSelf: 'center',
    // marginTop: h(20),
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    fontStyle: 'normal',
    fontWeight: 'bold',
    // borderColor: 'gold',
    // borderRightWidth: 2,

  },


  IconstyleBar: {
    // marginLeft: w(18),
    paddingTop: h(14),
    paddingLeft: h(15),
    alignSelf: 'center',
    color: 'black',
    height: h(50),
    width: w(40),
    // marginTop: h(20),
    backgroundColor: '#a57e1e',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    // borderLeftWidth: 2,
    // borderColor: 'gold',
  },

  StartUpbarView: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  LoginButtonsText: {
    color: 'white',
    fontSize: 18,
    alignItems: 'center',
    backgroundColor: '#a57e1e',
    height: h(40),
    width: w(200),
    marginTop: h(15),
    paddingTop: h(5),
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  LoginResetButtonsText: {
    color: 'black',
    fontSize: 18,
    alignItems: 'center',
    backgroundColor: '#ff6f0f',
    height: h(40),
    width: w(200),
    paddingTop: h(6),
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: h(100),
  },

  HomeButton: {
    color: 'white',
    fontSize: 18,
    // alignItems: 'flex-end',
    backgroundColor: '#242526',
    height: h(45),
    width: w(150),
    paddingTop: h(5),
    textAlign: 'center',
    alignSelf: 'center',
    borderBottomRightRadius: w(10),
    borderBottomLeftRadius: w(10),
  },

  HomeButtonfade: {
    color: 'rgba(100, 100, 100, 0.5)',
    fontSize: 18,
    // alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Replace this with your desired background color
    height: h(45),
    width: w(150),
    // paddingTop: h(2),
    textAlign: 'center',
    alignSelf: 'center',
    borderBottomRightRadius: w(10),
    borderBottomLeftRadius: w(10),
  },
  IconstyleHomefade: {
    alignSelf: 'center',
    paddingTop: h(7),
    paddingLeft: h(53),
    alignSelf: 'center',
    color: 'rgba(100, 100, 100, 0.5)',
    height: h(70),
    width: w(150),
    borderTopLeftRadius: w(10),
    borderTopRightRadius: w(10),
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Replace this with your desired background color

  },

  IconstyleHome: {
    alignSelf: 'center',
    paddingTop: h(7),
    paddingLeft: h(53),
    alignSelf: 'center',
    color: 'white',
    height: h(65),
    width: w(150),
    borderTopLeftRadius: w(10),
    borderTopRightRadius: w(10),
    backgroundColor: '#242526',
  },

  Videocontainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  video: {
    width: '100%',
    height: 300, // Adjust the height as needed
  },




  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    margin: 10,
    color: 'gold',
  },

  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  legendIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 14,
  },

  seriesLabelContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  seriesLabel: {
    fontSize: 16,
    marginBottom: 5,
  },

  table: {
    marginTop: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '80%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  tableCellLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
  },
  tableCellValue: {
    fontSize: 16,
    color: 'black',
    marginLeft: 40,
  },


  tableCellColorIndicator: {
    width: 20,
    height: 20,
    // marginRight: 0,
    borderRadius: 10,
  },

  tableCellPercentage: {
    color: 'black',
    marginLeft: 60,

  },

  subtitle: {
    fontSize: 15,
    alignSelf: 'center',
    color: 'white',
  },

  toggleButtonText: {
    color: '#64CCC5',
    fontSize: 14,
    alignSelf: 'center',
    // paddingTop: 10,
  },

  Tablecontainer: { flex: 1, padding: 16, paddingTop: 1, },
  head: { height: 40, backgroundColor: 'black' },
  wrapper: { flexDirection: 'row' },
  Tabletitle: { flex: 1, backgroundColor: 'black' },
  row: { height: 28, backgroundColor: 'gray' },
  Tabletext: { textAlign: 'center', color: 'white' },
  TextColumn: { textAlign: 'center', color: 'black', fontWeight: 'bold' },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 10,
    marginBottom: 4,
    alignSelf: 'center',
  },


  colorLegendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  colorLegendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  colorIndicator: {
    width: 15,
    height: 15,
    borderRadius: 8,
    marginRight: 5,
  },
  colorLegendLabel: {
    fontSize: 14,
    color: 'white',
  },

  SignatureBesho: {
    color: '#fdff92',
    alignSelf: 'center'

  },

  SignatureHesham: {
    color: '#fdff92',
    alignSelf: 'center'


  },

  ProjectsSummary: {
    color: 'gold',
    fontSize: 20,
    fontFamily: 'serif',
    alignSelf: 'center',
    marginBottom: h(10),
    marginTop: h(12)
  },




  MasterDataButtonText: {
    color: 'gold',
    fontSize: 18,
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth: 10,
    // width:"80%",
    alignSelf: 'center',
    alignItems: 'center',
  },

  MasterDataButton: {
    color: 'gold',
    fontSize: 20,
    alignItems: 'center',
    backgroundColor: '#00000d',
    height: h(50),
    width: w(250),
    paddingTop: h(11),
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: h(20),
    fontStyle: 'normal',
    fontWeight: 'bold',
    borderRadius: 10,
    borderColor: 'gold',
    borderWidth: 1
  },


});
export default styles;  