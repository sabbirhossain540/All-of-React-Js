import { useEffect } from "react";

export function useGeolocation(){
    const [isLoading, setIsLoading] = useState(false);
    const [countClicks, setCountClicks] = useState(0);
    const [position, setPosition] = useState({});
    const [error, setError] = useState(null);

    useEffect(function(){
        setCountClicks((count) => count + 1);
        if (!navigator.geolocation)
        return setError("Your browser does not support geolocation");

    }, []);

    function getPosition() {
        

        

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
                });
                setIsLoading(false);
            },
            (error) => {
                setError(error.message);
                setIsLoading(false);
        }
        );
    }

}