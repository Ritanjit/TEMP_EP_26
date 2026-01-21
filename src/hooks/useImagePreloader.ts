import { useState, useEffect, useRef } from 'react';

/**
 * useImagePreloader - Preloads images in the background
 * 
 * Loads images asynchronously and tracks progress.
 * Useful for preloading hero section images during preloader display.
 */

export interface ImagePreloadState {
    isLoaded: boolean;
    progress: number;
    loadedCount: number;
    totalCount: number;
    errors: string[];
}

export function useImagePreloader(imageUrls: string[]): ImagePreloadState {
    const [state, setState] = useState<ImagePreloadState>({
        isLoaded: false,
        progress: 0,
        loadedCount: 0,
        totalCount: imageUrls.length,
        errors: []
    });

    // Use ref to track if already started loading
    const hasStartedRef = useRef(false);

    useEffect(() => {
        // Prevent double loading in strict mode
        if (hasStartedRef.current || imageUrls.length === 0) return;
        hasStartedRef.current = true;

        let loadedCount = 0;
        const errors: string[] = [];

        const loadImage = (url: string): Promise<void> => {
            return new Promise((resolve) => {
                const img = new Image();

                img.onload = () => {
                    loadedCount++;
                    setState(s => ({
                        ...s,
                        loadedCount,
                        progress: Math.round((loadedCount / imageUrls.length) * 100)
                    }));
                    resolve();
                };

                img.onerror = () => {
                    console.warn(`[useImagePreloader] Failed to load: ${url}`);
                    errors.push(url);
                    loadedCount++;
                    // Don't block on error - continue loading other images
                    setState(s => ({
                        ...s,
                        loadedCount,
                        progress: Math.round((loadedCount / imageUrls.length) * 100)
                    }));
                    resolve();
                };

                // Start loading
                img.src = url;
            });
        };

        // Load all images in parallel
        Promise.all(imageUrls.map(loadImage)).then(() => {
            setState(s => ({
                ...s,
                isLoaded: true,
                errors,
                progress: 100
            }));
        });
    }, [imageUrls]);

    return state;
}

export default useImagePreloader;
