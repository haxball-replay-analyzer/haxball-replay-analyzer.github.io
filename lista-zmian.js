var a = '<p style=\'font-size: 120%; font-weight:bold; color:#f57878\'>v1.13 - 10.10.2020</p><p>• From now on, matches in which no one touched the ball will not be included in the statistics<br>• Analyzer is adapted to any changes to the source code (at least I think it is). If you find any <br>bug, please report it to me<br>• Added drop-down list for selecting the displayed match (next to the "Match Stats")<br><br><p style=\'font-size: 120%; font-weight:bold; color:#f57878\'>v1.12 - 13.07.2020</p><p>• Improved performance<br><br><p style=\'font-size: 120%; font-weight:bold; color:#f57878\'>v1.11 - 12.07.2020</p><p>• Fixed some bugs<br><br><p style=\'font-size: 120%; font-weight:bold; color:#f57878\'>v1.10 - 1.07.2020</p><p>• Fixed some bugs caused by changing haxball source code<br><br><p style=\'font-size: 120%; font-weight:bold; color:#f57878\'>v1.09 - 6.06.2020</p><p>• Fixed bug ("double-counting" shots on goal when user plays the rec)<br>• Added "Space Mode" - bump counter, ball touches counter. Goalscorer is the last player to <br>touch the ball (not the last kicker), same as assist. Space Mode is loaded if match was played<br>on map with spacebounce physics<br>• Fixed heatmaps (they didn\'t display correctly for players with non-standard flags)<br><br><p style=\'font-size: 120%; font-weight:bold; color:#f57878\'>v1.08 - 3.06.2020</p><p>• Fixed bug appearing when long replays are loaded<br><br><p style=\'font-size: 120%; font-weight:bold; color:#f57878\'>v1.07 - 1.06.2020</p><p>• Heatmaps for all players (move your mouse over nick)<br>• Slightly changed design, hope it\'s clearer now<br>• Fixed some bugs (Percentages in each thirds are now counted correctly)<br><br><p style=\'font-size: 120%; font-weight:bold; color:#f57878\'>v1.06 - 24.05.2020</p><p>• Clicking on a goal at "Game stats" tab switches to replay (right before that goal)<br>• Added info about percentage of time the ball was in each third<br><br><p style=\'font-size: 120%; font-weight:bold; color:#f57878\'>v1.05 - 22.05.2020</p><p>• Added info about match duration<br>• Fixed some bugs<br><br><p style=\'font-size: 120%; font-weight:bold; color:#f57878\'>v1.04 - 19.05.2020</p><p>• Stats in PLAYERS table are now sortable, click on the header<br>• Fixed a bug occuring when game isn\'t manually stopped<br>• Each player\'s row has a color of team, Spectators aren\'t included in stats<br>• Fixed a bug that caused incorrect counting of red shots on goal</p><br><br><p style=\'font-size: 120%; font-weight:bold; color:#f57878\'>v1.03 - 17.05.2020</p><p>• Team names (RED/BLUE) are now editable, just click on them<br>• Fixed sounds and pop-up messages</p><br><br><p style=\'font-size: 120%; font-weight:bold; color:#f57878\'>v1.02 - 15.05.2020</p><p>• Fixed bug with doubling stats when user rewatch the match<br>• Added Passes and Shots on Goal to statistics</p><br><br><p style=\'font-size: 120%; font-weight:bold; color:#f57878\'>v1.01 - 12.05.2020</p><p>• Fixed some bugs</p><br><br><p style=\'font-size: 120%; font-weight:bold; color:#f57878\'>v1.00 - 08.05.2020</p><p>• Created the analyzer. Load replay and click "Game stats"</p></div>';
// ListaZmian = a;

var b = [
  [
    '1.17',
    '24.01.2023',
    'Change the camera focus to a specific player - click [Settings] > [Video] > [Player To Follow]',
    'Download map extracted from recording - button will appear on top of Game Stats tab only if author of the stadium didn\'t set the "canBeStored" property to false',
    'Fixed Settings button bug and display of icons'
  ],
  [
    '1.16',
    '07.01.2023',
    'Small fixes'
  ],
  [
    '1.15',
    '30.12.2022',
    'Some visual changes'
  ],
  [
    '1.14',
    '12.10.2020',
    'The positions of the buttons "Previous match" and "Next match" have been changed, so they stay in the same place while scrolling through matches'
  ]
];

var c = '<div id="lista-zmian" style="font-family: roboto; font-size: 110%; overflow-y: scroll; max-width: 630px">';

for (let upd of b) {
  c += '<p style=\'font-size: 120%; font-weight:bold; color:#f57878\'>';
  c += 'v' + upd[0] + ' - ' + upd[1] + '</p><p>';
  for (var i = 2; i < upd.length; i++) {
    c += '• ' + upd[i] + '<br>';
  }
  c += '</p><br>';
}

c += a;
c += '</div>'

ListaZmian = c;
