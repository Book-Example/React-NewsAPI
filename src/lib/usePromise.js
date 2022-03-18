import {useState, useEffect} from 'react';

export default function usePromise(promiseCreator, deps) {
    // 대기중 / 실패 / 완료에 대한 상태 관리
    const [loading, setLoading] = useState(false);
    const [resolved, setRsolved] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const process = async() => {
            setLoading(true);
            try {
                const resolved = await promiseCreator();
                setRsolved(resolved);
            } catch(e) {
                setError(e);
            }
            setLoading(false);
        };
        process();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return [loading, resolved, error];
}