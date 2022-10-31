extern crate mac_address;
use crate::graph_p::{Graph, Node};
use serde::{Deserialize, Serialize};
use std::error::Error;

/*
* This module handles the fine implementation details of node initialization;
* e.g. name assignment (with defaults), and assignment of location data.
*/

/*
* This function will assign each node a name from it's MAC address. If no address is
* available, it will alert the user and assign a default name.
*/
pub fn init_own_node_with_addr() -> Node {
    let name = get_own_node_name();
    let node = Node::new(name.clone());
    return node;
}

/*
* Gets MAC address as node name, or assigns a default random number
*/
pub fn get_own_node_name() -> String {
    use mac_address::get_mac_address;
    //get mac address
    let DEFAULT: String = "anonymous".to_string();
    let name = get_mac_address();
    match name {
        Ok(d) => {
            println!("Found device MAC address {}", d.expect("NULL").to_string());
            return d.expect("NULL").to_string();
        }
        Err(msg) => {
            println!(
                "Failed to find MAC address; using default \"{}\" Error: {}",
                DEFAULT, msg
            );
            return DEFAULT;
        }
    }
}

/*
* This function will use the node's location data to generate edge weights for the graph.
* Note that we'll define gps format as [lat, lng].
*/
#[derive(Serialize, Deserialize, Debug)]
pub fn generate_edge_weights() {
    //TODO: return -> Graph
    // let gps = Point {x: , y: };

    println!("Edge weight generation not yet implemented.\n");
}

/*
* This function will scan an individual node, and update its edge weights accordingly
*/
pub fn update_individual_node_data(node: Node) {
    //TODO: return ->Node
    println!("Node update not yet implemented.\n");
}

// Create a unit test for the Graph struct
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_mac_addr() {
        let name: String = get_node_name();
        println!("We found a device MAC address of {}", name);
    }

    #[test]
    fn test_node_init_with_mac_addr() {
        let node: Node = init_node_with_addr();
        println!(
            "Initialized Node: (Name: {} - Degree Weight: {})",
            node.name, node.optimal_weighted_degree
        );
    }
}
