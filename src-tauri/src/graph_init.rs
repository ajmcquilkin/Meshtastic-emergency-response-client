extern crate json;
use crate::graph_p::{Graph, Node};

/*
* This module handles all of the graph initialization and data flow.
* Ideally, we'll call its functions to create a graph, run algorithms
* on it, and return the result to the frontend.
*/

//TODO: we may want to handle the coordinator node differently
//TODO: we need a way to maintain/store graph state without the frontend; e.g. a global or filedump

/*
* This function initializes a graph from all available nodes, storing
* node information with MAC addresses as keys.
 */
pub fn initialize_graph_from_data(json_data: json) -> Graph {}

/*
* This should trigger a fast graph update, adding any additional nodes and updating node location data
*/
pub fn update_graph(graph: Graph) -> Graph {}

/*
* Note: this function runs algorithms on a copy of the graph, maintaining the graph state that
* existed at call time.
*/
pub fn run_algorithms_on_graph(graph: Graph) -> Graph {}

/*
* This function serializes and sends graph data to the frontend
*/
pub fn export_data_to_frontend(graph: Graph) -> json {}
