import React from 'react';
import { Box } from 'grommet';

const HeaderBox = ({ gridArea, direction, align, justify, pad, background, children }) => {
    return (
        <Box
            gridArea={gridArea}
            direction={direction}
            align={align}
            justify={justify}
            pad={pad}
            background={background}
        >

            {children}

        </Box>
    );
}

export default HeaderBox;