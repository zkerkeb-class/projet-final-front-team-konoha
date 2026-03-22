import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const GuideDetails = () => {
    const { id } = useParams();
    const [guide, setGuide] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGuide = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/guides/${id}`);
                if (!res.ok) throw new Error("Guide introuvable");
                const data = await res.json();
                setGuide(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchGuide();
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (!guide) return <p>Guide introuvable</p>;

    return (
        <>
            <div id='guide-details'>
                <h2><ReactMarkdown>{guide.title}</ReactMarkdown></h2>
                <div className='text'>
                    {guide.content.map((item, index) => 
                        item.type === "text" ? (
                            <ReactMarkdown key={index} components={{ a: ({ node, ...props }) => (<Link to={props.href}>{props.children}</Link>)}}>
                                {item.content}
                            </ReactMarkdown>
                        ) : <img key={index} src={item.src} alt={item.alt}/>
                    )}
                </div>
            </div>
            <button onClick={() => navigate("/guides")}>Retour à la page des guides</button>
        </>
    );
}

export default GuideDetails;