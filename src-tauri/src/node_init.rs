extern crate mac_address;
mod graph;

// TODO: initialize empty graph (store in centralized location)

// initialize a node from hardware with a mac address
// TODO: clarify name return vs node initialization for a single node (these are diff behaviors)
use mac_address::get_mac_address;
pub fn node_name_init() -> String {
    let mac_addr = get_mac_address() {
        Some (n: String) => n,
        None => panic!("Initialization process failed to get device mac address"),
    };
}

fn main() {
    //testing
    io::stdout("Hello world");
}