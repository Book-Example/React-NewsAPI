import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const NewsList = ({category}) => {
    const [loading, response, error] = usePromise(()=> {
        const API_KEY = process.env.REACT_APP_API_KEY;
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(`https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=${API_KEY}`,
        );
    }, [category]);

    // 대기중일때
    if(loading) {
        return <NewsListBlock>대기중...</NewsListBlock>
    }
    // 아직 articles 값이 설정되지 않았을 떄
    if(!response) {
        return null;
    }

    //에러가 발생 했을 때
    if(error) {
        return <NewsListBlock>에러 발생!</NewsListBlock>
    }

    // articles 값이 유효할 때
    const {articles} = response.data;
    return(
        <NewsListBlock>
            {articles.map(article => (<NewsItem key={article.url} article={article}/>))}
        </NewsListBlock>
    );
};

export default NewsList;