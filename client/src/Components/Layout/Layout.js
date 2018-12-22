import React, { Component } from 'react';
import GrommetComponent from './GrommetComponent';
import { grommet } from 'grommet/themes'
import GrommetGrid from './GrommetGrid';
import HeaderBox from './HeaderBox';
import SideNavBox from './SideNavBox';
import SideNavBoxButtons from './SideNavBoxButtons';
import SideNavButton from './SideNavButton';

class Layout extends Component {
    state = {
        sidebar: true,
        grid: {
            rows: ["auto", "flex"],
            columns: ["auto", "flex"],
            areas:
                [
                    { name: "header", start: [0, 0], end: [1, 0] },
                    { name: "sidebar", start: [0, 1], end: [0, 1] },
                    { name: "main", start: [1, 1], end: [1, 1] }
                ]

        },
        HeaderBox:
        {
            gridArea: "header",
            direction: "row",
            align: "center",
            justify: 'between',
            pad: {
                horizontal: 'medium',
                vertical: 'small'
            },
            background: 'dark-1'
        },
        sidebarBox:
        {
            navLinks: ['Home', 'Draft Menu', 'Beer Browser'],
            gridArea: 'sidebar',
            background: 'neutral-3',
            width: 'small',
            animation:
                [
                    { type: 'fadeIn', duration: 500 },
                    { type: 'slideRight', size: 'xlarge', duration: 150 }

                ],
            pad: {
                horizontal: 'medium', vertical: 'small'
            }
        }

    }



    render() {

        const { sidebar } = this.state;
        return (
            <GrommetComponent full theme={grommet}>
                <GrommetGrid
                    fill
                    rows={this.state.grid.rows}
                    columns={this.state.grid.columns}
                    areas={this.state.grid.areas}
                >

                    <HeaderBox
                        gridArea={this.state.HeaderBox.gridArea}
                        direction={this.state.HeaderBox.direction}
                        align={this.state.HeaderBox.align}
                        justify={this.state.HeaderBox.justify}
                        pad={this.state.HeaderBox.pad}
                        background={this.state.HeaderBox.background}
                    >
                        <SideNavButton
                            onClick={() => {
                                console.log('clicked!')
                                this.setState({ sidebar: !sidebar })
                            }}
                        />
                    </HeaderBox>
                    {sidebar && (
                        <SideNavBox
                            gridArea={this.state.sidebarBox.gridArea}
                            background={this.state.sidebarBox.background}
                            width={this.state.sidebarBox.width}
                            animation={this.state.sidebarBox.animation}
                        >
                            {this.state.sidebarBox.navLinks.map(link => (
                                <SideNavBoxButtons
                                    key={link}
                                    href={link.split(' ').join('')}
                                    hoverIndicator
                                    pad={this.state.sidebarBox.pad}
                                    navText={link}
                                >
                                </SideNavBoxButtons>
                            ))}
                        </SideNavBox>
                    )}
                    {/* <MainBox
                        gridArea={this.state.mainBox.gridArea}
                        justify={this.state.mainBox.justify}
                        align={this.state.mainBox.align}>

                        <p>Wheeee!</p>
                    </MainBox> */}
                    {this.props.children}

                </GrommetGrid>

            </GrommetComponent>
        );
    }
}

export default Layout;