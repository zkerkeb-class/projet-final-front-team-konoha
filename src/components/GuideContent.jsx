import {Link} from "react-router-dom";
import ReactMarkdown from "react-markdown";

const GuideContent = ({guide}) =>{
    return(
        <div className="guide">
            <Link to={`/guides/${guide._id}`}><h2><ReactMarkdown>{guide.title}</ReactMarkdown></h2></Link>
        </div>
    )
}
export default GuideContent;