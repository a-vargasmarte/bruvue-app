import React from 'react';
import { Button, Box, Text } from 'grommet';

const SideNavBoxButtons = ({ href, pad, navText }) => {
    return (
        <Button
            href={href}
            hoverindicator
        >
            <Box
                pad={pad}>
                <Text>{navText}</Text>
            </Box>

        </Button>
    );
}

export default SideNavBoxButtons;