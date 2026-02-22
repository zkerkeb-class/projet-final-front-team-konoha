import { useState } from "react";
import { votePoll } from "../api/api.js";

const PollBox = ({ poll, onVote }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [voted, setVoted] = useState(false);
  const [options, setOptions] = useState(poll.options);
  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleSubmitVote = async () => {
    if (selectedIndex === null || voted) return;

    try {
      await votePoll(poll._id, selectedIndex);
      const updatedOptions = [...options];
      updatedOptions[selectedIndex].votes += 1;
      setOptions(updatedOptions);
      setVoted(true);
      if (onVote) onVote();
    } catch (error) {
      console.error("Erreur lors du vote :", error);
    }
  };

  return (
    <div className="poll">
      <h2>{poll.title}</h2>
      <p>{poll.question}</p>
      {options.map((opt, index) => {
        const percent = totalVotes ? (opt.votes / totalVotes) * 100 : 0;

        return (
          <div key={index} className="poll-option">
            <label>
              <input
                type="checkbox"
                disabled={voted}
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
        <button className="vote-button" disabled={selectedIndex === null} onClick={handleSubmitVote}>
          Voter
        </button>
      )}
    </div>
  );
};

export default PollBox;