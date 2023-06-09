import { useState } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import UserProfilePersonalInfo from './UserProfilePersonalInfo';
import UserProfileLocationInfo from './UserProfileLocationInfo';
import UserProfileSecurityInfo from './UserProfileSecurityInfo';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function UserProfileTabs(props) {
    const { userProfileData } = props;
    const [value, setValue] = useState(0);
    console.log(userProfileData);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Personal Info" {...a11yProps(0)} />
                    <Tab label="Location" {...a11yProps(1)} />
                    <Tab label="Security" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <UserProfilePersonalInfo userProfileData={userProfileData} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <UserProfileLocationInfo />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <UserProfileSecurityInfo />
            </TabPanel>
        </Box>
    );
}