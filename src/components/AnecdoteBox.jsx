import ReactMarkdown from "react-markdown";

const AnecdoteBox = ({anecdote}) => {
    return(
        <div className="anecdote">
            <h2>{anecdote.title}</h2>
            <ReactMarkdown>{anecdote.content}</ReactMarkdown>
        </div>
    );
}
export default AnecdoteBox;