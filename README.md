# Haxball Replay Analyzer
https://haxball-replay-analyzer.github.io

A tool for analyzing haxball recordings (.hbr2). It decrypts Uint8Array files and allow you to check various statistics:  
• scores, kicks, shots on goal, passes, ball possession  
• info about percentage of time the ball was in each third  
• heatmaps for all players  

Analyzer let you switch between all games in single recording, change teamnames (so you can easily create a Match Report), switch between different replay speed (from 0.1x to 10000x). You can find sample recordings [HERE](https://github.com/haxball-replay-analyzer/haxball-replay-analyzer.github.io/tree/master/sample%20recordings), on [THEHHAX Replays](https://thehax.pl/forum/powtorki.php?action=ostatnio_dodane), or record by yourself on haxball room (click "Rec" button).

1. ► Load replay (.hbr2 file)
2. Click 'Game Stats'
3. Enjoy! :)

![start](https://user-images.githubusercontent.com/103112562/212660345-276bdce9-f989-43fb-8cc6-0957be54fe0a.png)

![stats](https://user-images.githubusercontent.com/103112562/212660394-22d68dc2-66a2-4322-844f-23c260792691.PNG)

- 1 - Drop-down list of matches played in a loaded recording. Choose the one you want to see stats from...
- 2 - ... or click on the buttons Previous match and Next match.
- 3 - All teamstats. Score, goals, ball possession, shots on goal, passes, kicks. Note: if the game was played on a map with SpaceBounce physics, goalscorer is the last player to touch the ball (not the last kicker), same with assist. If you want to change teamnames, just click on them (Red/Blue) and type new ones.
- 4 - Players' stats. All of them are sortable by clicking on the header. In SpaceBounce mode, they also include Bump counter and Ball Touches counter.
- 5 - Take a look on where did the ball spend its time.
- 6 - Players' heatmaps. Move your mouse over each players nick to see their movement.
