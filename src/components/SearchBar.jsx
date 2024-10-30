import css from './SearchBar.module.css'

const SearchBar = ({ handleSubmit }) => {
    return (
        <header>
            <form onSubmit={handleSubmit}>
                <input
                     type="text"
                     autoComplete="off"
                     autoFocus
                     placeholder="Search images and photos"/>
                 <button className={css.searchBtn} type="submit">🔎</button>
            </form>
        </header>
    )
}

export default SearchBar