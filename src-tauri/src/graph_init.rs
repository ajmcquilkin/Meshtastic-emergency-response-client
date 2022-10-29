mod graph;

/*
* This module handles all of the graph initialization and data flow.
* Ideally, we'll call its functions to create a graph, run algorithms
* on it, and return the result to the frontend.
*/

// TODO: Questionable use of global (will need an unsafe block to get)
static mut GRAPH: Graph = empty;

/*
* This function initializes a graph from all available nodes, storing
* node information with MAC addresses as keys.
 */
pub fn initialize_graph_from_data() -> Graph {}

/*
* Adds a single node and associated edges/weights to the graph
*/
pub fn add_node_to_graph() -> Graph {}

/*
* This should trigger a fast graph update, adding any additional nodes and updating node location data
*/
pub fn update_graph() -> Graph {}

/*
* Note: this function runs algorithms on a copy of the graph, maintaining the graph state that
* existed at call time.
*/
pub fn run_algorithms_on_graph() -> Graph {}

/*
* This function serializes and sends graph data to the frontend
*/
pub fn export_data_to_frontend() -> i32 {}
