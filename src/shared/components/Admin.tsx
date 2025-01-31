import * as React from 'react';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Grid, Box, Avatar } from '@mui/material';
import './styles/admin.css';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import CurrentGame from './adminTabs/CurrentGame';
import Questions from './adminTabs/Questions/Questions';
import AddAnswers from './adminTabs/Answers/AddAnswers';
import Teams from './adminTabs/Teams/TeamsTab';
import FlashRoundAdmin from './adminTabs/FlashRound/FlashRoundAdmin';
import GamesManagement from './adminTabs/Games/GamesManagement';
import convert from '../../helpers/csv-convertor.helper';

const loginEmail = 'osut@osut.ro';
const loginPassword = 'ce-spun-studentii-23';

const Admin = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentTab, changeCurrentTab] = useState(0);

  const handleLogin = () => {
    if (email === loginEmail && password === loginPassword) {
      setLoggedIn(true);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    changeCurrentTab(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 5,
          }}
        >
          <Avatar alt="OSUT" sx={{ width: 48, height: 48 }} />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Email"
                type={'email'}
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="standard-basic"
                label="Password"
                type={'password'}
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                className="login-button"
                variant="contained"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          style={{ backgroundColor: 'white' }}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          <Tab label="Joc curent" id={'1'} />
          <Tab label="Adaugare intrebari" id={'2'} />
          <Tab label="Adaugare raspunsuri" id={'3'} />
          <Tab label="Modifica echipe" id={'4'} />
          <Tab label="Runda fulger" id={'5'} />
          <Tab label="Manageriere jocuri" id={'6'} />
        </Tabs>
      </Box>
      <TabPanel value={currentTab} index={0}>
        <CurrentGame />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        <Questions />
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        <AddAnswers />
      </TabPanel>
      <TabPanel value={currentTab} index={3}>
        <Teams />
      </TabPanel>
      <TabPanel value={currentTab} index={4}>
        <FlashRoundAdmin />
      </TabPanel>
      <TabPanel value={currentTab} index={5}>
        <GamesManagement />
      </TabPanel>
    </Box>
  );
};

export default Admin;
