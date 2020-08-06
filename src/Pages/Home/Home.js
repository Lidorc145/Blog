import PostsList from "../Posts/PostsList";
import Popular from "../../Components/Popular";
import Latest from "../../Components/Latest";
import React from "react";


function Home() {

return(
    <div>
        <article className="mainColumn">
        <h1>This is my blog</h1>
            <PostsList />
        </article>
    <aside className="sideColumn">
        <Latest />
        <hr className="divider" />
        <Popular />
    </aside>
    </div>);
}
export default Home;