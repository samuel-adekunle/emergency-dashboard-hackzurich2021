import { Card, CardContent, CardHeader} from '@mui/material';

const VideoEmergencyComponent = () => {
    return (
        <div className="wrapper">
            <Card variant="outlined">
                <CardHeader
                    title="Video"
                />
                <CardContent>
                    Videofile
                </CardContent>
            </Card>
        </div>
    );
}

export default VideoEmergencyComponent;