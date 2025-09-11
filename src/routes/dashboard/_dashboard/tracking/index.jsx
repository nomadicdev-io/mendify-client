import { createFileRoute } from '@tanstack/react-router'
import { useRef, useEffect } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import '@tomtom-international/web-sdk-maps/dist/maps.css';

export const Route = createFileRoute('/dashboard/_dashboard/tracking/')({
  component: RouteComponent,
})

function RouteComponent() {

  const mapElement = useRef();
  const map = useRef(null);
  const key = import.meta.env.VITE_MAP_KEY;

  useEffect(() => {
    // Initialize the map only once
    if (map.current) return;

    map.current = tt.map({
      key: key,
      container: mapElement.current,
      center: [-121.91599, 37.36765], // Example coordinates
      zoom: 13,
    });
    
    // Clean up map instance on component unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [key]);
  return (
    <div className="relative w-full h-full flex-1 flex flex-col">
      <div
        ref={mapElement}
       className="w-full h-full flex-1"
      />
    </div>
  )
}
