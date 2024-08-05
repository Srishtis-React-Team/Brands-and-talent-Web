import React, { useEffect, useState } from "react";
import axios from "axios";

function SocialCount() {
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/twitter-followers"
        );
        setFollowers(response.data.followers);
      } catch (error) {}
    };

    fetchFollowers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Twitter Follower Count</h1>
        <p>Followers: {followers}</p>
      </header>
    </div>
  );
}

export default SocialCount;
