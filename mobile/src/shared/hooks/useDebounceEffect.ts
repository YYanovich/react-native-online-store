import { useEffect, useRef, DependencyList } from 'react';

export function useDebounceEffect(
	effect: () => void,
	deps: DependencyList, //dependencies like useEffect, for triger
	delay: number = 500, //debounce during
) {
	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		timeoutRef.current = setTimeout(() => {
			effect();
		}, delay);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, deps);
}
