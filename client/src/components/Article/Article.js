import './Article.css';
import { useParams } from 'react-router';
import useFetch from '../../hooks/useFetch';

const Article = () => {
    const { id } = useParams();
    const API = 'http://localhost:8000/articles';
    const { data: article, isPending, error } = useFetch(API + '/' + id);
    const keys = [1, 2, 3];

    return (
        <div className="article-details">
            { isPending && <div>Loading...</div>}
            { error && <div>{error}</div>}
            { article && (
                <div>
                    <article>
                        <img src={article.img} alt={article.title} />
                        <h2>{`${article.title} - ${article.tag}`}</h2>
                        <p>{article.body}</p>
                    </article>
                    <h2 className="related-articles-header">Related Articles</h2>
                    {keys.map(key => (
                        <div className="related-articles" key={key}>
                            <div className="image"></div>
                            <div className="content">
                                <h3 className="headline">Headline</h3>
                                <p className="author">Author</p>
                                <p className="description">Short Description</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Article;
