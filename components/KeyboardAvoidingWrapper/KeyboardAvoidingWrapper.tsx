import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyboardAvoidingWrapper = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="handled"
	  enableAutomaticScroll={true}
    >
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAvoidingWrapper;
