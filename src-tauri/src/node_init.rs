extern crate mac_address;
mod graph;

/*
* This module handles the fine implementation details of node initialization;
* e.g. name assignment (with defaults), and assignment of location data.
*/

/*
* This function will assign each node a name from it's MAC address. If no address is
* available, it will alert the user and assign a default name.
*/
pub fn assign_node_name() -> String {}

/*
* This function will use the node's location data to generate edge weights for the graph
*/
pub fn generate_edge_weights() -> Graph {}

/*
* This function will scan an individual node, and update its edge weights accordingly
*/
pub fn update_individual_node_data() -> Node {}

// fn main() {
//     //testing
//     io::stdout("Hello world");
// }
