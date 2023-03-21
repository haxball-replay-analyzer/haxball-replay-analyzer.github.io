import Changes from './Changes.js';
import { useDispatch } from 'react-redux';
import { setVersion } from '../../slices/mainModeSlice.js';
import { useEffect } from 'react';

const changelog = [
  {
    version: '2.1.0',
    date: '21.03.2023',
    changes: [
      'Heatmaps are generated with background of actual match stadium, instead of the default one',
      'Added possibility to connect 2 halves of the match - if replay has 2 matches in it, the Connect 2 Halves button appears next to list of matches',
      'Added possibility to check almost every player statistic\'s heatmap - click on choosen player Goals, Assists, Kicks, Passes, Shots on Goal to see where they occured',
      'Changed the way analyzer behaves after user clicked a goal on game stats - now it rewind the recording to 5 seconds before the goal',
      'Added some tooltips to replay and game stats buttons',
      'Some visual improvements',
      'Added link to "Help" in a header',
      'Fixed incorrect display of "Couldn\'t load the file" error',
      'Fixed bug occuring when two separate replays are loaded one after one'
    ]
  },
  {
    version: '2.0.2',
    date: '15.03.2023',
    changes: [
      'Minor changes and bugfixes'
    ]
  },
  {
    version: '2.0.1',
    date: '17.02.2023',
    changes: [
      'Small bugfixes'
    ]
  },
  {
    version: '2.0.0',
    date: '16.02.2023',
    changes: [
      'Whole code has been restructured and moved to React.js',
      'Bug fixed - user was unable to download map if match was played in Space Mode',
      'Clicking outside the Match Stats will close them',
      'Team names will shrink with the length of user input',
      'Slightly changed appearance and added animations'
    ]
  },
  {
    version: '1.17',
    date: '24.01.2023',
    changes: [
      'Change the camera focus to a specific player - click [Settings] > [Video] > [Player To Follow]',
      'Download map extracted from recording - button will appear on top of Game Stats tab only if author of the stadium didn\'t set the "canBeStored" property to false',
      'Fixed Settings button bug and display of icons'
    ]
  },
  {
    version: '1.16',
    date: '07.01.2023',
    changes: [
      'Small fixes'
    ]
  },
  {
    version: '1.15',
    date: '30.12.2022',
    changes: [
      'Some visual changes' // tu coś innego weź wymyśl
    ]
  },
  {
    version: '1.14',
    date: '12.10.2020',
    changes: [
      'The positions of the buttons "Previous match" and "Next match" have been changed, so they stay in the same place while scrolling through matches'
    ]
  },
  {
    version: '1.13',
    date: '10.10.2020',
    changes: [
      'From now on, matches in which no one touched the ball will not be included in the statistics',
      'Analyzer is adapted to any changes to the source code (at least I think it is). If you find any bug, please report it to me',
      'Added drop-down list for selecting the displayed match (next to the "Match Stats")'
    ]
  },
  {
    version: '1.12',
    date: '13.07.2020',
    changes: [
      'Improved performance'
    ]
  },
  {
    version: '1.11',
    date: '12.07.2020',
    changes: [
      'Fixed some bugs'
    ]
  },
  {
    version: '1.10',
    date: '1.07.2020',
    changes: [
      'Fixed some bugs caused by changing haxball source code'
    ]
  },
  {
    version: '1.09',
    date: '6.06.2020',
    changes: [
      'Fixed bug("double-counting" shots on goal when user plays the rec)',
      'Added "Space Mode" - bump counter, ball touches counter.Goalscorer is the last player to touch the ball(not the last kicker), same as assist.Space Mode is loaded if match was played  on map with spacebounce physics',
      'Fixed heatmaps(they didn\'t display correctly for players with non-standard flags)'
    ]
  },
  {
    version: '1.08',
    date: '3.06.2020',
    changes: [
      'Fixed bug appearing when long replays are loaded'
    ]
  },
  {
    version: '1.07',
    date: '1.06.2020',
    changes: [
      'Heatmaps for all players(move your mouse over nick)',
      'Slightly changed design, hope it\'s clearer now',
      'Fixed some bugs(Percentages in each thirds are now counted correctly)'
    ]
  },
  {
    version: '1.06',
    date: '24.05.2020',
    changes: [
      'Clicking on a goal at "Game stats" tab switches to replay(right before that goal)',
      'Added info about percentage of time the ball was in each third'
    ]
  },
  {
    version: '1.05',
    date: '22.05.2020',
    changes: [
      'Added info about match duration',
      'Fixed some bugs'
    ]
  },
  {
    version: '1.04',
    date: '19.05.2020',
    changes: [
      'Stats in PLAYERS table are now sortable, click on the header',
      'Fixed a bug occuring when game isn\'t manually stopped',
      'Each player\'s row has a color of team, Spectators aren\'t included in stats',
      'Fixed a bug that caused incorrect counting of red shots on goal'
    ]
  },
  {
    version: '1.03',
    date: '17.05.2020',
    changes: [
      'Team names(RED / BLUE) are now editable, just click on them',
      'Fixed sounds and pop - up messages'
    ]
  },
  {
    version: '1.02',
    date: '15.05.2020',
    changes: [
      'Fixed bug with doubling stats when user rewatch the match',
      'Added Passes and Shots on Goal to statistics'
    ]
  },
  {
    version: '1.01',
    date: '12.05.2020',
    changes: [
      'Fixed some bugs'
    ]
  },
  {
    version: '1.00',
    date: '08.05.2020',
    changes: [
      'Created the analyzer.Load replay and click "Game stats"'
    ]
  }
];

const newChanges = changelog.map(change => <Changes key={change.version} change={change} />)

function Changelog() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setVersion(changelog[0].version))
  }, [])

  return (
    <div id="changelist" style={{ fontFamily: 'roboto', fontSize: '110%', overflowY: 'scroll' }}>
      {newChanges}

    </div >
  );
}

export default Changelog;