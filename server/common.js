var colors = require('colors');
 
colors.setTheme({
  silly: 'rainbow',
  success: ['green','bold'],
  help: ['magenta'],
  query: ['blue','bold'],
  error: ['red','bold'],
  status: ['yellow'],
  websock: ['black','bold']
});

module.exports = {
  cli_color: colors,
  websockStatus: true,
  websockTime: 5000
}