import ReactMarkdown from "react-markdown";

const AnecdoteBox = ({anecdote}) => {
    return(
        <div className="anecdote">
            <h2><ReactMarkdown>{anecdote.title}</ReactMarkdown></h2>
            <p><ReactMarkdown>{anecdote.content}</ReactMarkdown></p>
        </div>
    );
}
export default AnecdoteBox;