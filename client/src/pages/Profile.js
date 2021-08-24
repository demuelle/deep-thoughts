import React from "react";

import { Redirect, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

import ThoughtList from "../components/ThoughtList/ThoughtList";
import FriendList from "../components/FriendList/FriendList";

const Profile = () => {
  const { username: destructuredInlineRenamedVariable } = useParams();

  const { loading, data } = useQuery(
    destructuredInlineRenamedVariable ? QUERY_USER : QUERY_ME,
    {
      variables: { username: destructuredInlineRenamedVariable },
    }
  );

  if (
    Auth.loggedIn() && destructuredInlineRenamedVariable && 
    destructuredInlineRenamedVariable.toLowerCase() ===
      Auth.getProfile().data.username.toLowerCase()
  ) {
    return <Redirect to="/profile" />;
  }

  const user = data?.me || data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {destructuredInlineRenamedVariable ? `${user.username}'s` : 'your'} profile
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ThoughtList
            thoughts={user.thoughts}
            title={`Inside the head of a madman named ${user.username}`}
          />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            friends={user.friends}
            username={user.username}
            friendCount={user.friendCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
