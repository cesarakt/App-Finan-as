import React from 'react';

import { Feather } from '@expo/vector-icons';
import {
    Container,
    Tipo,
    IconView,
    TipoText,
    ValorText
}
    from './styles';

export default function HistoricList({ data }) {
    const renderTipo = data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up';
    const renderTipoText = data.tipo === 'despesa' ? 'despesa' : 'receita';

    return (
        <Container>
            <Tipo>
                <IconView tipo={data.tipo}>
                    <Feather name={renderTipo} color='#FFF' size={20} />
                    <TipoText>{renderTipoText}</TipoText>
                </IconView>
            </Tipo>

            <ValorText>R$ {data.valor}</ValorText>
        </Container>
    );
}