import React, { useState } from 'react';
import { View, Button, Clipboard, AsyncStorage } from 'react-native';
import Voice from '@react-native-voice/voice';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const App = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcribedText, setTranscribedText] = useState('');

    const audioRecorderPlayer = new AudioRecorderPlayer();

    const startRecording = async () => {
        try {
            await Voice.start('en-US');
            setIsRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = async () => {
        try {
            const transcription = await Voice.stop();
            setTranscribedText(transcription);
            setIsRecording(false);
            await AsyncStorage.setItem('transcribedText', transcription);
            await Clipboard.setString(transcription);
        } catch (error) {
            console.error('Error stopping recording:', error);
        }
    };

    return (
        <View>
            <Button title={isRecording ? 'Stop Recording' : 'Start Recording'} onPress={isRecording ? stopRecording : startRecording} />
            <Button title="Copy to Clipboard" onPress={() => Clipboard.setString(transcribedText)} />
        </View>
    );
};

export default App;
