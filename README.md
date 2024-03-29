# "Fiercely Independent": The Game

Website hosted with pythonanywhere.com [here](http://jjudge.pythonanywhere.com/)  

The goal of this web app game is to provide a discovery-based, fun, visual introduction to the complexity of NP-complete problems. The user is asked to manually find a largest independent set in a randomly-generated, unweighted, undirected graph. The puzzles will become increasingly large and edge-dense, familiarizing the user with a visual, thoughtful understanding of the independent set decision problem. 

![Prototype demo image.](fierceIndepDemo1.png)



# Design Plan Overview

On initialization, a graph will be randomly generated within the graph size and density specifications. The graph independence number will be computed and stored. The nodes will be drawn evenly spaced on a circle whose radius is about 1/3
of the square canvas element side length. The edges between nodes will be drawn as specified by the adjacency matrix.

When a user clicks on a node, it will be selected and colored blue, and all of its neighbors will be deselected and returned to the original dark green. The puzzle is solved when the user manages to reach a state where a maximum independent set is selected. Score is to be incremented and stored in the database; a congratulatory message is printed, and upon user taking option to proceed, a new graph puzzle is generated.

The website is database-backed; supports user registration and time-stamped, public comments. Drag and drop graph rearrangement will be available in later versions. Also see design doc PDF.

![Prototype demo image.](fierceIndpDemo.png)
