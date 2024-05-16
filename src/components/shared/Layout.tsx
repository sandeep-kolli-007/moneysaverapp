import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import {useTheme} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const Layout = ({title, bottomsheet, children, noPaddingBottomSheet,isBackEnabled}: any) => {
  const {theme} = useTheme();
  const navigation: any = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <View
          style={{
            backgroundColor: theme.colors.primary,
            height: 200,
            width: '100%',
            borderBottomEndRadius: 30,
            borderBottomStartRadius: 30,
          }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 32,
            }}>
            <View style={{display:"flex",flexDirection:"row",alignItems:"center",gap:30}}>
           {isBackEnabled &&   <Icon
                name="chevron-left"
                color={theme.colors.white}
                size={24}
                onPress={() => {
                  navigation?.goBack();
                }}
                style={{marginTop:4}}
              />}
              <Text
                style={{
                  fontFamily: 'roboto',
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: theme.colors.white,
                }}>
                {title}
              </Text>
            </View>
            <Icon 
              name="bell"
              onPress={() => {
                navigation.navigate('notifications');
              }}
              color={theme.colors.white}
              size={18}
            />
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 32,
            position: 'absolute',
            marginTop: 80,
            width: '100%',
            height: '100%',
            paddingBottom: 120,
          }}>
          <ScrollView>{children}</ScrollView>
        </View>
        {/* bottom sheet */}
        {bottomsheet && (
          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.white,
              marginTop: -120,
              borderTopEndRadius: 40,
              borderTopStartRadius: 40,
              padding: noPaddingBottomSheet ? 0 : 32,
            }}>
            {bottomsheet}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Layout;
