import { Box, Typography } from "@mui/material"
import Link from "next/link"

const NavigationBar = () => {
    return (
        <div className="wrapper">
            <Link href="/app">
                <a>
                    <Typography>
                        Home
                    </Typography>
                </a>
            </Link>

            <Link href="/media">
                <a>
                    <Typography>
                        Media
                    </Typography>
                </a>
            </Link>

            <Link href="/">
                <a>
                    <Typography>
                        Sign Out
                    </Typography>
                </a>
            </Link>

            
        </div>
    );
}

export default NavigationBar;