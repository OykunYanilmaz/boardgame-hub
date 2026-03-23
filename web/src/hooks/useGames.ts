import apiClient from "@/services/api-client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

export interface Category {
    id: number;
    name: string
}

export interface Game {
    id: number;
    name: string;
    weight: number;
    publisher: { id: number, name: string},
    categories: Category[]
}

type PaginatedResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[]
}

const useGames = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
    const controller = new AbortController()    

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    apiClient.get<PaginatedResponse<Game>>('/games/', { signal: controller.signal })
                .then(res => {
                    setGames(res.data.results);
                    setLoading(false);
                })
                .catch(err => {
                    if(err instanceof CanceledError) return;
                    setError(err.message);
                    setLoading(false);
                })
    
    return () => controller.abort();
                
    }, []);

    return { games, error, isLoading }
}

export default useGames;
