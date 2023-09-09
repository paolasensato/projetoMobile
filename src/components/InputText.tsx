import * as React from 'react';
import {View} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';

type Props = React.ComponentProps<typeof TextInput> & {textError?: string};

const InputText = ({textError, ...props}: Props) => {
  return (
    <View>
      <TextInput {...props} />
      <HelperText type="error" visible={props.error}>
        {textError}
      </HelperText>
    </View>
  );
};

export default InputText;
