import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import { useParams, useHistory } from "react-router";
import * as sessionActions from '../../store/session';
import TopNavigationBar from '../TopNavigationBar';
import "./Settings.css";


function SettingsPage() {
    const dispatch = useDispatch();
    // const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    // const friendship = useSelector((state) => state.friend.selectedFriendship);
    // const [isFriendshipLoaded, setIsFriendshipLoaded] = useState(false);
    const [name, setName] = useState(sessionUser.name);
    const [imgUrl, setImgUrl] = useState(sessionUser.image_url);
    const [password, setPassword] = useState("");
    const [isChanged, setIsChanged] = useState(false);
    const [errors, setErrors] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await dispatch(friendActions.fetchFriendshipById(id))
    //             .then(() => setIsFriendshipLoaded(true));
    //     };
    //     fetchData();
    // }, [dispatch, id]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const data = await dispatch(friendActions.updateFriendship(id));
    //     if (data) {
    //         setErrors(data);
    //     } else {
    //         history.push('/dashboard');
    //     }
    // };

    if (!sessionUser) return <Redirect to="/" />;

    const handleEdit = async (e) => {
        e.preventDefault();
        const form = document.getElementById("settings-form");
        const formData = new FormData(form);
        formData.append('is_changed', isChanged);
        if (name.split(" ")[0]?.length > 0) formData.append('first_name', name.split(" ")[0]);
        if (name.split(" ")[1]?.length > 0) formData.append('last_name', name.split(" ")[1]);
        const data = await dispatch(sessionActions.editProfile(sessionUser.id, formData));
        if (data) {
            setErrors(data);
        }
        // } else {
        //     history.push(`/${sessionUser.id}`);
        // }
    };

    const displayFile = (e) => {
        e.preventDefault();
        const img = document.getElementById("settings-preview");
        img.src = URL.createObjectURL(e.target.files[0]);
    };

    const removeFile = (e) => {
        e.preventDefault();
        const img = document.getElementById("settings-preview");
        img.src = "https://keeping-up-aa-ai.s3.us-west-1.amazonaws.com/default.png";
        const upload = document.getElementById("settings-upload");
        upload.value = "";
    };

    return (
        // isFriendshipLoaded &&
        <>
            <TopNavigationBar />
            <div id="settings-container">
                <h1>Your Account</h1>
                <form id="settings-form" onSubmit={handleEdit}>
                    <div id="settings-image">
                        <div>
                            <img id="settings-preview" src={sessionUser.image_url} />
                            <button
                                id="settings-preview-remove"
                                className="delete"
                                onClick={async (e) => {
                                    await setIsChanged(true);
                                    await setImgUrl(null);
                                    await removeFile(e);
                                }}
                            >&#x2715;</button>
                        </div>
                        <div>
                        <label>Your avatar</label>
                            <input
                                id="settings-upload"
                                type="file"
                                name="image_url"
                                accept=".png, .jpg, .jpeg"
                                onChange={async (e) => {
                                    await setIsChanged(true);
                                    await setImgUrl(e.target.files[0]);
                                    await displayFile(e);
                                }}
                            />
                        </div>
                    </div>
                    <div id="settings-inputs">
                        {errors.length > 0 && <ul className="error-message-container">
                            {errors.map((error, idx) => (
                                <li className="error-message" key={idx}>{error}</li>
                            ))}
                        </ul>}
                        <label>Your name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>Your email address</label>
                        <input
                            type="text"
                            value={sessionUser.email}
                            disabled
                        />

                        <label>Your phone number</label>
                        <input
                            type="text"
                            value={sessionUser.phone_number || "None"}
                            disabled
                        />

                        <label>Enter Password to Confirm Changes</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button className="accent" type="submit">Save</button>
                    </div>
                </form>

            </div>

            {/* <form className="edit-friend-form" onSubmit={handleSubmit}>
                <h1>Edit friend info</h1>
                {errors.length > 0 && <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>}
                <div>{friendship.friend.email}</div>
                {friendship.bill != 0 &&
                    <div className="edit-friend-text">
                        Some of your expenses with this person also involve other third parties.
                        <span style={{ fontWeight: "bolder" }}> As a result, deleting this friend will not delete those expenses, and they will still be visible from the "All expenses" screen. </span>
                        However, this friend should be removed from your list of friends successfully.
                    </div>
                }
                <div className="edit-friend-buttons">
                    <button onClick={() => history.push(`/friends/${id}`)}>Cancel</button>
                    <button type="submit">Delete this friend</button>
                </div>
            </form> */}
        </>
    );
}

export default SettingsPage;
