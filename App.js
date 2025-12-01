import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccueilScreen from './src/screens/AccueilScreen';
import TypeJeuScreen from './src/screens/TypeJeuScreen';
import QuizScreen from './src/screens/QuizScreen';
import TerrainScreen from './src/screens/TerrainScreen';
import QuizTerrainScreen from './src/screens/QuizTerrainScreen';
import JouerScreen from './src/screens/JouerScreen';
import QuizJoueurScreen from './src/screens/QuizJoueurScreen';
import LogoScreen from './src/screens/LogoScreen';
import QuizLogoScreen from './src/screens/QuizLogoScreen';
import DrapeauScreen from './src/screens/DrapeauScreen';
import QuizDrapeauScreen from './src/screens/QuizDrapeauScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Accueil"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1e90ff',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Accueil" 
          component={AccueilScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="TypeJeu" 
          component={TypeJeuScreen}
          options={{ title: 'Types de Jeu' }}
        />
        <Stack.Screen 
          name="Quiz" 
          component={QuizScreen}
          options={{ title: 'Challenge Football' }}
        />
        <Stack.Screen 
          name="TerrainScreen" 
          component={TerrainScreen}
          options={{ 
            title: 'Deviner le Terrain',
            headerBackTitle: 'Retour'
          }}
        />
        <Stack.Screen 
          name="QuizTerrain" 
          component={QuizTerrainScreen}
          options={{ 
            title: 'Quiz Terrain',
            headerBackTitle: 'Retour'
          }}
        />
        <Stack.Screen 
          name="JouerScreen" 
          component={JouerScreen}
          options={{ 
            title: 'Deviner le Joueur',
            headerBackTitle: 'Retour'
          }}
        />
        <Stack.Screen 
          name="QuizJoueur" 
          component={QuizJoueurScreen}
          options={{ 
            title: 'Quiz Joueur',
            headerBackTitle: 'Retour'
          }}
        />
        <Stack.Screen 
          name="LogoScreen" 
          component={LogoScreen}
          options={{ 
            title: 'Logo de Club',
            headerBackTitle: 'Retour'
          }}
        />
        <Stack.Screen 
          name="QuizLogo" 
          component={QuizLogoScreen}
          options={{ 
            title: 'Quiz Logo',
            headerBackTitle: 'Retour'
          }}
        />
        <Stack.Screen 
          name="DrapeauScreen" 
          component={DrapeauScreen}
          options={{ 
            title: 'Drapeau du Pays',
            headerBackTitle: 'Retour'
          }}
        />
        <Stack.Screen 
          name="QuizDrapeau" 
          component={QuizDrapeauScreen}
          options={{ 
            title: 'Quiz Drapeau',
            headerBackTitle: 'Retour'
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}