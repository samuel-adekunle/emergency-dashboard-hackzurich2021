import { Grid, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { Box } from '@mui/system';

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

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
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
                    window.alert("Something went wrong")
                });
        }
    }, [])

    return (
        <>
            <Loader loading={loading} />
            <Box sx={{
                display: loading ? "none" : "block"
            }}>
                <Typography>Coming Soon...</Typography>
            </Box>
        </>
    )
}

export default App