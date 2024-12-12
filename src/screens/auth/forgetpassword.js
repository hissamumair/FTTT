import {StyleSheet, View, StatusBar} from "react-native";
import React, {useState} from "react";
import {
  TextInput,
  Button,
  useTheme,
  Portal,
  Dialog,
  Text,
  Paragraph,
} from "react-native-paper";
import {useForgotPasswordMutation} from "../../redux/reducers/user/userThunk";

const ForgotPassword = ({navigation}) => {
  const regex =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [isDisabled, setDisibility] = useState(true);

  const checkEmail = e => {
    setDisibility(!regex.test(e));
    setEmail(e);
  };

  const [forgotPassword, {isLoading, isError, error}] =
    useForgotPasswordMutation();
  const sendEmail = () => {
    setDisibility(true);
    forgotPassword({email:email}).then((res)=>{
      console.log("res", )
      if(res?.data?.message==="OTP has been sent to your email"){
        navigation.navigate("OTPScreen", {email:email});
      }
    })
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}>
      <View style={{paddingVertical: "5%", paddingHorizontal: "4%",marginTop:40}}>
        <TextInput
          label="Enter your Email"
          mode="outlined"
          value={email}
          activeOutlineColor={theme.colors.secondary}
          onChangeText={e => checkEmail(e)}
        />

        <Button
          icon="email-send"
          mode="contained"
          disabled={isDisabled}
          // loading={isLoading}
          style={{marginTop: 20}}
          contentStyle={{padding: "3%"}}
          theme={{roundness: 1}}
          onPress={sendEmail}>
          {"Continue"}
        </Button>
      </View>
    </View>
  );
};

export default ForgotPassword;
