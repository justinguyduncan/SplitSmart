import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function EditFriendPage() {
    const sessionUser = useSelector((state) => state.session.user);
    if (!sessionUser) return <Redirect to="/" />;

    return (
        <>
            <h1>EditFriend Page</h1>
        </>
    );
}

export default EditFriendPage;
