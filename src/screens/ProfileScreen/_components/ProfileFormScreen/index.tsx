import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Card, TextInput} from 'react-native-paper';
import FixedBottom from '@/components/FixedBottom';

const ProfileFormScreen = () => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <TextInput
            mode="outlined"
            inputMode="numeric"
            placeholder="Masukkan Nomor Telepon..."
            theme={{roundness: 6}}
            label="Nomor Telepon"
          />
        </Card.Content>
      </Card>
      <FixedBottom>
        <Button
          onPress={() => {}}
          mode="contained"
          theme={{roundness: 10}}
          contentStyle={styles.buttonFooter}>
          Self Assessment
        </Button>
      </FixedBottom>
    </View>
  );
};

export default ProfileFormScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    padding: 16,
  },
  buttonFooter: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    // flex: 1,
  },
});
