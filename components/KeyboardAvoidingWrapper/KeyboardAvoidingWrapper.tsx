import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';

type KeyboardAvoidingWrapperProps = KeyboardAwareScrollViewProps & {
  children: ReactNode | ReactNode[];
  extraScrollHeight?: number;
};

const KeyboardAvoidingWrapper = ({
  children,
  extraScrollHeight = 20,
  ...props
}: KeyboardAvoidingWrapperProps) => {
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      keyboardShouldPersistTaps="handled"
      keyboardOpeningTime={250}
      extraScrollHeight={extraScrollHeight}
      {...props}
    >
      <View style={{ flex: 1 }}>{children}</View>
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAvoidingWrapper;
