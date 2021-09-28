import React, { useState } from 'react';
import { Platform, TouchableOpacity, Text } from 'react-native';

import { Container, Header } from './styles';
import DateTimerPicker from '@react-native-community/datetimepicker';

export default function DatePicker({ onChange, date, onClose }) {
    const [dateNow, setDateNow] = useState(new Date(date));

    const closeIosPicker = Platform.OS === 'ios' && (
        <Header>
            <TouchableOpacity onPress={onClose}>
                <Text>Fechar</Text>
            </TouchableOpacity>
        </Header>
    )

    function changeDate(event, date) {
        const currentDate = date || dateNow;
        setDateNow(currentDate);
        onChange(currentDate);
    }

    return (
        <Container>
            {closeIosPicker}
            <DateTimerPicker
                value={dateNow}
                mode='date'
                display='default'
                onChange={changeDate}
                style={{ backgroundColor: '#FFF' }}
            />
        </Container>
    );
}