import React, { lazy, useState } from "react";
import { Button } from "@tonic-ui/react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
// import About from './About'
// import Table from './Table'
import "./App.css";

const About = lazy(() => import("./About"));
const Table = lazy(() => import("./Table"));
function NoMatch() {
    return (
        <div>
            <h2>Nothing to see here!</h2>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    );
}
function Layout() {
    return (
        <div>
            {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
            <nav>
                <ul>
                    <li>
                        <Link to="/">Tonic Table</Link>
                    </li>
                    <li>
                        <Link to="/about">Tonic Modal</Link>
                    </li>

                    <li>
                        <Link to="/nothing-here">Nothing Here</Link>
                    </li>
                </ul>
            </nav>

            <hr />

            {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
            <Outlet />
        </div>
    );
}
export default function App() {
    const [count, setCount] = useState(0);
    const btnClick = () => {
        setCount((count) => count + 1);
    };

    return (
        <div>
            <div className="card">
                <Button variant="primary" onClick={btnClick}>
                    新增加一个App({count})
                </Button>
            </div>

            {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={
                            <React.Suspense fallback={<>...</>}>
                                <Table />
                            </React.Suspense>
                        }
                    />
                    <Route
                        path="about"
                        element={
                            <React.Suspense fallback={<>...</>}>
                                <About />
                            </React.Suspense>
                        }
                    />

                    {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </div>
    );
}
