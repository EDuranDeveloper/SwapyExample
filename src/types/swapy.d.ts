declare module 'swapy' {
    interface SwapyOptions {
        animation?: 'dynamic' | 'spring' | 'none';        
    }

    interface SlotItemMap {
        asArray: Array<{ slot: string; item: string | null }>;
    }

    interface SwapyEvent {
        newSlotItemMap: SlotItemMap;
    }

    interface SwapyInstance {
        onSwap(callback: (event: SwapyEvent) => void): void;
        destroy(): void;
    }

    export function createSwapy(container: HTMLElement, options?: SwapyOptions): SwapyInstance;
}