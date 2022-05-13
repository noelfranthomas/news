import './Home.css';
import Search from '../Search/Search';

const Home = () => {
    return (
        <div className="home">
            <div className="search-container">
                <p className="search-header">
                    What would you like to learn about?
                </p>
                <Search />
            </div>
        </div>
    );
};

export default Home;
