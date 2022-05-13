import './Search.css';

const Search = () => {

    return (
        <div className="search">
            <form action="/summarize?" method="GET">
                <input type="search" name="q" id="q" placeholder="TEXT" />
                <br />
                <br />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Search;
