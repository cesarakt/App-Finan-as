import React from "react";

import { Picker as RNPickerSelect } from '@react-native-picker/picker';
import { PickerView } from './styles';

export default function Picker({ onChange, tipo }) {
    const changevalue = valor => onChange(valor);

    return (
        <PickerView>
            <RNPickerSelect
                style={{
                    width: '100%'
                }}
                selectedValue={tipo}
                onValueChange={changevalue}
            >
                <RNPickerSelect.Item label='Receita' value='receita' />
                <RNPickerSelect.Item label='Despesa' value='despesa' />
            </RNPickerSelect>
        </PickerView>
    )
}