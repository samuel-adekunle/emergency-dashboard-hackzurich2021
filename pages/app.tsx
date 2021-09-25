import { Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { Box } from '@mui/system';
import Head from "next/head";
import Constants from "../lib/constants";
import { useRouter } from 'next/dist/client/router';

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

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            signInWithEmailLink(auth, email!, window.location.href)
                .then(() => {
                    window.localStorage.removeItem('emailForSignIn');
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
    }, [router, auth])

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
                <Typography>User Unique Identifier: {auth.currentUser?.uid}</Typography>
            </Box>
        </>
    )
}

export default App