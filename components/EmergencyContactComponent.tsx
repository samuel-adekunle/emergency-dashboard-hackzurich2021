import { Card, CardContent, CardHeader,
        List, ListItem, ListItemAvatar,
        ListItemText, Avatar, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Add, Clear } from "@mui/icons-material";

export interface EmergencyContact {
    firstName: string
    lastName: string
    emailAddress: string
}

interface EmergencyContactComponentProps {
    emergencyContacts?: [EmergencyContact] 
}

const EmergencyContactComponent = ({ emergencyContacts }: EmergencyContactComponentProps) => {
    return (
        <div className="wrapper" style={{ padding: '10px 30px', width: '100%', height: '100%' }}>
            <Card variant="outlined" sx={{ minHeight: '380px' }}>
                <CardHeader 
                    title="Emergency Contacts"
                    action={
                        <IconButton aria-label="settings">
                            <Add />
                        </IconButton>
                    }
                />
                <Divider variant="middle" />

                <CardContent>
                    <List sx={{ padding: '5px'}}>
                        {emergencyContacts?.map(({firstName, lastName, emailAddress}) => 
                        <ListItem key={emailAddress}>
                            <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${firstName} ${lastName}`}
                                secondary={emailAddress}
                            />
                            <IconButton aria-label="settings">
                                <Clear />
                            </IconButton>
                        </ListItem>)}
                    </List>
                </CardContent>
            </Card>
        </div>
    );
}

export default EmergencyContactComponent;
