import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink, getAdditionalUserInfo } from "firebase/auth";
import { getDatabase, set, ref, onValue} from "firebase/database";
import {useState} from "react";

const UserInfoComponent = () => {
    
    const auth = getAuth();
    
    return (

        <div className="wrapper" style={{ padding: '10px 30px', width: '100%', height: '100%' }}>
            <Card variant="outlined" sx={{ width: '100%' }}>
                <CardHeader
                    title="User Information"
                />
                <CardContent>
                    <Typography>
                        <div>
                        Email: {auth.currentUser?.email} 
                        <br />
                        UID: {auth.currentUser?.uid}
                        </div>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default UserInfoComponent;