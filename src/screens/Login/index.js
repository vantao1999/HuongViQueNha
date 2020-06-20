/* eslint-disable react-native/no-inline-styles */
import React, {useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {useFormik} from 'formik';
import {NavigationUtils} from '../../navigation';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/AuthRedux/operations';
import Icon from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';

const TEXT_INPUT_EMAIL = 'TEXT_INPUT_EMAIL';
const TEXT_INPUT_PASSWORD = 'TEXT_INPUT_PASSWORD';

const Login = () => {
  const dispatch = useDispatch();

  const [data, setData] = React.useState({
    secureTextEntry: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  let emailRef = useRef(null);
  let passRef = useRef(null);

  const navigateScreen = (screen) => {
    NavigationUtils.push({
      screen,
      isTopBarEnable: screen !== 'Register',
      passProps: {},
    });
  };
  const onSubmitEditing = (field) => {
    if (field === TEXT_INPUT_EMAIL) {
      passRef.current?.focus();
    }
    if (field === TEXT_INPUT_PASSWORD) {
      passRef.current?.blur();
    }
  };
  const formik = useFormik({
    initialValues: {
      email: 'vantao.dev@gmail.com',
      password: '123456',
    },

    onSubmit: (values) => {
      handleLogin(values);
    },
  });
  const handleLogin = async ({email, password}) => {
    Keyboard.dismiss();
    const result = await dispatch(login({email, password}));
    console.log('Log Success', login.fulfilled);

    if (login.fulfilled.match(result)) {
      NavigationUtils.startMainContent();
    } else {
      if (result.payload) {
        Alert.alert('Error', result.payload.message || 'error');
      } else {
        Alert.alert('Error', result.error || 'error');
      }
    }
  };
  console.log('error', formik.errors);

  return (
    <SafeAreaView
      behavior="padding"
      keyboardVerticalOffset={20}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.text_header}>Hương Vị Quê Nhà</Text>
      </View>

      <Animatable.View
        style={styles.footer}
        animation="fadeInUp"
        duration={500}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text_footer}>Nhập SDT</Text>
          <View style={styles.action}>
            <Icon name="md-mail" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              type="email"
              ref={emailRef}
              defaultValue={formik.values.email}
              placeholder="Nhập số điện thoại"
              onChangeText={formik.handleChange('email')}
              onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_EMAIL)}
              // errorMessage={formik.errors.email}
              returnKeyType="next"
            />
          </View>

          <Text style={[styles.text_footer, {marginTop: 20}]}>
            Nhập Mật Khẩu
          </Text>
          <View style={styles.action}>
            <Icon name="md-lock" color="#05375a" size={20} />
            <TextInput
              style={styles.textInput}
              ref={passRef}
              defaultValue={formik.values.password}
              placeholder="Nhập mật khẩu"
              onChangeText={formik.handleChange('password')}
              onSubmitEditing={() => onSubmitEditing(TEXT_INPUT_PASSWORD)}
              secureTextEntry={data.secureTextEntry ? true : false}
              // errorMessage={formik.errors.password}
              returnKeyType="go"
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Icon name="ios-eye-off" color="#05375a" size={20} />
              ) : (
                <Icon name="ios-eye" color="#05375a" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.btnForgot}
            onPress={() => {
              NavigationUtils.push({
                screen: 'ForgetPassword',
                isTopBarEnable: false,
              });
            }}
          >
            <Text style={styles.textForgot}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <TouchableOpacity onPress={formik.handleSubmit}>
              <LinearGradient
                colors={['#56aaff', '#56a']}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Đăng Nhập</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigateScreen('Register')}
              style={styles.signUp}
            >
              <Text style={[styles.textSign, {color: '#56aaff'}]}>Đăng Ký</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </SafeAreaView>
  );
};
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#56aaff',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  text_header: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    paddingVertical: 5,
    color: '#05375a',
  },
  button: {
    marginTop: 30,
  },
  signIn: {
    width: '100%',
    fontFamily: 'Roboto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 20,
  },
  signUp: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    marginTop: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textForgot: {
    fontSize: 14,
    textDecorationLine: 'underline',
    marginVertical: 10,
    color: '#56aaff',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
