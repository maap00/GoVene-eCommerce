import React, { useEffect } from 'react'
import { useGlobalStore } from '../../store/global.store'
import { Cart } from './Cart';
import { Search } from './Search';

export const Sheet = () => {

    const sheetContent = useGlobalStore((state) => state.sheetContent);
    const closeSheet = useGlobalStore((state) => state.closeSheet);

    const sheetRef = React.useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        // funcion para manejar click fuera del sheet
        document.body.style.overflow = 'hidden';

        const handleClickOutside = (event: MouseEvent) => {
            if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
                closeSheet();
            }
        };

        // agregar event listener
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // limpiar event listener
            document.body.style.overflow = 'auto';
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeSheet]);

    const renderContent = () => {
        switch(sheetContent) {
            case 'cart':
                return <Cart/>
            case 'search':
                return <Search/>;
            default:
                return null;
        }
    }

  return (
    <div className="fixed insert-0 bg-black bg-opacity-50 z-50 flex justify-end animate-fade-in">
        <div 
            ref={sheetRef}
            className="bg-white text-black h-screen w-[500px] shadow-lg animate-slide-in">
                {renderContent()}
        </div>
    </div>
  );
};
