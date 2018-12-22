import React from 'react';
import { Box } from 'grommet';

const SideNavBox = ({ gridArea, background, width, animation, children }) => {
    return (
        <Box
            gridArea={gridArea}
            background={background}
            width={width}
            animation={animation}
        >
            {children}
        </Box>
    );
}

export default SideNavBox;