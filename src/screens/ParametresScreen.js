import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  StatusBar,
  Alert
} from 'react-native';

const ParametresScreen = ({ navigation }) => {
  const [sonsActives, setSonsActives] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [modeSombre, setModeSombre] = useState(false);
  const [timerActif, setTimerActif] = useState(true);

  const reinitialiserProgression = () => {
    Alert.alert(
      "Réinitialiser la progression",
      "Êtes-vous sûr de vouloir réinitialiser toute votre progression? Cette action est irréversible.",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        {
          text: "Réinitialiser",
          style: "destructive",
          onPress: () => {
            Alert.alert("Succès", "Progression réinitialisée!");
          }
        }
      ]
    );
  };

  const contacterSupport = () => {
    Alert.alert(
      "Contacter le support",
      "Email: support@footemilgame.com\nTéléphone: +261 34 XX XX XX",
      [{ text: "OK" }]
    );
  };

  const aPropos = () => {
    Alert.alert(
      "À propos",
      "FootEmilGame v1.0\n\nDéveloppé avec ❤️ pour les fans de football.\n\n© 2024 Tous droits réservés.",
      [{ text: "Fermer" }]
    );
  };

  return (
    <View style={[styles.container, modeSombre && styles.containerDark]}>
      <StatusBar barStyle={modeSombre ? "light-content" : "dark-content"} />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, modeSombre && styles.titleDark]}>Paramètres</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Section Général */}
        <View style={[styles.section, modeSombre && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, modeSombre && styles.sectionTitleDark]}>
            GÉNÉRAL
          </Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, modeSombre && styles.textDark]}>
                Sons
              </Text>
              <Text style={[styles.settingDescription, modeSombre && styles.textSecondaryDark]}>
                Activer/désactiver les sons du jeu
              </Text>
            </View>
            <Switch
              value={sonsActives}
              onValueChange={setSonsActives}
              trackColor={{ false: "#767577", true: "#1e90ff" }}
              thumbColor={sonsActives ? "#ffffff" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, modeSombre && styles.textDark]}>
                Timer
              </Text>
              <Text style={[styles.settingDescription, modeSombre && styles.textSecondaryDark]}>
                Activer/désactiver le timer des questions
              </Text>
            </View>
            <Switch
              value={timerActif}
              onValueChange={setTimerActif}
              trackColor={{ false: "#767577", true: "#1e90ff" }}
              thumbColor={timerActif ? "#ffffff" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, modeSombre && styles.textDark]}>
                Notifications
              </Text>
              <Text style={[styles.settingDescription, modeSombre && styles.textSecondaryDark]}>
                Recevoir les notifications du jeu
              </Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: "#767577", true: "#1e90ff" }}
              thumbColor={notifications ? "#ffffff" : "#f4f3f4"}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, modeSombre && styles.textDark]}>
                Mode Sombre
              </Text>
              <Text style={[styles.settingDescription, modeSombre && styles.textSecondaryDark]}>
                Activer le mode sombre
              </Text>
            </View>
            <Switch
              value={modeSombre}
              onValueChange={setModeSombre}
              trackColor={{ false: "#767577", true: "#1e90ff" }}
              thumbColor={modeSombre ? "#ffffff" : "#f4f3f4"}
            />
          </View>
        </View>

        {/* Section Compte */}
        <View style={[styles.section, modeSombre && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, modeSombre && styles.sectionTitleDark]}>
            COMPTE
          </Text>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.dangerButton]}
            onPress={reinitialiserProgression}
          >
            <Text style={styles.dangerButtonText}>Réinitialiser la progression</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={() => navigation.navigate('Statistiques')}
          >
            <Text style={styles.secondaryButtonText}>Voir les statistiques</Text>
          </TouchableOpacity>
        </View>

        {/* Section Aide */}
        <View style={[styles.section, modeSombre && styles.sectionDark]}>
          <Text style={[styles.sectionTitle, modeSombre && styles.sectionTitleDark]}>
            AIDE & SUPPORT
          </Text>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.helpButton]}
            onPress={() => navigation.navigate('Aide')}
          >
            <Text style={styles.helpButtonText}>Guide du jeu</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.helpButton]}
            onPress={contacterSupport}
          >
            <Text style={styles.helpButtonText}>Contacter le support</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.helpButton]}
            onPress={aPropos}
          >
            <Text style={styles.helpButtonText}>À propos</Text>
          </TouchableOpacity>
        </View>

        {/* Version */}
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, modeSombre && styles.textSecondaryDark]}>
            FootEmilGame v1.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#1e90ff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  titleDark: {
    color: 'white',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionDark: {
    backgroundColor: '#1e1e1e',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionTitleDark: {
    color: '#aaa',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
  },
  textDark: {
    color: 'white',
  },
  textSecondaryDark: {
    color: '#aaa',
  },
  actionButton: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  dangerButton: {
    backgroundColor: '#ffebee',
    borderWidth: 1,
    borderColor: '#ffcdd2',
  },
  dangerButtonText: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#e3f2fd',
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  secondaryButtonText: {
    color: '#1976d2',
    fontSize: 16,
    fontWeight: '600',
  },
  helpButton: {
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  helpButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  versionText: {
    fontSize: 14,
    color: '#666',
  },
});

export default ParametresScreen;