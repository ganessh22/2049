use dioxus::prelude::*;

fn main() {
    dioxus_web::launch(app);
}

fn app(cx: Scope) -> Element {
    cx.render(rsx! {
        style { [include_str!("styles.css")] }
        div { class: "container",
            div { class: "grid",
                (0..16).map(|_| rsx!(
                    div { class: "cell" }
                ))
            }
        }
    })
}
