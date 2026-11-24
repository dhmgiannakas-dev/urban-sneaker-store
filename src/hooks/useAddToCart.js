import { useEffect, useState, useRef } from "react";
import { addToCart } from "../store/slices/cartSlice";
import { useDispatch } from "react-redux";

 export default function useAddToCart(product) {
    const dispatch = useDispatch();
    const [added, setAdded] = useState(false);
    const timeoutRef = useRef(null);

    function handleAddToCart() {
    dispatch(addToCart(product));
    setAdded(true);

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
        setAdded(false);
    }, 1000);
}

useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
}, []);

    return { added, handleAddToCart };

 }