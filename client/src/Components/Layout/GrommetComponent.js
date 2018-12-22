import React, { Component } from 'react';
import { Grommet } from "grommet";
// import {grommet} from "grommet/themes";

const GrommetComponent = ({ theme, children }) => {
    return (
        <Grommet full theme={theme}>
            {children}
        </Grommet>
    );
}

export default GrommetComponent;