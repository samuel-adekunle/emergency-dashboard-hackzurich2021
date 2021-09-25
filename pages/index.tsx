import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { ArrowForward } from "@mui/icons-material";
import type { NextPage } from 'next'
import { useState } from 'react'
import Constants from '../lib/constants'
import { getActionCodeSettings } from '../lib/firebase'
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth'
import isEmail from "validator/lib/isEmail"
import Head from "next/head";

const Home: NextPage = () => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <Head>
        <title>Home - {Constants.projectName}</title>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Grid container alignItems="center" sx={{
        height: "100vh"
      }}>
        <Grid item sx={{
          m: "0 auto"
        }}>
          <Typography variant="h1" align="center" sx={{
            mb: 5
          }}>
            {Constants.projectName}
          </Typography>
          <Box sx={{
            textAlign: "center",
            display: submitted ? "block" : "none"
          }}>
            <Typography variant="body1" align="center" sx={{
              mb: 2
            }}>
              Check your email for a sign in link
            </Typography>
            <Button onClick={(e) => {
              e.preventDefault()
              setSubmitted(false)
            }}>
              <Typography variant="subtitle2">
                Back
              </Typography>
            </Button>
          </Box>
          <Grid container alignItems="center" justifyContent="center" sx={{
            display: submitted ? "none" : "flex"
          }}>
            <Grid item>
              <TextField label="Email" placeholder="me@domain.com" value={email} onChange={(e) => {
                e.preventDefault()
                setEmail(e.target.value)
              }} sx={{
                width: 400
              }} />
            </Grid>
            <Grid item sx={{
              ml: 1
            }}>
              <Button onClick={(e) => {
                e.preventDefault()
                if (!isEmail(email)) {
                  window.alert("Invalid email address")
                } else {
                  const auth = getAuth();
                  const actionCodeSettings = getActionCodeSettings(document);
                  sendSignInLinkToEmail(auth, email, actionCodeSettings)
                    .then(() => {
                      window.localStorage.setItem('emailForSignIn', email);
                      setSubmitted(true)
                    })
                    .catch((error) => {
                      console.error(error)
                    })
                }
              }}>
                <ArrowForward />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Home
