import { useState, useEffect } from "react";
import { votePoll } from "../api/api.js";

const PollBox = ({ poll, currentUserId, onVote }) => { //ajout de currentUserId
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [voted, setVoted] = useState(false);
  const [options, setOptions] = useState(poll.options);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //nouveau
  useEffect(() => {
    if (poll.voters.includes(currentUserId)) setVoted(true);
  }, [poll, currentUserId]);

  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleSubmitVote = async () => {
    if (selectedIndex === null || voted || loading) return;

    setLoading(true);
    setError(null);

    try {
      const updatedPoll = await votePoll(poll._id, selectedIndex); 
      setOptions(updatedPoll.options);
      setVoted(true);
      if (onVote) onVote();
    } catch (error) {
      setError(error.message);
    }finally{ 
      setLoading(false);
    }
  };

  return (
    <div className="poll">
      <h2>{poll.title}</h2>
      <p>{poll.question}</p>
      {options.map((opt, index) => {
        const percent = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;

        return (
          <div key={index} className="poll-option">
            <label>
              <input
                type="checkbox"
                disabled={voted ||loading}
                checked={selectedIndex === index}
                onChange={() => setSelectedIndex(index)}
              />
              {opt.text}
            </label>
            {voted && (
                <div className="poll-bar-container">
                    <div className="poll-bar" style={{ width: `${percent}%` }}>
                        {opt.votes} vote{opt.votes > 1 ? "s" : ""}
                    </div>
                </div>
            )}
          </div>
        );
      })}
      {!voted && (
        <button className="vote-button" disabled={selectedIndex === null ||loading} onClick={handleSubmitVote}>
          {loading ? "Vote en cours..." : "Voter"}
        </button>
      )}
    </div>
  );
};

export default PollBox;