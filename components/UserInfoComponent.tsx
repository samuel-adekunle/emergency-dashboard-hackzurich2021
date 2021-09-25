import { Card, CardContent, CardHeader} from '@mui/material';

const UserInfoComponent = () => {
    return (
        <div className="wrapper" style={{ padding: '10px 30px', width: '100%', height: '100%' }}>
            <Card variant="outlined" sx={{ width: '100%' }}>
                <CardHeader
                    title="User Info"
                />
                <CardContent>
                    First Name, Last Name, Email
                </CardContent>
            </Card>
        </div>
    );
}

export default UserInfoComponent;