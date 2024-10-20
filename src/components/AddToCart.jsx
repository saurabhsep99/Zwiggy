import React, { useState, useCallback,useRef,useEffect } from 'react';
import PropTypes from 'prop-types';

const AddToCart = ({ cartItems, open, query, totalItems,onClose }) => {
    const [itemCount, setItemCount] = useState(totalItems);
    const drawerRef = useRef(null);

    const addItem = useCallback(() => {
        setItemCount(prev => prev + 1);
    }, []);

    

    const subtractItem = useCallback(() => {
        setItemCount(prev => (prev > 0 ? prev - 1 : prev));
    }, []);

    const handleClickOutside = useCallback((event) => {
        if (drawerRef.current && !drawerRef.current.contains(event.target)) {
            onClose();
        }
    }, [open]);

    useEffect(() => {
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, handleClickOutside]);

    return (
        <div
            id="drawer-example"
            className={`fixed z-50 top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
            tabIndex="-1"
            aria-labelledby="drawer-label"
            ref={drawerRef}
        >
            <div className='flex flex-col gap-2 p-4'>
                {cartItems && cartItems.map((item, index) => (
                    <div key={index} className="flex flex-col gap-3">
                        
                        <div  className="flex ">
                        <figcaption className="flex items-center">
                            <img
                                src={`/${query}.jpg`}
                                alt={item.name}
                                className="h-16 w-16 object-cover"
                            />
                            <div className="space-y-0.5 font-medium text-left ms-3">
                                <div>{query}</div>
                                <div className="text-sm text-gray-500">{item.name}</div>
                            </div>
                        </figcaption>
                        </div>
                       
                        <button className='bg-green-800 w-[100px] text-white px-3 py-1 rounded flex items-center'>
                            <span 
                                onClick={subtractItem} 
                                className="text-lg cursor-pointer"
                                aria-label="Subtract item"
                            >
                                -
                            </span>
                            <div className="h-7 w-px bg-white mx-2" />
                            <span>{itemCount}</span>
                            <div className="h-7 w-px bg-white mx-2" />
                            <span 
                                onClick={addItem} 
                                className="text-lg cursor-pointer"
                                aria-label="Add item"
                            >
                                +
                            </span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default AddToCart;
