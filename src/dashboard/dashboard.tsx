import * as React from 'react'
import { ScrollView, StatusBar, useColorScheme, View } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LetterCard } from '../core/letter-card/letter-card'
import { ALL_LETTERS_SORTED } from '../core/letter-card/letter-card.constants'

export const Dashboard = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const letters = [
    ...ALL_LETTERS_SORTED,
    '?',
    '-',
    '-',
  ]

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {letters.map((letter: string, index: number) => (
            <LetterCard key={`letter-card-${letter}-${index}`} content={letter} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
