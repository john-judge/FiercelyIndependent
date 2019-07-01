# "Fiercely Independent": The Game

Under development. See design doc.

The goal of this web app game is to provide a discovery-based, fun, visual introduction to the complexity NP-hard problems. The user is asked to manually find a largest independent set in a randomly-generated unweighted, undirected graph. The puzzles will become increasingly large and edge-dense, familiarizing the user with a detailed understanding of the complexity of NP-complete problems. 


On initialization, a graph will be randomly generated within the graph size and density specifications. The graph independence number will be computed and stored. The nodes will be drawn evenly spaced on a circle whose radius is about 1/3
of the square canvas element side length. The edges between nodes will be drawn in dark green as specified by the adjacency matrix.

When a user clicks on a node, it will be selected and colored dark green, and all of its neighbors will be deselected and returned to the original blue. The puzzle is solved when the user manages to reach a state where a maximum independent set is selected. Score is incremented and stored in the database; a congratulatory message is printed, and upon user taking option to proceed, a new graph puzzle is generated.

Drag and drop graph rearrangement will be available in later versions.


