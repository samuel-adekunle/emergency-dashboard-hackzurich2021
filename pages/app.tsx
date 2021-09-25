import { Grid, Typography, Stack, Card, CardContent, 
         CardHeader, Divider } from '@mui/material'
import type { NextPage } from 'next'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, getAdditionalUserInfo } from "firebase/auth";
import { getDatabase, set, ref, onValue, child, get } from "firebase/database";
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { Box } from '@mui/system';
import Head from "next/head";
import Constants from "../lib/constants";
import { useRouter } from 'next/router';
import EmergencyContactComponent from "../components/EmergencyContactComponent";
import NavigationBar from "../components/navigationBar";
import UserInfoComponent from "../components/UserInfoComponent";
import AudioEmergencyComponent from "../components/AudioEmergencyComponent";
import VideoEmergencyComponent from "../components/VideoEmergencyComponent"
// import TimeSeriesComponent from '../components/TimeSeriesComponent';

interface LoaderProps {
    loading: boolean
}

const Loader = ({ loading }: LoaderProps) => {
    return (
        <Grid container justifyContent="center" alignItems="center" sx={{
            height: "100vh",
            display: loading ? "flex" : "none"
        }}>
            <PulseLoader loading={loading} />
        </Grid>
    )
}

const App: NextPage = () => {
    const auth = getAuth();
    const router = useRouter();
    const db = getDatabase();

    const [loading, setLoading] = useState(true);

    const [emergencyContacts, setEmergencyContacts] = useState([]);

    useEffect(() => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            signInWithEmailLink(auth, email!, window.location.href)
                .then((result) => {
                    window.localStorage.removeItem('emailForSignIn');
                    const additionalInfo = getAdditionalUserInfo(result)
                    if (additionalInfo?.isNewUser) {
                        set(ref(db, "users/"), {
                            [result.user.uid]: {
                                "identity": {
                                    "emailAddress": result.user.email
                                }
                            }
                        })
                            .catch((error) => console.error(error))
                    }
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error)
                    window.alert("Something went wrong, please try signing in again in a few minutes")
                    router.replace("/")
                });
        } else if (auth.currentUser) {
            setLoading(false)
        } else {
            window.alert("You need to sign in to access this page")
            router.replace("/")
        }
    }, [])

    useEffect(() => {
        if (!loading) {
            const emergencyContactsRef = ref(db, `users/${auth.currentUser?.uid}/emergencyContacts`);
            onValue(emergencyContactsRef, (snapshot) => {
               console.log(snapshot.val())
               setEmergencyContacts(snapshot.val());
            })

            //const dbRef = ref(db);
            //get(child(dbRef, `users/${auth.currentUser?.uid}/emergencyContacts`)).then((snapshot) => {
            //   if (snapshot.exists()) {
            //        console.log(snapshot.val());
            //      } else {
            //        console.log("No data available");
            //      }
            //}).catch((error) => {
            //    console.error("ERROR:" + error);
            //});
            
            router.replace("/app", undefined, { shallow: true })
        }
    }, [loading])

    return (
        <>
            <Head>
                <title>Dashboard - {Constants.projectName}</title>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <Loader loading={loading} />
            <Box sx={{
                display: loading ? "none" : "block"
            }}>
                <Box>
                    <NavigationBar/>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <div className="wrapper" style={{ padding: '10px 30px', width: '100%', height: '100%' }}> 
                            <Card variant="outlined">
                            <CardHeader 
                                title="Emergencies"
                            />
                            <Divider variant="middle" />
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    {/* Emergencies */}
                                    {/* Audio */}
                                    {/* <AudioEmergencyComponent/> */}

                                    {/* Video */}
                                    <VideoEmergencyComponent/>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <Stack 
                            spacing={2}
                            direction="column"
                            alignItems="center"
                            >
                            <UserInfoComponent/>
                            {/* Emergency Contacts */}
                            <EmergencyContactComponent 
                                emergencyContacts={emergencyContacts} 
                            />

                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default App