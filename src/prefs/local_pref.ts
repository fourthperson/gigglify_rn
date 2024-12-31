import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setPrefItem(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
}

export async function getPrefItem(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
}
