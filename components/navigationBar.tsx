import { Box, Stack, Typography } from "@mui/material"
import { getAuth } from "firebase/auth";
import Link from "next/link"
import {useRouter} from "next/router"
import { useState, useLayoutEffect } from "react"

const NavigationBar = () => {
    const auth = getAuth()
    const router = useRouter()

    const [currentPathName, setCurrentPathName] = useState("")

    useLayoutEffect(() => {
        setCurrentPathName(window.location.pathname)
    }, [])

    return (
        <Stack spacing={2} direction="row" sx={{ margin: '10px 15px'}}>
            
            <Link href="/app">
                    <a>
                        <Typography sx={{
                            display: "inline",
                            fontWeight: currentPathName === "/app" ? 700 : 400
                        }}>
                            Home
                        </Typography>
                    </a>
                </Link>
                <Link href="/media">
                    <a>
                        <Typography sx={{
                            display: "inline",
                            fontWeight: currentPathName === "/media" ? 700 : 400
                        }}>
                            Media
                        </Typography>
                    </a>
                </Link>
                <Typography sx={{
                        cursor: "pointer",
                        display: "inline"
                    }} 
                    onClick={(e) => {
                    e.preventDefault();
                    auth.signOut()
                        .then(() => {
                            router.push("/")
                        })
                    }}>
                Sign Out
                </Typography>
        </Stack>

    
    );
}

export default NavigationBar;