import {
    Platform,
    Animated,
    Image,
    SafeAreaView,
    View,
    StyleSheet,
    Alert,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
  import {
    Button,
    Portal,
    Text,
    Dialog,
    Paragraph,
    useTheme,
  } from 'react-native-paper';
import { useVerifyOTPMutation } from '../../redux/reducers/user/userThunk';
  
  export const CELL_SIZE = 50;
  export const CELL_BORDER_RADIUS = 8;
  export const DEFAULT_CELL_BG_COLOR = '#fff';
  // export const NOT_EMPTY_CELL_BG_COLOR = '#3557b7';
  export const NOT_EMPTY_CELL_BG_COLOR = '#fff';
  export const ACTIVE_CELL_BG_COLOR = '#d8dce3';
  
  const {Value, Text: AnimatedText} = Animated;
  
  const OTPScreen = ({navigation, route}) => {
    const theme = useTheme();
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  
    const [visible, setVisible] = useState(false);
    const [isDisabled, setDisibility] = useState(true);
    const [message, setMessage] = useState('Something went wrong');
  
    const [verifyOTP, {isLoading}] = useVerifyOTPMutation()
    const verify = () => {
      setDisibility(true);

      verifyOTP({email:route.params?.email,otp:value }).then((res)=>{
        if(res?.data?.message ==="OTP verified successfully"){
              navigation.navigate('ResetPassword', {resetToken:res?.data?.resetToken});
        }else{
            Alert.alert("Something went wrong. Try again")
        }
        console.log("object",res)
      })
    };
  
    useEffect(() => {
      if (value.length === 6) {
        setDisibility(false);
      } else {
        setDisibility(true);
      }
    }, [value]);
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
  
    const renderCell = ({index, symbol, isFocused}) => {
      const hasValue = Boolean(symbol);
      const animatedCellStyle = {
        backgroundColor: hasValue
          ? animationsScale[index].interpolate({
              inputRange: [0, 1],
              outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
            })
          : animationsColor[index].interpolate({
              inputRange: [0, 1],
              outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
            }),
        borderRadius: animationsScale[index].interpolate({
          inputRange: [0, 1],
          outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
        }),
      };
  
      setTimeout(() => {
        animateCell({hasValue, index, isFocused});
      }, 0);
  
      return (
        <AnimatedText
          key={index}
          secureTextEntry={false}
          style={[styles.cell, animatedCellStyle]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : null)}
        </AnimatedText>
      );
    };
  
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View style={{padding: '4%'}}>
          {/* <Image
            style={{
              width: 227 / 2.4,
              height: 190 / 2,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '5%',
            }}
            source={require('../../assets/splash-screen/carib-coin-logo.png')}
          /> */}
          <Text style={styles.subTitle}>
            {'Please enter the verification code we send to'}{' '}
            {route?.params?.phoneNumber}
          </Text>
  
          {/* <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={{
              height: CELL_SIZE,
              marginTop: 30,
              paddingHorizontal: 20,
              justifyContent: 'center',
            }}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={renderCell}
          /> */}
          
          <CodeField
  ref={ref}
  {...props}
  value={value}
  onChangeText={setValue}
  cellCount={CELL_COUNT}
  rootStyle={{
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  }}
  keyboardType="number-pad"
  textContentType="oneTimeCode"
  renderCell={renderCell}
/>
  
             <Button
              disabled={isDisabled}
              style={{
                // backgroundColor: 'transparent',
                margin:20,
              }}
              contentStyle={{padding: '3%'}}
              theme={{roundness: 10}}
              mode="contained"
              onPress={verify}>
              {'Verify'}
            </Button>
  
          <View
            style={{
              // flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              {"Didn't receive code?"}
            </Text>
          </View>
          <View
            style={{
              marginTop: '3%',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
        
            <Button mode="text" onPress={() => navigation.goBack()}>
              {"Request again"}
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  const CELL_COUNT = 6;
  
  const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
  const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
  
  const animateCell = ({hasValue, index, isFocused}) => {
    Animated.parallel([
      Animated.timing(animationsColor[index], {
        useNativeDriver: false,
        toValue: isFocused ? 1 : 0,
        duration: 250,
      }),
      Animated.spring(animationsScale[index], {
        useNativeDriver: false,
        toValue: hasValue ? 0 : 1,
        duration: hasValue ? 300 : 250,
      }),
    ]).start();
  };
  
  const styles = StyleSheet.create({
    cell: {
      marginHorizontal: 8,
      height: CELL_SIZE,
      width: CELL_SIZE,
      lineHeight: CELL_SIZE - 5,
      ...Platform.select({web: {lineHeight: 65}}),
      fontSize: 30,
      textAlign: 'center',
      borderRadius: CELL_BORDER_RADIUS,
      color: '#665a6f',
      backgroundColor: '#fff',
  
      // IOS
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
  
      // Android
      elevation: 3,
    },
  
    subTitle: {
      paddingTop: 30,
      // color: '#000',
      textAlign: 'center',
    },
  });
  
  export default OTPScreen;
  