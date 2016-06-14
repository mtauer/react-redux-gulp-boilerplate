const input = 'src/'
const output = 'public/'

export const paths = {
  input,
  output,
  styles: {
    input: input + 'scss/',
    inputFiles: [input + '**/*.scss'],
    inputMain: 'app.scss',
    output: output + 'css/',
    outputFile: 'app.css',
  },
}

export const env = [
  'development',
  'staging',
  'production',
].indexOf(process.env.APP_ENV) !== -1 ? process.env.APP_ENV : 'development'
