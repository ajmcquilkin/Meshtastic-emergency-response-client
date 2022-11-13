use crate::algorithms::articulation_point::articulation_point;
use crate::algorithms::globalmincut::karger_stein_gmincut;
use crate::algorithms::stoer_wagner::stoer_wagner;
use crate::aux_data_structures::neighbor_info::{Neighbor, NeighborInfo};
use crate::aux_data_structures::stoer_wagner_ds::StoerWagnerGraph;
use crate::aux_functions::graph_init::load_graph;
use petgraph::graphmap::Nodes;
use petgraph::stable_graph::NodeIndex;

#[tauri::command]
pub fn run_articulation_point(nodes: Vec<NeighborInfo>) -> String {
    // Assemble a vector of nodes and their neighbors
    println!("{:?}", nodes);
    let mut graph = load_graph(nodes.clone());
    let articulation_points = articulation_point(graph.clone());
    let mut output = String::new();
    output.push_str("Output: ");
    for pt in articulation_points {
        println!("Articulation point: {:?}", pt);
        output.push_str(&graph.g.node_weight(pt).unwrap().name);
    }
    output
}

#[tauri::command]
pub fn run_global_mincut(nodes: Vec<NeighborInfo>) -> f64 {
    let graph = load_graph(nodes.clone());
    println!("Hit global mincut");
    let order = graph.get_order();
    let global_min_cut = karger_stein_gmincut(&graph.clone(), order as i32);
    global_min_cut
}

#[tauri::command]
pub fn run_stoer_wagner(nodes: Vec<NeighborInfo>) -> String {
    let graph = load_graph(nodes.clone());
    println!("Hit Stoer-Wagner");
    let graph_sw = &mut StoerWagnerGraph::new(graph.clone());
    let stoer_wagner = stoer_wagner(&mut graph_sw.clone());
    let output = format!(
        "Stoer-Wagner: {} {} {}",
        stoer_wagner.get_a(),
        stoer_wagner.get_b(),
        stoer_wagner.get_weight()
    );
    output
}