import { MantineProvider, Text } from '@mantine/core';
import './Styles/App.css'

function App() {

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Text></Text>
    </MantineProvider>
  )
}

export default App