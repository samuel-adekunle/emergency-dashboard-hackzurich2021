import { Grid, Typography, Stack, Card, CardContent, 
         CardHeader, Divider } from '@mui/material'
import type { NextPage } from 'next'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, getAdditionalUserInfo } from "firebase/auth";
import { getDatabase, set, update, ref, onValue, child, get } from "firebase/database";
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { Box } from '@mui/system';
import Head from "next/head";
import Constants from "../lib/constants";
import { useRouter } from 'next/router';
import EmergencyContactComponent, {EmergencyContact} from "../components/EmergencyContactComponent";
import AudioEmergencyComponent, {AudioEmergency} from "../components/AudioEmergencyComponent";
import VideoEmergencyComponent, {VideoEmergency} from "../components/VideoEmergencyComponent";
import NavigationBar from "../components/navigationBar";
import UserInfoComponent from "../components/UserInfoComponent";
import { ref as ref_storage } from "firebase/storage";
import { getStorage, getDownloadURL } from "firebase/storage";
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
    const storage = getStorage();

    const [loading, setLoading] = useState(true);

    const [emergencyContacts, setEmergencyContacts] = useState<[EmergencyContact]>();
    const [audioEmergencies, setAudioEmergencies] = useState<[AudioEmergency]>();
    const [videoEmergencies, setVideoEmergencies] = useState<[VideoEmergency]>();
    

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
                        update(ref(db, "users/"), {
                            [result.user.uid]: {
                                "identity": {
                                    "emailAddress": result.user.email
                                },
                                "emergencyContacts" : [{
                                    "firstName": " ",
                                    "lastName": " ",
                                    "emailAddress": result.user.email
                                }]
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
               setEmergencyContacts(snapshot.val());
            })

            var _audioEmergencies: AudioEmergency[] = [];
            var _videoEmergencies: VideoEmergency[] = [];

            // Fetch emergencies
            const ref2 = ref(db, `users/${auth.currentUser?.uid}/emergencies`);
            onValue(ref2, (snapshot) => {
                snapshot.forEach(item => {
                    const emergencyItem = item.val();

                    getDownloadURL(ref_storage(storage, emergencyItem.resourceBucketLocation)).then((url) => {
                        if (emergencyItem.type == "audio") {
                            _audioEmergencies.push({
                                "transcribedText": emergencyItem.audioTranscript,
                                "urlLink": url,
                                "timeStamp": emergencyItem.timestamp
                            });
                        } else {
                            _videoEmergencies.push({
                                "urlLink": url,
                                "timeStamp": emergencyItem.timestamp
                            });
                        }
                    });
                });
            });

            // Pass arrays
            setAudioEmergencies(_audioEmergencies);
            setVideoEmergencies(_videoEmergencies);

            router.replace("/app", undefined, { shallow: true });
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

                                    {console.log("checking for video and audio...")}
                                    {console.log(audioEmergencies)}
                                    {console.log(videoEmergencies)}
                      
                                    {/* Audio */}
                                    <AudioEmergencyComponent
                                        audioEmergencies={audioEmergencies}
                                    /> 
 
                                    {/* Video */}
                                    <VideoEmergencyComponent
                                        videoEmergencies={videoEmergencies}
                                    />
                                          
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
                            {console.log("emergency contacts")}
                            {console.log(emergencyContacts)}
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