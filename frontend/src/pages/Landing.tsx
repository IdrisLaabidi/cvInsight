import {Link} from "react-router";

export default function Landing() {
    return (
        <>
            <ul>
                <li><Link to="/signin">Sign In</Link></li>
                <li> <Link to="/signup">Sign Up</Link></li>
            </ul>
        </>
    );
}