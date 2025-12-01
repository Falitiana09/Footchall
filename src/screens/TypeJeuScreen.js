import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

const TypeJeuScreen = ({ navigation }) => {
  const typesJeu = [
    { id: 1, name: 'Histoire du Football', niveau: 1, completed: true },
    { id: 2, name: 'Règles du Jeu', niveau: 1, completed: true },
    { id: 3, name: 'Joueurs Légendaires', niveau: 2, completed: true },
    { id: 4, name: 'Championnats', niveau: 3, completed: false },
    { id: 5, name: 'Compétitions Internationales', niveau: 4, completed: false },
    { id: 6, name: 'Techniques de Jeu', niveau: 5, completed: false },
    { id: 7, name: 'Tactiques', niveau: 6, completed: false },
    { id: 8, name: 'Statistiques', niveau: 7, completed: false },
    { id: 9, name: 'Culture Football', niveau: 8, completed: false },
    { id: 10, name: 'Expert Football', niveau: 9, completed: false },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Types de Jeu</Text>
      <ScrollView>
        {typesJeu.map((jeu) => (
          <TouchableOpacity
            key={jeu.id}
            style={[
              styles.jeuItem,
              jeu.completed ? styles.completed : styles.locked
            ]}
            onPress={() => {
              if (jeu.completed) {
                navigation.navigate('Quiz', { typeJeu: jeu });
              }
            }}
          >
            <Text style={styles.jeuName}>{jeu.name}</Text>
            <View style={styles.niveauContainer}>
              <Text style={styles.niveauText}>Niveau {jeu.niveau}</Text>
              {jeu.completed ? (
                <Text style={styles.statusText}>✅</Text>
              ) : (
                <Text style={styles.statusText}>🔒</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  jeuItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  completed: {
    borderLeftWidth: 5,
    borderLeftColor: '#4caf50',
  },
  locked: {
    borderLeftWidth: 5,
    borderLeftColor: '#ff9800',
    opacity: 0.6,
  },
  jeuName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  niveauContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  niveauText: {
    marginRight: 10,
    color: '#666',
  },
  statusText: {
    fontSize: 16,
  },
});

export default TypeJeuScreen;