import React, { useEffect, useRef, useState } from 'react';
import { createSwapy } from 'swapy';

const SwapyContainer: React.FC = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [itemTexts, setItemTexts] = useState<string[]>([]);
    const [data, setData] = useState<{ title: string }[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(json => setData(json.slice(0, 4))); // Cargamos 4 elementos
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            const swapy = createSwapy(containerRef.current, {
                animation: 'dynamic',
            });

            swapy.onSwap((event) => {
                try {
                    const nuevoOrden = event.newSlotItemMap.asArray;

                    const nuevosTextos: string[] = nuevoOrden.map(({ item }) => {
                        const itemEl = containerRef.current?.querySelector(
                            `[data-swapy-item="${item}"]`
                        );

                        const texto = itemEl?.textContent?.trim();
                        if (!texto) {
                            throw new Error(`El elemento con ID "${item}" no tiene texto válido.`);
                        }

                        return texto;
                    });

                    console.log('Textos actuales:', nuevosTextos);
                    setItemTexts(nuevosTextos);
                } catch (error) {
                    console.error('Error durante el swap:', error);
                }
            });

            return () => swapy.destroy();
        }
    }, []);

    return (
        <>
            <div className="container" ref={containerRef}>
                <div className="slot" data-swapy-slot="slot1">
                    <div className="item" data-swapy-item="item1">
                        {data[0]?.title || ''}
                    </div>
                </div>
                <div className="slot" data-swapy-slot="slot2">
                    <div className="item" data-swapy-item="item2">
                        {data[1]?.title || ''}
                    </div>
                </div>
                <div className="slot" data-swapy-slot="slot3">
                    <div className="item" data-swapy-item="item3">
                        {data[2]?.title || ''}
                    </div>
                </div>

                {/* Si no tiene nada suelta error, todos los swapys deben estar llenos de algun value */}

                <div className="slot" data-swapy-slot="slot4">
                    {/* <div className="item" data-swapy-item="item4">
                        {data[2]?.title || ''}
                    </div> */}
                </div>


            </div>

            {/* Mostrar el estado actual */}
            <div style={{ marginTop: '2rem' }}>
                <h4>Orden actual:</h4>
                <ol>
                    {itemTexts.map((text, idx) => (
                        <li key={idx}>{text}</li>
                    ))}
                </ol>
            </div>
        </>
    );
};

export default SwapyContainer;
