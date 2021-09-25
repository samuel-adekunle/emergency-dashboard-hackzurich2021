import { Card, CardContent, CardHeader,
        List, ListItem, ListItemAvatar,
        ListItemText, Avatar, Divider } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Add, Clear } from "@mui/icons-material";

const EmergencyContactComponent = ({ emergencyContacts }) => {
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
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Contact Number 1"
                                secondary="contact1@placeholder.com"
                            />
                            <IconButton aria-label="settings">
                                <Clear />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Contact Number 2"
                                secondary="contact2@placeholder.com"
                            />
                            <IconButton aria-label="settings">
                                <Clear />
                            </IconButton>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Contact Number 3"
                                secondary="contact3@placeholder.com"
                            />
                            <IconButton aria-label="settings">
                                <Clear />
                            </IconButton>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
        </div>
    );
}

export default EmergencyContactComponent;
