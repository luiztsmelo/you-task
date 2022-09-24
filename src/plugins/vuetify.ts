import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

const lightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    primary: '#072ac8',
    secondary: '#627DF9',
    green: '#09bc8a',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme
    }
  }
})
