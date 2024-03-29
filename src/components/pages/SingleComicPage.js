import { useParams, Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelServices from '../../services/MarvelServices';

import './SingleComicPage.scss';

const SingleComicPage = () => {

    const { comicsId } = useParams();
    const [comics, setComics] = useState(null)
    const { loading, error, getComics, clearError } = useMarvelServices();


    useEffect(() => {
        updateComics()
    }, [comicsId])


    const updateComics = () => {
        clearError();

        getComics(comicsId)
            .then(onComicsLoaded)
    }

    const onComicsLoaded = (comics) => {
        setComics(comics)
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comics) ? < View comics={comics} /> : null

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}



const View = ({ comics }) => {

    const { thumbnail, title, description, pages, price, language } = comics

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">Pages: {pages} </p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">Price: {price}$</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;